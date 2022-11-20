<!--
 * @Author: luobr
 * @Date: 2022-04-10 12:46:08
 * @LastEditors: luobr
 * @LastEditTime: 2022-11-19 15:20:48
 * @Description: 
-->
<template>
  <div>
    <template v-for="item in treeData">
      <!-- 有子菜单 -->
      <el-submenu :key='item.id' :index="item.id" v-if="item.children">
        <!--一级菜单标题  -->
        <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
        </template>
        <!-- 二级菜单标题 -->
        <template v-for="(child) in item.children" >
            <router-link :to="child.path" :key="child.id">
              <el-menu-item :index="child.path">{{child.name}}</el-menu-item>
            </router-link>
        </template>
      </el-submenu>
      <!-- 没有二级子菜单 -->
      <el-menu-item :key='item.id' :index="item.index" v-if="!item.children"></el-menu-item>
    </template>
  </div>
</template>

<script>

export default {
  name: "AsideMenu",
  props: {
    treeData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  mounted(){
    //   console.log("111:",this.treeData)
  }
};
</script>
<style scoped>
</style>