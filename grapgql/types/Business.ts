import { objectType, extendType, stringArg, intArg, nonNull } from 'nexus'
import { User } from './User'


export const Edge = objectType({
  name: 'Edge',
  definition(t) {
    t.string('cursor')
    t.field('node', {
      type: Investments,
    })
  },
})

export const PageInfo = objectType({
  name: 'PageInfo',
  definition(t) {
    t.string('endCursor')
    t.boolean('hasNextPage')
  },
})

export const Response = objectType({
  name: 'Response',
  definition(t) {
    t.field('pageInfo', { type: PageInfo })
    t.list.field('edges', {
      type: Edge,
    })
  },
})

export const Investments = objectType({
  name: 'Investment',
  definition(t) {
    t.int('amount')
    t.string('title')
    t.string('url')
    t.string('description')
    t.string('imageUrl')
    t.string('category')
    t.list.field('users', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.investment
          .findUnique({
            where: {
              id: _parent.amount,
            },
          })
          .users()
      },
    })
  },
})

export const InvestmentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.nonNull.field('investments', {
      type: 'Investment',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.investment.findMany()
      },
    })
  },
})

// graphql/types/Link.ts
export const CreateLinkMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createInvestment', {
      type: Investments,
      args: {
        title: nonNull(stringArg()),
        imageUrl: nonNull(stringArg()),
        category: nonNull(stringArg()),
        description: nonNull(stringArg()),
        amount: nonNull(intArg()),
      },
      async resolve(_parent, args, ctx) {

        if (!ctx.user) {
          throw new Error(`You need to be logged in to perform an action`)
        }

        const newInvestment = {
          title: args.title,
          url: args.url,
          imageUrl: args.imageUrl,
          category: args.category,
          description: args.description,
        }

        return await ctx.prisma.investment.create({
          data: newInvestment,
        })
      },
    })
  },
})