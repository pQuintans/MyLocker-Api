import { StudentsRepositories } from '@repositories/students-repository'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthenticateStudentServiceData {
  email: string
  password: string
}

export class AuthenticateStudentService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: AuthenticateStudentServiceData) {
    const { email, password } = request

    if (!email || !password) {
      throw new Error('Faltam informações')
    }

    const studentRequisition = await this.studentsRepository.findUniqueByEmail({
      email,
    })

    if (!studentRequisition) {
      throw new Error('Email ou Senha Incorretos')
    }

    if (studentRequisition.status == 0) {
      throw new Error('Este aluno está inativado')
    }

    const passwordsMatch = await compare(password, studentRequisition.password)

    if (!passwordsMatch) {
      throw new Error('Senha Incorreta')
    }

    const student = {
      ra: studentRequisition.ra,
      first_name: studentRequisition.first_name,
      last_name: studentRequisition.last_name,
      email: studentRequisition.email,
      locker_number: studentRequisition.locker_number,
      profile_picture_url: studentRequisition.profile_picture_url,
    }

    const token = sign(student, process.env.TOKEN_SECRET_KEY, {
      subject: studentRequisition.ra,
      expiresIn: '1d',
    })

    return { token, student }
  }
}
