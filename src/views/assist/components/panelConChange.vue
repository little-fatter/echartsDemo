<template>
  <div class="assist-con-change">
    <panel-title :title="title" :date="date"></panel-title>
    <div class="assist-con-change-chart" id="assistConChange"></div>
  </div>
</template>

<script>
// 浓度变化
import { PollutantConcentrationScenario } from '@/api/assist'
import { mapGetters } from 'vuex'
import { chartColors } from '@/utils/util'
export default {
  computed: {
    ...mapGetters([
      'lake', 'assistPoll', 'assistYear', 'assistTypeValue'
    ])
  },
  data () {
    return {
      date: '',
      title: ''
    }
  },
  watch: {
    lake () {
      this.renderChart()
    },
    assistPoll () {
      this.renderChart()
    },
    assistYear () {
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
        year: this.assistYear,
        poll: this.assistPoll,
        sceneGroupName: this.assistTypeValue
      }
      PollutantConcentrationScenario(param).then(res => {
        if (res) {
          this.title = `(${res.pollName})浓度变化时序`
          this.date = ``
          var xData = []
          var series = []
          res.datas.forEach((item, index) => {
            var param = {
              name: res.titles[index],
              type: 'line',
              symbol: 'none',
              data: []
            }
            item.forEach(valueItem => {
              param.data.push(valueItem.value)
              if (index === 0) {
                xData.push(valueItem.date)
              }
            })
            series.push(param)
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
          this.$chartRender('assistConChange', this.option)
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
.assist-con-change {
  position: absolute;
  top: 605px;
  left: @p-right;
  z-index: @p-index;
  width: @p-width;
  height: 485px;
  .panel-bg();
  .assist-con-change-chart {
    height: 350px;
  }
}
</style>
