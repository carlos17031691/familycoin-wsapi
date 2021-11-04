import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const getReceivedTransactionsByUserId = async (userId) => { 
    try {
        return await prisma.transaction.findMany({
            where: {
              toUser: userId,
            },
          })
    } catch (error) {
        throw { "error": error }
    }
    
}

const getSentTransactionsByUserId = async (userId) => { 
    try {
        return await prisma.transaction.findMany({
            where: {
              fromUser: userId,
            },
          })
    } catch (error) {
        throw { "error": error }
    }
    
}

const newTransaction = async (data) => { 
  try {
      return await prisma.transaction.create({data: data})
  } catch (error) {
      throw {
          "result":"Invalid data",
          "error": error
      }
  }
}


exports.getReceivedTransactionsByUserId = getReceivedTransactionsByUserId;
exports.getSentTransactionsByUserId = getSentTransactionsByUserId;