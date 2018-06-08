<template>
    <div class=" mouseClass locationClass " >
        <!--编辑框-->
        <div class="public_edit">
            <ul>
                <li class="edit_module" @click.stop="select_parts('','basic_locationtitle')">{{templet.p_nameToChinese(name)}}编辑</li>
                <my-tooltip content="动画选择">
                  <li class="edit_module" @click.stop="select_parts('','public_animated')">
                    <span class="fa fa-flash"></span>
                  </li>
                </my-tooltip>
                <my-tooltip content="样式选择" >
                  <li class="edit_module el-icon-date" @click.stop="select_parts('basic_locationtitle','public_defaultStyle')"></li>
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
        <div :style="{
            width:infor.allwidth + 'px',
            height:infor.allheight + 'px'
          }" 
          data-Highlight="locationtitle1"
          @dblclick.stop="select_parts('locationtitle1','basic_locationtitle')" 
          :class="[
          $store.state.module_Data && $store.state.parts == 'locationtitle1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'locationtitle1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
          ]"
        >
          <h2 :style="h2" v-if="infor.location_title_data_source === 'self'" >{{infor.location_title_self_data}}</h2>
          <h2 :style="h2" v-else>{{$store.state.localTitle}}</h2>
        </div>
    </div>
</template>

<script>
export default {
  name: "basic_locationtitle",
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
    h2:function(){
        return {
            background: this.infor.location_title_bc_color ,
            color: this.infor.location_title_fs_color ,
            textAlign: this.infor.location_title_text_align ,
            fontSize: this.infor.location_title_fs + 'px',
            borderRadius: this.infor.location_title_border_radius + 'px',
            paddingTop: this.infor.location_title_padding_top + 'px',
            paddingBottom: this.infor.location_title_padding_bottom + 'px',
            borderStyle:this.infor.location_title_border_style,
            borderWidth:this.infor.location_title_border_width + 'px',
            borderColor:this.infor.location_title_border_color,
            fontWeight:this.infor.location_title_fs_weight,
            marginTop: this.infor.location_title_margin_top + 'px',
            marginBottom: this.infor.location_title_margin_bottom + 'px',
            width:this.infor.width + 'px',
            height:this.infor.height + 'px',
            lineHeight:this.infor.allheight + 'px',
            height:this.infor.allheight + 'px'
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
<style scoped>
  div.index_Highlight{
    /* box-shadow: 0 0 3px 3px #f00; */
  }
</style>