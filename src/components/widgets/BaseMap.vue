<!--
 * @Author: luobr
 * @Date: 2022-04-04 20:11:22
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-03 02:33:43
 * @Description: 初始化地图
-->
<template>
    <div id="viewDiv"></div>
</template>
<script>

export default {
    name: "baseMap",
    components: {
    },
    mounted() {

    },
    beforeMount() {
        this.loadView();
    },
    methods: {
        loadView() {
            return new Promise((resolve, reject) => {
                this.$loadModules(["esri/views/SceneView", "esri/Map"]).then(([SceneView, Map]) => {
                    let map = new Map({
                        basemap: "streets-night-vector",
                        ground: "world-elevation",
                    });
                    let view = new SceneView({
                        map: map,
                        container: "viewDiv",
                        camera: {
                            position: [113.257, 35.173, 931],
                            // heading: 356.073,
                            // tilt: 51.614,
                        },
                    });
                    ArcCIM.view = view;
                    this.$emit("mapLoaded"); // 触发自定义事件
                    resolve(view); // 在生成地图完成后执行 resolve,通知 Promise已经完成
                }).catch((err) => {
                    reject(err);
                })
            })
        },
    }
}
</script>
<style scoped lang="scss">
#viewDiv {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>

