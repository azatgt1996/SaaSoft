<template>
  <main>
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
    <Account />
  </main>
</template>

<script setup lang="ts">
import Account from './components/Account.vue'

function addAccount() {}
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
</style>
