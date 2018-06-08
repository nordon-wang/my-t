<template>
  <div class=" mouseClass locationClass ">
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_searchs')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="样式选择">
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_searchs','public_defaultStyle')"></li>
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
    <div class="sss22" :style="{
            minWidth:infor.allwidth + 'px',
            height:infor.allheight + 'px'
          }" data-Highlight="basic_searchs" @dblclick.stop="select_parts('','basic_searchs')">
      <!-- start -->
      <div id="iconBtn" v-if="isshowbtnicon" :style="search2Div">
        <i :style="search2I" data-Highlight="icon_btn_set" @dblclick.stop="select_parts('icon_btn_set','basic_searchs')" :class="[
              $store.state.module_Data && $store.state.parts == 'icon_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'icon_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass',
              infor.icon_class
              ]"></i>
      </div>
      <div  v-if="infor.search_oppen_style == 0 || infor.search_oppen_style == 1 ? true : false" :style="search1Div">
        <div class="search_mask" data-Highlight="input_set" @dblclick.stop="select_parts('input_set','basic_searchs')" style="width: 100%;height: 100%;position: absolute;z-index: 8;">
        </div>
        <i :style="search1I" v-if="isshowicon" data-Highlight="iconstyle_set" @dblclick.stop="select_parts('iconstyle_set','basic_searchs')" :class="[
            $store.state.module_Data && $store.state.parts == 'iconstyle_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'iconstyle_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass',
            infor.icon_class
            ]"></i>
        <span :style="search1Span" v-if="isshowtxt" data-Highlight="txt_btn_set" @dblclick.stop="select_parts('txt_btn_set','basic_searchs')" :class="[
            $store.state.module_Data && $store.state.parts == 'txt_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'txt_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]">{{ infor.search_btn_text }}</span>
            <!-- [search1Input,{
            color:infor.search_input_placeholder_color,
            fontSize:infor.search_placeholder_fs + 'px'
          }] -->
        <input id="span_test" ref='inputs' type="text"  :placeholder="infor.search_placeholder" :style="search1Input" data-Highlight="input_set" @dblclick.stop="select_parts('input_set','basic_searchs')" :class="[
        $store.state.module_Data && $store.state.parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.module_Data && $store.state.hover_parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        'mouseClass'
        ]">
        <b :style="{
            position:'absolute',
            right:this.infor.search_x_right + 'px',
            top:this.infor.search_x_top + 'px',
            fontSize:this.infor.search_x_fs + 'px',
            color:this.infor.search_x_color,
            display:this.infor.search_x_show,
            zIndex:9
          }" data-Highlight="x_btn_set" @dblclick.stop="select_parts('x_btn_set','basic_searchs')" :class="[
          $store.state.module_Data && $store.state.parts == 'x_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'x_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]">X</b>
      </div>
      <div v-if="infor.search_oppen_style == 2 ? true : false" :style="{
          minWidth:infor.allwidth + 'px',
          position:'relative'
        }" data-Highlight="style3_input_set" @dblclick.stop="select_parts('style3_input_set','basic_searchs')" :class="[
            $store.state.module_Data && $store.state.parts == 'style3_input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'style3_input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
          ]">
          <div style="width:100%;height:100%;position:absolute;background-color:#f00;left:0;top:0;z-index:1;opacity:0;"></div>
        <el-input v-model="urlValue" v-on:keyup.enter="keyEnter" id="searchCon">
          <el-select v-model="cnashu" slot="prepend" style="width: 80px">
            <el-option label="产品" value="pro"></el-option>
            <el-option label="文章" value="art"></el-option>
            <el-option label="案例" value="case"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>

      <!-- 样式3 -->
      <!-- 
          width:infor.search_btn_icon_div_width + infor.search_btn_icon_margin_left + 'px',
          height:infor.search_btn_icon_div_height + infor.search_btn_icon_margin_top + 'px' -->
      <div v-if="infor.search_oppen_style == 3 ? true : false" :style="{position: 'relative'
        }">
        <div :style="{
            position: 'absolute',
            width:infor.search_btn_icon_div_width + 'px',
            height:infor.search_btn_icon_div_height + 'px',
            lineHeight:infor.search_btn_icon_div_height + 'px',
            textAlign:'center',
            left:infor.search_btn_icon_margin_left + 'px',
            top:infor.search_btn_icon_margin_top + 'px',
            backgroundColor:infor.search4_bc,
            zIndex:'2'
          }" data-Highlight="search_style3_icon" @dblclick.stop="select_parts('search_style3_icon','basic_searchs')" :class="[
          $store.state.module_Data && $store.state.parts == 'search_style3_icon' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'search_style3_icon' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]">
          <i :class="infor.icon_class" :style="{
              fontSize: infor.search_btn_icon_fs + 'px',
              transform: 'rotate('+ infor.search_icon_rotate +'deg)',
              color:infor.search_btn_icon_color,
              display: 'inline-block'
            }" ></i>
        </div>
        <input id="span_test" type="" name="" readonly unselectable="on" :style="{
            position: 'absolute',
            width:infor.search_width + 'px',
            height:infor.search_height + 'px',
            borderTopStyle:infor.searchs_border_top_style ,
            borderTopColor:infor.searchs_border_top_color ,
            borderTopWidth:infor.searchs_border_top_width  + 'px',
            borderRightStyle:infor.searchs_border_right_style ,
            borderRightColor:infor.searchs_border_right_color ,
            borderRightWidth:infor.searchs_border_right_width  + 'px',
            borderBottomStyle:infor.searchs_border_bottom_style ,
            borderBottomColor:infor.searchs_border_bottom_color ,
            borderBottomWidth:infor.searchs_border_bottom_width  + 'px',
            borderLeftStyle:infor.searchs_border_left_style ,
            borderLeftColor:infor.searchs_border_left_color ,
            borderLeftWidth:infor.searchs_border_left_width  + 'px',
            borderRadius:infor.search_radius + 'px',
            fontSize:infor.search_input_fs + 'px',
            color:infor.search_input_color,
            backgroundColor:infor.search_input_bg_color,
            left:infor.search_margin_left + 'px',
            top:infor.search_margin_top + 'px',
            paddingLeft:infor.search_padding_left + 'px'
          }" :placeholder="infor.search_placeholder" data-Highlight="input_set" @dblclick.stop="select_parts('input_set','basic_searchs')" :class="[
          $store.state.module_Data && $store.state.parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]">
      </div>

      <!-- 样式4 -->
      <div v-if="infor.search_oppen_style == 4 ? true : false" class="searchs clearfix" :style="{
          position:'relative',
          minWidth:this.infor.search5_select_width + this.infor.search_width + this.infor.search5_icon_width + 'px'
        }">
        <div class="search-left left" :style="{
            cursor:'pointer',
            textAlign: 'center',
            backgroundColor: this.infor.search5_select_bc,
            textAlign:'center',
            minWidth:this.infor.search5_select_width + 'px',
            height:this.infor.search5_select_height + 'px',
            lineHeight: this.infor.search5_select_height + 'px',
            fontSize:this.infor.search5_select_fs + 'px',
            color:this.infor.search5_select_color,
          }" data-Highlight="select_btn_set" @dblclick.stop="select_parts('select_btn_set','basic_searchs')" :class="[
          $store.state.module_Data && $store.state.parts == 'select_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'select_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]">
          <div class="search-left-top" style="display: flex;justify-content: center;">
            <span style="display: inline-block;overflow: hidden;width: 70%;white-space: nowrap;text-overflow: ellipsis;" :style="{
                fontSize:this.infor.search5_select_fs + 'px'
              }">内容</span>
            <b style="font-family: FontAwesome;" class="fa-chevron-down"></b>
          </div>

          <div class="search-left-btm" style="display: none;">
            <ul>
              <li data-type="pro">产品1</li>
              <li data-type="case">产品2</li>
              <li data-type="artcle">产品3</li>
            </ul>
          </div>

        </div>
        <div class="search_mask" data-Highlight="input_set" @dblclick.stop="select_parts('input_set','basic_searchs')" :style="{width:this.infor.search_width + 'px',height: this.infor.search_height + 'px',
          position: 'absolute',zIndex: '8',
          left:this.infor.search5_select_width + 'px'}"></div>

        <input id="span_test"  type="text" readonly unselectable="on" class="search-center left" name="" :placeholder="infor.search_placeholder" :style="search1Input" data-Highlight="input_set" @dblclick.stop="select_parts('input_set','basic_searchs')" :class="[
          $store.state.module_Data && $store.state.parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'input_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]">

        <div class="search-right left" :style="{
            backgroundColor: this.infor.search5_icon_bc,
            textAlign:'center',
            width:this.infor.search5_icon_width + 'px',
            height:this.infor.search5_icon_height + 'px',
            lineHeight: this.infor.search5_icon_height + 'px'
          }" data-Highlight="style5_icon_btn_set" @dblclick.stop="select_parts('style5_icon_btn_set','basic_searchs')" :class="[
          $store.state.module_Data && $store.state.parts == 'style5_icon_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          $store.state.module_Data && $store.state.hover_parts == 'style5_icon_btn_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
          'mouseClass'
          ]">
          <i :class="infor.icon_class" :style="{
              fontSize:this.infor.search_icon_width + 'px',
              color:this.infor.search_icon_color,
            }"></i>
        </div>
      </div>

      <!-- end -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import myajax from '../../js/ajax'


