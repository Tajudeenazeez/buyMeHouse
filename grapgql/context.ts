// /graphql/context.ts
// import { PrismaClient } from '@prisma/client'
// import prisma from '../lib/prisma'

// export type Context = {
//   prisma: PrismaClient
// }
// export async function createContext({req, res}:any ): Promise<Context> {
//   return {
//     prisma,
//   }
// }

// graphql/context.ts
import { PrismaClient } from '@prisma/client'
import prisma from '../lib/prisma';
import { Claims, getSession } from '@auth0/nextjs-auth0'

export type Context = {
  user?: Claims
  accessToken?: string
  prisma: PrismaClient
  
}
 export async function createContext({ req, res }:any): Promise<Context> {
  const session = await getSession(req, res)

  // if the user is not logged in, omit returning the user and accessToken 
  if (!session) return { prisma }

   const { user, accessToken}  = session

  return {
    user,
    accessToken,
    prisma,
  }
}