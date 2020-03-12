<template>
  <div class="bigscreen-content_dt_optearea" v-if="menuIndex !== 6">
    <!-- 左侧三湖切换 -->
    <div v-for="(item, index) in hupoData" :key="index" class="item" :class="{'active':activeHuPo === item.lake.code}" @click="handleChangeHuPo(item.lake.code)">
      <div class="header">
        <div class="title">{{ item.lake.name }}</div>
        <div class="sz-desc">
          <span style="margin-right:10px">水质</span>
          <img :src="getLevelImg(item.waterQuality.level)"/>
        </div>
      </div>
      <div class="content">
        <div>蓄水量/水位</div>
        <div>{{ item.level.value }}{{ item.level.unit }}/{{ item.amount.value }}{{ item.amount.unit }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as homeApi from '@/api/home'
import { mapMutations, mapGetters } from 'vuex'

export default {
  data () {
    return {
      hupoData: [],
      activeHuPo: 'fxh',
      isShowHuPoArea: false
    }
  },
  created () {
    this.waterQuality()
  },
  computed: {
    ...mapGetters([
      'menuIndex', 'lake'
    ])
  },
  methods: {
    ...mapMutations([
      'set_lake', 'set_lakeActive', 'set_lakePrevActive'
    ]),
    // 湖泊水质信息
    waterQuality () {
      homeApi.waterQuality().then(res => {
        this.hupoData = res
      })
    },
    // 获取水质等级图片
    getLevelImg (level) {
      let data = ''
      if (level === 1) {
        data = require('../../assets/icons/icon1.png')
      } else if (level === 2) {
        data = require('../../assets/icons/icon11.png')
      } else if (level === 3) {
        data = require('../../assets/icons/icon111.png')
      } else if (level === 4) {
        data = require('../../assets/icons/iconIV.png')
      } else if (level === 5) {
        data = require('../../assets/icons/iconV.png')
      } else if (level === 6) {
        data = require('../../assets/icons/iconV1.png')
      }
      return data
    },
    handleChangeHuPo (code) {
      // 控制切换湖体时，是否降下上一个湖体
      if (this.activeHuPo === this.lake && this.isShowHuPoArea === false) {
        this.set_lakePrevActive(false)
      } else {
        this.set_lakePrevActive(true)
      }

      // 控制湖泊的虚拟边界
      if (this.activeHuPo === code) {
        this.isShowHuPoArea = !this.isShowHuPoArea
      } else {
        this.isShowHuPoArea = true
      }

      if (code === 'fxh') {
        this.$parent.$refs.player.lakeswitch('fx', this.isShowHuPoArea)
      } else if (code === 'xyh') {
        this.$parent.$refs.player.lakeswitch('xy', this.isShowHuPoArea)
      } else if (code === 'qlh') {
        this.$parent.$refs.player.lakeswitch('ql', this.isShowHuPoArea)
      }
      this.activeHuPo = code
      this.set_lake(code)
      this.set_lakeActive(this.isShowHuPoArea)
    }
  }
}
</script>

<style lang="less" scoped>
.bigscreen-content_dt_optearea {
  position: absolute;
  left: 747px;
  top: 181px;
  z-index: 120;
  .item {
    z-index: 120;
    height:  126px;
    cursor: pointer;
    background-image: url('../../assets/icons/btn_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    margin-bottom: 20px;
    width: 320px;
    .header {
      height: 40px;
      line-height: 40px;
      padding: 20px 10px 20px 30px;
      .title {
        float: left;
        font-size: 24px;
        font-family: "Microsoft Yahei";
        color: #ffffff;
      }
      .sz-desc {
        float: right;
        font-size: 18px;
        font-family: "Microsoft Yahei";
        color: #9AB1CB;
        margin-right: 10px;
      }
    }
    .content {
      padding: 20px 0px 0px 30px;
      font-size: 18px;
      font-family: "Microsoft Yahei";
      color: #9AB1CB;
    }
  }
  .item.active {
    background-image: url('../../assets/icons/select_btn_bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    width: 326px;
    height:128px;
    .header {
      .title {
        color: #0cd3ff;
      }
    }
  }
}
</style>
