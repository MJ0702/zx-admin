import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    page_list:{
        id:localStorage.getItem("id") || null,
        page:null,    //后端需要参数
        rows:null,    //后端需要参数
        title:'',     //搜索标题
        currentPage: 1, //当前页
        pageSize:10,     //每页设置数量
        listNum:1,      //分页总条数
        tableData: [],   //分页数据
        page_show:true,  //显示页码栏
        error_show:false,  //404页面
        fullscreenLoading:false //关闭loading
    },
  },
  mutations:{
    //改变分页数据列表参数
    change_page_list(state,obj){
        state.page_list.page = obj.page;
        state.page_list.rows = obj.rows;
    },
    //改变当前的列表选择id
    change_id(state,obj){
        localStorage.setItem('id',obj.id); //将传递的数据先保存到localStorage中
        state.page_list.id = obj.id;
    },
    //改变分页的总数
    change_page_params(state,listNum){
        state.page_list.listNum = listNum;
    },
    //改变tableData
    change_tableData_list(state,obj){
        state.page_list.tableData = obj;
    },
  },
  actions:{
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