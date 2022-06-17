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

    const { token, student } = await authenticateStudentService.execute({
      email,
      password,
    })

    return response
      .status(202)
      .cookie('token', token, {
        sameSite: 'none',
        secure: request.headers.host == 'localhost:3000' ? false : true,
        path: '/',
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json(student)
  }
}
