import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { VerifyPasswordExistenceStudentService } from '@services/student/verify-password-existence-student-service'
import { Request, Response } from 'express'

export class VerifyPasswordExistenceStudentController {
  async handle(request: Request, response: Response) {
    const { email } = request.body

    const prismaStudentRepository = new PrismaStudentsRepository()
    const verifyPasswordExistenceStudentService =
      new VerifyPasswordExistenceStudentService(prismaStudentRepository)

    const hasPassword = await verifyPasswordExistenceStudentService.execute({
      email,
    })

    return response.json({ hasPassword: hasPassword })
  }
}
