import { StudentsRepositories } from '@repositories/students-repository'
import { compare, hash } from 'bcryptjs'

interface UpdateStudentPasswordServiceData {
  email: string
  password: string
  oldPassword?: string
}

export class UpdateStudentPasswordService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: UpdateStudentPasswordServiceData) {
    const { email, password, oldPassword } = request

    if (!email || !password) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByEmail({
      email,
    })

    if (student.password != null) {
      if (!oldPassword) {
        throw new Error('Faltam informações')
      }

      const passwordsMatches = await compare(oldPassword, student.password)

      if (!passwordsMatches) {
        throw new Error('Senha antiga incorreta!')
      }

      const regex = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)

      const passwordHasLettersAndNumbers = regex.test(password)

      if (!passwordHasLettersAndNumbers) {
        throw new Error(
          'Sua senha deve conter numeros, letras minusculas e letras maiusculas'
        )
      }
    }

    const hashPassword = await hash(password, 8)

    await this.studentsRepository.updatePassword({
      email,
      password: hashPassword,
    })

    return
  }
}
