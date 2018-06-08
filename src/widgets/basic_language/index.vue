<template>
    <div class=" mouseClass " >
        <!--编辑框-->
        <div class="public_edit">
            <ul>
                <li class="edit_module" @click.stop="select_parts('','basic_language')">{{templet.p_nameToChinese(name)}}编辑</li>
                <my-tooltip content="动画选择">
                  <li class="edit_module" @click.stop="select_parts('','public_animated')">
                    <span class="fa fa-flash"></span>
                  </li>
                </my-tooltip>
                <my-tooltip content="样式选择" >
                  <li class="edit_module el-icon-date" @click.stop="select_parts('basic_language','public_defaultStyle')"></li>
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
        <div>
          <!-- 样式1 -->
          <ul v-if="infor.w_languageStyle == '1' ? true : false" :style="style1" 
              data-Highlight="language1" @dblclick.stop="select_parts('language1','basic_language')" 
              :class="[
              $store.state.module_Data && $store.state.parts == 'language1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'language1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]">
            <li v-for="(item,index) in listArr.txt_arr" :style="style1li" :key="index" 
            data-Highlight="language1" @dblclick.stop="select_parts('language1','basic_language')" 
            :class="[
            ($store.state.module_Data && $store.state.parts == 'language1' ) && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'language1' ) && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" >
              <a href="javascript:;"  :style="style1af" v-if="index === 0" 
              data-Highlight="language2" @dblclick.stop="select_parts('language2','basic_language')" 
              :class="[
              ($store.state.module_Data && $store.state.parts == 'language2' ) && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              ($store.state.module_Data && $store.state.hover_parts == 'language2') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]" > 
                <span v-show="infor.w_language_txt_show == 'block'">{{listArr.txt_arr[index]}}</span>
              </a>
              <a href="javascript:;"  :style="style1a" v-if="index > 0 && index < inforLentgh - 1 ? true : false" 
              data-Highlight="language2" @dblclick.stop="select_parts('language2','basic_language')" 
              :class="[
              ($store.state.module_Data && $store.state.parts == 'language2') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              ($store.state.module_Data && $store.state.hover_parts == 'language2' ) && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]" >
                <span v-show="infor.w_language_txt_show == 'block'">{{listArr.txt_arr[index]}}</span>
              </a>
              <a href="javascript:;"  :style="style1as" v-if="index === inforLentgh - 1 && index != 0  " 
              data-Highlight="language2" @dblclick.stop="select_parts('language2','basic_language')" 
              :class="[
              ($store.state.module_Data && $store.state.parts == 'language2') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              ($store.state.module_Data && $store.state.hover_parts == 'language2' ) && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]"> 
                <span v-show="infor.w_language_txt_show == 'block'">{{listArr.txt_arr[index]}}</span>
              </a>
              <img v-if="infor.img_obj[index]" :src="$store.state.domain + infor.img_obj[index]" :style="lanImg" 
              data-Highlight="language4" @dblclick.stop="select_parts('language4','basic_language')" 
              :class="[
              ($store.state.module_Data && $store.state.parts == 'language4' || $store.state.module_Data && $store.state.parts == 'pic_manage') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              ($store.state.module_Data && $store.state.hover_parts == 'language4' || $store.state.module_Data && $store.state.hover_parts == 'pic_manage') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]" >
            </li>
          </ul>
          <!-- 样式2 -->
          <div v-if="infor.w_languageStyle == '2' ? true : false" 
           @dblclick.stop="select_parts('language5','basic_language')" 
           style="width:100%;height:100%;position:absolute;"></div>
          <select disabled v-if="infor.w_languageStyle == '2' ? true : false" :style="style2" 
          data-Highlight="language5"
          :class="[
          $store.state.module_Data && $store.state.parts == 'language5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'language5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]">
            <option v-for="(item,index2) in listArr.img_items" :key="index2">
              {{listArr.txt_arr[index2]}}
            </option>
          </select>
        </div>
    </div>
</template>

<script>
import myajax from "../../js/ajax";

