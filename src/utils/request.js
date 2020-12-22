import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/', // 接口的基准路径
  transformResponse: [
    function(data) {
      try {
        return JSONbig.parse(data)
      } catch (err) {
        // 非 JSON 格式的字符串，直接返回即可
        return data
      }
    }
  ]
})
const requestToken = axios.create()
// 请求拦截器
request.interceptors.request.use(
  config => {
    const { user } = store.state
    // console.log(store.state)
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  error => {
    // 如果请求出错了（还没发出去）
    return Promise.reject(error)
  }
)
request.interceptors.response.use(
  function(response) {
    return response
  },
  async function(error) {
    if (status === 400) {
      Toast.fail('无效的Token')
    } else if (status === 401) {
      const { user } = store.state
      if (!user || user.refresh_token) {
        return router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
      try {
        const { data } = await requestToken({
          method: 'PUT',
          url: '/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        user.token = data.data.token
        store.commit('setUser', user)
        return request(error.config)
      } catch (err) {
        // 换取token的时候出错了
        Toast.fail('无效的Token')
        return router.replace({
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
      }
    } else if (status === 403) {
      Toast.fail('客户没有权限')
    } else if (status === 404) {
      Toast.fail('请求的资源不存在')
    } else if (status === 405) {
      Toast.fail('请求方法不支持')
    } else if (status >= 500) {
      Toast.fail('服务器抽风了')
    }
    return Promise.reject(error)
  }
)

export default request
