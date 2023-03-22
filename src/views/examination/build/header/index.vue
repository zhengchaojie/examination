<template>
  <div class='main' @click='showOperate'>
    <img class='headerImg' :src='img' />
  </div>
</template>

<script>
export default {
   name: 'index',
  props: {
    img: {
      type: String,
      default: require('@/views/examination/assets/header.png')
    }
  },
  methods: {
    showOperate() {
      this.$emit('showoperate', true)
    }
  }
}
</script>

<style scoped>
.headerImg{
  width: 100%;
  height: 200px;
}
</style>