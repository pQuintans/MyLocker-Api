import { StudentsRepositories } from '@repositories/students-repository'

interface UpdateStudentInformationServiceData {
  ra: string
  email: string
  firstName: string
  lastName: string
}

export class UpdateStudentInformationService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: UpdateStudentInformationServiceData) {
    const { ra, email, firstName, lastName } = request

    if (!ra || !email || !firstName || !lastName) {
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
      first_name: firstName,
      last_name: lastName,
    })

    return
  }
}
