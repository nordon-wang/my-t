<template>
  <div class="searchsEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
      <!-- <span>{{this.infor.search_oppen_style}}</span> -->
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('placeholder_set')" data-Highlight="placeholder_set" :class="[
           $store.state.hover_parts == 'placeholder_set'  ? 'index_Highlight' : ''
           ]" v-show="infor.search_oppen_style == 0 || infor.search_oppen_style == 1 || infor.search_oppen_style == 3  || infor.search_oppen_style == 4">提示信息</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('input_set')" data-Highlight="input_set" :class="[
           $store.state.hover_parts == 'input_set'  ? 'index_Highlight' : ''
           ]" v-show="infor.search_oppen_style == 0 || infor.search_oppen_style == 1 || infor.search_oppen_style == 3 || infor.search_oppen_style == 4">输入框设置</span>
      <!-- 样式3的输入框设置 -->
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('style3_input_set')" data-Highlight="style3_input_set" :class="[
           $store.state.hover_parts == 'style3_input_set'  ? 'index_Highlight' : ''
           ]" v-show="infor.search_oppen_style == 2">输入框设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('iconstyle_set')" data-Highlight="iconstyle_set" :class="[
           $store.state.hover_parts == 'iconstyle_set'  ? 'index_Highlight' : ''
           ]" v-show="infor.search_oppen_style == 0 || infor.search_oppen_style == 1">图标样式</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('txt_btn_set')" data-Highlight="txt_btn_set" :class="[
           $store.state.hover_parts == 'txt_btn_set'  ? 'index_Highlight' : ''
           ]" v-show="infor.search_oppen_style == 0 || infor.search_oppen_style == 1">文本按钮</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('icon_btn_set')" data-Highlight="icon_btn_set" :class="[
           $store.state.hover_parts == 'icon_btn_set'  ? 'index_Highlight' : ''
           ]" v-show="infor.search_oppen_style == 1 || infor.search_oppen_style == 2">按钮图标</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('x_btn_set')" data-Highlight="x_btn_set" :class="[
           $store.state.hover_parts == 'x_btn_set'  ? 'index_Highlight' : ''
           ]" v-show="infor.search_oppen_style == 1">X设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('select_btn_set')" data-Highlight="select_btn_set" :class="[
           $store.state.hover_parts == 'select_btn_set'  ? 'index_Highlight' : ''
           ]" v-show="infor.search_oppen_style == 4">下拉选项</span>
      <!-- 图标 样式5的 -->
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('style5_icon_btn_set')" data-Highlight="style5_icon_btn_set" :class="[
           $store.state.hover_parts == 'style5_icon_btn_set'  ? 'index_Highlight' : ''
           ]" v-show="infor.search_oppen_style == 4">图标样式</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('search_icon_set')" data-Highlight="search_icon_set" :class="[
           $store.state.hover_parts == 'search_icon_set'  ? 'index_Highlight' : ''
           ]">图标选择</span>
      <!-- 样式3的 图标设置 -->
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('search_style3_icon')" data-Highlight="search_style3_icon" :class="[
           $store.state.hover_parts == 'search_style3_icon'  ? 'index_Highlight' : ''
           ]" v-show="infor.search_oppen_style == 3 ">图标样式</span>
    </div>

    <!-- 样式3的 图标设置 -->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'search_style3_icon'">
      <div class="setOne">
        <my-number v-model="infor.search_btn_icon_div_width" :max="500" :min="12" title="宽"></my-number>
        <my-number v-model="infor.search_btn_icon_div_height" :max="500" :min="12" title="高"></my-number>
        <my-number v-model="infor.search_btn_icon_fs" :max="100" :min="12" title="图标大小"></my-number>
        <!-- <my-number v-model="infor.search_iconbtn_rotate" :max="360" :min="0" title="旋转"></my-number> -->
      </div>

      <div class="setOne">
        <my-number v-model="infor.search_btn_icon_margin_top" :max="500" :min="-500" title="上间距"></my-number>
        <my-number v-model="infor.search_btn_icon_margin_left" :max="500" :min="-500" title="左间距"></my-number>
        <my-color v-model="infor.search_btn_icon_color" title="图标颜色"></my-color>
        <my-color v-model="infor.search4_bc" title="背景颜色"></my-color>
      </div>
    </div>

    <!-- 图标样式 样式5的 -->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'style5_icon_btn_set'  && infor.search_oppen_style == 4 ">
      <div class="setOne">
        <my-number v-model="infor.search5_icon_width" :max="500" :min="12" title="宽"></my-number>
        <my-number v-model="infor.search5_icon_height" :max="500" :min="12" title="高"></my-number>
        <my-number v-model="infor.search_icon_width" :max="100" :min="12" title="图标大小"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.search_icon_color" title="图标颜色"></my-color>
        <my-color v-model="infor.search5_icon_bc" title="背景颜色"></my-color>
      </div>
    </div>

    <!-- 下拉选项 -->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'select_btn_set' && infor.search_oppen_style == 4">

      <div class="setOne">
        <my-number v-model="infor.search5_select_width" :max="500" :min="40" title="宽"></my-number>
        <my-number v-model="infor.search5_select_height" :max="500" :min="18" title="高"></my-number>
        <my-number v-model="infor.search5_select_fs" :max="100" :min="12" title="字体大小"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.search5_select_color" title="字体颜色"></my-color>
        <my-color v-model="infor.search5_select_bc" title="背景颜色"></my-color>
      </div>

    </div>

    <!-- X设置 -->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'x_btn_set' && infor.search_oppen_style == 1">

      <div class="setOne">
        <my-select v-model="infor.search_x_show" title="显示" :option="$store.state.options.twoBtn"></my-select>
        <my-number v-model="infor.search_x_fs" :max="100" :min="12" title="大小"></my-number>
        <my-color v-model="infor.search_x_color" title="颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.search_x_top" :max="1000" :min="0" title="上间距"></my-number>
        <my-number v-model="infor.search_x_right" :max="1000" :min="0" title="右间距"></my-number>
      </div>

    </div>

    <!-- 按钮图标 -->
    <div class="Routine_setting overflow_y_auto btm_0cols" v-if="$store.state.parts == 'icon_btn_set' && infor.search_oppen_style != 0 ">
      <my-computed :btype="'all'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.search_btn_icon_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.search_btn_icon_margin_right" :min="0" :max="1000" title="右外间距"></my-number>
          <my-number v-model="infor.search_btn_icon_margin_bottom" :min="0" :max="1000" title="下外间距"></my-number>
          <my-number v-model="infor.search_btn_icon_margin_left" :min="0" :max="1000" title="左外间距"></my-number>
        </div>
        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.search_btn_icon_padding_top" :min="0" :max="1000" title="上内间距"></my-number>
          <my-number v-model="infor.search_btn_icon_padding_right" :min="0" :max="1000" title="右内间距"></my-number>
          <my-number v-model="infor.search_btn_icon_padding_bottom" :min="0" :max="1000" title="下内间距"></my-number>
          <my-number v-model="infor.search_btn_icon_padding_left" :min="0" :max="1000" title="左内间距"></my-number>
        </div>
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.search_btn_icon_div_width" :max="500" :min="20" title="宽"></my-number>
          <my-number v-model="infor.search_btn_icon_div_height" :max="500" :min="20" title="高"></my-number>
          <my-number v-model="infor.search_btn_icon_fs" :max="500" :min="12" title="图标大小"></my-number>
          <my-number v-model="infor.search_iconbtn_rotate" title="旋转"></my-number>
        </div>
      </my-computed>

      <div class="setOne">
      </div>
    </div>

    <!-- 提示信息设置 -->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'placeholder_set'">
      <div class="setOne">
        <el-alert :style="{
          display: 'inline-block',
          width: '60%'
        }" title="提示信息设置是设置输入框中的提示信息的颜色、字体大小,不是输入框中输入内容的字体颜色、字体大小设置" type="success">
        </el-alert>
      </div>

      <div class="setOne">
        <my-input v-model="infor.search_placeholder" placeholder="输入框提示信息" title="提示信息"></my-input>
        <my-number v-model="infor.search_placeholder_fs" :min="12" title="字体大小"></my-number>
        <my-color v-model="infor.search_input_placeholder_color" title="字体颜色"></my-color>
      </div>
    </div>

    <!-- 输入框设置 -->
    <div class="Routine_setting btm_4cols" v-if="$store.state.parts == 'style3_input_set'">
      <div class="setOne">
        <my-border type="top" :my_width.sync="infor.searchs_border_top_width" :my_color.sync="infor.searchs_border_top_color" :my_style.sync="infor.searchs_border_top_style" title="上边框"></my-border>
        <my-border type="right" :my_width.sync="infor.searchs_border_right_width" :my_color.sync="infor.searchs_border_right_color" :my_style.sync="infor.searchs_border_right_style" title="右边框"></my-border>
        <my-border type="bottom" :my_width.sync="infor.searchs_border_bottom_width" :my_color.sync="infor.searchs_border_bottom_color" :my_style.sync="infor.searchs_border_bottom_style" title="下边框"></my-border>
        <my-border type="left" :my_width.sync="infor.searchs_border_left_width" :my_color.sync="infor.searchs_border_left_color" :my_style.sync="infor.searchs_border_left_style" title="左边框"></my-border>
      </div>

    </div>

    <!-- 输入框设置 -->
    <div class="Routine_setting btm_4cols" v-if="$store.state.parts == 'input_set'">
      <my-computed :btype="'diff_hover'" :checktype="'contain_control'">
        <div slot="margin_control" class="setOne" v-if="infor.search_oppen_style == 3">
          <my-number v-model="infor.search_margin_top" title="上外间距" v-if="infor.search_oppen_style == 3"></my-number>
        </div>
        <div slot="padding_control" class="setOne">
          <!-- 缺少左外 右外 -->
          <my-number v-model="infor.search_padding_left" title="左内间距"></my-number>
          <my-number v-model="infor.search_padding_right" title="右内间距" v-if="infor.search_oppen_style != 3"></my-number>
        </div>

        <!-- 默认的边框设置 -->
        <div class="setOne" slot="diff_border">
          <my-border type="top" :my_width.sync="infor.searchs_border_top_width" :my_color.sync="infor.searchs_border_top_color" :my_style.sync="infor.searchs_border_top_style" title="上边框"></my-border>
          <my-border type="right" :my_width.sync="infor.searchs_border_right_width" :my_color.sync="infor.searchs_border_right_color" :my_style.sync="infor.searchs_border_right_style" title="右边框"></my-border>
          <my-border type="bottom" :my_width.sync="infor.searchs_border_bottom_width" :my_color.sync="infor.searchs_border_bottom_color" :my_style.sync="infor.searchs_border_bottom_style" title="下边框"></my-border>
          <my-border type="left" :my_width.sync="infor.searchs_border_left_width" :my_color.sync="infor.searchs_border_left_color" :my_style.sync="infor.searchs_border_left_style" title="左边框"></my-border>
        </div>

        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.search_width" :max="500" :min="30" title="搜索框宽"></my-number>
          <my-number v-model="infor.search_height" :max="500" :min="20" title="搜索框高"></my-number>
          <my-number v-model="infor.search_radius" :max="500" :min="0" title="圆角"></my-number>
          <my-number v-model="infor.search_input_fs" :min="12" title="字体大小"></my-number>
        </div>
      </my-computed>

      <div class="setOne">
        <my-color v-model="infor.search_input_bg_color" title="背景颜色"></my-color>
        <my-color v-model="infor.search_input_color" title="字体颜色"></my-color>
      </div>

    </div>

    <!-- 图标样式 -->
    <div class="Routine_setting btm_4cols" v-if="$store.state.parts == 'iconstyle_set'">
      <div class="setOne">
        <my-select v-model="infor.search_is_show_icon" title="显示" :option="$store.state.options.twoBtn"></my-select>
        <my-number v-model="infor.search_icon_width" :max="200" :min="12" title="图标大小"></my-number>
        <my-number v-model="infor.search_absolute_left" title="左间距"></my-number>
        <my-number v-model="infor.search_absolute_top" title="上间距"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.search_icon_rotate" :max="360" :min="-360" title="旋转"></my-number>
        <my-color v-model="infor.search_icon_color" title="图标颜色"></my-color>
        <my-number v-model="infor.search_btn_icon_div_width" v-show="infor.search_oppen_style == 3" title="宽"></my-number>
        <my-number v-model="infor.search_btn_icon_div_height" v-show="infor.search_oppen_style == 3" title="高"></my-number>
      </div>
    </div>

    <!-- 文本按钮 -->
    <div class="Routine_setting btm_4cols" v-if="$store.state.parts == 'txt_btn_set'">
      <div class="setOne">
        <my-select v-model="infor.search_is_show_txt" title="显示" :option="$store.state.options.twoBtn"></my-select>
        <my-input v-model="infor.search_btn_text" placeholder="文本显示内容" title="文字内容"></my-input>
        <my-select v-model="infor.search_text_text_align" title="文本位置" :option="$store.state.options.textAlign"></my-select>
        <my-number v-model="infor.search_text_fs" :max="200" :min="12" title="字体大小"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.search_text_width" :max="200" :min="12" title="文本宽"></my-number>
        <my-number v-model="infor.search_text_height" :max="200" :min="12" title="文本高"></my-number>
        <my-color v-model="infor.search_text_font_color" title="文字颜色"></my-color>
        <my-color v-model="infor.search_text_color" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.search_text_pos_left" :max="500" :min="-500" title="左间距"></my-number>
        <my-number v-model="infor.search_text_pos_right" :max="500" :min="-500" title="上间距"></my-number>
        <my-number v-model="infor.search_text_border_radius" :max="200" :min="0" title="圆角"></my-number>
      </div>

    </div>

    <!-- 图标选择 -->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'search_icon_set'">
      <ul class="icon_lists clearfix">
        <li v-on:click="clickIcon('icon-search')" :class="/(icon-search)$/ig.test(infor.icon_class) ? 'checked' : ''" >
          <i class="icon iconfont icon-search"></i>
        </li>
        <li v-on:click="clickIcon('icon-search1')" :class="/(icon-search1)$/ig.test(infor.icon_class) ? 'checked' : ''">
          <i class="icon iconfont icon-search1"></i>
        </li>
        <li v-on:click="clickIcon('icon-search4')" :class="/(icon-search4)$/ig.test(infor.icon_class) ? 'checked' : ''">
          <i class="icon iconfont icon-search4"></i>
        </li>
        <li v-on:click="clickIcon('icon-search5')" :class="/(icon-search5)$/ig.test(infor.icon_class) ? 'checked' : ''">
          <i class="icon iconfont icon-search5"></i>
        </li>
        <li v-on:click="clickIcon('icon-search10')" :class="/(icon-search10)$/ig.test(infor.icon_class) ? 'checked' : ''">
          <i class="icon iconfont icon-search10"></i>
        </li>
        <li v-on:click="clickIcon('icon-search17')" :class="/(icon-search17)$/ig.test(infor.icon_class) ? 'checked' : ''">
          <i class="icon iconfont icon-search17"></i>
        </li>
        <li v-on:click="clickIcon('icon-search19')" :class="/(icon-search19)$/ig.test(infor.icon_class) ? 'checked' : ''">
          <i class="icon iconfont icon-search19"></i>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import style from './style'

export default {
  name: 'basic_searchs_edit',
  props: {},
  data() {
    return {
      infor: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.infor)
      ),
      listArr: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.listArr)
      ),
      animateObj: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.animateObj)
      )
    }
  },
  computed: {
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'infor',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑搜索组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑搜索组件');
      },
      deep: true
    }
  },
  methods: {
    clickIcon(val) {
      this.infor.icon_class = 'icon iconfont ' + val
    }
  },
  mounted() {
    // 设置当前的容器y轴 超出auto
    // $('.overflow_y_auto').parents('.bottomBar').children('.content').css('overflowY','auto');
  }
}
</script>

<style scoped>
@import '../../../static/icon/search/demo.css';
@import '../../../static/icon/search/iconfont.css';
/* @import ".././@/static/icon/search/demo.css"; */
/* @import "~/static/icon/search/iconfont.css"; */

.icon_lists li {
  cursor: pointer;
}

.icon_lists li.checked .icon{
  color: red !important;
}

</style>

<style>
</style>

