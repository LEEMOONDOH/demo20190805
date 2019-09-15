<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
#nprogress .bar {
  /* 自定义七色加载进度条*/
  background-color: #fd0004 !important;
  background-image: linear-gradient(
    90deg,
    #fd0004 0%,
    #fb8402 19%,
    #c6fd05 39%,
    #01d400 60%,
    #0b4ff9 80%,
    #cd01ff 100%
  );
  height: 3px;
}
</style>
