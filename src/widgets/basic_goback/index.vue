<template>
    <div class="  " >
        <!--编辑框-->
        <div class="public_edit">
            <ul>
                <li class="edit_module" @click.stop="select_parts('','basic_goback')">{{templet.p_nameToChinese(name)}}编辑</li>
                <my-tooltip content="动画选择">
                  <li class="edit_module" @click.stop="select_parts('','public_animated')">
                    <span class="fa fa-flash"></span>
                  </li>
                </my-tooltip>
                <my-tooltip content="样式选择" >
                  <li class="edit_module el-icon-date" @click.stop="select_parts('basic_goback','public_defaultStyle')"></li>
                </my-tooltip>
                <my-tooltip content="样式保存" >
                  <li class="edit_module el-icon-star-off" @click.stop="select_parts('','');$store.state.styleSave_IsOpen = true"></li>
                </my-tooltip>
                <my-tooltip content="基础设置">
                  <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
                </my-tooltip>
                <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
            </ul>
        </div>
        <div >
          <p :style="{
              position:'relative',
              width:infor.goback_a_width + 'px',
              height:infor.goback_a_height + 'px',
              lineHeight:infor.goback_a_height + 'px',
              paddingLeft:infor.goback_a_padding_left + 'px',
              paddingRight:infor.goback_a_padding_right + 'px',
              backgroundColor:isHover ?   infor.goback_a_bc_color_hover : infor.goback_a_bc_color,
              textAlign:infor.goback_a_text_align,
              borderRadius:infor.goback_a_border_radiu + 'px',
              borderStyle:isHover ?  infor.goback_a_border_style_hover : infor.goback_a_border_style ,
              borderColor:isHover ?  infor.goback_a_border_color_hover : infor.goback_a_border_color ,
              borderWidth:isHover ?  infor.goback_a_border_width_hover : infor.goback_a_border_width + 'px',
            }"
            data-Highlight="goback_set1"
            :class="[
            $store.state.module_Data && $store.state.parts == 'goback_set1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'goback_set1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ]" 
            @dblclick.stop="select_parts('goback_set1','basic_goback')" >
            <a  :style="{
              display:'block',
              color:isHover ?  infor.goback_a_fs_color_hover : infor.goback_a_fs_color ,
              fontSize:infor.goback_a_fs + 'px'
            }" href="javascript:;">{{infor.goback_a_txt}}</a> 
            <i :style="{
              position:'absolute',
              color: isHover ?  infor.goback_icon_fs_color_hover : infor.goback_icon_fs_color ,
              fontSize:infor.goback_icon_fs + 'px',
              left:infor.goback_icon_left + 'px',
              top:infor.goback_icon_top + 'px',
              fontFamily: 'FontAwesome',
              border:` 1px solid transparent`
            }" 
            @dblclick.stop="select_parts('goback_set2','basic_goback')" 
            data-Highlight="goback_set2"
            :class="[
              infor.goback_icon_class,
              $store.state.module_Data && $store.state.parts == 'goback_set2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'goback_set2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]" 
              ></i>
          </p>
        </div>
    </div>
</template>

<script>
import myajax from '../../js/ajax';

export default {
  name: "basic_goback",
  props: {
    infor: {
      type: Object,
      default: null
    },
    listArr: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ""
    },
    pid: {
      type: String,
      default: ""
    },
    rowType: {
      type: String,
      default: ""
    },
    name:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      isHover:false
    };
  },
  methods: {
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      });
    },
    mouseEnter(){
      this.isHover = true;
    },
    mouseLeave(){
      this.isHover = false;
    }
    ,
    compatibleIcon(){
      const arr = [
        "ivu-icon-backspace-outline",
        "ivu-icon-backspace-outline",
        "ivu-icon-backspace",
        "ivu-icon-ios-undo-outline",
        "ivu-icon-ios-undo",
        "ivu-icon-arrow-return-left",
        "ivu-icon-arrow-left-b",
        "ivu-icon-arrow-left-a",
        "ivu-icon-android-arrow-back",
        "ivu-icon-ios-skipbackward-outline",
        "ivu-icon-ios-rewind-outline",
        "ivu-icon-ios-rewind",
        "ivu-icon-ios-skipbackward",
        "ivu-icon-ios-arrow-back",
        "ivu-icon-skip-backward",
      ];

      let str = this.infor.goback_icon_class
      let isExits = arr.some((item,index) => {
        return str.indexOf(item) >= 0
      })

      if(isExits){
        this.infor.goback_icon_class = 'fa-reply'
      }

    }
  },
  mounted(){

    // 图标兼容
    this.compatibleIcon()

  }
};
</script>

<style>
</style>
