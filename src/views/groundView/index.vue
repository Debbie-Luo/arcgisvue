<!--
 * @Author: luobr
 * @Date: 2022-04-12 23:07:15
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-06 04:00:04
 * @Description: 地上地下
-->
<template>
  <div class="underground_container">
    <div  class="switch_container">
      <el-switch v-model="isUnderground" active-icon-class="el-icon-bottom" inactive-icon-class="el-icon-top"
      @change="changeView"></el-switch>
    </div>
    <div class="opacity_container">
        <span class="demonstration">地面透明度</span>
        <el-slider v-model="opacity" :format-tooltip="formatTooltip" @change="changeGroundOpacity"></el-slider>
    </div>
  </div>
</template>
<script>
let view;
export default {
  name: "groundView",
  props: {},
  data() {
    return {
      isUnderground: false,
      originCamera: null,
      currentCamera: null,
      opacity: 100,
    }
  },
  beforeMount() {
    view = ArcCIM.view;
    
  },
  mounted() {
    // 记录最原始的相机参数
    view.when(() => {
      this.originCamera = view.camera;
    });
  },
  beforeDestroy() {
    this.resumeCamera();
  },
  destroyed() {

  },
  methods: {
    /**
     * @Author: luobr
     * @description: 滑动条格式化
     * @param {*} val
     * @return {*}
     */    
    formatTooltip(val) {
      return val / 100;
    },
    /**
     * @Author: luobr
     * @description: 修改地面的透明度
     * @param {*} value
     * @return {*}
     */    
    changeGroundOpacity(value){
      view.map.ground.opacity = this.formatTooltip(value);
    },
    /**
     * @Author: luobr
     * @description:  改变当前视角
     * @return {*}
     */
    changeView(status) {
      var mult = status ? -1 : 1;
      view.when(() => {
      // 获取相机的当前参数
      let currentCamera = view.camera;
      this.$loadModules(["esri/Camera"]).then(([Camera]) => {
        // 进入地下模式
        if (status) {
          // 将 navigationConstraint 设置为 none 将允许用户在地面漫游
          view.map.ground.navigationConstraint = {
            type: "none",
          };
          // to see through the ground, set the ground opacity to 0.4
          // view.map.ground.opacity = 0.4;
          // 关闭地下模式，恢复初始视角
        } else {
          view.map.ground.navigationConstraint = null;
          // view.map.ground.opacity = 1;
        }
        // 这里怎么修改heading和x、y总是undefined，暂时放弃这种方式
        // var newCamera = new Camera();
        //   Object.assign(newCamera, currentCamera, {
        //     tilt: 90 - mult * Math.abs(90 - currentCamera.tilt),
        //     position: {
        //       z: mult * Math.abs(currentCamera.position.z),
        //     }
        //   });
        let newCamera = new Camera({
          position: {
            x: currentCamera.position.x,
            y: currentCamera.position.y,
            z: mult * Math.abs(currentCamera.position.z),
            spatialReference: view.spatialReference,
          },
          heading: currentCamera.heading,
          tilt: 90 - mult * Math.abs(90 - currentCamera.tilt),
          fov: currentCamera.fov,
        });

        view.goTo(newCamera, { duration: 1000 })
      })
    });
    },

    /**
     * @Author: luobr
     * @description: 恢复最初始角度
     * @return {*}
     */    
    resumeCamera() {
      view.map.ground.navigationConstraint = null;
      view.map.ground.opacity = 1;
      view.goTo(this.originCamera, { duration: 1000 });
    }
  }
}
</script>

<style scoped lang="scss">
.underground_container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 10px;
  background-color: #fff;
  width: 220px;
  .switch_container {
    flex-basis: 100%;
  }

  .opacity_container {
    flex-basis: 100%;
    max-height: 100px;
    
    .el-slider {
      width: 100%;
    }

    .demonstration {
      margin-right: 10px;
      font-size: small;
    }
  }
}
</style>