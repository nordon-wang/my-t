<template>
  <p class="mySelect">
    <strong v-text="title" :title="prompt ? prompt : title"></strong>
    <el-select v-model="Result" placeholder="请选择" :style="my_style" @change="change">
      <el-option
        v-for="item in option"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </p>
</template>

<script>
  /*
  * <my-select v-model="test2" title="速度选择" :option="speed"></my-select>
  * */

  export default {
    name: 'public_select',
    props:{
      value:{
      },
      option:{
        type:Array,
        default:[]
      },
      title:{
        type:String,
        default:'',
      },
      prompt:{
        type:String,
        default:'',
      },
      my_style:{
        type:Object,
        default:function () {
          return {
            width: '130px',
            marginTop: '0px'
          }
        }
      }
    },
    data() {
      return {
        Result:this.value,
      };
    },
    components:{

    },
    computed:{

    },
    watch:{
      /*Result(val,oldVal){
        this.$emit('input',val);//双向数据绑定
      },*/
      value(val){
        this.Result = val;
      }

    },


    methods: {
        change(val){
            this.$emit('input',val);//双向数据绑定
            this.$emit('change',val)
        }

    },

    mounted() {
    }

  }

</script>

<style scoped>
  .line{
    margin-bottom:20px;
  }
  .lineTitle{
    height:30px;
    font-size: 12px;
    line-height:30px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
