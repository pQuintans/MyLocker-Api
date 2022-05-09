import { Functionary } from 'src/model/functionary-model'

export interface FunctionaryCreateData {
  cpf: string
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface FunctionaryFindUniqueData {
  cpf: string
}

export interface FunctionariesRepositories {
  create: (data: FunctionaryCreateData) => Promise<FunctionaryCreateData>
  findUnique: (data: FunctionaryFindUniqueData) => Promise<Functionary>
}
