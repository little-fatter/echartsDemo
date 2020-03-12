<template>
  <div class="assist-img">
    <panel-title :title="title" :date="date"></panel-title>
    <img class="img" :src="src" alt="">
  </div>
</template>

<script>
// 污染物模拟分布
import { SceneResultImpDegree } from '@/api/assist'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: '污染物（总氮）模拟分布',
      date: '',
      src: 'http://5066.gr6decb3.fhmpsbz4.8e9bcb.grapps.cn/api/v1/Globals/DownloadImage?urlPath=%E8%A1%A5%E6%B0%B4%E6%8E%A7%E8%97%BB%5C%5C%E6%98%9F%E4%BA%91%E6%B9%96%5C%5C%E8%A1%A5%E6%B0%B4-TN.png'
    }
  },
  computed: {
    ...mapGetters([
      'lake', 'assistPoll', 'assistTypeValue'
    ])
  },
  created () {
    this.getImgSrc()
  },
  watch: {
    lake () {
      this.getImgSrc()
    },
    assistPoll () {
      this.getImgSrc()
    },
    assistTypeValue () {
      this.getImgSrc()
    }
  },
  methods: {
    getImgSrc () {
      var param = {
        lake: this.lake,
        poll: this.assistPoll,
        sceneName: this.assistTypeValue
      }
      SceneResultImpDegree(param).then(res => {
        this.src = `http://5066.gr6decb3.fhmpsbz4.8e9bcb.grapps.cn/api/v1/Globals/DownloadImage?urlPath=${res.url}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~../../../assets/css/variable.less';
.assist-img {
  position: absolute;
  top: 100px;
  left: @p-right;
  z-index: @p-index;
  width: @p-width;
  height: 485px;
  text-align: center;
  .panel-bg();
  .img {
    height: 350px;
  }
}
</style>
