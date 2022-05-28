<!--
 * @Author: luobr
 * @Date: 2022-04-04 20:11:22
 * @LastEditors: luobr
 * @LastEditTime: 2022-04-12 23:57:02
 * @Description: 
-->
<template>
<div class="main">
<el-container>
  <el-header style="font-size: 20px Extra large;font-family: 'Helvetica Neue';">三维WebGIS功能demo(易智瑞版)</el-header>
  <el-container>
    <el-aside style="width: 15%;">
      <el-menu :default-active="activeIndex" @select="handleSelect" router>
         <AsideMenu :treeData="treeData"></AsideMenu>      
         <!--<component :is="curComponent"></component> -->
      </el-menu>
    </el-aside>
    <el-main style="padding:0px">
        <BaseMap></BaseMap>
        <!-- <div class="cardBox"> -->
          <!-- <router-view></router-view> -->
          <!-- </div> -->
    </el-main>
  </el-container>
  <el-footer style="height:30px"></el-footer>
</el-container>
</div>
</template>

<script>
import BaseMap from "./BaseMap.vue"
import AsideMenu from "./widgets/AsideMenu.vue";
import treeData from "../mock/index.json";//模仿后台接口造的数据

export default {
    components: {
        BaseMap,
        AsideMenu
    },
    
    data() {
        return {
          treeData,
          activeIndex:null,
        }
    },
    mounted(){
      // console.log(this.activeIndex);
      console.log("treeData:",this.treeData)
      this.activeIndex = this.$route.path.substring(1,this.$route.path.length);
      console.log(this.activeIndex);
      // showWidgets(){
      //   var _this=this;
      //     // _this.curComponent = require(`@/widgets/${val.funcInvokeUrl}/index.vue`).default;
      //   }
      
    },
    methods: {
      handleSelect(index,keyPath){
        console.log("11:",index,keyPath)
        //PortalLoad 当前的index
        // ['002acb27-e463-4e52-a185-e0b3a77462f1', '/PortalLoad'] //上一级的index和当前的index
      }
      
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
    
  .cardBox{
    /* background-color: red; */
    /* position:absolute; */
    position: fixed;
    z-index:1;
    width:300px;
    height:100px;
    bottom:20%;
    left:20%;
    border:1px solid blue;
    background-color:#FFFFFF;
  }  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
    
  }
</style>