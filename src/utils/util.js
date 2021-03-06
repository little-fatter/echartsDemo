export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')))
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要去KTV', '我猜你可能累了']
  const index = Math.floor((Math.random() * arr.length))
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

/**
 * 关闭加载动画
 * @param id
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * 返回字符串的实际字符长度
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
 * 返回指定长度的字符串的实际字符长度
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}

/**
 * 清理空值，对象
 * @param children
 * @returns {*[]}
 */
export function filterEmpty (children = []) {
  return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
}

/**
 * 设置网站的Title
 * @param {*} title
 */
export const setDocumentTitle = (title) => {
  document.title = title
}

// 设置APP的头
export const setAppTitle = (sysName, sysVerison) => {
  let title
  const whitespace = ' '
  if (sysName.includes('V') || sysName.includes('v')) {
    title = sysName
  } else if (sysVerison.includes('V') || sysVerison.includes('v')) {
    title = `${sysName}${whitespace}${sysVerison}`
  } else {
    title = `${sysName}${whitespace}v${sysVerison}`
  }
  setDocumentTitle(title)
}

/**
 * 判断js对象为空
 */
export const isEmpty = (value) => {
  return (value === null || value === undefined || value === '' || value === {} || value === [] || value.length === 0)
}

/**
* 判断js对象不为空
*/
export const isNotEmpty = (value) => {
  return !isEmpty(value)
}

/**
 * 对数组分页，返回新数组
 * @param {*} pageNo 当前页码，从1开始
 * @param {*} pageSize 分页大小
 * @param {*} array 数组
 */
export const paginationForArray = (pageNo, pageSize, array) => {
  var offset = (pageNo - 1) * pageSize
  return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize)
}

/**
 * 嵌套JSON数组转平级
 */
export const setJsonArray = (data, subParam = 'children') => {
  let result = []
  data.forEach(json => {
    if (json) {
      if (isNotEmpty(json[subParam])) {
        result = result.concat(setJsonArray(json[subParam]))
      }
      result.push(json)
    }
  })
  return result
}

/**
 * 将平级JSON数组转嵌套树
 * @param {*} data
 * @param {*} parentId
 * @param {*} subParam
 * @param {*} dataId
 */
export const setCommonJsonArrayNest = (data, parentId = '0', subParam = 'children', dataId = 'menuId') => {
  const result = []; let temp
  if (data) {
    data.forEach(json => {
      if (json.ParentId === parentId) {
        temp = setCommonJsonArrayNest(data, json[dataId], subParam, dataId)
        if (isNotEmpty(temp)) {
          json[subParam] = temp
        }
        result.push(json)
      }
    })
  }
  return result
}

/**
 * 通用根据层级Level把平级JSON数组转嵌套树
 * @param {*} data
 * @param {*} parentId
 * @param {*} subParam
 * @param {*} dataId
 * @param {*} leveParam
 */
export const convertArrayToTreeJson = (data, parentId = '0', subParam = 'children', dataId = 'menuId', leveParam = 'menuLevel') => {
  const result = []
  if (data) {
    const rootParentIds = findRootParentIds(data, leveParam)
    if (rootParentIds.length > 0) {
      for (const rootParentId of rootParentIds) {
        const tempResultArray = setCommonJsonArrayNest(data, rootParentId, subParam, dataId)
        for (const tempResult of tempResultArray) {
          result.push(tempResult)
        }
      }
    }
  }
  return result
}

/**
 * 根据平级JSON数组和Level字段名获取RootParentIds
 * @param {*} data
 * @param {*} leveParam
 */
const findRootParentIds = (data, leveParam) => {
  const rootParentIds = []
  let minLevel
  let isFirst = true
  for (const item of data) {
    const levelData = parseInt(item[leveParam])
    if (isNaN(levelData)) {
      continue
    } else {
      if (isFirst) {
        minLevel = levelData
        isFirst = false
      } else if (minLevel > levelData) {
        minLevel = levelData
      }
    }
  }
  if (isNotEmpty(minLevel)) {
    const dataByMinLevel = data.filter(item => parseInt(item[leveParam]) === minLevel)
    for (const dataItem of dataByMinLevel) {
      const parentId = dataItem.ParentId
      if (!rootParentIds.includes(parentId)) {
        rootParentIds.push(parentId)
      }
    }
  }
  return rootParentIds
}

/**
 * 设置父页面域名
 */
const SourceDomain = '*'

/**
 * 获取IframeHeight的高度
 */
export const getIframeHeight = () => {
  return document.documentElement.clientHeight - 100
}

// 当请求token过期通知框架注销当前用户(外部模块子页面使用)
export const logoutPost = () => {
  const json = {
    type: 'logout'
  }
  if (window.parent) {
    window.parent.postMessage(json, SourceDomain)
  }
}
/**
 * 外模模块根节点挂载时通知主框架其已准备好了，可以传递当前用户给我了
 */
export const childClientReadyStatePost = () => {
  const json = {
    type: 'childClientReadyState',
    data: {
      isReady: true
    }
  }
  if (window.parent) {
    window.parent.postMessage(json, SourceDomain)
  }
}

/**
* 登录后传递当前用户
* @param {*} currentUser 包含 {access_token,isSuperAdmin,permissions}
*/
export const loginPost = (currentUser) => {
  const json = {
    type: 'login',
    data: {
      currentUser
    }
  }
  if (window.frames && window.frames.length > 0) {
    console.log('currentUser', currentUser)
    window.frames[0].postMessage(json, SourceDomain)
  }
}

/**
* 注册PostMessage事件
* @param {*} receivePostMessageFunc 接受数据方法
*/
export const createPostMessageEvent = (receivePostMessageFunc) => {
  const receiveMessageFromIndex = function (event) {
    if (event !== undefined && event.data && event.data.type) {
      receivePostMessageFunc(event)
    }
  }

  // 监听message事件
  if (window.addEventListener) {
    window.addEventListener('message', receiveMessageFromIndex, false)
  } else if (window.attachEvent) {
    window.attachEvent('onmessage', receiveMessageFromIndex)
  }
}

export function dateFormat (fmt, date) {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    };
  };
  return fmt
}

export function markLineData (data) {
  var coverData = []
  var color = ['#0000ff', '#03f379', '#eff303', '#f39e03', '#f30303']
  data.forEach((item, index) => {
    coverData.push({
      yAxis: item.value,
      lineStyle: {
        color: color[index]
      },
      label: {
        formatter: item.title
      }
    })
  })
  return coverData
}

export const chartColors = ['#ffffff', '#03f379', '#eff303', '#f39e03', '#f30303']

export function coverTime (date) {
  var time = new Date()
  var year = time.getFullYear()
  var month = time.getMonth() + 1
  var day = time.getDay()
  return `${year}月${month > 9 ? month : '0' + month}月${day}日`
}
