<template>
  <div class='texts' :style="{ color, 'font-size': fontsize + 'px', 'text-align': align }">
    {{ texts }}
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    texts: {
      type: String,
      default: ''
    },
    align: {
      type: String,
      default: 'left'
    },
    fontsize: {
      type: Number,
      default: 14
    },
    color: {
      type: String,
      default: '#000'
    }
  },
  data() {
    return {
      configs: {
        desc_texts: ''
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.texts{
  display: inline-block;
  width: 100%;
}
</style>