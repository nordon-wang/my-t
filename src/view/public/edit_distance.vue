<template id="distance">
  <p class="myDistance">
    <strong v-text="title" :title="mytitle" :alt="mytitle"></strong>
    <el-input-number
      v-model="mytop"
      :min="min"
      :max="max"
      :style="my_style"
      :step="step"
    ></el-input-number>
    <el-input-number
      v-model="myright"
      :min="min"
      :max="max"
      :style="my_style"
      :step="step"
    ></el-input-number>
    <el-input-number
      v-model="mybottom"
      :min="min"
      :max="max"
      :style="my_style"
      :step="step"
    ></el-input-number>
    <el-input-number
      v-model="myleft"
      :min="min"
      :max="max"
      :style="my_style"
      :step="step"
    ></el-input-number>
  </p>
</template>

<script>

  /*
    <my-distance 
      title="外间距"
      :top.sync="infor.w_style1_margin_top"
      :right.sync="infor.w_style1_margin_right"
      :bottom.sync="infor.w_style1_margin_bottom" 
      :left.sync="infor.w_style1_margin_left"></my-distance>
   * */

  export default {
    name: 'public_distance',
    props:{
      min:{
        type:Number,
        default:0
      },
      max:{
        type:Number,
        default:100000
      },
      title:{
        type:String,
        default:'',
      },
      mytitle:{
        type:String,
        default:'上、右、下、左'
      },
      my_style:{
        type:Object,
        default:function () {
          return {
            width: '130px',
            marginTop: '0px',
            textAlign:'center'
          }
        }
      },
      step:{
        type:Number,
        default:1
      }
    },
    data () {
      return {
        mytop:this.$attrs.top,
        myright:this.$attrs.right,
        mybottom:this.$attrs.bottom,
        myleft:this.$attrs.left,
      }
    },
    methods: {
    },
    watch:{
      mytop:function (val) {
        this.$emit('update:top', val)
      },
      myright:function (val) {
        this.$emit('update:right', val)
      },
      mybottom:function (val) {
        this.$emit('update:bottom', val)
      },
      myleft:function (val) {
        this.$emit('update:left', val)
      }

    },
    components:{

    },

    mounted(){

    }
  }
</script>
<style>
p.myDistance{
    width: 60% !important;
    display: flex;
    justify-content: space-between;
    padding-right: 5%;
}
</style>
