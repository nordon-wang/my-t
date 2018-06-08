<template>
  <div class="basic_honor_view" :style="{
    width:infor.box.width + 'px',
  }">

    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_honor')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择" >
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>

        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_honor','public_defaultStyle')"></li>
        </my-tooltip>

        <my-tooltip content="样式保存" >
          <li class="edit_module el-icon-star-off" @click.stop="select_parts('','');$store.state.styleSave_IsOpen = true"></li>
        </my-tooltip>
        <my-tooltip content="基础设置" >
          <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>


      </ul>
    </div>

    <div class="indexHonor allSetFM"
         @dblclick.stop="select_parts('honor_box','basic_honor')"
         :class="[
       $store.state.module_Data ? $store.state.parts == 'honor_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       $store.state.module_Data ? $store.state.hover_parts == 'honor_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       ]">
      <div>
        <h1
          class="mouseClass"
          @dblclick.stop="select_parts('honor_title','basic_honor')"
          :class="[
       $store.state.module_Data ? $store.state.parts == 'honor_title' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       $store.state.module_Data ? $store.state.hover_parts == 'honor_title' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       ]"
          data-Highlight="honor_title"
          :style="{
                    width:infor.header.width + 'px',
                    height:infor.header.height + 'px',
                    background:infor.header.background,
                    color:infor.header.color,
                    fontSize:infor.header.fontSize + 'px',
                    textAlign:infor.header.textAlign,
                    lineHeight:infor.header.height + 'px',
                }" v-text="listArr.header.content"></h1>
        <ul :style="{
                    width:infor.box.width + 'px',
                    height:infor.box.height + 'px',
                    borderLeftWidth:infor.box.borderLeftWidth + 'px',
                    borderRightWidth:infor.box.borderRightWidth + 'px',
                    borderTopWidth:infor.box.borderTopWidth + 'px',
                    borderBottomWidth:infor.box.borderBottomWidth + 'px',
                    borderColor:infor.box.borderColor,
                    borderStyle:infor.box.borderStyle,
                    background:infor.box.background,
                    padding:infor.box.padding + 'px',
                }">
          <li v-for='val in indexData'
              class="mouseClass"
              @dblclick.stop="select_parts('honor_module','basic_honor')"
              :class="[
             $store.state.module_Data ? $store.state.parts == 'honor_module' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             $store.state.module_Data ? $store.state.hover_parts == 'honor_module' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             ]"
              data-Highlight="honor_module"
              :style="{
                        width:infor.one.boxWidth + 'px',
                        borderLeftWidth:infor.one.borderLeftWidth + 'px',
                        borderRightWidth:infor.one.borderRightWidth + 'px',
                        borderTopWidth:infor.one.borderTopWidth + 'px',
                        borderBottomWidth:infor.one.borderBottomWidth + 'px',
                        borderColor:infor.one.borderColor,
                        borderStyle:infor.one.borderStyle,
                        background:infor.one.background,
                        padding:infor.one.padding + 'px',
                        marginTop:infor.one.marginTop ? infor.one.marginTop + 'px' : infor.one.marginTop == 0 ? '0px' : infor.one.margin + 'px',
                        marginLeft:infor.one.marginLeft ? infor.one.marginLeft + 'px' : infor.one.marginLeft == 0 ? '0px' : infor.one.margin + 'px',
                        marginBottom:infor.one.marginBottom ? infor.one.marginBottom + 'px' : infor.one.marginBottom == 0 ? '0px' : infor.one.margin + 'px',
                        marginRight:infor.one.marginRight ? infor.one.marginRight + 'px' : infor.one.marginRight == 0 ? '0px' : infor.one.margin + 'px',
                    }">
            <img :src="$store.state.domain + val.src"
                 class="mouseClass"
                 @dblclick.stop="select_parts('honor_module_pic','basic_honor')"
                 :class="[
             $store.state.module_Data ? $store.state.parts == 'honor_module_pic' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             $store.state.module_Data ? $store.state.hover_parts == 'honor_module_pic' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             ]"
                 data-Highlight="honor_module_pic"
                 :style="{
                            width:infor.one.width + 'px',
                            height:infor.one.height + 'px',
                        }">
            <b
              class="mouseClass"
              @dblclick.stop="select_parts('honor_module_title','basic_honor')"
              :class="[
             $store.state.module_Data ? $store.state.parts == 'honor_module_title' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             $store.state.module_Data ? $store.state.hover_parts == 'honor_module_title' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             ]"
              data-Highlight="honor_module_title"
              :style="{
                            width:infor.one.width + 'px',
                            lineHeight:infor.oneTitle.lineHeight + 'px',
                            color:infor.oneTitle.color,
                            fontSize:infor.oneTitle.fontSize + 'px',
                            textAlign:infor.oneTitle.textAlign,
                            display:infor.oneTitle.display,
                        }" v-text="val.title"></b>
            <p
              class="mouseClass"
              @dblclick.stop="select_parts('honor_module_content','basic_honor')"
              :class="[
             $store.state.module_Data ? $store.state.parts == 'honor_module_content' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             $store.state.module_Data ? $store.state.hover_parts == 'honor_module_content' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             ]"
              data-Highlight="honor_module_content"
              :style="{
                            width:infor.one.width + 'px',
                            height:infor.oneContent.height + 'px',
                            lineHeight:infor.oneContent.lineHeight + 'px',
                            color:infor.oneContent.color,
                            fontSize:infor.oneContent.fontSize + 'px',
                            textAlign:infor.oneContent.textAlign,
                            display:infor.oneContent.display,
                            wordBreak:'break-all'
                        }" v-text="val.content"></p>
          </li>
        </ul>
      </div>
    </div>



  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'basic_honor',
    props:{
      infor:{
        type:Object,
        default:null,
      },
      css:{
        type:Object,
        default:null,
      },
      listArr:{
        type:Object,
        default:null,
      },
      id:{
        type:String,
        default:'',
      },
      pid:{
        type:String,
        default:'',
      },
      rowType:{
        type:String,
        default:'',
      },
        name:{
            type:String,
            default:''
        },


    },
    data () {
      return {
          indexData:[],


      }
    },
    computed:{


    },
    components:{


    },
    watch:{
        'listArr.textLength'(){
            this.textLength();
        },
        'listArr.listArr'(val){
            this.indexData = JSON.parse(JSON.stringify(val));
            this.textLength();
        }


    },


    updated:function () {



    },

    methods:{
      select_parts(partsName,moduleName){
        this.templet.p_index_select_parts({
          partsName,
          moduleName,
          id:this.id,
          pid:this.pid,
          type:this.rowType
        })
      },
      textLength:function () {
          var module = this.indexData;
          for(var i = 0; i < module.length; i++ ){
              //第一次的时候，备份一下简介数据，后面每次修改，都在备份的这个简介上做操作
              if(!module[i].mySummary){
                  module[i].mySummary = module[i].content;
              }
              if(module[i].mySummary.length > this.listArr.textLength){
                  module[i].content = module[i].mySummary.substring(0,this.listArr.textLength) + '...';
              }
              else if(module[i].mySummary.length == this.listArr.textLength){
                  module[i].content = module[i].mySummary;
              }

              if (this.listArr.textLength == 0){
                  module[i].content = '';
              }
          }
          this.indexData = module;
      },

    },

    mounted(){
        this.indexData = JSON.parse(JSON.stringify(this.listArr.listArr));
        this.textLength();

    }
  }
</script>
<style>


</style>
