import { studentsRepositories } from '@repositories/students-repository'

interface CreateStudentServiceData {
  ra: string
  first_name: string
  last_name: string
  email: string
}

export class CreateStudentService {
  constructor(private studentsRepository: studentsRepositories) {}

  async execute(request: CreateStudentServiceData) {
    const { ra, first_name, last_name, email } = request

    if (!ra || !first_name || !last_name || !email) {
      throw new Error('Faltam informações')
    }

    const studentAlreadyExists = await this.studentsRepository.findUniqueByRa({
      ra,
    })

    if (studentAlreadyExists) {
      throw new Error('O aluno com este RA já foi cadastrado')
    }

    const emailAlreadyInUse = await this.studentsRepository.findUniqueByEmail({
      email,
    })

    if (emailAlreadyInUse) {
      throw new Error('Um aluno com este E-Mail já foi cadastrado')
    }

    await this.studentsRepository.create({
      ra,
      first_name,
      last_name,
      email,
    })

    return
  }
}
