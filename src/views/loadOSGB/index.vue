<!--
 * @Author: luobr
 * @Date: 2022-04-12 23:08:03
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-06 00:32:37
 * @Description: 加载OSGB
-->
<template>
</template>
<script>
let map, view;
export default {
  name: "loadOSGB",
  props: {},
  data() {
      return {
       
      }
  },
  beforeMount(){
    
  },
  mounted() {
    view = ArcCIM.view;
    map = view.map;
    this.loadOSGB();
  },
  beforeDestroy(){
    this.removeOSGBLayer();
  },
  destroyed(){ 
        
  },
  methods: {  
    /**
     * @Author: luobr
     * @description: 加载倾斜摄影数据
     * @return {*}
     */      
    loadOSGB() {
      this.$loadModules(["esri/layers/IntegratedMeshLayer"]).then(([IntegratedMeshLayer])=>{
        var layer = new IntegratedMeshLayer({
          url: "https://tiles.arcgis.com/tiles/cFEFS0EWrhfDeVw9/arcgis/rest/services/Buildings_Frankfurt_2021/SceneServer",
          id:'OSGBLayer'
        });
        map.add(layer);
        // 跳转到当前图层的范围
        view.when(function() {
            layer.when(() => view.goTo(layer.fullExtent))
        });
      })
    },
    
    /**
     * @Author: luobr
     * @description: 移除倾斜摄影数据
     * @return {*}
     */    
    removeOSGBLayer() {
      const layer = map.findLayerById("OSGBLayer");
      if (layer) {
        map.remove(layer);
      }
    }
  }
}
</script>

<style scoped>
</style>