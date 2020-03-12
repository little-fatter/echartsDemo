import { getHttp } from '@/utils/apiRequest'
import apiConfig from '@/config/api.config'

export const getToken = () => {
  return getHttp({
    url: apiConfig.superApi.getToken
  })
}

export const getUrl = (token) => {
  return getHttp({
    url: apiConfig.superApi.getUrl,
    params: {
      token
    }
  })
}
