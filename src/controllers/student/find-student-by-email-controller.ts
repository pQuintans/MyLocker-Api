import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { FindStudentByEmailService } from '@services/student/find-student-by-email-service'
import { Request, Response } from 'express'

export class FindStudentByEmailController {
  async handle(req: Request, res: Response) {
    const { email } = req.params

    const prismaStudentRepository = new PrismaStudentsRepository()
    const findStudentByEmailService = new FindStudentByEmailService(
      prismaStudentRepository
    )

    const student = await findStudentByEmailService.execute({ email })

    return res.status(200).json(student)
  }
}
