import { FindStudentByEmailService } from '@services/student/find-student-by-email-service'
import { studentsRepositoryTest } from './students-repository'

const findStudentByEmailService = new FindStudentByEmailService(
  studentsRepositoryTest
)

describe('Search student by email', () => {
  it('should be able to find a student', async () => {
    studentsRepositoryTest.findUniqueByEmail.mockReturnValueOnce({
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

    expect(studentsRepositoryTest.findUniqueByEmail).toBeCalled()
  })

  it('should not be able to search an student without an E-Mail', async () => {
    await expect(
      findStudentByEmailService.execute({
        email: '',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByEmail).not.toBeCalled()
  })

  it('should not be able to find an student with an unrigistered E-Mail', async () => {
    // If 'findUniqueByEmailSpy' returns nothing, an Student with that email does not exists

    await expect(
      findStudentByEmailService.execute({
        email: 'cl200146@g.unicamp.br',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByEmail).toBeCalled()
  })
})
