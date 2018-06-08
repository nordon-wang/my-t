<template>
  <div class="gobackEdit">
    <!--初始显示-->
    <div class="init_edit" v-if="$store.state.parts == ''">
      <span @click="templet.p_select_parts('goback_set1')" 
        class="mouseClass edit_second_level" data-Highlight="goback_set1" :class="[
           $store.state.hover_parts == 'goback_set1'  ? 'index_Highlight' : ''
           ]">按钮设置</span>
      <span @click="templet.p_select_parts('goback_set2')" 
        class="mouseClass edit_second_level" data-Highlight="goback_set2" :class="[
           $store.state.hover_parts == 'goback_set2'  ? 'index_Highlight' : ''
           ]" ref="firstEdit">图标设置</span>
    </div>

    <!-- 按钮设置 -->
    <div class="Routine_setting btm_4cols" v-if="$store.state.parts == 'goback_set1'">
      <my-computed :btype="'all'" :checktype="'contain_control'">
        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.goback_a_padding_left" :min="0" :max="1000" title="左内间距"></my-number>
          <my-number v-model="infor.goback_a_padding_right" :min="0" :max="1000" title="右内间距"></my-number>
        </div>
        <!-- 默认的边框设置 -->
        <div class="setOne" slot="allbordersss">
          <my-border type="all" :my_width.sync="infor.goback_a_border_width" :my_color.sync="infor.goback_a_border_color" :my_style.sync="infor.goback_a_border_style" title="默认边框"></my-border>
        </div>
        <!-- 默认的边框设置-悬浮 -->
        <div class="setOne" slot="allbordersss_hover">
          <my-border type="all" :my_width.sync="infor.goback_a_border_width_hover" :my_color.sync="infor.goback_a_border_color_hover" :my_style.sync="infor.goback_a_border_style_hover" title="悬浮边框"></my-border>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.goback_a_width" :min="0" :max="1000" title="按钮宽"></my-number>
          <my-number v-model="infor.goback_a_height" :min="0" :max="1000" title="按钮高"></my-number>
          <my-input v-model="infor.goback_a_txt" title="按钮文本"></my-input>
          <my-number v-model="infor.goback_a_fs" :min="12" :max="100" title="字体大小"></my-number>
        </div>
      </my-computed>

      <div class="setOne">
        <my-select v-model="infor.goback_function_style" title="功能" :option="$store.state.options.gobackFun"></my-select>
        <my-number v-if="infor.goback_function_style === 'top'" v-model="infor.goback_top_distance" :min="0" :max="10000" title="返回位置"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.goback_a_fs_color" title="文字颜色"></my-color>
        <my-color v-model="infor.goback_a_bc_color" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-color v-model="infor.goback_a_fs_color_hover" title="文字悬浮"></my-color>
        <my-color v-model="infor.goback_a_bc_color_hover" title="背景悬浮"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.goback_a_border_radiu" :min="0" :max="1000" title="圆角半径"></my-number>
        <my-select v-model="infor.goback_a_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
      </div>

    </div>

    <!-- 图标设置 -->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'goback_set2'">
      <div class="setOne">
        <my-icon v-model="infor.goback_icon_class"></my-icon>
        <my-number v-model="infor.goback_icon_left" :min="0" :max="1000" title="左间距"></my-number>
        <my-number v-model="infor.goback_icon_top" :min="0" :max="1000" title="上间距"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.goback_icon_fs" :min="12" :max="100" title="大小"></my-number>
        <my-color v-model="infor.goback_icon_fs_color" title="图标颜色"></my-color>
        <my-color v-model="infor.goback_icon_fs_color_hover" title="悬浮颜色"></my-color>
      </div>
    </div>

  </div>
</template>

<script>
import style from './style'

export default {
  name: 'basic_goback_edit',
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
        this.templet.module_add_historical('编辑返回组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑返回组件');
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
