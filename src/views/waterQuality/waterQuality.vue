<template>
  <div class="water-quality">
    <panel-lake></panel-lake>
    <panel-avg></panel-avg>
    <panel-water-level v-if="waterQualityLakeSite === 'lakeBody'"></panel-water-level>
    <panel-pollution v-if="waterQualityLakeSite === 'lakeBody'"></panel-pollution>

    <panel-face-avg v-if="waterQualityLakeSite === 'lakeFace'"></panel-face-avg>
    <palel-face-distri v-if="waterQualityLakeSite === 'lakeFace'"></palel-face-distri>

    <panel-point-avg v-if="waterQualityLakeSite === 'lakePoint'"></panel-point-avg>
    <panel-point-pollution v-if="waterQualityLakeSite === 'lakePoint'"></panel-point-pollution>

    <!-- <panel-inverse-info></panel-inverse-info>
    <panel-inverse-avg></panel-inverse-avg>
    <panel-inverse-pie></panel-inverse-pie>
    <panel-inverse-list></panel-inverse-list> -->

    <pool-bar></pool-bar>
    <place-bar ref="placeBar"></place-bar>
    <section-bar v-if="waterQualityLakeSite === 'lakeFace'"></section-bar>

    <div @click="exitMain" class="exit-btn" v-show="!showMenu">
      <span class="btn"></span>
      <div class="text">退出</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// 湖体面板
import panelLake from './components/panelLake'
import panelAvg from './components/panelAvg'
import panelWaterLevel from './components/panelWaterLevel'
import panelPollution from './components/panelPollution'
// 湖面面板
import panelFaceAvg from './components/panelFaceAvg'
import palelFaceDistri from './components/palelFaceDistri'
// 湖心面板
import panelPointAvg from './components/panelPointAvg'
import panelPointPollution from './components/panelPointPollution'
// 流域负荷
import panelInverseInfo from './components/panelInverseInfo'
import panelInverseAvg from './components/panelInverseAvg'
import panelInversePie from './components/panelInversePie'
import panelInverseList from './components/panelInverseList'
// 水质反演的元素面板
import poolBar from './components/poolBar'
import sectionBar from './components/sectionBar'
import placeBar from './components/placeBar'

