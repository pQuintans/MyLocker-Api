import {
  ApmsCreateData,
  ApmsFindUniqueByIdData,
  ApmsRepositories,
  ApmsUpdateStatusData,
} from '@repositories/apms-repository'
import { prisma } from '../../prisma'

export class PrismaApmsRepository implements ApmsRepositories {
  async create({ FK_student_ra, requisitionPDF }: ApmsCreateData) {
    await prisma.apm.create({
      data: {
        status: 1,
        requisitionPDF,
        FK_student_ra,
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

  async listAll() {
    const apm = await prisma.apm.findMany({
      include: {
        student: true,
      },
    })
    return apm
  }

  async updateApmStatus({ id, status, functionaryCpf }: ApmsUpdateStatusData) {
    await prisma.apm.update({
      where: {
        id,
      },
      data: {
        status,
        functionary: {
          connect: {
            cpf: functionaryCpf,
          },
        },
      },
    })
  }
}
