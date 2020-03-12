<template>
  <div v-if="visible" :style="{left: left + 'px', top: top + 'px'}" class="detail-modal-info">
    <div class="header">
      <span class="title">雨量站</span>
      <span style="float: right;margin-right:50px">站点编号:{{ code }}</span>
      <img src="../../assets/icons/dal_close.png" class="deal-modal-close" @click="toggleDealModal" />
    </div>
    <div class="text-wrapper">
      <div class="text-item">1h降雨量(mm):5</div>
      <div class="text-item">更新时间：2019/8/21 9:00</div>
    </div>
    <div class="modal-chart" id="modal-chart-two"></div>
  </div>
</template>

<script>
// 雨量站
export default {
  props: {
    code: {
      type: String,
      required: true
    },
    left: {
      type: Number,
      required: true
    },
    top: {
      type: Number,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  data: function() {
    return {
      option: null
    }
  },
  mounted() {
    this.renderChart()
  },
  watch: {
    visible(value) {
      if (value) {
        this.$nextTick(() => {
          this.renderChart()
        })
      }
    }
  },
  methods: {
    toggleDealModal() {
      this.$emit('visible', false)
    },
    renderChart() {
      this.chartData = [
        {
          name: '1:00:00',
          value: 7.3
        },
        {
          name: '2:00:00',
          value: 6.7
        },
        {
          name: '3:00:00',
          value: 5.9
        },
        {
          name: '4:00:00',
          value: 5.2
        },
        {
          name: '5:00:00',
          value: 5.6
        }
      ]
      const $this = this
      const maxValues = this.chartData.map(() => {
        return $this.findMaxValue($this.chartData, 'value')
      })
      const maxValue = maxValues[0]
      this.option = {
        yAxis: {
          name: '单位',
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
            animationEasing: 'elasticOut',
            markLine: {
              silent: true,
              symbol: ['none', 'none'],
              lineStyle: {
                width: 1
              },
              data: [
                {
                  yAxis: 6,
                  label: {
                    formatter: '警戒线',
                    color: '#fff'
                  },
                  lineStyle: {
                    color: '#ff270075'
                  }
                }
              ]
            }
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
      this.$chartRender('modal-chart-two', this.option)
    }
  }
}
</script>

<style scoped lang="less">
.detail-modal-info {
  position: absolute;
  top: 631px;
  left: 720px;
  height: 550px;
  width: 900px;
  background: url('../../assets/icons/deal.png') center center no-repeat;
  background-size: 100% 100%;
  z-index: 200;
  .header {
    position: relative;
    margin-top: 56px;
    margin-left: 40px;
    margin-right: 40px;
    font-size: 18px;
    height: 50px;
    line-height: 22px;
    color: #fff;
    .title {
      color: #0cd3ff;
    }
    .deal-modal-close {
      position: absolute;
      right: -32px;
      top: -46px;
      width: 56px;
      height: 56px;
    }
  }
  .modal-chart {
    height: 380px;
  }
  .text-wrapper {
    padding: 0 40px;
    overflow: hidden;
    .text-item {
      width: 50%;
      float: left;
      height: 40px;
      line-height: 40px;
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>
