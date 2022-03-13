<template>
<el-container>
  <el-header>三维WebGIS功能展示系统(易智瑞版)</el-header>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside style="width: 15%;">
        <el-menu @select="handleSelect" router :default-openeds="['0','1']">
        <el-submenu v-for="(item1,index1) in $router.options.routes" :index="index1">
            <template slot="title">{{item1.name}}</template>
            <el-menu-item v-for="(item2,index2) in item1.children" :index="item2.path" :class="$route.path == item2.path ? 'is-active':''">{{item2.name}}</el-menu-item>
        </el-submenu>
    </el-menu>
    </el-aside>
    <el-main>
        <!-- <MapInit></MapInit> -->
        <router-view></router-view>
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
    
    /* height: 80vh; */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 70vh

  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>