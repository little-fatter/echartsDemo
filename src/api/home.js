import { getHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

/**
 * 获取首页案情监管数据
 */
export const caseRegulatory = (params = {}) => {
  return getHttp({
    url: apiConfig.home.caseRegulatory,
    params: {
      ...params
    }
  })
}

/**
 * 获取首页全局配置
 */
export const globalConfig = (params = {}) => {
  return getHttp({
    url: apiConfig.home.globalConfig,
    params: {
      ...params
    }
  })
}

/**
 * 获取首页全局天气
 */
export const meteorological = (params = {}) => {
  return getHttp({
    url: apiConfig.home.meteorological,
    params: {
      ...params
    }
  })
}

/**
 * 获取首页全局测点
 */
export const stationDatas = (params = {}) => {
  return getHttp({
    url: apiConfig.home.stationDatas,
    params: {
      ...params
    }
  })
}

/**
 * 获取首页全局湖泊信息
 */
export const waterQuality = (params = {}) => {
  return getHttp({
    url: apiConfig.home.waterQuality,
    params: {
      ...params
    }
  })
}

/**
 * 获取首页全局按年统计降雨量
 */
export const precipitations = (params = {}) => {
  return getHttp({
    url: apiConfig.home.precipitations,
    params: {
      ...params
    }
  })
}

/**
 * 获取首页河道检测数据
 */
export const riverMonitorings = (params = {}) => {
  return getHttp({
    url: apiConfig.home.riverMonitorings,
    params: {
      ...params
    }
  })
}

/**
 * 获取首页全局各湖污染物
 */
export const pollutantsNumerical = (params = {}) => {
  return getHttp({
    url: apiConfig.home.pollutantsNumerical,
    params: {
      ...params
    }
  })
}
