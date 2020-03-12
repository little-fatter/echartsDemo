<template>
  <div class="palel-pollution">
    <panel-title :title="title"></panel-title>
    <div class="chart" id="waterQualityPollution"></div>
  </div>
</template>

<script>
import PanelTitle from '@/components/Dashboard/PanelTitle'
import { PollutionConcentrationPreviousYear } from '@/api/waterQuality'
import { mapGetters } from 'vuex'
// 污染因子浓度同比
export default {
  components: {
    PanelTitle
  },
  data () {
    return {
      option: null,
      title: ''
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
      PollutionConcentrationPreviousYear(param).then(res => {
        if (res) {
          this.title = `${res.pollName}${res.title}`
          var legend = []
          var data = []
          res.years.forEach(item => {
            legend.push(item)
            var param = {
              name: item,
              type: 'bar',
              barGap: 0,
              data: []
            }
            res.data[item].forEach(valueItem => {
              param.data.push(valueItem)
            })
            data.push(param)
          })
          this.option = {
            color: ['#01DFF1', '#0070FB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: legend,
              textStyle: {
                color: '#959CB7'
              }
            },
            xAxis: [
              {
                type: 'category',
                axisTick: { show: false },
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                axisLine: {
                  lineStyle: {
                    color: '#fff'
                  }
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                axisLine: {
                  lineStyle: {
                    color: '#fff'
                  }
                }
              }
            ],
            series: data
          }
          this.$chartRender('waterQualityPollution', this.option)
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

.palel-pollution {
  position: absolute;
  top: 820px;
  right: @p-right;
  z-index: @p-index;
  width: @p-width;
  height: 780px;
  .panel-bg();
  .chart {
    width: 90%;
    margin: 0 auto;
    height: 600px;
  }
}
</style>
