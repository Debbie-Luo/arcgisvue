<!--
 * @Author: luobr
 * @Date: 2022-03-07 22:01:33
 * @LastEditors: luobr
 * @LastEditTime: 2022-04-10 16:44:30
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
</style>
