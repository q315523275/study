/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request'
import { notification, Icon, Button } from 'antd'
import router from 'umi/router'
import Tools from '@/utils/tools'


const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  // 401: '用户没有权限（令牌、用户名、密码错误）。',
  401: '用户登录已过期，请重新登录',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}
/**
 * 异常处理程序
 */

const errorHandler = (error) => {
  const { response = {} } = error
  const errortext = codeMessage[response.status] || response.statusText
  const { status, url } = response
  const key = 'error'
  if (parseInt(status, 10) === 401) {
    notification.open({
      key,
      message: errortext,
      // description: '10秒后将跳到登录页面',
      // duration: 10,
      duration: null,
      icon: <Icon type="close-circle" style={{ color: 'red' }} />,
      btn: <Button onClick={() => {
        notification.close(key)
        Tools.loginOut()
        router.push('/login')
      }}
      >重新登录
      </Button>,
    })
    setTimeout(() => {
      notification.close(key)
      Tools.loginOut()
      router.push('/login')
    }, 10000)
  } else {
    notification.open({
      message: `请求错误 ${status}`,
      description: errortext,
      duration: null,
      icon: <Icon type="close-circle" style={{ color: 'red' }} />,
      btn: <Button
        type="primary"
        size="small"
        onClick={() => { window.location.reload() }}
      >刷新页面
      </Button>,
    })
  }
}
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  // getResponse: true,
  errorHandler,
  // 默认错误处理
  prefix: 'http://47.114.151.211:8081',
  credentials: 'include', // 默认请求是否带上cookie
})

request.interceptors.request.use((url, { headers }) => {
  if (!url.includes('/api/admin/user/login')) {
    headers.Authorization = `Basic ${localStorage.getItem('token')}`
  }


  // return { url: handUrl }
  // return { url }
})

const isRepeat = {}
const promiseFun = (method, url, params = {}, needCode = false, resolve, reject) => {
  if (isRepeat[url]) {
    return
  }
  isRepeat[url] = true
  request[method](url, { data: params }).then((res) => {
    const { success, data } = res
    delete isRepeat[url]
    if (needCode) {
      resolve(res)
    } else if (success) {
      resolve(data)
    }
    // else {
    //   reject(data)
    // }
  }).catch((e) => {
    console.log(e)
  })
}

export default class Https {
  static get(url, params = null, needCode) {
    return new Promise((resolve, reject) => {
      if (!params) { promiseFun('get', url, params, needCode, resolve, reject); return }
      let handleUrl = ''
      for (const key in params) {
        if (handleUrl !== '') {
          handleUrl += '&'
        }
        if (params[key] instanceof Object) {
          handleUrl += `${key}=${encodeURIComponent(JSON.stringify(params[key]))}`
        } else {
          handleUrl += `${key}=${encodeURIComponent(params[key])}`
        }
      }
      if (params.needId) {
        promiseFun('get', `${url}/${params.needId}${params.needEnd || ''}?${handleUrl}`, params, needCode, resolve, reject)
        return
      }
      promiseFun('get', `${url}${params.needEnd || ''}?${handleUrl}`, params, needCode, resolve, reject)
    })
  }

  static post(url, params, needCode) {
    if (params.needId) {
      return new Promise((resolve, reject) => {
        promiseFun('post', `${url}/${params.needId}${params.needEnd || ''}`, params, needCode, resolve, reject)
      })
    }
    return new Promise((resolve, reject) => {
      promiseFun('post', url, params, needCode, resolve, reject)
    })
  }

  static delete(url, params, needCode) {
    if (params.needId) {
      return new Promise((resolve, reject) => {
        promiseFun('delete', `${url}/${params.needId}`, params, needCode, resolve, reject)
      })
    }
    return new Promise((resolve, reject) => {
      promiseFun('delete', url, params, needCode, resolve, reject)
    })
  }

  static put(url, params, needCode) {
    if (params.needId) {
      return new Promise((resolve, reject) => {
        promiseFun('put', `${url}/${params.needId}`, params, needCode, resolve, reject)
      })
    }
    return new Promise((resolve, reject) => {
      promiseFun('put', url, params, needCode, resolve, reject)
    })
  }
}
