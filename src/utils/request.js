// import axios from 'axios'

// const request = axios.create({
//   baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
// })

// export default request
import axios from 'axios'
import store from '@/store'
// 使用JSONBig的时候要把他的对象里面的数据转化为字符串来使用
import JSONBig from 'json-bigint'
// const jsonStr = '{ "art_id": 1245953273786007552 }'
// console.log(JSONBig.parse(jsonStr)) // 把 JSON 格式的字符串转为 JavaScript 对象
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',

  transformResponse: [
    function(data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return JSONBig.parse(data)
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data
        }
      }
    }
  ]
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
