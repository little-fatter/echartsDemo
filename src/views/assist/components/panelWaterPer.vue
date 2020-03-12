<template>
  <div class="assist-water-per">
    <panel-title :title="title" :date="date"></panel-title>
    <div class="assist-water-value-per" id="assistWaterPer"></div>
  </div>
</template>

<script>
// 湖体水质响应程度
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
      colors: ['#01DFF1', '#3891EE', '#6AE6A0', '#FFE72A', '#9E73FF']
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
          this.title = `(${res.sceneName})湖体水质响应程度`
          this.date = ``
          var series = []
          res.polls.forEach((item, index) => {
            var param = {
              name: item,
              type: 'bar',
              data: [],
              barMaxWidth: '5%'
            }
            res.titles.forEach((valueItem, valueIndex) => {
              if (valueItem !== '基线') {
                param.data.push(res.pers[valueIndex][index])
              }
            })
            series.push(param)
          })
          var title = res.titles
          title.splice(0, 1)
          this.option = {
            color: this.colors,
            xAxis: {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            legend: {
              data: res.polls,
              axisPointer: {
                type: 'shadow'
              },
              textStyle: {
                color: '#959CB7'
              }
            },
            tooltip: {
              trigger: 'axis'
            },
            yAxis: {
              type: 'category',
              data: title,
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            series: series
          }
          this.$chartRender('assistWaterPer', this.option)
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
.assist-water-per {
  position: absolute;
  top: 860px;
  right: @p-right;
  z-index: @p-index;
  width: @p-width;
  height: 740px;
  .panel-bg();
  .assist-water-value-per {
    height: 630px;
  }
}
</style>
