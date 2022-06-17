import { LockersRepositories } from '@repositories/lockers-repository'

interface SetLockerIsRentedServiceData {
  lockerNumber: number
  isRented: number
}

export class SetLockerIsRentedService {
  constructor(private lockersRepository: LockersRepositories) {}

  async execute(request: SetLockerIsRentedServiceData) {
    const { lockerNumber, isRented } = request

    if (lockerNumber == null || isRented == null) {
      throw new Error('Faltam informações')
    }

    const locker = await this.lockersRepository.findUniqueByNumber({
      number: lockerNumber,
    })

    if (!locker) {
      throw new Error('Nenhum armário com este número encontrado')
    }

    const rentedAt =
      isRented == 0
        ? null
        : new Date().toLocaleDateString() +
          ' - ' +
          new Date().toLocaleTimeString()

    await this.lockersRepository.setLockerIsRented({
      number: lockerNumber,
      isRented,
      rentedAt,
    })

    return
  }
}
