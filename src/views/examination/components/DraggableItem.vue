<script>
import Vue from 'vue'
import draggable from 'vuedraggable'
import render from '@/views/examination/components/render/render'
import signCanvas from '@/views/examination/build/signCanvas'
import headers from '@/views/examination/build/header'
import fillBlank from '@/views/examination/build/fillBlanks'
import texts from '@/views/examination/build/texts'
Vue.component('signCanvas', signCanvas)
Vue.component('headers', headers)
Vue.component('fillBlank', fillBlank)
Vue.component('texts', texts)
const components = {
  itemBtns(h, currentItem, index, list) {
    const { copyItem, deleteItem } = this.$listeners
    return [
      <span class="drawing-item-copy" title="复制" onClick={event => {
        copyItem(currentItem, list); event.stopPropagation()
      }}>
        <a-icon type="copy" />
      </span>,
      <span class="drawing-item-delete" title="删除" onClick={event => {
        deleteItem(index, list); event.stopPropagation()
      }}>
        <a-icon type="delete" />
      </span>
    ]
  }
}
const layouts = {
  colFormItem(h, currentItem, index, list) {
    const { activeItem } = this.$listeners
    const config = currentItem.__config__
    const child = renderChildren.apply(this, arguments)
    // 穿梭框特殊处理
    if (config.tag === 'a-transfer') {
      this.$set(currentItem, 'render', item => item.title)
    }
    // if (config.tag === 'a-select' && currentItem.showSearch) {
    //   this.$set(currentItem, 'filter-option', (input, option) => (option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0))
    // }
    let className = this.activeId === config.formId ? 'drawing-item active-from-item' : 'drawing-item'
    if(this.views) className = className + ' defaultViews'
    if (this.formConf.unFocusedComponentBorder) className += ' unfocus-bordered'
    let showLabel = this.hideLabel ? false : config.showLabel
    return (
      <a-col span={ showLabel ? config.span : 24 } class={className}
        nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>
        <a-form-model-item
          required={config.required}
        >
          {
            showLabel ? (
                <span  slot='label'>
                  <div class='labelsViews'>
                    <span>{index + 1}. {config.label}</span>
                    { config.score ? ( <span class='labelsScore'>{config.score} 分</span> ) : null }
                  </div>
                </span>
            ) : null
          }
          <render key={config.renderKey} conf={currentItem}
          onInput={ event => {
            let value = event
            if (config.tag === 'a-input'
              || config.tag === 'a-textarea'
              || config.tag === 'a-input-password'
              || config.tag === 'a-input-search'
              || config.tag === 'a-radio-group') {
              value = event.target.value
            }
            this.$set(config, 'defaultValue', value)
            // 穿梭框特殊处理
            if (config.tag === 'a-transfer') {
              this.$set(currentItem, 'target-keys', value)
            }
          }}>
            {child}
          </render>
        </a-form-model-item>
        {components.itemBtns.apply(this, arguments)}
      </a-col>
    )
  },
  rowFormItem(h, currentItem, index, list) {
    const { activeItem } = this.$listeners
    const config = currentItem.__config__
    const className = this.activeId === config.formId
      ? 'drawing-row-item active-from-item'
      : 'drawing-row-item'
    let child = renderChildren.apply(this, arguments)
    if (currentItem.type === 'flex') {
      child = <a-row type={currentItem.type} justify={currentItem.justify} align={currentItem.align}>
              {child}
            </a-row>
    }
    return (
      <a-col span={config.span}>
        <a-row gutter={config.gutter} class={className}
          nativeOnClick={event => { activeItem(currentItem); event.stopPropagation() }}>
          <span class="component-name">{config.componentName}</span>
          <draggable list={config.children || []} animation={340}
            group="componentsGroup" class="drag-wrapper" component-data={getComponentData(currentItem)}>
            {child}
          </draggable>
          {components.itemBtns.apply(this, arguments)}
        </a-row>
      </a-col>
    )
  },
  raw(h, currentItem, index, list) {
    const config = currentItem.__config__
    const child = renderChildren.apply(this, arguments)
    return <render key={config.renderKey} conf={currentItem} onInput={ event => {
      this.$set(config, 'defaultValue', event)
    }}>
      {child}
    </render>
  }
}
function getComponentData(currentItem) {
  const config = currentItem.__config__
  return {
    props: {
      config: config
    }
  }
}
function renderChildren(h, currentItem, index, list) {
  const config = currentItem.__config__
  if (!Array.isArray(config.children)) return null
  return config.children.map((el, i) => {
    const layout = layouts[el.__config__.layout]
    if (layout) {
      return layout.call(this, h, el, i, config.children)
    }
    return layoutIsNotFound.call(this)
  })
}

function layoutIsNotFound() {
  throw new Error(`没有与${this.currentItem.__config__.layout}匹配的layout`)
}

export default {
  name: 'DraggableItem',
  components: {
    render,
    draggable
  },
  data() {
    return {
      showBtn: this.views
    }
  },
  props: [
    'currentItem',
    'index',
    'drawingList',
    'activeId',
    'formConf',
    'views',
    'hideLabel'
  ],
  render(h) {
    const layout = layouts[this.currentItem.__config__.layout]
    this.currentItem.size = this.formConf.size
    if (layout) {
      return layout.call(this, h, this.currentItem, this.index, this.drawingList)
    }
    return layoutIsNotFound.call(this)
  },
  methods: {
    change(e) {
      console.log('填空', e)
    }
  }
}
</script>
<style lang='scss' scoped>
.labelsViews{
  display: flex;
  justify-content: space-between;
}
.labelsScore{
  color: #bbb;
}
</style>