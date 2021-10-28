import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const newUser = async (dataUser) => { 
    try {
        return await prisma.user.create({data: dataUser})
    } catch (error) {
        throw error
    }
}

const getUserByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({
            where: {
              email: email,
            },
            include: {
                wallet: true,
              },
          })
    } catch (error) {
        throw error
    }
}


exports.newUser = newUser;
exports.getUserByEmail = getUserByEmail;