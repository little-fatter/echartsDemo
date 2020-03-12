
/**
 * 定义store的getter（可以认为是store的计算属性）
 * 用于快捷访问store中的各种状态
 */
const getters = {
  device: state => state.app.device, // 屏幕类型
  color: state => state.app.color, // 主题色
  lake: state => state.dashboard.lake, // 湖体
  prevStation: state => state.dashboard.prevStation, // 保留上次漫游的站点列表
  lakeActive: state => state.dashboard.lakeActive, // 湖体active
  lakePrevActive: state => state.dashboard.lakePrevActive, // 上一个湖体active
  menuIndex: state => state.dashboard.menuIndex, // 菜单
  showMenu: state => state.dashboard.showMenu, // 是否显示菜单
  waterQualityPoll: state => state.dashboard.waterQualityPoll, // 水质反演顶部污染物类型
  waterQualityYear: state => state.dashboard.waterQualityYear, // 水质反演顶部时间
  waterQualityDate: state => state.dashboard.waterQualityDate, // 水质反演中间进度条时间
  waterQualityLakeSite: state => state.dashboard.waterQualityLakeSite, // 湖体位置
  waterQualitySection: state => state.dashboard.waterQualitySection, // 湖体位置
  waterQualityActiveLayer: state => state.dashboard.waterQualityActiveLayer, // 水平面层数
  waterQualityActiveDirection: state => state.dashboard.waterQualityActiveDirection, // 横纵断面位置
  clickPointId: state => state.dashboard.clickPointId, // 点击图像上的点位id
  pointPosition: state => state.dashboard.pointPosition, // 点击图像上的点位位置

  // 辅助决策
  assistPoll: state => state.assist.assistPoll, // 污染物
  assistYear: state => state.assist.assistYear, // 年份
  assistTypeValue: state => state.assist.assistTypeValue // 改善类型
}

export default getters
