import { StudentsRepositories } from '@repositories/students-repository'

interface SetStudentProfilePictureServiceData {
  ra: string
  url: string
}

export class SetStudentProfilePictureService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: SetStudentProfilePictureServiceData) {
    const { ra, url } = request

    if (!ra || !url) {
      throw new Error('Faltam informações')
    }

    const student = await this.studentsRepository.findUniqueByRa({ ra })

    if (!student) {
      throw new Error('Nenhum aluno com este RA encontrado')
    }

    student.profile_picture_url = url

    await this.studentsRepository.updateProfilePicture({ ra, url })

    return student
  }
}
