<template>
  <div>
    <p class="myInput">
        <strong v-text="title" :title="prompt || title"></strong>
        <el-input  :placeholder="placeholder" 
        v-model="Result"
       :disabled="disabled"
       @change="change"
        :style="my_style" ></el-input>
    </p>
  </div>
</template>

<script>
export default {
    name:'public_input',
    props:{
      prompt:{
        type:String,
        default:''
      },
      value:{
        type:String,
        default:0,
      },
      title:{
        type:String,
        default:'',
      },
      placeholder:{
        type:String,
        default:'请输入内容'
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
        disabled:{
            type:Boolean,
            default:false,
        }
    },
    data(){
        return {
            Result:this.value
        }
    },
    watch:{
      Result(val,oldVal){
        this.$emit('input',val);//双向数据绑定
      }
    },
    computed:{

    },
    updated(){
      // 双击切换设置时，Result被缓存了
      this.Result = this.value
    },
    methods:{
        change(){
          this.$emit('change',this.Result);
        }
    }
}
</script>

<style>

</style>
