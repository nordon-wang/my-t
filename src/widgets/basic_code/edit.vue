<template>
  <div class="code_edit">
    <!--初始显示-->
    <div class="init_edit" v-if="$store.state.parts == ''">
      <span @click="templet.p_select_parts('code1')" class="mouseClass edit_second_level" data-Highlight="code1" :class="[
           $store.state.hover_parts == 'code1'  ? 'index_Highlight' : ''
           ]">代码管理</span>
      <!-- <span @click="templet.p_select_parts('code2')" class="mouseClass edit_second_level" data-Highlight="code2" :class="[
           $store.state.hover_parts == 'code2'  ? 'index_Highlight' : ''
           ]">时间设置</span> -->
    </div>

    <!--日期设置-->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'code1'">
      <div class="setOne">
        <el-button type="primary" size="small"
          :style="{
            float:'left',
            marginRight:'20px'
          }" @click.stop="editHtml('htmlEdit')">编辑HTML内容</el-button>
        <el-alert
          title="若是您不需要兼容低版本浏览器可以任意使用HTML5以及更新的标签,请慎重使用HTML5标签"
          type="warning"
          :style="{
            width:'700px',
            float:'left'
          }" >
        </el-alert>
      </div>
      <div class="setOne">
        <el-button type="primary" :style="{
            float:'left',
            marginRight:'20px'
          }" size="small" @click.stop="editHtml('cssEdit')">编辑CSS样式内容</el-button>
        <el-alert
          title="若是您使用的样式需要对不同浏览器进行兼容,需要自己手动编写,请慎重使用CSS3"
          type="warning"
          :style="{
            width:'700px',
            float:'left'
          }" >
        </el-alert>
      </div>
      <div class="setOne">
        <el-button type="primary" :style="{
            float:'left',
            marginRight:'20px'
          }" size="small" @click.stop="editHtml('jsEdit')">编辑JS内容</el-button>
        <el-alert
          title="若是您需要使用自己编写的JS代码,务必在本地测试完成再使用,防止死循环等问题"
          type="warning"
          :style="{
            width:'700px',
            float:'left'
          }" >
        </el-alert>
      </div>
      <div class="setOne">
        <my-select v-model="infor.themes" :style="{
            float:'left',
            marginRight:'20px'
          }" title="编辑器主题" :option="$store.state.options.editThemes"></my-select>

        <el-alert
          title="编辑器主题可以根据个人喜好进行选择,编辑器快捷键模拟的是sublime编辑器,sublime快捷键基本都可以使用"
          type="warning"
          :style="{
            width:'700px',
            float:'left'
          }" >
        </el-alert>
      </div>
    </div>

    <!--时间设置-->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'code2'">
    </div>

    <!-- html -->
    <el-dialog title="提示" :visible.sync="htmlEdit" 
    width="50%"
    :append-to-body="true">

      <codemirror v-model="infor.codeHtml" :options="editOptions('html')"></codemirror>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="htmlEdit = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- css -->
    <el-dialog class="codeEdit" title="提示" :visible.sync="cssEdit" 
    width="50%"
    :append-to-body="true">
      <el-alert
        :title="msg"
        type="warning">
      </el-alert>

      <codemirror v-model="infor.codeCss" :options="editOptions('css')"></codemirror>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cssEdit = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- js -->
    <el-dialog title="提示" :visible.sync="jsEdit" 
    width="50%"
    :append-to-body="true">
      <el-alert
        :title="jsMsg"
        type="warning">
      </el-alert>

      <codemirror v-model="infor.codeJs" :options="editOptions('javascript')"></codemirror>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="jsEdit = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import style from './style'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/htmlmixed/htmlmixed.js'
import 'codemirror/keymap/sublime.js'

// 主题
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/paraiso-light.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/rubyblue.css'

export default {
  name: 'basic_code_edit',
  props: {},
  data() {
    return {
      htmlEdit: false,
      cssEdit: false,
      jsEdit: false,
      msg:"",
      jsMsg:"",
      infor: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.infor)
      ),
      listArr: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.listArr)
      ),
      animateObj: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.animateObj)
      )
    }
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'infor',
          val: JSON.parse(JSON.stringify(val))
        })
        // this.templet.module_add_historical('编辑日期组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        // this.templet.module_add_historical('编辑日期组件');
      },
      deep: true
    }
  },
  computed: {
    inputStyle() {
      return {
        width: '130px',
        marginTop: '0px',
        textAlign: 'center'
      }
    }
  },
  methods: {
    editHtml(type) {
      this[type] = true
      $.each($('.el-dialog__header'), item => {
        $('.el-dialog__header')
          .eq(item)
          .parent()
          .draggable({ handle: 'div.el-dialog__header,div.el-dialog__footer' })
      })
    },
    editOptions(type){
      return {
        tabSize: 2,//tab字符的宽度，默认为4
        mode: `text/${type}`,//编辑的语言
        theme: `${this.infor.themes}`,// 编辑器主题
        lineNumbers: true,//在左侧显示行号
        line: true,//
        keyMap:'sublime',//配置快捷键
        showCursorWhenSelecting:true,//显示光标
        autofocus:true,//自动获取焦点
        lineWrapping:false,//x轴太长时 是换行还是滚动 true是换行
        cursorHeight:1,//光标高度
        matchBrackets: true,	//括号匹配
        smartIndent:true,//自动缩进
      }
    }
  },
  updated(){
  },
  mounted() {
    this.msg  = `增加全局样式需要谨慎处理,否则会导致页面排版错乱,
      若只是针对此挂件进行样式处理,需要处理CSS权重,增加此挂件的ID选择器'#u${this.$store.state.module_Data.widgets_id}',
      若是需要对其他挂件或者全局的其他样式进行修改,可以通过浏览器调试工具进行查找挂件或者容器的唯一ID,将样式作用域进行区分`;

    this.jsMsg = `为了安全性考虑,您的JS代码会进行简单的模块化,禁止暴露全局方法和变量名`
  }
}
</script>

<style>
.ui-draggable-handle{
  cursor: pointer;
}
</style>
