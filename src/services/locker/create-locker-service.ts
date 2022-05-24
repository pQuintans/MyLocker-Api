import { LockersRepositories } from '@repositories/lockers-repository'

interface CreateLockerServiceData {
  number: number
  section_id: number
}

export class CreateLockerService {
  constructor(private lockersRepository: LockersRepositories) {}

  async execute(request: CreateLockerServiceData) {
    const { number, section_id } = request

    if (!number || !section_id) {
      throw new Error('Faltam informações')
    }

    const lockerAlreadyExists = await this.lockersRepository.findUniqueByNumber(
      { number }
    )

    if (lockerAlreadyExists) {
      throw new Error('Um armário com este número já foi cadastrado')
    }

    await this.lockersRepository.create({
      number,
      FK_section_id: section_id,
    })

    return
  }
}
