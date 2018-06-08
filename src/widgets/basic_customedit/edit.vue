<template>
  <div class="dateEdit">
    <!--初始显示-->
    <div class="init_edit" v-if="$store.state.parts == ''">
        <!-- <span
          @click="templet.p_select_parts('con_set')"
          @mouseover="templet.p_index_hover_parts('con_set')"
          @mouseout="templet.p_index_out_parts()"
        >内容设置</span> -->
        <span
          @click="templet.p_select_parts('custom1')"
          @mouseover="templet.p_index_hover_parts('custom1')"
          @mouseout="templet.p_index_out_parts()"
        >样式设置</span>
    </div>
    
    <!--功能设置-->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'custom1'">
      <div class="setOne">
        <my-number v-model="infor.width" title="宽" ></my-number>
        <my-number v-model="infor.height" title="高" ></my-number>

      </div>
      <!-- customOption -->
      <div class="setOne">
        <my-select v-model="infor.custom_pos_style" title="定位类型" :option="$store.state.options.customOption"></my-select>
        <my-number v-model="infor.custom_pos_style_rate" title="滚定速度" v-show="infor.custom_pos_style == '0' "></my-number>
        <!-- <div style="float:left;width:70%;" v-show="infor.custom_pos_style == '2' ">
          <el-alert
            title="绝对定位只能通过基本属性的X、Y进行设置位置"
            type="warning"
            close-text="知道了">
          </el-alert>
        </div> -->
        
        <my-number v-model="infor.fixedLeft" title="左间距" v-show="infor.custom_pos_style == '2' "></my-number>
        <my-number v-model="infor.fixedTop" title="上间距" v-show="infor.custom_pos_style == '2' "></my-number>
      </div>

      <div class="setOne">
        <my-select v-model="infor.is_hover" title="开启悬浮" :option="$store.state.options.customOptionTwo"></my-select>
        <my-color v-model="infor.hover_color" title="文字颜色" v-show="infor.is_hover === '1' " ></my-color>
        <my-color v-model="infor.hover_bc_color" title="背景颜色" v-show="infor.is_hover === '1' " ></my-color>
      </div>

      <div class="setOne" v-show="infor.custom_pos_style != '1' ">
          <el-alert :style="{
              width:`60%`,
              marginBottom: '4px',
            minWidth:'300px'
            }" title="设置绝对定位、滚动定位之后，动画效果不能设置、也不起作用" type="info">
          </el-alert>
      </div>

      <!-- <div class="setOne">
      </div> -->
    </div>

    <!--内容设置-->
    <div class="Routine_setting" v-if="$store.state.parts == 'con_set'">
      <editor id="editor_id" height="500px" width="700px" :content="infor.contents"
        pluginsPath="/static/kindeditor/plugins/"
        :loadStyleMode="false"
        @on-content-change="onContentChange"  :items= "editCofig"></editor>
    </div>

  </div>
</template>

<script>
import style from "./style";

export default {
  name: "basic_customedit_edit",
  props: {},
  data() {
    return {
      infor: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.infor)
      ),
      listArr: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.listArr)
      ),
      animateObj: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.animateObj)
      ),
      editorText:'',
      editCofig:['source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'cut', 'copy', 'paste',
      'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
      'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
      'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
      'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
      'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image','multiimage',
      'flash', 'media',  'table', 'hr',  'baidumap', 'code', 'pagebreak',
      'link', 'unlink']
    };
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: "infor",
          val: JSON.parse(JSON.stringify(val))
        });
        this.templet.module_add_historical('编辑自定义内容组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: "animateObj",
          val: JSON.parse(JSON.stringify(val))
        });
        this.templet.module_add_historical('编辑自定义内容组件');
      },
      deep: true
    }
  },
  methods: {
    onContentChange(val){
      this.infor.contents  = val;
    }
  },
  mounted() {
    this.infor.custom_pos_style += '';
    this.infor.is_hover += '';
  }
};

</script>

<style scoped>

</style>
