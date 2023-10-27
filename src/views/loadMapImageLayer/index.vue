<!--
 * @Author: luobr
 * @Date: 2022-04-12 23:07:53
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-27 11:21:22
 * @Description: 加载动态图层
-->
<template>
    <div class="layer_container">
      <div class="visiable_container">
        <span class="demonstration">图层可见性：</span>
        <!-- <el-checkbox-group v-model="checkLayer" size="mini" @change="handlecheckedsubLayer">
            <el-checkbox-button v-for="layer in sublayers" :label="layer" :key="layer.id" :checked="layer.visible" >{{layer.title}}</el-checkbox-button>
        </el-checkbox-group> -->
        <el-checkbox-group v-model="checkLayer" @change="handlecheckedsubLayer">
            <el-checkbox v-for="layer in sublayers" :label="layer" :key="layer.id" :checked="layer.visible">{{layer.title}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="opacity_container">
        <span class="demonstration">图层表达式：</span>
        <el-slider v-model="population" :min="0" :max="1000000" :step="10000" @change="changepopulationValue"></el-slider>
      </div>
      <div class="opacity_container">
        <span class="demonstration">图层透明度：</span>
        <el-slider v-model="opacity" :format-tooltip="formatTooltip" @change="changeLayerOpacity"></el-slider>
      </div>
    </div>
  </template>
  <script>
  let view,map
  export default {
    name: "loadMapImageLayer",
    props: {},
    data() {
        return {
            opacity: 100000,
            currentlayer:null,
            sublayers:[],
            checkLayer:[],
            population: 100000
        }
    },
    beforeMount(){
      view = ArcCIM.view;
      map = view.map;
    },
    mounted() {
        this.loadDamicLayer();
    },
    beforeDestroy(){
        this.removeLayer();
    },
    destroyed(){ 
          
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
         * @description: 修改图层透明度
         * @param {*} value
         * @return {*}
         */        
         changeLayerOpacity(value){
            // 实现图层的控制
            const mediaLayer = map.findLayerById("DinamicLayer");
            if (mediaLayer) {
                mediaLayer.opacity = this.formatTooltip(value);
            }
        },
        /**
         * @Author: luobr
         * @description: 切换图层
         * @return {*}
         */        
        handlecheckedsubLayer(){
            const visibleSublayers = this.checkLayer.map(layer => layer.id); 
            this.currentlayer.sublayers.forEach(sublayer => {
                sublayer.visible = visibleSublayers.includes(sublayer.id);
            });
        },
        /**
         * @Author: luobr
         * @description: 改变人口表达式
         * @return {*}
         */        
        changepopulationValue(){
            const cities = this.currentlayer.findSublayerById(0);
            cities.definitionExpression = "pop2000 > " + this.population;
        },
        createSymbol(color) {
          return {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: color,
            outline: {
              width: 0.5,
              color: [255, 255, 255, 0.4]
            },
            style: "solid"
          };
        },
        
        /**
         * @Author: luobr
         * @description: 渲染图层
         * @return {*}
         */        
        rendererlayer(){
        const renderer = {
          type: "class-breaks", // autocasts as new ClassBreaksRenderer()
          field: "States.POP00_SQMI",
          normalizationField: "States.POP00_SQMI",
          normalizationType: "field",
          classBreakInfos: [{
            minValue: 0,
            maxValue: 2000,
            symbol: this.createSymbol("#f8e3c2"),
            label: "0 - 1.26%"
            },
            {
            minValue: 2001,
            maxValue: 4000,
            symbol: this.createSymbol("#e5998c"),
            label: "1.26 - 2.6%"
            },
            {
            minValue: 4001,
            maxValue: 6000,
            symbol: this.createSymbol("#d86868"),
            label: "2.6 - 15%"
            },
            {
            minValue: 6001,
            maxValue: 9000,
            symbol: this.createSymbol("#9b3557"),
            label: "15 - 50%"
            }]
        };
        const stateLayer = this.currentlayer.allSublayers.find(function(sublayer){
            return sublayer.title === 'States';
        });
        console.log('stateLayer:',  stateLayer);
        stateLayer.renderer = renderer;
        },
        /**
         * @Author: luobr
         * @description:  加载动态图层  
         * @return {*}
         */        
        loadDamicLayer() {
        let that = this;
        this.$loadModules(["esri/layers/MapImageLayer"]).then(([MapImageLayer])=>{
            var layer = new MapImageLayer({
                url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer",
                id:'DinamicLayer'
            });
            this.currentlayer = layer;
            map.add(layer);
            // 跳转到当前图层的范围
            view.when(function() {
                layer.when(() => {
                    view.goTo(layer.fullExtent)
                    layer.sublayers.map((sublayer) => {
                        const id = sublayer.id;
                        const visible = sublayer.visible;
                        const title = sublayer.title;
                        that.sublayers.push({id,title,visible}); 
                    })
                // that.rendererlayer();
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
          const layer = map.findLayerById("DinamicLayer");
          if (layer) {
              map.remove(layer);
          }
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .layer_container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 10px;
  background-color: #fff;
  width: 220px;
}

.visiable_container {
  flex-basis: 100%;
  .demonstration {
    margin-right: 10px;
    font-size: small;
  }
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
  </style>