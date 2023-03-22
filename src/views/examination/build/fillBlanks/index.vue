<template>
  <div class='main'>
    <a-form-model
      :label-align="formConf.labelAlign"
      :layout="formConf.layout"
      :label-col="formConf.layout === 'horizontal' ? formConf.labelCol : null"
      :wrapper-col="formConf.layout === 'horizontal' ? formConf.wrapperCol : null"
      :size="formConf.size"
      :disabled="formConf.disabled"
    >
      <draggable class="drawing-board" :list="drawingList" :animation="340" :group="groups">
        <DraggableItem
          v-for="(item, index) in drawingList"
          :key="item.renderKey"
          :drawing-list="drawingList"
          :current-item="item"
          :index="index"
          :active-id="activeId"
          :form-conf="formConf"
          :hide-label='true'
          @activeItem="activeFormItem"
          @copyItem="drawingItemCopy"
          @deleteItem="drawingItemDelete"
        />
      </draggable>
      <div v-show="!drawingList.length" class="empty-info">
        从左侧拖入组件进行填空题组装
      </div>
    </a-form-model>
  </div>
</template>

<script>
import { deepClone } from '@/utils/examination_index'
import draggable from 'vuedraggable'
export default {
  name: 'index',
  components: {
    draggable
  },
  props: {
    config: {
      type: Object,
      default: ()=> {}
    }
  },
  data() {
    return {
      formConf: {},
      drawingList: [],
      activeId: 0,
      groups: {
        name: 'componentsGroup',
        put: (e)=> {
          this.drawingList = this.drawingList.map(item => {
            item.__config__.span = 4
            return item
          })
          console.log('componentsGroup', e, this.drawingList, this.config)
          return true
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    activeFormItem(currentItem) {
      this.activeData = currentItem
      this.activeId = currentItem.__config__.formId
    },
    drawingItemCopy(item, list) {
      let clone = deepClone(item)
      clone = this.createIdAndKey(clone)
      list.push(clone)
      this.activeFormItem(clone)
    },
    createIdAndKey(item) {
      const config = item.__config__
      config.formId = ++this.idGlobal
      config.renderKey = `${config.formId}${+new Date()}` // 改变renderKey后可以实现强制更新组件
      if (config.layout === 'colFormItem') {
        item.__vModel__ = `field${this.idGlobal}`
      } else if (config.layout === 'rowFormItem') {
        config.componentName = `row${this.idGlobal}`
        !Array.isArray(config.children) && (config.children = [])
        delete config.label // rowFormItem无需配置label属性
      }
      if (Array.isArray(config.children)) {
        config.children = config.children.map(childItem => this.createIdAndKey(childItem))
      }
      return item
    },
    drawingItemDelete(index, list) {
      list.splice(index, 1)
      this.$nextTick(() => {
        const len = this.drawingList.length
        if (len) {
          this.activeFormItem(this.drawingList[len - 1])
        }
      })
    }
  }
}
</script>

<style scoped>
.main{
  min-height: 300px;
}
</style>