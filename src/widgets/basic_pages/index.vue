<template>
  <div class="  ">
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_pages')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="样式选择">
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_pages','public_defaultStyle')"></li>
        </my-tooltip>
        <my-tooltip content="样式保存">
          <li class="edit_module el-icon-star-off" @click.stop="select_parts('','');$store.state.styleSave_IsOpen = true"></li>
        </my-tooltip>
        <my-tooltip content="基础设置">
          <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>
    
    <ul :style="ul" :id="'my_pages'"  class="allSetFM"
      data-Highlight="pages1" @dblclick.stop="select_parts('pages1','basic_pages')">
        <li :style="li1" data-type="pre" 
        data-Highlight="pages2" @dblclick.stop="select_parts('pages2','basic_pages')" 
        :class="[
          $store.state.module_Data && $store.state.parts == 'pages2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'pages2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass',
              'page_move'
        ]">
            <span :style="span1" data-type="pretxt"

            data-Highlight="pages3" @dblclick.stop="select_parts('pages3','basic_pages')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'pages3' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'pages3' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass',
              'page_move'
            ]">{{infor.page_pre_txt}}</span>
            <a v-if="infor.page_a_width_overfllow == '0'" data-type="prea" :style="a1" href="javascript:;" 
            data-Highlight="pages4" @dblclick.stop="select_parts('pages4','basic_pages')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'pages4' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'pages4' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass',
              'page_move'
            ]">
                测试文本测试文本测试文本测试文本测试文本测试文本测试文本
            </a>
            <a v-else :style="a11" href="javascript:;" data-type="prea" 
            data-Highlight="pages4" @dblclick.stop="select_parts('pages4','basic_pages')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'pages4' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'pages4' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass',
              'page_move'
            ]">
                测试文本测试文本测试文本测试文本测试文本测试文本测试文本
            </a>
            <b :style="b1" data-type="predate" 
            data-Highlight="pages5" @dblclick.stop="select_parts('pages5','basic_pages')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'pages5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'pages5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass',
              'page_move'
            ]">2017-02-28 19:51:43</b>
        </li>
        <li  :style="li2" data-type="next" 
        data-Highlight="pages2" @dblclick.stop="select_parts('pages2','basic_pages')" 
        :class="[
          $store.state.module_Data && $store.state.parts == 'pages2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'pages2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass',
              'page_move'
        ]">
            <a v-if="infor.page_a_width_overfllow == '0'" data-type="nexta" :style="a2" href="javascript:;" 
            data-Highlight="pages4" @dblclick.stop="select_parts('pages4','basic_pages')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'pages4' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'pages4' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass',
              'page_move'
            ]">
                测试文本测试文本测试文本测试文本测试文本测试文本测试文本 
            </a>
            <a v-else :style="a22" href="javascript:;" data-type="nexta" 
            data-Highlight="pages4" @dblclick.stop="select_parts('pages4','basic_pages')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'pages4' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'pages4' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass',
              'page_move'
            ]">
                测试文本测试文本测试文本测试文本测试文本测试文本测试文本
            </a>
            <span :style="span2" data-type="nexttxt" 
            data-Highlight="pages3" @dblclick.stop="select_parts('pages3','basic_pages')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'pages3' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'pages3' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass',
              'page_move'
            ]">{{infor.page_next_txt}}</span>
            <b :style="b2" data-type="nextdate" 
            data-Highlight="pages5" @dblclick.stop="select_parts('pages5','basic_pages')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'pages5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'pages5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass',
              'page_move'
            ]">2016-12-23 14:50:54</b>
        </li>
    </ul>
  </div>
</template>
<script>
// import myajax from '../../js/ajax';
import Bus from '../../base/bus';

