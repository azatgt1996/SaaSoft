export type Label = {
  text: string
}

export type Account = {
  id: number | null
  labels: Label[]
  type: string
  login: string | null
  password: string | null
}

export enum AccountTypes {
  Local = 'local',
  Ldap = 'ldap',
}
