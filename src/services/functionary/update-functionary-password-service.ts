import { FunctionariesRepositories } from '@repositories/functionaries-repository'
import { compare, hash } from 'bcryptjs'

interface UpdateFunctionaryPasswordServiceData {
  cpf: string
  password: string
  oldPassword: string
}

export class UpdateFunctionaryPasswordService {
  constructor(private functionariesRepositories: FunctionariesRepositories) {}

  async execute(request: UpdateFunctionaryPasswordServiceData) {
    const { cpf, password, oldPassword } = request

    if (!cpf || !password || !oldPassword) {
      throw new Error('Faltam informações')
    }

    const functionary = await this.functionariesRepositories.findUniqueByCpf({
      cpf,
    })

    const passwordsMatches = await compare(oldPassword, functionary.password)

    if (!passwordsMatches) {
      throw new Error('Senha antiga incorreta!')
    }

    const regex = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)

    const passwordHasLettersAndNumbers = regex.test(password)

    if (!passwordHasLettersAndNumbers) {
      throw new Error(
        'Sua senha deve conter numeros, letras minusculas e letras maiusculas'
      )
    }

    const hashPassword = await hash(password, 8)

    await this.functionariesRepositories.updatePassword({
      cpf,
      password: hashPassword,
    })

    return
  }
}
