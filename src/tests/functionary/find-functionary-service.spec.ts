import { FindFunctionaryService } from '@services/functionary/find-functionary-service'
import { functionariesRepositoryTest } from './functionaries-repository'

const findFunctionaryService = new FindFunctionaryService(
  functionariesRepositoryTest
)

describe('Search functionary', () => {
  it('should be able to find a functionary', async () => {
    functionariesRepositoryTest.findUniqueByCpf.mockReturnValueOnce({
      cpf: '123',
      first_name: 'Fábio',
      last_name: 'Henrique',
      email: 'email@g.unicamp.br',
      password: '123',
    })

    await expect(
      findFunctionaryService.execute({
        cpf: '123',
      })
    ).resolves.not.toThrow()

    expect(functionariesRepositoryTest.findUniqueByCpf).toHaveBeenCalled()
  })

  it('should not be able to find a functionary without an CPF', async () => {
    await expect(
      findFunctionaryService.execute({
        cpf: '',
      })
    ).rejects.toThrow()

    expect(functionariesRepositoryTest.findUniqueByCpf).not.toHaveBeenCalled()
  })

  it('should not be able to find a functionary with an unrigestered CPF', async () => {
    // If 'findUniqueByCpfSpy' returns nothing, an Functionary with that cpf does not exists

    await expect(
      findFunctionaryService.execute({
        cpf: '123',
      })
    ).rejects.toThrow()

    expect(functionariesRepositoryTest.findUniqueByCpf).toHaveBeenCalled()
  })
})
