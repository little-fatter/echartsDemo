<template>
  <div class="vr-wrapper" style="position: absolute;">
    <div :id="id"></div>
    <div class="aimer">
      <div class="aimer-horizontal"></div>
      <div class="aimer-vertical"></div>
    </div>
    <div class="consoler">{{ log }}</div>
    <ul class="sider">
      <li class="item">
        <input
          type="checkbox"
          id="lake_fx"
          v-model="fxSelected"
          value="fx"
          @change="lakeswitch('fx')"
        />
        <label for="lake_fx">抚仙湖</label>
      </li>
      <li class="item">
        <input
          type="checkbox"
          id="lake_ql"
          v-model="qlSelected"
          value="ql"
          @change="lakeswitch('ql')"
        />
        <label for="lake_ql">杞麓湖</label>
      </li>
      <li class="item">
        <input
          type="checkbox"
          id="lake_xy"
          v-model="xySelected"
          value="xy"
          @change="lakeswitch('xy')"
        />
        <label for="lake_xy">星云湖</label>
      </li>
    </ul>
    <ul class="controller">
      <li class="item">
        <button type="button" class="btn" @click="pickCameraInfo">
          <span class="text">Show GIS Log</span>
        </button>
      </li>
      <li class="item">
        <button class="btn" type="button" @click="setEvening">
          <span class="text">Show Evening</span>
        </button>
      </li>
      <li class="item">
        <button class="btn" type="button" @click="addPOINow">
          <span class="text">Add POI</span>
        </button>
      </li>
      <li class="item">
        <button class="btn" type="button" @click="drawLine">
          <span class="text">Draw Line</span>
        </button>
      </li>
      <li class="item">
        <button class="btn" type="button" @click="drawArea">
          <span class="text">Draw Area</span>
        </button>
      </li>
      <li class="item">
        <button class="btn" type="button" @click="loadUAVAction">
          <span class="text">无人机搜救</span>
        </button>
      </li>
      <li class="item">
        <button class="btn" type="button" @click="loadAllPOI">
          <span class="text">显示点位</span>
        </button>
      </li>
      <li class="item">
        <button class="btn" type="button" @click="loadStaffAction">
          <span class="text">执法人员搜救</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getToken, getUrl } from '@/api/superApi'
import pois from '../data/pois.json'
import uav from '../data/uav.json'
import tn from '../data/TN.json'
import fxlake from '../data/fuxian_lake.json'
import xylake from '../data/xingyun_lake.json'
import qllake from '../data/qilu_lake.json'
import staff_action from '../data/staff_action.json'

