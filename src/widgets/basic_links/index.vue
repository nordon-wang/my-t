<template>
  <div class="mouseClass" :style="moduleClass">
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <!-- {{infor.links_styles}} -->
        <li class="edit_module" @click.stop="open_self_modal">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="样式设置">
          <li class="edit_module el-icon-edit" @click.stop="select_parts('','basic_links')"></li>
        </my-tooltip>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="样式选择">
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_links','public_defaultStyle')"></li>
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
    <div id="date">
      <!--  -->
      <div :style="spanCon" v-if="infor.links_styles == '1' ? true : false" data-Highlight="links1" @dblclick.stop="select_parts('links1','basic_links')" :class="[
        $store.state.module_Data && $store.state.parts == 'links1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.module_Data && $store.state.hover_parts == 'links1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        'mouseClass'
        ]">{{infor.w_flinks_con}}
        <i class="fa-chevron-down" :style="[spanConi,{
          fontFamily:'FontAwesome',
          speak: 'none',
          fontStyle: 'normal',
          fontWeight: 400,
          fontVariant: 'normal',
          textTransform: 'none',
          lineHeight: 1,
          verticalAlign: 'baseline',
          display: 'inline-block',
        }]"></i>
      </div>
      <!-- 可以设置一级链接 -->
      <!-- display:infor.links_styles == '0' && infor.w_link_open_first_set == '1' && infor.w_link_dir === 'left' ? 'flex' : 'block',
          flexWrap:'nowrap' -->
      <ul class="clearfix c11" data-Highlight="basic_links" @dblclick.stop="select_parts('','basic_links')" v-if="infor.links_styles == '0' && infor.w_link_open_first_set == '1' ? true : false" :style="{
          width:this.infor.allwidth + 'px',
          height:this.infor.allheight + 'px'
        }">
        <li v-for="(item,index) in infor.cityLists" :style='listyles' :key="index">
          <!-- 一级链接 没有背景图 -->
          <a v-if=" index === 0 && !item.backgroundImage ? true : false" href="javascript:;" :target="item.target" 
          :style="astylesFir" data-Highlight="links3" @dblclick.stop="select_parts('links3','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links3' || $store.state.module_Data && $store.state.parts == 'firlink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links3' || $store.state.module_Data && $store.state.hover_parts == 'firlink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
          ]">
            <i :style="istyles" data-Highlight="links7" @dblclick.stop="select_parts('links7','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links7' || $store.state.module_Data && $store.state.parts ==  'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links7' || $store.state.module_Data && $store.state.hover_parts == 'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass',
            item.iconCLass
            ]"></i>{{item.title}}</a>
            <!-- 一级链接 有背景图 -->
          <a v-if=" index === 0 && item.backgroundImage ? true : false" href="javascript:;" :target="item.target" :style="[astylesFir,{
            backgroundImage:`url(${$store.state.domain + item.backgroundImage})`,
            backgroundSize:`100% 100%`,
            backgroundRepeat: `no-repeat`
          }]" data-Highlight="links3" @dblclick.stop="select_parts('links3','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links3' || $store.state.module_Data && $store.state.parts == 'firlink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links3' || $store.state.module_Data && $store.state.hover_parts == 'firlink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
          ]">
          <i :style="istyles" data-Highlight="links7" @dblclick.stop="select_parts('links7','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links7' || $store.state.module_Data && $store.state.parts ==  'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links7' || $store.state.module_Data && $store.state.hover_parts == 'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass',
            item.iconCLass
            ]"></i>{{item.title}}</a>

          <!-- 二级链接 没有背景图 -->
          <a v-if=" (index === 0 ? false : true) ? !item.backgroundImage : false" href="javascript:;" :target="item.target" 
            :style="astyles" data-Highlight="links4" @dblclick.stop="select_parts('links4','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links4' || $store.state.module_Data && $store.state.parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links4' || $store.state.module_Data && $store.state.hover_parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]">
            <i :style="istyles" data-Highlight="links7" @dblclick.stop="select_parts('links7','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links7' || $store.state.module_Data && $store.state.parts ==  'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links7' || $store.state.module_Data && $store.state.hover_parts == 'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass',
            item.iconCLass
            ]"></i>{{item.title}}</a>
          <!-- 二级链接 有背景图 -->
          <a v-if="(index === 0 ? false : true) ? item.backgroundImage : false" href="javascript:;" :target="item.target" :style="[astyles,{
              backgroundImage:`url(${$store.state.domain + item.backgroundImage})`,
              backgroundSize:`100% 100%`,
              backgroundRepeat: `no-repeat`
            }]" data-Highlight="links4" @dblclick.stop="select_parts('links4','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links4' || $store.state.module_Data && $store.state.parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links4' || $store.state.module_Data && $store.state.hover_parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]">
            <i :style="istyles" data-Highlight="links7" @dblclick.stop="select_parts('links7','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links7' || $store.state.module_Data && $store.state.parts ==  'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links7' || $store.state.module_Data && $store.state.hover_parts == 'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass',
            item.iconCLass
            ]"></i>{{item.title}}</a>

          <img v-if="vif(index)" :src="$store.state.domain + infor.imgUrls[index]" :alt="item.imgalt" :title="item.imgalt" :style="vifs" data-Highlight="links5" @dblclick.stop="select_parts('links5','basic_links')" :class="[
            $store.state.module_Data && $store.state.parts == 'links5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'links5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]">
          <img v-if="item.isShowPics == 'true' && item.imgUrls && infor.links_styles == '0' ? true : false" :src="$store.state.domain + item.imgUrls" :style="vifs" data-Highlight="links5" @dblclick.stop="select_parts('links5','basic_links')" :class="[
            $store.state.module_Data && $store.state.parts == 'links5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'links5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]">
        </li>
      </ul>

      <!-- 不可以设置一级链接 -->
      <!--display:infor.links_styles == '0' && infor.w_link_open_first_set == '0' ? ( infor.w_link_dir === 'left' ? 'flex' : 'block') : 'none',
          flexWrap:'nowrap' -->
      <ul class="clearfix c22" data-Highlight="basic_links" @dblclick.stop="select_parts('','basic_links')" v-if="infor.links_styles == '0' && infor.w_link_open_first_set == '0'  ? true : false" :style="{
          width:this.infor.allwidth + 'px',
          height:this.infor.allheight + 'px'
        }">
        <li v-for="(item,index) in infor.cityLists" :style='listyles' :key="index">
          <!-- 没有背景图 -->
          <a v-if="!item.backgroundImage" href="javascript:;" :target="item.target" :style="astyles" data-Highlight="links4" @dblclick.stop="select_parts('links4','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links4' || $store.state.module_Data && $store.state.parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links4' || $store.state.module_Data && $store.state.hover_parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
          ]">
            <i data-Highlight="links7" @dblclick.stop="select_parts('links7','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links7' || $store.state.module_Data && $store.state.parts ==  'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links7' || $store.state.module_Data && $store.state.hover_parts == 'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
             'mouseClass',
            item.iconCLass
            ]" :style="istyles"></i>{{item.title}}</a>
          <!-- 有背景图 -->
          <a v-else href="javascript:;" :target="item.target" :style="[astyles,{
            backgroundImage:`url(${$store.state.domain + item.backgroundImage})`,
            backgroundSize:`100% 100%`,
            backgroundRepeat: `no-repeat`
          }]" data-Highlight="links4" @dblclick.stop="select_parts('links4','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links4' || $store.state.module_Data && $store.state.parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links4' || $store.state.module_Data && $store.state.hover_parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
          ]">
            <i data-Highlight="links7" @dblclick.stop="select_parts('links7','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links7' || $store.state.module_Data && $store.state.parts ==  'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links7' || $store.state.module_Data && $store.state.hover_parts == 'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
             'mouseClass',
            item.iconCLass
            ]" :style="istyles"></i>{{item.title}}</a>

          <img v-if="vif(index)" :src="$store.state.domain + infor.imgUrls[index]" :alt="item.imgalt" :title="item.imgalt" :style="vifs">
          <img v-if="item.isShowPics == 'true' && item.imgUrls" :src="$store.state.domain + item.imgUrls" :style="vifs" data-Highlight="links5" @dblclick.stop="select_parts('links5','basic_links')" :class="[
            $store.state.module_Data && $store.state.parts == 'links5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'links5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]">
        </li>
      </ul>

      <!-- 第二、第三种样式 -->
      <ul v-if="infor.links_styles == '0' ? false : true" data-Highlight="links4" @dblclick.stop="select_parts('links4','basic_links')" :class="[
            $store.state.module_Data && $store.state.parts == 'links4'  && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'links4'  && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass',
            'sss'
            ]">
        <li v-for="(item,index) in infor.cityLists" :style='listyles' :key="index">
          <!-- 没有背景图 -->
          <a v-if="!item.backgroundImage" data-Highlight="links4" @dblclick.stop="select_parts('links4','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links4' || $store.state.module_Data && $store.state.parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links4' || $store.state.module_Data && $store.state.hover_parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" href="javascript:;" :target="item.target" :style="astyles">
            <i data-Highlight="links7" @dblclick.stop="select_parts('links7','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links7' || $store.state.module_Data && $store.state.parts ==  'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links7' || $store.state.module_Data && $store.state.hover_parts == 'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass',
            item.iconCLass
            ]" :style="[istyles]"></i>{{item.title}}</a>
          <!-- 有背景图 -->
          <a v-else data-Highlight="links4" @dblclick.stop="select_parts('links4','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links4' || $store.state.module_Data && $store.state.parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links4' || $store.state.module_Data && $store.state.hover_parts == 'seclink_distance_set') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" href="javascript:;" :target="item.target" :style="[astyles,{
            backgroundImage:`url(${$store.state.domain + item.backgroundImage})`,
            backgroundSize:`100% 100%`,
            backgroundRepeat: `no-repeat`
          }]">
            <i data-Highlight="links7" @dblclick.stop="select_parts('links7','basic_links')" :class="[
            ($store.state.module_Data && $store.state.parts == 'links7' || $store.state.module_Data && $store.state.parts ==  'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            ($store.state.module_Data && $store.state.hover_parts == 'links7' || $store.state.module_Data && $store.state.hover_parts == 'icon_select') && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
             'mouseClass',
            item.iconCLass
            ]" :style="[istyles]"></i>{{item.title}}</a>
          <img v-if="vif(index)" :src="$store.state.domain + infor.imgUrls[index]" :alt="item.imgalt" :title="item.imgalt" :style="vifs">
          <img v-if="item.isShowPics == 'true' && item.imgUrls && infor.links_styles == '0' ? true : false" :src="$store.state.domain + item.imgUrls" :style="vifs">
        </li>
      </ul>
      <!--  -->
      <div data-Highlight="links1" @dblclick.stop="select_parts('links1','basic_links')" :class="[
        $store.state.module_Data && $store.state.parts == 'links1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.module_Data && $store.state.hover_parts == 'links1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        'mouseClass'
        ]" :style="spanCon" v-if="infor.links_styles == '2' ? true : false">{{infor.w_flinks_con}}
        <i class="fa-chevron-down" :style="[spanConi,{
          fontFamily:'FontAwesome',
          speak: 'none',
          fontStyle: 'normal',
          fontWeight: 400,
          fontVariant: 'normal',
          textTransform: 'none',
          lineHeight: 1,
          verticalAlign: 'baseline',
          display: 'inline-block',
        }]"></i>
      </div>
      <!--  -->
    </div>
    <edit-module v-if="infor.isShows" v-on:closem="myclose" :isShow="infor.isShows"></edit-module>

  </div>
