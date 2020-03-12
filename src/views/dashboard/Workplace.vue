<template>
  <div class="bigscreen-container">
    <bt-cloudvr
      id="player"
      :render="doRender"
      ref="player"
      @cvr-loaded="getCloudRenderer"
      @on-poi-click="showPopout"
      @on-poi-position="detectPOIPosition"
    ></bt-cloudvr>
    <div class="bigscreen-container-wapper">
      <div class="bigscreen-header">
        <div class="bigscreen-header-left">{{ currentTime }}</div>
        <div @click="chickLight" class="bigscreen-header-info">
          <span :style="{transform: `rotate(${lightConf.deg}deg)`}" class="icon"></span>
          <span class="title">{{ lightConf.title }}</span>
        </div>
        <div class="bigscreen-header-center"></div>
        <div class="bigscreen-header-right">
          <img :src="tqImg" class="item">
          <span class="item">大雨</span>
          <span class="item">17~28℃</span>
          <span class="item">东南风3级</span>
        </div>
      </div>
      <div class="bigscreen-content">
        <div class="bigscreen-content_dt_optearea" v-show="activeMenu !== 6">
          <!-- 左侧三湖切换 -->
          <div v-for="(item, index) in hupoData" :key="index" class="item" :class="{'active':activeHuPo === item.lake.code}" @click="handleChangeHuPo(item.lake.code)">
            <div class="header">
              <div class="title">{{ item.lake.name }}</div>
              <div class="sz-desc">
                <span style="margin-right:10px">水质</span>
                <img :src="getLevelImg(item.waterQuality.level)"/>
              </div>
            </div>
            <div class="clearFloat content">蓄水量/水位:{{ item.level.value }}万m³/{{ item.amount.value }}m</div>
          </div>
        </div>
        <!-- <div class="content_left_wapper">
        </div> -->
        <!-- 综合首页 -->
        <div v-show="activeMenu === 1 || activeMenu === 6" class="content_left_1 content_left">
          <div class="sj_title_right">河道监测</div>
          <div class="table-header">
            <div class="header-item">检测站点</div>
            <div class="header-item">水位值</div>
            <div class="header-item">入湖水量</div>
            <div class="header-item">水质类别</div>
          </div>
          <div class="table-row" v-for="(item,key) in riverVonitor" :key="key" :class="[key%2===0 ?'even-row' : '' ]">
            <div class="table-col">{{ item.riverName }}</div>
            <div class="table-col">{{ item.level.value }}</div>
            <div class="table-col">{{ item.inAmount.value }}</div>
            <div class="table-col">{{ item.quality.ln }}</div>
          </div>
        </div>
        <div v-show="activeMenu === 1 || activeMenu === 6" class="content_left_2 content_left">
          <div class="sj_title_right">实时监控</div>
          <div class="video" >
            <video id="realVideo" controls="controls" autoplay></video>
          </div>
        </div>
        <div v-show="activeMenu === 1 || activeMenu === 6" class="content_left_3 content_left">
          <div class="sj_title_right">案情监管</div>
          <div class="table-header">
            <div class="header-item">告警对象</div>
            <div class="header-item">告警类型</div>
            <div class="header-item">告警状态</div>
            <div class="header-item">处理状况</div>
            <div class="header-item">处理</div>
          </div>
          <div class="table-row" :class="[key%2===0 ?'even-row' : '' ]" v-for="(item,key) in CaseSupervision" :key="key">
            <div class="table-col">{{ item.objName }}</div>
            <div class="table-col">{{ item.objType }}</div>
            <div class="table-col">{{ item.levelName }}</div>
            <div class="table-col">{{ item.stateName }}</div>
            <div class="table-col">
              <span class="uav-icon" @click="toggleDealModal"></span>
              <span class="artificial-icon" @click="pepleModal"></span>
            </div>
          </div>
        </div>

        <div v-show="activeMenu === 1" class="legend-area">
          <ul>
            <li class="item" v-for="(item,index) in legendArray" :key="index" @click="changeLegend(item)" :class="{'active':item.active==true}">
              <img :src="item.img"><span>{{ item.name }}</span>
            </li>
          </ul>
        </div>

        <div v-show="activeMenu === 1&&showDealModal===true" class="deal-modal">
          <div class="header">
            <span class="title">无人机监测画面</span>
            <span style="float: right;margin-right:50px">无人机编号:0001</span>
            <img src="../../assets/icons/dal_close.png" class="deal-modal-close" @click="hideDealModal">
          </div>
          <div class="video">
            <video style="width:100%;height:90%;" controls="controls" :src="videoSrc" autoplay></video>
          </div>
          <div class="control">
            <div class="control-item">
              <span class="icon-camera"></span><br />
              <span>执法取证</span>
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
        <!-- <div class="content_right_wapper">

        </div> -->
        <div class="content_right_1 content_right" v-show="activeMenu === 1 || activeMenu === 6">
          <div class="sj_title_right">水质监测</div>
          <sj-ChartRadar id="sj-ChartRadar" :width="'620px'" :height="'390px'" :doRender="doRender" style="margin-top:10px"></sj-ChartRadar>
        </div>
        <div class="content_right_2 content_right" v-show="activeMenu === 1 || activeMenu === 6">
          <div class="sj_title_right">雨量监测</div>
          <sj-ChartParticular id="sj-ChartParticular" :width="'620px'" :height="'390px'" :doRender="doRender"></sj-ChartParticular>
        </div>
        <div class="content_right_3 content_right" v-show="activeMenu === 1 || activeMenu === 6">
          <div class="sj_title_right">取水监管</div>
          <div>
            <ul style="margin-top:80px">
              <li class="sj_Halo">
                <sj-ChartHalo-one id="sj-ChartHalo-one" :width="'200px'" :height="'200px'" :doRender="doRender"></sj-ChartHalo-one>
                <div class="sj_Halo_title">
                  <p>计划:100万吨</p>
                  <p>已取水:40万吨</p>
                </div>
              </li>
              <li class="sj_Halo">
                <sj-ChartHalo-two id="sj-ChartHalo-two" :width="'200px'" :height="'200px'" :doRender="doRender" ></sj-ChartHalo-two>
                <div class="sj_Halo_title">
                  <p>计划:33万吨</p>
                  <p>已取水:10万吨</p>
                </div>
              </li>
              <li class="sj_Halo">
                <sj-ChartHalo-three id="sj-ChartHalo-three" :width="'200px'" :height="'200px'" :doRender="doRender"></sj-ChartHalo-three>
                <div class="sj_Halo_title">
                  <p>计划:33万吨</p>
                  <p>已取水:12万吨</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 湖体反演 -->
        <div v-show="activeMenu === 2" class="content_left_1 content_left">
          <div class="sj_title_right">点位污染因子时序</div>
          <ht-point-line id="ht-point-line" :width="'620px'" :height="'390px'" :doRender="doRender"></ht-point-line>
        </div>
        <div v-show="activeMenu === 2" class="content_left_2 content_left">
          <div class="sj_title_right">河流影响程度排名</div>
          <ht-river-range id="ht-river-range" :width="'620px'" :height="'390px'" :doRender="doRender"></ht-river-range>
        </div>
        <div v-show="activeMenu === 2" class="content_left_3 content_left">
          <div class="sj_title_right">入湖总量时序</div>
          <ht-total-line id="ht-total-line" :width="'620px'" :height="'390px'" :doRender="doRender"></ht-total-line>
        </div>
        <div v-show="activeMenu === 2" class="content_left_1 content-right-2-item">
          <div class="sj_title_right" style="margin-top: 80px;">污染因子时序图</div>
          <ht-right-line id="ht-right-line" :width="'620px'" :height="'500px'" :doRender="doRender" style="margin-top: 80px;"></ht-right-line>
        </div>
        <div v-show="activeMenu === 2" class="content-right-2-2 content-right-2-item">
          <div class="sj_title_right" style="margin-top: 80px;">污染因子水质类别分布图</div>
          <ht-right-chart id="ht-right-chart" :width="'620px'" :height="'500px'" :doRender="doRender" style="margin-top: 40px;"></ht-right-chart>
        </div>
        <div v-show="activeMenu === 2 && !showMain" class="pollution-wrap">
          <div v-for="(item, index) in pollutionType" :key="index" :class="{'active': pollutionActive === index}" class="pollution-item" @click="handlePollution(index)">{{ item.name }}</div>
        </div>
        <div v-show="activeMenu === 2 && !showMain" class="pollution-time-wrap">
          <div class="type">
            <img :src="pollutionImg" alt="">
            <WSelect @input="handlePollutionType" :list="['水平切分', '垂直切分']" value="水平切分"></WSelect>
          </div>
          <div class="time-wrap">
            <div class="operation-btn"></div>
            <div class="time">
              <input type="range" :min="timeConfig.min" :max="timeConfig.max" v-model="timeConfig.value" class="range-time">
              <div class="data">
                <div class="data-item">2016-01-01</div>
                <div class="data-item">2016-03-01</div>
                <div class="data-item">2016-05-01</div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="activeMenu === 2 && !showMain" @click="exitMain" class="exit-btn">
          <span class="btn"></span>
          <div class="text">退出</div>
        </div>
        <!-- 底部导航切换 -->
        <div class="content_opte" v-show="showMain">
          <ul>
            <li class="item" @click="changeMenu(1)">
              <img :src="shoyetp" class="img"/>
              <p class="title" :class="{'active':activeMenu==1}">综 合 首 页</p>
              <img src="../../assets/icons/select_line.png" class="select_line" :class="{'no_show':activeMenu!=1}">
            </li>
            <li class="item" @click="changeMenu(2)">
              <img :src="huititp" class="img" />
              <p class="title" :class="{'active':activeMenu==2}">智 能 决 策</p>
              <img src="../../assets/icons/select_line.png" class="select_line" :class="{'no_show':activeMenu!=2}">
            </li>
            <li class="item">
              <img src="../../assets/icons/jc.png" class="img"/>
              <p class="title">辅 助 决 策</p>
              <img src="../../assets/icons/select_line.png" class="select_line no_show">
            </li>
            <li class="item">
              <img src="../../assets/icons/szy.png" class="img"/>
              <p class="title">水 资 源</p>
              <img src="../../assets/icons/select_line.png" class="select_line no_show">
            </li>
            <li class="item">
              <img src="../../assets/icons/zf.png" class="img"/>
              <p class="title">智 能 执 法</p>
              <img src="../../assets/icons/select_line.png" class="select_line no_show">
            </li>
            <li class="item" @click="changeMenu(6)">
              <img src="../../assets/icons/fj.png" class="img"/>
              <p class="title" :class="{'active':activeMenu==6}">漫 游</p>
              <img src="../../assets/icons/select_line.png" class="select_line no_show" :class="{'no_show':activeMenu!=6}">
            </li>
          </ul>
        </div>
        <audio :src="bgm" id="bgmtrack"></audio>
        <component
          @visible="popupVisable"
          :visible="visible"
          :left="screenResolution.left"
          :top="screenResolution.top"
          :code="stationCode"
          :is="who"></component>
      </div>
    </div>
  </div>
