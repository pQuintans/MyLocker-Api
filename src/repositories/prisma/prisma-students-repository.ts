import { prisma } from '../../prisma'

import {
  StudentClearOutLocker,
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
      include: {
        _count: {
          select: {
            apm: true,
          },
        },
        apm: {
          orderBy: {
            id: 'desc',
          },
          take: 1,
          select: {
            id: true,
            status: true,
          },
        },
      },
    })

    return student
  }

  async findUniqueByEmail({ email }: StudentFindUniqueByEmailData) {
    const student = await prisma.student.findUnique({
      where: {
        email: email,
      },
      include: {
        _count: {
          select: {
            apm: true,
          },
        },
        apm: {
          orderBy: {
            id: 'desc',
          },
          take: 1,
          select: {
            id: true,
            status: true,
          },
        },
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
    const student = await prisma.student.findUnique({
      where: {
        ra,
      },
    })

    if (student.locker_number != null) {
      await prisma.student.update({
        where: { ra },
        data: {
          status,
          password: null,
          profile_picture_url: null,
          code: null,
          locker: {
            update: {
              rentedAt: null,
              isRented: 0,
            },
            disconnect: true,
          },
        },
        include: {
          locker: true,
        },
      })
    } else {
      await prisma.student.update({
        where: { ra },
        data: {
          status,
          password: null,
          profile_picture_url: null,
          code: null,
        },
      })
    }
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

  async clearOutLocker({ ra }: StudentClearOutLocker) {
    await prisma.student.update({
      where: {
        ra,
      },
      data: {
        locker: {
          update: {
            rentedAt: null,
            isRented: 0,
          },
          disconnect: true,
        },
      },
    })
  }
}
