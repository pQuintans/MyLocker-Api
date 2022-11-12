import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { UpdateStudentInformationService } from '@services/student/update-student-information-service'
import { Request, Response } from 'express'

export class UpdateStudentInformationController {
  async handle(req: Request, res: Response) {
    const { ra, email, firstName, lastName } = req.body

    const prismaStudentsRepository = new PrismaStudentsRepository()
    const updateStudentInformationService = new UpdateStudentInformationService(
      prismaStudentsRepository
    )

    await updateStudentInformationService.execute({
      ra,
      email,
      firstName,
      lastName,
    })

    return res.status(204).send()
  }
}
