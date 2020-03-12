<template>
  <div v-if="visible" :style="{left: left + 'px', top: top + 'px'}" class="detail-modal-info">
    <div class="header">
      <span class="title">水质站</span>
      <span style="float: right;margin-right:50px">站点编号:{{ code }}</span>
      <img src="../../assets/icons/dal_close.png" class="deal-modal-close" @click="toggleDealModal">
    </div>
    <div class="content">
      <div class="text-wrapper">
        <div class="text-item">当前水质：I类</div>
        <div class="text-item">环比水质：II类</div>
        <div class="text-item">考核标准水质：II类</div>
        <div class="text-item">起标因子：氨氮</div>
        <div class="text-item">更新时间：2月</div>
      </div>
      <div class="modal-chart" id="modal-chart-four"></div>
    </div>
  </div>
</template>

<script>
// 水质站
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
  data: function () {
    return {
      option: null,
      chartData: [
        {
          groupName: '系列一',
          groupData: [
            {
              name: '总磷',
              value: 10
            },
            {
              name: '总氮',
              value: 17
            },
            {
              name: '氨氮',
              value: 5
            },
            {
              name: 'COD',
              value: 8
            },
            {
              name: '叶绿素',
              value: 12
            },
            {
              name: '水温',
              value: 5
            }
          ]
        },
        {
          groupName: '系列二',
          groupData: [
            {
              name: '总磷',
              value: 8
            },
            {
              name: '总氮',
              value: 13
            },
            {
              name: '氨氮',
              value: 16
            },
            {
              name: 'COD',
              value: 5
            },
            {
              name: '叶绿素',
              value: 11
            },
            {
              name: '水温',
              value: 2
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.renderChart()
  },
  watch: {
    visible (value) {
      if (value) {
        this.$nextTick(() => {
          this.renderChart()
        })
      }
    }
  },
  methods: {
    toggleDealModal () {
      this.$emit('visible', false)
    },
    renderChart () {
      const $this = this
      const temp = $this.chartData[0].groupData.concat(
        $this.chartData[1].groupData
      )
      const maxValues = $this.chartData.map(o => {
        return $this.findMaxValue(temp, 'value')
      })
      const maxValue = maxValues[0]
      this.option = {
        tooltip: {
          formatter: '{b}:{c}'
        },
        // legend: {
        //   show: true,
        //   right: 10,
        //   top: 'center',
        //   itemWidth: 12,
        //   itemHeight: 12,
        //   orient: 'vertical',
        //   textStyle: {
        //     fontSize: 18,
        //     color: '#fff'
        //   },
        //   data: $this.chartData.map(o => {
        //     return o.groupName
        //   })
        // },
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
          indicator: $this.chartData[0].groupData.map(o => {
            return {
              name: o.name,
              max: maxValue
            }
          })
        },
        color: ['#1890ff', '#1df5f5'],
        series: [
          {
            type: 'radar',
            data: [
              {
                value: $this.chartData[0].groupData.map(o => {
                  return o.value
                }),
                name: $this.chartData[0].groupName,
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
                value: $this.chartData[1].groupData.map(o => {
                  return o.value
                }),
                name: $this.chartData[1].groupName,
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
      this.$chartRender('modal-chart-four', this.option)
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
  .header{
    position: relative;
    margin-top: 56px;
    margin-left: 40px;
    margin-right: 40px;
    font-size: 18px;
    height: 50px;
    line-height: 22px;
    color: #fff;
    .title{
      color:#0cd3ff;
    }
    .deal-modal-close{
      position: absolute;
      right: -32px;
      top: -46px;
      width: 56px;
      height: 56px;
    }
  }
  .content {
    .text-wrapper {
      padding: 40px 0 40px 40px;
      float: left;
      width: 40%;
      .text-item{
        height: 60px;
        line-height: 60px;
        color: #fff;
        font-size: 20px;
      }
    }
    .modal-chart {
      width: 60%;
      float: left;
      height: 380px;
    }
  }
}
</style>
