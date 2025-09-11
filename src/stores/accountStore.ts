import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Account } from '../types'

export const useAccountStore = defineStore('accountStore', () => {
  const accountsFromLS: Account[] = JSON.parse(localStorage.getItem('accounts') ?? '[]')
  const accounts: Ref<Account[]> = ref(accountsFromLS)

  function saveStore() {
    localStorage.setItem('accounts', JSON.stringify(accounts.value))
  }

  return { accounts, saveStore }
})
