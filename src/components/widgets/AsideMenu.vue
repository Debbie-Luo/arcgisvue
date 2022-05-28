<!--
 * @Author: luobr
 * @Date: 2022-04-10 12:46:08
 * @LastEditors: luobr
 * @LastEditTime: 2022-04-12 23:49:51
 * @Description: 
-->
<template>
  <div>
    <template v-for="item in treeData">
        <el-submenu  :key='item.id' :index="item.id" v-if="item.children">
        <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.menuName}}</span>
        </template>
            <el-menu-item
                v-for ="item1 in item.children"
                :index="item1.path"
                :key="item1.id"
            >
            {{item1.menuName}}
        </el-menu-item>
        </el-submenu>
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