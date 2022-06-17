import { LockersRepositories } from '@repositories/lockers-repository'

interface FindLockerByNumberServiceData {
  lockerNumberString: string
}

export class FindLockerByNumberService {
  constructor(private lockerRepository: LockersRepositories) {}

  async execute(request: FindLockerByNumberServiceData) {
    const { lockerNumberString } = request

    if (!lockerNumberString) {
      throw new Error('Faltam informações')
    }

    const number = parseInt(lockerNumberString)

    if (isNaN(number)) {
      throw new Error('Número inválido')
    }

    const locker = await this.lockerRepository.findUniqueByNumber({ number })

    if (!locker) {
      throw new Error('Nenhum armário com este número encontrado')
    }

    return locker
  }
}
