const createStudentSpy = jest.fn()
const findUniqueByEmailSpy = jest.fn()
const findUniqueByRaSpy = jest.fn()
const updateVerificationCodeSpy = jest.fn()
const updatePasswordSpy = jest.fn()
const updateProfilePictureSpy = jest.fn()

export const studentsRepositoryTest = {
  create: createStudentSpy,
  findUniqueByEmail: findUniqueByEmailSpy,
  findUniqueByRa: findUniqueByRaSpy,
  updateVerificationCode: updateVerificationCodeSpy,
  updatePassword: updatePasswordSpy,
  updateProfilePicture: updateProfilePictureSpy,
}
