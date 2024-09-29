import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from '@vinitsahoo1000/medium-common';
import { getPrismaClient } from '../db'

export const userRouter = new Hono<{
	Bindings: {
        secretKey: string
		DATABASE_URL: string
    // header: string
	}
}>();

userRouter.post('/signup', async(c) =>{
    const prisma = getPrismaClient(c.env)
    
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            msg: "Incorrect Inputs"
        })
    }
    try{
        
        const encoder = new TextEncoder();
        const data = encoder.encode(body.password);
        const hashedPasswordBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashedPassword = Array.from(new Uint8Array(hashedPasswordBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
        
        const user = await prisma.user.create({
        data:{
            name : body.name,
            email: body.email,
            password: hashedPassword,
        },
        })

        const token = await sign(
        {id: user.id},
        c.env.secretKey
        )
        console.log("User ID: ", user.id);
        return c.json({token});

    }catch(e){
        console.error(e)
        return c.json({error: 'An error occurred '}, 500);
}
    });



userRouter.post('/signin', async(c) =>{
    const prisma = getPrismaClient(c.env)
    
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            msg: "Incorrect Inputs"
        })
    }

    try{
        const user = await prisma.user.findUnique({
        where: {
            email: body.email
        },
        });
        if(!user){
        return c.json({error: "Invalid email no user found"}, 401)
        }

        const encoder = new TextEncoder();
        const data = encoder.encode(body.password);
        const hashedPasswordBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashedPassword = Array.from(new Uint8Array(hashedPasswordBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

        if(hashedPassword! == body.password){
            return c.json({ error: 'Invalid password' }, 401);
        }

        const token = await sign(
            {id: user.id},
        c.env.secretKey)
        
        return c.json({token});
    }catch(e){
        console.error(e)
        return c.json({error: 'An error occurred '}, 500);
    }
})