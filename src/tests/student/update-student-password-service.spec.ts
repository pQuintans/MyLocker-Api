import { UpdateStudentPasswordService } from '@services/student/update-student-password-service'
import { studentsRepositoryTest } from './students-repository'

const updatePassword = new UpdateStudentPasswordService(studentsRepositoryTest)

describe('Change students passwod', () => {
  it('should be able to change passsword', async () => {
    await expect(
      updatePassword.execute({
        email: 'cl200146@g.unicamp.br',
        password: '123',
      })
    ).resolves.not.toThrow()

    expect(studentsRepositoryTest.updatePassword).toBeCalled()
  })

  it('should not able to change password with missing informations', async () => {
    await expect(
      updatePassword.execute({
        email: '',
        password: '',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.updatePassword).not.toBeCalled()
  })
})
