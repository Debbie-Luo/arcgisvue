/*
 * @Author: luobr
 * @Date: 2022-03-07 22:01:33
 * @LastEditors: luobr
 * @LastEditTime: 2022-04-12 22:51:25
 * @Description: 
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// vue-router动态构建导航菜单
const routes = [
  {
      path: "/",
      name: "视图加载",
      component: ()=>import('../components/Index.vue'),//懒加载
      children:[]
  },
  
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
