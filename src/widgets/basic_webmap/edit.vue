<template>
  <div class="gobackEdit">
    <!--初始显示-->
    <div class="init_edit" v-if="$store.state.parts == ''">
      <span class="mouseClass" @click="templet.p_select_parts('public_set')" data-Highlight="public_set" :class="[
           $store.state.hover_parts == 'public_set'  ? 'index_Highlight' : ''
           ]">通用设置</span>
      <span class="mouseClass" @click="templet.p_select_parts('first_set')" data-Highlight="first_set" :class="[
           $store.state.hover_parts == 'first_set'  ? 'index_Highlight' : ''
           ]">一级菜单</span>
      <span class="mouseClass" @click="templet.p_select_parts('sec_set')" data-Highlight="sec_set" :class="[
           $store.state.hover_parts == 'sec_set'  ? 'index_Highlight' : ''
           ]">二级菜单</span>
      <span class="mouseClass" @click="templet.p_select_parts('thr_set')" data-Highlight="thr_set" :class="[
           $store.state.hover_parts == 'thr_set'  ? 'index_Highlight' : ''
           ]">三级菜单</span>
      <span class="mouseClass" @click="templet.p_select_parts('four_set')" data-Highlight="four_set" :class="[
           $store.state.hover_parts == 'four_set'  ? 'index_Highlight' : ''
           ]">四级菜单</span>
    </div>

    <!-- 通用设置 -->
    <div class="Routine_setting btm_2cols" v-if="$store.state.parts == 'public_set'">
      <div class="setOne"></div>
      <div class="setOne">
        <my-border type="all" :my_width.sync="infor.webmap_menu_border_width" :my_color.sync="infor.webmap_menu_border_color" :my_style.sync="infor.webmap_menu_border_style" title="默认边框"></my-border>
      </div>
      <div class="setOne">
        <my-border type="all" :my_width.sync="infor.webmap_menu_border_width_hover" :my_color.sync="infor.webmap_menu_border_color_hover" :my_style.sync="infor.webmap_menu_border_style_hover" title="悬浮边框"></my-border>
      </div>
    </div>

    <!-- 一级菜单  -->
    <div class="Routine_setting " v-if="$store.state.parts == 'first_set'">
      <my-computed :btype="'all'" :checktype="'contain_control'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.webmap_menu1_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.webmap_menu1_margin_right" :min="0" :max="1000" title="右外间距"></my-number>
          <my-number v-model="infor.webmap_menu1_margin_bottom" :min="0" :max="1000" title="下外间距"></my-number>
          <my-number v-model="infor.webmap_menu1_margin_left" :min="0" :max="1000" title="左外间距"></my-number>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.webmap_menu1_width" :min="0" :max="1000" title="宽"></my-number>
          <my-number v-model="infor.webmap_menu1_height" :min="0" :max="1000" title="高"></my-number>
          <my-number v-model="infor.webmap_menu1_fs" :min="12" :max="1000" title="字体大小"></my-number>
          <my-color v-model="infor.webmap_menu1_font_color" title="字体颜色"></my-color>
        </div>
      </my-computed>

      <div class="setOne">
        <my-number v-model="infor.webmap_menu1_border_radius" :min="0" :max="1000" title="圆角半径"></my-number>
        <my-select v-model="infor.webmap_menu1_font_weight" title="字体粗细" :option="$store.state.options.myFontWeight2"></my-select>
        <my-select v-model="infor.webmap_menu1_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
      </div>

      <div class="setOne">
        <my-color v-model="infor.webmap_menu1_hover_font_color" title="悬浮字体"></my-color>
        <my-color v-model="infor.webmap_menu1_bc_color" title="背景颜色"></my-color>
        <my-color v-model="infor.webmap_menu1_hover_bc_color" title="悬浮背景"></my-color>
      </div>
    </div>

    <!-- 二级菜单 -->
    <div class="Routine_setting " v-if="$store.state.parts == 'sec_set'">
      <my-computed :btype="'all'" :checktype="'contain_control'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.webmap_menu2_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.webmap_menu2_margin_right" :min="0" :max="1000" title="右外间距"></my-number>
          <my-number v-model="infor.webmap_menu2_margin_bottom" :min="0" :max="1000" title="下外间距"></my-number>
          <my-number v-model="infor.webmap_menu2_margin_left" :min="0" :max="1000" title="左外间距"></my-number>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.webmap_menu2_width" :min="0" :max="1000" title="宽"></my-number>
          <my-number v-model="infor.webmap_menu2_height" :min="0" :max="1000" title="高"></my-number>
          <my-number v-model="infor.webmap_menu2_fs" :min="12" :max="1000" title="字体大小"></my-number>
          <my-color v-model="infor.webmap_menu2_font_color" title="字体颜色"></my-color>
        </div>
      </my-computed>

      <div class="setOne">
        <my-number v-model="infor.webmap_menu2_width_total" :min="0" :max="2400" title="总宽"></my-number>

        <el-alert :style="{
          display: 'inline-block',
          width: '30%'
        }" title="二级菜单总宽度设置" type="success">
        </el-alert>
      </div>

      <div class="setOne">
        <my-number v-model="infor.webmap_menu2_border_radius" :min="0" :max="1000" title="圆角半径"></my-number>
        <my-select v-model="infor.webmap_menu2_font_weight" title="字体粗细" :option="$store.state.options.myFontWeight2"></my-select>
        <my-select v-model="infor.webmap_menu2_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
      </div>

      <div class="setOne">
        <my-color v-model="infor.webmap_menu2_hover_font_color" title="悬浮字体"></my-color>
        <my-color v-model="infor.webmap_menu2_bc_color" title="背景颜色"></my-color>
        <my-color v-model="infor.webmap_menu2_hover_bc_color" title="悬浮背景"></my-color>
      </div>
    </div>

    <!-- 三级菜单 -->
    <div class="Routine_setting " v-if="$store.state.parts == 'thr_set'">
      <my-computed :btype="'all'" :checktype="'contain_control'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.webmap_menu3_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.webmap_menu3_margin_right" :min="0" :max="1000" title="右外间距"></my-number>
          <my-number v-model="infor.webmap_menu3_margin_bottom" :min="0" :max="1000" title="下外间距"></my-number>
          <my-number v-model="infor.webmap_menu3_margin_left" :min="0" :max="1000" title="左外间距"></my-number>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.webmap_menu3_width" :min="0" :max="1000" title="宽"></my-number>
          <my-number v-model="infor.webmap_menu3_height" :min="0" :max="1000" title="高"></my-number>
          <my-number v-model="infor.webmap_menu3_fs" :min="12" :max="1000" title="字体大小"></my-number>
          <my-color v-model="infor.webmap_menu3_font_color" title="字体颜色"></my-color>
        </div>
      </my-computed>

      <div class="setOne">
        <my-number v-model="infor.webmap_menu3_width_total" :min="0" :max="2400" title="总宽"></my-number>

        <el-alert :style="{
          display: 'inline-block',
          width: '30%'
        }" title="三级菜单总宽度设置" type="success">
        </el-alert>
      </div>

      <div class="setOne">
        <my-number v-model="infor.webmap_menu3_border_radius" :min="0" :max="1000" title="圆角半径"></my-number>
        <my-select v-model="infor.webmap_menu3_font_weight" title="字体粗细" :option="$store.state.options.myFontWeight2"></my-select>
        <my-select v-model="infor.webmap_menu3_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
      </div>

      <div class="setOne">
        <my-color v-model="infor.webmap_menu3_hover_font_color" title="悬浮字体"></my-color>
        <my-color v-model="infor.webmap_menu3_bc_color" title="背景颜色"></my-color>
        <my-color v-model="infor.webmap_menu3_hover_bc_color" title="悬浮背景"></my-color>
      </div>
    </div>

    <!-- 四级菜单 -->
    <div class="Routine_setting " v-if="$store.state.parts == 'four_set'">
      <my-computed :btype="'all'" :checktype="'contain_control'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.webmap_menu4_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.webmap_menu4_margin_right" :min="0" :max="1000" title="右外间距"></my-number>
          <my-number v-model="infor.webmap_menu4_margin_bottom" :min="0" :max="1000" title="下外间距"></my-number>
          <my-number v-model="infor.webmap_menu4_margin_left" :min="0" :max="1000" title="左外间距"></my-number>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.webmap_menu4_width" :min="0" :max="1000" title="宽"></my-number>
          <my-number v-model="infor.webmap_menu4_height" :min="0" :max="1000" title="高"></my-number>
          <my-number v-model="infor.webmap_menu4_fs" :min="12" :max="1000" title="字体大小"></my-number>
          <my-color v-model="infor.webmap_menu4_font_color" title="字体颜色"></my-color>
        </div>
      </my-computed>

      <div class="setOne">
        <my-number v-model="infor.webmap_menu4_border_radius" :min="0" :max="1000" title="圆角半径"></my-number>
        <my-select v-model="infor.webmap_menu4_font_weight" title="字体粗细" :option="$store.state.options.myFontWeight2"></my-select>
      </div>
      
      <div class="setOne">
        <my-select v-model="infor.webmap_menu4_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
        <my-color v-model="infor.webmap_menu4_hover_font_color" title="悬浮字体"></my-color>
      </div>

      <div class="setOne">
        <my-color v-model="infor.webmap_menu4_bc_color" title="背景颜色"></my-color>
        <my-color v-model="infor.webmap_menu4_hover_bc_color" title="悬浮背景"></my-color>
      </div>
    </div>

  </div>
</template>

<script>
import style from './style'

export default {
  name: 'basic_webmap_edit',
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
  watch: {
    infor: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'infor',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑站点地图组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑站点地图组件');
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
