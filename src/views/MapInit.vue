<template>
    <div id="viewDiv"></div>
</template>
<script>
import { setDefaultOptions, loadModules } from 'esri-loader'

window.view;

export default {
    mounted(){
        this.loadView();
    },
    methods:{
        loadView(){
            let options ={
                url:'https://js.arcgis.com/4.22/',
                css:'https://js.arcgis.com/4.22/esri/themes/light/main.css'
            };
            loadModules(["esri/views/SceneView","esri/Map"],options).then(([SceneView,Map])=>{
                let map = new Map({
                    basemap: "satellite",
                    ground: "world-elevation",
                });

                let view = new SceneView({
                    map: map,
                    container: "viewDiv",
                    camera: {
                        position: [113.257, 35.173, 931],
                        heading: 356.073,
                        tilt: 51.614,
                    },
                });
                window.view = view;
                console.log("view:",view)
            }).catch((err)=>{
                console.log("创建地图失败错误原因:"+err)
            })
        }

    }
    
}
</script>
<style scoped lang="scss">
 #viewDiv {
    // position: absolute;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
      }
</style>

