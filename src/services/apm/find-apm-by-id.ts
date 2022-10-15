import { ApmsRepositories } from '@repositories/apms-repository'

interface FindApmByIdServiceData {
  idAsString: string
}

export class FindApmByIdService {
  constructor(private apmsRepositories: ApmsRepositories) {}

  async execute(request: FindApmByIdServiceData) {
    const { idAsString } = request

    if (!idAsString) {
      throw new Error('Faltam informações')
    }

    const id = parseInt(idAsString)

    if (isNaN(id)) {
      throw new Error('Id inválido')
    }

    const apm = await this.apmsRepositories.findUniqueById({ id })

    if (!apm) {
      throw new Error('Nenhuma APM com este id encontrado')
    }

    return apm
  }
}
