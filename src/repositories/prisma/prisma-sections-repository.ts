import {
  SectionCreateData,
  SectionsRepositories,
} from '@repositories/sections-repository'
import { prisma } from '../../prisma'

export class PrismaSectionsRepository implements SectionsRepositories {
  async create({ color, left_room, right_room }: SectionCreateData) {
    await prisma.section.create({
      data: {
        color,
        left_room,
        right_room,
        status: 1,
      },
    })
  }
}
