import { StudentsRepositories } from '@repositories/students-repository'

interface ChangeStudentStatusServiceData {
  ra: string
}

export class InactivateStudentService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: ChangeStudentStatusServiceData) {
    const { ra } = request

    if (!ra) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByRa({ ra })

    if (!student) {
      throw new Error('Nenhum aluno com este ra encontrado')
    }

    await this.studentsRepository.inativateStudent({ ra })

    return
  }
}
