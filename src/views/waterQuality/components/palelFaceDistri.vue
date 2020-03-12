<template>
  <div class="palel-face-distri">
    <panel-title :title="title" :date="date"></panel-title>
    <div class="chart" id="waterQualityFaceDistri"></div>
  </div>
</template>

<script>
import PanelTitle from '@/components/Dashboard/PanelTitle'
import { SurfaceKConcentrationDistributionChange, SurfaceMConcentrationDistributionChange } from '@/api/waterQuality'
import { mapGetters } from 'vuex'
import { markLineData, chartColors, coverTime } from '@/utils/util'
// 演示面,水平面（剖面）,浓度分布变化(最大最小值)
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
    showChart (xData, series, legend) {
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
        legend: {
          data: legend,
          textStyle: {
            color: '#959CB7'
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
        series: series
      }
      this.$chartRender('waterQualityFaceDistri', this.option)
    },
    renderChart () {
      // 判断是水平还是横纵切面，请求接口不一样
      if (this.waterQualitySection === 'standard') {
        var param = {
          lake: this.lake,
          year: this.waterQualityYear,
          poll: this.waterQualityPoll,
          k: this.waterQualityActiveLayer
        }
        SurfaceKConcentrationDistributionChange(param).then(res => {
          if (res) {
            this.title = `演示面${res.pollutantName}浓度分布图`
            this.date = `${coverTime(res.beginDate)}—${coverTime(res.endDate)}`
            this.unit = res.unit
            var xData = []
            var series = []
            var lineDefine = markLineData(res.lineDefine)
            res.datas.forEach((dataItem, index) => {
              if (index === 0) {
                var param = {
                  name: res.titles[index],
                  data: [],
                  type: 'line',
                  symbol: 'none',
                  markLine: {
                    symbol: 'none',
                    silent: true,
                    data: lineDefine
                  }
                }
                dataItem.forEach(item => {
                  param.data.push(item.value)
                  xData.push(item.day)
                })
                series.push(param)
              } else {
                var paramOth = {
                  name: res.titles[index],
                  data: [],
                  type: 'line',
                  symbol: 'none'
                }
                dataItem.forEach(item => {
                  paramOth.data.push(item.value)
                })
                series.push(paramOth)
              }
            })
            this.showChart(xData, series, res.titles)
          }
        })
      } else if (this.waterQualitySection === 'verticalityx' || this.waterQualitySection === 'verticalityy') {
        var paramM = {
          lake: this.lake,
          year: this.waterQualityYear,
          poll: this.waterQualityPoll,
          section: this.waterQualityActiveDirection
        }
        SurfaceMConcentrationDistributionChange(paramM).then(res => {
          if (res) {
            this.title = `演示面${res.pollutantName}浓度分布图`
            this.date = `${res.beginDate}-${res.endDate}`
            this.unit = res.unit
            var xData = []
            var series = []
            var lineDefine = markLineData(res.lineDefine)
            res.datas.forEach((dataItem, index) => {
              if (index === 0) {
                var param = {
                  name: res.titles[index],
                  data: [],
                  type: 'line',
                  symbol: 'none',
                  markLine: {
                    symbol: 'none',
                    silent: true,
                    data: lineDefine
                  }
                }
                dataItem.forEach(item => {
                  param.data.push(item.value)
                  xData.push(item.day)
                })
                series.push(param)
              } else {
                var paramOth = {
                  name: res.titles[index],
                  data: [],
                  type: 'line',
                  symbol: 'none'
                }
                dataItem.forEach(item => {
                  paramOth.data.push(item.value)
                })
                series.push(paramOth)
              }
            })
            this.showChart(xData, series, res.titles)
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

.palel-face-distri {
  position: absolute;
  top: 820px;
  right: @p-right;
  z-index: @p-index;
  width: @p-width;
  height: 780px;
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
    height: 600px;
  }
}
</style>
