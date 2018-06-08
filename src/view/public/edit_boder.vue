<template id="border">
  <!-- clearfix -->
  <div class="myBorder " :style="{
    width: type == 'all' ? '40%' : '20%'
  }">
    <strong v-if="type == 'all'" style="float: left;width: 90px;height: 34px;line-height: 34px;" :title="prompt || title">
      {{$props.title}}
    </strong>

    <div class="title" v-if="type == 'all'" :style="{
      borderColor: type == 'all' ? '#333' : '#ccc',
    }">
      <img src="../../../static/image/border.jpg">
    </div>

    <div class="title" v-if="type != 'all'" :style="{
      borderTopColor: type == 'top' ? '#333' : '#ccc',
      borderRightColor: type == 'right' ? '#333' : '#ccc',
      borderLeftColor: type == 'left' ? '#333' : '#ccc',
      borderBottomColor: type == 'bottom' ? '#333' : '#ccc'
    }">
      <img src="../../../static/image/border.jpg">
    </div>

    <div class="sele" :style="{
      width: type == 'all' ? '130px' : '30%'
    }">
      <el-select v-model="myStyle" placeholder="请选择" style="width:100%;">
        <el-option
          v-for="item in $store.state.options.borderStyle"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="color">
      <my-color v-model="myColor" title=""></my-color>
      <!--<el-color-picker v-model="myColor"></el-color-picker>-->
    </div>

    <div class="int" :style="{
      width: type == 'all' ? '130px' : '30%'
    }">
      <el-input-number
        v-model="myWidth"
        style="width:100%;"
        :min='0'
        controls-position="right"></el-input-number>
    </div>


  </div>
</template>

<script>

  /*
   <my-border
   type="top"
   :my_width.sync="borderWidth"
   :my_color.sync="borderColor"
   :my_style.sync="borderStyle"
   ></my-border>

   * */
  export default {
    name: 'public_border',
    props:{
      type:{
        type:String,
        default:'',
      },
      my_width:{
        type:Number,
        default:0,
      },
      my_color:{
        type:String,
        default:'',
      },
      my_style:{
        type:String,
        default:'',
      },
      title:{
        type:String,
        default:''
      },
      prompt:{
        type:String,
        default:''
      }
    },
    data () {
      return {
        myColor:this.my_color,
        myStyle:this.my_style,
        myWidth:this.my_width,
      }
    },
    watch:{
      myWidth:function (val) {
        this.$emit('update:my_width', val)
      },
      myStyle:function (val) {
        this.$emit('update:my_style', val)
      },
      myColor:function (val) {
        this.$emit('update:my_color', val)
      },
      my_width(){
        this.myWidth = this.my_width;
      },
      my_style(){
        this.myStyle = this.my_style;
      },
      my_color(){
        this.myColor = this.my_color;
      }

    },
    methods:{


    },
    components:{

    },

    mounted(){


    }
  }
</script>
