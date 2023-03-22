export default [
  {
    // 组件的自定义配置
    __config__: {
      label: '单行文本',
      labelWidth: null,
      showLabel: true,
      changeTag: true,
      tag: 'a-input',
      type: 'input',
      defaultValue: undefined,
      required: true,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      // 正则校验规则
      regList: []
    },
    __slot__: {
      'prefix': '',
      'suffix': ''
    },
    // 其余的为可直接写在组件标签上的属性
    placeholder: '请输入',
    style: { width: '100%' },
    allowClear: true,
    addonBefore: '',
    addonAfter: '',
    maxLength: null,
    readOnly: false,
    disabled: false,
    size: 'default'
  }
]
