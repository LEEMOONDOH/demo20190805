<template>
  <div class="div-login">
    <el-form label-position="right" :model="loginForm" :rules="rules" ref="loginForm" label-width="0px">
      <el-form-item class="form-item-title">
        <span class="span-title">用户登录</span>
      </el-form-item>
      <el-form-item prop="userAccount">
        <el-input v-model="loginForm.userAccount" placeholder="请输入邮箱" prefix-icon="fa fa-user-circle-o" clearable></el-input>

      </el-form-item>
      <el-form-item prop="userPassword">
        <el-input v-model="loginForm.userPassword" placeholder="请输入密码" prefix-icon="fa fa-lock" show-password></el-input>

      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input v-model="verifyCode" placeholder="请输入验证码" prefix-icon="fa fa-info-circle" class="input-verify-code"></el-input>

        <span id="verify"></span>
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
  import verifyCode from '../../components/verifyCode.vue'
  import GVerify from '../../js/verifyCode.js'

  export default {
    name: "Login",
    components: {
      verifyCode
    },

    data() {
      return {
        isEmail: false,
        verifyCode: '',
        GVerifyCode: {},
        loadingBtn: false,
        rules: {
          userAccount: [{
            required: true,
            validator: reg_email,
            trigger: 'blur',
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
    mounted() {
      var that = this;
      that.verifyFun();
    },
    methods: {
      verifyFun() {
        this.GVerifyCode = new GVerify({
          id: "verify",
          type: 'blend',
        });
        //this.GVerifyCode.refresh();
      },
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
    },
    watch: {
      'verifyCode': function() {
        console.log(this.GVerifyCode.validate(this.verifyCode))
        console.log(this.verifyCode)
      },
      isEmail (){
        if(this.isEmail == false){
          console.log(11111)
        }
      }
    }
  }
</script>

<style>
  body {
    background-image: url(../../img/bkg01.jpg);
  }

  .div-login {
    display: inline-block;
    width: 300px;
    position: absolute;
    top: 200px;
    right: 200px;
    padding: 20px 40px;
    text-align: center;
    border: 1px solid #eee;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .div-login .form-item-title {
    text-align: left;
    margin-bottom: 20px !important;
    border-bottom: 1px solid #82767663;
  }

  .div-login .form-item-title .span-title {
    font-size: 24px !important;
  }

  .div-login button {
    font-size: 18px;
    width: 300px;
    box-shadow: 2px 2px 5px 0 #3a8ee6;
  }

  .div-login .el-form-item {
    margin-bottom: 30px;
  }

  .div-login .input-verify-code {
    float: left;
    display: inline-block;
    width: 180px;
  }
</style>
