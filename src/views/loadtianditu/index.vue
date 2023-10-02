<!--
 * @Author: luobr
 * @Date: 2022-04-12 23:04:19
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-03 02:41:16
 * @Description: 
-->
<template></template>
<script>
let map = ArcCIM.view.map;
export default {
  name: "loadLocalShp",
  props: {},
  data() {
    return {
      tiandituBaseUrl: "http://{subDomain}.tianditu.gov.cn", //天地图服务地址
      token: "b48fd375262a1f402dcc1130a7f6111a" // 自己申请 "7baeffb96bf61861b302d0f963cfda66"
    }
  },
  mounted() {
    this.loadTDWebTileLayer();
  },
  beforeDestroy() {
    this.removeTDWebTileLayer();
  },
  destroyed() {
  },
  methods: {
    /**
     * @Author: luobr
     * @description: 加载天地图
     * @return {*}
     */
    loadTDWebTileLayer() {
      // 加载底图模块
      this.$loadModules(["esri/layers/WebTileLayer"]).then(([WebTileLayer]) => {
        //矢量地图(球面墨卡托投影)
        var tiledLayer = new WebTileLayer({
          urlTemplate: this.tiandituBaseUrl +
            "/img_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=" +
            this.token,
          subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          id:'tianDiTuLayerImg'
        });

        //矢量注记(球面墨卡托投影)
        var tiledLayerAnno = new WebTileLayer({
          urlTemplate: this.tiandituBaseUrl +
            "/cia_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=cia&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=" +
            this.token,
          subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          id:'tianDiTuLayerAnno'
        });
        map.add(tiledLayer);
        map.add(tiledLayerAnno);
      }).catch(err => {
        console.log('添加天地图失败：',err);
      });
    },

    removeTDWebTileLayer() {
      // 获取天地图图层的引用，可以根据图层 ID 或图层名称进行查找
      const tianDiTuLayerImg = map.findLayerById("tianDiTuLayerImg");
      const tianDiTuLayerAnno = map.findLayerById("tianDiTuLayerAnno");
      if (tianDiTuLayerImg) {
        map.remove(tianDiTuLayerImg);
      }
      if(tianDiTuLayerAnno){
        map.remove(tianDiTuLayerAnno);
      }
    }
  }
}
</script>

<style scoped></style>