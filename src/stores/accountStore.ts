import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Account } from '../types'

export const useAccountStore = defineStore('accountStore', () => {
  const accountsFromLS: Account[] = JSON.parse(localStorage.getItem('accounts') ?? '[]')
  const accounts: Ref<Account[]> = ref(accountsFromLS)

  function saveStore() {
    const data = accounts.value.filter((item) => item.id)
    localStorage.setItem('accounts', JSON.stringify(data))
  }

  return { accounts, saveStore }
})
