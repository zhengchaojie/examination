/* eslint-disable max-len */
import ruleTrigger from './ruleTrigger'

let confGlobal
let someSpanIsNot24

export function dialogWrapper(str) {
  return `<a-modal v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="Dialog Titile">
    ${str}
    <div slot="footer">
      <a-button @click="close">取消</a-button>
      <a-button type="primary" @click="handelConfirm">确定</a-button>
    </div>
  </a-modal>`
}

export function vueTemplate(str) {
  return `<template>
    <div>
      ${str}
    </div>
  </template>`
}

export function vueScript(str) {
  return `<script>
    ${str}
  </script>`
}

export function cssStyle(cssStr) {
  return `<style>
    ${cssStr}
  </style>`
}

function buildFormTemplate(scheme, child, type) {
  let labelPosition = ''
  if (scheme.labelPosition !== 'right') {
    labelPosition = `label-position="${scheme.labelPosition}"`
  }
  const disabled = scheme.disabled ? `:disabled="${scheme.disabled}"` : ''
  let str = `<a-form-model ref="${scheme.formRef}" :model="${scheme.formModel}" :rules="${scheme.formRules}" size="${scheme.size}" ${disabled} label-width="${scheme.labelWidth}px" ${labelPosition}>
      ${child}
      ${buildFromBtns(scheme, type)}
    </a-form-model>`
  if (someSpanIsNot24) {
    str = `<a-row :gutter="${scheme.gutter}">
        ${str}
      </a-row>`
  }
  return str
}

function buildFromBtns(scheme, type) {
  let str = ''
  if (scheme.formBtns && type === 'file') {
    str = `<a-form-model-item size="large">
          <a-button type="primary" @click="submitForm">提交</a-button>
          <a-button @click="resetForm">重置</a-button>
        </a-form-model-item>`
    if (someSpanIsNot24) {
      str = `<a-col :span="24">
          ${str}
        </a-col>`
    }
  }
  return str
}

// span不为24的用el-col包裹
function colWrapper(scheme, str) {
  if (someSpanIsNot24 || scheme.__config__.span !== 24) {
    return `<a-col :span="${scheme.__config__.span}">
      ${str}
    </a-col>`
  }
  return str
}

const layouts = {
  colFormItem(scheme) {
    const config = scheme.__config__
    let labelWidth = ''
    let label = `label="${config.label}"`
    if (config.labelWidth && config.labelWidth !== confGlobal.labelWidth) {
      labelWidth = `label-width="${config.labelWidth}px"`
    }
    if (config.showLabel === false) {
      labelWidth = 'label-width="0"'
      label = ''
    }
    const required = !ruleTrigger[config.tag] && config.required ? 'required' : ''
    const tagDom = tags[config.tag] ? tags[config.tag](scheme) : null
    let str = `<a-form-model-item ${labelWidth} ${label} prop="${scheme.__vModel__}" ${required}>
        ${tagDom}
      </a-form-model-item>`
    str = colWrapper(scheme, str)
    return str
  },
  rowFormItem(scheme) {
    const config = scheme.__config__
    const type = scheme.type === 'default' ? '' : `type="${scheme.type}"`
    const justify = scheme.type === 'default' ? '' : `justify="${scheme.justify}"`
    const align = scheme.type === 'default' ? '' : `align="${scheme.align}"`
    const gutter = scheme.gutter ? `:gutter="${scheme.gutter}"` : ''
    const children = config.children.map(el => layouts[el.__config__.layout](el))
    let str = `<a-row ${type} ${justify} ${align} ${gutter}>
      ${children.join('\n')}
    </a-row>`
    str = colWrapper(scheme, str)
    return str
  }
}

