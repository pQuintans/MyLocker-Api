import {
  FunctionariesRepositories,
  FunctionaryCreateData,
  FunctionaryFindUniqueByCpfData,
  FunctionaryFindUniqueByEmailData,
} from '@repositories/functionaries-repository'
import { prisma } from '../../prisma'

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

  async findUniqueByCpf({ cpf }: FunctionaryFindUniqueByCpfData) {
    const functionary = await prisma.functionary.findUnique({
      where: {
        cpf: cpf,
      },
    })

    return functionary
  }

  async findUniqueByEmail({ email }: FunctionaryFindUniqueByEmailData) {
    const functionary = await prisma.functionary.findUnique({
      where: {
        email: email,
      },
    })

    return functionary
  }
}
