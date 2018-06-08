<template id="number">
  <p class="myInput">
    <strong v-text="title" :title="prompt || title" :alt="prompt || title"></strong>
    <el-input-number
      v-model="Result"
      @change="handleChange"
      :min="min"
      :max="max"
      :style="my_style"
      :step="step"
      size="small"
      :controls="controls"
    ></el-input-number>
  </p>
</template>

<script>

/*
 <my-number v-model="test" title="切换时间"></my-number>
* */
  export default {
    name: 'public_number',
    props:{
      prompt:{
        type:String,
        default:''
      },
      value:{
        type:Number,
        default:0,
      },
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
        default:''
      },
      my_style:{
        type:Object,
        default:function () {
          return {
            width: '130px',
            marginTop: '0px',
            textAlign:'center',
            lineHeight: '34px'
          }
        }
      },
      step:{
        type:Number,
        default:1
      },
      controls:{
        type:Boolean,
        default:true
      }
    },
    data () {
      return {
        Result:this.value,
      }
    },
    methods: {
      handleChange(value) {
        this.val = value;
      }
    },
    watch:{
      Result(val,oldVal){
        this.$emit('input',val);//双向数据绑定
      },
      value(val){
        this.Result = val;
      }

    },
    components:{

    },

    mounted(){


    }
  }
</script>
