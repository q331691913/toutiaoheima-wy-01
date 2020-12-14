// import dayjs from 'dayjs'
// // dayjs 默认是英文 我们配置为中文
// import 'dayjs/locale/zh-cn'

// import relativeTime from 'dayjs/plugin/relativeTime'
// // dayjs().format('YYYY-MM-DD')
// dayjs.extend(relativeTime)
// // dayjs().to(dayjs('2015')) //多少年以内
// //定义一个全局过滤器
// Vue.filter('relativeTime', value => {
//   console.log(value);
//   return dayjs().to(dayjs(value))
// })
import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// 配置使用中文语言包
dayjs.locale('zh-cn')

// 全局过滤器：处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
