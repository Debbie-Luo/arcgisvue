<!--
 * @Author: luobr
 * @Date: 2022-03-07 22:01:33
 * @LastEditors: luobr
 * @LastEditTime: 2022-04-10 14:14:56
 * @Description: 
-->
<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>
<script>
    export default {
        data() {
            return {
            };
        },
        methods: {

        }
    }
</script>

<style lang="scss">
 html,body,#app{
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
