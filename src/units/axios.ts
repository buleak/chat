// import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'
import { baseURL } from './config.default'

axios.defaults.timeout = 3600000 * 24
axios.defaults.baseURL = (baseURL as string)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const codeMessage:any = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};
const returnLoginPage = () => {
  if (window.location.href === '/login') {
    return false;
  }
  // 携带当前页面路径跳转到登录页面，登录成功后返回当前页面
  localStorage.removeItem('[token]')
  window.location.href = '/login'
}
// 请求拦截
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = localStorage.getItem('[token]');
    if (token) {
      // console.log('token >>', token)
      config.headers.Authorization = `Bearer ${token}` // 不能直接设置值为 token，需要在前面加上 Bearer+空格       
    }
    return config;
  },
  error => Promise.reject(error)
)

// 响应拦截
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // console.log('error >>', error)
    console.log('errorText >>', codeMessage[error.response.status])

    if (error.response.status) {
      switch (error.response.status) {
        case 400:
          break;
        case 401: 
          message.info('INFO: 您尚未登录[401]')
          returnLoginPage()
          break;
        case 403: 
          message.warn('WARN: 登录凭证过期[403]')
          returnLoginPage()
          break;
        case 404:
          message.error('ERROR: 网络请求不存在[404]')
          break;
        case 405:
          break;
        case 408:
          break;
        case 500:
          message.error('ERROR: 服务器端出错[500]')
          break;
        case 501:
          break;
        case 502:
          break;
        case 503:
          break;
        case 504:
          break;
        default:
          message.error(`ERROR: ${error.response.message}`)
      }
      return Promise.reject(error.response)
    } else {
      message.error('ERROR: 未发现 error status')
    }
  }
)

/**
 * axios的 get请求方法
 * @param url 请求的URL地址
 * @param params 请求时携带的参数
 */
export const get = (url: string, params?: any) => {
  return new Promise((resolve, reject) => {
    console.log(`GET[${url}] params >>`, params)
    axios.get(url, {
      params
    }).then(res => {
      console.log(`GET[${url}] resolve >>`, res)
      resolve(res.data)
    }).catch(err => {
      console.log(`GET[${url}] reject >>`, err)
      reject(err.data)
    })
  })
}

/**
 * axios的 post请求方法
 * @param url 请求的URL地址
 * @param params 请求时携带的参数
 */
export const post = (url: string, params: any) => {
  return new Promise((resolve, reject) => {
    console.log(`POST[${url}] params >>`, params)
    axios.post(url, {
      ...params
    }).then(res => {
      console.log(`POST[${url}] resolve >>`, res)
      resolve(res.data)
    }).catch(err => {
      console.log(`POST[${url}] reject >>`, err)
      reject(err.data)
    })
  })
}

/**
 * axios的并发请求
 * @param axiosList axios请求列表
 */
export const all = (axiosList: object[]) => {
  return new Promise((resolve, reject) => {
    axios.all(axiosList).then(axios.spread((acct, perms) => {
      // 所有 axiosList内的请求结束后执行
      console.log('axios spread >>', acct, perms)
      resolve({ acct, perms })
    })).catch(error => {
      reject(error)
    })
  })
}
