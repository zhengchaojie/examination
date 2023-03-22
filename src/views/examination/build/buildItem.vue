<template>
  <a-form-model-item
    :prop='record.__vModel__'
    :rules='rule'
    class='buildItem_VIEW'
  >
    <span v-if='record.__config__.showLabel' slot='label'>
      <span>{{ ind + 1 }}. {{ record.__config__.label }}</span>
    </span>
    <a-col :span='record.__config__.span'>
      <!-- 单行文本 -->
      <a-input
        v-if="record.__config__.type === 'input'"
        :disabled='disabled || record.readOnly'
        :placeholder='record.placeholder'
        :allowClear='true'
        :maxLength='record.maxLength'
        @change='handleChange($event, record.__vModel__)'
        v-model='data[record.__vModel__]'
      />
      <!-- 多行文本 -->
      <a-textarea
        v-if="record.__config__.type === 'textarea'"
        :disabled='disabled || record.readOnly'
        :placeholder='record.placeholder'
        :allowClear='true'
        :maxLength='record.maxLength'
        rows='4'
        @change='handleChange($event.target.value, record.__vModel__)'
        v-model='data[record.__vModel__]'
      />
      <!-- 数字框 -->
      <a-input-number
        v-if="record.__config__.type === 'number'"
        :disabled='disabled || record.readOnly'
        :placeholder='record.placeholder'
        :allowClear='true'
        style='width: 100%'
        :min="0"
        :step="1"
        :precision="0"
        @change='handleChange($event, record.__vModel__)'
        v-model='data[record.__vModel__]'
      />
      <!-- 密码框 -->
      <a-input-password
        v-if="record.__config__.type === 'password'"
        :disabled='disabled || record.readOnly'
        :placeholder='record.placeholder'
        :allowClear='true'
        style='width: 100%'
        :min="0"
        :step="1"
        :precision="0"
        @change='handleChange($event, record.__vModel__)'
        v-model='data[record.__vModel__]'
      />
      <!-- 选择框 -->
      <a-select
        v-if="record.__config__.type === 'select'"
        :disabled='disabled || record.readOnly'
        :placeholder='record.placeholder'
        :allowClear='true'
        @change='handleChange($event, record.__vModel__)'
        v-model='data[record.__vModel__]'
        :getPopupContainer="
        triggerNode => {
          return triggerNode.parentNode || document.body
        }"
        :options='record.__slot__.options ? record.__slot__.options : []'
      >
      </a-select>
      <!--   级联选择   -->
      <a-cascader
        v-if="record.__config__.type === 'cascader'"
        :disabled='disabled || record.readOnly'
        :placeholder='record.placeholder'
        :allowClear='true'
        @change='handleChange($event, record.__vModel__)'
        v-model='data[record.__vModel__]'
        :options='record.options ? record.options : []'
      />
      <!--   单选框   -->
      <a-radio-group
        v-if="record.__config__.type === 'radio'"
        :options="record.__slot__.options ? record.__slot__.options : []"
        v-model='data[record.__vModel__]'
        @change="handleChanges($event, record.__vModel__, record)" />
      <!--   多选框   -->
      <a-checkbox-group
        v-if="record.__config__.type === 'checkbox'"
        :options="record.__slot__.options ? record.__slot__.options : []"
        v-model='data[record.__vModel__]'
        :placeholder='record.placeholder'
        @change="handleChanges($event, record.__vModel__, record)"
      />
      <!--   评分   -->
      <a-rate
        v-if="record.__config__.type === 'rate'"
        v-model="data[record.__vModel__]"
        @change='handleChange($event, record.__vModel__)'
      />
      <!--   滑动条   -->
      <a-slider
        v-if="record.__config__.type === 'slider'"
        :default-value="30"
        v-model="data[record.__vModel__]"
        @change='handleChange($event, record.__vModel__)'
      />
      <!--   时间选择   -->
      <a-time-picker
        v-if="record.__config__.type === 'time'"
        v-model="data[record.__vModel__]"
        :format='record.format'
        :placeholder='record.placeholder'
        :valueFormat='record["value-format"]'
        @change='handleChange($event, record.__vModel__)'
      />
      <!--   日期选择   -->
      <a-date-picker
        v-if="record.__config__.type === 'date'"
        v-model="data[record.__vModel__]"
        :format='record.format'
        :placeholder='record.placeholder'
        :valueFormat='record["value-format"]'
        @change='handleChange($event, record.__vModel__)'
      />
      <!--   月份选择   -->
      <a-month-picker
        v-if="record.__config__.type === 'date'"
        v-model="data[record.__vModel__]"
        :format='record.format'
        :placeholder='record.placeholder'
        :valueFormat='record["value-format"]'
        @change='handleChange($event, record.__vModel__)'
      />
      <!--   周选择   -->
      <a-week-picker
        v-if="record.__config__.type === 'date'"
        v-model="data[record.__vModel__]"
        :format='record.format'
        :placeholder='record.placeholder'
        :valueFormat='record["value-format"]'
        @change='handleChange($event, record.__vModel__)'
      />
      <!--   范围选择   -->
      <a-range-picker
        v-if="record.__config__.type === 'time-range'"
        v-model="data[record.__vModel__]"
        :format='record.format'
        :placeholder='record.placeholder'
        :valueFormat='record["value-format"]'
        @change='handleChange($event, record.__vModel__)'
      />
      <!--   开关   -->
      <a-switch
        v-if="record.__config__.type === 'switch'"
        v-model="data[record.__vModel__]"
        @change='handleChange($event, record.__vModel__)'
      />
      <!--   上传   -->
      <a-upload
        v-if="record.__config__.type === 'upload'"
        :action="record.action"
        :accept='record.accept'
        :list-type="record['list-type']"
        :multiple='record.multiple'
        :file-list="data[record.__vModel__]"
        @preview="handlePreview"
        @remove="handleRemove($event, record.__vModel__)"
        @before-upload="beforeUpload($event, record.__vModel__)"
      >
        <template v-if="record['list-type'] === 'picture-card'">
          <div v-if="data[record.__vModel__].length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              上传
            </div>
          </div>
        </template>
        <template v-else>
          <a-button> <a-icon type="upload" /> 上传 </a-button>
        </template>
      </a-upload>
      <!--   手写签名   -->
      <sign-canvas
        v-if="record.__config__.type === 'signCanvas'"
        :canvas-refs='record.__vModel__'
        @change='handleChange($event, record.__vModel__)'
      />
      <!--   纯文本   -->
      <texts
        v-if="record.__config__.type === 'texts'"
        :texts='record.__config__.desc_texts'
        :align='record.__config__.align'
        :color='record.__config__.color'
        :fontsize='record.__config__.fontSize'
        @change='handleChange($event, record.__vModel__)'
      />
    </a-col>
  </a-form-model-item>