export default {
  name: "basic_pages",
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
      isHover: false,
      infos: [],
        targetDom:[],//在同屏幕的dom数组
        Error_amount:1,//对齐的误差量
        Error_lock:5,//锁定的误差
        lock:{
            transverse_lock:false,//横向锁定值
            vertical_lock:false,//竖向锁定值
        },
    };
  },
  computed: {
    ul: function() {
      return {
        width: this.infor.page_box_li_width + "px",
        height: this.infor.page_box_li_height + "px",
        position: "relative"
      };
    },
    b1: function() {
      return {
        position: "absolute",
        width: this.infor.page_date_width + "px",
        height: this.infor.page_date_height + "px",
        lineHeight: this.infor.page_date_height + "px",
        display: this.infor.page_b_is_show,
        fontSize: this.infor.page_b_fs + "px",
        color: this.infor.page_b_fs_color,
        left: this.infor.predate.left - this.infor.pre.left + "px",
        top: this.infor.predate.top - this.infor.pre.top + "px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      };
    },
    b2: function() {
      return {
        position: "absolute",
        width: this.infor.page_date_width + "px",
        height: this.infor.page_date_height + "px",
        lineHeight: this.infor.page_date_height + "px",
        display: this.infor.page_b_is_show,
        fontSize: this.infor.page_b_fs + "px",
        color: this.infor.page_b_fs_color,
        left: this.infor.nextdate.left - this.infor.next.left + "px",
        top: this.infor.nextdate.top - this.infor.next.top + "px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
      };
    },
    li1: function() {
      return {
        position: "absolute",
        width: this.infor.page_li_width + "px",
        height: this.infor.page_li_height + "px",
        background: this.infor.page_li_bc_color,
        left: this.infor.pre.left + "px",
        top: this.infor.pre.top + "px"
      };
    },
    li2: function() {
      return {
        position: "absolute",
        width: this.infor.page_li_width + "px",
        height: this.infor.page_li_height + "px",
        background: this.infor.page_li_bc_color,
        left: this.infor.next.left + "px",
        top: this.infor.next.top + "px"
      };
    },
    a1: function() {
      return {
        position: "absolute",
        fontSize: this.infor.page_a_fs + "px",
        color:
          this.infor.is_unify === "1"
            ? this.infor.page_a_fs_color
            : this.infor.is_unify_color,
        width: this.infor.page_a_width + "px",
        height: this.infor.page_a_height + "px",
        left: this.infor.prea.left - this.infor.pre.left + "px",
        top: this.infor.prea.top - this.infor.pre.top + "px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        lineHeight: this.infor.page_a_lineheight + "px"
      };
    },
    a11: function() {
      return {
        position: "absolute",
        fontSize: this.infor.page_a_fs + "px",
        color:
          this.infor.is_unify === "1"
            ? this.infor.page_a_fs_color
            : this.infor.is_unify_color,
        width: this.infor.page_a_width + "px",
        height: this.infor.page_a_height + "px",
        left: this.infor.prea.left - this.infor.pre.left + "px",
        top: this.infor.prea.top - this.infor.pre.top + "px",
        lineHeight: this.infor.page_a_lineheight + "px"
      };
    },
    a2: function() {
      return {
        position: "absolute",
        fontSize: this.infor.page_a_fs + "px",
        color:
          this.infor.is_unify === "1"
            ? this.infor.page_a_fs_color
            : this.infor.is_unify_color,
        width: this.infor.page_a_width + "px",
        height: this.infor.page_a_height + "px",
        left: this.infor.nexta.left - this.infor.next.left + "px",
        top: this.infor.nexta.top - this.infor.next.top + "px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        lineHeight: this.infor.page_a_lineheight + "px"
      };
    },
    a22: function() {
      return {
        position: "absolute",
        fontSize: this.infor.page_a_fs + "px",
        color:
          this.infor.is_unify === "1"
            ? this.infor.page_a_fs_color
            : this.infor.is_unify_color,
        width: this.infor.page_a_width + "px",
        height: this.infor.page_a_height + "px",
        left: this.infor.nexta.left - this.infor.next.left + "px",
        top: this.infor.nexta.top - this.infor.next.top + "px",
        lineHeight: this.infor.page_a_lineheight + "px"
      };
    },
    span1: function() {
      return {
        width: this.infor.page_txt_width + "px",
        height: this.infor.page_txt_height + "px",
        lineHeight: this.infor.page_txt_lineheight + "px",
        position: "absolute",
        fontSize: this.infor.page_span_fs + "px",
        color:
          this.infor.is_unify === "1"
            ? this.infor.page_span_fs_color
            : this.infor.is_unify_color,
        left: this.infor.pretxt.left - this.infor.pre.left + "px",
        top: this.infor.pretxt.top - this.infor.pre.top + "px"
      };
    },
    span2: function() {
      return {
        width: this.infor.page_txt_width + "px",
        height: this.infor.page_txt_height + "px",
        lineHeight: this.infor.page_txt_lineheight + "px",
        position: "absolute",
        fontSize: this.infor.page_span_fs + "px",
        color:
          this.infor.is_unify === "1"
            ? this.infor.page_span_fs_color
            : this.infor.is_unify_color,
        left: this.infor.nexttxt.left - this.infor.next.left + "px",
        top: this.infor.nexttxt.top - this.infor.next.top + "px"
      };
    }
  },
  filters:{
    dataFormat(val){
      return 123;
    }
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
    moveds(){

      const that = this;
      let is_disabled = false;
      if(this.$store.state.module_name != 'basic_pages'){
        is_disabled = true;//row排序后，重新渲染组件，这时拖拽应该是关闭的
      }
      
      $(`#u${this.id} #my_pages > li, #u${this.id} #my_pages > li > span, #u${this.id} #my_pages > li > a, #u${this.id} #my_pages > li > b`).draggable({
          containment: "parent",
          zIndex: 100,
          disabled: is_disabled,
          snapTolerance:10,
          start:function () {
              //对齐线开始准备//对齐线逻辑
              that.templet.aline_start(that,$(this),'.page_move');
          },
          drag:function ( event, ui) {
              //对齐线逻辑
              var dragLeft = $(this).offset().left;
              var dragTop = $(this).offset().top;

              var moveLeft = ui.offset.left;
              var moveTop = ui.offset.top;


              var dragWidth = $(this).width();
              var dragHeight = $(this).height();
              that.templet.aline_drag(that,$(this),dragLeft,dragTop,dragWidth,dragHeight,moveLeft,moveTop);
          },
          stop:function (event, ui) {
              that.templet.p_remove_line();
              let type = $(this).attr('data-type');

              if(type == 'pre' || type == 'next' ){
                that.infor[type].top = $(this).position().top;
                that.infor[type].left = $(this).position().left;
                /**
                 * 当li拖拽的时候 因为其内部的链接等的位置是不变的 导致位置不能跟随改变
                 */
                let childArr = $(this).children('[data-type]');

                for(let i =0; i< childArr.length; i++ ){
                  let childType = $(childArr[i]).attr('data-type')
                  let top = $(childArr[i]).position().top + $(this).position().top;
                  let left = $(childArr[i]).position().left + $(this).position().left;
                  that.infor[childType].top = top ;
                  that.infor[childType].left = left;
                  Bus.$emit('pages_dragble',childType,top,left)
                }
                
                Bus.$emit('pages_dragble',type,$(this).position().top, $(this).position().left)

              }else{
                let top = $(this).position().top + $(this).parent().position().top;
                let left = $(this).position().left + $(this).parent().position().left
                that.infor[type].top = top;
                that.infor[type].left = left;
                Bus.$emit('pages_dragble',type,top,left)
              }

          }
      })
    },
    //缩放，公共的更新数据
    update_data({dom,key1,val1,key2,val2}){
      const pid = this.pid;
      const id = this.id;
      const type = this.rowType;
      const IndexObj = this.templet.p_find_moduleIndex({pid,type,id});
      const component_index = dom.attr('component_index');
      //修改数据源
      this.$store.state[type][IndexObj.row].children[IndexObj.module].data.infor.Component[component_index][key1] = val1;
      this.$store.state[type][IndexObj.row].children[IndexObj.module].data.infor.Component[component_index][key2] = val2;
      Bus.$emit('listandpage_update_data',{component_index,key1,val1,key2,val2});
    },
    resizes(that){
      $(`#u${this.id} #my_pages > li, #u${this.id} #my_pages > li > span, #u${this.id} #my_pages > li > a, #u${this.id} #my_pages > li > b`)
      .resizable({
          containment: "parent",
          autoHide: true,
        handles: "se, s, e",
          stop:function (event, ui) {
              let type = $(this).attr('data-type');

              /* if(type === 'pre' || type === 'next'){

              }else{
                var top = $(this).position().top + $(this).parent().position().top;
                var left = $(this).position().left + $(this).parent().position().left
              } */
              
              if (type === 'pre' || type === 'next') {
                that.infor.page_li_width = ui.size.width;
                that.infor.page_li_height = ui.size.height;
                Bus.$emit('pages_resize','page_li_width','page_li_height',ui.size.width,ui.size.height)
                return ;
              }

              if (type === 'pretxt' || type === 'nexttxt') {
                that.infor.page_txt_width = ui.size.width;
                that.infor.page_txt_height = ui.size.height;
                Bus.$emit('pages_resize','page_txt_width','page_txt_height',ui.size.width,ui.size.height)
                /* that.infor[type].top = top;
                that.infor[type].left = left;
                Bus.$emit('pages_dragble',type,top,left) */
                return ;
              }

              if (type === 'prea' || type === 'nexta') {
                that.infor.page_a_width = ui.size.width;
                that.infor.page_a_height = ui.size.height;
                Bus.$emit('pages_resize','page_a_width','page_a_height',ui.size.width,ui.size.height)
                /* that.infor[type].top = top;
                that.infor[type].left = left;
                Bus.$emit('pages_dragble',type,top,left) */
                return ;
              }

              if (type === 'predate' || type === 'nextdate') {
                that.infor.page_date_width = ui.size.width;
                that.infor.page_date_height = ui.size.height;
                Bus.$emit('pages_resize','page_date_width','page_date_height',ui.size.width,ui.size.height)
                /* that.infor[type].top = top;
                that.infor[type].left = left;
                Bus.$emit('pages_dragble',type,top,left) */
                return ;
              }

          }
      })
  },
  initData(){
      // 获取三个参数 可以拿到所在的row moudule 和 row的类型
			let _pid = this.pid;
			let _rowtype = this.rowType;
			let _id = this.id;

			let IndexObj = this.templet.p_find_moduleIndex({
				pid: _pid,
				type: _rowtype,
				id: _id
			});

			let rowIndex = IndexObj.row;
			let moduleIndex = IndexObj.module;
      let rowtype = this.rowType;
      
      let moduleObj = this.$store.state[rowtype][rowIndex].children[moduleIndex].data.css;
      
      this.$set(this.infor,'page_box_li_width',moduleObj.module_width || 530);
      this.$set(this.infor,'page_box_li_height',moduleObj.module_height || 180);

    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.moveds();
      this.resizes(this);
    })

    // 兼容老版本
    if (!this.infor.allwidth) {
      this.initData();
    }
  }
};

