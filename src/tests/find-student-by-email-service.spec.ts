import { FindStudentByEmailService } from '@services/student/find-student-by-email-service'

const findUniqueByEmailSpy = jest.fn()

const findStudentByEmailService = new FindStudentByEmailService({
  create: null,
  findUniqueByRa: null,
  findUniqueByEmail: findUniqueByEmailSpy,
  updatePassword: null,
})

describe('Search student by email', () => {
  it('should be able to find a student', async () => {
    findUniqueByEmailSpy.mockReturnValueOnce({
      ra: '200146',
      first_name: 'Pedro',
      last_name: 'Quintans',
      email: 'cl200146@g.unicamp.br',
    }) //if 'findUniqueByEmailSpy' returns something, an student was found

    await expect(
      findStudentByEmailService.execute({
        email: 'cl200146@g.unicamp.br',
      })
    ).resolves.not.toThrow()

    expect(findUniqueByEmailSpy).toBeCalled()
  })

  it('should not be able to search an student without an E-Mail', async () => {
    await expect(
      findStudentByEmailService.execute({
        email: '',
      })
    ).rejects.toThrow()

    expect(findUniqueByEmailSpy).not.toBeCalled()
  })

  it('should not be able to find an student with an unrigistered E-Mail', async () => {
    // If 'findUniqueByEmailSpy' returns nothing, an Student with that email does not exists

    await expect(
      findStudentByEmailService.execute({
        email: 'cl200146@g.unicamp.br',
      })
    ).rejects.toThrow()

    expect(findUniqueByEmailSpy).toBeCalled()
  })
})
