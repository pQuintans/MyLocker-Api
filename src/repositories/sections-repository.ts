interface SectionCreateData {
  id: number
  color: string
  left_room: string
  right_room: string
}

export interface SectionInterface {
  create: (data: SectionCreateData) => Promise<void>
}
