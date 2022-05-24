import {
  LockerCreateData,
  LockerFindUniqueByNumberData,
  LockersRepositories,
} from '@repositories/lockers-repository'
import { prisma } from '../../prisma'

export class PrismaLockersRepository implements LockersRepositories {
  async listAll() {
    const lockers = await prisma.locker.findMany()
    return lockers
  }

  async findUniqueByNumber({ number }: LockerFindUniqueByNumberData) {
    const locker = await prisma.locker.findUnique({
      where: {
        number: number,
      },
    })

    return locker
  }

  async create({ number, FK_section_id }: LockerCreateData) {
    await prisma.locker.create({
      data: {
        number,
        FK_section_id,
        isRented: 0,
        status: 1,
      },
    })
  }
}
