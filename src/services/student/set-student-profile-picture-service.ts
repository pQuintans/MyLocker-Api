import { StudentsRepositories } from '@repositories/students-repository'
import { sign } from 'jsonwebtoken'

interface SetStudentProfilePictureServiceData {
  ra: string
  url: string
}

export class SetStudentProfilePictureService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: SetStudentProfilePictureServiceData) {
    const { ra, url } = request

    if (!ra || !url) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByRa({ ra })

    if (!student) {
      throw new Error('Nenhum aluno com este RA encontrado')
    }

    if (student.status == 0) {
      throw new Error('Este aluno está inativado')
    }

    student.profile_picture_url = url

    const studentToken = {
      ra: student.ra,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      locker_number: student.locker_number,
      profile_picture_url: url,
    }

    const token = sign(studentToken, process.env.TOKEN_SECRET_KEY, {
      subject: studentToken.ra,
      expiresIn: '1d',
    })

    await this.studentsRepository.updateProfilePicture({ ra, url })

    return { student, token }
  }
}
