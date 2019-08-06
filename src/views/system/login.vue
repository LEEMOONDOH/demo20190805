<template>
  <div class="div-login">
    <el-form label-position="right" :model="loginForm" :rules="rules" ref="loginForm" label-width="50px">
      <el-form-item style="margin-bottom: 20px;">
        <span class="span-title">登 录</span>
      </el-form-item>
      <el-form-item label="账号" prop="userAccount">
        <el-input v-model="loginForm.userAccount" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="userPassword">
        <el-input v-model="loginForm.userPassword" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitLogin" :loading="loadingBtn">登 录</el-button>
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
        loadingBtn: false,
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
    },
    methods: {
      submitLogin() {
        this.loadingBtn = true;
        if (this.loginForm.userAccount == '2102028233@qq.com' && this.loginForm.userPassword == 'xytt@980926') {
          setTimeout(() => {
            this.$message({
              type: 'success',
              message: '登录成功'
            });
            this.loadingBtn = false;
          }, 500);

        } else {
          setTimeout(() => {
            this.$message({
              type: 'error',
              message: '登录失败'
            });
            this.loadingBtn = false;
          }, 500);

        }
      }
    }
  }
</script>

<style>
  .div-login {
    display: inline-block;
    width: 400px;
    padding: 20px 50px 20px 30px;
    text-align: center;
    border: 1px solid #eee;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;

  }

  .div-login .span-title {
    font-size: 24px !important;
  }

  .div-login button {
    width: 350px;
  }
  .div-login .el-form-item{
    margin-bottom: 30px;
  }
</style>
