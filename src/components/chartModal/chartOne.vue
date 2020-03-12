<template>
  <div v-if="visible" :style="{left: left + 'px', top: top + 'px'}" class="detail-modal-info">
    <div class="header">
      <span class="title">水位站</span>
      <span style="float: right;margin-right:50px">站点编号:{{ code }}</span>
      <img src="../../assets/icons/dal_close.png" class="deal-modal-close" @click="toggleDealModal">
    </div>
    <div class="text-wrapper">
      <div class="text-item">当前水位：1705m</div>
      <div class="text-item">更新时间：2020/1/1 7:00</div>
      <div class="text-item">当前流速：5m/s</div>
      <div class="text-item">当前流量：50m³/s</div>
    </div>
    <div class="modal-chart" id="modal-chart"></div>
  </div>
</template>

<script>
// 水位
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
      default: false
    }
  },
  data: function () {
    return {
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
  mounted () {
    this.renderChart()
  },
  created () {
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
            name: '水位',
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
            // markLine: {
            //   silent: true,
            //   symbol: ['none', 'none'],
            //   lineStyle: {
            //     width: 1
            //   },
            //   data: [
            //     {
            //       yAxis: 50,
            //       label: {
            //         formatter: 'I类',
            //         color: '#fff'
            //       },
            //       lineStyle: {
            //         color: '#01dff180'
            //       }
            //     },
            //     {
            //       yAxis: 100,
            //       label: {
            //         formatter: 'II类',
            //         color: '#fff'
            //       },
            //       lineStyle: {
            //         color: '#6ae6a080'
            //       }
            //     },
            //     {
            //       yAxis: 150,
            //       label: {
            //         formatter: 'III类',
            //         color: '#fff'
            //       },
            //       lineStyle: {
            //         color: '#FFE72A80'
            //       }
            //     },
            //     {
            //       yAxis: 200,
            //       label: {
            //         formatter: 'IV类',
            //         color: '#fff'
            //       },
            //       lineStyle: {
            //         color: '#FFA73C80'
            //       }
            //     },
            //     {
            //       yAxis: 250,
            //       label: {
            //         formatter: 'V类',
            //         color: '#fff'
            //       },
            //       lineStyle: {
            //         color: '#FD545180'
            //       }
            //     }
            //   ]
            // }
          }
        ]
      }
      this.$chartRender('modal-chart', this.option)
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
  .modal-chart {
    height: 350px;
  }
  .text-wrapper {
    padding: 0 40px;
    overflow: hidden;
    .text-item{
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
