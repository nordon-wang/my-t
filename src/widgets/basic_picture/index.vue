<template>
  <div class="picture thisp">
    <!--编辑框-->
    <div class="public_edit" >
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_picture')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="特效选择">
          <li class="edit_module" @click.stop="select_parts('','public_effects')">
            <span class="el-icon-news"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="基础设置">
          <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>
    <div class="img-con" ref="myimg" :style="imgCon" 
      data-Highlight="picture1"
      @dblclick.stop="select_parts('picture1','basic_picture')"
      :class="[
        $store.state.module_Data && $store.state.module_Data && $store.state.parts == 'picture1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.module_Data && $store.state.module_Data && $store.state.hover_parts == 'picture1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        'mouseClass'
      ]">
      <!-- <a href="######"> -->
        <!--<img :src="infor.imgUrl"
      :style="imgStyle" >-->
        <img-effect
          :src="infor.imgUrl ? $store.state.domain + infor.imgUrl : $store.state.default_picture"
          :effectsObj="infor.effectsObj"
          classname="banner_img"
          :styleObj='{
            border: "0 solid transparent",
            width: this.infor.picture_width + "px",
            height: this.infor.picture_height + "px",
            borderRadius: this.infor.picture_border_radius + "px"
          }'
          type="self"
        ></img-effect>
      <!-- </a> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "basic_picture",
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
      showToolBar: false
    };
  },
  computed: {
    imgStyle() {
      return {
        border: "0 solid transparent",
        width: this.infor.picture_width + "px",
        height: this.infor.picture_height + "px",
        borderRadius: this.infor.picture_border_radius + "px"
      };
    },
    imgCon() {
      return {
        width: this.infor.picture_width + "px",
        height: this.infor.picture_height + "px",
        borderRadius: this.infor.picture_border_radius + "px",
        overflow: "hidden"
      };
    }
  },
  components: {},
  methods: {
    select_parts(partsName, moduleName) {

      // this.$store.state.addNewModule = false;

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
  mounted() {
    // 兼容老版本
    if (!this.infor.allwidth) {
        this.initData();
    }
  }
};


</script>
<style>

</style>
