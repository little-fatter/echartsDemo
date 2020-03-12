<template>
  <div v-if="visible" :style="{left: left + 'px', top: top + 'px'}" class="detail-modal-info">
    <div class="header">
      <span class="title">地下水位站</span>
      <span style="float: right;margin-right:50px">站点编号:{{ code }}</span>
      <img src="../../assets/icons/dal_close.png" class="deal-modal-close" @click="toggleDealModal">
    </div>
    <div class="text-wrapper">
      <div class="text-item">当前水位：1700m</div>
      <div class="text-item">当前水温：17℃</div>
      <div class="text-item">更新时间：2019/8/21 9:00</div>
    </div>
    <div class="modal-chart" id="modal-chart-five"></div>
  </div>
</template>

<script>
// 地下水位站
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
      option: null
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
      this.option = {
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['2018年1月', '2018年2月', '2019年1月', '2019年2月', '2018年3月', '2019年3月', '2018年4月', '2019年4月', '2018年5月', '2019年5月']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '2018',
            type: 'bar',
            data: [1776, 1768, 1779, 1769, 1778, 1770, 1776, 1771, 1778, 1770]
          }
        ]
      }
      this.$chartRender('modal-chart-five', this.option)
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
    height: 380px;
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
