const createSpy = jest.fn()
const listAllSpy = jest.fn()
const findUniqueByNumberSpy = jest.fn()

export const lockersRepositoryTest = {
  create: createSpy,
  listAll: listAllSpy,
  findUniqueByNumber: findUniqueByNumberSpy,
}
