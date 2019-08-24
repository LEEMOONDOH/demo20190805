/*
* @description: Vuex插件，负责状态管理
* @author: Dylan(2102028233@qq.com)
* @since: 2019年8月24日 12点57分
* @modify: 2019年8月24日 13点57分
*/
import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  }
})
export default store
