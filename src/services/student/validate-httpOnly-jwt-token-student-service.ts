import { StudentsRepositories } from '@repositories/students-repository'
import { verify } from 'jsonwebtoken'

interface ValidateHttpOnlyJwtTokenStudentServiceData {
  token?: string
}

export class ValidateHttpOnlyJwtTokenStudentService {
  constructor(private studentsRepository: StudentsRepositories) {}

  async execute(request: ValidateHttpOnlyJwtTokenStudentServiceData) {
    const { token } = request

    if (token) {
      const student = verify(token, process.env.TOKEN_SECRET_KEY)

      if (typeof student === 'object') {
        const { email } = student

        const studentRequisition =
          await this.studentsRepository.findUniqueByEmail({
            email,
          })

        if (studentRequisition.status == 0) {
          throw new Error('Este aluno está inativado')
        }

        return {
          ra: studentRequisition.ra,
          first_name: studentRequisition.first_name,
          last_name: studentRequisition.last_name,
          email: studentRequisition.email,
          locker_number: studentRequisition.locker_number,
          profile_picture_url: studentRequisition.profile_picture_url,
          apm: studentRequisition.apm,
          apmCount: studentRequisition._count.apm,
        }
      }
    } else {
      throw new Error('Usuário não autenticado')
    }
  }
}
