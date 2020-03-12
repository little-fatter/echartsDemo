<template>
  <div class="home">
    <bt-cloudvr
      id="player"
      :render="doRender"
      ref="player"
      @cvr-loaded="getCloudRenderer"
      @on-poi-click="showPopout"
      @on-poi-position="detectPOIPosition"
    ></bt-cloudvr>
    <m-header></m-header>
    <lake ref="lake"></lake>
    <m-menu></m-menu>
    <router-view />
  </div>
</template>

<script>
import CloudVR from '@/components/CloudVR'
import header from '@/components/Dashboard/Header'
import lake from '@/components/Dashboard/Lake'
import menu from '@/components/Dashboard/Menu'
import { mapMutations } from 'vuex'

export default {
  components: {
    'bt-cloudvr': CloudVR,
    'm-header': header,
    lake,
    'm-menu': menu
  },
  data () {
    return {
      doRender: false,
      renderer: null,
      pointId: ''
    }
  },
  mounted () {
    this.doRender = true
  },
  methods: {
    ...mapMutations([
      'set_clickPointId', 'set_pointPosition'
    ]),
    getCloudRenderer (msg) {
      this.renderer = msg
      this.renderer.SuperAPI('SetEnvTime', '08:00')
    },
    showPopout (msg) {
      this.set_clickPointId(msg)
    },
    detectPOIPosition (msg) {
      this.set_pointPosition(msg)
    }
  }
}
</script>

<style lang="less" scoped>
.home{
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
