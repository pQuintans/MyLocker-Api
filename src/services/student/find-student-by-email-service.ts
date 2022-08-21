import { StudentsRepositories } from '@repositories/students-repository'

interface FindStudentByEmailServiceData {
  email: string
}

export class FindStudentByEmailService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: FindStudentByEmailServiceData) {
    const { email } = request

    if (!email) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByEmail({ email })

    if (!student) {
      throw new Error('Nenhum aluno com este E-Mail encontrado')
    }

    if (student.status == 0) {
      throw new Error('Este aluno está inativado')
    }

    return student
  }
}
