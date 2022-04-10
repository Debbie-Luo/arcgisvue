<template>
  <div class="maptools-view">
    <el-card class="box-card">
      <p>位置参数</p>
      <!-- <div slot ="header" class="clearfix">
        <span>位置参数</span>
      </div> -->
      <div></div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'Location',
  components: {
  }
}
</script>
<style scoped>
.maptools-view {
    position: absolute;
    padding: 0 15px;
    height: 30px;
    top: 20px;
    right: 15px;
    background-color: #fff;
}
.box-card {
    position: absolute;
    width: 480px;
    height: 300px;
    background-color: #fff;
    bottom: 15px;
    left: 15px;
  }
 .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>
