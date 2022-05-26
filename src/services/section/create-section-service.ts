interface CreateSectionServiceData {
  color: string
  right_room: string
  left_room: string
}

export class CreateSectionService {
  constructor(private sectionsRepository) {}

  async handle(request: CreateSectionServiceData) {
    const { color, left_room, right_room } = request

    if (!color || !left_room || !right_room) {
      throw new Error('Faltam informações')
    }

    await this.sectionsRepository.create({
      color,
      left_room,
      right_room,
    })

    return
  }
}
