<!--
 * @Author: luobr
 * @Date: 2022-04-04 20:11:22
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-03 02:33:59
 * @Description: 
-->
<template>
  <div class="main">
    <el-container>
      <headerMenu></headerMenu>
      <el-container>
        <el-aside style="width: 15%;">
          <el-menu :default-active="activeIndex" @select="handleSelect" router>
            <sideMenu :treeData="treeData"></sideMenu>
          </el-menu>
        </el-aside>
        <el-main class="main-container">
          <div class="map-container">
            <baseMap @mapLoaded="handleMapLoaded"></baseMap>
          </div>
          <div class="content-container">
            <router-view v-if="isMapLoaded"></router-view>
          </div>
        </el-main>
      </el-container>
      <el-footer style="height:30px"></el-footer>
    </el-container>
  </div>
</template>

<script>

import treeData from "../utils/treeData.js";//模仿后台接口造的数据
import index from './js/index';


export default {
  components: {
    ...index
  },

  data() {
    return {
      treeData,
      activeIndex: null,
      isMapLoaded: false,
    }
  },
  mounted() {
    this.activeIndex = this.$route.path.substring(1, this.$route.path.length);
    console.log(this.activeIndex);
    // showWidgets(){
    //   var _this=this;
    //     // _this.curComponent = require(`@/widgets/${val.funcInvokeUrl}/index.vue`).default;
    //   }

  },
  methods: {
    handleMapLoaded() {
      this.isMapLoaded = true;
    },
    handleSelect(index, keyPath) {
      // console.log("11:",index,keyPath)
      //PortalLoad 当前的index
      // ['002acb27-e463-4e52-a185-e0b3a77462f1', '/PortalLoad'] //上一级的index和当前的index
    }

  }
}
</script>

<style lang="scss">
.main,
.el-container {
  /* 设置内部填充为0，几个布局元素之间没有间距 */
  padding: 0px;
  /* 外部间距也是如此设置 */
  margin: 0px;
  /* 统一设置高度为100% */
  height: 100%;

  .el-header,
  .el-footer {
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
    position: relative;
    /* 添加这一行 */
    z-index: 1;
    /* 添加这一行 */
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}

.main-container {
  padding: 0px;
  display: flex;
  flex-direction: row;
  height: 100%;

  .map-container {
    flex: 1;
    height: 100%;
    position: relative;
    /* 添加这一行 */
    z-index: 0;
    /* 添加这一行 */
    pointer-events: auto;
  }

  .content-container {
    flex: 1;
    position: absolute;
    /* 修改为绝对定位 */
    top: 0;
    /* 将内容容器置于地图容器的上方 */
    left: 0;
    // right: 0;
    // bottom: 0;
    z-index: 1;
    // pointer-events: none;
  }
}</style>