export default {
  components: {
    panelLake,
    panelAvg,
    panelWaterLevel,
    panelPollution,
    panelPointAvg,
    panelPointPollution,
    poolBar,
    placeBar,
    panelFaceAvg,
    palelFaceDistri,
    sectionBar,
    panelInverseInfo,
    panelInverseAvg,
    panelInversePie,
    panelInverseList
  },
  computed: {
    ...mapGetters([
      'waterQualityLakeSite', 'lake', 'lakeActive', 'lakePrevActive', 'showMenu', 'waterQualityPoll', 'waterQualityYear',
      'waterQualitySection', 'waterQualityActiveLayer', 'waterQualityActiveDirection'
    ])
  },
  data () {
    return {
      lakeIndex: {
        'fxh': '1',
        'xyh': '2',
        'qlh': '3'
      },
      poolIndex: {
        'tp': '4',
        'tn': '3',
        'ten': '1',
        'cod': '5',
        'chla': '2'
      },
      sectionIndex: {
        standard: '1',
        verticalityx: '2',
        verticalityy: '3'
      },
      direcIndex: {
        'aa': '1',
        'bb': '2',
        'cc': '3',
        'dd': '1',
        'ee': '2'
      }
    }
  },
  methods: {
    ...mapMutations([
      'set_lakeActive', 'set_showMenu', 'set_waterQualityLakeSite'
    ]),
    lakeLifting (lake, type) {
      const objData = {
        'actionname': 'PlayRiverAnimation', // 湖体升降
        'RiverAnimation_Index': lake, // 0：三湖； 1：抚仙湖 ； 2：星云湖 3：杞麓湖
        'RiverAnimation_UpDown': type// 0升起 1复位
      }
      this.$parent.renderer.SuperAPI('specialChannel', objData)
    },
    lakePollution (lake, type, year) {
      const objData = {
        'actionname': 'InverseDataByTime', // 反演查询
        'StartTime': year + '0101', // 20200214
        'EndTime': year + '0131', // 20200214s
        'LakeIndex': lake, // 1~3||1：抚仙湖 ； 2：星云湖 ；3：杞麓湖 ；
        'DataTypeIndex': type // 1~5; 1:TEM ;2:CHLa ；3:TN ; 4:TP ; 5:COD
      }
      this.$parent.renderer.SuperAPI('specialChannel', objData)
    },
    lakeChop (lake, type, layer) {
      const objData = {
        'actionname': 'CutRiver', // 切湖（湖升起后切割）
        'LakeIndex': lake, // 1~3 || 1：抚仙湖 ； 2：星云湖 ；3：杞麓湖 ；
        'CutmodeIndex': type, // 0~3 || 0:复原；1：横切面 ； 2：横断面 ；3：纵断面 ；
        'LayerIndex': layer // 1~20
      }
      this.$parent.renderer.SuperAPI('specialChannel', objData)
    },
    exitMain () {
      // 隐藏面板
      this.set_showMenu(true)
      if (this.lakeActive) {
        this.lakeLifting(this.lakeIndex[this.lake], '1')
      }
      this.$parent.$refs.lake.isShowHuPoArea = false
      this.set_lakeActive(false)
    }
  },
  mounted () {
    // 隐藏面板
    this.set_showMenu(false)

    this.$parent.$refs.lake.isShowHuPoArea = true
    this.set_lakeActive(true)
  },
  watch: {
    waterQualitySection (value) {
      // 判断是横切面还是横纵断面
      if (value === 'standard') {
        this.lakeActive && this.lakeChop(this.lakeIndex[this.lake], 1, 1)
      } else if (value === 'verticalityx') {
        this.lakeActive && this.lakeChop(this.lakeIndex[this.lake], 2, 1)
      } else if (value === 'verticalityy') {
        this.lakeActive && this.lakeChop(this.lakeIndex[this.lake], 3, 1)
      }
    },
    waterQualityActiveLayer () {
      this.lakeActive && this.lakeChop(this.lakeIndex[this.lake], 1, this.waterQualityActiveLayer)
    },
    waterQualityActiveDirection () {
      this.lakeActive && this.lakeChop(this.lakeIndex[this.lake], this.sectionIndex[this.waterQualitySection], this.direcIndex[this.waterQualityActiveDirection])
    },

    waterQualityLakeSite (value) {
      // 切换湖体类型后，重置湖体切面回整个湖体
      if (value === 'lakeFace') {
        this.lakeActive && this.lakeChop(this.lakeIndex[this.lake], 1, 1)
      } else {
        this.lakeActive && this.lakeChop(this.lakeIndex[this.lake], 0, 0)
      }
    },
    waterQualityPoll () {
      // 只有湖体升起来的时候，才加载污染因子
      this.lakeActive && this.lakePollution(this.lakeIndex[this.lake], this.poolIndex[this.waterQualityPoll], this.waterQualityYear)
    },
    waterQualityYear () {
      // 只有湖体升起来的时候，才加载污染因子
      this.lakeActive && this.lakePollution(this.lakeIndex[this.lake], this.poolIndex[this.waterQualityPoll], this.waterQualityYear)
    },
    lake (nevVal, oldVal) {
      // 隐藏面板
      this.set_showMenu(false)

      if (this.lakePrevActive) {
        this.lakeLifting(this.lakeIndex[oldVal], '1')
      }

      // 升湖并加载污染因子
      this.lakeLifting(this.lakeIndex[nevVal], '0')
      this.lakePollution(this.lakeIndex[this.lake], this.poolIndex[this.waterQualityPoll], this.waterQualityYear)

      this.set_waterQualityLakeSite('lakeBody')
      this.$refs.placeBar.lakeSite = 'lakeBody'
      // inverse
    },
    lakeActive (value, prevValue) {
      if (value) {
        // 隐藏面板
        this.set_showMenu(false)

        // 升湖并加载污染因子
        this.lakeLifting(this.lakeIndex[this.lake], '0')
        this.lakePollution(this.lakeIndex[this.lake], this.poolIndex[this.waterQualityPoll], this.waterQualityYear)
      } else {
        this.lakeLifting(this.lakeIndex[this.lake], '1')
      }
    }
  },
  beforeDestroy () {
    if (this.lakeActive) {
      this.lakeLifting(this.lakeIndex[this.lake], '1')
    }
  }
}
</script>

<style lang="less" scoped>
.exit-btn {
  position: absolute;
  top: 150px;
  right: 800px;
  z-index: 200;
  cursor: pointer;
  .btn {
    display: inline-block;
    width: 80px;
    height: 80px;
    background: url('../../assets/icons/exit.png') center center no-repeat;
    background-size: 100% 100%;
  }
  .text {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 36px;
    color: #fff;
  }
}
</style>