Vue.filter('myfilter', function(value, item1, item2) {
  console.log(value)
  return +value + 10 + item1 + item2
})

export default {
  name: 'basic_searchs',
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
      indexShow: false,
      cnashu: 'pro',
      urlValue: ''
    }
  },
  computed: {
    isshowicons: function() {
      return this.infor.search_oppen_style == 2 ? false : true
    },
    isshowbtnicon: function() {
      var isClick = this.infor.isShowStyle3Icon || 'open'
      return this.infor.search_oppen_style == 1 ||
        (this.infor.search_oppen_style == 2 && isClick == 'open')
        ? true
        : false
    },
    isshowicon: function() {
      return this.infor.search_is_show_icon == 'block' ? true : false
    },
    isshowtxt: function() {
      return this.infor.search_is_show_txt == 'block' ? true : false
    },
    search1Div: function() {
      // width: this.infor.search_div_width + "px",
      // height: this.infor.search_div_height + "px",
      return {
        position: 'relative',
        backgroundColor: 'rgba(0,0,0,0)'
      }
    },
    search1Input: function() {
      return {
        width: this.infor.search_width + 'px',
        height: this.infor.search_height + 'px',
        border: '0px',
        marginLeft: this.infor.search_margin_left + 'px',
        marginTop: this.infor.search_margin_top + 'px',
        paddingLeft: this.infor.search_padding_left + 'px',
        paddingRight: this.infor.search_padding_right + 'px',
        borderRadius: this.infor.search_radius + 'px',
        color: this.infor.search_input_color,
        fontSize: this.infor.search_input_fs + 'px',
        borderTopStyle: this.infor.searchs_border_top_style,
        borderTopColor: this.infor.searchs_border_top_color,
        borderTopWidth: this.infor.searchs_border_top_width + 'px',
        borderRightStyle: this.infor.searchs_border_right_style,
        borderRightColor: this.infor.searchs_border_right_color,
        borderRightWidth: this.infor.searchs_border_right_width + 'px',
        borderBottomStyle: this.infor.searchs_border_bottom_style,
        borderBottomColor: this.infor.searchs_border_bottom_color,
        borderBottomWidth: this.infor.searchs_border_bottom_width + 'px',
        borderLeftStyle: this.infor.searchs_border_left_style,
        borderLeftColor: this.infor.searchs_border_left_color,
        borderLeftWidth: this.infor.searchs_border_left_width + 'px',
        backgroundColor: this.infor.search_input_bg_color
      }
    },
    search1I: function() {
      return {
        fontSize: this.infor.search_icon_width + 'px',
        color: this.infor.search_icon_color,
        display: 'inline-block',
        position: 'absolute',
        left: this.infor.search_absolute_left + 'px',
        top: this.infor.search_absolute_top + 'px',
        zIndex: 99,
        transform: 'rotate(' + this.infor.search_icon_rotate + 'deg)'
      }
    },
    search1Span: function() {
      return {
        cursor: 'pointer',
        position: 'absolute',
        display: this.infor.search_is_show_txt,
        width: this.infor.search_text_width + 'px',
        height: this.infor.search_text_height + 'px',
        lineHeight: this.infor.search_text_height + 'px',
        color: this.infor.search_text_font_color,
        background: this.infor.search_text_color,
        fontSize: this.infor.search_text_fs + 'px',
        textAlign: this.infor.search_text_text_align,
        borderRadius: this.infor.search_text_border_radius + 'px',
        left: this.infor.search_text_pos_left + 'px',
        top: this.infor.search_text_pos_right + 'px',
        zIndex: '9'
      }
    },
    search2Div: function() {
      return {
        width: this.infor.search_btn_icon_div_width + 'px',
        height: this.infor.search_btn_icon_div_height + 'px',
        marginTop: this.infor.search_btn_icon_margin_top + 'px',
        marginRight: this.infor.search_btn_icon_margin_right + 'px',
        marginBottom: this.infor.search_btn_icon_margin_bottom + 'px',
        marginLeft: this.infor.search_btn_icon_margin_left + 'px',
        paddingTop: this.infor.search_btn_icon_padding_top + 'px',
        paddingRight: this.infor.search_btn_icon_padding_right + 'px',
        paddingBottom: this.infor.search_btn_icon_padding_bottom + 'px',
        paddingLeft: this.infor.search_btn_icon_padding_left + 'px'
      }
    },
    search2I: function() {
      return {
        fontSize: this.infor.search_btn_icon_fs + 'px',
        width: this.infor.search_btn_icon_fs + 'px',
        height: this.infor.search_btn_icon_fs + 'px',
        color: this.infor.search_btn_icon_color,
        display: 'block',
        transform: 'rotate(' + this.infor.search_iconbtn_rotate + 'deg)'
      }
    },
    style5i: function() {
      return {
        display: 'inline-block',
        width: 0,
        height: 0,
        border: '5px solid transparent',
        borderTopColor: '#000'
      }
    }
  },
  methods: {
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

      let moduleObj = this.$store.state[rowtype][rowIndex].children[moduleIndex]
        .data.css

      this.$set(this.infor, 'allwidth', moduleObj.module_width || 200)
      this.$set(this.infor, 'allheight', moduleObj.module_height || 200)
    },
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      })
    },
    deleteSpace: function(str) {
      var arr1 = str.split('')
      var str2 = ''
      arr1.forEach(function(val) {
        if (val === ' ') {
        } else {
          str2 += val
        }
      })

      return str2
    },
    keyEnter: function() {
      this.url = location.host + '/search.html?keywords=' + this.urlValue

      this.urlValue == ''
      this.urlValue = this.deleteSpace($('#{$_id_} .searchCon').val())

      if (this.urlValue == '') {
        alert('输入查询内容')
        return
      }
      document.location =
        '/search.html?keywords=' + this.urlValue + '&keywordstype=all'
    },
    keyEnter4: function() {
      this.url = location.host + '/search.html?keywords=' + this.urlValue

      this.urlValue == ''
      this.urlValue = this.deleteSpace($('#{$_id_} .search4-input').val())

      if (this.urlValue == '') {
        alert('输入查询内容')
        return
      }
      document.location =
        '/search.html?keywords=' + this.urlValue + '&keywordstype=all'
    },
    keyEnters: function() {
      this.url = location.host + '/search.html?keywords=' + this.urlValue
      this.urlValue == ''
      this.urlValue = this.deleteSpace($('#{$_id_}  .search3 .ivu-input').val())

      if (this.urlValue === '') {
        alert('输入查询内容')
        return
      }
      document.location =
        '/search.html?keywords=' +
        this.urlValue +
        '&keywordstype=' +
        this.cnashu
    },
    keyEnters5: function() {
      this.url = location.host + '/search.html?keywords=' + this.urlValue
      this.urlValue == ''
      this.urlValue = this.deleteSpace($('#{$_id_}  input.search-center').val())

      if (this.urlValue === '') {
        alert('输入查询内容')
        return
      }
      document.location =
        '/search.html?keywords=' +
        this.urlValue +
        '&keywordstype=' +
        this.cnashu
    },
    changeBorder() {
      $(`#u${this.id} input#searchCon`).css({
        borderTopStyle: this.infor.searchs_border_top_style,
        borderTopColor: this.infor.searchs_border_top_color,
        borderTopWidth: this.infor.searchs_border_top_width,
        borderRightStyle: this.infor.searchs_border_right_style,
        borderRightColor: this.infor.searchs_border_right_color,
        borderRightWidth: this.infor.searchs_border_right_width,
        borderBottomStyle: this.infor.searchs_border_bottom_style,
        borderBottomColor: this.infor.searchs_border_bottom_color,
        borderBottomWidth: this.infor.searchs_border_bottom_width,
        borderLeftStyle: this.infor.searchs_border_left_style,
        borderLeftColor: this.infor.searchs_border_left_color,
        borderLeftWidth: this.infor.searchs_border_left_width
      })
    },
    selfStyles(){
      
      $(`<style>
        #u${this.id} input#span_test::-webkit-input-placeholder {
          color: ${this.infor.search_input_placeholder_color};
          font-size:${this.infor.search_placeholder_fs}px;
      }
        #u${this.id} input#span_test:-moz-placeholder {
          color: ${this.infor.search_input_placeholder_color};
          font-size:${this.infor.search_placeholder_fs}px;
      }
        #u${this.id} input#span_test::-moz-placeholder {
          color: ${this.infor.search_input_placeholder_color};
          font-size:${this.infor.search_placeholder_fs}px;
      }
        #u${this.id} input#span_test:-ms-input-placeholder {
          color: ${this.infor.search_input_placeholder_color};
          font-size:${this.infor.search_placeholder_fs}px;
      }
      </style>`).appendTo('head')
    }
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        this.changeBorder()
        this.selfStyles()
      },
      deep: true
    }
  },
  mounted() {
    this.changeBorder()
    this.selfStyles()

    // 兼容老版本
    if (!this.infor.allwidth) {
      this.initData()
    }



  },
  updated() {
    this.$set(this.infor, 'search_div_width', this.infor.search_width)
    this.$set(this.infor, 'search_div_height', this.infor.search_height)
  }
}
</script>

<style>
@import '../../../static/icon/search/demo.css';
@import '../../../static/icon/search/iconfont.css';

.left {
  float: left;
}

.right {
  float: right;
}

.clearfix:after {
  content: '';
  display: block;
  clear: both;
  visibility: hidden;
  height: 0;
}
.clearfix {
  zoom: 1;
}
</style>
<style scoped>
.sss22 i {
     line-height: normal;
}
</style>
