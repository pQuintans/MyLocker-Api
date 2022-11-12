import { ApmsRepositories } from '@repositories/apms-repository'

interface ChangeApmStatusServiceData {
  id: number
  status: number
}

export class ChangeApmStatusService {
  constructor(private apmRepositories: ApmsRepositories) {}

  async execute({ id, status }: ChangeApmStatusServiceData) {
    if (!id || !status) {
      throw new Error('Faltam informações')
    }

    if (status != 0 && status != 1 && status != 2) {
      throw new Error('Status inválido')
    }

    const apm = await this.apmRepositories.findUniqueById({ id })

    if (!apm) {
      throw new Error('ID inválido')
    }

    await this.apmRepositories.updateApmStatus({ id, status })

    return
  }
}
