interface Label {
  text: string
}

export type AccountType = 'local' | 'ldap'

export type AccountTypeOption = {
  label: string
  value: AccountType
}

export interface Account {
  id: number | null
  labels: Label[]
  type: AccountType
  login: string | null
  password: string | null
}
