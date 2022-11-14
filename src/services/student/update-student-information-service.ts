import { StudentsRepositories } from '@repositories/students-repository'

interface UpdateStudentInformationServiceData {
  ra: string
  email: string
  first_name: string
  last_name: string
}

export class UpdateStudentInformationService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: UpdateStudentInformationServiceData) {
    const { ra, email, first_name, last_name } = request

    if (!ra || !email || !first_name || !last_name) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByRa({
      ra,
    })

    if (!student) {
      throw new Error('Aluno inexistente')
    }

    await this.studentsRepository.updateInformation({
      ra,
      email,
      first_name,
      last_name,
    })

    return
  }
}
