import {
  LockerCreateData,
  LockerFindUniqueByNumberData,
  LockerSetIsRentedData,
  LockersRepositories,
} from '@repositories/lockers-repository'
import { prisma } from '../../prisma'

export class PrismaLockersRepository implements LockersRepositories {
  async listAll() {
    const lockers = await prisma.locker.findMany({
      include: {
        section: true,
        student: true,
      },
      // select: {
      //   student: {
      //     wherer:
      //   }
      // }
    })
    return lockers
  }

  async findUniqueByNumber({ number }: LockerFindUniqueByNumberData) {
    const locker = await prisma.locker.findUnique({
      where: {
        number: number,
      },
      include: {
        section: true,
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

  async setLockerIsRented({
    number,
    isRented,
    rentedAt,
  }: LockerSetIsRentedData) {
    await prisma.locker.update({
      where: {
        number,
      },
      data: {
        isRented,
        rentedAt,
      },
    })
  }
}
