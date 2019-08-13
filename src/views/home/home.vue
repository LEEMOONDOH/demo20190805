<template>
  <el-container class="div-home">
    <el-header>
      <el-image src="@/assets.logo.png" alt="xi"></el-image>
      <!-- <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div> -->

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
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!-- <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
          </el-breadcrumb>
          <router-view />
        </el-main>
      </keep-alive>
    </el-container>
    <el-footer>小天才程序员古股份有限公司</el-footer>
  </el-container>
</template>
<script>
  export default {
    name: 'Home',
    data() {
      return {
        logoUrl: 'logo.png'
      }
    }
  }
</script>
<style>
  @import url("../../style/home.less");
  /* .el-aside .el-menu{
    border-right: none !important
  } */
</style>
