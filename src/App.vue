<template>
  <main>
    <!-- раскомментируй для проверки -->
    <!-- <pre style="font-size: x-small">{{ accountStore.accounts }}</pre> -->
    <header class="page-header">
      <h2>Учетные записи</h2>
      <el-button @click="addAccount">Добавить</el-button>
    </header>
    <el-alert
      type="info"
      :closable="false"
      title="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
    />
    <el-row
      class="list-titles"
      :gutter="10"
    >
      <el-col :span="6"><el-text type="info">Метки</el-text></el-col>
      <el-col :span="5"><el-text type="info">Тип записи</el-text></el-col>
      <el-col :span="6"><el-text type="info">Логин</el-text></el-col>
      <el-col :span="6"><el-text type="info">Пароль</el-text></el-col>
      <el-col :span="1"></el-col>
    </el-row>

    <el-scrollbar
      v-if="accountStore.accounts.length"
      height="calc(100vh - 200px)"
    >
      <div
        v-for="(account, index) of accountStore.accounts"
        :key="index"
      >
        <AccountItem
          :data="account"
          @update="updateAccount(index, $event)"
          @delete="deleteAccount(index, account.id)"
        />
      </div>
    </el-scrollbar>
    <el-text
      v-else
      class="empty-info"
    >
      Список пуст
    </el-text>
  </main>
</template>

<script setup lang="ts">
import AccountItem from './components/AccountItem.vue'
import { useAccountStore } from './stores/accountStore'
import { AccountTypes, type Account } from './types'
import { showSuccessMessage } from './utils'

const accountStore = useAccountStore()

function addAccount() {
  const newAccount: Account = {
    id: null,
    labels: [],
    type: AccountTypes.Local,
    login: null,
    password: null,
  }
  accountStore.accounts.push(newAccount)
}

function updateAccount(index: number, data: Account) {
  if (data.id) {
    const account = accountStore.accounts.find((item) => item.id === data.id) ?? {}
    Object.assign(account, data)
    showSuccessMessage('Запись изменена')
  } else {
    data.id = new Date().getTime()
    accountStore.accounts[index] = data
    showSuccessMessage('Запись создана')
  }
  accountStore.saveStore()
}

function deleteAccount(index: number, accountId: number | null) {
  if (accountId) {
    accountStore.accounts = accountStore.accounts.filter((item) => item.id !== accountId)
    accountStore.saveStore()
    showSuccessMessage('Запись удалена')
  } else {
    accountStore.accounts.splice(index, 1)
  }
}
</script>

<style scoped>
main {
  margin: 0 10%;
}
.page-header {
  display: flex;
  align-items: center;
  gap: 20px;
}
.list-titles {
  margin-top: 14px;
}
.accounts-list {
  overflow-y: auto;
  height: calc(100vh - 200px);
}
.empty-info {
  width: 100%;
  text-align: center;
  display: block;
  font-size: 20px;
  margin-top: 30px;
}
</style>
