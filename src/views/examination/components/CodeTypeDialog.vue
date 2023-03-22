<template>
  <div>
    <a-modal
      v-bind="$attrs"
      width="500px"
      v-on="$listeners"
      :visible.sync="visible"
      @cancel="onClose"
    >
      <a-row :gutter="15">
        <a-form-model
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="100px"
        >
          <a-col :span="24">
            <a-form-model-item label="生成类型" prop="type">
              <a-radio-group v-model="formData.type">
                <a-radio-button
                  v-for="(item, index) in typeOptions"
                  :key="index"
                  :disabled="item.disabled"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio-button>
              </a-radio-group>
            </a-form-model-item>
            <a-form-model-item v-if="showFileName" label="文件名" prop="fileName">
              <a-input v-model="formData.fileName" placeholder="请输入文件名" />
            </a-form-model-item>
          </a-col>
        </a-form-model>
      </a-row>

      <div slot="footer">
        <a-button @click="close">
          取消
        </a-button>
        <a-button type="primary" @click="handelConfirm">
          确定
        </a-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: ['showFileName'],
  data() {
    return {
      formData: {
        fileName: undefined,
        type: 'file'
      },
      rules: {
        fileName: [{
          required: true,
          message: '请输入文件名',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: '生成类型不能为空',
          trigger: 'change'
        }]
      },
      typeOptions: [{
        label: '页面',
        value: 'file'
      }, {
        label: '弹窗',
        value: 'dialog'
      }],
      visible: false
    }
  },
  computed: {
  },
  watch: {},
  mounted() {},
  methods: {
    onOpen() {
      this.visible = true
      if (this.showFileName) {
        this.formData.fileName = `${+new Date()}.vue`
      }
    },
    onClose() {
      this.visible = false
    },
    close(e) {
      this.visible = false
    },
    handelConfirm() {
      this.$refs.elForm.validate(valid => {
        if (!valid) return
        this.$emit('confirm', { ...this.formData })
        this.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
