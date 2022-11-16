import { ApmsRepositories } from '@repositories/apms-repository'
import { StudentsRepositories } from '@repositories/students-repository'
import { sign } from 'jsonwebtoken'

interface CreateApmServiceRequest {
  student_ra: string
  requisitionPDF: string
}

export class CreateApmService {
  constructor(
    private apmsRepository: ApmsRepositories,
    private studentsRepository: StudentsRepositories
  ) {}

  async execute(request: CreateApmServiceRequest) {
    const { student_ra, requisitionPDF } = request

    if (!student_ra || !requisitionPDF) {
      throw new Error('Faltam informações')
    }

    await this.apmsRepository.create({
      FK_student_ra: student_ra,
      requisitionPDF,
    })

    const student = await this.studentsRepository.findUniqueByRa({
      ra: student_ra,
    })

    const studentToken = {
      ra: student.ra,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      locker_number: student.locker_number,
      profile_picture_url: student.profile_picture_url,
      apm: student.apm,
      apmCount: student._count.apm,
    }

    const token = sign(studentToken, process.env.TOKEN_SECRET_KEY, {
      subject: studentToken.ra,
      expiresIn: '1d',
    })

    return { student: studentToken, token }
  }
}
