<template>
  <div class="content">
    <div class="switchBox">
      <span>答题完成后跳转自定义页面</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isAnswerToChange" />
    </div>
    <div class="switchBox">
      <span>答题完成后跳转自定义链接</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isLinkChange" />
    </div>
    <div class="switchBox">
      <span>问卷链接</span>
      <div class="switch">
        <a-input-search placeholder="http://47.105.58.68:1991/s/RzsRh8" enter-button="打开" @search="onLink" />
      </div>
    </div>
    <div class="switchBox">
      <span>允许修改答案</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isEditAnswerChange" />
    </div>
    <div class="switchBox">
      <span>公开查询设置</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a class="switch" href="#" style="margin-right: 10px" @click="isFindChange">设置</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {}
  },
  methods: {
    isAnswerToChange(checked) {
      console.log(`答题完成后跳转自定义页面: ${checked}`)
    },
    isLinkChange(checked) {
      console.log(`答题完成后跳转自定义链接: ${checked}`)
    },
    onLink() {},
    isEditAnswerChange(checked) {
      console.log(`允许修改答案: ${checked}`)
    },
    isFindChange(checked) {
      console.log(`公开查询设置: ${checked}`)
    },
  },
}
</script>

<style scoped>
.switchBox {
  position: relative;
  margin: 24px 10px;
  font-size: 15px;
}
.switch {
  position: absolute;
  right: 0;
  top: 0;
}
.content {
  padding: 0 14px;
}
</style>