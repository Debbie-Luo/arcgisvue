<!--
 * @Author: luobr
 * @Date: 2022-04-04 20:11:22
 * @LastEditors: luobr
 * @LastEditTime: 2022-04-10 13:18:37
 * @Description: 
-->
<template>
<el-container>
  <el-header style="font-size: 20px Extra large;font-family: 'Helvetica Neue';">三维WebGIS功能demo(易智瑞版)</el-header>
  <el-container>
    <el-aside style="width: 15%;">
        <AsideMenu></AsideMenu>
    </el-aside>
    <el-main style="padding:0px">
        <Base></Base>
    </el-main>
  </el-container>
  <el-footer style="height:30px"></el-footer>
</el-container>
    
</template>

<script>
import Base from "./Base.vue"
import AsideMenu from "./widgets/AsideMenu.vue"
    export default {
        components: {
            Base,
            AsideMenu
        },
        data() {
            return {
            };
        },
        methods: {
        }
    }
</script>

<style>
 html,body,#app,.el-container{
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
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 70vh */
    padding: 0px;
  }
  
  /* body > .el-container {
    margin-bottom: 40px;
    height:100%;
  } */
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
    
  }
</style>