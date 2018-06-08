<template>
<div class=" mouseClass " @dblclick.stop="stopProp($event)"  >
    <!--编辑框-->
    <div class="public_edit">
      <ul>
          <li class="edit_module" @click.stop="msgs" 
          style="cursor: not-allowed;" >
            单图文挂件
          </li>
          <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>
    <div   :style="moduleClass" @dblclick.stop="msgs" >
      <div v-show="infor.picStyle == 0 ? true : false" style="overflow: hidden;">
        <div class="resetCss text_content" v-html="infor.contents"></div>
      </div>

      <div v-show="infor.picStyle == 1 ? true : false" style="overflow: hidden;">
        <div :style="imgstyle2" class="graphic_position">
        <a href="javascript:;" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
      </div>

      <div v-show="infor.picStyle == 2 ? true : false" style="overflow: hidden;">
        <div :style="[imgstyle2,{
          display:'block'
        }]" class="graphic_position">
        <a href="javascript:;" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
        <div class="resetCss text_content" v-html="infor.contents"></div>
      </div>

      <div v-show="infor.picStyle == 3 ? true : false" style="overflow: hidden;">
        <div class="resetCss text_content" v-html="infor.contents"></div>
        <div :style="imgstyle2" class="graphic_position">
          <a href="javascript:;" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
      </div>

      <div v-show="infor.picStyle == 4 ? true : false" style="overflow: hidden;">
        <div :style="[imgstyle2,{
          float:'left'
        }]" class="graphic_position" style="float: left;">
          <a href="javascript:;" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
        <div class="resetCss text_content" :style="{
          marginLeft:'10px',
        }" v-html="infor.contents"></div>
      </div>

      <div v-show="infor.picStyle == 5 ? true : false" style="overflow: hidden;">
        <div class="resetCss text_content" :style="{
          float:'left',
          marginRight:'10px',
        }" v-html="infor.contents"  style="float: left;"></div>
        <div :style="[imgstyle2,{
          float:'right'
        }]" class="graphic_position" style="float: right;">
          <a href="javascript:;" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
      </div>

      <div v-show="infor.picStyle == 6 ? true : false" style="overflow: hidden;">
        <div :style="[imgstyle2,{
          float:'left'
        }]" class="graphic_position" style="float: left;">
          <a href="javascript:;" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
        <div class="resetCss text_content" v-html="infor.contents"></div>
      </div>

      <div v-show="infor.picStyle == 7 ? true : false" style="overflow: hidden;">
        <div :style="[imgstyle2,{
          float:'right'
        }]" class="graphic_position" style="float: right;">
          <a href="javascript:;" ><img :style="imgstyle" :src="infor.imgUrl"  class="graphic_size"></a>
        </div>
        <div class="resetCss text_content" v-html="infor.contents"></div>
      </div>
    </div>
</div>
</template>

<script>
export default {
  name: "basic_gratext",
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
    }
  },
  data() {
    return {
      datas: {}
    };
  },
  computed: {
    moduleClass(){
      return {
        width:this.infor.width + 'px',
        height:this.infor.height + 'px'
      };
    },
    imgstyle: function() {
      return {
        width: this.infor.graWidth + "px",
        height: this.infor.graHeight + "px",
        opacity: this.infor.gra_style_opacity / 100,
        borderRadius: this.infor.border_radius_s + "px",
        borderWidth: this.infor.border_gra_w + "px",
        borderStyle: this.infor.border_gra_s,
        borderColor: this.infor.border_gra_c
      };
    },
    imgstyle2: function() {
      return {
        width: this.infor.graWidth + "px",
        height: this.infor.graHeight + "px",
        marginTop: this.infor.gra_margin_top + "px",
        marginRight: this.infor.gra_margin_right + "px",
        marginBottom: this.infor.gra_margin_bottom + "px",
        marginLeft: this.infor.gra_margin_left + "px"
      };
    }
  },
  methods: {
    msgs(){
      this.$message({
        message: '单图文挂件只显示、不能进行编辑',
        type: 'warning'
      });
    },
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      });
    },
    stopProp(e){
      // 防止双击
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
      
      this.$set(this.infor,'width',moduleObj.module_width || 300);
      this.$set(this.infor,'height',moduleObj.module_height || 200);
      this.$set(this.infor,'allwidth',moduleObj.module_width || 300);
      this.$set(this.infor,'allheight',moduleObj.module_height || 200);

    }
  },
  mounted() {
    
    // 兼容老版本
    if(!this.infor.allwidth){
      // this.$set(this.infor,'allwidth',120);
      // this.$set(this.infor,'allheight',44);
    this.initData();
    }



}
};
</script>

<style  lang="scss" scoped="" type="text/css" >

</style>
