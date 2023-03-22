<template>
  <div>
    <div v-if='empty' class='empty'></div>
    <div v-else ref='chart' class='echarts'></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'pie',
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
          const option = {
            tooltip: {
              trigger: 'item'
            },

            series: [
              {
                data: n,
                type: 'pie',
                radius: '50%',
              }
            ]
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
      this.download('饼状图', imgUrl)
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