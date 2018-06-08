<template>
  <div class="catelog_edit_module">
    <el-tabs type="border-card">

      <el-tab-pane label="基础设置">

        <div class="setOne">
          <my-select v-model="infor.fontWeight" :option="$store.state.options.myFontWeight" title="文字粗细" ></my-select>
          <my-select v-model="infor.fontAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
          <my-number v-model="infor.width"  title="栏目宽度" v-if="type === 'float' || modeSelection ==='vertical'"></my-number>
          <my-number v-model="infor.height"  title="栏目高度"></my-number>
          <my-number v-model="infor.fontSize"  title="字体大小" :min="12"></my-number>
        </div>

        <div class="setOne">
          <my-number v-model="infor.borderTopWidth" title="上边框宽"></my-number>
          <my-number v-model="infor.borderBottomWidth" title="下边框宽"></my-number>
          <my-number v-model="infor.borderleftWidth" title="左边框宽"></my-number>
          <my-number v-model="infor.borderRightWidth" title="右边框宽"></my-number>
          <my-color v-model="infor.color" title="文字颜色"></my-color>
        </div>

        <div class="setOne">
          <my-color v-model="infor.borderColor" title="边框颜色"></my-color>
          <my-select v-model="infor.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
          <my-color v-model="infor.background" title="背景颜色"></my-color>
          <my-number v-model="infor.borderRadius"  title="圆角半径"></my-number>
          <my-number v-model="infor.paddingLeft" title="左内边距"></my-number>
        </div>
      </el-tab-pane>

      <el-tab-pane label="选中设置">
        <div class="setOne">
          <my-color v-model="infor.seleColor" title="文字颜色"></my-color>
          <my-color v-model="infor.seleBackground" title="背景颜色"></my-color>
          <my-number v-model="infor.seleFontSize"  title="字体大小" :min="12"></my-number>
        </div>

      </el-tab-pane>
    </el-tabs>



  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'basic_catelog_edit',
    props:{
      infor:{
        type:Object,
        default:null,
      },
        type:{
            type:String,
            default:'',
        },
        modeSelection:{
            type:String,
            default:'',
        }

    },
    data () {
      return {

      }
    },
    watch:{
    },
    created(){

    },
    components:{
    },
    methods:{

    },

    mounted(){}
  }
</script>
