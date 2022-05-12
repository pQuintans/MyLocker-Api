import { StudentsRepositories } from '@repositories/students-repository'
import { hash } from 'bcryptjs'

interface UpdateStudentPasswordServiceData {
  ra: string
  password: string
}

export class UpdateStudentPasswordService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: UpdateStudentPasswordServiceData) {
    const { ra, password } = request

    if (!ra || !password) {
      throw new Error('Faltam informações')
    }

    const hashPassword = await hash(password, 8)

    const student = await this.studentsRepository.updatePassword({
      ra,
      password: hashPassword,
    })

    return student
  }
}
