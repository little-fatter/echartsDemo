<template>
  <div class="palel-face-avg">
    <panel-title :title="title" :date="date"></panel-title>
    <div class="chart" id="waterQualityFaceAvg"></div>
  </div>
</template>

<script>
import PanelTitle from '@/components/Dashboard/PanelTitle'
import { SurfaceKAverageConcentrationPollutants, SurfaceMAverageConcentrationPollutants } from '@/api/waterQuality'
import { mapGetters } from 'vuex'
import { markLineData, chartColors } from '@/utils/util'
// 演示面,水平面（剖面），污染物平均浓度
export default {
  components: {
    PanelTitle
  },
  data () {
    return {
      option: null,
      title: '',
      date: '',
      unit: ''
    }
  },
  computed: {
    ...mapGetters([
      'lake', 'waterQualityPoll', 'waterQualityYear', 'waterQualitySection', 'waterQualityActiveLayer', 'waterQualityActiveDirection'
    ])
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
    },
    waterQualitySection () {
      this.renderChart()
    },
    waterQualityActiveLayer () {
      this.renderChart()
    },
    waterQualityActiveDirection () {
      this.renderChart()
    }
  },
  methods: {
    renderChart () {
      // 判断是水平还是横纵切面，请求接口不一样
      if (this.waterQualitySection === 'standard') {
        var param = {
          lake: this.lake,
          year: this.waterQualityYear,
          poll: this.waterQualityPoll,
          k: this.waterQualityActiveLayer
        }
        SurfaceKAverageConcentrationPollutants(param).then(res => {
          if (res) {
            this.title = `演示面${res.pollName}平均浓度`
            this.date = `${res.beginDate}—${res.endDate}`
            this.unit = res.unit
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
                name: res.unit,
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
            this.$chartRender('waterQualityFaceAvg', this.option)
          }
        })
      } else if (this.waterQualitySection === 'verticalityx' || this.waterQualitySection === 'verticalityy') {
        var paramM = {
          lake: this.lake,
          year: this.waterQualityYear,
          poll: this.waterQualityPoll,
          section: this.waterQualityActiveDirection
        }
        SurfaceMAverageConcentrationPollutants(paramM).then(res => {
          if (res) {
            this.title = `演示面${res.pollName}平均浓度`
            this.date = `${res.beginDate}-${res.endDate}`
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
                name: res.unit,
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
            this.$chartRender('waterQualityFaceAvg', this.option)
          }
        })
      }
    }
  },
  mounted () {
    this.renderChart()
  }
}
</script>

<style lang="less" scoped>
@import '~../../../assets/css/variable.less';

.palel-face-avg {
  position: absolute;
  top: 100px;
  right: @p-right;
  z-index: @p-index;
  width: @p-width;
  height: 700px;
  .panel-bg();
  .date {
    margin-left: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    color: #fff;
  }
  .chart {
    width: 90%;
    margin: 0 auto;
    height: 500px;
  }
}
</style>
