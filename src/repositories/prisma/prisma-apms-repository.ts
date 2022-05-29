import { ApmsCreateData, ApmsRepositories } from '@repositories/apms-repository'
import { prisma } from '../../prisma'

export class PrismaApmsRepository implements ApmsRepositories {
  async create({ isPaid, FK_student_ra, FK_functionary_cpf }: ApmsCreateData) {
    await prisma.apm.create({
      data: {
        isPaid,
        status: 1,
        FK_student_ra,
        FK_functionary_cpf,
      },
    })
  }
}
