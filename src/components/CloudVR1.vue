<template>
  <div class="vr-wrapper">
    <div :id="id" class="vr-wrapper"></div>
    <div class="aimer">
      <div class="aimer-horizontal"></div>
      <div class="aimer-vertical"></div>
    </div>
    <div class="consoler">{{ log }}</div>
    <ul class="controller">
      <li class="item">
        <button type="button" class="btn" @click="pickCameraInfo">
          <span class="text">Show GIS Log</span>
        </button>
      </li>
      <li class="item">
        <button class="btn" type="button" @click="pickFrustumArea">
          <span class="text">Show Frustum</span>
        </button>
      </li>
      <li class="item">
        <button class="btn" type="button" @click="addPOINow">
          <span class="text">Add POI</span>
        </button>
      </li>
      <li class="item">
        <button class="btn" type="button" @click="showAllPOI">
          <span class="text">Show All POI</span>
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
    </ul>
  </div>
</template>
<script>
import { getToken, getUrl } from '@/api/superApi'
export default {
  name: 'CloudVR',
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
      LineCache: []
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
    // eslint-disable-next-line no-undef
    this.renderer = new cloudRenderer(this.id, 0)
    this.renderer.SuperAPI('RegisterCloudResponse', this.lifeCycleHooks)
    this.registerEEListener()
    window.renderer = this.renderer
  },
  methods: {
    registerEEListener () {
      // 这里注册所有由外部组件操作51VR的方法，为了安全起见，用事件的方式进行定向开放。
      // 开发的过程中如果觉得这种方式记忆成本高且麻烦，可直接监听on-scene-loaded事件直接获取renderer对象，直接调用SUPERAPI的方法
      // POI点
      this.$on('op-poi-add', msg => {
        this.renderer.SuperAPI('AddPOI', msg)
      })
      this.$on('op-poi-show', msg => {
        this.renderer.SuperAPI('ShowPOI', msg)
      })
      this.$on('op-poi-hide', msg => {
        this.renderer.SuperAPI('HidePOI', msg)
      })
      this.$on('op-poi-stylish', msg => {
        this.renderer.SuperAPI('UpdatePOIStyle', msg)
      })
      this.$on('op-poi-title-custom', msg => {
        this.renderer.SuperAPI('UpdataPOITitleInfo', msg)
      })
      this.$on('op-poi-focus-single', msg => {
        msg.distance = msg.distance || 20
        this.renderer.SuperAPI('FocusPOI', msg.id, msg.distance)
      })
      this.$on('op-poi-focus-all', msg => {
        this.renderer.SuperAPI('FocusAllPOI')
      })
      this.$on('op-poi-location-query', msg => {
        const result = this.renderer.SuperAPI('GetPOIScreenRange', msg.id)
        return result
      })
      this.$on('op-poi-looks-actived', msg => {
        this.renderer.SuperAPI('SetPOISelect', msg.id, msg.isActived)
      })
      // 路径
      this.$on('op-path-add', msg => {
        this.renderer.SuperAPI('AddPath', msg)
      })
      this.$on('op-path-show', msg => {
        this.renderer.SuperAPI('ShowPath', msg)
      })
      this.$on('op-path-hide', msg => {
        this.renderer.SuperAPI('HidePath', msg)
      })
      this.$on('op-path-remove', msg => {
        this.renderer.SuperAPI('RemovePath', msg.id)
      })
      this.$on('op-path-all-remove', msg => {
        this.renderer.SuperAPI('RemoveAllPath')
      })
      this.$on('op-path-focus-single', msg => {
        msg.distance = msg.distance || 20
        this.renderer.SuperAPI('FocusPath', msg.id, msg.distance)
      })
      this.$on('op-path-focus-all', msg => {
        this.renderer.SuperAPI('FocusAllPath')
      })
      // 散点热力图@VR
      this.$on('op-heatmap-add', msg => {
        this.renderer.SuperAPI('AddHeatMap', msg)
      })
      this.$on('op-heatmap-update', msg => {
        this.renderer.SuperAPI('UpdateHeatMap', msg)
      })
      this.$on('op-heatmap-show', msg => {
        this.renderer.SuperAPI('ShowHeatMap', msg.id)
      })
      this.$on('op-heatmap-hide', msg => {
        this.renderer.SuperAPI('HideHeatMap', msg.id)
      })
      this.$on('op-heatmap-remove', msg => {
        this.renderer.SuperAPI('RemoveHeatMap', msg.id)
      })
      this.$on('op-heatmap-remove-all', msg => {
        this.renderer.SuperAPI('RemoveAllHeatMap')
      })
      this.$on('op-heatmap-focus-single', msg => {
        msg.distance = msg.distance || 20
        this.renderer.SuperAPI('FocusHeatMap', msg.id, msg.distance)
      })
      this.$on('op-heatmap-focus-all', msg => {
        this.renderer.SuperAPI('FocusAllHeatMap')
      })
      // 路径热力图@VR
      this.$on('op-heatroad-add', msg => {
        this.renderer.SuperAPI('AddRoadHeatMap', msg)
      })
      this.$on('on-heatroad-update', msg => {
        this.renderer.SuperAPI('UpdateRoadHeatMap', msg)
      })
      this.$on('on-heatroad-show', msg => {
        this.renderer.SuperAPI('ShowRoadHeatMap', msg.id)
      })
      this.$on('op-heatroad-hide', msg => {
        this.renderer.SuperAPI('HideRoadHeatMap', msg.id)
      })
      this.$on('op-heatroad-remove', msg => {
        this.renderer.SuperAPI('RemoveRoadHeatMap', msg.id)
      })
      this.$on('op-heatroad-remove-all', msg => {
        this.renderer.SuperAPI('RemoveAllRoadHeatMap', msg.id)
      })
      this.$on('op-heatroad-focus-single', msg => {
        this.renderer.SuperAPI('FocusRoadHeatMap', msg.id)
      })
      this.$on('op-heatroad-focus-all', msg => {
        this.renderer.SuperAPI('FocusAllRoadHeatMap')
      })
      // 迁徙图@VR
      this.$on('op-migration-add', msg => {
        this.renderer.SuperAPI('AddMigrationMap', msg)
      })
      this.$on('op-migration-show', msg => {
        this.renderer.SuperAPI('ShowMigrationMap', msg.id)
      })
      this.$on('op-migration-hide', msg => {
        this.renderer.SuperAPI('HideMigrationMap', msg.id)
      })
      this.$on('op-migration-remove', msg => {
        this.renderer.SuperAPI('RemoveMigrationMap', msg.id)
      })
      this.$on('op-migration-remove-all', msg => {
        this.renderer.SuperAPI('RemoveAllMigrationMap')
      })
      this.$on('op-migration-focus-single', msg => {
        msg.distance = msg.distance || 20
        this.renderer.SuperAPI('FocusMigrationMap', msg.id, msg.distance)
      })
      this.$on('op-migration-focus-all', msg => {
        this.renderer.SuperAPI('FocusAllMigrationMap')
      })
      // 区域
      this.$on('op-range-add', msg => {
        this.renderer.SuperAPI('AddRange', msg)
      })
      this.$on('op-range-show', msg => {
        this.renderer.SuperAPI('ShowRange', msg.id)
      })
      this.$on('op-range-hide', msg => {
        this.renderer.SuperAPI('HideRange', msg.id)
      })
      this.$on('op-range-remove', msg => {
        this.renderer.SuperAPI('RemoveRange', msg.id)
      })
      this.$on('op-range-remove-all', msg => {
        this.renderer.SuperAPI('RemoveAllRange')
      })
      this.$on('op-range-focus-single', msg => {
        msg.distance = msg.distance || 20
        this.renderer.SuperAPI('FocusRange', msg.id, msg.distance)
      })
      this.$on('op-range-focus-all', msg => {
        this.renderer.SuperAPI('FocusAllRange')
      })
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
      switch (json.func_name) {
        case 'beginPlay':
          this.$emit('cvr-connected', this.renderer)
          break
        case 'APIAlready':
          this.$emit('cvr-loaded', this.renderer)
          break
        case 'OnPOIClick':
          // eslint-disable-next-line camelcase
          const onPOIClick_id = json.args.id
          const data = this.POIHash[onPOIClick_id]
          this.$emit('on-poi-click', data)
          break
        case 'OnPOIMouseOverlap':
          // eslint-disable-next-line camelcase
          const onPOIHover_id = json.args.id
          this.$emit('on-poi-hover', onPOIHover_id)
          break
        case 'OnCameraInfo':
          // eslint-disable-next-line camelcase
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
          // eslint-disable-next-line camelcase
          const focus_start_id = json.args.id
          this.$emit('on-poi-focus-start', focus_start_id)
          break
        case 'OnPOIFocusEnd':
          // eslint-disable-next-line camelcase
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
      this.renderer.SuperAPI_GetFrustumArea(0)
    },
    pickCameraInfo () {
      this.renderer.SuperAPI_GetCameraInfo(0)
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

      this.renderer.SuperAPI_AddNaviPoint(obj)
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
        this.renderer.SuperAPI_CreateTrackLine(pathData)
        this.renderer.SuperAPI_ShowHideTrackLine(liveID, true)
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
            coord_z: 100
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
    }
  }
}
</script>
<style lang="" scoped>
</style>
