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
        @change="updateAccount"
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
    <el-col :span="model.type === AccountTypes.Local ? 6 : 12">
      <el-input
        v-model="model.login"
        placeholder="Введите логин"
        maxlength="100"
        @change="updateAccount"
      />
    </el-col>
    <el-col
      v-if="model.type === AccountTypes.Local"
      :span="6"
    >
      <el-input
        v-model="model.password"
        type="password"
        placeholder="Введите пароль"
        maxlength="100"
        @change="updateAccount"
      />
    </el-col>
    <el-col :span="1">
      <el-button
        type="danger"
        :icon="Delete"
        circle
        @click="emit('delete')"
      />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { computed, ref, watch, type Ref } from 'vue'
import { AccountTypes, type Account } from '../types'
import { clone } from '../utils'

const props = defineProps<{
  data: Account
}>()

const emit = defineEmits(['delete', 'update'])

const accountTypeOptions = [
  { label: 'Локальная', value: AccountTypes.Local },
  { label: 'LDAP', value: AccountTypes.Ldap },
]

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
    if (val === AccountTypes.Ldap) {
      model.value.password = null
    }
  }
)

function updateAccount() {
  const { login, password, type } = model.value
  if (login && ((password && type === AccountTypes.Local) || type == AccountTypes.Ldap)) {
    emit('update', clone(model.value))
  }
}
</script>

<style scoped>
.account {
  margin: 5px 0;
}
</style>
