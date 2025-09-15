<template>
  <el-row
    class="account"
    :gutter="10"
  >
    <el-col :span="6">
      <el-input
        v-model="labels"
        placeholder="Введите метки через ;"
        type="textarea"
        maxlength="50"
        :rows="1"
        autosize
        @blur="updateAccount"
      />
    </el-col>
    <el-col :span="5">
      <el-select
        v-model="model.type"
        placeholder="Укажите тип"
        @change="updateAccount"
      >
        <el-option
          v-for="item in accountTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-col>
    <el-col :span="model.type === 'local' ? 6 : 12">
      <el-input
        ref="loginRef"
        v-model="model.login"
        placeholder="Введите логин"
        maxlength="100"
        @blur="updateAccount"
      />
    </el-col>
    <el-col
      v-if="model.type === 'local'"
      :span="6"
    >
      <el-input
        ref="passwordRef"
        v-model="model.password"
        type="password"
        placeholder="Введите пароль"
        maxlength="100"
        @blur="updateAccount"
      />
    </el-col>
    <el-col :span="1">
      <el-button
        type="danger"
        :icon="Delete"
        circle
        text
        @click="emit('delete')"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { computed, nextTick, ref, watch, type Ref } from 'vue'
import type { Account, AccountTypeOption } from '../types'
import { clone, deepEq } from '../utils'

const props = defineProps<{
  data: Account
}>()

const emit = defineEmits(['delete', 'update'])

const accountTypeOptions: AccountTypeOption[] = [
  { label: 'Локальная', value: 'local' },
  { label: 'LDAP', value: 'ldap' },
]

const loginRef = ref()
const passwordRef = ref()

const model: Ref<Account> = ref(clone(props.data))

const labels = computed({
  get() {
    return model.value.labels.map((it) => it.text).join(';')
  },
  set(val) {
    model.value.labels = val.split(';').map((it) => ({ text: it }))
  },
})

watch(
  () => props.data,
  (val) => {
    model.value = clone(val)
  },
  { deep: true }
)

watch(
  () => model.value.type,
  (val) => {
    if (val === 'ldap') {
      model.value.password = null
    }
  }
)

async function updateAccount() {
  await nextTick()
  const { labels, type, login, password } = model.value
  if (login && ((type === 'local' && password) || type === 'ldap')) {
    model.value.login = login.trim()

    model.value.labels = labels.map((it) => ({ text: it.text.trim() })).filter((it) => it.text)
    if (!deepEq(props.data, model.value)) {
      emit('update', clone(model.value))
    }
  }
  loginRef.value.$el.classList[login ? 'remove' : 'add']('invalid')
  passwordRef.value.$el.classList[password ? 'remove' : 'add']('invalid')
}
</script>

<style scoped>
.account {
  margin: 5px 0;
}
</style>

<style>
.invalid .el-input__wrapper {
  box-shadow: 0 0 0 1px red inset;
}
</style>
