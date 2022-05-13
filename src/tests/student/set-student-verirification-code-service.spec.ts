import { SetStudentVerificationCodeService } from '@services/student/set-student-verification-code-service'
import { studentsRepositoryTest } from './students-repository'

const sendMailSpy = jest.fn()

const setStudentVerificationCodeService = new SetStudentVerificationCodeService(
  studentsRepositoryTest,
  { sendMail: sendMailSpy }
)

describe('Search student by email', () => {
  it('should be able to set a verification code', async () => {
    studentsRepositoryTest.findUniqueByRa.mockReturnValueOnce({
      ra: '200146',
      first_name: 'Pedro',
      last_name: 'Quintans',
      email: 'cl200146@g.unicamp.br',
    }) //if 'findUniqueByEmailSpy' returns something, an student was found

    await expect(
      setStudentVerificationCodeService.execute({
        ra: '200146',
      })
    ).resolves.not.toThrow()

    expect(studentsRepositoryTest.findUniqueByRa).toBeCalled()
    expect(sendMailSpy).toBeCalled()
  })

  it('should not be able to set a verification code with missing informations', async () => {
    await expect(
      setStudentVerificationCodeService.execute({
        ra: '',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByRa).not.toBeCalled()
    expect(sendMailSpy).not.toBeCalled()
  })

  it('should not be able to set a verification code to an student that does not exists', async () => {
    //if 'findUniqueByRa' returns nothing, it does not exists an student with that RA
    await expect(
      setStudentVerificationCodeService.execute({
        ra: '200146',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByRa).toBeCalled()
    expect(sendMailSpy).not.toBeCalled()
  })
})
