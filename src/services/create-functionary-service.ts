import { FunctionariesRepositories } from '../repositories/functionaries-repository'
import { hash } from 'bcryptjs'

interface CreateFunctionaryServiceRequest {
  cpf: string
  first_name: string
  last_name: string
  email: string
  password: string
}

export class CreateFunctionaryService {
  constructor(private functionariesRepository: FunctionariesRepositories) {}

  async execute(request: CreateFunctionaryServiceRequest) {
    const { cpf, first_name, last_name, email, password } = request

    if (!cpf || !first_name || !last_name || !email || !password) {
      throw new Error('Faltam informações')
    }

    const functionaryAlreadyExists =
      await this.functionariesRepository.findUnique({ cpf })

    if (functionaryAlreadyExists) {
      throw new Error('Um funcionário com este CPF já foi cadastrado')
    }

    const passwordHash = await hash(password, 8)

    const functionary = await this.functionariesRepository.create({
      cpf,
      first_name,
      last_name,
      email,
      password: passwordHash,
    })

    return functionary
  }
}
