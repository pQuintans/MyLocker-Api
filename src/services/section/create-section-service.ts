interface CreateSectionServiceData {
  color: string
  right_room: string
  left_room: string
}

export class CreateSectionService {
  constructor(private sectionsRepository) {}

  async execute(request: CreateSectionServiceData) {
    const { color, left_room, right_room } = request

    if (!color || !left_room || !right_room) {
      throw new Error('Faltam informações')
    }

    if (left_room == right_room) {
      throw new Error(
        'As salas na direita e na esquerda da seção não podem ser iguais'
      )
    }

    await this.sectionsRepository.create({
      color,
      left_room,
      right_room,
    })

    return
  }
}
