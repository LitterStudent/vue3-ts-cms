<template>
  <div class="login-acout">
    <el-form :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号:" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus/lib/components'
import { defineComponent, reactive, ref } from 'vue'
import { rules } from '../config/account.config'
import localStorage from '../../../utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localStorage.getCache('name') ?? '',
      password: localStorage.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (keepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid === true) {
          if (keepPassword === true) {
            localStorage.setCache('name', account.name)
            localStorage.setCache('password', account.password)
          }
          console.log('登录成功的逻辑')
          store.dispatch('login/accountLoginAction', { ...account })
        } else {
          console.log('登录失败的逻辑')
        }
      })
    }
    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style></style>
