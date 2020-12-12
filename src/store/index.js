import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 取数据
    // user: null
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 存数据
      setItem(TOKEN_KEY, state.user)
      // 为了防止刷新丢失，我们需要把数据备份到本地存储
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
    }
    // getUser(state, TOKEN_KEY) {
    //   state.user = getItem(TOKEN_KEY)
    // }
  },
  actions: {},
  modules: {}
})
