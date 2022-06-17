import { verify } from 'jsonwebtoken'

interface ValidateHttpOnlyJwtTokenStudentServiceData {
  token?: string
}

export class ValidateHttpOnlyJwtTokenStudentService {
  async execute(request: ValidateHttpOnlyJwtTokenStudentServiceData) {
    const { token } = request

    if (token) {
      const student = verify(token, process.env.TOKEN_SECRET_KEY)

      if (typeof student === 'object') {
        const {
          ra,
          first_name,
          last_name,
          email,
          locker_number,
          profile_picture_url,
        } = student

        return {
          ra,
          first_name,
          last_name,
          email,
          locker_number,
          profile_picture_url,
        }
      }
    } else {
      throw new Error('Usuário não autenticado')
    }
  }
}
