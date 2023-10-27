<!--
 * @Author: luobr
 * @Date: 2022-04-12 23:04:19
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-27 11:24:39
 * @Description: 分别加载影像底图+注记|矢量底图+注记天地图
-->
<template>
  <div class="tool-btn">
    <div :class="{ 'switch-tool': true, 'highlight': type }" @click="loadTDWebTileLayer({ type: 1, msg: '影像' })">
      <img src="./img/img-c.png" alt="" width="100%">
    </div>
    <div :class="{ 'switch-tool': true, 'highlight': !type }" @click="loadTDWebTileLayer({ type: 0, msg: '矢量' })">
      <img src="./img/vec_c.png" alt="" width="100%">
    </div>
  </div>
</template>
<script>
let map;
export default {
  name: "loadLocalShp",
  props: {},
  data() {
    return {
      type: false,
      tiandituBaseUrl: "http://{subDomain}.tianditu.gov.cn", //天地图服务地址
      token: "b48fd375262a1f402dcc1130a7f6111a", // 自己申请 "7baeffb96bf61861b302d0f963cfda66"
      tianDiTuLayerImg:'tianDiTuLayerImg',
      tianDiTuLayerAnno:'tianDiTuLayerAnno'
    }
  },
  mounted() {
    map = ArcCIM.view.map;
    this.loadTDWebTileLayer({ type: 0 });
  },
  beforeDestroy() {
    this.removeTDWebTileLayer();
  },
  destroyed() {
  },
  methods: {
    /**
     * @Author: luobr
     * @description: 加载天地图，84坐标系（1：影像，2：矢量）
     * @param {*} mapType
     * @return {*}
     */
    loadTDWebTileLayer(mapType) {
      this.removeTDWebTileLayer();
      var tiledLayer, tiledLayerAnno;
      // 加载底图模块
      this.$loadModules(["esri/layers/WebTileLayer"]).then(([WebTileLayer]) => {
        if (mapType.type === 1) {
          // 影像底图(球面墨卡托投影)
          tiledLayer = new WebTileLayer({
            urlTemplate: this.tiandituBaseUrl +
              "/img_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=" +
              this.token,
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            id: this.tianDiTuLayerImg
          });

          //影像注记(球面墨卡托投影)
          tiledLayerAnno = new WebTileLayer({
            urlTemplate: this.tiandituBaseUrl +
              "/cia_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=cia&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=" +
              this.token,
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            id: this.tianDiTuLayerAnno
          });
        } else {
          // 矢量底图
          tiledLayer = new WebTileLayer({
            urlTemplate: this.tiandituBaseUrl +
              "/vec_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=vec&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=" +
              this.token,
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            id: this.tianDiTuLayerImg
          });

          //矢量注记(球面墨卡托投影)
          tiledLayerAnno = new WebTileLayer({
            urlTemplate: this.tiandituBaseUrl +
              "/cva_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=cva&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=" +
              this.token,
            subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
            id: this.tianDiTuLayerAnno
          });
        }
        map.add(tiledLayer);
        map.add(tiledLayerAnno);
      }).catch(err => {
        console.log('添加天地图失败：', err);
      });
    },
    /**
     * @Author: luobr
     * @description: 移除天地图
     * @return {*}
     */
    removeTDWebTileLayer() {
      // 获取天地图图层的引用，可以根据图层 ID 或图层名称进行查找
      const tianDiTuLayerImg = map.findLayerById(this.tianDiTuLayerImg);
      const tianDiTuLayerAnno = map.findLayerById(this.tianDiTuLayerAnno);
      if (tianDiTuLayerImg) {
        map.remove(tianDiTuLayerImg);
      }
      if (tianDiTuLayerAnno) {
        map.remove(tianDiTuLayerAnno);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.tool-btn {
  z-index: 2;
  display: flex;
  width: 250px;
  justify-content: space-between;
  cursor: pointer;

  .switch-tool {
    width: 100px;
    height: 100px;
    border: 4px solid #fff;
    border-radius: 4px;
  }

  .highlight {
    border-color: #09f;
  }
}
</style>