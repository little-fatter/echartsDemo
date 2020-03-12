<template>
  <div class="palel-inverse-avg">
    <panel-title :title="title" :date="date"></panel-title>
    <div class="chart" id="waterQualityInverseAvg"></div>
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
          console.log(lineDefine)
          this.option = {
            color: chartColors,
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            legend: {
              data: ['蒸发量', '降水量', '平均温度'],
              textStyle: {
                color: '#fff'
              }
            },
            xAxis: [
              {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisLine: {
                  lineStyle: {
                    color: '#fff'
                  }
                }
              }
            ],
            dataZoom: [{
              start: 0,
              end: 10,
              textStyle: {
                color: '#fff'
              }
            }, {
              type: 'inside'
            }],
            yAxis: [
              {
                type: 'value',
                name: '吨',
                position: 'left',
                axisLine: {
                  lineStyle: {
                    color: '#fff'
                  }
                }
              },
              {
                type: 'value',
                name: '毫米',
                position: 'right',
                axisLine: {
                  lineStyle: {
                    color: '#fff'
                  }
                }
              }
            ],
            series: [
              {
                name: '蒸发量',
                type: 'line',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
              },
              {
                name: '平均温度',
                type: 'line',
                data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
              },
              {
                name: '降水量',
                type: 'line',
                yAxisIndex: 1,
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
              }
            ]
          }
          this.$chartRender('waterQualityInverseAvg', this.option)
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

.palel-inverse-avg {
  position: absolute;
  top: 860px;
  left: @p-left;
  z-index: @p-index;
  width: @p-width;
  height: 740px;
  .panel-bg();
  .chart {
    width: 90%;
    margin: 0 auto;
    height: 600px;
  }
}
</style>
