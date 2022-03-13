<template>
  <div class="about">
    <Index></Index>
    <!-- <MapInit></MapInit> -->
  </div>
</template>
<script>
import Index from '../components/Index.vue'
import MapInit from "../components/MapInit.vue"
export default {
  components: {
    Index,
    MapInit
  },
  name:'About'
}
</script>

