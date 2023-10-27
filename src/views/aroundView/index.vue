<!--
 * @Author: luobr
 * @Date: 2022-04-12 23:06:17
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-27 16:02:21
 * @Description: 360 环视
-->
<template>
  <div>
    <el-button round type="primary" @click="startView">开始环视</el-button>
    <el-button round type="danger" @click="stopView">停止环视</el-button>
  </div>
</template>

<script>
let map, view;
let intervalId  = null;
let i = 0;
export default {
  name: "aroundView",
  props: {},
  data() {
      return {
        isViewing: false, // 管理环视的状态
        x0: 86.859291,
        y0: 28.143449,
        R: 0.02, //旋转半径，1度代表110公里
        X1: null,
        Y1:null,
      }
  },
  beforeMount(){
    
  },
  mounted() {
    view = ArcCIM.view;
    map = view.map;
  },
  beforeDestroy(){

  },
  destroyed(){ 
    clearInterval(intervalId);
  },
  methods: { 
    /**
     * @Author: luobr
     * @description: 开始环视
     * @return {*}
     */    
    startView() {
      if (!this.isViewing) {
        this.isViewing = true;
        if(i >= 360) {
          i=0;
        }
        this.rotateView();
      }
    },
    /**
     * @Author: luobr
     * @description: 停止环视
     * @return {*}
     */    
    stopView() {
      this.isViewing = false;
      clearInterval(intervalId);
    },  
    /**
     * @Author: luobr
     * @description: 环视的核心方法
     * @return {*}
     */    
    rotateView() {
      intervalId = setInterval(() => {
        i = i + 1; // 每次变换角度值
        if (i >= 360) {
          this.stopView();
          return;
        }
        this.X1 = this.x0 + this.R * Math.cos(((360 - i) * Math.PI) / 180);
        this.Y1 = this.y0 + this.R * Math.sin(((360 - i) * Math.PI) / 180);
        view.goTo({
          heading: 360 - i, // 方向角
          lng: this.X1, // 经度
          lat: this.Y1, // 维度
          altitude: 80000, // 高程
        });
      }, 100); // 毫秒
    },
  }
}
</script>