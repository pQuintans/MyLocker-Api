const createFunctionarySpy = jest.fn()
const findUniqueByEmailSpy = jest.fn()
const findUniqueByCpfSpy = jest.fn()

export const functionariesRepositoryTest = {
  create: createFunctionarySpy,
  findUniqueByEmail: findUniqueByEmailSpy,
  findUniqueByCpf: findUniqueByCpfSpy,
}
