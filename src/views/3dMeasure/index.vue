<!--
 * @Author: luobr
 * @Date: 2022-04-12 23:05:54
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-27 14:41:30
 * @Description: 3D 测量
-->
<template>
  <div class="measure-container" v-if="isMeasure">
    <el-button class="measure-tool" round type="primary" @click="measure('distance')">测距</el-button>
    <el-button class="measure-tool" round type="primary" @click="measure('area')">面积|周长</el-button>
    <el-button class="measure-tool" round type="primary" @click="measure(null)">关闭</el-button>
    <el-button class="measure-tool" round type="primary" @click="switchMeasure">切换</el-button>
  </div>
  <div v-else>
    <div class="measure-container">
      <el-button class="measure-tool"  type="primary" @click="measureTool('direct-line')">测距</el-button>
      <el-button class="measure-tool"  type="primary" @click="measureTool('area')">面积|周长</el-button>
      <el-button class="measure-tool"  type="primary" @click="measure(null)">关闭</el-button>
      <el-button class="measure-tool"  type="primary" @click="switchMeasure">切换</el-button>
    </div>
  </div>
</template>
<script>
let map, view, activeWidget;
export default {
  name: "3dMeasure",
  props: {},
  data() {
      return {
        isMeasure: true,
        layerName: 'OSGBLayer',
        osgb_url:"https://tiles.arcgis.com/tiles/cFEFS0EWrhfDeVw9/arcgis/rest/services/Buildings_Frankfurt_2021/SceneServer"
      }
  },
  beforeMount(){
    
  },
  mounted() {
    view = ArcCIM.view;
    map = view.map;
    // 初始化加载倾斜数据
    this.loadData();
  },
  beforeDestroy(){
  },
  destroyed(){ 
    this.removeLayer(); 
    this.removeMeasure();
  },
  methods: { 
    /**
     * @Author: luobr
     * @description: 加载倾斜数据
     * @return {*}
     */     
    loadData(){
      this.$loadModules(["esri/layers/IntegratedMeshLayer"]).then(([IntegratedMeshLayer])=>{
        var layer = new IntegratedMeshLayer({
          url: this.osgb_url,
          id: this.layerName
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
     * @description: 多个微件测量方法
     * @param {*} type
     * @return {*}
     */    
    measure(type){
      this.removeMeasure(this.isMeasure);
      this.$loadModules(["esri/widgets/DirectLineMeasurement3D", "esri/widgets/AreaMeasurement3D"])
      .then(([DirectLineMeasurement3D, AreaMeasurement3D])=>{
        if(type === 'distance'){
          activeWidget = new DirectLineMeasurement3D({
            view: view,
          });
          activeWidget.viewModel.start();
        } else if(type === 'area'){
          activeWidget = new AreaMeasurement3D({
            view: view,
          });
          activeWidget.viewModel.start();
        } else {
          this.removeMeasure(this.isMeasure);
        }
      })
    },
   /**
     * @Author: luobr
     * @description: 单个微件测量方法
     * @param {*} type
     * @return {*}
     */
    measureTool(type){
      this.removeMeasure(this.isMeasure);
      this.$loadModules(["esri/widgets/Measurement"])
      .then(([Measurement])=>{
        activeWidget = new Measurement({
          view: view
        });
        activeWidget.activeTool = type;
        view.ui.add(activeWidget, "bottom-right");
      })
    },
    /**
     * @Author: luobr
     * @description: 移除测量微件和测量结果
     * @return {*}
     */    
    removeMeasure(type){
      if(type){
          if(activeWidget) {
          activeWidget.destroy();
          activeWidget = null;
        }
      } else{
        if(activeWidget) {
          activeWidget.clear();
        }
      }
     
    },
    
    /**
     * @Author: luobr
     * @description: 测量方法切换
     * @return {*}
     */    
    switchMeasure(){
      this.isMeasure =! this.isMeasure;
    },
    /**
     * @Author: luobr
     * @description: 移除图层
     * @return {*}
     */    
    removeLayer(){
      const layer = map.findLayerById(this.layerName);
      if (layer) {
        map.remove(layer);
      }
    }
  }
}
</script>

<style scoped>
.measure-container{
  background-color: #fff;
  display: flex;
  border-radius: 5px;
  box-sizing: border-box;
  .measure-tool {
    margin: 20px;
  }
}

</style>