<template>
  <div v-if="visible" :style="{left: left + 'px', top: top + 'px'}" class="detail-modal-info">
    <div class="header">
      <span class="title">气象站</span>
      <span style="float: right;margin-right:50px">站点编号:{{ code }}</span>
      <img src="../../assets/icons/dal_close.png" class="deal-modal-close" @click="toggleDealModal">
    </div>
    <div class="text-wrapper">
      <div class="text-item">当前空气质量：优</div>
      <div class="text-item">当前风向：东南</div>
      <div class="text-item">pm2.5浓度：18μg/m3</div>
      <div class="text-item">紫外线强度：中等</div>
      <div class="text-item">气压：997hPa</div>
      <div class="text-item">相对湿度：0.5</div>
      <div class="text-item">co浓度：0.3μg/m3</div>
      <div class="text-item">so2浓度：1μg/m3</div>
    </div>
  </div>
</template>

<script>
// 气象站
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
    }
  },
  mounted () {
  },
  methods: {
    toggleDealModal () {
      this.$emit('visible', false)
    }
  }
}
</script>

<style scoped lang="less">
.detail-modal-info {
  position: absolute;
  top: 631px;
  left: 720px;
  height: 300px;
  width: 500px;
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
