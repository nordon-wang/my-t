<template>
  <div class="module animated DragDom" :id="'u'+id" :name="name" :pid="pid" :rowType="rowType" :class="[
      moduleTop,animatClass,special_moduleTop,
      $store.state.select_module.idArr.indexOf(id) > -1 ? 'select_Highlight' : '',
      name === 'basic_text_editor' ? 'module_text_editor' : ''
      ]" :style="moduleClass" v-show="isShow" @click.stop="select_module" @mousedown.stop @dblclick.stop>
    <slot name='content'></slot>

    <!-- <div class="module_name">{{templet.p_nameToChinese(name)}}</div>-->

    <div class="module_position">
      <span>X:</span>
      <span class="module_left">{{css.module_left}}</span>
      <span>Y:</span>
      <span class="module_top">{{css.module_top}}</span>
    </div>
    <div class="module_width">
      <span>W:</span>
      <span class="module_left">{{css.module_width}}</span>
      <span>H:</span>
      <span class="module_top">{{css.module_height}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basic_module',
  props: {
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    css: {
      type: Object,
      default: null
    },
    pid: {
      type: String,
      default: ''
    },
    rowType: {
      type: String,
      default: ''
    },
    animateObj: {
      type: Object,
      default: null
    },
    isShow: {
      type: Boolean,
      default: true
    },
    infor: {
      type: Object,
      default: null
    },
    listArr: {}
  },
  data() {
    return {
      targetDom: [], //在同屏幕的dom数组
      Error_amount: 1, //对齐的误差量
      Error_lock: 5, //锁定的误差
      lock: {
        transverse_lock: false, //横向锁定值
        vertical_lock: false //竖向锁定值
      },
      position: {
        select: {
          id: 0,
          top: 0,
          left: 0
        },
        all: []
      }
    }
  },
  components: {},
  watch: {
      /*css:{
          handler: function (val, oldVal) {
              const name = this.templet.p_nameToChinese(this.name)
              this.templet.module_add_historical(`${name}基础属性修改`);
          },
          deep: true
      },*/
  },
  computed: {
    moduleTop() {
      if (this.$store.state.module_Data) {
        //快速文本不应该有高亮
        if (this.$store.state.module_Data.name == 'basic_text_editor') {
          return ''
        }
        if (this.$store.state.module_Data.widgets_id == this.id) {
          return 'moduleTop'
        }
      }
    },
    moduleClass() {
      return {
        top: this.css.module_top + 'px',
        left: this.css.module_left + 'px',
        //backgroundColor:this.css.backgroundColor,
        animationDelay: this.animateObj.animatedDelay + 's',
        animationDuration: this.animateObj.animatedDuration + 's',
        borderTopWidth: this.css.w_border_top_width + 'px',
        borderTopStyle: this.css.w_border_top_style,
        borderTopColor: this.css.module_pulick_border_top_color,
        borderBottomWidth: this.css.w_border_bottom_width + 'px',
        borderBottomStyle: this.css.w_border_bottom_style,
        borderBottomColor: this.css.module_pulick_border_bottom_color,
        borderLeftWidth: this.css.w_border_left_width + 'px',
        borderLeftStyle: this.css.w_border_left_style,
        borderLeftColor: this.css.module_pulick_border_left_color,
        borderRightWidth: this.css.w_border_right_width + 'px',
        borderRightStyle: this.css.w_border_right_style,
        borderRightColor: this.css.module_pulick_border_right_color,
        // backgroundImage:infor.w_bg_src ? `url(${$store.state.domain}${infor.w_bg_src})` : '',
        backgroundImage: this.css.w_bg_src
          ? `url(${this.$store.state.domain}${this.css.w_bg_src})`
          : '',
        backgroundRepeat: this.css.w_tile_style,
        backgroundPosition: this.css.w_bg_position,
        opacity: this.css.w_opacity ? this.css.w_opacity : 1,
        borderRadius: this.css.w_border_raduis_num + 'px',
        padding: this.css.w_fill + 'px',
        backgroundColor: this.css.w_background
        // backgroundSize: `100% 100%`
      }
    },
    animatClass() {

      // fixed定位 不执行动画
      if(this.infor.videoPosition == 'fixed' || this.infor.custom_pos_style == '0' ||this.infor.custom_pos_style == '2' ){
        return '';
      }

      //新拖拽进来挂件的时候 防止再触发一次动画
      if(this.$store.state.addNewModule){
        return ''
      }

      if (this.animateObj.animatedType) {
        // 拥有动画的module 都会拥有一个特殊类hasAnimated
        return (
          this.animateObj.animatedType +
          this.animateObj.animatedState +
          ' hasAnimated'
        )
      } else {
        return this.animateObj.animatedType + this.animateObj.animatedState
      }
    },
    special_moduleTop() {
      if (this.$store.state.special_mongolian.module) {
        if (this.$store.state.special_mongolian.module.widgets_id == this.id) {
          return 'special_moduleTop'
        } else {
          return ''
        }
      } else {
        return ''
      }
    }
  },
  methods: {
    //选中一个module
    select_module(e) {
      const data = {
        animateObj: this.animateObj,
        listArr: this.listArr,
        infor: this.infor,
        css: this.css
      }

      if (e.ctrlKey) {
        this.templet.in_select_module(
          this.name,
          this.id,
          this.pid,
          this.rowType,
          data
        )
      } else {
        this.templet.clear_select_module()
        this.templet.in_select_module(
          this.name,
          this.id,
          this.pid,
          this.rowType,
          data
        )
      }

      //row展开
      const row_index = this.templet.p_find_rowIndex({
        id: this.pid,
        type: this.rowType
      })

      this.$store.state[this.rowType][row_index].isShow = true
    }
  },

  mounted() {
    // 兼容处理
    if (this.css.w_background == 'transparent') {
      this.css.w_background = `rgba(255,255,255,0)`
    }
    if (!this.css.w_bg_position) {
      this.css.w_bg_position = 'center center'
    }

    // 判断module的宽高 兼容处理
    // 新客户端拖拽进来一个新的挂件
    if (
      parseInt(this.css.module_width) == 200 &&
      parseInt(this.css.module_height) == 200
    ) {
      this.css.module_width = $(this.$el).width()
      this.css.module_height = $(this.$el).height()
    }
    /**
     *    切换样式选择时 module的宽高 确定之后 还是之前的宽高 -- 高度不能自适应
     */

    // 链接挂件  兼容处理
    if (this.name == 'basic_gratext') {
      this.$el.style.cssText = `width:${this.css.module_width}px !important;
        height:${this.css.module_height}px !important;`
      $(this.$el).css(this.moduleClass)

      // 触发一次缩放操作 让module内的布局刷新
      const id = $(this.$el)
        .attr('id')
        .replace('u', '')
      const type = $(this.$el).attr('rowType')
      const name = $(this.$el).attr('name')
      const pid = $(this.$el).attr('pid')
      const IndexObj = this.templet.p_find_moduleIndex({ pid, type, id })
      const rowIndex = IndexObj.row
      const moduleIndex = IndexObj.module

      // module的宽和高
      const width = this.css.module_width
      const height = this.css.module_height

      this.templet.t_change_size({
        id,
        name,
        type,
        rowIndex,
        moduleIndex,
        width,
        height
      })
    }

    const that = this
    // $('#u' + this.id + '  div.my_searchs_drag').draggable();
    // 判断视频是否是固定 若是固定 不绑定拖拽和缩放
    if ($('#u' + this.id).css('position') != 'fixed') {
      // console.log(this);
      this.templet.moudle_draggable();
      // 防止这几个挂件 弹出编辑框的时候 ， 导致弹出框的拖拽范围 handle被覆盖
      if ($('#u' + this.id).hasClass('ui-draggable')) {
        if (this.name == 'basic_customedit') {
          $('#u' + this.id).draggable('option', 'handle', 'div#customedit')
        } else if (this.name == 'basic_links') {
          $('#u' + this.id).draggable('option', 'handle', 'div#date')
        } else if (this.name == 'basic_nleavemessage') {
          $('#u' + this.id).draggable('option', 'handle', 'div#imgsmodel')
        }
      }
      this.templet.moudle_resizable()
    } else {
      $('#u' + this.id)
        .find('.ui-resizable-handle')
        .removeClass('resizable-handle-none')
    }
  }
}
</script>
