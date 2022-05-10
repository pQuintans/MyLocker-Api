import {
  FunctionariesRepositories,
  FunctionaryCreateData,
  FunctionaryFindUniqueData,
} from '@repositories/functionaries-repository'
import { prisma } from 'src/prisma'

export class PrismaFunctionariesRepository
  implements FunctionariesRepositories
{
  async create({
    cpf,
    email,
    first_name,
    last_name,
    password,
  }: FunctionaryCreateData) {
    await prisma.functionary.create({
      data: {
        cpf,
        email,
        first_name,
        last_name,
        password,
        status: 1,
      },
    })
  }

  async findUnique({ cpf }: FunctionaryFindUniqueData) {
    const functionary = await prisma.functionary.findUnique({
      where: {
        cpf: cpf,
      },
    })

    return functionary
  }
}
