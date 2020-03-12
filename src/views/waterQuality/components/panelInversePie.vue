<template>
  <div class="palel-inverse-pie">
    <panel-title :title="title" :date="date"></panel-title>
    <div class="chart" id="waterQualityInversePie"></div>
  </div>
</template>

<script>
import PanelTitle from '@/components/Dashboard/PanelTitle'
import { LakeWaterqualityDaysProportion } from '@/api/waterQuality'
import { mapGetters } from 'vuex'
// 水质类别分布
export default {
  components: {
    PanelTitle
  },
  data () {
    return {
      option: null,
      title: '',
      date: '',
      legend: []
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
      LakeWaterqualityDaysProportion(param).then(res => {
        if (res) {
          this.title = `${res.pollutionName}${res.title}`
          this.date = `${res.beginDate}—${res.endDate}`
          var legend = []
          var legendData = []
          res.data.forEach(item => {
            legend.push(item.waterQualityName)
            legendData.push({
              value: item.dayNumber,
              name: item.waterQualityName,
              label: {
                formatter: '{c} 天'
              }
            })
          })
          this.option = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            color: ['#01DFF1', '#6AE6A0', '#FFE72A', '#FFA73C', '#FD5451', '#ff0000'],
            legend: {
              orient: 'vertical',
              bottom: 'left',
              formatter: function (name) {
                var value = ''
                var rate = ''
                res.data.forEach(item => {
                  if (item.waterQualityName === name) {
                    value = item.dayNumber
                    rate = (item.value * 100).toFixed(2) + '%'
                  }
                })
                return '\t\t\t\t\t\t\t\t\t{title|' + name + '}\t\t\t\t\t\t\t\t\t{title|' + value + '}{title|天}\t\t\t\t\t\t\t\t\t{title|' + rate + '}'
              },
              textStyle: {
                rich: {
                  title: {
                    fontSize: 16,
                    lineHeight: 15,
                    color: 'rgba(149,156,183,1)'
                  }
                }
              }
            },
            series: [
              {
                name: '水质分布',
                type: 'pie',
                radius: ['20%', '30%'],
                avoidLabelOverlap: false,
                labelLine: {
                  normal: {
                    show: true
                  }
                },
                data: legendData
              }
            ]
          }
          this.$chartRender('waterQualityInversePie', this.option)
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

.palel-inverse-pie {
  position: absolute;
  top: 100px;
  right: @p-right;
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
