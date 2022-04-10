<!--
 * @Author: luobr
 * @Date: 2022-04-04 20:11:22
 * @LastEditors: luobr
 * @LastEditTime: 2022-04-10 21:08:57
 * @Description: 
-->
<template>
<div class="main">
<el-container>
  <el-header style="font-size: 20px Extra large;font-family: 'Helvetica Neue';">三维WebGIS功能demo(易智瑞版)</el-header>
  <el-container>
    <el-aside style="width: 15%;">
      <el-menu router >
         <AsideMenu :treeData="treeData"></AsideMenu>      
         <!--<component :is="curComponent"></component> -->
      </el-menu>
    </el-aside>
    <el-main style="padding:0px">
        <BaseMap></BaseMap>
    </el-main>
  </el-container>
  <el-footer style="height:30px"></el-footer>
</el-container>
</div>
</template>

<script>
import BaseMap from "./BaseMap.vue"
import AsideMenu from "./widgets/AsideMenu.vue";
import treeData from "../mook/index.json";//模仿后台接口造的数据

export default {
    components: {
        BaseMap,
        AsideMenu
    },
    
    data() {
        return {
          treeData,
        }
    },
    mounted(){
      console.log("treeData:",this.treeData)
      // showWidgets(){
      //   var _this=this;
      //     // _this.curComponent = require(`@/widgets/${val.funcInvokeUrl}/index.vue`).default;
      //   }
      
    },
    methods: {

      
    }
}
</script>

<style>
 .main,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;  
    color: #333;
    text-align: center;
    /* line-height: 200px; */
    overflow: inherit;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 70vh */
    padding: 0px;
  }
    
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
    
  }
</style>