</template>

<script>
import { deepClone } from '@/utils/examination_index'
import headers from '@/views/examination/build/header'
export default {
  name: 'buildItem',
  components: {
    headers
  },
  props: {
    formConfig: {
      type: Object,
      default: ()=> {}
    },
    record: {
      type: Object,
      default: ()=> {}
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Object, Array, Boolean, Number]
    },
    ind: {
      type: Number,
      default: 1
    },
    model: {
      type: Object,
      default: ()=> {}
    },
    rules: {
      type: Array,
      default: ()=> []
    }
  },
  watch: {
  },
  data() {
    return {
      data: deepClone(this.model),
      rule: deepClone(this.rules),
      qwe: '2'
    }
  },
  mounted() {
  },
  methods: {
    handlePreview() {

    },
    changeTime(e, key) {
      let value = e
      console.log('eeee', value, key)
      this.$set(this.data, key, value)
      this.$emit('change', value, key)
    },
    beforeUpload(file, key) {
      console.log('file', file, key)
    },
    handleRemove(file, key) {
      console.log('handleRemove', file, key)
    },
    handleChange(e, key) {
      let value = e
      if (e && e.target) {
        value = e.target.value
      }
      console.log('eeee', value, key, this.record)
      this.$set(this.data, key, value)
      console.log('this.data', this.data)
      this.$emit('change', value, key)
    },
    handleChanges(e, key, obj) {
      let value = e
      if (e && e.target) {
        value = e.target.value
      }
      this.$set(this.data, key, value)
      this.$emit('change', value, key)
      console.log('obj', obj)
    }
  }
}
</script>

<style  lang='scss'>
.buildItem_VIEW{
  .ant-radio-group, .ant-checkbox-group{
    display: flex;
    flex-direction: column;
    label{
      margin-bottom: 5px;
    }
  }
  .ant-checkbox-wrapper + .ant-checkbox-wrapper{
    margin-left: 0!important;
  }
}
</style>