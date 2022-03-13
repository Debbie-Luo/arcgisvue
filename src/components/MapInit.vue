<template>
    <div id="viewDiv"></div>
</template>
<script>
import { setDefaultOptions, loadModules } from 'esri-loader'

export default {
    mounted(){
        this.load();
    },
    methods:{
        load(){
            loadModules(["esri/views/SceneView","esri/Map"],{css:true}).then(([SceneView,Map])=>{
                var map = new Map({
                    basemap: "satellite",
                    ground: "world-elevation",
                });

                var view = new SceneView({
                    map: map,
                    container: "viewDiv",
                    camera: {
                        position: [113.257, 35.173, 931],
                        heading: 356.073,
                        tilt: 51.614,
                    },
                });
                console.log("view:",view)

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

