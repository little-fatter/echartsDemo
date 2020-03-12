const dashboard = {
  state: {
    lake: 'fxh',
    lakeActive: false,
    lakePrevActive: false,
    menuIndex: 1,
    showMenu: true, // 是否显示菜单
    waterQualityPoll: 'tp', // 水质反演顶部污染物类型
    waterQualityYear: '2016', // 水质反演顶部时间
    waterQualityDate: '2016-01-01', // 中间进度条时间
    waterQualityLakeSite: 'lakeBody', // 湖体位置
    waterQualitySection: 'standard', // 湖中面是水平还是横纵
    waterQualityActiveLayer: 1, // 水平面层数
    waterQualityActiveDirection: 'aa', // 横纵断面位置
    clickPointId: '', // 点击图像上的点位id
    pointPosition: {}, // 点位位置
    prevStation: [] // 保留从主页到漫游的站点列表
  },
  mutations: {
    set_prevStation: (state, prevStation) => {
      state.prevStation = prevStation
    },
    set_lake: (state, lake) => {
      state.lake = lake
    },
    set_lakeActive: (state, lakeActive) => {
      state.lakeActive = lakeActive
    },
    set_lakePrevActive: (state, lakePrevActive) => {
      state.lakePrevActive = lakePrevActive
    },
    set_menuIndex: (state, menuIndex) => {
      state.menuIndex = menuIndex
    },
    set_showMenu: (state, showMenu) => {
      state.showMenu = showMenu
    },
    set_waterQualityPoll: (state, waterQualityPoll) => {
      state.waterQualityPoll = waterQualityPoll
    },
    set_waterQualityYear: (state, waterQualityYear) => {
      state.waterQualityYear = waterQualityYear
    },
    set_waterQualityDate: (state, waterQualityDate) => {
      state.waterQualityDate = waterQualityDate
    },
    set_waterQualityLakeSite: (state, waterQualityLakeSite) => {
      state.waterQualityLakeSite = waterQualityLakeSite
    },
    set_waterQualitySection: (state, waterQualitySection) => {
      state.waterQualitySection = waterQualitySection
    },
    set_waterQualityActiveLayer: (state, waterQualityActiveLayer) => {
      state.waterQualityActiveLayer = waterQualityActiveLayer
    },
    set_waterQualityActiveDirection: (state, waterQualityActiveDirection) => {
      state.waterQualityActiveDirection = waterQualityActiveDirection
    },
    set_clickPointId: (state, clickPointId) => {
      state.clickPointId = clickPointId
    },
    set_pointPosition: (state, pointPosition) => {
      state.pointPosition = pointPosition
    }
  }
}

export default dashboard