</template>

<script>
import CloudVR from '@/components/CloudVR'
import tqImg from '@/assets/icons/tq.png'
import shoyeImg from '@/assets/icons/dq.png'
import shoyeActiveImg from '@/assets/icons/dq_a.png'
import hutiImg from '@/assets/icons/szfy.png'
import hutiActiveImg from '@/assets/icons/szfy_a.png'
import ChartRadar from '@/components/chartMain/ChartRadar'
import ChartParticular from '@/components/chartMain/ChartParticular'
import ChartHaloOn from '@/components/chartMain/ChartHalo_1'
import ChartHaloTwo from '@/components/chartMain/ChartHalo_2'
import ChartHaloThree from '@/components/chartMain/ChartHalo_3'
import ChartLineDualAxisRight from '@/components/chartMainTwo/ChartLineDualAxis_Right'
import ChartLineDualAxis from '@/components/chartMainTwo/ChartLineDualAxis'
import ChartLineSingleAxis from '@/components/chartMainTwo/ChartLineSingleAxis'
import ChartPieRight from '@/components/chartMainTwo/ChartPie_Right'
import ChartPie from '@/components/chartMainTwo/ChartPie'
import chartOne from '@/components/chartModal/chartOne'
import chartTwo from '@/components/chartModal/chartTwo'
import chartThree from '@/components/chartModal/chartThree'
import chartFour from '@/components/chartModal/chartFour'
import chartFive from '@/components/chartModal/chartFive'
import chartSix from '@/components/chartModal/chartSix'
import chartSeven from '@/components/chartModal/chartSeven'
import chartEight from '@/components/chartModal/chartEight'
import WSelect from '@/components/tools/WSelect'
import _ from 'lodash'
import * as homeApi from '@/api/home'

