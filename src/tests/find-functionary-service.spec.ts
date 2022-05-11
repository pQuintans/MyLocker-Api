import { FindFunctionaryService } from '@services/find-functionary-service'

const findUniqueByCpfSpy = jest.fn()

const findFunctionaryService = new FindFunctionaryService({
  create: null,
  findUniqueByCpf: findUniqueByCpfSpy,
  findUniqueByEmail: null,
})

describe('Search functionary', () => {
  it('should be able to find a functionary', async () => {
    findUniqueByCpfSpy.mockReturnValueOnce({
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

    expect(findUniqueByCpfSpy).toHaveBeenCalled()
  })

  it('should not be able to find a functionary without an CPF', async () => {
    await expect(
      findFunctionaryService.execute({
        cpf: '',
      })
    ).rejects.toThrow()

    expect(findUniqueByCpfSpy).not.toHaveBeenCalled()
  })

  it('should not be able to find a functionary with an unrigestered CPF', async () => {
    // If 'findUniqueByCpfSpy' returns nothing, an Functionary with that cpf does not exists

    await expect(
      findFunctionaryService.execute({
        cpf: '123',
      })
    ).rejects.toThrow()

    expect(findUniqueByCpfSpy).toHaveBeenCalled()
  })
})
