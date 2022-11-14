import { StudentsRepositories } from '@repositories/students-repository'

interface FindStudentByRaServiceData {
  ra: string
}

export class FindStudentByRaService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: FindStudentByRaServiceData) {
    const { ra } = request

    if (!ra) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByRa({ ra })

    if (!student) {
      throw new Error('Nenhum aluno com este RA encontrado')
    }

    return student
  }
}