const tags = {
  'a-button': el => {
    const {
      tag, disabled
    } = attrBuilder(el)
    const type = el.type ? `type="${el.type}"` : ''
    const icon = el.icon ? `icon="${el.icon}"` : ''
    const round = el.round ? 'round' : ''
    const size = el.size ? `size="${el.size}"` : ''
    const plain = el.plain ? 'plain' : ''
    const circle = el.circle ? 'circle' : ''
    let child = buildElButtonChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${type} ${icon} ${round} ${size} ${plain} ${disabled} ${circle}>${child}</${tag}>`
  },
  'a-input': el => {
    const {
      tag, disabled, vModel, allowClear, placeholder, width, readOnly
    } = attrBuilder(el)
    const maxLength = el.maxLength ? `:maxLength="${el.maxLength}"` : ''
    const addonBefore = el['addonBefore'] ? `addonBefore='${el['addonBefore']}'` : ''
    const addonAfter = el['addonAfter'] ? `addonAfter='${el['addonAfter']}'` : ''
    const size = el.size ? `size="${el.size}"` : ''
    const autosize = el.autosize && el.autosize.minRows
      ? `:autosize="{minRows: ${el.autosize.minRows}, maxRows: ${el.autosize.maxRows}}"`
      : ''
    let child = buildElInputChild(el)
    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${size} ${vModel} ${placeholder} ${maxLength} ${readOnly} ${disabled} ${allowClear} ${addonBefore} ${addonAfter} ${autosize} ${width}>${child}</${tag}>`
  },
  'a-input-password': el => {
    const {
      tag, disabled, vModel, allowClear, placeholder, width
    } = attrBuilder(el)
    const maxLength = el.maxLength ? `:maxLength="${el.maxLength}"` : ''
    const prefix = el.prefix ? `prefix='${el.prefix}'` : ''
    const suffix = el.suffix ? `suffix='${el.suffix}'` : ''
    let child = buildElButtonChild(el)
    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${placeholder} ${maxLength} ${prefix} ${suffix} ${width}
      ${disabled} ${allowClear}>${child}</${tag}>`
  },
  'a-input-number': el => {
    const {
      tag, disabled, vModel, placeholder, width
    } = attrBuilder(el)
    const min = el.min ? `:min='${el.min}'` : ''
    const max = el.max ? `:max='${el.max}'` : ''
    const step = el.step && el.step !== 1 ? `:step='${el.step}'` : ''
    const precision = el.precision ? `:precision='${el.precision}'` : ''
    const size = el.size ? `size="${el.size}"` : ''
    return `<${tag} ${size} ${vModel} ${placeholder} ${step} ${precision} ${min} ${max} ${width} ${disabled} />`
  },
  'a-select': el => {
    const {
      tag, disabled, vModel, allowClear, placeholder, width
    } = attrBuilder(el)
    const mode = el.mode ? `mode="${el.mode}"` : ''
    const showSearch = el.showSearch ? 'showSearch' : ''
    const filterOption = el.filterOption ? `:filterOption="${el.filterOption}"` : ''
    let child = buildElSelectChild(el)
    const size = el.size ? `size="${el.size}"` : ''
    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${size} ${vModel} ${placeholder} ${disabled} ${mode} ${showSearch} ${filterOption} ${allowClear} ${width}>${child}</${tag}>`
  },
  'a-radio-group': el => {
    const { tag, disabled, vModel } = attrBuilder(el)
    const buttonStyle = el.buttonStyle ? `buttonStyle="${el.buttonStyle}"` : ''
    let child = buildElRadioGroupChild(el)
    const size = el.size ? `size="${el.size}"` : ''
    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${size} ${disabled} ${buttonStyle}>${child}</${tag}>`
  },
  'a-checkbox-group': el => {
    const { tag, disabled, vModel } = attrBuilder(el)
    const size = `size="${el.size}"`
    let child = buildElCheckboxGroupChild(el)
    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${vModel} ${size} ${disabled}>${child}</${tag}>`
  },
  'a-switch': el => {
    const { tag, disabled, vModel } = attrBuilder(el)
    const checkedChildren = el['checkedChildren'] ? `checkedChildren="${el['checkedChildren']}"` : ''
    const unCheckedChildren = el['unCheckedChildren'] ? `unCheckedChildren="${el['unCheckedChildren']}"` : ''
    const size = el.size ? `size="${el.size}"` : ''
    return `<${tag} ${size} ${vModel} ${checkedChildren} ${unCheckedChildren} ${disabled}></${tag}>`
  },
  'a-cascader': el => {
    const {
      tag, disabled, vModel, allowClear, placeholder, width
    } = attrBuilder(el)
    const showSearch = el.showSearch ? 'showSearch' : ''
    const changeOnSelect = el.changeOnSelect ? 'changeOnSelect' : ''
    const options = el.options ? `:options="${el.__vModel__}Options"` : ''
    const expandTrigger = el['expandTrigger'] ? '' : `expandTrigger="${el.expandTrigger}"`
    const size = el.size ? `size="${el.size}"` : ''
    return `<${tag} ${size} ${vModel} ${options} ${width} ${expandTrigger} ${placeholder} ${showSearch} ${changeOnSelect} ${allowClear} ${disabled}></${tag}>`
  },
  'a-slider': el => {
    const { tag, disabled, vModel } = attrBuilder(el)
    const min = el.min ? `:min='${el.min}'` : ''
    const max = el.max ? `:max='${el.max}'` : ''
    const step = el.step ? `:step='${el.step}'` : ''
    const range = el.range ? 'range' : ''
    const reverse = el['reverse'] ? 'reverse' : ''
    const a = { 1: 1, 5: 5 }
    const marks = el['marks'] ? `:marks='${JSON.stringify(a)}'` : ''
    return `<${tag} ${min} ${max} ${step} ${vModel} ${range} ${reverse} ${disabled} ${marks}></${tag}>`
  },
  'a-time-picker': el => {
    const {
      tag, disabled, vModel, allowClear, placeholder, width
    } = attrBuilder(el)
    const format = el.format ? `format="${el.format}"` : ''
    const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
    const size = el.size ? `size="${el.size}"` : ''
    const use12Hours = el.use12Hours ? `:use12Hours="${el.use12Hours}"` : ''
    return `<${tag} ${size} ${vModel}  ${format} ${valueFormat} ${width} ${placeholder} ${allowClear} ${disabled} ${use12Hours}></${tag}>`
  },
  'a-date-picker': el => {
    const {
      tag, disabled, vModel, allowClear, placeholder, width
    } = attrBuilder(el)
    const format = el.format ? `format="${el.format}"` : ''
    const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
    const type = el.type === 'date' ? '' : `type="${el.type}"`
    const showToday = el.showToday ? 'showToday' : ''
    const showTime = el.showTime ? 'readOnly' : ''
    const inputReadOnly = el.inputReadOnly ? 'inputReadOnly' : ''
    const readOnly = el.readOnly ? 'readOnly' : ''
    const size = el.size ? `size="${el.size}"` : ''
    return `<${tag} ${size} ${type} ${vModel} ${format} ${valueFormat} ${width} ${placeholder} ${allowClear} ${readOnly} ${disabled} ${showToday} ${showTime} ${inputReadOnly}></${tag}>`
  },
  'a-month-picker': el => {
    const {
      tag, disabled, vModel, allowClear, placeholder, width
    } = attrBuilder(el)
    const format = el.format ? `format="${el.format}"` : ''
    const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
    const inputreadOnly = el['input-read-only'] ? 'input-read-only' : ''
    const size = el.size ? `size="${el.size}"` : ''
    return `<${tag} ${vModel} ${format} ${valueFormat} ${width} ${size} ${placeholder}
      ${allowClear} ${inputreadOnly} ${disabled} />`
  },
  'a-week-picker': el => {
    const {
      tag, disabled, vModel, allowClear, placeholder, width
    } = attrBuilder(el)
    const format = el.format ? `format="${el.format}"` : ''
    const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
    const inputreadOnly = el['input-read-only'] ? 'input-read-only' : ''
    const size = el.size ? `size="${el.size}"` : ''
    return `<${tag} ${vModel} ${format} ${valueFormat} ${width} ${size} ${placeholder}
      ${allowClear} ${inputreadOnly} ${disabled} />`
  },
  'a-range-picker': el => {
    const {
      tag, disabled, vModel, allowClear, width
    } = attrBuilder(el)
    const format = el.format ? `format="${el.format}"` : ''
    const valueFormat = el['value-format'] ? `value-format="${el['value-format']}"` : ''
    const inputreadOnly = el['input-read-only'] ? 'input-read-only' : ''
    const placeholders = (`${el.placeholder}`).split(',')
    const placeholder = el.placeholder ? `:placeholder="['${placeholders[0]}', '${placeholders[1]}']"` : ''
    const separator = el.separator === '~' ? '' : `separator="${el.separator}"`
    const showTime = el['show-time'] ? `show-time="${el['show-time']}"` : ''
    const size = el.size ? `size="${el.size}"` : ''
    return `<${tag} ${vModel} ${format} ${valueFormat} ${separator} ${showTime}
      ${width} ${size} ${placeholder} ${allowClear} ${inputreadOnly} ${disabled} />`
  },
  'a-rate': el => {
    const { tag, disabled, vModel } = attrBuilder(el)
    const max = el.max ? `:max='${el.max}'` : ''
    const allowHalf = el['allow-half'] ? 'allow-half' : ''
    const showText = el['show-text'] ? 'show-text' : ''
    const showScore = el['show-score'] ? 'show-score' : ''
    const size = el.size ? `size="${el.size}"` : ''
    return `<${tag} ${size} ${vModel} ${max} ${allowHalf} ${showText} ${showScore} ${disabled}></${tag}>`
  },
  'a-upload': el => {
    const { tag } = el.__config__
    const disabled = el.disabled ? ':disabled=\'true\'' : ''
    const action = el.action ? `:action="${el.__vModel__}Action"` : ''
    const multiple = el.multiple ? 'multiple' : ''
    const listType = el['list-type'] !== 'text' ? `list-type="${el['list-type']}"` : ''
    const accept = el.accept ? `accept="${el.accept}"` : ''
    const name = el.name !== 'file' ? `name="${el.name}"` : ''
    const beforeUpload = `:before-upload="${el.__vModel__}BeforeUpload"`
    const fileList = `:file-list="${el.__vModel__}fileList"`
    const ref = `ref="${el.__vModel__}"`
    let child = buildElUploadChild(el)

    if (child) child = `\n${child}\n` // 换行
    return `<${tag} ${ref} ${fileList} ${action} ${multiple} ${beforeUpload}
      ${listType} ${accept} ${name} ${disabled}>${child}</${tag}>`
  },
  tinymce: el => {
    const { tag, vModel, placeholder } = attrBuilder(el)
    const height = el.height ? `:height="${el.height}"` : ''
    const branding = el.branding ? `:branding="${el.branding}"` : ''
    return `<${tag} ${vModel} ${placeholder} ${height} ${branding}></${tag}>`
  }
}

