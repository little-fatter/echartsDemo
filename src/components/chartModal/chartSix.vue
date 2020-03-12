<template>
  <div v-if="visible" :style="{left: left + 'px', top: top + 'px'}" class="detail-modal-info">
    <div class="header">
      <span class="title">无人机</span>
      <span style="float: right;margin-right:50px">站点编号:{{ code }}</span>
      <img src="../../assets/icons/dal_close.png" class="deal-modal-close" @click="toggleDealModal">
    </div>
    <div class="video">
      <video style="width:100%;height:90%;" controls="controls" src="http://127.0.0.1:81/plane/巡湖2.mp4"></video>
    </div>
    <div class="control">
      <div class="control-item">
        <span class="icon-camera"></span><br />
        <span>制法取证</span>
      </div>
      <div class="control-item">
        <span class="icon-horn"></span><br />
        <span>喊话</span>
      </div>
      <div class="control-item">
        <span class="icon-ai"></span><br />
        <span>AI人脸识别</span>
      </div>
    </div>
  </div>
</template>

<script>
// 无人机
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
  .video{
    width: 850px;
    margin: 0 auto;
    height: 412px;
  }
  .control{
    position: absolute;
    z-index: 99;
    left: 60px;
    right: 60px;
    bottom: 50px;
    height: 70px;
    display: flex;
    .control-item{
      flex: 1;
      text-align: center;
      height: 70px;
      .icon-camera {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url('../../assets/icons/camera.png') center center no-repeat;
        background-size: 100% 100%;
      }
      .icon-horn {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url('../../assets/icons/horn.png') center center no-repeat;
        background-size: 100% 100%;
      }
      .icon-ai {
        display: inline-block;
        width: 40px;
        height: 40px;
        background: url('../../assets/icons/ai.png') center center no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
