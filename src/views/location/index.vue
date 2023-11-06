<!--
 * @Author: luobr
 * @Date: 2022-11-19 13:36:42
 * @LastEditors: luobr
 * @LastEditTime: 2023-11-05 21:19:30
 * @Description: 定位
-->

<template>
  <div class="locate-container">
    <el-autocomplete
      size="small"
      v-model="address"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入地址..."
      @select="handleSelect"
    ></el-autocomplete>
    <el-button size="small" type="primary" @click="locatePosition"
      >定位</el-button
    >
  </div>
</template>

<script>
import jsonp from "jsonp";
import CoordTransfer from './js/CoordTransfer';
let map, view;

export default {
  name: "Location",
  components: {},
  props: {},
  data() {
    return {
      address: "", // 绑定对象的value值
      searchResults: [],
      searchPoint: {},
      graphic: null,
      graphicsLayer: null
    };
  },
  beforeMount() {
    view = ArcCIM.view;
    map = view.map;
  },
  mounted() {},
  beforeDestroy() {
    this.removeGraphic();
  },
  destroyed() {},
  methods: {
    /**
     * @Author: luobr
     * @description: 搜索框下拉列表
     * @param {*} queryString
     * @param {*} callback
     * @return {*}
     */    
    querySearchAsync(queryString, callback) {
      const url = `https://api.map.baidu.com/place/v2/suggestion?query=${encodeURIComponent(
        queryString
      )}&region=全国&output=json&ak=7BL8eWZ2gDeqW6Upkl8ZURoOZs4GWQvX`;
      // 1 vue + jsonp->处理跨域
      jsonp(url, null, (err, data) => {
        if (err) {
          console.error(err);
          callback([]);
          return;
        }
        const filteredResults = data.result.map((result) => ({
          ...result,
          value: result.name, // 必须要加这个，不加下拉列表不显示
        }));
        callback(filteredResults);
      });
      // 2
      //   const BMap_URL = 'https://api.map.baidu.com/place/v2/search?query=' + queryString + '&region=全国&output=json&ak=7BL8eWZ2gDeqW6Upkl8ZURoOZs4GWQvX';
      // return new Promise((resolve, reject) => {
      //     // 如果已加载直接返回
      //     if (typeof res !== 'undefined') {
      //         resolve(res);
      //         return true;
      //     }
      //     // // // 百度地图异步加载回调处理
      //     // window.onBMapCallback = function(res) {
      //     //     resolve(res);
      //     // };
      //     // 插入script脚本
      //     const scriptNode = document.createElement('script');
      //     scriptNode.setAttribute('type', 'text/javascript');
      //     scriptNode.setAttribute('src', BMap_URL);
      //     document.body.appendChild(scriptNode);
      // });
    },
    /**
     * @Author: luobr
     * @description: 选中的选项
     * @param {*} value
     * @return {*}
     */    
    handleSelect(value) {
      this.searchPoint = value;
    },
    /**
     * @Author: luobr
     * @description: 定位选中的地点
     * @return {*}
     */    
    locatePosition() {
      let { location } = this.searchPoint;
      let location2 = CoordTransfer.BDTo84(location);
      this.flyToTarget(location2);
    },
    /**
     * @Author: luobr
     * @description: 定位目标位置
     * @param {*} location
     * @return {*}
     */    
    flyToTarget(location) {
      view.goTo({
          center: [location.lng, location.lat],
          // heading: view.camera.tilt, // set the heading to point South
          // tilt: view.camera.tilt, // maintain tilt value
        }).catch(function (error) {
          if (error.name != "AbortError") {
            console.error(error);
          }
        });
      // 移除上一个点
      this.removeGraphic();
      // 生成点
      this.generatePoint(location);
    },
    
    /**
     * @Author: luobr
     * @description: 生成定位中心点
     * @param {*} location
     * @return {*}
     */    
    generatePoint(location) {
      this.$loadModules(["esri/Graphic", "esri/layers/GraphicsLayer"])
      .then(([Graphic, GraphicsLayer]) => {
          const { lng, lat } = location; // 已知的经纬度
          const point = {
            type: "point",
            longitude: lng,
            latitude: lat,
          };
          this.graphic = new Graphic({
            geometry: point,
            symbol: {
              type: "simple-marker",
              color: [255, 0, 0], // 点的颜色
              size: 10, // 点的大小
              outline: {
                color: [255, 255, 255], // 点的轮廓颜色
                width: 1, // 点的轮廓宽度
              },
            },
          });
          // 将点图形添加到图层中
          this.graphicsLayer = new GraphicsLayer();
          this.graphicsLayer.add(this.graphic);
          // 将图层添加到地图中
          map.add(this.graphicsLayer);
        }
      );
    },
    /**
     * @Author: luobr
     * @description: 移除上一个点
     * @return {*}
     */    
    removeGraphic(){
      if(this.graphic != null){
        this.graphicsLayer.remove(this.graphic);
      }
    }
  },
};
</script>
<style scoped lang="scss">
.locate-container {
  // background: #fff;
  position: fixed;
  right: 14px;
  top: 80px;
  .el-button {
    margin-left: 3px;
  }
}
</style>
