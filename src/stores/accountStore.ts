import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

type Account = {
  id: number
  labels: string[]
  type: string
  login: string
  password: string
}

export const useAccountStore = defineStore('accountStore', () => {
  const accounts: Ref<Account[]> = ref([])

  function addAccount(account: Account) {
    console.log(account)
  }

  function updateAccount(account: Account) {
    console.log(account)
  }

  function deleteAccount(accountId: number) {
    console.log(accountId)
  }

  return { accounts, addAccount, updateAccount, deleteAccount }
})
