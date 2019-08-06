<template>
  <div class="login">
    <el-form label-position="right" :model="loginForm" :rules="rules" ref="loginForm" label-width="50px">
      <el-form-item label="账号" prop="userAccount">
        <el-input v-model="loginForm.userAccount" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input v-model="loginForm.userPassword" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import {
    reg_email,
    reg_password
  } from '../../js/validator.js'
  export default {
    name: "Login",
    data() {
      return {
        rules: {
          userAccount: [{
            required: true,
            validator: reg_email,
            trigger: 'blur'
          }],
          userPassword: [{
            required: true,
            validator: reg_password,
            trigger: 'blur'
          }]
        },
        loginForm: {
          userAccount: '',
          userPassword: ''
        }
      }
    }
  }
</script>

<style>
  .login {
    display: inline-block;
    width: 400px;
  }

  .login button {
    width: 350px;
  }
</style>
