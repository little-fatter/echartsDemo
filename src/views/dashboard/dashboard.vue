<template>
  <div class="dashboard">
    <div class="content_left_1 content_left">
      <div class="sj_title_right">河道监测</div>
      <div class="table-header">
        <div class="header-item">检测站点</div>
        <div class="header-item">COD</div>
        <div class="header-item">氨氮</div>
        <div class="header-item">总磷</div>
        <div class="header-item">总氮</div>
        <div class="header-item">水质类别</div>
      </div>
      <div class="table-row" v-for="(item,key) in riverVonitor" :key="key" :class="[key%2===0 ?'even-row' : '' ]">
        <div class="table-col">{{ item.Site }}</div>
        <div class="table-col">{{ item.COD }}</div>
        <div class="table-col">{{ item.NH4 }}</div>
        <div class="table-col">{{ item.TP }}</div>
        <div class="table-col">{{ item.TN }}</div>
        <div class="table-col">{{ item.Level }}</div>
      </div>
    </div>

    <div class="content_left_2 content_left">
      <div class="sj_title_right">实时监控</div>
      <div class="video" >
        <video id="realVideo" controls="controls" autoplay></video>
      </div>
    </div>

    <div class="content_left_3 content_left">
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

    <div class="legend-area">
      <ul style="margin:0;padding:0;">
        <div v-for="title in legendArray" :key="title.title">
          <div class="legend-title-wrapper">{{ title.title }}</div>
          <li class="item" v-for="(item,index) in title.data" :key="index" @click="changeLegend(item)" :class="{'active':item.active==true}">
            <img :src="item.img"><span>{{ item.name }}</span>
          </li>
        </div>
      </ul>
    </div>

    <div v-show="showDealModal===true" class="deal-modal">
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

    <div class="content_right_1 content_right">
      <div class="sj_title_right">水质监测</div>
      <sj-ChartRadar id="sj-ChartRadar" :width="'620px'" :height="'390px'" :doRender="doRender" style="margin-top:10px"></sj-ChartRadar>
    </div>
    <div class="content_right_2 content_right">
      <div class="sj_title_right">雨量监测</div>
      <sj-ChartParticular id="sj-ChartParticular" :width="'620px'" :height="'390px'" :doRender="doRender"></sj-ChartParticular>
    </div>
    <div class="content_right_3 content_right">
      <div class="sj_title_right">取水监管</div>
      <div>
        <ul style="margin-top:80px">
          <li class="sj_Halo">
            <sj-ChartHalo-one id="sj-ChartHalo-one" :width="'200px'" :height="'200px'" :doRender="doRender"></sj-ChartHalo-one>
            <div class="sj_Halo_title">
              <p>计划:1394.1吨</p>
              <p>已取水:161.16吨</p>
            </div>
          </li>
          <li class="sj_Halo">
            <sj-ChartHalo-two id="sj-ChartHalo-two" :width="'200px'" :height="'200px'" :doRender="doRender" ></sj-ChartHalo-two>
            <div class="sj_Halo_title">
              <p>计划:51.9吨</p>
              <p>已取水:8.51吨</p>
            </div>
          </li>
          <li class="sj_Halo">
            <sj-ChartHalo-three id="sj-ChartHalo-three" :width="'200px'" :height="'200px'" :doRender="doRender"></sj-ChartHalo-three>
            <div class="sj_Halo_title">
              <p>计划:140.7吨</p>
              <p>已取水:23.41吨</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <component
      @visible="changeVisible"
      :visible="visible"
      :left="screenResolution.left"
      :top="screenResolution.top"
      :code="stationCode"
      :is="who"></component>
  </div>
</template>

