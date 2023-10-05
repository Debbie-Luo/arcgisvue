/*
 * @Author: luobr
 * @Date: 2022-03-07 22:01:33
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-06 02:29:48
 * @Description: 
 */

import Vue from "vue";
import VueRouter from "vue-router";
import treeData from "@/utils/treeData.js";
Vue.use(VueRouter);

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};


// vue-router动态构建导航菜单
const routes = [
  {
      path: "/",
      name: "视图加载",
      component: ()=>import('../views/loadPortal'),//懒加载方式
      children:[],
      redict:'/index'
  },
];
// 动态生成路由数据
treeData.map(({children})=>{
  children.map(({path,name,component})=>{
     routes.push({
      path,
      name,
      component:()=>import(`../views/${component}`)
    })
  })
})


// 路由拦截



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


export default router;
