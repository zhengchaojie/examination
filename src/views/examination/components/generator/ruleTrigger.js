/**
 * 用于生成表单校验，指定正则规则的触发方式。
 * 未在此处声明无触发方式的组件将不生成rule！！
 */
export default {
  'a-input': 'blur',
  'a-input-number': 'blur',
  'a-select': 'change',
  'a-radio-group': 'change',
  'a-checkbox-group': 'change',
  'a-cascader': 'change',
  'a-time-picker': 'change',
  'a-date-picker': 'change',
  'a-rate': 'change',
  tinymce: 'blur'
}
