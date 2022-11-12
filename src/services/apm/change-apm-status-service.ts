import { ApmsRepositories } from '@repositories/apms-repository'
import { FunctionariesRepositories } from '@repositories/functionaries-repository'

interface ChangeApmStatusServiceData {
  id: number
  status: number
  functionaryCpf: string
}

export class ChangeApmStatusService {
  constructor(
    private apmRepositories: ApmsRepositories,
    private functionariesRepositories: FunctionariesRepositories
  ) {}

  async execute({ id, status, functionaryCpf }: ChangeApmStatusServiceData) {
    if (!id || !status || !functionaryCpf) {
      throw new Error('Faltam informações')
    }

    if (status != 0 && status != 1 && status != 2) {
      throw new Error('Status inválido')
    }

    const apm = await this.apmRepositories.findUniqueById({ id })

    if (!apm) {
      throw new Error('ID inválido')
    }

    const functionary = await this.functionariesRepositories.findUniqueByCpf({
      cpf: functionaryCpf,
    })

    if (!functionary) {
      throw new Error('CPF inválido')
    }

    await this.apmRepositories.updateApmStatus({ id, status, functionaryCpf })

    return
  }
}