function attrBuilder(el) {
  return {
    tag: el.__config__.tag,
    vModel: `v-model="${confGlobal.formModel}.${el.__vModel__}"`,
    allowClear: el.allowClear ? 'allowClear' : '',
    placeholder: el.placeholder ? `placeholder="${el.placeholder}"` : '',
    width: el.style && el.style.width ? ':style="{width: \'100%\'}"' : '',
    disabled: el.disabled ? ':disabled=\'true\'' : ''
  }
}

// a-buttin 子级
function buildElButtonChild(scheme) {
  const children = []
  const slot = scheme.__slot__ || {}
  if (slot.default) {
    children.push(slot.default)
  }
  return children.join('\n')
}

// a-input 子级
function buildElInputChild(scheme) {
  const children = []
  const slot = scheme.__slot__
  if (slot && slot.prepend) {
    children.push(`<template slot="prepend">${slot.prepend}</template>`)
  }
  if (slot && slot.append) {
    children.push(`<template slot="append">${slot.append}</template>`)
  }
  return children.join('\n')
}

// a-select 子级
function buildElSelectChild(scheme) {
  const children = []
  const slot = scheme.__slot__
  if (slot && slot.options && slot.options.length) {
    children.push(`<a-select-option v-for="(item, index) in ${scheme.__vModel__}Options" :key="index" :value="item.value" :disabled="item.disabled">{{item.label}}</a-select-option>`)
  }
  return children.join('\n')
}

