<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
/** 应用默认启动组件 */
export default {
  data () {
    return {
      locale: zhCN
    }
  },
  mounted () {
    this.initDom()
  },
  methods: {
    initDom () {
      this.responsive()
      const that = this
      window.onresize = function () {
        that.responsive()
      }
    },
    responsive () {
      var ratioW = window.innerWidth / 4896
      var ratioH = window.innerHeight / 1632
      document.body.style.transform = 'scale(' + ratioW + ',' + ratioH + ')'

      if (document.getElementById('videoPlayOverlay')) {
        var ratioWplay = 4896 / window.innerWidth
        var ratioHplay = 1632 / window.innerHeight
        document.getElementById('videoPlayOverlay').style.transform = 'scale(' + ratioWplay + ',' + ratioHplay + ')'
        document.getElementById('player').style.transform = 'scale(' + ratioWplay + ',' + ratioHplay + ')'
      }
    }
  }
}
</script>
<style>
#app {
  height: 100%;
}
</style>
