<template>
  <div class="section-bar">
    <div class="title-wrapper">
      <div class="title-item" :class="{active: activeMenu === 1}" @click="handleItem(1)">水平面</div>
      <div class="title-item" :class="{active: activeMenu === 2}" @click="handleItem(2)">横断面</div>
      <div class="title-item" :class="{active: activeMenu === 3}" @click="handleItem(3)">纵断面</div>
    </div>
    <div class="content" v-if="activeMenu === 1">
      <div class="img-wrapper">
        <a-steps direction="vertical" :initial="1" :progressDot="true" :current="activeLayer">
          <a-step v-for="item in layerData" :key="item.value">
            <span style="color:#fff;" slot="title">{{ item.name }}</span>
          </a-step>
        </a-steps>
      </div>
      <div class="content-wrapper">
        <div class="content-item" v-for="item in layerData" :key="item.value" @click="handleLayer(item.value)">
          <span class="point" :class="{active: item.value === activeLayer}"></span>
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="content" v-if="activeMenu === 2">
      <div class="img-wrapper" style="text-align:center;">
        <img style="height: 100%;" :src="activeImg" alt="">
      </div>
      <div class="content-wrapper">
        <div class="content-item" v-for="item in acrossData" :key="item.value" @click="handleDirection(item.value)">
          <span class="point" :class="{active: item.value === activeDirection}"></span>
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
    </div>
    <div class="content" v-if="activeMenu === 3">
      <div class="img-wrapper" style="text-align:center;">
        <img style="height: 100%;" :src="activeImg" alt="">
      </div>
      <div class="content-wrapper">
        <div class="content-item" v-for="item in verticalData" :key="item.value" @click="handleDirection(item.value)">
          <span class="point" :class="{active: item.value === activeDirection}"></span>
          <span class="name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  created () {
    this.setInitData()
    this.activeLayer = this.layerData && this.layerData[0].value
    this.set_waterQualitySection('standard')
  },
  data () {
    return {
      activeMenu: 1,
      activeLayer: undefined,
      activeDirection: undefined,
      activeImg: '',
      layerData: [],
      acrossData: [],
      verticalData: []
    }
  },
  methods: {
    ...mapMutations([
      'set_waterQualityActiveLayer', 'set_waterQualityActiveDirection', 'set_waterQualitySection'
    ]),
    handleItem (item) {
      this.activeMenu = item
      if (item === 1) {
        this.activeLayer = this.layerData[0] && this.layerData[0].value
        this.set_waterQualitySection('standard')
      } else if (item === 2) {
        this.set_waterQualitySection('verticalityx')
        this.activeDirection = this.acrossData[0] && this.acrossData[0].value
        this.activeImg = require('../icons/' + this.lake + '_' + this.activeDirection + '.png')
      } else if (item === 3) {
        this.set_waterQualitySection('verticalityy')
        this.activeDirection = this.verticalData[0] && this.verticalData[0].value
        this.activeImg = require('../icons/' + this.lake + '_' + this.activeDirection + '.png')
      }
    },
    handleLayer (value) {
      this.activeLayer = value
    },
    handleDirection (value) {
      this.activeDirection = value
      this.activeImg = require('../icons/' + this.lake + '_' + this.activeDirection + '.png')
    },
    setInitData () {
      if (this.lake === 'fxh') {
        this.layerData = [ { name: '表层（0米）', value: 20 }, { name: '4层（39.25米）', value: 15 }, { name: '3层（78.5米）', value: 10 }, { name: '2层（117.75米）', value: 5 }, { name: '底层（149.15米）', value: 1 } ]
        this.acrossData = [{ name: 'A-A', value: 'aa' }, { name: 'B-B', value: 'bb' }, { name: 'C-C', value: 'cc' }]
        this.verticalData = [{ name: 'D-D', value: 'dd' }, { name: 'E-E', value: 'ee' }]
      } else if (this.lake === 'xyh') {
        this.layerData = [ { name: '表层（0米）', value: 4 }, { name: '3层（2.44米）', value: 3 }, { name: '2层（4.89米）', value: 2 }, { name: '底层(7.34米)', value: 1 } ]
        this.acrossData = [{ name: 'A-A', value: 'aa' }, { name: 'B-B', value: 'bb' }, { name: 'C-C', value: 'cc' }]
        this.verticalData = [{ name: 'D-D', value: 'dd' }]
      } else if (this.lake === 'qlh') {
        this.layerData = []
        this.acrossData = []
        this.verticalData = []
      }
    }
  },
  watch: {
    lake () {
      this.setInitData()
      this.activeMenu = 1
      this.set_waterQualitySection('standard')
      this.activeLayer = this.layerData[0] && this.layerData[0].value
    },
    activeLayer (value) {
      this.set_waterQualityActiveLayer(value)
    },
    activeDirection (value) {
      this.set_waterQualityActiveDirection(value)
    }
  },
  computed: {
    ...mapGetters([
      'lake', 'waterQualityLakeSite'
    ])
  }
}
</script>

<style lang="less" scoped>
.section-bar {
  /deep/ .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot{
    background: #fff;
  }
  /deep/ .ant-steps-vertical .ant-steps-item-content {
    min-height: 30px;
  }
  /deep/ .ant-steps-item-process .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot{
    // background: #38EDFD;
    background: #fff;
  }
  /deep/ .ant-steps-item-finish .ant-steps-item-icon > .ant-steps-icon .ant-steps-icon-dot {
    background: #fff;
  }
  /deep/ .ant-steps-item-finish > .ant-steps-item-tail:after{
    background-color: #fff;
  }
  position: absolute;
  bottom: 148px;
  right: 830px;
  z-index: 200;
  width:500px;
  height:280px;
  background:linear-gradient(180deg,rgba(3,17,40,0.2) 0%,rgba(3,17,40,1) 100%);
  opacity:1;
  border-radius:10px;
  .title-wrapper {
    margin-top: 32px;
    display: flex;
    justify-content: space-evenly;
    .title-item {
      width:90px;
      height:34px;
      border:1px solid rgba(56,237,253,1);
      opacity:1;
      border-radius:5px;
      text-align: center;
      line-height: 34px;
      font-size:18px;
      font-weight:400;
      color:rgba(255,255,255,1);
      &.active {
        border: none;
        background: rgba(56,237,253,1);
      }
    }
  }
  .content {
    padding: 30px;
    display: flex;
    height: 180px;
    .img-wrapper {
      flex: 1;
    }
    .content-wrapper{
      flex: 1;
      .content-item {
        cursor: pointer;
        height: 30px;
        line-height: 30px;
        .point {
          display: inline-block;
          margin-right: 20px;
          width:11px;
          height:11px;
          border:1px solid rgba(187,201,208,1);
          border-radius:50%;
          position: relative;
          &.active{
            border-color: #38EDFD;
          }
          &.active::before{
            position: absolute;
            content: '';
            top: 1px;
            left: 1px;
            display: inline-block;
            width:7px;
            height:7px;
            background: #38EDFD;
            border-radius:50%;
          }
        }
        .name{
          font-size:16px;
          font-weight:400;
          line-height:15px;
          color:rgba(187,201,208,1);
        }
      }
    }
  }
}
</style>
