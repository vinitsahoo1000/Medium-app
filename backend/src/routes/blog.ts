import { Hono } from 'hono'
import { Prisma, PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { getPrismaClient } from '../db'
import { createBlogInput, updateBlogInput } from '@vinitsahoo1000/medium-common'


export const blogRouter = new Hono<{
	Bindings: {
        secretKey: string
		DATABASE_URL: string
	},
    Variables: {
        userId: string;
    }
}>();


blogRouter.use(async (c,next)=>{
    const authHeader = c.req.header("Authorization") || "";

    try{
        const token = authHeader.split(' ')[1];
        const user = await verify(token,c.env.secretKey);

        if(user){
            c.set("userId",user.id as string)
            await next();
        }else{
            c.status(403);
            return c.json({
                msg: "You are not logged in"
            })
        }
    }catch(e){
        c.status(403);
        return c.json({
            msg: "You are not logged in"
        })
    }
})


blogRouter.post('/create' , async(c) =>{
    const userId = c.get('userId');
    const prisma = getPrismaClient(c.env);

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            msg: "Incorrect Inputs"
        })
    }

    const post = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: userId
        }
    });
    return c.json({
        id: post.id
    });
})



blogRouter.put('/update', async(c) =>{
    const userId = c.get('userId');
    const prisma = getPrismaClient(c.env);

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            msg: "Incorrect Inputs"
        })
    }
    const postUpdate = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content
        }
    });

    return c.json({message:"post updated",post: postUpdate})
});




blogRouter.get('/bulk', async(c) => {
    const prisma = getPrismaClient(c.env);
    try{
        // console.log("Fetching posts...");
        const posts = await prisma.post.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author: {
                    select:{
                        name:true
                    }
                }
            }
        });
        // console.log("Fetched posts:", posts);  // Add a log to see if posts are retrieved
        
        return c.json({
            posts
        });  // Send the posts as a response
        
    }catch(e){
        console.error("Error fetching posts:", e);
        return c.json({ error: 'Failed to fetch posts' }, 500);
    }
    
})



blogRouter.get('/:id', async(c) =>{
    const id = c.req.param('id');
    const prisma = getPrismaClient(c.env);

    const post = await prisma.post.findUnique({
        where: {
            id
        },
        select:{
            id: true,
            title: true,
            content: true,
            author:{
                select:{
                    name: true
                }
            }
        }
    });
    return c.json(post);
})