<script>
import ChartRadar from '@/components/chartMain/ChartRadar'
import ChartParticular from '@/components/chartMain/ChartParticular'
import ChartHaloOn from '@/components/chartMain/ChartHalo_1'
import ChartHaloTwo from '@/components/chartMain/ChartHalo_2'
import ChartHaloThree from '@/components/chartMain/ChartHalo_3'
import chartOne from '@/components/chartModal/chartOne'
import chartTwo from '@/components/chartModal/chartTwo'
import chartThree from '@/components/chartModal/chartThree'
import chartFour from '@/components/chartModal/chartFour'
import chartFive from '@/components/chartModal/chartFive'
import chartSix from '@/components/chartModal/chartSix'
import chartSeven from '@/components/chartModal/chartSeven'
import chartEight from '@/components/chartModal/chartEight'

import * as homeApi from '@/api/home'
import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'
const legendBaseImgPath = '/3d/img/'

export default {
  components: {
    'sj-ChartRadar': ChartRadar,
    'sj-ChartParticular': ChartParticular,
    'sj-ChartHalo-one': ChartHaloOn,
    'sj-ChartHalo-two': ChartHaloTwo,
    'sj-ChartHalo-three': ChartHaloThree,
    chartOne,
    chartTwo,
    chartThree,
    chartFour,
    chartFive,
    chartSix,
    chartSeven,
    chartEight
  },
  computed: {
    ...mapGetters([
      'clickPointId', 'pointPosition', 'lake', 'prevStation'
    ])
  },
  created () {
    this.caseRegulatory()
    this.riverMonitorings()
    this.stationDatas()
    this.videoSrc = localStorage.getItem('videoSrc')
  },
  watch: {
    lake () {
      this.$parent.renderer.SuperAPI('RemoveAllPOI')
      this.visible = false
      this.stationDatas()
    },
    clickPointId (objId) {
      const type = (this.allStation.filter(item => item.Id === objId))[0].Type
      const chartType = this.chartHash[type]
      this.who = chartType
      this.stationCode = objId
      this.visible = true
      this.$parent.renderer.SuperAPI('GetPOIScreenRange', objId)
    },
    pointPosition (msg) {
      var LeftUp = msg.leftup
      const left = parseFloat(LeftUp.split(',')[0]) * this.screenResolution.width
      const top = parseFloat(LeftUp.split(',')[1]) * this.screenResolution.height
      this.screenResolution.left = left + this.screenResolution.offsetWidth
      this.screenResolution.top = top + this.screenResolution.offsetHeight
    }
  },
  data () {
    return {
      riverVonitor: [],
      CaseSupervision: [],
      videoSrc: '',
      doRender: false,
      showDealModal: false,
      legendArray: [],
      allStation: [],
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
      visible: false,
      stationCode: '',
      who: '',
      screenResolution: {
        width: 4896,
        height: 1632,
        offsetWidth: 120,
        offsetHeight: 180,
        left: 0,
        top: 0
      },
      uavFlag: false,
      peopleFlag: false
    }
  },
  methods: {
    ...mapMutations([
      'set_lakeActive', 'set_prevStation', 'set_clickPointId'
    ]),
    changeVisible () {
      this.visible = false
      this.set_clickPointId('')
    },
    // 案情监管
    caseRegulatory () {
      homeApi.caseRegulatory().then(res => {
        this.CaseSupervision = res
      })
    },
    // 河道监测
    riverMonitorings () {
      var param = {
        year: 2016,
        lakeCode: 'fxh'
      }
      homeApi.riverMonitorings(param).then(res => {
        this.riverVonitor = res.splice(0, 5)
      })
    },
    // 获取所有的站点信息
    stationDatas () {
      const legendArray = []
      const allStation = []
      var param = {
        lake: this.lake
      }
      homeApi.stationDatas(param).then(res => {
        res.titles.forEach((titleItem, index) => {
          var titleParam = {
            title: titleItem,
            data: []
          }
          res.data[index].forEach(item => {
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
                coord_z: ele.hight,
                Type: ele.objectType,
                object_coord: ele.coord
              }
              allStation.push(stationParam)
            })
            titleParam.data.push(param)
          })
          legendArray.push(titleParam)
        })
        this.legendArray = legendArray
        this.allStation = allStation

        if (this.prevStation.length !== 0) {
          this.legendArray = this.prevStation
        }
      })
    },
    toggleDealModal () {
      this.showDealModal = true
      this.$parent.$refs.player.loadUAVAction()
      this.uavFlag = !this.uavFlag
      if (!this.uavFlag) {
        this.$parent.$refs.player.clearAllElement()
        this.$parent.renderer.SuperAPI('SetEnvTime', '8:00')
      }
    },
    hideDealModal () {
      this.showDealModal = false
      this.uavFlag = false
      this.$parent.$refs.player.clearAllElement()
      this.$parent.renderer.SuperAPI('SetEnvTime', '8:00')
    },
    pepleModal () {
      this.$parent.$refs.player.loadStaffAction()
      this.peopleFlag = !this.peopleFlag
      if (!this.peopleFlag) {
        this.$parent.$refs.player.clearAllElement()
        this.$parent.renderer.SuperAPI('SetEnvTime', '8:00')
      }
    },
    changeLegend (item) {
      var data = []
      this.legendArray.forEach(item => {
        item.data.forEach(value => {
          data.push(value)
        })
      })
      const legend = data.find(p => p.key === item.key)
      legend.active = !legend.active
      if (legend.active) {
        legend.img = legendBaseImgPath + legend.key + '_a.png'
      } else {
        legend.img = legendBaseImgPath + legend.key + '.png'
      }
      const keyArray = _.filter(data, { active: true })
      this.showSpecPOI(keyArray)
    },
    showSpecPOI (types) {
      var hashIndex = null
      var node = []; var specsChecked = []
      types.forEach(o => {
        hashIndex = o.key
        node = node.concat(_.filter(this.allStation, { Type: hashIndex }))
        specsChecked.push(...node)
      })
      this.$parent.renderer.SuperAPI('RemoveAllPOI')
      specsChecked.map(o => {
        node = {
          object_id: o.Id,
          object_name: o.Address + '/' + o.Type_Name,
          object_floor: '1',
          object_type: o.Type,
          coord_type: '0',
          object_coord: o.object_coord,
          coord_z: o.coord_z,
          showtitle: 'true',
          showtitlerange: '30, 9000',
          monitormouseoverlap: 'true'
        }
        this.$parent.renderer.SuperAPI('AddPOI', node)
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
  },
  mounted () {
    this.doRender = true
    this.playVideo('realVideo', 'http://hls01open.ys7.com/openlive/1468c3bbdcdb45f780fad2fb7fb31200.hd.m3u8')
  },
  beforeDestroy () {
    this.$parent.$refs.lake.isShowHuPoArea = false
    this.set_lakeActive(false)
    this.set_prevStation(this.legendArray)

    this.$parent.$refs.player.clearAllElement()
    this.$parent.renderer.SuperAPI('SetEnvTime', '8:00')
  }
}
</script>

<style lang="less" scoped>
.sj_title_right {
  font-size: 27px;
  font-weight: normal;
  color: #0cd3ff;
  text-align: left;
  letter-spacing: 0px;
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
.legend-area {
  position: fixed;
  left: 3865px;
  bottom: 60px;
  z-index: 200;
  width: 311px;
  .legend-title-wrapper {
    height:74px;
    background:rgba(3,17,40,0.7);
    font-size:22px;
    font-weight:400;
    color:rgba(187,201,208,1);
    line-height: 74px;
    text-align: center;
  }
  .item {
    list-style: none;
    font-family: "Microsoft Yahei";
    font-size: 26px;
    color: rgb(230, 247, 255);
    height: 80px;
    line-height: 80px;
    background:rgba(3,17,40,0.7);
    text-indent: 50px;
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
.dashboard {
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
.content_right_1 {
  top: 110px;
}
.content_right_2 {
  top: 610px;
}
.content_right_3 {
  top: 1100px;
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
</style>
