import { FunctionariesRepositories } from '@repositories/functionaries-repository'

interface FindFunctionaryServiceRequest {
  cpf: string
}

export class FindFunctionaryService {
  constructor(private functionariesRepository: FunctionariesRepositories) {}

  async execute(request: FindFunctionaryServiceRequest) {
    const { cpf } = request

    if (!cpf) {
      throw new Error('Faltam informações')
    }

    const functionary = await this.functionariesRepository.findUniqueByCpf({
      cpf,
    })

    if (!functionary) {
      throw new Error('Nenhum funcionário com este CPF encontrado')
    }
  }
}
