<template>

  <div class="basic_text_editor" :class="infor.isEdit ? '' : 'mouseClass'" :style="{
    width:infor.width + 'px',
  }" @mousedown="cancelDialog">
    <!--编辑框-->
    <div class="public_edit" v-if="!infor.isEdit">
      <ul>
        <li class="edit_module" @click.stop="editNow">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>

    <div class="quill-editor-example">
      <!--编辑时出现,全局蒙层，点击后任意处，恢复预览状态-->
      <!--<div class="clicklayer" @click="editEnd" v-if="isEdit"></div>-->
      <p class="edit_content" v-if="!infor.isEdit" v-html="listArr.content" @dblclick.stop="editNow"></p>
      <!--<textarea placeholder="此处输入内容 " disabled v-model="listArr.content"></textarea>-->


      <div class="myinput" v-if="infor.isEdit" @dblclick.stop>
        <div :class="infor.isEdit ? 'editor_frame' : ''">
          <div id="wangEdit" :style="{width:infor.width + 'px'}" ><P v-html="listArr.content"></P></div>

        </div>

        <!--<div class="view body_view" @click.stop="editEnd" id="body_view"></div>-->

      </div>
    </div>

  </div>
</template>

<script>
import E from "wangeditor";
export default {
  name: "basic_text_editor",
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
      isEdit: false,
      content: "",
      editorContent: "",
      editor: null
    };
  },
  watch: {
    'infor.isEdit'(val) {
      if (val) {
        this.$nextTick(() => {
          this.editorContent = this.listArr.content;
          this.createEditor();
          $('.w-e-text p:last').find('br').parent().remove();
            this.$store.commit('special_mongolian_open',{
                name:this.name,
                pid: this.pid,
                rowType: this.rowType,
                widgets_id: this.id
            });

        });
      }
      else{
          $("#u" + this.id).draggable({ disabled: false });
          $("#u" + this.id).resizable({ disabled: false });
          this.$store.commit('special_mongolian_close');
      }

    },
    content() {
    }
  },
  components: {},
  methods: {
    cancelDialog() {
      this.$store.state.module_Data = null;
      this.$store.state.module_name = "";
      this.$store.state.parts = "";
      this.$store.state.hover_parts = "";
    },
    onContentChange(val) {
      this.content = val;
    },
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      });
    },
    //呼出编辑框
    editNow() {

        //打开特殊蒙层
        this.$store.commit('special_mongolian_open',{
            name:this.name,
            pid: this.pid,
            rowType: this.rowType,
            widgets_id: this.id
        });
      $("#u" + this.id).draggable({ disabled: true });
      $("#u" + this.id).resizable({ disabled: true });
      //$('#u' + this.id).children('.ui-resizable-handle').addClass('resizable-handle-none');
      let IndexObj = this.templet.p_find_moduleIndex({
        pid: this.pid,
        type: this.rowType,
        id: this.id
      });
      this.content = this.$store.state[this.rowType][IndexObj.row].children[
        IndexObj.module
      ].data.listArr.content;
      this.infor.isEdit = true;
    },
    /*editEnd() {
      $("#u" + this.id).draggable({ disabled: false });
      $("#u" + this.id).resizable({ disabled: false });
      $("#u" + this.id)
        .children(".ui-resizable-handle")
        .removeClass("resizable-handle-none");
      let IndexObj = this.templet.p_find_moduleIndex({
        pid: this.pid,
        type: this.rowType,
        id: this.id
      });
      this.$store.state[this.rowType][IndexObj.row].children[
        IndexObj.module
      ].data.listArr.content = this.getContent();
      this.infor.isEdit = false;
      $("#body_view").remove();
      $("#u" + this.id).removeClass("basic_text_editor_top");
    },*/
    createEditor() {
      this.editor = new E("#wangEdit");
      this.editor.customConfig.menus = [
        "head",
        "bold",
        // "fontSize",
        "fontName",
        "italic",
        "underline",
        "foreColor",
        "backColor",
        "justify",
        "lineheight",
        "indent",
        "link",
        
      ];
      this.editor.customConfig.familys = [
        "宋体",
        "黑体",
        "楷体",
        "微软雅黑",
        "Arial",
        // "Verdana",
        // "Georgia"
      ];
      this.editor.customConfig.fontNames = [
        "宋体",
        "黑体",
        "楷体",
        "微软雅黑",
        "Arial",
        // "Verdana",
        // "Georgia"
      ];
    
      /*this.editor.customConfig.onchange = html => {
        this.infor.editorContent = html;
          console.log(html);

      };*/
      this.editor.create();
    },
    getContent: function() {
      return this.editorContent
    },

  },

  mounted() {




   
  }
};
</script>
