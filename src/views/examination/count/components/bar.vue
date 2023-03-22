<template>
 <div>
   <div v-if='empty' class='empty'></div>
   <div v-else ref='chart' class='echarts'></div>
 </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'bar',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    list: {
      handler(n){
        if(n && n.length > 0) {
          this.empty = false
          const data = []
          const xdata = []
          n.forEach(item => {
            xdata.push(item.name)
            data.push(item.value)
          })
          const option = {
            xAxis: {
              data: xdata,
              axisLabel: {
                interval:0,
                rotate:40
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data,
                type: 'bar'
              }
            ],
            tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
              trigger: 'axis',
              backgroundColor: 'rgba(32, 33, 36,.7)',
              borderColor: 'rgba(32, 33, 36,0.20)',
              borderWidth: 1,
              textStyle: { // 文字提示样式
                color: '#fff',
                fontSize: '12'
              },
              axisPointer: { // 坐标轴虚线
                type: 'cross',
                label: {
                  backgroundColor: '#6a7985'
                }
              }
            }
          };
          this.initChart(option)
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      empty: false,
      option: {},
      chart: ''
    }
  },
  mounted() {

  },
  methods: {
    initChart(option) {
      this.$nextTick(()=> {
        if (!this.chart) {
          this.chart = echarts.init(this.$refs.chart);
        }
        this.chart.clear();
        this.chart.setOption(option, true);
      })
    },
    savePic() {
      const imgUrl = this.chart.getDataURL({
        type: "png",
        pixelRatio: 1,
        backgroundColor: '#fff'
      })
      this.download('柱状图', imgUrl)
    },
    download(filename, url) {
      let a = document.createElement('a')
      a.download = filename
      a.href = url
      a.style.opacity = '0'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }
}
</script>

<style lang='scss' scoped>
  .echarts{
    width: 100%;
    height: 300px;
  }
</style>