import { Functionary } from 'src/model/functionary-model'

export interface FunctionaryCreateData {
  cpf: string
  first_name: string
  last_name: string
  email: string
  password: string
}

export interface FunctionaryFindUniqueByCpfData {
  cpf: string
}

export interface FunctionaryFindUniqueByEmailData {
  email: string
}

export interface FunctionariesRepositories {
  create: (data: FunctionaryCreateData) => Promise<void>

  findUniqueByCpf: (
    data: FunctionaryFindUniqueByCpfData
  ) => Promise<Functionary>

  findUniqueByEmail: (
    data: FunctionaryFindUniqueByEmailData
  ) => Promise<Functionary>
}
