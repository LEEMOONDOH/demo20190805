<template>
  <div class="div-login">
    <el-form label-position="right" :model="loginForm" ref="loginForm" label-width="0px">
      <el-form-item class="form-item-title">
        <span class="span-title">用户登录</span>
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginForm.userAccount" placeholder="example@qq.com" prefix-icon="fa fa-user-circle-o"
          clearable />
        <i v-show="emailTip" :class="[isEmail.res?'fa fa-check-circle-o el-form-item__success':'fa fa-times-circle-o el-form-item__error']">{{isEmail.msg}}</i>
      </el-form-item>
      <el-form-item prop="userPassword">
        <el-input v-model="loginForm.userPassword" placeholder="密码至少包含字母数字" prefix-icon="fa fa-lock" show-password />
        <i v-show="passwordTip" :class="[isPassword.res?'fa fa-check-circle-o el-form-item__success':'fa fa-times-circle-o el-form-item__error']">{{isPassword.msg}}</i>
      </el-form-item>
      <el-form-item prop="verifyCode">
        <el-input v-model="verifyCode" placeholder="请输入验证码" prefix-icon="fa fa-info-circle" class="input-verify-code" />
        <i v-show="verifyCodeTip" :class="[isVerifyCode.res?'fa fa-check-circle-o el-form-item__success':'fa fa-times-circle-o el-form-item__error']">{{isVerifyCode.msg}}</i>
        <span id="verify" @click="refreshVerifyCode"></span>

      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitLogin" :loading="loadingBtn">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import {
    is_email,
    is_password
  } from '../../js/validator.js'
  import GVerify from '../../js/verifyCode.js'

  export default {
    name: "Login",

    data() {
      return {
        emailTip: false,
        passwordTip: false,
        verifyCodeTip: false, //控制是否展示提示信息
        isEmail: {
          code: 1,
          res: false
        },
        isPassword: {
          code: 1,
          res: false
        },
        isVerifyCode: {
          code: 1,
          res: false
        }, //保存校验的结果
        verifyCode: '', //保存生成的验证码
        GVerifyCode: {},
        loadingBtn: false, //按钮加载
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
      //生成验证码
      verifyFun() {
        this.GVerifyCode = new GVerify({
          id: "verify",
          type: 'blend',
        });
        //this.GVerifyCode.refresh();
      },
      refreshVerifyCode(){
        this.verifyCode = ""
      },
      submitLogin() {
        //判断信息是否填写完整
        if (this.isEmail.code == 1 || this.isPassword.code == 1 || this.isVerifyCode.code == 1) {
          this.$message({
            type: 'warning',
            message: '请将信息填写完整后重试'
          });
        }
        //判断信息是否通过校验
        else if (this.isEmail.res != true || this.isPassword.res != true || this.isVerifyCode.res != true) {
          this.$message({
            type: 'warning',
            message: '信息填写有误，请重试'
          });
        } else {
          this.loadingBtn = true;
          this.$refs.loginForm.validate()
            .then(res => {
              if (this.loginForm.userAccount == 'dylan@qq.com' && this.loginForm.userPassword == 'xytt980926') {
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
            })
            .catch(error => {
              setTimeout(() => {
                this.$message({
                  type: 'error',
                  message: '未知错误'
                });
                this.loadingBtn = false;
              }, 500);
            })
        }
      }

    },
    watch: {
      'loginForm.userAccount': function() {
        this.emailTip = true;
        this.isEmail = is_email(this.loginForm.userAccount);
      },
      'loginForm.userPassword': function() {
        this.passwordTip = true;
        this.isPassword = is_password(this.loginForm.userPassword);
      },
      'verifyCode': function() {
        this.isVerifyCode = this.GVerifyCode.validate(this.verifyCode);
        this.verifyCodeTip = true;
        console.log(this.isVerifyCode)
      },
      isEmail() {
        if (this.isEmail == false) {
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
    border-bottom: 1px solid #82767663;
  }

  .div-login .form-item-title .span-title {
    font-size: 24px !important;
  }

  .div-login .el-form-item i {
    font-size: 12px;
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

  #verify {
    width: 100px;
    height: 40px;
  }

  .el-form-item .el-form-item__content {
    height: 40px;
  }
</style>
