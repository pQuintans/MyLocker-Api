import { CreateFunctionaryService } from '@services/create-functionary-service'

const createStudentSpy = jest.fn()
const findUniqueByEmailSpy = jest.fn()
const findUniqueByCpfSpy = jest.fn()

const createFunctionary = new CreateFunctionaryService({
  create: createStudentSpy,
  findUniqueByEmail: findUniqueByEmailSpy,
  findUniqueByCpf: findUniqueByCpfSpy,
})

describe('Create functionary', () => {
  it('should be able to create a functionary', async () => {
    await expect(
      createFunctionary.execute({
        cpf: '123',
        first_name: 'Pedro',
        last_name: 'Quintans',
        email: 'cl200146@g.unicamp.br',
        password: '123',
      })
    ).resolves.not.toThrow()

    expect(findUniqueByCpfSpy).toHaveBeenCalled()
    expect(findUniqueByEmailSpy).toHaveBeenCalled()
    expect(createStudentSpy).toHaveBeenCalled()
  })

  it('should not be able to create a functionary with missing informations', async () => {
    await expect(
      createFunctionary.execute({
        cpf: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '123',
      })
    ).rejects.toThrow()

    expect(findUniqueByCpfSpy).not.toHaveBeenCalled()
    expect(findUniqueByEmailSpy).not.toHaveBeenCalled()
    expect(createStudentSpy).not.toHaveBeenCalled()
  })

  it('should not be able to create a functionary with an already registered CPF', async () => {
    findUniqueByCpfSpy.mockReturnValueOnce({
      cpf: '123',
      first_name: 'Pedro',
      last_name: 'Quintans',
      email: 'teste@g.unicamp.br',
      password: '123',
    }) //If 'findUniqueByCpfSpy' returns something, an Functionary with that CPF exists

    await expect(
      createFunctionary.execute({
        cpf: '123',
        first_name: 'Pedro',
        last_name: 'Quintans',
        email: 'email@g.unicamp.br',
        password: '123',
      })
    ).rejects.toThrow()

    expect(findUniqueByCpfSpy).toHaveBeenCalled()
    expect(findUniqueByEmailSpy).not.toHaveBeenCalled()
    expect(createStudentSpy).not.toHaveBeenCalled()
  })

  it('should not be able to create a functionary with an already registered E-Mail', async () => {
    findUniqueByEmailSpy.mockReturnValue({
      cpf: '123',
      first_name: 'Fábio',
      last_name: 'Henrique',
      email: 'email@g.unicamp.br',
      password: '123',
    }) //If 'findUniqueByEmailSpy' returns something, an Functionary with that E-Mail exists

    await expect(
      createFunctionary.execute({
        cpf: '123',
        first_name: 'Pedro',
        last_name: 'Quintans',
        email: 'email@g.unicamp.br',
        password: '123',
      })
    ).rejects.toThrow()

    expect(findUniqueByCpfSpy).toHaveBeenCalled()
    expect(findUniqueByEmailSpy).toHaveBeenCalled()
    expect(createStudentSpy).not.toHaveBeenCalled()
  })
})
