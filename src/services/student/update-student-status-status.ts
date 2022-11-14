import { StudentsRepositories } from '@repositories/students-repository'

interface UpdateStudentStatusServiceData {
  ra: string
}

export class UpdateStudentStatusService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: UpdateStudentStatusServiceData) {
    const { ra } = request

    if (!ra) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByRa({ ra })

    if (!student) {
      throw new Error('Nenhum aluno com este ra encontrado')
    }

    await this.studentsRepository.updateStatus({
      ra,
      status: student.status == 0 ? 1 : 0,
    })

    return
  }
}
