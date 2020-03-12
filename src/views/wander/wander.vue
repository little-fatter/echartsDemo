<template>
  <div class="wander">
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
          <span class="uav-icon"></span>
          <span class="artificial-icon"></span>
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

    <audio :src="bgm" id="bgmtrack"></audio>
  </div>
</template>

<script>
// 漫游
import ChartRadar from '@/components/chartMain/ChartRadar'
import ChartParticular from '@/components/chartMain/ChartParticular'
import ChartHaloOn from '@/components/chartMain/ChartHalo_1'
import ChartHaloTwo from '@/components/chartMain/ChartHalo_2'
import ChartHaloThree from '@/components/chartMain/ChartHalo_3'
import * as homeApi from '@/api/home'
const bgmSrc = require('../../assets/bgm.mp3')

export default {
  components: {
    'sj-ChartRadar': ChartRadar,
    'sj-ChartParticular': ChartParticular,
    'sj-ChartHalo-one': ChartHaloOn,
    'sj-ChartHalo-two': ChartHaloTwo,
    'sj-ChartHalo-three': ChartHaloThree
  },
  data () {
    return {
      bgm: bgmSrc,
      riverVonitor: [],
      CaseSupervision: [],
      doRender: false
    }
  },
  mounted () {
    this.doRender = true
    this.playVideo('realVideo', 'http://hls01open.ys7.com/openlive/1468c3bbdcdb45f780fad2fb7fb31200.hd.m3u8')
    document.getElementById('bgmtrack').load()
    document.getElementById('bgmtrack').play()
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
      var param = {
        year: 2016,
        lakeCode: 'fxh'
      }
      homeApi.riverMonitorings(param).then(res => {
        this.riverVonitor = res.splice(0, 5)
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
  created () {
    this.caseRegulatory()
    this.riverMonitorings()
    const objData = {
      'actionname': 'PlaySequence_YNSH', // 自动漫游动画
      'PlayAnimation': '0' // 0：播放 ； 1：停止播放
    }
    this.$parent.renderer.SuperAPI('specialChannel', objData)
  },
  destroyed () {
    const objData = {
      'actionname': 'PlaySequence_YNSH', // 自动漫游动画
      'PlayAnimation': '1' // 0：播放 ； 1：停止播放
    }
    this.$parent.renderer.SuperAPI('specialChannel', objData)
    document.getElementById('bgmtrack').pause()
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
  background-color: #031128;
  width: 311px;
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
.wander {
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
