<template>
    <div class=" mouseClass locationClass " >
        <!--编辑框-->
        <div class="public_edit">
            <ul>
                <li class="edit_module" @click.stop="select_parts('','basic_location')">{{templet.p_nameToChinese(name)}}编辑</li>
                <my-tooltip content="动画选择">
                  <li class="edit_module" @click.stop="select_parts('','public_animated')">
                    <span class="fa fa-flash"></span>
                  </li>
                </my-tooltip>
                <my-tooltip content="样式选择" >
                  <li class="edit_module el-icon-date" @click.stop="select_parts('basic_location','public_defaultStyle')"></li>
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
        <div data-Highlight="basic_location" @dblclick.stop="select_parts('','basic_location')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'basic_location' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'basic_location' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
              ]" 
            :style='{
              height: this.infor.allheight + "px",
              width: this.infor.allwidth + "px"}' >
            <div class="clearfix" id="con" :style="divs"  v-if="infor.location_data_source === 'self'"
                data-Highlight="location1" @dblclick.stop="select_parts('location1','basic_location')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'location1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'location1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
              ]"     
            >
                <i :style="iconStyle" 
                data-Highlight="location2" @dblclick.stop="select_parts('location2','basic_location')" 
                :class="[
                  'mouseClass',
                  infor.icon_class,
                  $store.state.module_Data && $store.state.parts == 'location2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                  $store.state.module_Data && $store.state.hover_parts == 'location2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
                ]" 
                ></i>
                <span :style="titlestyle"  >{{infor.location_title}}</span>
                <a :style="titlestyle" href="javascript:;">首页</a>
                <span :style="titlestyle">&nbsp;&gt;&nbsp;</span>
                <span :style="lasta1"> {{infor.location_self_data}}</span>
            </div>
            <div class="clearfix" id="con" :style="divs" v-else 
                data-Highlight="location1" @dblclick.stop="select_parts('location1','basic_location')" 
                :class="[
                $store.state.module_Data && $store.state.parts == 'location1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                $store.state.module_Data && $store.state.hover_parts == 'location1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
                ]" 
            >
                <i  :style="iconStyle" 
                data-Highlight="location2" @dblclick.stop="select_parts('location2','basic_location')" 
                :class="[
                  'mouseClass',
                  infor.icon_class,
                  $store.state.module_Data && $store.state.parts == 'location2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
                  $store.state.module_Data && $store.state.hover_parts == 'location2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
                ]" 
                ></i>
                <span :style="titlestyle">{{infor.location_title}}</span>
                <!-- <span  :style="titlestyle" v-for="(item,index) in listArr" track-by="index" :key='index'>{{item}}</span> -->
                <span  :style="titlestyle">{{$store.state.localName}} &gt;</span>
                <span :style="lasta1">{{$store.state.localTitle}}</span>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  name: "basic_location",
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
    return {};
  },
  computed: {
    divs: function() {
      return {
        textAlign: this.infor.location_text_align_all,
        lineHeight: this.infor.line_height + "px",
        height: this.infor.allheight + "px",
        width: this.infor.allwidth + "px"
      };
    },
    lasta1: function() {
      return {
        color: this.infor.last_font_color,
        fontSize: this.infor.font_sizes + "px"
      };
    },
    iconStyle: function() {
      return {
        color: this.infor.location_icon_color,
        fontSize: this.infor.icon_sizes + "px",
        marginLeft: this.infor.location_icon_left + "px",
        marginRight: this.infor.location_icon_top + "px",
        fontFamily: "FontAwesome",
        display: 'inline-block'
      };
    },
    titlestyle: function() {
      return {
        color: this.infor.font_color,
        fontSize: this.infor.font_sizes + "px"
      };
    },
    huoqude: function() {
      return {
        color: this.infor.font_color,
        fontSize: this.infor.font_sizes + "px",
        float: "left"
      };
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
      
      this.$set(this.infor,'allwidth',moduleObj.module_width || 200);
      this.$set(this.infor,'allheight',moduleObj.module_height || 200);

    }
  },
  mounted(){
    // 兼容老版本
    if(!this.infor.allwidth){
      this.initData();
    }
    
  },
  updated(){
  }
};
</script>

<style>
</style>
