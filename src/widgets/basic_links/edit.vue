<template>
  <div class="dateEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('links1')" data-Highlight="links1" :class="[
           $store.state.hover_parts == 'links1'  ? 'index_Highlight' : ''
           ]" v-show='infor.links_styles != "0"'>友情链接</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('links2')" data-Highlight="links2" :class="[
           $store.state.hover_parts == 'links2'  ? 'index_Highlight' : ''
           ]" v-show='infor.links_styles != "0"'>链接动画</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('links3')" data-Highlight="links3" :class="[
           $store.state.hover_parts == 'links3'  ? 'index_Highlight' : ''
           ]" v-show='infor.links_styles == "0"'>一级链接</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('links4')" data-Highlight="links4" :class="[
           $store.state.hover_parts == 'links4'  ? 'index_Highlight' : ''
           ]">二级链接</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('links5')" data-Highlight="links5" :class="[
           $store.state.hover_parts == 'links5'  ? 'index_Highlight' : ''
           ]" v-show='infor.links_styles == "0"'>悬浮图片</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('links6')" data-Highlight="links6" :class="[
           $store.state.hover_parts == 'links6'  ? 'index_Highlight' : ''
           ]">链接状态</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('links7')" data-Highlight="links7" :class="[
           $store.state.hover_parts == 'links7'  ? 'index_Highlight' : ''
           ]">图标设置</span>
    </div>

    <!-- 友情链接 links1 -->
    <div class="btn_setting btm_4cols" v-if="$store.state.parts == 'links1'">
      <div class="setOne">
        <my-select v-model="infor.w_flink_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
        <my-input v-model="infor.w_flinks_con" title="链接文本"></my-input>
        <my-number v-model="infor.w_flinks_font_size" :max="100" :min="12" title="字体大小"></my-number>
        <my-number v-model="infor.w_flinks_border_radius" title="圆角半径"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.w_flinks_width" title="框宽"></my-number>
        <my-number v-model="infor.w_flinks_height" title="框高"></my-number>
        <my-color v-model="infor.w_flinks_font_color" title="字体颜色"></my-color>
        <my-color v-model="infor.w_flinks_bc_color" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.w_flinks_icon_left" :max="500" :min="-500" title="箭头左间距"></my-number>
        <my-number v-model="infor.w_flinks_icon_top" :max="500" :min="-500" title="箭头上间距"></my-number>
      </div>
    </div>

    <!-- 链接动画 links2 -->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'links2'">
      <div class="setOne">
        <my-select v-model="infor.w_links_emit_styles" title="触发方式" :option="$store.state.options.emitStyles"></my-select>
        <my-select v-model="infor.w_links_sport_styles" title="运动类型" :option="$store.state.options.sportStyles"></my-select>
        <my-number v-model="infor.w_links_sport_time" :min="0" :max="100000" title="运动时间"></my-number>
      </div>
    </div>

    <!--一级链接 myDirective -->
    <div class="Routine_setting" v-if="$store.state.parts == 'links3'">
      <my-computed :btype="'diff_hover'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.w_link_first_mt" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.w_link_first_mr" :min="0" :max="1000" title="右外间距"></my-number>
          <my-number v-model="infor.w_link_first_mb" :min="0" :max="1000" title="下外间距"></my-number>
          <my-number v-model="infor.w_link_first_ml" :min="0" :max="1000" title="左外间距"></my-number>
        </div>
        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.w_link_first_pt" :min="0" :max="1000" title="上内间距"></my-number>
          <my-number v-model="infor.w_link_first_pr" :min="0" :max="1000" title="右内间距"></my-number>
          <my-number v-model="infor.w_link_first_pb" :min="0" :max="1000" title="下内间距"></my-number>
          <my-number v-model="infor.w_link_first_pl" :min="0" :max="1000" title="左内间距"></my-number>
        </div>
        <!-- 默认的边框设置 -->
        <div class="setOne" slot="diff_border">
          <my-border type="top" :my_style.sync="infor.w_firlink_border_top_border_style" :my_color.sync="infor.w_firlink_border_top_border_color" :my_width.sync="infor.w_firlink_border_top_border_width" title="上边框"></my-border>
          <my-border type="right" :my_style.sync="infor.w_firlink_border_right_border_style" :my_color.sync="infor.w_firlink_border_right_border_color" :my_width.sync="infor.w_firlink_border_right_border_width" title="右边框"></my-border>
          <my-border type="bottom" :my_style.sync="infor.w_firlink_border_bottom_border_style" :my_color.sync="infor.w_firlink_border_bottom_border_color" :my_width.sync="infor.w_firlink_border_bottom_border_width" title="下边框"></my-border>
          <my-border type="left" :my_style.sync="infor.w_firlink_border_left_border_style" :my_color.sync="infor.w_firlink_border_left_border_color" :my_width.sync="infor.w_firlink_border_left_border_width" title="左边框"></my-border>
        </div>
        <!-- 悬浮的边框设置 -->
        <div class="setOne" slot="diff_border_hover">
          <my-border type="top" :my_style.sync="infor.w_firlink_hover_border_top_border_style" :my_color.sync="infor.w_firlink_hover_border_top_border_color" :my_width.sync="infor.w_firlink_hover_border_top_border_width" title="上边框"></my-border>
          <my-border type="right" :my_style.sync="infor.w_firlink_hover_border_right_border_style" :my_color.sync="infor.w_firlink_hover_border_right_border_color" :my_width.sync="infor.w_firlink_hover_border_right_border_width" title="右边框"></my-border>
          <my-border type="bottom" :my_style.sync="infor.w_firlink_hover_border_bottom_border_style" :my_color.sync="infor.w_firlink_hover_border_bottom_border_color" :my_width.sync="infor.w_firlink_hover_border_bottom_border_width" title="下边框"></my-border>
          <my-border type="left" :my_style.sync="infor.w_firlink_hover_border_left_border_style" :my_color.sync="infor.w_firlink_hover_border_left_border_color" :my_width.sync="infor.w_firlink_hover_border_left_border_width" title="左边框"></my-border>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.w_color_width_first" title="链接宽"></my-number>
          <my-number v-model="infor.w_color_height_first" title="链接高"></my-number>
          <my-number v-model="infor.w_link_fs_first" :min="12" :max="100" title="字体大小"></my-number>
          <my-color v-model="infor.w_link_color_first" title="字体颜色"></my-color>
        </div>
      </my-computed>

      <div class="setOne">
        <my-color v-model="infor.w_link_hover_color_first" title="悬浮字体"></my-color>
        <my-color v-model="infor.w_link_bg_color_first" title="背景颜色"></my-color>
        <my-color v-model="infor.w_link_bg_hover_color_first" title="悬浮背景"></my-color>
      </div>

      <div class="setOne">
        <my-select v-model="infor.w_link_bold_first" title="加粗" :option="$store.state.options.myFontWeight"></my-select>
        <my-select v-model="infor.w_link_text_align_first" title="水平位置" :option="$store.state.options.textAlign"></my-select>
        <my-number v-model="infor.w_link_first_br" :min="0"  title="圆角半径"></my-number>
      </div>

      <div class="setOne">
        <my-select v-model="infor.w_link_dir" title="排列方向" :option="$store.state.options.myDirective"></my-select>
        <my-select v-model="infor.w_link_open_first_set" title="一级链接" :option="$store.state.options.customOptionTwo"></my-select>
      </div>

    </div>

    <!-- 二级链接 -->
    <div class="btn_setting" v-if="$store.state.parts == 'links4'">
      <my-computed title="外间距" :mtop.sync="infor.w_link_margin_top" :mright.sync="infor.w_link_margin_right" :mbottom.sync="infor.w_link_margin_bottom" :mleft.sync="infor.w_link_margin_left" :ptop.sync="infor.w_link_filltop" :pright.sync="infor.w_link_fillr" :pbottom.sync="infor.w_link_fillbtm" :pleft.sync="infor.w_link_fillleft" :btype="'diff_hover'">

        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.w_link_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.w_link_margin_right" :min="0" :max="1000" title="右外间距"></my-number>
          <my-number v-model="infor.w_link_margin_bottom" :min="0" :max="1000" title="下外间距"></my-number>
          <my-number v-model="infor.w_link_margin_left" :min="0" :max="1000" title="左外间距"></my-number>
        </div>
        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.w_link_filltop" :min="0" :max="1000" title="上内间距"></my-number>
          <my-number v-model="infor.w_link_fillr" :min="0" :max="1000" title="右内间距"></my-number>
          <my-number v-model="infor.w_link_fillbtm" :min="0" :max="1000" title="下内间距"></my-number>
          <my-number v-model="infor.w_link_fillleft" :min="0" :max="1000" title="左内间距"></my-number>
        </div>
        <!-- 默认的边框设置 -->
        <div class="setOne" slot="diff_border">
          <my-border type="top" :my_style.sync="infor.w_link_border_top_border_style" :my_color.sync="infor.w_link_border_top_border_color" :my_width.sync="infor.w_link_border_top_border_width" title="上边框"></my-border>
          <my-border type="right" :my_style.sync="infor.w_link_border_right_border_style" :my_color.sync="infor.w_link_border_right_border_color" :my_width.sync="infor.w_link_border_right_border_width" title="右边框"></my-border>
          <my-border type="bottom" :my_style.sync="infor.w_link_border_bottom_border_style" :my_color.sync="infor.w_link_border_bottom_border_color" :my_width.sync="infor.w_link_border_bottom_border_width" title="下边框"></my-border>
          <my-border type="left" :my_style.sync="infor.w_link_border_left_border_style" :my_color.sync="infor.w_link_border_left_border_color" :my_width.sync="infor.w_link_border_left_border_width" title="左边框"></my-border>
        </div>
        <!-- 悬浮的边框设置 -->
        <div class="setOne" slot="diff_border_hover">
          <my-border type="top" :my_style.sync="infor.w_link_hover_border_top_border_style" :my_color.sync="infor.w_link_hover_border_top_border_color" :my_width.sync="infor.w_link_hover_border_top_border_width" title="上边框"></my-border>
          <my-border type="right" :my_style.sync="infor.w_link_hover_border_right_border_style" :my_color.sync="infor.w_link_hover_border_right_border_color" :my_width.sync="infor.w_link_hover_border_right_border_width" title="右边框"></my-border>
          <my-border type="bottom" :my_style.sync="infor.w_link_hover_border_bottom_border_style" :my_color.sync="infor.w_link_hover_border_bottom_border_color" :my_width.sync="infor.w_link_hover_border_bottom_border_width" title="下边框"></my-border>
          <my-border type="left" :my_style.sync="infor.w_link_hover_border_left_border_style" :my_color.sync="infor.w_link_hover_border_left_border_color" :my_width.sync="infor.w_link_hover_border_left_border_width" title="左边框"></my-border>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.w_color_width" title="链接宽"></my-number>
          <my-number v-model="infor.w_color_height" title="链接高"></my-number>
          <my-number v-model="infor.w_link_fs" :min="12" :max="100" title="字体大小"></my-number>
          <my-color v-model="infor.w_link_color" title="字体颜色"></my-color>
        </div>
      </my-computed>

      <div class="setOne">
        <my-color v-model="infor.w_link_hover_color" title="悬浮字体"></my-color>
        <my-color v-model="infor.w_link_bg_color" title="背景颜色"></my-color>
        <my-color v-model="infor.w_link_bg_hover_color" title="悬浮背景"></my-color>
      </div>

      <div class="setOne">
        <my-select v-model="infor.w_link_bold" title="加粗" :option="$store.state.options.myFontWeight"></my-select>
        <my-select v-model="infor.w_link_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
        <my-number v-model="infor.w_link_second_br" title="圆角半径"></my-number>
      </div>
    </div>

    <!-- 链接状态 linkStatus-->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'links6'">
      <div style="width:60%;">
        <el-alert title="设置链接的未被访问、已被访问、鼠标悬浮和点击时下划线状态,即下划线是否存在" type="success">
        </el-alert>
      </div>

      <div class="setOne">
        <my-select v-model="infor.w_link_decoration_link" title="未被访问" :option="$store.state.options.linkStatus"></my-select>
        <my-select v-model="infor.w_link_decoration_hover" title="鼠标悬浮" :option="$store.state.options.linkStatus"></my-select>
        <my-select v-model="infor.w_link_decoration_active" title="点击时" :option="$store.state.options.linkStatus"></my-select>
      </div>

    </div>

    <!-- 链接状态 linkStatus-->
    <div class="btn_setting btm_2cols" v-if="$store.state.parts == 'links5'">
      <div class="setOne">
        <my-number v-model="infor.w_flinks_pic_width" title="图片宽"></my-number>
        <my-number v-model="infor.w_flinks_pic_height" title="图片高"></my-number>
      </div>
      <div class="setOne">
        <my-number v-model="infor.w_flinks_pic_left" title="左间距"></my-number>
        <my-number v-model="infor.w_flinks_pic_top" title="上间距"></my-number>
      </div>
    </div>

    <!-- 图标状态 -->
    <div class="btn_setting btm_2cols" v-if="$store.state.parts == 'links7'">
      <div class="setOne">
        <my-color v-model="infor.w_icon_color" title="图标颜色"></my-color>
        <my-number v-model="infor.w_color_fs" title="图标大小"></my-number>
      </div>
      <div class="setOne">
        <my-number v-model="infor.w_icon_filltop" title="上填充"></my-number>
        <my-number v-model="infor.w_icon_fillleft" title="左填充"></my-number>
      </div>
    </div>

    <!-- 图标选择 icon_select -->
    <div class="btn_setting" v-if="$store.state.parts == 'icon_select'">
      <!-- this.infor.cityLists[this.infor.clickName].iconCLass  -->
      <div class="setOne">
        <ul style="width:100%;">
          <li v-for="(item,index) in infor.cityLists" :key="index">
            <my-icon v-model="infor.cityLists[index].iconCLass" :title="item.title"></my-icon>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
import style from './style'

export default {
  name: 'basic_links_edit',
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
        this.templet.module_add_historical('编辑链接组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑链接组件');
      },
      deep: true
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style >
</style>
