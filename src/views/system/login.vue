<template>
  <div class="div-body">
    <div class="div-login">
      <div class="div-left">this is a picture, developing</div>
      <div class="div-right">
        <el-form label-position="right" :model="loginForm" ref="loginForm" label-width="0px">
          <el-form-item class="form-item-title">
            <span class="span-title">{{$t("login.title")}}</span>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.userAccount"
              @keyup.enter.native="submitLogin"
              placeholder="example@qq.com"
              prefix-icon="fa fa-user-circle-o"
              clearable
            />
            <i
              v-show="emailTip"
              :class="[isEmail.res?'fa fa-check-circle-o el-form-item__success':'fa fa-times-circle-o el-form-item__error']"
            >{{isEmail.msg}}</i>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input
              v-model="loginForm.userPassword"
              @keyup.enter.native="submitLogin"
              placeholder="密码至少包含字母数字"
              prefix-icon="fa fa-lock"
              show-password
            />
            <i
              v-show="passwordTip"
              :class="[isPassword.res?'fa fa-check-circle-o el-form-item__success':'fa fa-times-circle-o el-form-item__error']"
            >{{isPassword.msg}}</i>
          </el-form-item>
          <el-form-item prop="verifyCode">
            <el-input
              v-model="verifyCode"
              placeholder="请输入验证码"
              @keyup.enter.native="submitLogin"
              prefix-icon="fa fa-info-circle"
              class="input-verify-code"
            />
            <i
              v-show="verifyCodeTip"
              :class="[isVerifyCode.res?'fa fa-check-circle-o el-form-item__success':'fa fa-times-circle-o el-form-item__error']"
            >{{isVerifyCode.msg}}</i>
            <span id="verify" @click="refreshVerifyCode"></span>
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="loadingBtn_register"
              @click="toRegister"
              class="btn-register"
            >{{$t("login.btn.register")}}</el-button>
            <el-button
              type="primary"
              @click="submitLogin"
              :loading="loadingBtn_login"
              class="btn-login"
            >
              {{$t("login.btn.login")}}
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
            </el-button>
          </el-form-item>
          <span class="span-forget">忘记密码</span>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { is_email, is_password } from "../../js/validator.js";
import GVerify from "../../js/verifyCode.js";
import { getUser } from "@/api/system/login.js";

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
      verifyCode: "", //保存生成的验证码
      GVerifyCode: {},
      loadingBtn_register: false, //按钮加载
      loadingBtn_login: false, //按钮加载
      loginForm: {
        userAccount: "",
        userPassword: ""
      }
    };
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
        type: "blend"
      });
      //this.GVerifyCode.refresh();
    },
    refreshVerifyCode() {
      this.verifyCode = "";
    },
    submitLogin() {
      //判断信息是否填写完整
      if (
        this.isEmail.code == 1 ||
        this.isPassword.code == 1 ||
        this.isVerifyCode.code == 1
      ) {
        this.$notify({
          type: "warning",
          message: "请将信息填写完整后重试！",
          showClose: false
        });
      }
      //判断信息是否通过校验
      else if (
        this.isEmail.res != true ||
        this.isPassword.res != true ||
        this.isVerifyCode.res != true
      ) {
        this.$notify({
          type: "warning",
          message: "信息填写有误，请重试！",
          showClose: false
        });
      } else {
        this.loadingBtn_login = true;
        getUser(this.loginForm.userAccount, this.loginForm.userPassword)
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              console.log(res);
              this.$notify({
                type: "success",
                message: res.msg,
                showClose: false
              });
              this.loadingBtn_login = false;
              this.$router.push("/home");
            }
          })
          .catch(() => {
            this.loadingBtn_login = false;
          });
      }
    },
    toRegister() {}
  },
  watch: {
    "loginForm.userAccount": function() {
      this.emailTip = true;
      this.isEmail = is_email(this.loginForm.userAccount);
    },
    "loginForm.userPassword": function() {
      this.passwordTip = true;
      this.isPassword = is_password(this.loginForm.userPassword);
    },
    verifyCode: function() {
      this.isVerifyCode = this.GVerifyCode.validate(this.verifyCode);
      this.verifyCodeTip = true;
      //console.log(this.isVerifyCode)
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../style/login.less");
</style>
<style scoped>
/* scoped穿透 */
/* .div-login>>>.el-form-item .el-form-item__content {
    height: 40px !important;
  } */
</style>
