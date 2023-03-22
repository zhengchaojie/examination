<template>
  <div class="content">
    <div class="switchBox">
      <span>开启自动暂存</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isCacheChange" />
    </div>
    <div class="switchBox">
      <span>显示题目序号</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isTitleChange" />
    </div>
    <div class="switchBox">
      <span>显示进度条</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isProgressChange" />
    </div>
    <div class="switchBox">
      <span>设置问卷默认答案</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-button style="display: block; margin: 6px 0 -12px 6px" size="small"> 点击修改</a-button>
      <a-switch class="switch" default-checked @change="isAnswerChange" />
    </div>
    <div class="switchBox">
      <span>一页一题</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isPageChange" />
    </div>
    <div class="switchBox">
      <span>显示答题卡</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isAnswerSheetChange" />
    </div>
    <div class="switchBox">
      <span>允许复制题目</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-switch class="switch" default-checked @change="isCopyChange" />
    </div>
    <div class="switchBox">
      <span>问题校验</span>
      <a-icon type="info-circle" style="margin-left: 10px" />
      <a-select class="switch" default-value="2" style="width: 120px" @change="isCopyChange">
        <a-select-option v-for="(item, index) in questionRuleOptions" :key="index" :value="item.value">
          {{ item.label }}
        </a-select-option>
      </a-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      questionRuleOptions: [
        { label: '输入时校验', value: '1' },
        { label: '离开时校验', value: '2' },
        { label: '提交时校验', value: '3' },
      ],
    }
  },
  methods: {
    isCacheChange(checked) {
      console.log(`开启自动缓存： ${checked}`)
    },
    isTitleChange(checked) {
      console.log(`显示题目序号： ${checked}`)
    },
    isProgressChange(checked) {
      console.log(`显示进度条： ${checked}`)
    },
    isAnswerChange(checked) {
      console.log(`设置问卷默认答案： ${checked}`)
    },
    isPageChange(checked) {
      console.log(`一页一题： ${checked}`)
    },
    isAnswerSheetChange(checked) {
      console.log(`显示答题卡： ${checked}`)
    },
    isCopyChange(checked) {
      console.log(`允许复制题目： ${checked}`)
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