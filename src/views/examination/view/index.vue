<template>
  <div class="main">
    <a-card title="日收集问卷" style="width: 100%; padding-bottom: 10px">
      <!-- <a slot="extra" href="#">more</a> -->
      <div id="main" style="height: 330px; width: 100%"></div>
    </a-card>
    <a-card title="系统设置" style="width: 50%; margin-top: 10px">
      <!-- <a slot="extra" href="#">more</a> -->
      <div class="content">
        <div class="switchBox">
          <a-input-search placeholder="http://47.105.58.68:1991/s/RzsRh8" enter-button="打开" @search="onLink" />
        </div>
        <div class="switchBox">
          <span>问卷开启/停止</span>
          <a-icon type="info-circle" style="margin-left: 10px" />
          <a-switch class="switch" default-checked @change="isQuestionnaireChange" />
        </div>
        <div class="switchBox">
          <span>问卷填写时自动保存</span>
          <a-icon type="info-circle" style="margin-left: 10px" />
          <a-switch class="switch" default-checked @change="isSaveQuestionnaireChange" />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'index',
  data() {
    return {
      echartsData: [0, 1, 1, 0, 0, 1, 0],
      timeData: [],
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.getLoadEcharts()
  },
  methods: {
    isQuestionnaireChange(checked) {
      console.log(`问卷开启/停止: ${checked}`)
    },
    isSaveQuestionnaireChange(checked) {
      console.log(`问卷填写时自动保存: ${checked}`)
    },
    onLink() {},
    // 获取前七天时间
    getData() {
      var now = new Date()
      var nowTime = now.getTime()
      var oneDayTime = 24 * 60 * 60 * 1000
      for (var i = 0; i < 7; i++) {
        var ShowTime = nowTime - i * oneDayTime
        var myDate = new Date(ShowTime)
        var year = myDate.getFullYear()
        var month = myDate.getMonth() + 1
        var date = myDate.getDate()
        if (month < 10) {
          month = '0' + month
        }
        if (date < 10) {
          date = '0' + date
        }
        this.timeData.unshift(year + '-' + month + '-' + date)
      }
    },
    // 加载echarts
    getLoadEcharts() {
      var myChart = echarts.init(document.getElementById('main'))
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          position: 'bottom',
          data: this.timeData,
        },
        yAxis: {
          type: 'value',
        },
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'none',
          },
        ],
        series: [
          {
            data: this.echartsData,
            type: 'line',
            smooth: true,
            label: {
              show: true,
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(150, 157, 255, 1)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(150, 171, 255, 0)',
                    },
                  ],
                  false
                ),
              },
            },
          },
        ],
      }
      myChart.setOption(option)
    },
  },
}
</script>

<style scoped>
.switchBox {
  position: relative;
  margin: 24px 10px;
  font-size: 15px;
}
.switch {
  position: absolute;
  right: 0;
  top: 0;
}
.content {
  padding: 0 14px;
}
.main {
  padding: 10px;
}
</style>