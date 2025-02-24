import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function addUser(email: string, password: string) {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  })
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}