const legendBaseImgPath = '/3d/img/'

const bgmSrc = require('../../assets/bgm.mp3')
export default {
  name: 'Workplace',
  components: {
    'bt-cloudvr': CloudVR,
    'sj-ChartRadar': ChartRadar,
    'sj-ChartParticular': ChartParticular,
    'sj-ChartHalo-one': ChartHaloOn,
    'sj-ChartHalo-two': ChartHaloTwo,
    'sj-ChartHalo-three': ChartHaloThree,
    'ht-point-line': ChartLineDualAxis,
    'ht-river-range': ChartPie,
    'ht-total-line': ChartLineSingleAxis,
    'ht-right-line': ChartLineDualAxisRight,
    'ht-right-chart': ChartPieRight,
    chartOne,
    chartTwo,
    chartThree,
    chartFour,
    chartFive,
    chartSix,
    chartSeven,
    chartEight,
    WSelect
  },
  data () {
    return {
      CaseSupervision: [], // 案情监管数据
      riverVonitor: [], // 入湖河道检测数据
      stationCode: '',
      showMain: true,
      who: '',
      tqImg,
      doRender: false,
      currentTime: '',
      activeMenu: 1,
      shoyetp: shoyeActiveImg,
      huititp: hutiImg,
      activeHuPo: 'fxh',
      isShowHuPoArea: false,
      showDealModal: false,
      bgm: bgmSrc,
      legendArray: [],
      allStation: [],
      hupoData: [],
      pollutionType: [
        { name: '总磷' }, { name: '化学需氧量' }, { name: '总氮' }, { name: '叶绿素α' }, { name: '温度' }
      ],
      legendhash: {
        wrj: 'poi_uav',
        ssjk: 'camera',
        szz: 'poi_site_water_quality',
        qxz: 'poi_site_meteorological',
        swz: 'poi_site_water_leve',
        dxsswz: 'poi_site_water_ground',
        ylz: 'poi_site_rain',
        swzz: 'poi_site_water_hydrological',
        zfr: 'poi_executor'
      },
      chartHash: {
        'poi_uav': 'chartSix',
        'poi_camera': 'chartSeven',
        'poi_site_water_quality': 'chartFour',
        'poi_site_meteorological': 'chartThree',
        'poi_site_water_leve': 'chartOne',
        'poi_site_water_ground': 'chartFive',
        'poi_site_rain': 'chartTwo',
        'poi_site_water_hydrological': 'chartEight',
        'poi_executor': ''
      },
      renderer: null,
      screenResolution: {
        width: 4896,
        height: 1632,
        offsetWidth: 120,
        offsetHeight: 180,
        left: 0,
        top: 0
      },
      visible: false,
      lightConf: {
        title: '早晨',
        deg: 0,
        lightIndex: 1
      },
      hutiActive: false,
      hutiType: '1',
      maiyouFlag: false,
      uavFlag: false,
      peopleFlag: false,
      pollutionActive: 0,
      timeConfig: {
        min: 0,
        max: 100,
        value: 40
      },
      pollutionImg: require('../../assets/icons/standard.png'),
      videoSrc: ''
    }
  },
  created () {
    this.init()
    this.videoSrc = localStorage.getItem('videoSrc')
    this.caseRegulatory()
    this.riverMonitorings()
    this.waterQuality()
    this.stationDatas()
  },
  mounted () {
    this.doRender = true
    this.playVideo('realVideo', 'http://hls01open.ys7.com/openlive/1468c3bbdcdb45f780fad2fb7fb31200.hd.m3u8')
    document.getElementById('bgmtrack').load()
  },
  methods: {
    // 案情监管
    caseRegulatory () {
      homeApi.caseRegulatory().then(res => {
        this.CaseSupervision = res
      })
    },
    // 河道监测
    riverMonitorings () {
      homeApi.riverMonitorings().then(res => {
        this.riverVonitor = res
      })
    },
    // 湖泊水质信息
    waterQuality () {
      homeApi.waterQuality().then(res => {
        this.hupoData = res
      })
    },
    // 获取所有的站点信息
    stationDatas () {
      const legendArray = []
      const allStation = []
      homeApi.stationDatas().then(res => {
        res.forEach(item => {
          const param = {
            key: item.values[0].objectType,
            name: item.title,
            active: false,
            img: `${legendBaseImgPath}${item.values[0].objectType}.png`
          }
          item.values.forEach(ele => {
            const stationParam = {
              Id: ele.code,
              Address: ele.address,
              Type_Name: ele.name,
              Type: ele.objectType ? ele.objectType : 'camera',
              object_coord: ele.coord
            }
            allStation.push(stationParam)
          })
          legendArray.push(param)
        })
        this.legendArray = legendArray
        this.allStation = allStation
      })
    },
    getLevelImg (level) {
      let data = ''
      if (level === 1) {
        data = require('../../assets/icons/icon1.png')
      } else if (level === 2) {
        data = require('../../assets/icons/icon11.png')
      }
      return data
    },
    handlePollutionType (data) {
      if (data === '水平切分') {
        this.pollutionImg = require('../../assets/icons/standard.png')
      } else if (data === '垂直切分') {
        this.pollutionImg = require('../../assets/icons/vertical.png')
      }
    },
    handleChangeHuPo (code) {
      // 控制湖泊的虚拟边界
      if (this.activeHuPo === code) {
        this.isShowHuPoArea = !this.isShowHuPoArea
      } else {
        this.isShowHuPoArea = true
      }
      if (code === 'fxh') {
        this.$refs.player.lakeswitch('fx', this.isShowHuPoArea)
        this.hutiType = '1'
      } else if (code === 'xyh') {
        this.$refs.player.lakeswitch('xy', this.isShowHuPoArea)
        this.hutiType = '2'
      } else if (code === 'qlh') {
        this.$refs.player.lakeswitch('ql', this.isShowHuPoArea)
        this.hutiType = '3'
      }
      // 控制湖体的升降
      if (this.activeMenu === 2) {
        // 先判断上一个湖体和当前点击的是否为同一个
        if (this.activeHuPo === code) {
          this.hutiActive = !this.hutiActive
          if (this.hutiActive) {
            const objData = { 'actionname': 'PlayRiverAnimation', // 湖体升降
              'RiverAnimation_Index': this.hutiType, // 0：三湖； 1：抚仙湖 ； 2：星云湖 3：杞麓湖
              'RiverAnimation_UpDown': '0'// 0升起 1复位
            }
            this.renderer.SuperAPI('specialChannel', objData)
            this.showMain = false
          } else {
            const objData = { 'actionname': 'PlayRiverAnimation', // 湖体升降
              'RiverAnimation_Index': this.hutiType, // 0：三湖； 1：抚仙湖 ； 2：星云湖 3：杞麓湖
              'RiverAnimation_UpDown': '1'// 0升起 1复位
            }
            this.renderer.SuperAPI('specialChannel', objData)
            this.showMain = true
          }
        } else {
          const obj = { fxh: '1', xyh: '2', qlh: '3' }
          const objData = { 'actionname': 'PlayRiverAnimation', // 湖体升降
            'RiverAnimation_Index': obj[this.activeHuPo], // 0：三湖； 1：抚仙湖 ； 2：星云湖 3：杞麓湖
            'RiverAnimation_UpDown': '1'// 0升起 1复位
          }
          this.renderer.SuperAPI('specialChannel', objData)
          const objData1 = { 'actionname': 'PlayRiverAnimation', // 湖体升降
            'RiverAnimation_Index': obj[code], // 0：三湖； 1：抚仙湖 ； 2：星云湖 3：杞麓湖
            'RiverAnimation_UpDown': '0'// 0升起 1复位
          }
          this.renderer.SuperAPI('specialChannel', objData1)
          this.hutiActive = true
          this.showMain = false
        }
      }
      this.activeHuPo = code
    },
    exitMain () {
      this.showMain = true
      const obj = { fxh: '1', xyh: '2', qlh: '3' }
      if (this.hutiActive) {
        const objData = { 'actionname': 'PlayRiverAnimation', // 湖体升降
          'RiverAnimation_Index': obj[this.activeHuPo], // 0：三湖； 1：抚仙湖 ； 2：星云湖 3：杞麓湖
          'RiverAnimation_UpDown': '1'// 0升起 1复位
        }
        this.renderer.SuperAPI('specialChannel', objData)
      }
      this.hutiActive = false
    },
    init () {
      this.currentTime = (new Date()).format('yyyy-MM-dd hh:mm:ss')
      this.changTime()
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
        this.renderer.SuperAPI('SetEnvTime', '8:00')
      } else if (this.lightConf.lightIndex === 2) {
        this.lightConf.title = '中午'
        this.lightConf.deg = 90
        this.renderer.SuperAPI('SetEnvTime', '14:00')
      } else if (this.lightConf.lightIndex === 3) {
        this.lightConf.title = '傍晚'
        this.lightConf.deg = 180
        this.renderer.SuperAPI('SetEnvTime', '17:30')
      } else if (this.lightConf.lightIndex === 4) {
        this.lightConf.title = '晚上'
        this.lightConf.deg = 270
        this.renderer.SuperAPI('SetEnvTime', '23:00')
      }
    },
    getCloudRenderer (msg) {
      this.renderer = msg
      this.renderer.SuperAPI('SetEnvTime', '08:00')
    },
    popupVisable (data) {
      this.visible = data
    },
    showPopout (msg) {
      const objId = msg
      // const type = (poiAll.filter(item => item.Id === objId))[0].Type
      const type = (this.allStation.filter(item => item.Id === objId))[0].Type
      const chartType = this.chartHash[type]
      this.who = chartType
      this.stationCode = msg
      this.visible = true
      this.renderer.SuperAPI('GetPOIScreenRange', objId)
    },
    detectPOIPosition (msg) {
      var LeftUp = msg.leftup
      const left = parseFloat(LeftUp.split(',')[0]) * this.screenResolution.width
      const top = parseFloat(LeftUp.split(',')[1]) * this.screenResolution.height
      this.screenResolution.left = left + this.screenResolution.offsetWidth
      this.screenResolution.top = top + this.screenResolution.offsetHeight
    },
    changeMenu (menu) {
      this.activeMenu = menu
      if (this.activeMenu === 1) {
        this.shoyetp = shoyeActiveImg
        this.huititp = hutiImg
      } else if (this.activeMenu === 2) {
        this.shoyetp = shoyeImg
        this.huititp = hutiActiveImg
        this.showMain = false
      } else if (this.activeMenu === 6) {
        this.shoyetp = shoyeImg
        this.huititp = hutiImg
      }
      // 控制漫游
      if (this.activeMenu === 6) {
        this.$refs.player.lakeswitch('fx', true)
        this.maiyouFlag = !this.maiyouFlag
        if (this.maiyouFlag) {
          const objData = {
            'actionname': 'PlaySequence_YNSH', // 自动漫游动画
            'PlayAnimation': '0' // 0：播放 ； 1：停止播放
          }
          this.renderer.SuperAPI('specialChannel', objData)
          document.getElementById('streamingVideo').muted = true
          document.getElementById('bgmtrack').play()
        } else {
          const objData = {
            'actionname': 'PlaySequence_YNSH', // 自动漫游动画
            'PlayAnimation': '1' // 0：播放 ； 1：停止播放
          }
          this.renderer.SuperAPI('specialChannel', objData)
          document.getElementById('bgmtrack').pause()
        }
      }
      if (this.activeMenu !== 6) {
        this.maiyouFlag = false
        const objData = {
          'actionname': 'PlaySequence_YNSH', // 自动漫游动画
          'PlayAnimation': '1' // 0：播放 ； 1：停止播放
        }
        this.renderer.SuperAPI('specialChannel', objData)
        document.getElementById('bgmtrack').pause()
      }
      // 控制升降
      if (this.activeMenu === 2) {
        this.hutiActive = true
        this.activeHuPo = 'fxh'
        this.$refs.player.lakeswitch('fx', this.isShowHuPoArea)
        this.hutiType = '1'
        if (this.hutiActive) {
          const objData = { 'actionname': 'PlayRiverAnimation', // 湖体升降
            'RiverAnimation_Index': this.hutiType, // 0：三湖； 1：抚仙湖 ； 2：星云湖 3：杞麓湖
            'RiverAnimation_UpDown': '0'// 0升起 1复位
          }
          this.renderer.SuperAPI('specialChannel', objData)
        }
      }
      if (this.activeMenu !== 2) {
        this.hutiActive = false
        const objData = { 'actionname': 'PlayRiverAnimation', // 湖体升降
          'RiverAnimation_Index': this.hutiType, // 0：三湖； 1：抚仙湖 ； 2：星云湖 3：杞麓湖
          'RiverAnimation_UpDown': '1'// 0升起 1复位
        }
        this.renderer.SuperAPI('specialChannel', objData)
      }
    },
    handlePollution (index) {
      this.pollutionActive = index
    },
    toggleDealModal () {
      this.showDealModal = true
      this.$refs.player.loadUAVAction()
      this.uavFlag = !this.uavFlag
      if (!this.uavFlag) {
        this.$refs.player.clearAllElement()
        this.renderer.SuperAPI('SetEnvTime', '8:00')
      }
    },
    hideDealModal () {
      this.showDealModal = false
      this.uavFlag = false
      this.$refs.player.clearAllElement()
      this.renderer.SuperAPI('SetEnvTime', '8:00')
    },
    pepleModal () {
      this.$refs.player.loadStaffAction()
      this.peopleFlag = !this.peopleFlag
      if (!this.peopleFlag) {
        this.$refs.player.clearAllElement()
        this.renderer.SuperAPI('SetEnvTime', '8:00')
      }
    },
    changeHuPo (hupo) {
      if (this.activeHuPo === hupo) {
        this.isShowHuPoArea = !this.isShowHuPoArea
      } else {
        this.isShowHuPoArea = true
      }
      this.activeHuPo = hupo
      if (hupo === 1) {
        this.$refs.player.lakeswitch('fx', this.isShowHuPoArea)
        this.hutiType = '1'
      } else if (hupo === 2) {
        this.$refs.player.lakeswitch('xy', this.isShowHuPoArea)
        this.hutiType = '2'
      } else if (hupo === 3) {
        this.$refs.player.lakeswitch('ql', this.isShowHuPoArea)
        this.hutiType = '3'
      }
    },
    changTime () {
      setInterval(() => {
        this.currentTime = (new Date()).format('yyyy-MM-dd hh:mm:ss')
      }, 1000)
    },
    changeLegend (item) {
      const legend = this.legendArray.find(p => p.key === item.key)
      legend.active = !legend.active
      if (legend.active) {
        legend.img = legendBaseImgPath + legend.key + '_a.png'
      } else {
        legend.img = legendBaseImgPath + legend.key + '.png'
      }
      const keyArray = _.filter(this.legendArray, { active: true })
      this.showSpecPOI(keyArray)
    },
    showSpecPOI (types) {
      // this.clearAllElement();
      // var hashIndex = null
      // var node = []; var specsChecked = []
      // types.forEach(o => {
      //   hashIndex = this.legendhash[o.key]
      //   node = node.concat(_.filter(poiAllList, { Type: hashIndex }))
      //   specsChecked.push(...node)
      // })
      // this.renderer.SuperAPI('RemoveAllPOI')
      // specsChecked.map(o => {
      //   node = {
      //     object_id: o.Id,
      //     object_name: o.Address + '/' + o.Type_Name,
      //     object_floor: '1',
      //     object_type: o.Type,
      //     coord_type: '0',
      //     object_coord: o.Lng + ', ' + o.Lat,
      //     coord_z: '2000',
      //     showtitle: 'true',
      //     showtitlerange: '0,30000',
      //     monitormouseoverlap: 'true'
      //   }
      //   this.renderer.SuperAPI('AddPOI', node)
      // })
      var hashIndex = null
      var node = []; var specsChecked = []
      types.forEach(o => {
        hashIndex = o.key
        node = node.concat(_.filter(this.allStation, { Type: hashIndex }))
        specsChecked.push(...node)
      })
      this.renderer.SuperAPI('RemoveAllPOI')
      specsChecked.map(o => {
        node = {
          object_id: o.Id,
          object_name: o.Address + '/' + o.Type_Name,
          object_floor: '1',
          object_type: o.Type,
          coord_type: '0',
          object_coord: o.object_coord,
          coord_z: '1500',
          showtitle: 'true',
          showtitlerange: '0,30000',
          monitormouseoverlap: 'true'
        }
        this.renderer.SuperAPI('AddPOI', node)
      })
    },
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
    }
  }
}
</script>

