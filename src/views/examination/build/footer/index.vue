<template>
  <div class='main'>
    <div class='desc'>你已完成此次问卷</div>
    <a-button type='primary' @click='submit'>提交</a-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {

    }
  },
  methods: {
    submit() {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped lang='scss'>
.main{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 200px;
  .desc{
    color: #000;
  }
}
</style>