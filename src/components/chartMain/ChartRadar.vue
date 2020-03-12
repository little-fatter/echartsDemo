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
      chartData: []
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
      homeApi.pollutantsNumerical().then(res => {
        var indicatorData = [
          { 'name': '总磷', max: 0.01725 },
          { 'name': '总氮', max: 0.24175 },
          { 'name': '氨氮', max: 0.15 },
          { 'name': '叶绿素α', max: 10 },
          { 'name': '化学需氧量', max: 15 }
        ]
        var data1 = [0.01, 0.187142857142857, 0.0357142857142857, 2, 5.42857142857143] // 实际值
        var data2 = [0.01, 0.2, 0.15, 10, 15] // 参考值
        this.option = {
          tooltip: {
            formatter: '{b}:{c}'
          },
          legend: {
            show: true,
            right: 10,
            top: 'center',
            itemWidth: 12,
            itemHeight: 12,
            orient: 'vertical',
            textStyle: {
              fontSize: 18,
              color: '#fff'
            },
            data: ['实际值', '参考值']
          },
          radar: {
            name: {
              textStyle: {
                color: '#fff'
              }
            },
            splitArea: {
              areaStyle: {
                color: ['#ffffff75', '#ffffff55', '#ffffff35', '#ffffff15']
              }
            },
            splitNumber: 4,
            axisLine: {
              lineStyle: {
                show: true,
                color: '#ffffff30'
              }
            },
            splitLine: {
              lineStyle: {
                show: true,
                color: '#ffffff30'
              }
            },
            center: ['40%', '50%'],
            indicator: indicatorData
          },
          color: ['#1890ff', '#1df5f5'],
          series: [
            {
              type: 'radar',
              data: [
                {
                  value: data1,
                  name: '实际值',
                  itemStyle: {
                    normal: {
                      color: '#1890ff'
                    }
                  },
                  lineStyle: {
                    color: '#1890ff'
                  },
                  areaStyle: {
                    normal: {
                      color: '#1890ff45'
                    }
                  }
                },
                {
                  value: data2,
                  name: '参考值',
                  itemStyle: {
                    normal: {
                      color: '#1df5f5'
                    }
                  },
                  lineStyle: {
                    color: '#1df5f5'
                  },
                  areaStyle: {
                    normal: {
                      color: '#1df5f545'
                    }
                  }
                }
              ]
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
<style lang="">
</style>
