// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formModel: 'formData',
  layout: 'vertical',
  labelAlign: 'right',
  labelCol: {
    span: 3,
    offset: 0
  },
  wrapperCol: {
    span: 21,
    offset: 0
  },
  formRules: 'rules',
  gutter: 15,
  // span: 24,
  disabled: false,
  formBtns: true,
  size: 'default'
}

// 输入型组件 【左面板】
export const inputComponents = [
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
      required: false,
      layout: 'colFormItem',
      span: 24,
      document: 'https://element.eleme.cn/#/zh-CN/component/input',
      // 正则校验规则
      regList: []
    },
    // 组件的插槽属性
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
  },
  {
    __config__: {
      label: '多行文本',
      labelWidth: null,
      showLabel: true,
      tag: 'a-input',
      type: 'textarea',
      defaultValue: undefined,
      required: false,
      layout: 'colFormItem',
      span: 24,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/input'
    },
    type: 'textarea',
    placeholder: '请输入',
    autoSize: {
      minRows: 4,
      maxRows: 4
    },
    style: { width: '100%' },
    maxLength: null,
    readOnly: false,
    disabled: false
  },
  {
    __config__: {
      label: '密码',
      showLabel: true,
      labelWidth: null,
      changeTag: true,
      tag: 'a-input-password',
      type: 'password',
      defaultValue: undefined,
      layout: 'colFormItem',
      span: 24,
      required: false,
      regList: [],
      document: 'https://element.eleme.cn/#/zh-CN/component/input'
    },
    __slot__: {
      prepend: '',
      append: ''
    },
    placeholder: '请输入',
    style: { width: '100%' },
    clearable: true,
    'prefix-icon': '',
    'suffix-icon': '',
    maxLength: null,
    disabled: false
  },
  {
    __config__: {
      label: '计数器',
      showLabel: true,
      changeTag: true,
      tag: 'a-input-number',
      type: 'number',
      defaultValue: undefined,
      span: 24,
      layout: 'colFormItem',
      required: false,
      regList: [],
      document: 'https://element.eleme.cn/#/zh-CN/component/input-number'
    },
    style: { width: '100%' },
    size: 'default',
    placeholder: '',
    min: undefined,
    max: undefined,
    step: 1,
    precision: undefined,
    disabled: false
  },
  {
    __config__: {
      label: '纯文本',
      showLabel: false,
      tag: 'texts',
      type: 'texts',
      defaultValue: undefined,
      span: 24,
      layout: 'colFormItem',
      required: false,
      regList: [],
      desc_texts: '',
      align: 'left',
      fontSize: '14px',
      color: '#000'
    },
    style: { width: '100%' },
    size: 'default',
    placeholder: '',
    disabled: false
  },
  // {
  //   __config__: {
  //     label: '编辑器',
  //     showLabel: true,
  //     changeTag: true,
  //     labelWidth: null,
  //     tag: 'tinymce',
  //     type: 'rich-text',
  //     defaultValue: null,
  //     span: 24,
  //     layout: 'colFormItem',
  //     required: false,
  //     regList: [],
  //     document: 'http://tinymce.ax-z.cn'
  //   },
  //   placeholder: '请输入',
  //   height: 300, // 编辑器高度
  //   branding: false // 隐藏右下角品牌烙印
  // }
]

