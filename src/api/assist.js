import { getHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

/**
 * 大数据展示平台-辅助决策-模拟分布图
 */
export const SceneResultImpDegree = (params = {}) => {
  return getHttp({
    url: apiConfig.assist.SceneResultImpDegree,
    params: {
      ...params
    }
  })
}

/**
 * 大数据展示平台-辅助决策-情景与基线情景污染物浓度时序对比图
 */
export const PollutantConcentrationScenario = (params = {}) => {
  return getHttp({
    url: apiConfig.assist.PollutantConcentrationScenario,
    params: {
      ...params
    }
  })
}

/**
 * 大数据展示平台-辅助决策-改善程度时序图
 */
export const PollutantConcentrationimprove = (params = {}) => {
  return getHttp({
    url: apiConfig.assist.PollutantConcentrationimprove,
    params: {
      ...params
    }
  })
}

/**
 * 大数据展示平台-辅助决策-情景响应均值对比
 */
export const BaseLineSceneYearAvg = (params = {}) => {
  return getHttp({
    url: apiConfig.assist.BaseLineSceneYearAvg,
    params: {
      ...params
    }
  })
}
