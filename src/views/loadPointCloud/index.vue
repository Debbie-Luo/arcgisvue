<!--
 * @Author: luobr
 * @Date: 2022-04-12 23:08:30
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-04 21:51:14
 * @Description: 加载点云
-->
<template>
</template>
<script>
let map, view;
export default {
  name: "loadPointCloud",
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
    this.loadPointCloudLayer();
  },
  beforeDestroy(){
    this.removepointCloudLayer();
  },
  destroyed(){ 
    
  },
  methods: { 
    /**
     * @Author: luobr
     * @description: 加载点云图层
     * @return {*}
     */     
    loadPointCloudLayer() {
      this.$loadModules(["esri/layers/PointCloudLayer"]).then(([PointCloudLayer])=>{
        // 1、url 加载方式
        let layer = new PointCloudLayer({
          url: "https://tiles.arcgis.com/tiles/V6ZHFr6zdgNZuVG0/arcgis/rest/services/BARNEGAT_BAY_LiDAR_UTM/SceneServer",
          id: 'pointcloudlayer',
        });
        // 2、portalItem加载方式
        // const layer = new PointCloudLayer({
        //   portalItem: {
        //     // autocasts as new PortalItem()
        //     id: "fc3f4a4919394808830cd11df4631a54"
        //   },
        //   id:'pointcloudlayer'
        // });
        map.add(layer);
        // 跳转到当前图层的范围
        view.when(function() {
            layer.when(() => view.goTo(layer.fullExtent))
        });
      })
    },
    
    // 点云渲染
    layerRender() {

    },
    
    /**
     * @Author: luobr
     * @description: 移除点云图层
     * @return {*}
     */    
    removepointCloudLayer() {
      const pointcloudlayer = map.findLayerById("pointcloudlayer");
      if (pointcloudlayer) {
        map.remove(pointcloudlayer);
      }
    }
  }
}
</script>

<style scoped>

</style>