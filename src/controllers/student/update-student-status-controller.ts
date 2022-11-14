import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { UpdateStudentStatusService } from '@services/student/update-student-status-status'
import { Request, Response } from 'express'

export class UpdateStudentStatusController {
  async handle(req: Request, res: Response) {
    const { ra } = req.body

    const prismaStudentRepository = new PrismaStudentsRepository()
    const updateStudentStatusService = new UpdateStudentStatusService(
      prismaStudentRepository
    )

    await updateStudentStatusService.execute({
      ra,
    })

    return res.status(201).send()
  }
}
