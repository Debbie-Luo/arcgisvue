/*
 * @Author: luobr
 * @Date: 2022-03-07 22:01:33
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-03 13:27:57
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
// 全局引入esri-loader
import { loadCss, setDefaultOptions, loadModules } from "esri-loader";


Vue.prototype.$loadModules = loadModules;
// 加载离线地图
// 这里暂时先用在线资源
// setDefaultOptions({url: 'http://localhost/arcgis_js_api/4.22/init.js'})
loadCss('https://js.arcgis.com/4.27/esri/themes/light/main.css');

window.ArcCIM = {};
//使用elementUI
Vue.use(ElementUI) 
// 生产模式
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