<style lang="less" scoped>
.no_show {
  display:none;
}
.clearFloat {
  clear: both;
}

.bigscreen-container {
  height: 100%;
  width: 100%;
  position: relative;
}

.bigscreen-container-wapper {
  z-index: 120;
  position: relative;
}

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

.bigscreen-content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 120;
  .bigscreen-content_dt_optearea {
    position: absolute;
    left: 747px;
    top: 181px;
    width: 320px;
    z-index: 120;
    .item {
      z-index: 120;
      height:  126px;
      cursor: pointer;
      background-image: url('../../assets/icons/btn_bg.png');
      background-size: cover;
      background-repeat: no-repeat;
      margin-bottom: 20px;
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
  .content_left_wapper {
    background-image: url('../../assets/icons/bk_left.png');
    background-repeat: no-repeat;
    width: 1325.9px;
    height: 1632px;
    position: absolute;
    pointer-events: auto;
    left: 0px;
    top: -10px;
    z-index: 101;
  }
  .content_left {
    background-image: url('../../assets/icons/group.png') ;
    background-repeat: no-repeat;
    width: 680px;
    height: 510px;
    position: absolute;
    pointer-events: auto;
    left: 29px;
    z-index: 120;
  }
  .content_left_1 {
    top: 110px;
  }

  .content_left_2 {
    top: 610px;
    .video {
      margin: 30px 40px 0 40px;
      height: 330px;
      video {
        height: 100%;
        width: 100%;
      }
    }
  }

  .content_left_3 {
    top: 1100px;
  }
  .deal-modal {
    position: absolute;
    top: 1031px;
    left: 720px;
    height: 550px;
    width: 900px;
    background: url('../../assets/icons/deal.png') center center no-repeat;
    background-size: 100% 100%;
    z-index: 200;
    .header {
      position: relative;
      margin-top: 56px;
      margin-left: 40px;
      margin-right: 40px;
      font-size: 18px;
      height: 50px;
      line-height: 22px;
      color: #fff;
      .title {
        color:#0cd3ff;
      }
      .deal-modal-close {
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
      background: #fff;
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

  .legend-area {
    position: fixed;
    left: 3865px;
    // top: 765px;
    bottom: 60px;
    background-color: #031128;
    width: 311px;
    // height: 808px;
    opacity: 0.8;
    padding: 20px 20px;
    z-index: 200;
    .item {
      list-style: none;
      font-family: "Microsoft Yahei";
      font-size: 26px;
      color: rgb(230, 247, 255);
      margin-top: 40px;
      img {
        width: 40px;
        height: 40px;
        display: inline-block;
        margin-right: 20px;
      }
    }
    .item.active {
      color:#0cd3ff;
    }
  }

  .content_right_wapper {
    background-image: url('../../assets/icons/bk_right.png');
    background-repeat: no-repeat;
    width: 1327px;
    height: 1632px;
    position: absolute;
    pointer-events: auto;
    left: 3567px;
    top: -10px;
    z-index: 101;
  }
  .content_right {
    background-image: url('../../assets/icons/group.png');
    background-repeat: no-repeat;
    width: 680px;
    height: 510px;
    position: absolute;
    pointer-events: auto;
    left: 4192px;
    z-index: 120;
  }
  .sj_title_right {
    font-size: 27px;
    font-weight: normal;
    color: #0cd3ff;
    text-align: left;
    letter-spacing: 0px;
    /* line-height: 106px; */
    overflow: hidden;
    cursor: pointer;
    pointer-events: auto;
    margin-left: 30px;
    margin-top: 38px;
    z-index: 120;
  }
  .table-header{
    width: 620px;
    height: 58px;
    margin: 20px auto 0 auto;
    line-height: 58px;
    display: flex;
    .header-item{
      flex: 1;
      color: #ccc;
      text-align: center;
      font-size: 21px;
    }
  }
  .even-row {
    border-radius: 5px;
    background: rgba(56, 145, 238, .1);
  }
  .table-row {
    width: 620px;
    height: 58px;
    margin: 0 auto;
    line-height: 58px;
    display: flex;
    .table-col{
      flex: 1;
      color: #ccc;
      text-align: center;
      font-size: 18px;
      .uav-icon {
        display: inline-block;
        margin: 14px 5px 14px 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: url('../../assets/icons/uav.png') center center no-repeat;
      }
      .artificial-icon {
        display: inline-block;
        margin: 14px 5px 14px 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background: url('../../assets/icons/artificial.png') center center no-repeat;
      }
    }
  }

  .content_right_1 {
    top: 110px;
  }
  .content_right_2 {
    top: 610px;
  }
  .content_right_3 {
    top: 1100px;
  }
  .content-right-2-2{
    top: 860px
  }
  .content-right-2-item{
    background-image: url('../../assets/icons/group.png') ;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 680px;
    height: 720px;
    position: absolute;
    pointer-events: auto;
    left: 4192px;
    z-index: 200;
  }

  .pollution-wrap {
    position: absolute;
    top: 170px;
    left: 50%;
    margin-left: -450px;
    .pollution-item {
      width: 180px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: #fff;
      background: url('../../assets/icons/pollution.png') center center no-repeat;
      background-size: 100% 100%;
      font-size: 26px;
      float: left;
      margin-right: 1px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
      &.active{
        background: url('../../assets/icons/pollution_active.png') center center no-repeat;
        background-size: 100% 100%;
        margin-right: 0;
        color: #73EBF8;
      }
    }

  }

  .exit-btn {
    position: absolute;
    top: 150px;
    right: 800px;
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

  .pollution-time-wrap {
    position: absolute;
    top: 1450px;
    left: 30%;
    .type {
      float: left;
      padding: 20px;
      width: 190px;
      height: 140px;
      // background: url('../../assets/icons/time_bg.png') center center no-repeat;
      // background-size: 100% 100%;
      background: rgba(0,0,0,0.2);
      border-radius: 10px;
      margin-right: 30px;
      img {
        display: inline-block;
        width: 150px;
        height: 70px;
      }
      select {
        background: transparent;
        color: #fff;
        border: none;
        outline: none;
        margin-top: 10px;
        appearance: none;
        width: 150px;
        height: 30px;
      }
    }
    .time-wrap {
      float: left;
      width: 1400px;
      height: 140px;
      padding: 20px;
      // background: url('../../assets/icons/time_bg.png') center center no-repeat;
      // background-size: 100% 100%;
      background: rgba(0,0,0,0.2);
      border-radius: 10px;
      .operation-btn {
        float: left;
        width: 60px;
        height: 60px;
        background: url('../../assets/icons/play.png') center center no-repeat;
        background-size: 100% 100%;
        margin-right: 40px;
      }
      .time {
        float: left;
        .range-time {
          -webkit-appearance: none;/*清除系统默认样式*/
          width: 1200px;
          outline: none;
          background: -webkit-linear-gradient(#73EBF8, #73EBF8) no-repeat, #3C5583;/*设置左边颜色为#61bd12，右边颜色为#ddd*/
          background-size: 40% 100%;
          height: 20px;/*横条的高度*/
          border-radius: 10px;
          margin: 20px 0;
          &::-webkit-slider-thumb {
            -webkit-appearance: none;/*清除系统默认样式*/
            width: 80px;
            height: 80px;
            // margin-left: -20px;
            background: url('../../assets/icons/time_point.png') center center no-repeat;
            background-size: 100% 100%;
          }
        }
        .data {
          height: 40px;
          .data-item {
            width: 33.3333%;
            float: left;
            color: #fff;
            font-size: 24px;
          }
        }
      }
    }
  }

  .content_opte {
    position: absolute;
    pointer-events: auto;
    top: 1407px;
    left: 1195px;
    z-index: 120;
    // background-image:  url('../../assets/icons/bk_down.png') ;
    // background-repeat: no-repeat;
    // background-position: center;
    .item {
      text-align: center;
      width: 410px; //410
      float: left;
      list-style: none;
      .img {
        width: 50px;
        height: 50px;
      }
      .title {
        margin-top: 36px;
        font-family: "Microsoft Yahei";
        font-size: 26px;
        color: rgb(230, 247, 255);
      }
      .title.active {
        color: rgb(56, 237, 253);
      }
      .select_line {
        margin-top: -48px;
      }
    }
  }

  .sj_Halo {
    float: left;
    text-align: center;
    .sj_Halo_title {
      font-family: "Microsoft Yahei";
      font-size: 21px;
      color: #9AB1CB;
      p {
        margin-bottom: 2px;
      }
    }
  }
}
</style>
