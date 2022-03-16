import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PageOne from "../components/PageOne.vue";
import PageTwo from "../components/PageTwo.vue";
import MapInit from "../components/MapInit.vue";
import Index from "../components/Index.vue";

Vue.use(VueRouter);
// vue-router动态构建导航菜单
const routes = [
  {
    path: "/",
    name: "数据加载",
    component: Index,
    // redirect:"/PageOne",
    children: [
      {
        path: "/PageOne",
        name: "Portal数据",
        component: PageOne,
      },
      {
        path: "/PageTwo",
        name: "URL数据",
        component: PageTwo,
      },
      {
        path: "/",
        name: "本地矢量",
        component: PageOne,
      },
      {
        path: "/",
        name: "倾斜摄影",
        component: PageTwo,
      },
      {
        path: "/MapInit",
        name: "点云数据",
        component: PageTwo,
      },
    ],
  },
  // {
  //   path: "/",
  //   name: "基本操作",
  //   component: Home,
  //   children: [
  //     {
  //       path: "/",
  //       name: "定位",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "3D绘制",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "3D量测",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "几何查询",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "屏幕截图",
  //       component: Home,
  //     },
  //   ],
  // },
  // {
  //   path: "/PageOne",
  //   name: "空间分析",
  //   component: PageOne,
  //   children: [
  //     {
  //       path: "/",
  //       name: "视线分析",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "视域分析",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "建筑剖切",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "高程剖面",
  //       component: Home,
  //     },
  //   ],
  // },
  // {
  //   path: "/Index",
  //   name: "三维模拟",
  //   component: Index,
  //   component: PageOne,
  //   children: [
  //     {
  //       path: "/",
  //       name: "日照分析",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "天气-雨",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "天气-雪",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "水波纹",
  //       component: Home,
  //     },
  //   ],

  // },
  // {
  //   path: "/PageOne",
  //   name: "三维漫游",
  //   component: PageOne,
  //   children: [
  //     {
  //       path: "/",
  //       name: "360环视",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "路径漫游",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "地上地下",
  //       component: Home,
  //     },
  //     {
  //       path: "/",
  //       name: "位置参数",
  //       component: Home,
  //     },
  //   ],
  // },
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