function moveds(that){
    $(`#u${this.id} #my_pages > li, #u${this.id} #my_pages > li > span, #u${this.id} #my_pages > li > a, #u${this.id} #my_pages > li > b`).draggable({
        containment: "parent",
        zIndex: 100,
        snapTolerance:10,
        start:function () {
            //对齐线开始准备//对齐线逻辑
            that.templet.aline_start(that,$(this),'.page_move_li');
        },
        drag:function ( event, ui) {
            //对齐线逻辑
            var dragLeft = $(this).offset().left;
            var dragTop = $(this).offset().top;

            var moveLeft = ui.offset.left;
            var moveTop = ui.offset.top;


            var dragWidth = $(this).width();
            var dragHeight = $(this).height();

            that.templet.aline_drag(that,$(this),dragLeft,dragTop,dragWidth,dragHeight,moveLeft,moveTop);
        },
        stop:function (event, ui) {
            let type = $(this).attr('data-type');

            if(type == 'pre' || type == 'next' ){
              that.infor[type].top = $(this).position().top;
              that.infor[type].left = $(this).position().left;
              /**
               * 当li拖拽的时候 因为其内部的链接等的位置是不变的 导致位置不能跟随改变
               */
              let childArr = $(this).children('[data-type]');

              for(let i =0; i< childArr.length; i++ ){
                let childType = $(childArr[i]).attr('data-type')
                that.infor[childType].top = $(childArr[i]).position().top + $(this).position().top;
                that.infor[childType].left = $(childArr[i]).position().left + $(this).position().left;
              }

            }else{
              that.infor[type].top = $(this).position().top + $(this).parent().position().top;
              that.infor[type].left = $(this).position().left + $(this).parent().position().left;
            }

        }
    })
}

function resizes(that){
    $('#my_pages > li, #my_pages > li > span, #my_pages > li > a, #my_pages > li > b').resizable({
        containment: "parent",
        handles:'all',
        stop:function (event, ui) {
            let type = $(this).attr('data-type');

            if (type === 'pre' || type === 'next') {
                that.infor.page_li_width = ui.size.width;
                that.infor.page_li_height = ui.size.height;
                return ;
            }

            if (type === 'pretxt' || type === 'nexttxt') {
                that.infor.page_txt_width = ui.size.width;
                that.infor.page_txt_height = ui.size.height;
                return ;
            }

            if (type === 'prea' || type === 'nexta') {
                that.infor.page_a_width = ui.size.width;
                that.infor.page_a_height = ui.size.height;
                return ;
            }

            if (type === 'predate' || type === 'nextdate') {
                that.infor.page_date_width = ui.size.width;
                that.infor.page_date_height = ui.size.height;
                return ;
            }

        }
    })
}
</script>
<style >
.myclearfix:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
.myclearfix:before {
  display: table;
  content: " ";
}

.myclearfix {
  zoom: 1;
}
</style>
