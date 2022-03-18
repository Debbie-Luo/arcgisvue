<template>
<el-container>
  <el-header style="font-size: 20px Extra large;font-family: 'Helvetica Neue';">三维WebGIS功能demo(易智瑞版)</el-header>
  <el-container>
    <el-aside style="width: 15%;">
        <el-menu @select="handleSelect" router :default-openeds="['1']">
        <el-submenu v-for="(item1,index1) in $router.options.routes" :key="index1" :index="index1+''">
            <template slot="title">{{item1.name}}</template>
            <el-menu-item v-for="(item2,index2) in item1.children" :key="index2" :index="item2.path+''" :class="$route.path == item2.path ? 'is-active':''">{{item2.name}}</el-menu-item>
        </el-submenu>
    </el-menu>
    </el-aside>
    <el-main style="padding:0px">
        <MapInit></MapInit>
    </el-main>
  </el-container>
  <el-footer style="height:30px"></el-footer>
</el-container>
    
</template>

<script>
import MapInit from "./MapInit.vue"
    export default {
        components: {
            MapInit
        },
        data() {
            return {
                activeIndex: '1',
                // activeIndex2: ['1']
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
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