</template>

<script>
import editModule from './editmoudle'

export default {
  name: 'basic_links',
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
      // isShow:false,
    }
  },
  computed: {
    moduleClass() {
      return {
        width: this.infor.allwidth + 'px',
        height: this.infor.allheight + 'px'
      }
    },
    vifs: function() {
      return {
        width: this.infor.w_flinks_pic_width + 'px',
        height: this.infor.w_flinks_pic_height + 'px',
        left: this.infor.w_flinks_pic_left + 'px',
        top: this.infor.w_flinks_pic_top + 'px',
        position: 'absolute',
        zIndex: 0
      }
    },
    spanConi: function() {
      return {
        left: this.infor.w_flinks_icon_left + 'px',
        top: this.infor.w_flinks_icon_top + 'px',
        position: 'absolute',
        fontSize: this.infor.w_flinks_font_size + 'px'
      }
    },
    spanCon: function() {
      return {
        width: this.infor.w_flinks_width + 'px',
        height: this.infor.w_flinks_height + 'px',
        lineHeight: this.infor.w_flinks_height + 'px',
        textAlign: this.infor.w_flink_text_align,
        background: this.infor.w_flinks_bc_color,
        color: this.infor.w_flinks_font_color,
        fontSize: this.infor.w_flinks_font_size + 'px',
        borderRadius: this.infor.w_flinks_border_radius + 'px',
        position: 'relative'
      }
    },
    listyles: function() {
      return {
        float: this.infor.w_link_dir,
        position: 'relative'
      }
    },
    astylesFir: function() {
      return {
        color: this.infor.w_link_color_first,
        fontSize: this.infor.w_link_fs_first + 'px',
        backgroundColor: this.infor.w_link_bg_color_first,
        fontWeight: this.infor.w_link_bold_first,
        position: 'relative',
        width: this.infor.w_color_width_first + 'px',
        height: this.infor.w_color_height_first + 'px',
        lineHeight: this.infor.w_color_height_first + 'px',
        textAlign: this.infor.w_link_text_align_first,
        display: 'block',
        textDecoration: this.infor.w_link_decoration_link,
        marginTop: this.infor.w_link_first_mt + 'px',
        marginRight: this.infor.w_link_first_mr + 'px',
        marginBottom: this.infor.w_link_first_mb + 'px',
        marginLeft: this.infor.w_link_first_ml + 'px',
        paddingLeft: this.infor.w_link_first_pl + 'px',
        paddingRight: this.infor.w_link_first_pr + 'px',
        paddingTop: this.infor.w_link_first_pt + 'px',
        paddingBottom: this.infor.w_link_first_pb + 'px',
        borderTopStyle: this.infor.w_firlink_border_top_border_style,
        borderTopColor: this.infor.w_firlink_border_top_border_color,
        borderTopWidth: this.infor.w_firlink_border_top_border_width + 'px',
        borderRightStyle: this.infor.w_firlink_border_right_border_style,
        borderRightColor: this.infor.w_firlink_border_right_border_color,
        borderRightWidth: this.infor.w_firlink_border_right_border_width + 'px',
        borderBottomStyle: this.infor.w_firlink_border_bottom_border_style,
        borderBottomColor: this.infor.w_firlink_border_bottom_border_color,
        borderBottomWidth:
          this.infor.w_firlink_border_bottom_border_width + 'px',
        borderLeftStyle: this.infor.w_firlink_border_left_border_style,
        borderLeftColor: this.infor.w_firlink_border_left_border_color,
        borderLeftWidth: this.infor.w_firlink_border_left_border_width + 'px',
        borderRadius: this.infor.w_link_first_br + 'px'
      }
    },
    astyles: function() {
      return {
        color: this.infor.w_link_color,
        fontSize: this.infor.w_link_fs + 'px',
        backgroundColor: this.infor.w_link_bg_color,
        fontWeight: this.infor.w_link_bold,
        position: 'relative',
        paddingTop: this.infor.w_link_filltop + 'px',
        paddingRight: this.infor.w_link_fillr + 'px',
        paddingBottom: this.infor.w_link_fillbtm + 'px',
        paddingLeft: this.infor.w_link_fillleft + 'px',
        width: this.infor.w_color_width + 'px',
        height: this.infor.w_color_height + 'px',
        lineHeight: this.infor.w_color_height + 'px',
        textAlign: this.infor.w_link_text_align,
        display: 'block',
        textDecoration: this.infor.w_link_decoration_link,
        borderTopStyle: this.infor.w_link_border_top_border_style,
        borderTopColor: this.infor.w_link_border_top_border_color,
        borderTopWidth: this.infor.w_link_border_top_border_width + 'px',
        borderRightStyle: this.infor.w_link_border_right_border_style,
        borderRightColor: this.infor.w_link_border_right_border_color,
        borderRightWidth: this.infor.w_link_border_right_border_width + 'px',
        borderBottomStyle: this.infor.w_link_border_bottom_border_style,
        borderBottomColor: this.infor.w_link_border_bottom_border_color,
        borderBottomWidth: this.infor.w_link_border_bottom_border_width + 'px',
        borderLeftStyle: this.infor.w_link_border_left_border_style,
        borderLeftColor: this.infor.w_link_border_left_border_color,
        borderLeftWidth: this.infor.w_link_border_left_border_width + 'px',
        marginLeft: this.infor.w_link_margin_left + 'px',
        marginRight: this.infor.w_link_margin_right + 'px',
        marginTop: this.infor.w_link_margin_top + 'px',
        marginBottom: this.infor.w_link_margin_bottom + 'px',
        borderRadius: this.infor.w_link_second_br + 'px'
      }
    },
    istyles: function() {
      return {
        color: this.infor.w_icon_color,
        fontSize: this.infor.w_color_fs + 'px',
        paddingTop: this.infor.w_icon_filltop + 'px',
        paddingRight: this.infor.w_icon_fillr + 'px',
        paddingBottom: this.infor.w_icon_fillbtm + 'px',
        paddingLeft: this.infor.w_icon_fillleft + 'px',
        position: 'absolute',
        left: this.infor.icon_pos_left,
        top: this.infor.icon_pos_top,
        fontFamily: 'FontAwesome'
      }
    }
  },
  components: { editModule },
  methods: {
    myclose() {
      this.infor.isShows = false
    },
    open_self_modal() {
      //打开特殊蒙层
      this.$store.commit('special_mongolian_open', {
        name: this.name,
        pid: this.pid,
        rowType: this.rowType,
        widgets_id: this.id
      })

      this.infor.isShows = true
      this.templet.p_index_select_parts({
        partsName: '',
        moduleName: '',
        id: this.id,
        pid: this.pid,
        type: this.rowType
      })
      // this.$store.state.showMyMask = true;
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
    vif: function(v) {
      // return this.indexStore.switchArr[v] =='true' ? true : false;
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

      let moduleObj = this.$store.state[rowtype][rowIndex].children[moduleIndex]
        .data.css

      this.$set(this.infor, 'allwidth', moduleObj.module_width || 200)
      this.$set(this.infor, 'allheight', moduleObj.module_height || 200)
    },
    temBorder() {
      // 将老版本的全部边框设置 转换成一级的
      // this.$set(this.infor,'w_link_first_br',0);
      this.$set(
        this.infor,
        'w_firlink_border_top_border_style',
        this.infor.w_link_border_top_border_style
      )
      this.$set(
        this.infor,
        'w_firlink_border_top_border_color',
        this.infor.w_link_border_top_border_color
      )
      this.$set(
        this.infor,
        'w_firlink_border_top_border_width',
        this.infor.w_link_border_top_border_width
      )
      this.$set(
        this.infor,
        'w_firlink_border_right_border_style',
        this.infor.w_link_border_right_border_style
      )
      this.$set(
        this.infor,
        'w_firlink_border_right_border_color',
        this.infor.w_link_border_right_border_color
      )
      this.$set(
        this.infor,
        'w_firlink_border_right_border_width',
        this.infor.w_link_border_right_border_width
      )
      this.$set(
        this.infor,
        'w_firlink_border_bottom_border_style',
        this.infor.w_link_border_bottom_border_style
      )
      this.$set(
        this.infor,
        'w_firlink_border_bottom_border_color',
        this.infor.w_link_border_bottom_border_color
      )
      this.$set(
        this.infor,
        'w_firlink_border_bottom_border_width',
        this.infor.w_link_border_bottom_border_width
      )
      this.$set(
        this.infor,
        'w_firlink_border_left_border_style',
        this.infor.w_link_border_left_border_style
      )
      this.$set(
        this.infor,
        'w_firlink_border_left_border_color',
        this.infor.w_link_border_left_border_color
      )
      this.$set(
        this.infor,
        'w_firlink_border_left_border_width',
        this.infor.w_link_border_left_border_width
      )
    },
    temHoverBorder() {
      // 将老版本的全部边框设置 转换成一级的
      // this.$set(this.infor,'w_link_first_br',0);
      this.$set(
        this.infor,
        'w_firlink_hover_border_top_border_style',
        this.infor.w_link_hover_border_top_border_style
      )
      this.$set(
        this.infor,
        'w_firlink_hover_border_top_border_color',
        this.infor.w_link_hover_border_top_border_color
      )
      this.$set(
        this.infor,
        'w_firlink_hover_border_top_border_width',
        this.infor.w_link_hover_border_top_border_width
      )
      this.$set(
        this.infor,
        'w_firlink_hover_border_right_border_style',
        this.infor.w_link_hover_border_right_border_style
      )
      this.$set(
        this.infor,
        'w_firlink_hover_border_right_border_color',
        this.infor.w_link_hover_border_right_border_color
      )
      this.$set(
        this.infor,
        'w_firlink_hover_border_right_border_width',
        this.infor.w_link_hover_border_right_border_width
      )
      this.$set(
        this.infor,
        'w_firlink_hover_border_bottom_border_style',
        this.infor.w_link_hover_border_bottom_border_style
      )
      this.$set(
        this.infor,
        'w_firlink_hover_border_bottom_border_color',
        this.infor.w_link_hover_border_bottom_border_color
      )
      this.$set(
        this.infor,
        'w_firlink_hover_border_bottom_border_width',
        this.infor.w_link_hover_border_bottom_border_width
      )
      this.$set(
        this.infor,
        'w_firlink_hover_border_left_border_style',
        this.infor.w_link_hover_border_left_border_style
      )
      this.$set(
        this.infor,
        'w_firlink_hover_border_left_border_color',
        this.infor.w_link_hover_border_left_border_color
      )
      this.$set(
        this.infor,
        'w_firlink_hover_border_left_border_width',
        this.infor.w_link_hover_border_left_border_width
      )
    }
  },
  updated() {
    if (!this.infor.w_link_second_br) {
      this.infor.w_link_second_br = 0
    }
  },
  mounted() {
    this.infor.w_link_open_first_set = this.infor.w_link_open_first_set + ''

    // 兼容老版本
    if (!this.infor.allwidth) {
      this.$set(this.infor, 'width', 100)
      this.$set(this.infor, 'height', 44)
      this.$set(this.infor, 'w_link_first_br', 0)
      this.$set(this.infor, 'w_link_second_br', 0)
      // 兼容老版本
      this.initData()
    }

    //  新增一级边框设置兼容
    if (!this.infor.w_firlink_border_left_border_color) {
      this.temBorder()
      this.temHoverBorder()
    }

    if (!this.infor.isShows) {
      this.$set(this.infor, 'isShows', false)
    }
  }
}
</script>
<style>
img.index_Highlight {
  box-shadow: 0 0 3px 3px #f00;
}

sup {
  top: -0.25em;
}
</style>

