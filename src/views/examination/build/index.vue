<template>
  <div class='builders'>
    <headers />
    <a-form-model
      :ref="formConf.formRef"
      class="form-index-container ant-form-vertical"
      :model="model"
      @submit="submitForm"
    >
      <buildItem
        v-for='(item, ind) in formConfCopy.fields'
        v-model='model[item.__vModel__]'
        :record='item'
        :model.sync='model'
        :ind='ind'
        :rules='rules[item.__vModel__]'
        :key='item.__vModel__ + ind'
        :disabled='item.disabled'
        @change='changes'
      />
    </a-form-model>
    <footers @submit='submitForm' />
  </div>
</template>
<script>
import { deepClone } from '@/utils/examination_index'
import render from '@/views/examination/components/render/render'
import buildItem from '@/views/examination/build/buildItem'
import headers from '@/views/examination/build/header'
import footers from '@/views/examination/build/footer'
const ruleTrigger = {
  'a-input': 'blur, change',
  'a-input-number': 'blur, change',
  'a-select': 'change',
  'a-radio-group': 'change',
  'a-checkbox-group': 'change',
  'a-cascader': 'change',
  'a-time-picker': 'change',
  'a-date-picker': 'change',
  'a-rate': 'change'
}
export default {
  components: {
    render,
    buildItem,
    headers,
    footers
  },
  props: {
    formConf: {
      type: Object,
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      formConfCopy: {},
      model: {},
      rules: {},

    }
  },
  watch: {
    formConf: {
      handler(n) {
        console.log('build', n)
        this.formConfCopy = deepClone(n)
        this.initFormData(this.formConfCopy.fields, this.model)
        this.buildRules(this.formConfCopy.fields, this.rules)
      },
      immediate: true
    }
  },
  mounted() {


  },
  methods: {
    changes(value, key) {
      console.log('this.model', this.model, this.rules)
      this.$set(this.model, key, value)
    },
    initFormData(componentList, formData) {
      console.log('componentList', componentList)
      componentList.forEach(cur => {
        const config = cur.__config__
        console.log('传过来的', this.edit)
        if(this.edit) this.$set(this.model, cur.__vModel__, cur.__config__.defaultValue)
        else if (cur.__vModel__) this.$set(this.model, cur.__vModel__, undefined)
        if (config.type === 'texts') this.$set(this.model, cur.__vModel__, config.desc_texts)
        if (config.type === 'upload')  this.$set(this.model, cur.__vModel__, [])
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    buildRules(componentList, rules) {
      componentList.forEach(cur => {
        const config = cur.__config__
        if (Array.isArray(config.regList)) {
          if (config.required) {
            const required = { required: config.required, message: cur.placeholder }
            if (Array.isArray(config.defaultValue)) {
              required.type = 'array'
              required.message = `请至少选择一个${config.label}`
            }
            required.message === undefined && (required.message = `${config.label}不能为空`)
            config.regList.push(required)
          }
          rules[cur.__vModel__] = config.regList.map(item => {
            item.pattern && (item.pattern = eval(item.pattern))
            item.trigger = ruleTrigger && ruleTrigger[config.tag]
            return item
          })
        }
        if (config.children) this.buildRules(config.children, rules)
      })
    },
    resetForm() {
      this.formConfCopy = deepClone(this.formConf)
      this.$refs[this.formConf.formRef].resetFields()
    },
    submitForm() {
      console.log('this.$refs111', this.$refs, this.formConfCopy)
      this.$refs[`${ this.formConf.formRef }`].validate(valid => {
        if (!valid) return false
        // 触发sumit事件
        this.$emit('resubmit', this.model)
        return true
      })
    }
  },
  render(h) {
    return renderFrom.call(this, h)
  }
}
</script>
<style lang='scss' scoped>
.builders{
  background: aliceblue;
}
.form-index-container{
  padding: 0 20px;
}
</style>
