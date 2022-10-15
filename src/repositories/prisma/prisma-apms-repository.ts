import {
  ApmsCreateData,
  ApmsFindUniqueByIdData,
  ApmsRepositories,
} from '@repositories/apms-repository'
import { prisma } from '../../prisma'

export class PrismaApmsRepository implements ApmsRepositories {
  async create({ FK_student_ra, requisitionPDF }: ApmsCreateData) {
    const apm = await prisma.apm.create({
      data: {
        status: 1,
        requisitionPDF,
      },
    })

    await prisma.student.update({
      where: {
        ra: FK_student_ra,
      },
      data: {
        FK_apm_id: apm.id,
      },
    })
  }

  async findUniqueById({ id }: ApmsFindUniqueByIdData) {
    const apm = await prisma.apm.findUnique({
      where: {
        id,
      },
    })

    return apm
  }
}
