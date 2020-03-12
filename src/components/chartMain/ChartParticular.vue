<template>
  <div :id="id" :style="{'width':width,'height':height}"></div>
</template>
<script>
import * as homeApi from '@/api/home'
export default {
  name: '',
  data () {
    return {
      option: null,
      chartObj: null
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
      const $this = this
      homeApi.precipitations().then(res => {
        this.chartData = res.map(item => {
          return {
            name: item.month + '月',
            value: item.value
          }
        })
        this.chartData = [
          { name: '2019年9月', value: 84.03 },
          { name: '2019年10月', value: 75 },
          { name: '2019年11月', value: 6.36 },
          { name: '2019年12月', value: 8.93 },
          { name: '2020年1月', value: 63.7 },
          { name: '2020年2月', value: 19.43 }
        ]
        const maxValues = this.chartData.map(() => {
          return $this.findMaxValue($this.chartData, 'value')
        })
        const maxValue = maxValues[0]
        this.option = {
          yAxis: {
            name: '',
            nameTextStyle: {
              color: '#fff',
              align: 'right'
            },
            max: maxValue,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ffffff55',
                type: 'dotted'
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              color: '#fff',
              fontSize: 18
            },
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 40,
            top: 55,
            right: 20,
            bottom: 35,
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              inverse: false,
              data: this.chartData.map(o => {
                return o.name
              }),
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#fff',
                  width: 1
                }
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                color: '#fff',
                fontSize: 18
              }
            }
          ],
          series: [
            {
            // 内
              type: 'bar',
              barWidth: 10,
              legendHoverLink: false,
              silent: true,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#1891fe' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#1ee6e8' // 100% 处的颜色
                    }
                  ]
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  formatter: '{c}',
                  textStyle: {
                    color: '#fff',
                    fontSize: 18
                  }
                }
              },
              data: this.chartData,
              z: 1,
              animationEasing: 'elasticOut'
            },
            {
              type: 'pictorialBar',
              animationDuration: 0,
              symbolRepeat: 'fixed',
              symbol: 'rect',
              symbolSize: [10, 10],
              symbolBoundingData: maxValue,
              itemStyle: {
                normal: {
                  color: '#ffffff30'
                }
              },
              label: {
                normal: {
                  show: false
                }
              },
              data: [20, 20, 20, 20, 20],
              z: 0,
              animationEasing: 'elasticOut'
            },
            {
            // 分隔
              type: 'pictorialBar',
              itemStyle: {
                color: '#202c3d'
              },
              symbolRepeat: 'fixed',
              symbolMargin: 4,
              symbol: 'rect',
              symbolClip: true,
              symbolSize: [10, 4],
              symbolPosition: 'start',
              symbolOffset: [0, 0],
              symbolBoundingData: maxValue,
              data: this.chartData,
              z: 2,
              animationEasing: 'elasticOut'
            }
          ]
        }
        this.$chartRender(this.id, this.option)
      })
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
<style lang="" scoped>
</style>
