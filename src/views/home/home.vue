<template>
  <el-container class="div-home">
    <el-header>
      <el-image src="@/assets.logo.png">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline" />
        </div>
      </el-image>
      <div class="div-nav-right">
        <el-avatar :size="40" :src="headUrl"></el-avatar>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{userName}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="fa fa-user-circle" aria-hidden="true">{{$t("home.menu.profile")}}</el-dropdown-item>
            <el-dropdown-item icon="fa fa-tachometer" aria-hidden="true">{{$t('home.menu.changeSkin')}}</el-dropdown-item>
            <el-dropdown-item icon="fa fa-sign-out" aria-hidden="true" divided>{{$t('home.menu.signOut')}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <el-aside>
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
          </el-submenu>

        </el-menu>
        <div>
          <router-link to="register">登录</router-link>
        </div>
      </el-aside>
      <keep-alive>
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
            <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
          </el-breadcrumb>
          <div style="padding: 10px;"><router-view /></div>
        </el-main>
      </keep-alive>
    </el-container>
    <el-footer>小天才程序员古股份有限公司</el-footer>
  </el-container>
</template>
<script>
  export default {
    name: 'Home',
    mounted() {
      this.$router.push('/index')
    },
    data() {
      return {
        headUrl: '@/img/head.jpg',
        logoUrl: 'logo.png',
        userName: '小天才程序员'
      }
    }
  }
</script>
<style lang="less">
  @import url("../../style/home/home.less");
  /* .el-aside .el-menu{
    border-right: none !important
  } */
</style>
