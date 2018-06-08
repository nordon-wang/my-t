<template>
  <div class="" :style='{
        width: this.infor.width + "px",
        height: this.infor.height + "px"
      }'>
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="open_self_modal()">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="样式设置">
          <li class="edit_module el-icon-edit" @click.stop="select_parts('','basic_customedit')"></li>
        </my-tooltip>
        <my-tooltip content="动画选择" v-show="infor.custom_pos_style == '1'">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="基础设置">
          <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>
    <div id="customedit" @dblclick.stop="open_self_modal()" class="mouseClass" :class="[
        $store.state.parts == 'con_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.hover_parts == 'con_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        ]" :style="divStyle">
      <div v-html="infor.contents" class="customeditCon" style="overflow: hidden;"></div>
      <!--  -->
      <!-- <div style="overflow: hidden;">
        <div class="resetCss text_content" v-html="infor.contents"></div>
      </div> -->
      <!--  -->

      <div style="width: 100%;
      height: 100%;
      position: absolute;
      z-index: 8;left:0;top:0;"></div>
    </div>

    <edit-module v-if="infor.isShows" v-on:closem="myclose" 
     v-model="infor.contents"></edit-module>
   
  </div>
</template>

<script>
import editModule from './editmodule'
export default {
  name: 'basic_customedit',
  components: {
    editModule
  },
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
      dialogVisible: false
    }
  },
  computed: {
    divStyle() {
      return {
        width: `${this.infor.width}px`,
        height: `${this.infor.height}px`,
        position: 'relative'
      }
    }
  },
  methods: {
    myclose() {
      this.infor.isShows = false
    },
    open_self_modal() {
      this.infor.isShows = true
      this.templet.p_index_select_parts({
        partsName: '',
        moduleName: '',
        id: this.id,
        pid: this.pid,
        type: this.rowType
      });

      this.$store.commit('special_mongolian_open', {
          name: this.name,
          pid: this.pid,
          rowType: this.rowType,
          widgets_id: this.id
      });
    },
    select_parts(partsName, moduleName) {
      this.infor.isShows = false
      this.$store.state.showMyMask = false

      this.templet.Special_Mongolian_Close()

      this.$nextTick(() => {
        this.templet.p_index_select_parts({
          partsName,
          moduleName,
          id: this.id,
          pid: this.pid,
          type: this.rowType
        })
      })
    },
    initPos() {
      if (this.infor.custom_pos_style == 2) {
        // $(this.$parent.$el).dra
        $(this.$parent.$el).draggable()
        $(this.$parent.$el).draggable('disable')
        $(this.$parent.$el).css({
          position: 'fixed',
          left: this.infor.fixedLeft + 'px',
          top: this.infor.fixedTop + 60 + 'px',
          zIndex: 999
        })

        // $(this.$parent.$el).resizable( "disable" );
        $(this.$parent.$el).addClass('fixedPosition')
      } else if (this.infor.custom_pos_style == 0) {
        $(this.$parent.$el).draggable()
        $(this.$parent.$el).draggable('disable')

        // $(this.$parent.$el).resizable( "disable" );
        $(this.$parent.$el).addClass('fixedPosition')
      } else {
        $(this.$parent.$el).css({
          position: 'absolute',
          // left: this.$parent.css.module_left + 'px',
          // top: this.$parent.css.module_top + 'px'
        })
        $(this.$parent.$el).removeClass('fixedPosition')
      }
    },
    initData() {
      // 获取三个参数 可以拿到所在的row moudule 和 row的类型
      let _pid = this.pid
      let _rowtype = this.rowType
      let _id = this.id

      let IndexObj = this.templet.p_find_moduleIndex({
        pid: _pid,
        type: _rowtype,
        id: _id
      })

      let rowIndex = IndexObj.row
      let moduleIndex = IndexObj.module
      let rowtype = this.rowType

      let moduleObj = this.$store.state[rowtype][rowIndex].children[moduleIndex].data.css

      this.$set(this.infor, 'width', moduleObj.module_width || 200)
      this.$set(this.infor, 'height', moduleObj.module_height || 200)
    }
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        // 历史记录撤销兼容处理
        if (val.isShows) {
          // this.open_self_modal();
        } else {
          this.$store.state.showMyMask = false
          this.$store.state.showCustomModel = false
        }

        // 初始化位置
        this.initPos()
      },
      deep: true
    }
  },
  mounted() {

    if (!this.infor.isShows) {
      this.$set(this.infor, 'isShows', false)
    }

    // 转成字符串
    this.infor.contents += ''

    // 初始化位置
    this.initPos()

    this.$nextTick(() => {
      // 刚拖拽进来时  打开弹出框
      if (this.infor.openShow) {
        this.open_self_modal()
        this.infor.openShow = false
      }

      // 兼容老版本
      if (!this.infor.width) {
        this.initData()
      }
      
    })
  },
  updated() {
    // 初始化位置
    this.initPos()
  }
}
</script>

<style lang="scss">
@import './reset.scss';

#selfmask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
