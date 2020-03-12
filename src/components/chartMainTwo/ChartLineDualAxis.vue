<template>
  <div :id="id" :style="{'width':width,'height':height}"></div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      option: null,
      chartData: [
        {
          name: '1月1日',
          value: 300
        },
        {
          name: '2月1日',
          value: 240
        },
        {
          name: '3月1日',
          value: 180
        },
        {
          name: '4月1日',
          value: 280
        },
        {
          name: '5月1日',
          value: 150
        },
        {
          name: '6月1日',
          value: 190
        },
        {
          name: '7月1日',
          value: 80
        },
        {
          name: '8月1日',
          value: 140
        },
        {
          name: '9月1日',
          value: 100
        },
        {
          name: '10月1日',
          value: 90
        },
        {
          name: '11月1日',
          value: 150
        },
        {
          name: '12月1日',
          value: 170
        }
      ]
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    doRender: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    renderChart () {
      this.option = {
        grid: {
          top: 40,
          left: 40,
          right: 40,
          bottom: 20,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.chartData.map(o => {
            return o.name
          }),
          axisLine: {
            lineStyle: {
              color: '#ffffff55'
            }
          },
          axisLabel: {
            color: '#ffffff55',
            fontSize: 18,
            show: true
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ffffff55'
            }
          },
          axisLabel: {
            color: '#ffffff55',
            fontSize: 18,
            show: true
          },
          splitLine: {
            show: false
          }
        },
        series: [
          {
            type: 'line',
            name: '点位污染因子时序',
            data: this.chartData,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#856cf4'
            },
            lineStyle: {
              color: '#856cf4',
              width: 2
            },
            markLine: {
              silent: true,
              symbol: ['none', 'none'],
              lineStyle: {
                width: 1
              },
              data: [
                {
                  yAxis: 50,
                  label: {
                    formatter: 'I类',
                    color: '#fff'
                  },
                  lineStyle: {
                    color: '#01dff180'
                  }
                },
                {
                  yAxis: 100,
                  label: {
                    formatter: 'II类',
                    color: '#fff'
                  },
                  lineStyle: {
                    color: '#6ae6a080'
                  }
                },
                {
                  yAxis: 150,
                  label: {
                    formatter: 'III类',
                    color: '#fff'
                  },
                  lineStyle: {
                    color: '#FFE72A80'
                  }
                },
                {
                  yAxis: 200,
                  label: {
                    formatter: 'IV类',
                    color: '#fff'
                  },
                  lineStyle: {
                    color: '#FFA73C80'
                  }
                },
                {
                  yAxis: 250,
                  label: {
                    formatter: 'V类',
                    color: '#fff'
                  },
                  lineStyle: {
                    color: '#FD545180'
                  }
                }
              ]
            }
          }
        ]
      }
      this.$chartRender(this.id, this.option)
    }
  },
  watch: {
    doRender (n) {
      if (n) {
        this.renderChart()
      }
    }
  }
}
</script>
<style lang="">
</style>
