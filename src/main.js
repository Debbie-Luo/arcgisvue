/*
 * @Author: luobr
 * @Date: 2022-03-07 22:01:33
 * @LastEditors: luobr
 * @LastEditTime: 2022-04-10 13:30:54
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css

var ArcCIM = window.ArcCIM;
//使用elementUI
Vue.use(ElementUI) 

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
