<template>
  <div class="center-scrollbar form-index-container" :style="{ 'background-image': `url(${ imgUrl })` }">
    <build
      ref='build'
      :form-conf="formConf"
      :edit='edits'
      :id='id'
      @resubmit='resubmit'
    />
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import DraggableItem from '@/views/examination/components/DraggableItem'
import build from '@/views/examination/build'
import parser from '@/views/examination/components/parser/Parser'
export default {
  name: 'index',
  props: {
    review: {
      type: Object,
      default: ()=> {}
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  components: {
    draggable,
    build,
    parser
  },
  watch: {
    review: {
      handler(n) {
        console.log('qewqeqweq', n)
        if(n && n.drawingList && n.drawingList.length > 0) {
          this.formConf = n.formConf
          this.drawingList = n.drawingList
        }
        if(n.id) {
          this.id = n.id
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      formConf: {},
      drawingList: [],
      imgUrl: require('@/views/examination/assets/bac.jpeg'),
      edits: this.edit,
      id: undefined
    }
  },
  methods: {
    submit(obj) {
      console.log('调用', this.$refs)
      this.$refs.build.submitForm()
      console.log('obj', obj)
    },
    resubmit(obj) {
      console.log('接受到的', obj)
      const value = {
        id: new Date().getTime(),
        value: obj
      }
      if(this.id) value.id = this.id; value.value = obj;
      this.$emit('resubmit', value)
    }
  }
}
</script>

<style scoped lang='scss'>
.form-index-container{
  border-right: 0;
  border-left: 0;
  height: 70vh !important;
  overflow-y: auto;
  .ant-form-item-label > label::after{
  content: '';
}
}
</style>