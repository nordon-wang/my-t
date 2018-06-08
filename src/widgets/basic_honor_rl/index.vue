<template>
  <div class="honor_rl_view" :style="{
    width:infor.box.width + 'px',
  }">

    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_honor_rl')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择" >
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>

        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_honor_rl','public_defaultStyle')"></li>
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

    <div class="indexHonorRl allSetFM">
      <div>
        <h1
                class="mouseClass"
                @dblclick.stop="select_parts('honor_title','basic_honor_rl')"
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
        <div class="indexHonorRl_body mouseClass"
             @dblclick.stop="select_parts('honor_box','basic_honor_rl')"
             :class="[
             $store.state.module_Data ? $store.state.parts == 'honor_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             $store.state.module_Data ? $store.state.hover_parts == 'honor_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             ]"
             data-Highlight="honor_box"
             :style="{
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
          <div class="imgFrame mouseClass"
               @dblclick.stop="select_parts('honor_pic_box','basic_honor_rl')"
               :class="[
             $store.state.module_Data ? $store.state.parts == 'honor_pic_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             $store.state.module_Data ? $store.state.hover_parts == 'honor_pic_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             ]"
               data-Highlight="honor_pic_box"
               :style="{
                        width:infor.imgFrame.width + 'px',
                        height:infor.imgFrame.height + 'px',
                        lineHeight:infor.imgFrame.height + 'px',
                        borderLeftWidth:infor.imgFrame.borderLeftWidth + 'px',
                        borderRightWidth:infor.imgFrame.borderRightWidth + 'px',
                        borderTopWidth:infor.imgFrame.borderTopWidth + 'px',
                        borderBottomWidth:infor.imgFrame.borderBottomWidth + 'px',
                        borderColor:infor.imgFrame.borderColor,
                        borderStyle:infor.imgFrame.borderStyle,
                        background:infor.imgFrame.background,
                        padding:infor.imgFrame.padding + 'px',
                        marginRight:infor.imgFrame.marginRight + 'px'
                    }">
            <div class="imgFrame_child">
              <img :src="listArr.listArr.length > 0 ? listArr.listArr[0].src : ''">
            </div>

          </div>
          <ul
            class="mouseClass"
            @dblclick.stop="select_parts('honor_tab_box','basic_honor_rl')"
            :class="[
             $store.state.module_Data ? $store.state.parts == 'honor_tab_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             $store.state.module_Data ? $store.state.hover_parts == 'honor_tab_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             ]"
            data-Highlight="honor_tab_box"
            :style="{
                        width:infor.tabFrame.width + 'px',
                        height:infor.tabFrame.height + 'px',
                        borderLeftWidth:infor.tabFrame.borderLeftWidth + 'px',
                        borderRightWidth:infor.tabFrame.borderRightWidth + 'px',
                        borderTopWidth:infor.tabFrame.borderTopWidth + 'px',
                        borderBottomWidth:infor.tabFrame.borderBottomWidth + 'px',
                        borderColor:infor.tabFrame.borderColor,
                        borderStyle:infor.tabFrame.borderStyle,
                        background:infor.tabFrame.background,
                        padding:infor.tabFrame.padding + 'px',

                    }">
            <li
              v-for='(val,i) in listArr.listArr'
              class="mouseClass"
              @dblclick.stop="select_parts('honor_tab_one','basic_honor_rl')"
              :class="[
             $store.state.module_Data ? $store.state.parts == 'honor_tab_one' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             $store.state.module_Data ? $store.state.hover_parts == 'honor_tab_one' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
             ]"
              data-Highlight="honor_tab_one"
              :style="i == 0 ? li_select_style : li_default_style">{{val.title}}</li>
          </ul>
        </div>

      </div>
    </div>



  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'basic_honor_rl',
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


      }
    },
    computed:{
      li_default_style(){
        return {
          width:(this.infor.one.width+this.infor.one.padding*2) + 'px',
          borderLeftWidth:this.infor.one.borderLeftWidth + 'px',
          borderRightWidth:this.infor.one.borderRightWidth + 'px',
          borderTopWidth:this.infor.one.borderTopWidth + 'px',
          borderBottomWidth:this.infor.one.borderBottomWidth + 'px',
          borderColor:this.infor.one.borderColor,
          borderStyle:this.infor.one.borderStyle,
          background:this.infor.one.background,
          padding:this.infor.one.padding + 'px',
          marginBottom:this.infor.one.margin + 'px',
          lineHeight:this.infor.one.lineHeight + 'px',
          height:this.infor.one.height + 'px',
          color:this.infor.one.color,
          fontSize:this.infor.one.fontSize + 'px',
          textAlign:this.infor.one.textAlign,
        }
      },
      li_select_style(){
        return {
          width:(this.infor.selectOne.width+this.infor.selectOne.padding*2) + 'px',
          borderLeftWidth:this.infor.selectOne.borderLeftWidth + 'px',
          borderRightWidth:this.infor.selectOne.borderRightWidth + 'px',
          borderTopWidth:this.infor.selectOne.borderTopWidth + 'px',
          borderBottomWidth:this.infor.selectOne.borderBottomWidth + 'px',
          borderColor:this.infor.selectOne.borderColor,
          borderStyle:this.infor.selectOne.borderStyle,
          background:this.infor.selectOne.background,
          padding:this.infor.selectOne.padding + 'px',
          marginBottom:this.infor.selectOne.margin + 'px',
          lineHeight:this.infor.selectOne.lineHeight + 'px',
          height:this.infor.selectOne.height + 'px',
          color:this.infor.selectOne.color,
          fontSize:this.infor.selectOne.fontSize + 'px',
          textAlign:this.infor.selectOne.textAlign,
        }
      }


    },
    components:{


    },
    watch:{


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

    },

    mounted(){

    }
  }
</script>
<style>


</style>
