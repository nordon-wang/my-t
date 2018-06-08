<template>
  <div class="  ">
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_webmap')">{{templet.p_nameToChinese(name)}}编辑</li>
        <!-- <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip> -->
        <my-tooltip content="样式选择">
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_webmap','public_defaultStyle')"></li>
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
    
    <div :style="{
      width:`${infor.width}px`,
      height:`${infor.height}px`
    }">
      <dl :style="dtborder" v-for="(item,index) in infos"  class="myclearfix" :key="index" :class="[
              $store.state.module_Data && $store.state.parts == 'public_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'public_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]" 
            data-Highlight="public_set" @dblclick.stop="select_parts('public_set','basic_webmap')">
        <!-- 一级菜单 -->
        <dt :style="dt1" :class="[
              $store.state.module_Data && $store.state.parts == 'first_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'first_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]" 
            data-Highlight="first_set" @dblclick.stop="select_parts('first_set','basic_webmap')" >{{item.name}}</dt>

        <dd style="float: left;">
          <ul :style='{
            width: infor.webmap_menu2_width_total + "px"
          }'>
            <li v-for="(items,index) in item.children" :key="index" class="myclearfix" :style='{
            width: infor.webmap_menu3_width_total + "px",
            display:infor.webmap_menu2_direction
          }'>
              <!-- 二级菜单 -->
              <p ><a href="javascript:;" :style="p1" :class="[
                $store.state.module_Data && $store.state.parts == 'sec_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                $store.state.module_Data && $store.state.hover_parts == 'sec_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                'mouseClass'
                ]" 
                data-Highlight="sec_set" @dblclick.stop="select_parts('sec_set','basic_webmap')" >{{items.name}}</a></p>
              <div  style="float: left;font-size:0;" v-for="(i,index) in items.childs" :key="index" >
                <!-- 三级菜单 -->
                <a href="javascript:;" :style="p2" :class="[
                  $store.state.module_Data && $store.state.parts == 'thr_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                  $store.state.module_Data && $store.state.hover_parts == 'thr_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                  'mouseClass'
                  ]" 
                  data-Highlight="thr_set" @dblclick.stop="select_parts('thr_set','basic_webmap')" >{{i.name}}</a>
                <!-- 四级菜单 -->
                <p v-for="(ii,index) in i.childs" :key="index" class="myclearfix">
                  <a :style="p3" href="javascript:;" :class="[
                  $store.state.module_Data && $store.state.parts == 'four_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                  $store.state.module_Data && $store.state.hover_parts == 'four_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                  'mouseClass'
                  ]" 
                  data-Highlight="four_set" @dblclick.stop="select_parts('four_set','basic_webmap')" >{{ii.name}}</a>
                </p>
              </div>
            </li>
          </ul>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
// import myajax from '../../js/ajax';

export default {
  name: "basic_webmap",
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
      infos: []
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
      
      this.$set(this.infor,'width',moduleObj.module_width || 200);
      this.$set(this.infor,'height',moduleObj.module_height || 200);

    }
  },
  computed: {
    dtborder: function() {
      return {
        borderWidth: this.infor.webmap_menu_border_width + 'px',
        borderColor: this.infor.webmap_menu_border_color,
        borderStyle: this.infor.webmap_menu_border_style
      };
    },
    dt1: function() {
      return {
        width: this.infor.webmap_menu1_width + "px",
        height: this.infor.webmap_menu1_height + "px",
        lineHeight: this.infor.webmap_menu1_height + "px",
        background: this.infor.webmap_menu1_bc_color,
        color: this.infor.webmap_menu1_font_color,
        fontSize: this.infor.webmap_menu1_fs + 'px',
        float: "left",
        marginTop: this.infor.webmap_menu1_margin_top + "px",
        marginRight: this.infor.webmap_menu1_margin_right + "px",
        marginBottom: this.infor.webmap_menu1_margin_bottom + "px",
        marginLeft: this.infor.webmap_menu1_margin_left + "px",
        borderRadius: this.infor.webmap_menu1_border_radius + "px",
        textAlign: this.infor.webmap_menu1_text_align,
        fontWeight: this.infor.webmap_menu1_font_weight,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      };
    },
    p1: function() {
      return {
        width: this.infor.webmap_menu2_width + "px",
        height: this.infor.webmap_menu2_height + "px",
        lineHeight: this.infor.webmap_menu2_height + "px",
        background: this.infor.webmap_menu2_bc_color,
        color: this.infor.webmap_menu2_font_color,
        fontSize: this.infor.webmap_menu2_fs + 'px',
        marginTop: this.infor.webmap_menu2_margin_top + "px",
        marginRight: this.infor.webmap_menu2_margin_right + "px",
        marginBottom: this.infor.webmap_menu2_margin_bottom + "px",
        marginLeft: this.infor.webmap_menu2_margin_left + "px",
        borderRadius: this.infor.webmap_menu2_border_radius + "px",
        textAlign: this.infor.webmap_menu2_text_align,
        fontWeight: this.infor.webmap_menu2_font_weight,
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      };
    },
    p2: function() {
      return {
        width: this.infor.webmap_menu3_width + "px",
        height: this.infor.webmap_menu3_height + "px",
        lineHeight: this.infor.webmap_menu3_height + "px",
        background: this.infor.webmap_menu3_bc_color,
        color: this.infor.webmap_menu3_font_color,
        fontSize: this.infor.webmap_menu3_fs + 'px',
        // float: "left",
        marginTop: this.infor.webmap_menu3_margin_top + "px",
        marginRight: this.infor.webmap_menu3_margin_right + "px",
        marginBottom: this.infor.webmap_menu3_margin_bottom + "px",
        marginLeft: this.infor.webmap_menu3_margin_left + "px",
        borderRadius: this.infor.webmap_menu3_border_radius + "px",
        textAlign: this.infor.webmap_menu3_text_align,
        fontWeight: this.infor.webmap_menu3_font_weight,
        display:'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      };
    },
    p3: function() {
      return {
        width: this.infor.webmap_menu4_width + "px",
        height: this.infor.webmap_menu4_height + "px",
        lineHeight: this.infor.webmap_menu4_height + "px",
        background: this.infor.webmap_menu4_bc_color,
        color: this.infor.webmap_menu4_font_color,
        fontSize: this.infor.webmap_menu4_fs + 'px',
        marginTop: this.infor.webmap_menu4_margin_top + "px",
        marginRight: this.infor.webmap_menu4_margin_right + "px",
        marginBottom: this.infor.webmap_menu4_margin_bottom + "px",
        marginLeft: this.infor.webmap_menu4_margin_left + "px",
        borderRadius: this.infor.webmap_menu4_border_radius + "px",
        textAlign: this.infor.webmap_menu4_text_align,
        fontWeight: this.infor.webmap_menu4_font_weight,
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      };
    }
  },
  async created() {
    let _this = this;
    let data = await $.ajax({
      // url: `${_this.$store.state.domain}/index_pc.php/newapi/base/sitemap`,
      url: `/index_pc.php/newapi/base/sitemap`,
      type: "get",
      dataType: "json"
    });
    this.infos = data.data;
  },
  mounted() {

    // 兼容老版本
    if(!this.infor.width){
      // this.$set(this.infor,'height','auto');
      this.initData();
    }
  }
  
};

</script>
<style >
.myclearfix:after {
    content: "";
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
}
.myclearfix:before{
  display: table;
  content: " ";
}

.myclearfix {
    zoom: 1;
}

</style>
