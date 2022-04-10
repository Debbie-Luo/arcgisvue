<template>
  <div>
      <el-dialog title="开卡设置" :visible.sync="openCardDialog">这是一个弹窗！</el-dialog>
  </div>
</template>

<script>

export default {
  name: 'cardDialog',
  components: {

  },
  props:{
      visible:{
          type:Boolean,
          default:false,
      }
  },
  computed:{
     openCardDialog:{
         get(){
             return this.visible
         },
         set(val){
             console.log(val);
             this.$emit('update:visible',val);
         }
     } 
  }
}
</script>
<style scoped>

</style>
