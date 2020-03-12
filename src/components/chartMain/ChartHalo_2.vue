<template>
  <div :id="id" :style="{'width':width,'height':height}"></div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      option: null,
      chartData: {
        name: '工业用水',
        value: 16
      }
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
      var title = this.chartData.name
      this.option = {
        series: {
          type: 'pie',
          clockWise: true,
          radius: ['75%', '85%'],
          silent: true,
          center: ['50%', '50%'],
          data: [
            {
              value: 100 - this.chartData.value,
              name: 'invisible',
              itemStyle: {
                normal: {
                  color: '#22385d',
                  borderWidth: 1,
                  borderColor: '#22385d'
                }
              },
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            },
            {
              value: this.chartData.value,
              label: {
                normal: {
                  rich: {
                    a: {
                      color: '#8da4bd',
                      align: 'center',
                      fontSize: 18
                    },
                    b: {
                      fontSize: 40,
                      fontWeight: 'bold',
                      color: '#38edfd'
                    }
                  },
                  formatter: function (params) {
                    return `{a|${title}}\n\n{b|${params.value}%}`
                  },
                  position: 'center',
                  show: true,
                  textStyle: {
                    fontSize: '18',
                    fontWeight: 'normal',
                    color: '#fff'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#38edfd',
                  shadowColor: '#38edfd',
                  borderWidth: 2,
                  borderColor: '#38edfd',
                  shadowBlur: 10
                }
              }
            }
          ]
        }
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
