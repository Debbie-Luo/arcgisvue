<!--
 * @Author: luobr
 * @Date: 2023-10-27 14:58:39
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-27 16:47:47
 * @Description: 加载BIM模型图层
-->
<template>
<div>
    <!-- <h1>加载shapefile</h1> -->
</div>
</template>
<script>
let view,map
export default {
    name: "loadBIM",
    props: {},
    data() {
        return {
           BIM_url: "https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Esri_Admin_Building/SceneServer",
           BIM_Layer:'BIM_Layer'
        }
    },
    beforeMount(){
        
    },
    mounted() {
        view = ArcCIM.view;
        map = view.map;
        this.loadData();
    },
    beforeDestroy(){

    },
    destroyed(){ 
        this.removeLayer();   
    },
    methods: {   
    loadData(){
        this.$loadModules(["esri/layers/BuildingSceneLayer"]).then(([BuildingSceneLayer])=>{
        const layer = new BuildingSceneLayer({
            url: this.BIM_url,
            id:this.BIM_Layer
        });
        map.add(layer);
        view.when(function() {
            layer.when(() => {
                view.goTo(layer.fullExtent)
            })
        });
    })   
    },
    /**
     * @Author: luobr
     * @description: 移除图层
     * @return {*}
     */        
    removeLayer() {
        const layer = map.findLayerById(this.BIM_Layer);
        if (layer) {
            map.remove(layer);
        }
    }
}
}
  </script>
  
  <style scoped>
  </style>