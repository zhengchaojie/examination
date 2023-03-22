<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.ant-card-body{
  padding: 0 !important;
}
/* 谷歌美化滚动条 */
*::-webkit-scrollbar {
  width: 6px;
  height: 10px;
}
*::-webkit-scrollbar-track {
  background: #f0f2f5;
  border-radius: 2px;
}
*::-webkit-scrollbar-thumb {
  background: #c8d2e0;
  border-radius: 10px;
}
*::-webkit-scrollbar-thumb:hover {
  background: #c8d2e0;
}
*::-webkit-scrollbar-corner {
  background: #c8d2e0;
}
</style>
