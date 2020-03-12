<template>
  <div class="assist-water-value">
    <panel-title :title="title" :date="date"></panel-title>
    <div class="assist-water-value-chart" id="assistWaterValue"></div>
  </div>
</template>

<script>
// 湖体水质相应均值
import { BaseLineSceneYearAvg } from '@/api/assist'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'lake', 'assistTypeValue'
    ])
  },
  data () {
    return {
      date: '',
      title: '',
      colors: ['#0070FB', '#6AE6A0']
    }
  },
  watch: {
    lake () {
      this.renderChart()
    },
    assistTypeValue () {
      this.renderChart()
    }
  },
  methods: {
    renderChart () {
      var param = {
        lake: this.lake,
        sceneGroupName: this.assistTypeValue
      }
      BaseLineSceneYearAvg(param).then(res => {
        if (res) {
          this.title = `(${res.sceneName})湖体水质响应均值`
          this.date = ``
          var series = []
          res.titles.forEach((item, index) => {
            var param = {
              name: item,
              type: 'bar',
              barGap: 0,
              data: [],
              barMaxWidth: '10%'
            }
            res.polls.forEach((valueItem, valueIndex) => {
              param.data.push(res.datas[index][valueIndex])
            })
            series.push(param)
          })
          this.option = {
            color: this.colors,
            xAxis: {
              type: 'category',
              data: res.polls,
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            legend: {
              data: res.titles,
              textStyle: {
                color: '#959CB7'
              }
            },
            tooltip: {
              trigger: 'axis'
            },
            yAxis: {
              type: 'value',
              name: '',
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            series: series
          }
          this.$chartRender('assistWaterValue', this.option)
        }
      })
    }
  },
  mounted () {
    this.renderChart()
  }
}
</script>

<style lang="less" scoped>
@import '~../../../assets/css/variable.less';
.assist-water-value {
  position: absolute;
  top: 100px;
  right: @p-right;
  z-index: @p-index;
  width: @p-width;
  height: 740px;
  .panel-bg();
  .assist-water-value-chart {
    height: 630px;
  }
}
</style>
