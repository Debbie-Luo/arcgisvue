<template>
    <el-menu @select="handleSelect" router :default-openeds="['1']">
        <el-submenu v-for="(item1,index1) in $router.options.routes" :key="index1" :index="index1+''">
            <template slot="title">{{item1.name}}</template>
            <el-menu-item v-for="(item2,index2) in item1.children" :key="index2" :index="item2.path+''" :class="$route.path == item2.path ? 'is-active':''">{{item2.name}}</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {
    name:"AsideMenu",
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
<style scoped>

</style>