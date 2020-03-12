
var publicAppConfig = {
  /**
   * 是否使用环境变量来区分Api的host地址
   */
  isUseENVWay: false,
  /**
   * 是否使用网关
   */
  isUseGateWare: false,
  /**
  * 网关地址
  */
  gatewayAddress: '',

  /** 不启用网关时配置模块host地址 */
  hostConfig: {
    writeHost: {
      admin: 'http://192.168.0.131:5066',
      // home: 'http://5066.gr3ecaff.qrwsp8yu.b6677a.grapps.cn',
      home: 'http://5066.gr6decb3.fhmpsbz4.8e9bcb.grapps.cn',
      waterQuality: 'http://5066.gr6decb3.fhmpsbz4.8e9bcb.grapps.cn'
    }
  },
  videoSrc: 'http://192.168.0.119:80/plane/巡湖2.mp4',
  /** 配置业务localStorage的key值 */
  localStorageKey: {
    userInfo: 'userInfo', // 获取用户信息
    permissionIds: 'permissionId' // 获取当前用户权限id集合
  },
  /** 配置cookie或者session过期后跳转的登录页面 */
  loginUrl: '',
  /**
  * 请求超时的毫秒数
  */
  httpClientTimeout: 20000
}

localStorage.setItem('videoSrc', publicAppConfig.videoSrc)
localStorage.setItem('publicAppConfig', JSON.stringify(publicAppConfig))
