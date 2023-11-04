<!--
 * @Author: luobr
 * @Date: 2022-04-12 23:06:37
 * @LastEditors: luobr
 * @LastEditTime: 2023-11-04 19:54:31
 * @Description: 相机参数
-->
<template>
  <div class="camera-main-container">
    <div class="camera-container">
      <div class="camera-title">相机参数</div>
      <div class="camera-main-contet">
        <div class="camera-contet">
          <span>longitude：</span>
          <span>{{ camera.position.longitude.toFixed(3) }}</span>
        </div>
        <div class="camera-contet">
          <span>latitude：</span>
          <span>{{ camera.position.latitude.toFixed(3) }}</span>
        </div>
        <div class="camera-contet">
          <span>x：</span>
          <span>{{ camera.position.x.toFixed(3) }}</span>
        </div>
        <div class="camera-contet">
          <span>y：</span>
          <span>{{ camera.position.y.toFixed(3) }}</span>
        </div>
        <div class="camera-contet">
          <span>z：</span>
          <span>{{ camera.position.z.toFixed(3) }}</span>
        </div>
        <div class="camera-contet">
          <span>heading：</span>
          <span>{{  camera.heading.toFixed(3)}}</span>
        </div>
        <div class="camera-contet">
          <span>tilt：</span>
          <span>{{  camera.tilt.toFixed(3)}}</span>
        </div>
        <div class="camera-contet">
          <el-button size="small" @click="reset">重置</el-button>
          <el-button size="small" @click="copy">复制</el-button>
        </div>
      </div>
    </div>
  <div ref='transfer' id="transfer"></div>
  </div>
</template>
<script>
let map,view;
export default {
  name: "cameraParam",
  props: {},
  data() {
      return {
       camera:{
        position:{
          longitude:0,
          latitude:0,
          x:0,
          y:0,
          z:0
        },
        heading:0,
        tilt:0
       },
       initCamera:null,
       ccWidget: null
      }
  },
  beforeMount(){
    view = ArcCIM.view;
    map = view.map;
  },
  mounted() {
    this.getinitView();
    this.watchView();
  },
  beforeDestroy(){
    this.clearccWidget();
    this.reset(); 
  },
  destroyed(){  
  },
  methods: {
    /**
     * @Author: luobr
     * @description: 初始化当前视角的相机参数
     * @return {*}
     */    
    getinitView(){
      view.when(()=>{
        this.initCamera = view.camera.clone();
        this.camera = view.camera;
      })
      this.coordTransfer();
    }, 
    /**
     * @Author: luobr
     * @description: 实时监听相机变化
     * @return {*}
     */    
    watchView() {
      view.watch('camera', (newCamera, oldCamera) => {
      // 处理相机参数变化的逻辑
      // 在这里可以进行相应的操作或更新数据
      this.camera = newCamera;
    });
    }, 
    /**
     * @Author: luobr
     * @description: 重置视角（初始化视角）
     * @return {*}
     */    
    reset(){
      view.goTo(this.initCamera).catch(function (error) {
        if (error.name != "AbortError") {
          console.error(error);
        }
      });
    },
    /**
     * @Author: luobr
     * @description: 复制相机参数
     * @return {*}
     */    
    copy() {
      let copyStr = this.traverseCamera(this.camera);
      var oInput = document.createElement("textarea");
      oInput.value = copyStr;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
    },
    /**
     * @Author: 遍历相机参数
     * @description: 
     * @param {*} obj
     * @return {*}
     */    
    traverseCamera(obj) {
      let copyStr = "";
      for (let key in obj) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          copyStr += this.traverseCamera(obj[key]);
        } else if (typeof obj[key] === "number") {
          copyStr += `${key}: ${obj[key].toFixed(3)}\n`;
        }
      }
      return copyStr;
    },
    
    /**
     * @Author: luobr
     * @description: 添加坐标转换微件
     * @return {*}
     */    
    coordTransfer(){
      this.$loadModules(["esri/widgets/CoordinateConversion"])
      .then(([CoordinateConversion,])=>{
        this.ccWidget = new CoordinateConversion({
          view: view,
        });
        // Adds widget in the bottom left corner of the view
        view.ui.add(this.ccWidget, "top-right");
      })
    },
    /**
     * @Author: luobr
     * @description: 清除坐标转换微件
     * @return {*}
     */    
    clearccWidget(){
      if(this.ccWidget != null){
        this.ccWidget.destroy();
        this.ccWidget = null;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.camera-container{
  background-color: #fff;
  padding: 5px;
  border-radius: 7px;
  margin: 5px;
  
  .camera-title{
    font-weight: bold;
    font-size: 14px;
  }
  .camera-main-contet{
    padding: 5px;
    text-align: left;
    .camera-contet {
      font-size: 12px;
      margin: 2px;
    }
  }
}
</style>