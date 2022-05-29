import { PrismaSectionsRepository } from '@repositories/prisma/prisma-sections-repository'
import { CreateSectionService } from '@services/section/create-section-service'
import { Request, Response } from 'express'

export class CreateSectionController {
  async handle(req: Request, res: Response) {
    const { color, left_room, right_room } = req.body

    const sectionsRepository = new PrismaSectionsRepository()
    const createSectionService = new CreateSectionService(sectionsRepository)

    await createSectionService.execute({
      color,
      left_room,
      right_room,
    })

    return res.status(201).send()
  }
}