export default {
  name: "basic_language",
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
      inforLentgh: 0,
      isRender:false,
      infos:{
      },
    };
  },
  filters:{
    textLanguage(val,index){
      return 'asd' + index
    },
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
    txtArr:function (arr) {
        var _this = this;
        if (!this.infor.txt_arr.length) {
          this.infor.txt_arr.length = 0;
            $.each(arr,function (index,item) {
                _this.infor.txt_arr.push(item.lang);
            });
        }
        _this.infor.txt_arr_str = _this.infor.txt_arr.join(',');

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
      
      this.$set(this.infor,'w_languageWidth',moduleObj.module_width || 200);
      this.$set(this.infor,'w_languageHeight',moduleObj.module_height || 200);

    }
  },
  computed: {
    lanImg: function() {
      return {
        width: this.infor.w_language_img_width + "px",
        height: this.infor.w_language_img_height + "px",
        position: "absolute",
        left: this.infor.w_language_img_left + "px",
        top: this.infor.w_language_img_top + "px",
        display: this.infor.w_language_img_show,
        borderRadius: this.infor.w_language_img_border_radius + "px"
      };
    },
    style2: function() {
      return {
        width: this.infor.w_languageWidth + "px",
        height: this.infor.w_languageHeight + "px",
        fontSize: this.infor.w_minbeds + "px",
        color: this.infor.w_fontColor,
        paddingLeft: this.infor.w_style2_padding_left + "px",
        background: this.infor.w_inputColor,
        borderRadius: this.infor.w_style2_border_radius + "px"
      };
    },
    style1: function() {
      return {
        // width: this.infor.w_languageWidth + "px",
        minWidth: this.infor.w_languageWidth + "px",
        minHeight: this.infor.w_languageHeight + "px",
        // marginLeft: "2px",
        display:this.infor.w_style1_float === 'left' ? 'flex' : 'block',
        flexWrap:"nowrap"
      };
    },
    style1li: function() {
      return {
        float: this.infor.w_style1_float,
        width: this.infor.w_style1_languageWidth + "px",
        height: this.infor.w_style1_languageHeight + "px",
        lineHeight: this.infor.w_style1_languageHeight + "px",
        background: this.infor.w_inputColor,
        borderRadius: this.infor.w_style1_border_radius + "px",
        textAlign: this.infor.w_style1_text_align,
        paddingTop: this.infor.w_style1_padding_top + "px",
        paddingRight: this.infor.w_style1_padding_right + "px",
        paddingBottom: this.infor.w_style1_padding_bottom + "px",
        paddingLeft: this.infor.w_style1_padding_left + "px",
        marginTop: this.infor.w_style1_margin_top + "px",
        marginRight: this.infor.w_style1_margin_right + "px",
        marginBottom: this.infor.w_style1_margin_bottom + "px",
        marginLeft: this.infor.w_style1_margin_left + "px",
        borderStyle: this.infor.language_a_border_all_styles,
        borderColor: this.infor.language_a_border_all_color,
        borderWidth: this.infor.language_a_border_all_width + "px",
        position: "relative"
      };
    },
    style1af: function() {
      return {
        display: 'block',
        fontSize: this.infor.w_minbeds + "px",
        color: this.infor.w_fontColor,
        width: this.infor.w_style1_a_width + "px",
        height: this.infor.w_style1_a_height + "px",
        lineHeight: this.infor.w_style1_a_height + "px",
        borderLeftStyle: this.infor.language_a_border_first_left_styles,
        borderLeftColor: this.infor.language_a_border_first_left_color,
        borderLeftWidth: this.infor.language_a_border_first_left_width + "px",
        borderRightStyle: this.infor.language_a_border_first_right_styles,
        borderRightColor: this.infor.language_a_border_first_right_color,
        borderRightWidth: this.infor.language_a_border_first_right_width + "px"
      };
    },
    style1a: function() {
      return {
        display: 'block',
        fontSize: this.infor.w_minbeds + "px",
        color: this.infor.w_fontColor,
        width: this.infor.w_style1_a_width + "px",
        height: this.infor.w_style1_a_height + "px",
        lineHeight: this.infor.w_style1_a_height + "px",
        borderLeftStyle: this.infor.language_a_border_other_left_styles,
        borderLeftColor: this.infor.language_a_border_other_left_color,
        borderLeftWidth: this.infor.language_a_border_other_left_width + "px",
        borderRightStyle: this.infor.language_a_border_other_right_styles,
        borderRightColor: this.infor.language_a_border_other_right_color,
        borderRightWidth: this.infor.language_a_border_other_right_width + "px"
      };
    },
    style1as: function() {
      return {
        display: 'block',
        fontSize: this.infor.w_minbeds + "px",
        width: this.infor.w_style1_a_width + "px",
        height: this.infor.w_style1_a_height + "px",
        lineHeight: this.infor.w_style1_a_height + "px",
        color: this.infor.w_fontColor,
        borderLeftStyle: this.infor.language_a_border_last_left_styles,
        borderLeftColor: this.infor.language_a_border_last_left_color,
        borderLeftWidth: this.infor.language_a_border_last_left_width + "px",
        borderRightStyle: this.infor.language_a_border_last_right_styles,
        borderRightColor: this.infor.language_a_border_last_right_color,
        borderRightWidth: this.infor.language_a_border_last_right_width + "px"
      };
    }
  },
  async created(){

    let data = await $.ajax({
      url: `/index_pc.php/newapi/language/getinfo`,
      type: "get",
      dataType: "json"
    });

    this.inforLentgh = data.data.length;

    if(!this.listArr.txt_arr){
      let arr = [];
      data.data.forEach(item => {
        arr.push(item.lang)
      })
      this.$set(this.listArr,'txt_arr',arr);
    }

    
  },
  mounted() {
    // 兼容老版本
    if (!this.infor.allwidth) {
        this.initData();
    }
  },
  updated(){

  }
};
</script>

<style scoped>

img.index_Highlight{
box-shadow: 0 0 3px 3px #f00;
}
</style>


<style>
.bottomBar .content{
  overflow: auto;
}

</style>
