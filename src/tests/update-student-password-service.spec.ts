// import { FindStudentByEmailService } from '@services/student/find-student-by-email-service'

// const updatePasswordSpy = jest.fn()

// const findStudentByEmailService = new FindStudentByEmailService({
//   create: null,
//   findUniqueByRa: null,
//   findUniqueByEmail: null,
//   updatePassword: updatePasswordSpy,
// })

// describe('Search student by email', () => {
//   it('should be able to find a student', async () => {
//     updatePasswordSpy.mockReturnValueOnce({
//       ra: '200146',
//       first_name: 'Pedro',
//     }) //if 'findUniqueByEmailSpy' returns something, an student was found

//     await expect(
//       findStudentByEmailService.execute({
//         email: 'cl200146@g.unicamp.br',
//       })
//     ).resolves.not.toThrow()

//     expect(updatePasswordSpy).toBeCalled()
//   })
// })
