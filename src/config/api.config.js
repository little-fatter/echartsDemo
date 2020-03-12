import appConfig from './app.config'

/**
 * 根据模块名称获取对于的HOST配置
 * @param {*} moduleName
 * @param {*} isRead
 */
const getHost = (moduleName, isRead = false) => {
  var host = ''
  if (appConfig.isUseGateWare) {
    host = appConfig.gatewayAddress
  } else {
    if (isRead) {
      host = appConfig.hostConfig.readHost[moduleName]
    } else {
      host = appConfig.hostConfig.writeHost[moduleName]
    }
  }
  return host
}

/* 配置API接口应用访问地址 */
const apiConfig = {
  // 系统管理
  admin: {
    // 登录模块
    login: {
      login: getHost('admin') + '/api/auth/login'
    },
    // 基础信息模块
    base: {
      userInfo: getHost('admin') + '/api/auth/userInfo'
    }
  },
  // 文件信息模块
  file: {
    // 上传文件
    uploadFile: getHost('file') + '/api/File/UploadFilesByform',
    // 下载文件
    downloadFile: getHost('file') + '/api/File/Get',
    // 删除文件
    deleteFile: getHost('file') + '/api/File/Delete'
  },
  superApi: {
    getToken: getHost('admin') + '/api/SuperAPI/GetToken',
    getUrl: getHost('admin') + '/api/SuperAPI/getUrl'
  },
  home: {
    caseRegulatory: `${getHost('home')}/api/v1/DecisionReport/CaseRegulatory`, // 案情监管
    globalConfig: `${getHost('home')}/api/v1/Globals/Config`, // 全局配置
    meteorological: `${getHost('home')}/api/v1/Globals/Meteorological`, // 全局天气
    stationDatas: `${getHost('home')}/api/v1/Globals/StationDatas`, // 全局测点
    waterQuality: `${getHost('home')}/api/v1/Globals/WaterQuality`, // 全局湖泊信息
    precipitations: `${getHost('home')}/api/v1/MeteorologicalReport/Precipitations`, // 全局按年统计降雨量
    riverMonitorings: `${getHost('home')}/api/v1/RiverReport/RiverMonitorings`, // 河道检测数据
    pollutantsNumerical: `${getHost('home')}/api/v1/WaterQualityReport/PollutantsNumerical` // 全局各湖污染物
  },
  waterQuality: {
    LakePollutantsConcentrationDayAvg: `${getHost('waterQuality')}/api/v1/Inversion/LakePollutantsConcentrationDayAvg`, // 湖体平均浓度
    LakeWaterqualityDaysProportion: `${getHost('waterQuality')}/api/v1/Inversion/LakeWaterqualityDaysProportion`, // 水质类别分布
    PollutionConcentrationPreviousYear: `${getHost('waterQuality')}/api/v1/Inversion/PollutionConcentrationPreviousYear`, // 污染因子浓度同比
    LakeGeneralSituation: `${getHost('waterQuality')}/api/v1/Inversion/LakeGeneralSituation`, // 湖体概括信息
    SurfaceKAverageConcentrationPollutants: `${getHost('waterQuality')}/api/v1/Inversion/SurfaceKAverageConcentrationPollutants`, // 演示面,水平面，污染物平均浓度
    SurfaceMAverageConcentrationPollutants: `${getHost('waterQuality')}/api/v1/Inversion/SurfaceMAverageConcentrationPollutants`, // 演示面,剖面面，污染物平均浓度
    SurfaceKConcentrationDistributionChange: `${getHost('waterQuality')}/api/v1/Inversion/SurfaceKConcentrationDistributionChange`, // 演示面,水平面,浓度分布变化(最大最小值)
    SurfaceMConcentrationDistributionChange: `${getHost('waterQuality')}/api/v1/Inversion/SurfaceMConcentrationDistributionChange`, // 演示面,剖面,浓度分布变化(最大最小值)
    LakePointTimeSeriesPollutantConcentration: `${getHost('waterQuality')}/api/v1/Inversion/LakePointTimeSeriesPollutantConcentration`, // 湖中点水质，重要点污染物浓度时间序列
    PollutionPointConcentrationPreviousYear: `${getHost('waterQuality')}/api/v1/Inversion/PollutionPointConcentrationPreviousYear`, // 湖中点，污染因子浓度同比
    ContributionRiverTPCentralStationPoint: `${getHost('waterQuality')}/api/v1/Inversion/ContributionRiverTPCentralStationPoint` // 影响河流排名
  },
  assist: {
    SceneResultImpDegree: `${getHost('waterQuality')}/api/DecisionMaking/SceneResultImpDegree`, // 大数据展示平台-辅助决策-模拟分布图
    PollutantConcentrationScenario: `${getHost('waterQuality')}/api/v1/Inversion/PollutantConcentrationScenario`, // 大数据展示平台-辅助决策-情景与基线情景污染物浓度时序对比图
    PollutantConcentrationimprove: `${getHost('waterQuality')}/api/v1/Inversion/PollutantConcentrationimprove`, // 大数据展示平台-辅助决策-改善程度时序图
    BaseLineSceneYearAvg: `${getHost('waterQuality')}/api/v1/Inversion/BaseLineSceneYearAvg` // 大数据展示平台-辅助决策-情景响应均值对比
  }
}

export default apiConfig
