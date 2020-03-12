<template>
  <div class="bigscreen-header">
    <div class="bigscreen-header-left">{{ currentTime }}</div>
    <div @click="chickLight" class="bigscreen-header-info">
      <span :style="{transform: `rotate(${lightConf.deg}deg)`}" class="icon"></span>
      <span class="title">{{ lightConf.title }}</span>
    </div>
    <div class="bigscreen-header-center"></div>
    <div class="bigscreen-header-right">
      <!-- <img :src="tqImg" class="item"> -->
      <span class="item">{{ weatherData.skycon }}</span>
      <span class="item">{{ weatherData.temp }}℃</span>
      <span class="item">{{ weatherData.wspddir }}{{ weatherData.wspd }}级</span>
    </div>
  </div>
</template>

<script>
import tqImg from '@/assets/icons/tq.png'
import * as homeApi from '@/api/home'

export default {
  data () {
    return {
      lightConf: {
        title: '早晨',
        deg: 0,
        lightIndex: 1
      },
      currentTime: '',
      tqImg,
      weatherData: {}
    }
  },
  created () {
    this.init()
    this.getWeather()
  },
  methods: {
    getWeather () {
      var param = {
        coord: '102.886592,24.478327'
      }
      homeApi.meteorological(param).then(res => {
        this.weatherData = res.data
      })
    },
    init () {
      this.currentTime = (new Date()).format('yyyy-MM-dd hh:mm:ss')
      this.changTime()
    },
    changTime () {
      setInterval(() => {
        this.currentTime = (new Date()).format('yyyy-MM-dd hh:mm:ss')
      }, 1000)
    },
    chickLight () {
      if (this.lightConf.lightIndex < 4) {
        this.lightConf.lightIndex += 1
      } else {
        this.lightConf.lightIndex = 1
      }
      if (this.lightConf.lightIndex === 1) {
        this.lightConf.title = '早晨'
        this.lightConf.deg = 0
        this.$parent.renderer.SuperAPI('SetEnvTime', '8:00')
      } else if (this.lightConf.lightIndex === 2) {
        this.lightConf.title = '中午'
        this.lightConf.deg = 90
        this.$parent.renderer.SuperAPI('SetEnvTime', '14:00')
      } else if (this.lightConf.lightIndex === 3) {
        this.lightConf.title = '傍晚'
        this.lightConf.deg = 180
        this.$parent.renderer.SuperAPI('SetEnvTime', '17:30')
      } else if (this.lightConf.lightIndex === 4) {
        this.lightConf.title = '晚上'
        this.lightConf.deg = 270
        this.$parent.renderer.SuperAPI('SetEnvTime', '23:00')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bigscreen-header {
  z-index: 120;
}

.bigscreen-header-left {
  position: absolute;
  left: 54px;
  top: 36px;
  width: 400px;
  height: 50px;
  line-height: 50px;
  font-family: Arial;
  font-size: 24px;
  color: #9AB1CB;
  text-align: left;
  letter-spacing: 2px;
  text-shadow: rgb(2, 112, 255) 0px 0px 10px;
  z-index: 200;
}

.bigscreen-header-info {
  position: absolute;
  left: 450px;
  top: 36px;
  height: 50px;
  line-height: 50px;
  width: 120px;
  z-index: 121;
  cursor: pointer;
  .icon {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    background: url('../../assets/icons/day.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .title{
    font-size: 26px;
    color: #fff;
    line-height: 50px;
    vertical-align: text-bottom;
  }
}

.bigscreen-header-center {
  position: absolute;
  pointer-events: auto;
  left: 579px;
  top: -49px;
  width: 3734px;
  height: 365px;
  z-index: 120;
  background-image: url('../../assets/icons/title.png');
  background-repeat: no-repeat;
  background-position: center;
}

.bigscreen-header-right {
  position: absolute;
  top: 36px;
  left: 4450px;
  width: 400px;
  height: 50px;
  line-height: 50px;
  font-family: Arial;
  font-size: 24px;
  color: #9AB1CB;
  text-align: left;
  z-index: 200;
  .item {
    margin-right: 20px;
    font-family: Arial;
    font-size: 24px;
    z-index: 200;
  }
}
</style>
