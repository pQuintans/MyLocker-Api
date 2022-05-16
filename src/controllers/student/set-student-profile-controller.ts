import { PrismaStudentsRepository } from '@repositories/prisma/prisma-students-repository'
import { SetStudentProfilePictureService } from '@services/student/set-student-profile-picture-service'
import { Request, Response } from 'express'

export class SetProfilePictureStudentController {
  async handle(req: Request, res: Response) {
    const { ra } = req.body

    const prismaStudentRepository = new PrismaStudentsRepository()
    const setProfilePictureStudentService = new SetStudentProfilePictureService(
      prismaStudentRepository
    )

    const url = `${req.headers.host}/profile-picture/${req.file.filename}`

    const student = await setProfilePictureStudentService.execute({
      ra,
      url,
    })

    return res.status(200).json(student)
  }
}
