<template>
  <div v-if="visible" :style="{left: left + 'px', top: top + 'px'}" class="detail-modal-info">
    <div class="header">
      <span class="title">实时监控</span>
      <span style="float: right;margin-right:50px">站点编号:{{ code }}</span>
      <img src="../../assets/icons/dal_close.png" class="deal-modal-close" @click="toggleDealModal">
    </div>
    <div class="video">
      <video style="width:100%;height:90%;" id="realVideoPouup" controls="controls" autoplay></video>
    </div>
  </div>
</template>

<script>
// 实时监控
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
  mounted () {
    if (this.code === '5e6218413655c976215c0a97') {
      this.playVideo('realVideoPouup', 'http://hls01open.ys7.com/openlive/1468c3bbdcdb45f780fad2fb7fb31200.hd.m3u8')
    } else if (this.code === '5e6218413655c976215c0a9a') {
      this.playVideo('realVideoPouup', 'http://hls01open.ys7.com/openlive/bd387b148e894a0d9673a35dc904ccfe.hd.m3u8')
    }
  },
  watch: {
    visible (value) {
      if (value) {
        this.$nextTick(() => {
          if (this.code === '5e6218413655c976215c0a97') {
            this.playVideo('realVideoPouup', 'http://hls01open.ys7.com/openlive/1468c3bbdcdb45f780fad2fb7fb31200.hd.m3u8')
          } else if (this.code === '5e6218413655c976215c0a9a') {
            this.playVideo('realVideoPouup', 'http://hls01open.ys7.com/openlive/bd387b148e894a0d9673a35dc904ccfe.hd.m3u8')
          }
        })
      }
    }
  },
  methods: {
    playVideo (videoId, url) {
      // eslint-disable-next-line no-undef
      if (Hls.isSupported()) {
        var video = document.getElementById(videoId)
        // eslint-disable-next-line no-undef
        var hls = new Hls()
        hls.loadSource(url)
        hls.attachMedia(video)
        video.play()
        // eslint-disable-next-line no-undef
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play()
        })
      }
    },
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
    margin: 10px 40px 0 40px;
    height: 420px;
    video{
      height: 100%;
      width: 100%;
    }
  }
}
</style>
