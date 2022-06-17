import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { UpdateStudentPasswordService } from '@services/student/update-student-password-service'
import { Request, Response } from 'express'

export class UpdateStudentPasswordController {
  async handle(req: Request, res: Response) {
    const { email, password, oldPassword } = req.body

    const prismaStudentsRepository = new PrismaStudentsRepository()
    const updateStudentPasswordService = new UpdateStudentPasswordService(
      prismaStudentsRepository
    )

    await updateStudentPasswordService.execute({
      email,
      password,
      oldPassword,
    })

    return res.status(204).send()
  }
}
