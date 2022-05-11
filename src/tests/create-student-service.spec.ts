import { CreateStudentService } from '@services/create-student-service'

const createStudentSpy = jest.fn()
const findUniqueByEmailSpy = jest.fn()
const findUniqueByRaSpy = jest.fn()

const createStudent = new CreateStudentService({
  create: createStudentSpy,
  findUniqueByEmail: findUniqueByEmailSpy,
  findUniqueByRa: findUniqueByRaSpy,
})

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

    expect(createStudentSpy).toHaveBeenCalled()
    expect(findUniqueByEmailSpy).toHaveBeenCalled()
    expect(findUniqueByRaSpy).toHaveBeenCalled()
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

    expect(findUniqueByRaSpy).not.toHaveBeenCalled()
    expect(findUniqueByEmailSpy).not.toHaveBeenCalled()
    expect(createStudentSpy).not.toHaveBeenCalled()
  })

  it('should not be able to create a student with an already registered RA', async () => {
    findUniqueByRaSpy.mockReturnValue({
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

    expect(findUniqueByRaSpy).toHaveBeenCalled()
    expect(findUniqueByEmailSpy).not.toHaveBeenCalled()
    expect(createStudentSpy).not.toHaveBeenCalled()
  })

  it('should not be able to create a student with an already registered E-Mail', async () => {
    findUniqueByRaSpy.mockReset()

    findUniqueByEmailSpy.mockReturnValue({
      ra: '200126',
      first_name: 'Fábio',
      last_name: 'Henrique',
      email: 'email@g.unicamp.br',
    }) //If 'findUniqueByEmailSpy' returns something, an Student with that E-Mail exists

    await expect(
      createStudent.execute({
        ra: '200146',
        first_name: 'Pedro',
        last_name: 'Quintans',
        email: 'email@g.unicamp.br',
      })
    ).rejects.toThrow()

    expect(findUniqueByRaSpy).toHaveBeenCalled()
    expect(findUniqueByEmailSpy).toHaveBeenCalled()
    expect(createStudentSpy).not.toHaveBeenCalled()
  })
})
