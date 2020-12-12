// import axios from 'axios'

// const request = axios.create({
//   baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
// })

// export default request
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器
request.interceptors.request.use(
  function(config) {
    // 请求发起会经过这里 config:本次请求配置对象
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // 注意：这里务必返回config配置对象
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
export default request
