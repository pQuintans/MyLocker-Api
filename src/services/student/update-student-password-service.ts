import { StudentsRepositories } from '@repositories/students-repository'
import { hash } from 'bcryptjs'

interface UpdateStudentPasswordServiceData {
  ra: string
  password: string
}

export class UpdateStudentPasswordService {
  constructor(private studentRepository: StudentsRepositories) {}

  async execute(request: UpdateStudentPasswordServiceData) {
    const { ra, password } = request

    if (!ra || !password) {
      throw new Error('Faltam informações')
    }

    const hashPassword = await hash(password, 8)

    const student = await this.studentRepository.updatePassword({
      ra,
      password: hashPassword,
    })

    return student
  }
}
