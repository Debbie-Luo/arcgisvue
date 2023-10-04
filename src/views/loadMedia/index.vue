<!--
 * @Author: luobr
 * @Date: 2022-04-12 23:04:19
 * @LastEditors: luobr
 * @LastEditTime: 2023-10-04 20:56:12
 * @Description: 加载已知坐标范围的图片
-->
<template>
    <div class="media_container">
        <div class="select_container">
            <el-radio-group v-model="mediaValue" @change="handleChange">
                <el-radio label="img">图片</el-radio>
                <el-radio label="video">视频</el-radio>
            </el-radio-group>
        </div>
        <div class="opacity_container">
            <span class="demonstration">图层透明度</span>
            <el-slider v-model="opacity" :format-tooltip="formatTooltip" @change="changeLayerOpacity"></el-slider>
        </div>
    </div>
</template>
<script>
let map,view;
export default {
    name: "loadImg",
    data() {
        return {
            mediaValue:'img',
            opacity: 100,
        }
    },
    beforeMount() {      
    },
    mounted() {
        view = ArcCIM.view;
        map = ArcCIM.view.map;
        this.handleChange('img');
    },
    beforeDestroy() {
        this.removeLayer();
    },
    destroyed() {
        
    },
    methods: {
        // 滑动条格式化
        formatTooltip(val) {
            return val / 100;
        },
        changeLayerOpacity(value){
            // 实现图层的控制
            const mediaLayer = map.findLayerById("media_layer");
            if (mediaLayer) {
                mediaLayer.opacity = this.formatTooltip(value);
            }
        },
        // 加载多媒体资源
        handleChange(value) {
            let that = this;
            this.removeLayer();
            this.$loadModules(["esri/geometry/Extent",
                "esri/layers/support/ExtentAndRotationGeoreference",
                "esri/layers/MediaLayer",
                "esri/layers/support/VideoElement",
                "esri/layers/support/ImageElement"]).then(([
                    Extent,
                    ExtentAndRotationGeoreference,
                    MediaLayer, 
                    VideoElement,
                    ImageElement]) => {
                        let element;
                        if(value==='img'){
                            element = new ImageElement({
                                image: require("./img/fujian230905.png"),
                                georeference: new ExtentAndRotationGeoreference({
                                    extent: new Extent({
                                        xmin: 115.853363,
                                        ymin: 23.54899,
                                        xmax: 120.725566,
                                        ymax: 28.31207,
                                        spatialReference: {
                                            wkid: 4326
                                        }
                                    })
                                })
                            });
                        }else if(value==='video'){
                            element = new VideoElement({
                                video: "https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/videos/hurricanes_aerosol-aug.mp4",
                                georeference: new ExtentAndRotationGeoreference({
                                    extent: new Extent({
                                        xmin: -150,
                                        ymin: 1,
                                        xmax: 20,
                                        ymax: 80,
                                        spatialReference: {
                                            wkid: 4326
                                        }
                                    })
                                })
                            });
                        }
                    // add the element to the media layer
                    const layer = new MediaLayer({
                        source: [element],
                        opacity: that.formatTooltip(that.opacity),
                        id:'media_layer'
                    });
                    map.layers.add(layer);
                    // 跳转到当前图层的范围
                    view.when(function() {
                        layer.when(function() {//es6语法
                            view.goTo(layer.fullExtent);
                        })
                    });
                }).catch(err=>{
                    console.log(err);
                })
        },
        // 移除图层
        removeLayer() {
            const mediaLayer = map.layers.find(layer=>layer.id==="media_layer");
            if(mediaLayer) {
                map.layers.remove(mediaLayer);
            }
        }
    }
}
</script>
  
<style scoped lang="scss">
.media_container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 10px;
  background-color: #fff;
  width: 220px;
}

.select_container {
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

</style>