// a-radio-group 子级
function buildElRadioGroupChild(scheme) {
  const children = []
  const slot = scheme.__slot__
  const config = scheme.__config__
  if (slot && slot.options && slot.options.length) {
    const tag = config.optionType === 'button' ? 'a-radio-button' : 'a-radio'
    children.push(`<${tag} v-for="(item, index) in ${scheme.__vModel__}Options" :value="item.value" :key="index" :disabled="item.disabled" >{{item.label}}</${tag}>`)
  }
  return children.join('\n')
}

// a-checkbox-group 子级
function buildElCheckboxGroupChild(scheme) {
  const children = []
  const slot = scheme.__slot__
  const config = scheme.__config__
  if (slot && slot.options && slot.options.length) {
    const tag = config.optionType === 'button' ? 'a-checkbox-button' : 'a-checkbox'
    children.push(`<${tag} v-for="(item, index) in ${scheme.__vModel__}Options" :key="index" :value="item.value" :disabled="item.disabled">{{item.label}}</${tag}>`)
  }
  return children.join('\n')
}

// a-upload 子级
function buildElUploadChild(scheme) {
  const list = []
  const config = scheme.__config__
  if (scheme['list-type'] === 'picture-card') list.push('<i class="el-icon-plus"></i>')
  else list.push(`<a-button size="${scheme.size}" type="primary" icon="el-icon-upload">${config.buttonText}</a-button>`)
  if (config.showTip) list.push(`<div slot="tip" class="el-upload__tip">只能上传不超过 ${config.fileSize}${config.sizeUnit} 的${scheme.accept}文件</div>`)
  return list.join('\n')
}

/**
 * 组装html代码。【入口函数】
 * @param {Object} formConfig 整个表单配置
 * @param {String} type 生成类型，文件或弹窗等
 */
export function makeUpHtml(formConfig, type) {
  const htmlList = []
  confGlobal = formConfig
  // 判断布局是否都沾满了24个栅格，以备后续简化代码结构
  someSpanIsNot24 = formConfig.fields.some(item => item.__config__.span !== 24)
  // 遍历渲染每个组件成html
  formConfig.fields.forEach(el => {
    htmlList.push(layouts[el.__config__.layout](el))
  })
  const htmlStr = htmlList.join('\n')
  // 将组件代码放进form标签
  let temp = buildFormTemplate(formConfig, htmlStr, type)
  // dialog标签包裹代码
  if (type === 'dialog') {
    temp = dialogWrapper(temp)
  }
  confGlobal = null
  return temp
}
