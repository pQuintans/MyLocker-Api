import { UpdateStudentPasswordService } from '@services/student/update-student-password-service'

const updatePasswordSpy = jest.fn()

const updatePassword = new UpdateStudentPasswordService({
  create: null,
  findUniqueByRa: null,
  findUniqueByEmail: null,
  updatePassword: updatePasswordSpy,
})

describe('Search student by email', () => {
  it('should be able to change passsword', async () => {
    await expect(
      updatePassword.execute({
        ra: '200146',
        password: '123',
      })
    ).resolves.not.toThrow()

    expect(updatePasswordSpy).toBeCalled()
  })

  it('should not able to change password with missing informations', async () => {
    await expect(
      updatePassword.execute({
        ra: '',
        password: '',
      })
    ).rejects.toThrow()

    expect(updatePasswordSpy).not.toBeCalled()
  })
})
