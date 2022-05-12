import { CreateStudentService } from '@services/student/create-student-service'
import { studentsRepositoryTest } from './students-repository'

const createStudent = new CreateStudentService(studentsRepositoryTest)

describe('Create student', () => {
  it('should be able to create a student', async () => {
    await expect(
      createStudent.execute({
        ra: '200146',
        first_name: 'Pedro',
        last_name: 'Quintans',
        email: 'cl200146@g.unicamp.br',
      })
    ).resolves.not.toThrow()

    expect(studentsRepositoryTest.create).toHaveBeenCalled()
    expect(studentsRepositoryTest.findUniqueByEmail).toHaveBeenCalled()
    expect(studentsRepositoryTest.findUniqueByRa).toHaveBeenCalled()
  })

  it('should not be able to create a student with missing informations', async () => {
    await expect(
      createStudent.execute({
        ra: '',
        first_name: '',
        last_name: '',
        email: '',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByRa).not.toHaveBeenCalled()
    expect(studentsRepositoryTest.findUniqueByEmail).not.toHaveBeenCalled()
    expect(studentsRepositoryTest.create).not.toHaveBeenCalled()
  })

  it('should not be able to create a student with an already registered RA', async () => {
    studentsRepositoryTest.findUniqueByRa.mockReturnValue({
      ra: '200146',
      first_name: 'Pedro',
      last_name: 'Quintans',
      email: 'teste@g.unicamp.br',
    }) //If 'findUniqueByRaSpy' returns something, an Student with that RA exists

    await expect(
      createStudent.execute({
        ra: '200146',
        first_name: 'Pedro',
        last_name: 'Quintans',
        email: 'email@g.unicamp.br',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByRa).toHaveBeenCalled()
    expect(studentsRepositoryTest.findUniqueByEmail).not.toHaveBeenCalled()
    expect(studentsRepositoryTest.create).not.toHaveBeenCalled()
  })

  it('should not be able to create a student with an already registered E-Mail', async () => {
    studentsRepositoryTest.findUniqueByRa.mockReset()

    studentsRepositoryTest.findUniqueByEmail.mockReturnValue({
      ra: '200126',
      first_name: 'Fábio',
      last_name: 'Henrique',
      email: 'email@g.unicamp.br',
    }) //If 'studentsRepositoryTest.findUniqueByEmail' returns something, an Student with that E-Mail exists

    await expect(
      createStudent.execute({
        ra: '200146',
        first_name: 'Pedro',
        last_name: 'Quintans',
        email: 'email@g.unicamp.br',
      })
    ).rejects.toThrow()

    expect(studentsRepositoryTest.findUniqueByRa).toHaveBeenCalled()
    expect(studentsRepositoryTest.findUniqueByEmail).toHaveBeenCalled()
    expect(studentsRepositoryTest.create).not.toHaveBeenCalled()
  })
})
