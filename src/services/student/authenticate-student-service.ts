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

    const student = await this.studentsRepository.findUniqueByEmail({
      email,
    })

    if (!student) {
      throw new Error('Email ou Senha Incorretos')
    }

    const passwordsMatch = await compare(password, student.password)

    if (!passwordsMatch) {
      throw new Error('Email ou Senha Incorretos')
    }

    const token = sign(
      {
        ra: student.ra,
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        locker_number: student.locker_number,
        profile_picture_url: student.profile_picture_url,
      },
      process.env.TOKEN_SECRET_KEY,
      {
        subject: student.ra,
        expiresIn: '1d',
      }
    )

    return token
  }
}
