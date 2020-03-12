import { getHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

/**
 * 获取水质反演湖体概括信息
 */
export const LakePollutantsConcentrationDayAvg = (params = {}) => {
  return getHttp({
    url: apiConfig.waterQuality.LakePollutantsConcentrationDayAvg,
    params: {
      ...params
    }
  })
}

/**
 * 获取水质类别分布
 */
export const LakeWaterqualityDaysProportion = (params = {}) => {
  return getHttp({
    url: apiConfig.waterQuality.LakeWaterqualityDaysProportion,
    params: {
      ...params
    }
  })
}

/**
 * 获取污染因子浓度同比
 */
export const PollutionConcentrationPreviousYear = (params = {}) => {
  return getHttp({
    url: apiConfig.waterQuality.PollutionConcentrationPreviousYear,
    params: {
      ...params
    }
  })
}

/**
 * 获取湖体概况信息
 */
export const LakeGeneralSituation = (params = {}) => {
  return getHttp({
    url: apiConfig.waterQuality.LakeGeneralSituation,
    params: {
      ...params
    }
  })
}

/**
 * 演示面,水平面，污染物平均浓度
 */
export const SurfaceKAverageConcentrationPollutants = (params = {}) => {
  return getHttp({
    url: apiConfig.waterQuality.SurfaceKAverageConcentrationPollutants,
    params: {
      ...params
    }
  })
}

/**
 * 演示面,剖面面，污染物平均浓度
 */
export const SurfaceMAverageConcentrationPollutants = (params = {}) => {
  return getHttp({
    url: apiConfig.waterQuality.SurfaceMAverageConcentrationPollutants,
    params: {
      ...params
    }
  })
}

/**
 * 演示面,水平面,浓度分布变化(最大最小值)
 */
export const SurfaceKConcentrationDistributionChange = (params = {}) => {
  return getHttp({
    url: apiConfig.waterQuality.SurfaceKConcentrationDistributionChange,
    params: {
      ...params
    }
  })
}

/**
 * 演示面,剖面,浓度分布变化(最大最小值)
 */
export const SurfaceMConcentrationDistributionChange = (params = {}) => {
  return getHttp({
    url: apiConfig.waterQuality.SurfaceMConcentrationDistributionChange,
    params: {
      ...params
    }
  })
}

/**
 * 湖中点水质，重要点污染物浓度时间序列
 */
export const LakePointTimeSeriesPollutantConcentration = (params = {}) => {
  return getHttp({
    url: apiConfig.waterQuality.LakePointTimeSeriesPollutantConcentration,
    params: {
      ...params
    }
  })
}

/**
 * 湖中点，污染因子浓度同比
 */
export const PollutionPointConcentrationPreviousYear = (params = {}) => {
  return getHttp({
    url: apiConfig.waterQuality.PollutionPointConcentrationPreviousYear,
    params: {
      ...params
    }
  })
}

/**
 * 湖中点，影响河流排名
 */
export const ContributionRiverTPCentralStationPoint = (params = {}) => {
  return getHttp({
    url: apiConfig.waterQuality.ContributionRiverTPCentralStationPoint,
    params: {
      ...params
    }
  })
}
