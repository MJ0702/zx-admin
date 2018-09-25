import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{

  }
  ,mutations:{

  }
  ,actions:{
    //获取分页数据列表
    getPageList({ commit, state, getters, rootGetters }){
      return axios.get('/zxiao/API/findZxiaoAll', {  //axios本身就直接可以调用promise方法
          params: {
              page:1,
              rows:10
          }
      }).then(res => res.data)  //返回异步获得的数据
  },
  }
})