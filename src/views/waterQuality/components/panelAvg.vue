<template>
  <div class="palel-avg">
    <panel-title :title="title" :date="date"></panel-title>
    <div class="chart" id="waterQualityAvg"></div>
  </div>
</template>

<script>
import PanelTitle from '@/components/Dashboard/PanelTitle'
import { LakePollutantsConcentrationDayAvg } from '@/api/waterQuality'
import { mapGetters } from 'vuex'
import { markLineData, chartColors } from '@/utils/util'
// 湖体平均浓度
export default {
  components: {
    PanelTitle
  },
  data () {
    return {
      option: null,
      title: '',
      date: ''
    }
  },
  computed: {
    ...mapGetters([
      'lake', 'waterQualityPoll', 'waterQualityYear'
    ])
  },
  methods: {
    renderChart () {
      var param = {
        lake: this.lake,
        year: this.waterQualityYear,
        poll: this.waterQualityPoll
      }
      LakePollutantsConcentrationDayAvg(param).then(res => {
        if (res) {
          this.title = `湖体${res.pollName}平均浓度`
          this.date = `${res.beginDate}—${res.endDate}`
          var xData = []
          var yData = []
          var lineDefine = markLineData(res.lineDefine)
          res.dayValues.forEach(item => {
            xData.push(item.day)
            yData.push(item.value)
          })
          this.option = {
            color: chartColors,
            xAxis: {
              type: 'category',
              data: xData,
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            tooltip: {
              trigger: 'axis'
            },
            yAxis: {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#fff'
                }
              }
            },
            dataZoom: [{
              start: 0,
              end: 10,
              textStyle: {
                color: '#fff'
              }
            }, {
              type: 'inside'
            }],
            series: [{
              name: '平均浓度',
              data: yData,
              type: 'line',
              symbol: 'none',
              markLine: {
                symbol: 'none',
                silent: true,
                data: lineDefine
              }
            }]
          }
          this.$chartRender('waterQualityAvg', this.option)
        }
      })
    }
  },
  mounted () {
    this.renderChart()
  },
  watch: {
    lake () {
      this.renderChart()
    },
    waterQualityPoll () {
      this.renderChart()
    },
    waterQualityYear () {
      this.renderChart()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~../../../assets/css/variable.less';

.palel-avg {
  position: absolute;
  top: 970px;
  left: @p-left;
  z-index: @p-index;
  width: @p-width;
  height: 630px;
  .panel-bg();
  .chart {
    width: 90%;
    margin: 0 auto;
    height: 450px;
  }
}
</style>
