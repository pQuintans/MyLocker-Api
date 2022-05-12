import { CreateFunctionaryService } from '@services/functionary/create-functionary-service'
import { functionariesRepositoryTest } from './functionaries-repository'

const createFunctionary = new CreateFunctionaryService(
  functionariesRepositoryTest
)

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

    expect(functionariesRepositoryTest.findUniqueByCpf).toHaveBeenCalled()
    expect(functionariesRepositoryTest.findUniqueByEmail).toHaveBeenCalled()
    expect(functionariesRepositoryTest.create).toHaveBeenCalled()
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

    expect(functionariesRepositoryTest.findUniqueByCpf).not.toHaveBeenCalled()
    expect(functionariesRepositoryTest.findUniqueByEmail).not.toHaveBeenCalled()
    expect(functionariesRepositoryTest.create).not.toHaveBeenCalled()
  })

  it('should not be able to create a functionary with an already registered CPF', async () => {
    functionariesRepositoryTest.findUniqueByCpf.mockReturnValueOnce({
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

    expect(functionariesRepositoryTest.findUniqueByCpf).toHaveBeenCalled()
    expect(functionariesRepositoryTest.findUniqueByEmail).not.toHaveBeenCalled()
    expect(functionariesRepositoryTest.create).not.toHaveBeenCalled()
  })

  it('should not be able to create a functionary with an already registered E-Mail', async () => {
    functionariesRepositoryTest.findUniqueByEmail.mockReturnValue({
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

    expect(functionariesRepositoryTest.findUniqueByCpf).toHaveBeenCalled()
    expect(functionariesRepositoryTest.findUniqueByEmail).toHaveBeenCalled()
    expect(functionariesRepositoryTest.create).not.toHaveBeenCalled()
  })
})