// 选择型组件 【左面板】
export const selectComponents = [
  {
    __config__: {
      label: '下拉选择',
      showLabel: true,
      tag: 'a-select',
      type: 'select',
      layout: 'colFormItem',
      span: 24,
      required: false,
      regList: [],
      changeTag: true,
      document: '',
      result: ''
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    placeholder: '请选择',
    style: { width: '100%' },
    allowClear: true,
    disabled: false,
    showSearch: false,
    mode: 'default'
  },
  {
    __config__: {
      label: '级联选择',
      url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList',
      method: 'get',
      dataPath: 'list',
      dataConsumer: 'options',
      showLabel: true,
      labelWidth: null,
      tag: 'a-cascader',
      type: 'cascader',
      layout: 'colFormItem',
      defaultValue: [],
      dataType: 'dynamic',
      span: 24,
      required: false,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/cascader',
      result: ''
    },
    options: [{
      id: 1,
      value: 1,
      label: '选项2',
      children: [{
        id: 2,
        value: 2,
        label: '选项1-2'
      }]
    }],
    fieldNames: {
      label: 'label',
      value: 'value',
      children: 'children'
    },
    placeholder: '请选择',
    style: { width: '100%' },
    expandTrigger: 'click',
    showSearch: false,
    disabled: false,
    changeOnSelect: false,
    allowClear: false
  },
  {
    __config__: {
      label: '单选框组',
      labelWidth: null,
      showLabel: true,
      tag: 'a-radio-group',
      type: 'radio',
      changeTag: true,
      defaultValue: undefined,
      optionType: 'default',
      layout: 'colFormItem',
      span: 24,
      regList: [],
      required: false,
      document: 'https://element.eleme.cn/#/zh-CN/component/radio',
      result: ''
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    style: {},
    size: '',
    disabled: false,
    buttonStyle: 'solid'
  },
  {
    __config__: {
      label: '多选框组',
      tag: 'a-checkbox-group',
      type: 'checkbox',
      defaultValue: [],
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      optionType: 'default',
      required: false,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/checkbox',
      result: []
    },
    __slot__: {
      options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
    },
    style: {},
    size: '',
    disabled: false
  },
  {
    __config__: {
      label: '开关',
      tag: 'a-switch',
      type: 'switch',
      defaultValue: false,
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/switch'
    },
    style: {},
    disabled: false,
    checkedChildren: '',
    unCheckedChildren: ''
  },
  {
    __config__: {
      label: '滑块',
      tag: 'a-slider',
      type: 'slider',
      defaultValue: 0,
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      labelWidth: null,
      required: false,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/slider'
    },
    disabled: false,
    min: 0,
    max: 100,
    step: 1,
    reverse: false,
    marks: {},
    range: false
  },
  {
    __config__: {
      label: '时间选择',
      tag: 'a-time-picker',
      type: 'time',
      defaultValue: null,
      span: 24,
      showLabel: true,
      layout: 'colFormItem',
      required: false,
      regList: [],
      changeTag: true,
      document: 'tag.time.picker.document'
    },
    placeholder: '请选择',
    style: { width: '100%' },
    disabled: false,
    allowClear: true,
    size: 'default',
    use12Hours: false,
    format: 'HH:mm:ss',
    'value-format': 'HH:mm:ss'
  },
  {
    __config__: {
      label: '日期选择',
      tag: 'a-date-picker',
      type: 'date',
      defaultValue: '2021-12-20',
      showLabel: true,
      span: 24,
      layout: 'colFormItem',
      required: false,
      regList: [],
      changeTag: true,
      document: 'tag.date.picker.document'
    },
    placeholder: '请选择',
    style: { width: '100%' },
    disabled: false,
    showToday: true,
    showTime: true,
    allowClear: true,
    size: 'default',
    format: 'YYYY-MM-DD HH:mm:ss',
    'value-format': 'YYYY-MM-DD HH:mm:ss',
    inputReadOnly: false
  },
  {
    __config__: {
      label: '月份选择',
      tag: 'a-month-picker',
      type: 'month',
      defaultValue: '2021-12-20',
      showLabel: true,
      span: 24,
      layout: 'colFormItem',
      required: false,
      regList: [],
      changeTag: true,
      document: 'tag.month.picker.document'
    },
    placeholder: '请选择',
    style: { width: '100%' },
    disabled: false,
    allowClear: true,
    size: 'default',
    format: 'YYYY-MM',
    'value-format': 'YYYY-MM',
    'input-read-only': false
  },
  // {
  //   __config__: {
  //     label: '周选择',
  //     tag: 'a-week-picker',
  //     type: 'week',
  //     defaultValue: '',
  //     showLabel: true,
  //     span: 24,
  //     layout: 'colFormItem',
  //     required: false,
  //     regList: [],
  //     changeTag: true,
  //     document: 'tag.week.picker.document'
  //   },
  //   placeholder: '请选择',
  //   style: { width: '100%' },
  //   disabled: false,
  //   allowClear: true,
  //   size: 'default',
  //   format: 'YYYY-ww',
  //   'value-format': 'YYYY-ww',
  //   'input-read-only': false
  // },
  // {
  //   __config__: {
  //     label: '范围选择',
  //     tag: 'a-range-picker',
  //     type: 'time-range',
  //     defaultValue: null,
  //     showLabel: true,
  //     span: 24,
  //     layout: 'colFormItem',
  //     required: false,
  //     regList: [],
  //     'start-placeholder': '开始',
  //     'end-placeholder': '结束',
  //     changeTag: true,
  //     document: 'tag.range.picker.document'
  //   },
  //   placeholder: ['开始', '结束'],
  //   style: { width: '100%' },
  //   separator: '~',
  //   disabled: false,
  //   allowClear: true,
  //   size: 'default',
  //   format: 'YYYY-MM-DD HH:mm:ss',
  //   'show-time': true,
  //   'value-format': 'YYYY-MM-DD HH:mm:ss',
  //   'input-read-only': false
  // },
  {
    __config__: {
      label: '评分',
      tag: 'a-rate',
      type: 'rate',
      defaultValue: 0,
      span: 24,
      showLabel: true,
      labelWidth: null,
      layout: 'colFormItem',
      required: false,
      regList: [],
      changeTag: true,
      document: 'https://element.eleme.cn/#/zh-CN/component/rate'
    },
    style: {},
    max: 5,
    'allow-half': false,
    'show-text': false,
    'show-score': false,
    disabled: false
  },
  {
    __config__: {
      label: '上传',
      tag: 'a-upload',
      type: 'upload',
      layout: 'colFormItem',
      defaultValue: null,
      showLabel: true,
      span: 24,
      showTip: false,
      buttonText: '上传',
      regList: [],
      changeTag: true,
      fileSize: 2,
      sizeUnit: 'MB',
      document: 'tag.upload.document'
    },
    __slot__: {
      'list-type': true
    },
    action: 'https://abc.com',
    disabled: false,
    accept: '',
    name: 'file',
    'list-type': 'text',
    multiple: false
  }
]

// 布局型组件 【左面板】
export const layoutComponents = [
  // {
  //   __config__: {
  //     label: '按钮',
  //     showLabel: true,
  //     changeTag: true,
  //     labelWidth: null,
  //     tag: 'a-button',
  //     type: 'button',
  //     span: 24,
  //     layout: 'colFormItem',
  //     document: 'https://element.eleme.cn/#/zh-CN/component/button'
  //   },
  //   __slot__: {
  //     default: '主要按钮'
  //   },
  //   type: 'primary',
  //   icon: 'a-icon-search',
  //   round: false,
  //   size: 'medium',
  //   plain: false,
  //   circle: false,
  //   disabled: false
  // },
  {
    __config__: {
      label: '手写签名',
      labelWidth: null,
      showLabel: true,
      tag: 'signCanvas',
      type: 'signCanvas',
      required: false,
      layout: 'colFormItem',
      span: 24,
    },
    // 组件的插槽属性
    __slot__: {
      'prefix': '',
      'suffix': ''
    },
    // 其余的为可直接写在组件标签上的属性
    style: { width: '100%' }
  },
  // {
  //   __config__: {
  //     label: '填空题',
  //     labelWidth: null,
  //     showLabel: true,
  //     tag: 'fillBlank',
  //     type: 'fillBlank',
  //     required: false,
  //     layout: 'colFormItem',
  //     span: 24,
  //   },
  //   // 组件的插槽属性
  //   __slot__: {
  //     'prefix': '',
  //     'suffix': ''
  //   },
  //   // 其余的为可直接写在组件标签上的属性
  //   style: { width: '100%' }
  // }
]
