// export const resolvers = {Query: {investments:()=>{}}}
// /graphql/resolvers.ts

// import { investmentItems } from "../data/investment"

export const resolvers = {
    Query: {
      investmentItems: (_parent:any, _args:any, ctx:any) => {
        return ctx.prisma.investment.findMany()
      },
    },
  }
    