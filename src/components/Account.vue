<template>
  <el-row
    class="account"
    :gutter="10"
  >
    <el-col :span="6">
      <el-input
        v-model="model.labels"
        placeholder="Введите метки через ;"
        type="textarea"
        maxlength="50"
        :rows="1"
      />
    </el-col>
    <el-col :span="5">
      <el-select
        v-model="model.accountType"
        placeholder="Укажите тип"
      >
        <el-option
          v-for="item in accountTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="model.accountType === 'local' ? 6 : 12">
      <el-input
        v-model="model.login"
        placeholder="Введите логин"
        maxlength="100"
      />
    </el-col>
    <el-col
      v-if="model.accountType === 'local'"
      :span="6"
    >
      <el-input
        v-model="model.password"
        type="password"
        placeholder="Введите пароль"
        maxlength="100"
      />
    </el-col>
    <el-col :span="1">
      <el-button
        type="danger"
        :icon="Delete"
        circle
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { ref } from 'vue'

const accountTypes = [
  { label: 'Локальная', value: 'local' },
  { label: 'LDAP', value: 'ldap' },
]

const model = ref({
  labels: '',
  accountType: 'local',
  login: '',
  password: '',
})
</script>

<style scoped>
.account {
  margin: 5px 0;
}
</style>
