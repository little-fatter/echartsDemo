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
          name: '01月',
          value: 300
        },
        {
          name: '02月',
          value: 200
        },
        {
          name: '03月',
          value: 0
        },
        {
          name: '04月',
          value: 280
        },
        {
          name: '05月',
          value: 200
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
              color: '#ffffff99'
            }
          },
          axisLabel: {
            color: '#ffffff99',
            fontSize: 18,
            show: true
          }
        },
        yAxis: {
          name: '(吨)',
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ffffff99'
            }
          },
          axisLabel: {
            color: '#ffffff99',
            fontSize: 18,
            show: true
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ffffff33',
              type: 'dotted'
            }
          }
        },
        series: [
          {
            type: 'line',
            name: '入湖总量时序',
            data: this.chartData,
            symbol: 'circle',
            symbolSize: 6,
            itemStyle: {
              color: '#67a1d8',
              borderColor: '#67a1d835',
              borderWidth: 12,
              borderType: 'solid'
            },
            lineStyle: {
              color: '#0d60aa',
              width: 3
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
