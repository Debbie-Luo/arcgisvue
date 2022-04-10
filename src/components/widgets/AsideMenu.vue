<template>
  <div>
    <template v-for="item in treeData">
        <el-submenu  :key='item.id' :index="item.id" >
        <template slot="title" v-if="item.children && item.children.length > 0 && item.menuType.toString() === '1'">
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