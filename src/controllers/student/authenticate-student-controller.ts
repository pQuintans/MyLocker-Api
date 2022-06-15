import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { AuthenticateStudentService } from '@services/student/authenticate-student-service'
import { Request, Response } from 'express'

export class AuthenticateStudentController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const prismaStudentRepository = new PrismaStudentsRepository()
    const authenticateStudentService = new AuthenticateStudentService(
      prismaStudentRepository
    )

    const token = await authenticateStudentService.execute({
      email,
      password,
    })

    return response.json(token)
  }
}