export default {
  name: '',
  data () {
    return {
      cloudurl: null,
      renderer: null,
      brushMode: null,
      log: null,
      autoIndex: {
        POI: 0,
        path: 0,
        area: 0
      },
      viewport: {
        lt: {
          coord: null,
          armdistance: null
        },
        lb: {
          coord: null,
          armdistance: null
        },
        rt: {
          coord: null,
          armdistance: null
        },
        rb: {
          coord: null,
          armdistance: null
        },
        c: {
          coord: null,
          armdistance: null
        }
      },
      POIHash: {},
      LineCache: [],
      lakeArea: {
        fx: fxlake,
        xy: xylake,
        ql: qllake
      },
      fxSelected: false,
      xySelected: false,
      qlSelected: false
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    render: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  watch: {
    render (n) {
      if (n) {
        this.requestCloudRenderer()
      }
    }
  },
  created () {
    this.$on('poi-single-focus', msg => {
      this.renderer.SuperAPI()
    })
    this.$on('draw-line-complete', msg => {
      this.renderLineDrew(msg)
      this.renderAreaDrew(msg)
    })
  },
  mounted () {
    this.renderer = new cloudRenderer(this.id, 0)
    this.renderer.SuperAPI('RegisterCloudResponse', this.lifeCycleHooks)
    window.renderer = this.renderer
    this.renderer.SuperAPI('SetEnvTime', '19:45')
  },
  methods: {
    lakeswitch (n, show) {
      let ld = null
      let color = null
      switch (n) {
        case 'fx':
          ld = this.lakeArea.fx
          color = '1,0.2,0'
          if (show) {
            this.createLakeArea('fx', this.lakeArea.fx, color)
            this.deleteLakeArea('lake-area-ql')
            this.deleteLakeArea('lake-area-xy')
          } else {
            this.deleteLakeArea('lake-area-fx')
          }
          break
        case 'ql':
          ld = this.lakeArea.ql
          color = '0,1,0.5'
          if (show) {
            this.createLakeArea('ql', this.lakeArea.ql, color)
            this.deleteLakeArea('lake-area-fx')
            this.deleteLakeArea('lake-area-xy')
          } else {
            this.deleteLakeArea('lake-area-ql')
          }
          break
        case 'xy':
          ld = this.lakeArea.xy
          color = '0,0.6,1'
          if (show) {
            this.createLakeArea('xy', this.lakeArea.xy, color)
            this.deleteLakeArea('lake-area-fx')
            this.deleteLakeArea('lake-area-ql')
          } else {
            this.deleteLakeArea('lake-area-xy')
          }
          break
      }
    },
    setEvening () {
      this.renderer.SuperAPI('SetEnvTime', '20:40')
    },
    requestCloudRenderer () {
      getToken().then((res) => {
        this.requestUrlByToken(res.token)
      })
    },
    requestUrlByToken (token) {
      getUrl(token).then((res) => {
        this.initRenderer(res.url)
      })
    },
    initRenderer (url) {
      this.renderer.SuperAPI('StartRenderCloud', url)
    },
    lifeCycleHooks (data) {
      const json = JSON.parse(data)
      var ratioW = 4896 / window.innerWidth
      var ratioH = 1632 / window.innerHeight
      switch (json.func_name) {
        case 'beginPlay':
          document.getElementById('streamingVideo').style.transform = 'scale(' + ratioW + ',' + ratioH + ')'
          document.getElementById('videoPlayOverlay').style.transform = 'scale(' + ratioW + ',' + ratioH + ')'
          // document.getElementById('player').style.transform = 'scale(' + ratioW + ',' + ratioH + ')'
          this.$emit('cvr-connected', this.renderer)
          break
        case 'APIAlready':
          document.getElementById('streamingVideo').style.transform = 'scale(' + ratioW + ',' + ratioH + ')'
          document.getElementById('videoPlayOverlay').style.transform = 'scale(' + ratioW + ',' + ratioH + ')'
          // document.getElementById('player').style.transform = 'scale(' + ratioW + ',' + ratioH + ')'
          this.$emit('cvr-loaded', this.renderer)
          break
        case 'OnPOIClick':
          const onPOIClick_id = json.args.id
          this.$emit('on-poi-click', onPOIClick_id)
          break
        case 'OnPOIMouseOverlap':
          const onPOIHover_id = json.args.id
          this.$emit('on-poi-hover', onPOIHover_id)
          break
        case 'OnCameraInfo':
          const camera_coord = json.args
          // 数据写入组件仓库
          this.viewport.c.coord = camera_coord.coord
          this.viewport.c.armdistance = camera_coord.armdistance
          // LOG面板显示
          this.log = `Camera:GIS-${camera_coord.coord},Arm Distance:${camera_coord.armdistance}`
          this.$emit('on-shot', camera_coord)
          break
        case 'OnPOIScreenRage':
          const screenrage = {
            leftup: json.args.LeftUp
          }

          this.$emit('on-poi-position', screenrage)
          break
        case 'OnPOIFocusStart':
          const focus_start_id = json.args.id
          this.$emit('on-poi-focus-start', focus_start_id)
          break
        case 'OnPOIFocusEnd':
          const focus_end_id = json.args.id
          this.$emit('on-poi-focus-end', focus_end_id)
          break
        case 'OnFrustumArea':
          const frustum = json.args
          // 数据写入组件仓库
          this.viewport.lt = frustum.LT
          this.viewport.rt = frustum.RT
          this.viewport.lb = frustum.LB
          this.viewport.rb = frustum.RB
          // LOG面板显示
          this.log = `Frustum:LT-${frustum.LT}, RT-${frustum.RT}, LB-${frustum.LB}, RB-${frustum.RB}`
          this.$emit('on-current-frustum', frustum)
          break
        case 'measurement_result':
          const result = json.args
          this.$emit('draw-line-complete', result)
      }
    },
    pickFrustumArea () {
      this.renderer.SuperAPI('GetFrustumArea', 0)
    },
    pickCameraInfo () {
      this.renderer.SuperAPI('GetCameraInfo', 0)
    },
    addPOINow () {
      this.autoIndex.POI++
      this.pickCameraInfo()
      const obj = {
        object_id: this.autoIndex.POI,
        object_name: 'Waytale@' + this.autoIndex.POI,
        object_floor: '1',
        object_type: '1',
        coord_type: '0',
        object_coord: this.viewport.c.coord,
        coord_z: '1',
        showtitle: 'true',
        showtitlerange: '30,450',
        monitormouseoverlap: 'true'
      }
      // this.renderer.SuperAPI("AddPOI", obj);

      this.renderer.SuperAPI('AddNaviPoint', obj)
      this.POIHash[this.autoIndex.POI] = {
        name: 'Waytale@' + this.autoIndex.POI,
        coord: this.viewport.c.coord,
        armdistance: 1
      }
    },
    showAllPOI () {
      this.renderer.SuperAPI('FocusAllPOI')
    },
    drawLine () {
      this.brushMode = 'line'
      this.renderer.SuperAPI('StartMeasureTool', 0)
    },
    renderLineDrew (data) {
      if (this.brushMode === 'line') {
        const pathPoints = data.points.map(o => {
          return {
            coord: o.coord,
            coord_z: 100
          }
        })
        this.autoIndex.path++
        const liveID = 'path_' + this.autoIndex.path
        const pathData = {
          object_id: liveID,
          coord_type: 0,
          style_type: 2,
          color: 'green',
          width: 50,
          points: pathPoints
        }
        this.renderer.SuperAPI('AddPath', pathData)
        this.renderer.SuperAPI('ShowPath', liveID)
        this.renderer.SuperAPI('FocusPath', liveID, 2000)
        this.renderer.SuperAPI('EndMeasureTool')
      }
    },
    drawArea () {
      this.brushMode = 'area'
      this.renderer.SuperAPI('StartMeasureTool', 0)
    },
    renderAreaDrew (data) {
      if (this.brushMode === 'area') {
        const rangePoints = data.points.map(o => {
          return {
            coord: o.coord,
            coord_z: 2100
          }
        })
        this.autoIndex.area++
        const liveID = 'area_' + this.autoIndex.area
        const rangedata = {
          object_id: liveID, // 区域id
          coord_type: '0', // 区域中坐标类型(0: 经纬度gis, 1: cad坐标, 2: UE4WorldPostion)
          style_type: '2', // 区域外观类型(1: 默认样式, 2: 流光围栏样式)
          color: '1, 0.5, 0.25', // 区域颜色(R,G,B颜色值, 0-1, 或 green, red, yellow, blue, gray)
          width: '20.0', // 区域底边宽度(米)
          rangehight: '300', // 区域围栏高度 (米)
          fillarea: 'true', // 是否填充区域底部
          points: rangePoints
        }
        this.renderer.SuperAPI('AddRange', rangedata)
        this.renderer.SuperAPI('ShowRange', liveID)
        this.renderer.SuperAPI('FocusRange', liveID)
        this.renderer.SuperAPI('EndMeasureTool')
        localStorage.testPoint = JSON.stringify(rangePoints)
      }
    },
    drawHeatmap () {},
    addLinePoint () {},
    closeToast () {
      this.showToast = false
      this.toast = null
    },
    culCoord (coord) {
      const p = coord.split(',')
      // return `${parseFloat(p[0]) - 0.116674},${parseFloat(p[1]) - 0.149662}`;
      return coord
    },
    loadAllPOI () {
      pois.forEach(poi => {
        console.log(poi)
        const coord = this.culCoord(poi.coord)
        const obj = {
          object_id: poi.id,
          object_name: poi.name,
          object_floor: '1',
          object_type: 'building',
          coord_type: '0',
          object_coord: coord,
          coord_z: '2000',
          showtitle: 'true',
          showtitlerange: '0,30000',
          monitormouseoverlap: 'true'
        }
        this.renderer.SuperAPI('AddPOI', obj)
      })
    },
    loadUAVAction () {
      this.clearAllElement()
      this.renderer.SuperAPI('SetEnvTime', '18:30')
      const p = uav[0]
      const start_coord = p.start_coord
      const target_coord = p.target_coord
      const effectdata = {
        object_id: 'effect_uav_action', // 场景特效id
        coord_type: '0', // 坐标类型(0: 经纬度gis, 1: cad坐标, 2: UE4WorldPostion)
        style_type: 'alarm', // 场景特效类型(shield, fire, arrow, alarm, circle, pyramid 详见示意图)
        width: '100.0', // 特效直径(米)
        coord: target_coord, // 坐标位置(坐标类型需与coord_type相同)
        coord_z: '1720', // 高度(米)
        yawangle: '0.0' // 特效绕纵向旋转角度(0-360)
      }
      this.renderer.SuperAPI('AddEffect', effectdata)
      this.renderer.SuperAPI('ShowEffect', 'effect_uav_action')

      const uavPoint = {
        object_id: 'poi_id', // POI点的ID
        object_name: '无人机UAV-003', // WEB页展示的POI提示文本
        object_floor: '1', // 用于建筑楼层, 1 一层 (非必填)
        object_type: 'poi_uav', // 图标的类型 (需双方沟通约定POI点的类型、UI等)
        coord_type: '0', // (0: 经纬度gis, 1: cad坐标)
        object_coord: start_coord, // POI点的坐标(坐标类型需与该POI点的object_type相同)
        coord_z: '1720', // 单位米, 坐标为GIS时决定POI图标高度; CAD时无效, 不用填
        showtitle: 'true', // true 显示提示文本(默认), false 不显示提示文本
        showtitlerange: '0, 11000', // 此POI点显示title的镜头距离范围(单位米, 范围最小、最大距离; 在此范围内显示, 超出范围隐藏title, 注: showtitle属性为true时生效)
        monitormouseoverlap: 'true' // 此POI是否允许监听鼠标划过事件
      }
      this.renderer.SuperAPI('AddPOI', uavPoint)

      const migrationmapdata = {
        object_id: 'uav_001', // 迁徙图id
        coord_type: '0', // 坐标类型(0: 经纬度gis, 1: cad坐标, 2: UE4WorldPostion)
        style_type: '2', // 迁徙图外观类型(1:波浪线型, 2:箭头型)
        start_coord: start_coord, // 迁徙图起点(出发点)坐标位置(坐标类型需与coord_type相同)
        start_coord_z: '1720', // 高度(米)
        targetdata: [
          // 迁徙图目标点数据数组
          {
            target_coord: target_coord, // 迁徙图目标点坐标位置(坐标类型需与coord_type相同)
            target_coord_z: '1720', // 高度(米)
            mark_size: '10.0', // 目标点标志直径(米)
            mark_color: '0,0.35,1', // 目标点颜色 (R,G,B颜色值, 0-1, 或 green, red, yellow, blue, gray)
            line_width: '100.0', // 迁徙图连线宽度(米)
            line_color: '0,0.35,1', // 迁徙图连线颜色 (R,G,B颜色值, 0-1, 或 green, red, yellow, blue, gray)
            curvature_adjustment: '0.5' // 迁徙图连线曲度调节(取值范围 -1 ~ 1 0为默认曲度, 此值越小(最小-1)曲线越平, 反之曲线越陡峭)
          }
        ]
      }
      this.renderer.SuperAPI('AddMigrationMap', migrationmapdata)
      this.renderer.SuperAPI('ShowMigrationMap', 'uav_001')
      this.renderer.SuperAPI('FocusMigrationMap', 'uav_001', 3300)
    },
    loadStaffAction () {
      this.clearAllElement()
      this.renderer.SuperAPI('SetEnvTime', '18:30')
      const p = uav[0]
      const start_coord = p.start_coord
      const target_coord = p.target_coord
      const effectdata = {
        object_id: 'effect_uav_action', // 场景特效id
        coord_type: '0', // 坐标类型(0: 经纬度gis, 1: cad坐标, 2: UE4WorldPostion)
        style_type: 'alarm', // 场景特效类型(shield, fire, arrow, alarm, circle, pyramid 详见示意图)
        width: '100.0', // 特效直径(米)
        coord: target_coord, // 坐标位置(坐标类型需与coord_type相同)
        coord_z: '1720', // 高度(米)
        yawangle: '0.0' // 特效绕纵向旋转角度(0-360)
      }
      this.renderer.SuperAPI('AddEffect', effectdata)
      this.renderer.SuperAPI('ShowEffect', 'effect_uav_action')

      const uavPoint = {
        object_id: 'poi_id_staff1', // POI点的ID
        object_name: '搜救人员 赵**', // WEB页展示的POI提示文本
        object_floor: '1', // 用于建筑楼层, 1 一层 (非必填)
        object_type: 'poi_executor', // 图标的类型 (需双方沟通约定POI点的类型、UI等)
        coord_type: '0', // (0: 经纬度gis, 1: cad坐标)
        object_coord: start_coord, // POI点的坐标(坐标类型需与该POI点的object_type相同)
        coord_z: '1720', // 单位米, 坐标为GIS时决定POI图标高度; CAD时无效, 不用填
        showtitle: 'true', // true 显示提示文本(默认), false 不显示提示文本
        showtitlerange: '0, 11000', // 此POI点显示title的镜头距离范围(单位米, 范围最小、最大距离; 在此范围内显示, 超出范围隐藏title, 注: showtitle属性为true时生效)
        monitormouseoverlap: 'true' // 此POI是否允许监听鼠标划过事件
      }
      this.renderer.SuperAPI('AddPOI', uavPoint)
      const path = {
        object_id: 'path_staff_save', // 路径id
        coord_type: '0', // 路径中坐标类型(0: 经纬度gis, 1: cad坐标, 2: UE4WorldPostion)
        style_type: '2', // 路径外观类型(1: 纯色式样 2: 箭头式样)
        color: '0, 0.9, 0.25', // 路径颜色(R,G,B颜色值, 0-1, 或 green, red, yellow, blue, gray)
        width: '20.0', // 路径宽度(米)
        points: staff_action
      }
      this.renderer.SuperAPI('AddPath', path)
      this.renderer.SuperAPI('ShowPath', 'path_staff_save')
      this.renderer.SuperAPI('FocusPath', 'path_staff_save', 3300)
    },
    clearAllElement () {
      // this.renderer.SuperAPI('RemoveAllPOI')
      // this.renderer.SuperAPI('RemoveAllPath')
      this.renderer.SuperAPI('RemovePath')
      this.renderer.SuperAPI('RemoveAllRange')
      this.renderer.SuperAPI('RemoveAllHeatMap')
      // this.renderer.SuperAPI('RemoveAllHeatRoadMap')
      this.renderer.SuperAPI('RemoveAllMigrationMap')
      this.renderer.SuperAPI('RemoveAllEffect')
    },
    loadHead () {
      const HeatData = {
        object_id: 'item_heatmap_1', // 区域热力图id
        coord_type: '0', // 区域热力图中坐标类型(0: 经纬度gis, 1: cad 坐标, 2: UE4WorldPostion)
        heatmap_type: '1', // 区域热力图样式类型(1: 经典类型(红绿热力图))
        leftupper_coord: this.culCoord('102.839256,24.636318'), // 区域热力图范围左上坐标(坐标类型需与heatmap_type相同)
        lowerright_coord: this.culCoord('102.933326,24.334495'), // 区域热力图范围右下坐标(坐标类型需与heatmap_type相同)
        coord_z: '2020', // 区域热力图Z轴值(项目约定)
        brush_diameter: '20000.0', // 区域热力点笔刷直径(米, 单个热力点覆盖直径)
        heatpoint_minvalue: '0.171440', // 区域热力点取值范围最小值(此热力图中数值范围的最小值, 例如人流密度最小1(绿色接近透明), 最大1000(最红), 线性计算)
        heatpoint_maxvalue: '0.171444' // 区域热力点取值范围最大值
      }
      this.renderer.SuperAPI('AddHeatMap', HeatData)
      const heatDots = tn.map(o => {
        return {
          coord: this.culCoord(o.coord),
          value: o.value
        }
      })

      const HeatPointData = {
        object_id: 'item_heatmap_1', // 要更新的区域热力图的id
        data: heatDots
      }
      this.renderer.SuperAPI('UpdateHeatMap', HeatPointData)
      this.renderer.SuperAPI('ShowHeatMap', 'item_heatmap_1')
      this.renderer.SuperAPI('FocusHeatMap', 'item_heatmap_1', 2500)
    },
    createLakeArea (id, data, color) {
      const dots = data.map(o => {
        return {
          coord: o[0] + ', ' + o[1],
          coord_z: 2000
        }
      })
      const rangedata = {
        object_id: 'lake-area-' + id, // 区域id
        coord_type: '0', // 区域中坐标类型(0: 经纬度gis, 1: cad坐标, 2: UE4WorldPostion)
        style_type: '2', // 区域外观类型(1: 默认样式, 2: 流光围栏样式)
        color: color, // 区域颜色(R,G,B颜色值, 0-1, 或 green, red, yellow, blue, gray)
        width: '20.0', // 区域底边宽度(米)
        rangehight: '5000', // 区域围栏高度 (米)
        fillarea: 'false', // 是否填充区域底部
        points: dots
      }
      this.renderer.SuperAPI('AddRange', rangedata)
      this.renderer.SuperAPI('ShowRange', 'lake-area-' + id)
      this.renderer.SuperAPI('FocusRange', 'lake-area-' + id, 22500)
    },
    deleteLakeArea (id) {
      this.renderer.SuperAPI('RemoveRange', id)
    }
  }
}
</script>
<style lang="" scoped>
</style>
