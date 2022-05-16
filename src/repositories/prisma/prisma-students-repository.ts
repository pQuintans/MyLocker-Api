import { prisma } from '../../prisma'

import {
  StudentCreateData,
  StudentFindUniqueByEmailData,
  StudentFindUniqueByRaData,
  StudentsRepositories,
  StudentUpdatePasswordData,
  StudentUpdateProfilePictureData,
  StudentUpdateVerificationCodeData,
} from '@repositories/students-repository'

export class PrismaStudentsRepository implements StudentsRepositories {
  async create({ ra, first_name, last_name, email }: StudentCreateData) {
    await prisma.student.create({
      data: {
        ra,
        first_name,
        last_name,
        email,
        status: 1,
      },
    })
  }

  async findUniqueByRa({ ra }: StudentFindUniqueByRaData) {
    const student = await prisma.student.findUnique({
      where: {
        ra: ra,
      },
    })

    return student
  }

  async findUniqueByEmail({ email }: StudentFindUniqueByEmailData) {
    const student = await prisma.student.findUnique({
      where: {
        email: email,
      },
    })

    return student
  }

  async updatePassword({ ra, password }: StudentUpdatePasswordData) {
    await prisma.student.update({
      where: { ra },
      data: { password },
    })
  }

  async updateVerificationCode({
    ra,
    code,
  }: StudentUpdateVerificationCodeData) {
    await prisma.student.update({
      where: { ra },
      data: { code },
    })
  }

  async updateProfilePicture({ ra, url }: StudentUpdateProfilePictureData) {
    await prisma.student.update({
      where: { ra },
      data: { profile_picture_url: url },
    })
  }
}
