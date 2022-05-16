import { LockersRepositories } from '@repositories/lockers-repository'
import { prisma } from '../../prisma'

export class PrismaLockersRepository implements LockersRepositories {
  async listAll() {
    const lockers = await prisma.locker.findMany()
    return lockers
  }
}
