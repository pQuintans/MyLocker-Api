import { SetStudentVerificationCodeService } from '@services/student/set-student-verification-code-service'
import { studentsRepositoryTest } from './students-repository'

const sendMailSpy = jest.fn()

const setStudentVerificationCodeService = new SetStudentVerificationCodeService(
  studentsRepositoryTest,
  { sendMail: sendMailSpy }
)

describe('Set verification code', () => {
  it('should be able to set a verification code', async () => {
    studentsRepositoryTest.findUniqueByEmail.mockReturnValueOnce({
      ra: '200146',
      first_name: 'Pedro',
      last_name: 'Quintans',
      email: 'cl200146@g.unicamp.br',
    }) //if 'findUniqueByEmailSpy' returns something, an student was found

    await expect(
      setStudentVerificationCodeService.execute({
        email: 'cl200146@g.unicamp.br',
      })
    ).resolves.not.toThrow()

    expect(studentsRepositoryTest.findUniqueByEmail).toBeCalled()
    expect(sendMailSpy).toBeCalled()
  })

  it('should not be able to set a verification code with missing informations', async () => {
    await expect(
      setStudentVerificationCodeService.execute({
        email: '',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByEmail).not.toBeCalled()
    expect(sendMailSpy).not.toBeCalled()
  })

  it('should not be able to set a verification code to an student that does not exists', async () => {
    //if 'findUniqueByEmail' returns nothing, it does not exists an student with that RA
    await expect(
      setStudentVerificationCodeService.execute({
        email: 'cl200146@g.unicamp.br',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByEmail).toBeCalled()
    expect(sendMailSpy).not.toBeCalled()
  })
})
