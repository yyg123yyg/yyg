import Vue from "vue";
import Vuex from 'vuex'

import mutations from './mutations';
import actions from "./actions";
import getters from "./getters";
//安装插件
Vue.use(Vuex)
//创建store对象
const state={
  cartList: [],
  // 是否开启请求加载
  isLoading: true
}
const store = new Vuex.Store({
  state:state,
  mutations,
  //异步操作和判断操作
  actions,
  getters
})

//挂在对象
export default store
