import { PrismaClient } from "@prisma/client";
import { investmentItems } from "../data/investment";

const prisma = new PrismaClient()

async function main (){
    await prisma.user.upsert({
        where: {
            email: 'ajao@gmail.com',
        },
        create: {
          email: 'ajao@gmail.com',
          role: "ADMIN"
        },
        update: { },
      })
    await prisma.investment.createMany({data:investmentItems})
}
main()
.catch(e => {
    console.error(e)
    process.exit(1)
})
.finally(async () => {
    await prisma.$disconnect
})