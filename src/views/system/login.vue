<template>
  <div class="div-body">
    <div class="div-login">
      <el-form label-position="right" :model="loginForm" ref="loginForm" label-width="0px">
        <el-form-item class="form-item-title">
          <span class="span-title">用户登录</span>
        </el-form-item>
        <el-form-item>
          <el-input v-model="loginForm.userAccount" @keyup.enter="submitLogin" placeholder="example@qq.com" prefix-icon="fa fa-user-circle-o"
            clearable />
          <i v-show="emailTip" :class="[isEmail.res?'fa fa-check-circle-o el-form-item__success':'fa fa-times-circle-o el-form-item__error']">{{isEmail.msg}}</i>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input v-model="loginForm.userPassword" placeholder="密码至少包含字母数字" prefix-icon="fa fa-lock" show-password />
          <i v-show="passwordTip" :class="[isPassword.res?'fa fa-check-circle-o el-form-item__success':'fa fa-times-circle-o el-form-item__error']">{{isPassword.msg}}</i>
        </el-form-item>
        <el-form-item prop="verifyCode">
          <el-input v-model="verifyCode" placeholder="请输入验证码" @keyup.enter="submitLogin" prefix-icon="fa fa-info-circle" class="input-verify-code" />
          <i v-show="verifyCodeTip" :class="[isVerifyCode.res?'fa fa-check-circle-o el-form-item__success':'fa fa-times-circle-o el-form-item__error']">{{isVerifyCode.msg}}</i>
          <span id="verify" @click="refreshVerifyCode"></span> </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLogin" :loading="loadingBtn">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      refreshVerifyCode() {
        this.verifyCode = ""
      },
      submitLogin() {
        //判断信息是否填写完整
        if (this.isEmail.code == 1 || this.isPassword.code == 1 || this.isVerifyCode.code == 1) {
          this.$notify({
            type: 'warning',
            message: '请将信息填写完整后重试',
            showClose: false
          });
        }
        //判断信息是否通过校验
        else if (this.isEmail.res != true || this.isPassword.res != true || this.isVerifyCode.res != true) {
          this.$notify({
            type: 'warning',
            message: '信息填写有误，请重试'
          });
        } else {
          this.loadingBtn = true;
          this.$refs.loginForm.validate()
            .then(res => {
              if (this.loginForm.userAccount == 'dylan@qq.com' && this.loginForm.userPassword == 'xytt980926') {
                setTimeout(() => {
                  this.$notify({
                    type: 'success',
                    message: '登录成功',
                    showClose: false,
                  });
                  this.loadingBtn = false;
                  this.$router.push('/home')
                }, 500);

              } else {
                setTimeout(() => {
                  this.$notify({
                    type: 'error',
                    message: '登录失败',
                    showClose: false,
                  });
                  this.loadingBtn = false;
                }, 500);

              }
            })
            .catch(error => {
              setTimeout(() => {
                this.$notify({
                  type: 'error',
                  message: '未知错误',
                  showClose: false,
                });
                this.loadingBtn = false;
              }, 500);
            })
        }
      },
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
        //console.log(this.isVerifyCode)
      },
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../style/login.less");

</style>
<style scoped>
  /* scoped穿透 */
  .div-login>>>.el-form-item .el-form-item__content {
    height: 40px !important;
  }
</style>
