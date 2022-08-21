import { StudentsRepositories } from '@repositories/students-repository'
import { sign } from 'jsonwebtoken'

interface SetStudentLockerNumberData {
  ra: string
  lockerNumber: number
}

export class SetStudentLockerNumber {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: SetStudentLockerNumberData) {
    const { ra, lockerNumber } = request

    if (!ra || !lockerNumber) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByRa({ ra })

    if (!student) {
      throw new Error('Nenhum aluno com este RA encontrado')
    }

    if (student.status == 0) {
      throw new Error('Este aluno está inativado')
    }

    student.locker_number = lockerNumber

    const studentToken = {
      ra: student.ra,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      locker_number: lockerNumber,
      profile_picture_url: student.profile_picture_url,
    }

    const token = sign(studentToken, process.env.TOKEN_SECRET_KEY, {
      subject: studentToken.ra,
      expiresIn: '1d',
    })

    await this.studentsRepository.updateLockerNumber({ ra, lockerNumber })

    return { student, token }
  }
}
