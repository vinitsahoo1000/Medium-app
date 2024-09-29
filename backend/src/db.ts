import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';


export const getPrismaClient = (env: {DATABASE_URL: string}) =>
    new PrismaClient({
        datasources: {
            db: {
                url: env.DATABASE_URL,
            },
        },
    }).$extends(withAccelerate());

