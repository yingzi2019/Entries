import { Promise } from 'es6-promise'

// 将查询字符串参数拼接URL中
function processQuery (params) {
  let queryStr = ''
  for (let key of Object.keys(params)) {
    queryStr += `&${key}=${params[key]}`
  }
  queryStr = encodeURI(encodeURI(queryStr))
  return queryStr
}

// ie9中发起ajax请求
export function funcFetchIE9 (url, options = {}, params = {}) {
  if (window && window.XDomainRequest) {
    let date = Date.now()
    let query = url.split('?')
    if (query.length > 1) {
      url = url + '&c_ts=' + date
    } else {
      url = url + '?c_ts=' + date
    }
    url += processQuery(params)
    // debugger
    return new Promise((resolve, reject) => {
      const method = options.method || 'GET'
      const timeout = options.timeout || 100000
      let data = options.body || options.params || {}
      if (data instanceof Object) {
        data = JSON.stringify(data)
      }
      const XDR = new XDomainRequest()
      XDR.open(method, url)
      XDR.timeout = timeout
      XDR.onload = function () {
        try {
          const jsonData = JSON.parse(XDR.responseText)
          resolve(jsonData)
        } catch (e) {
          reject(e)
        }
        reject(new Error({}))
      }
      XDR.ontimeout = () => {
        reject(new Error('XDR timeout'))
      }
      // XDR.onsuccess = function () {
      //   alert('SUCCESS')
      //   alert(XDR.responseText)
      // }
      // XDR.ONERROR = function () {
      //   alert('ERR')
      //   alert(XDR.responseText)
      // }
      // XDR.onprogress = function () {
      //   alert('进度')
      //   alert(XDR.responseText)
      // }
      XDR.send(data)
      // console.log('send-->data', data)
    })
  }
}

// 防抖函数
export function debounce (func, delay = 500, ...args) {
  let timer = null
  return function () {
    let context = this

    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}

// 节流函数
export function throttle (func, delay = 500) {
  let flag = false

  return (that) => {
    if (flag) return

    flag = true
    setTimeout(function () {
      // console.log(that)
      func.apply(that)
      // console.log(that)
      flag = false
    }, delay)
  }
}
