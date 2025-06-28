import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma";
import { nextCookies } from "better-auth/next-js";
 
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mongodb",
    }),

    emailAndPassword: {  
        enabled: true
    },

    socialProviders: { 
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    }, 

    plugins: [nextCookies()],
});