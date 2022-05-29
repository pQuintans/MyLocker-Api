export interface SectionCreateData {
  color: string
  left_room: string
  right_room: string
}

export interface SectionsRepositories {
  create: (data: SectionCreateData) => Promise<void>
}
