import { prisma } from '../../prisma'

import {
  StudentCreateData,
  StudentFindUniqueByEmailData,
  StudentFindUniqueByRaData,
  StudentsRepositories,
  StudentupdateInformationData,
  StudentUpdateLockerNumberData,
  StudentUpdatePasswordData,
  StudentUpdateProfilePictureData,
  StudentUpdateStatusData,
  StudentUpdateVerificationCodeData,
} from '@repositories/students-repository'

export class PrismaStudentsRepository implements StudentsRepositories {
  async listAll() {
    const students = await prisma.student.findMany()
    return students
  }

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

  async updatePassword({ email, password }: StudentUpdatePasswordData) {
    await prisma.student.update({
      where: { email },
      data: { password },
    })
  }

  async updateVerificationCode({
    email,
    code,
  }: StudentUpdateVerificationCodeData) {
    await prisma.student.update({
      where: { email },
      data: { code, password: null },
    })
  }

  async updateProfilePicture({ ra, url }: StudentUpdateProfilePictureData) {
    await prisma.student.update({
      where: { ra },
      data: { profile_picture_url: url },
    })
  }

  async updateLockerNumber({
    ra,
    lockerNumber,
  }: StudentUpdateLockerNumberData) {
    await prisma.student.update({
      where: { ra },
      data: { locker_number: lockerNumber },
    })
  }

  async updateStatus({ ra, status }: StudentUpdateStatusData) {
    await prisma.student.update({
      where: { ra },
      data: {
        status,
        password: null,
        profile_picture_url: null,
        code: null,
        locker: {
          disconnect: true,
        },
      },
      include: {
        locker: true,
      },
    })
  }

  async updateInformation({
    ra,
    email,
    first_name,
    last_name,
  }: StudentupdateInformationData) {
    await prisma.student.update({
      where: {
        ra,
      },
      data: {
        email,
        first_name,
        last_name,
      },
    })
    return
  }
}
