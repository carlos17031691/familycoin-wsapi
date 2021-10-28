import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const newWallet = async (dataWallet) => { 
    try {
        return await prisma.wallet.create({data: dataWallet})
    } catch (error) {
        throw {
            "result":"Invalid data",
            "hint": {
                "name": "john Doe",
                "email": "johndoe@mail.test",
                "password": "superpassword"
            },
            "error": error
        }
    }
    
}


exports.newWallet = newWallet;