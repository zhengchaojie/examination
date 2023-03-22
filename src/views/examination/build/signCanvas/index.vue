<template>
<div ref='canvasBox'>
  <canvas :ref="canvasRefs || 'canvas'" height="300"
          @mousedown='mouseDowns' @mouseup='mouseUps' @mousemove='mouseMoves' class="sign"></canvas>
  <div class='footSign'>
    <a-button type='primary' size='small' @click='save'>确定</a-button>
    <a-button type='text' size='small' @click='resetCanvas'>清除</a-button>
  </div>
</div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      sign: '',
      canvas: null,
      cxt: null,
      stageInfo: null,
      path: null,
      isDrawing: false
    }
  },
  props: {
    canvasRefs: {
      type: String,
      default: ''
    }
  },
  methods: {
    resetCanvas() {
      this.cxt.clearRect(0, 0, this.stage_info.width, this.stage_info.height)
    },
    save() {
      let result = this.canvas.toDataURL("image/png")
      const h = this.$createElement
      if(this.checkCanvas()){
        this.$notify({
          title: '信息提示',
          message: h('i', { style: 'color: red' }, '请绘制签名'),
        })
        return;
      }
      this.$emit('change', result)
    },
    checkCanvas(){
      const blank = document.createElement('canvas')
      let refs = this.canvasRefs ? this.canvasRefs : 'canvas'
      blank.width = this.$refs[`${refs}`].width
      blank.height = this.$refs[`${refs}`].height
      return this.canvas.toDataURL() == blank.toDataURL()
    },
    mouseDowns(e) {
      let that = this;
      this.isDrawing = true
      this.cxt.beginPath()
      let x = e.clientX - this.stage_info.left
      let y = e.clientY - this.stage_info.top
      this.cxt.moveTo(
        x,
        y
      )
      this.path.beginX = e.clientX - this.stage_info.left
      this.path.beginY = e.clientY - this.stage_info.top
    },
    mouseUps(e){
      let x = e.clientX - this.stage_info.left
      let y = e.clientY - this.stage_info.top
      if (this.isDrawing) {
        this.drawLine(this.cxt, this.path.beginX, this.path.beginY, x, y)
      }
      this.cxt.closePath();
      this.isDrawing = false
    },
    mouseMoves(e) {
      if(this.isDrawing) {
        let x = e.clientX - this.stage_info.left
        let y = e.clientY - this.stage_info.top
        this.path.endX = e.clientX - this.stage_info.left
        this.path.endY = e.clientY - this.stage_info.top
        this.drawLine(this.cxt, this.path.beginX, this.path.beginY, x, y)
      }
    },
    drawLine(context, x1, y1, x2, y2) {
      this.cxt.stroke();
      context.lineTo(Number(x2), Number(y2));
    }
  },
  mounted() {
    let _width = this.$refs.canvasBox.offsetWidth
    let refs = this.canvasRefs ? this.canvasRefs : 'canvas'
    this.$refs[`${refs}`].width = _width
    this.canvas = this.$refs[`${refs}`]
    this.cxt = this.canvas.getContext('2d')
    this.cxt.strokeStyle = 'black'
    this.cxt.lineWidth = 1
    this.stage_info = this.canvas.getBoundingClientRect()
    this.path = {
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0
    }
  }
}
</script>

<style lang='scss' scoped>
.sign{
  width: 100%;
  height: 300px;
  background: #f1f1f1;
}
.footSign{
  display: flex;
  justify-content: flex-end;
}
</style>