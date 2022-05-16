import { LockersRepositories } from '@repositories/lockers-repository'

export class ListAllLockersService {
  constructor(private lockersRepository: LockersRepositories) {}

  async execute() {
    const lockers = this.lockersRepository.listAll()

    return lockers
  }
}
