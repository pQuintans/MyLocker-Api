import { ApmsRepositories } from '@repositories/apms-repository'

export class ListApmsService {
  constructor(private apmsRepository: ApmsRepositories) {}

  async execute() {
    const apm = this.apmsRepository.listAll()

    return apm
  }
}
