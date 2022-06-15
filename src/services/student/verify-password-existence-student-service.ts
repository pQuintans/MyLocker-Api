import { StudentsRepositories } from '@repositories/students-repository'

interface VerifyPasswordExistenceStudentServiceData {
  email: string
}

export class VerifyPasswordExistenceStudentService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: VerifyPasswordExistenceStudentServiceData) {
    const { email } = request

    if (!email) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByEmail({
      email,
    })

    if (!student) {
      throw new Error('Email Incorreto')
    }

    const hasPassword = student.password == null ? false : true

    return hasPassword
  }
}
