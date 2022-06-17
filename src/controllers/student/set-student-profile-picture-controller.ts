import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { SetStudentProfilePictureService } from '@services/student/set-student-profile-picture-service'
import { Request, Response } from 'express'

export class SetStudentProfilePictureController {
  async handle(req: Request, res: Response) {
    const { ra } = req.body

    const prismaStudentRepository = new PrismaStudentsRepository()
    const setProfilePictureStudentService = new SetStudentProfilePictureService(
      prismaStudentRepository
    )

    const url = `http://${req.headers.host}/profile-picture/${req.file.filename}`

    const { student, token } = await setProfilePictureStudentService.execute({
      ra,
      url,
    })

    return res
      .status(200)
      .cookie('token', token, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        httpOnly: true,
      })
      .json(student)
  }
}
