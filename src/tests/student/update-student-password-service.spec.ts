import { UpdateStudentPasswordService } from '@services/student/update-student-password-service'
import { studentsRepositoryTest } from './students-repository'

const updatePassword = new UpdateStudentPasswordService(studentsRepositoryTest)

describe('Search student by email', () => {
  it('should be able to change passsword', async () => {
    await expect(
      updatePassword.execute({
        ra: '200146',
        password: '123',
      })
    ).resolves.not.toThrow()

    expect(studentsRepositoryTest.updatePassword).toBeCalled()
  })

  it('should not able to change password with missing informations', async () => {
    await expect(
      updatePassword.execute({
        ra: '',
        password: '',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.updatePassword).not.toBeCalled()
  })
})
