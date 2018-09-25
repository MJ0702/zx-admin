// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.HOST = 'zxiao'
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
//跳转路由顶部加载条监听
router.beforeEach((to, from, next) => {
	NProgress.start();
	next()
});
router.afterEach(transition => {
  setTimeout(function() {
    NProgress.done(); 
  }, 300);
  // window.scrollTo(0,0);  //路由切换时返回页面顶部
});