import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { ValidateHttpOnlyJwtTokenStudentService } from '@services/student/validate-httpOnly-jwt-token-student-service'
import { Request, Response } from 'express'

export class ValidateHttpOnlyJwtTokenStudentController {
  async handle(request: Request, response: Response) {
    const { token } = request.cookies

    const prismaStudentRepository = new PrismaStudentsRepository()
    const validateHttpOnlyJwtTokenStudentService =
      new ValidateHttpOnlyJwtTokenStudentService(prismaStudentRepository)

    const student = await validateHttpOnlyJwtTokenStudentService.execute({
      token,
    })

    return response.status(202).json(student)
  }
}
