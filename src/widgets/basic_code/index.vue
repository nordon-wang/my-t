<template>
  <div class="dateIndex  ">
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_code')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_code','public_defaultStyle')"></li>
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
    <div @dblclick.stop="select_parts('','basic_code')" :style="{
      width:infor.allwidth + 'px',
      height:infor.allheight + 'px'
    }">
      <div style="height:100%;" v-if="infor.codeHtml == ''">
        <h1 style="color:#666;font-size:16px;height:100%;display: flex;justify-content: center;align-items: center;">
          HTML为空时,预览时不显示DOM结构,但是CSS和JS会起作用
        </h1>
      </div>
      <div v-else v-html="infor.codeHtml"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basic_code',
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
      default: ''
    },
    pid: {
      type: String,
      default: ''
    },
    rowType: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      datas: {
      }
    }
  },
  watch:{
    ['infor.codeCss'](){
      this.cssInsert()
    }
  },
  computed: {
    moduleClass() {}
  },
  methods: {
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      })
    },
    cssInsert(){

      const _css = $(`#css${this.id}`)

      if(_css.length){
        _css.text(`${this.infor.codeCss}`)
      }else{
        $(`<style  id='css${this.id}'>
          ${this.infor.codeCss}
        </style>`).appendTo($(document).find('head'))
      }
    }
  },
  mounted() {
    this.cssInsert()
  }
}
</script>

<style lang="scss" scoped="" type="text/css" >
</style>
