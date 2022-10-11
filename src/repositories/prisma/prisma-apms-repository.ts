import { ApmsCreateData, ApmsRepositories } from '@repositories/apms-repository'
import { prisma } from '../../prisma'

export class PrismaApmsRepository implements ApmsRepositories {
  async create({ FK_student_ra, requisitionPDF }: ApmsCreateData) {
    await prisma.apm.create({
      data: {
        status: 1,
        FK_student_ra,
        requisitionPDF,
      },
    })
  }
}
