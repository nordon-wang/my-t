<template>
  <div class="dateEdit">
    <!--初始显示-->
    <div class="init_edit" v-if="$store.state.parts == ''">
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('big_glass1')" data-Highlight="big_glass1" :class="[
           $store.state.hover_parts == 'big_glass1'  ? 'index_Highlight' : ''
           ]" v-show="infor.glass_styles == '0'">样式设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('big_glass2')" data-Highlight="big_glass2" :class="[
           $store.state.hover_parts == 'big_glass2'  ? 'index_Highlight' : ''
           ]" v-show="infor.glass_styles == '1'">样式设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('big_glass3_big')" data-Highlight="big_glass3_big" :class="[
           $store.state.hover_parts == 'big_glass3_big'  ? 'index_Highlight' : ''
           ]" v-show="infor.glass_styles == '2'">展示图</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('big_glass3_small')" data-Highlight="big_glass3_small" :class="[
           $store.state.hover_parts == 'big_glass3_small'  ? 'index_Highlight' : ''
           ]" v-show="infor.glass_styles == '2'">缩略图</span>
    </div>

    <!--样式1-->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'big_glass1'">
      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="缩略图和展示图的宽度统一设置" type="info">
        </el-alert>
        <my-number v-model="infor.glass_width" title="宽度"></my-number>
      </div>

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="展示图的高度设置" type="info">
        </el-alert>
        <my-number v-model="infor.glass_view_pic_height" title="展示图高"></my-number>
        <!-- <my-number v-model="infor.glass_small_pic_height" title="缩略图高"></my-number> -->
      </div>
    </div>

    <!--样式2-->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'big_glass2'">

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="缩略图和展示图的高度设置" type="info">
        </el-alert>
        <my-number v-model="infor.glass_width" title="预览图宽"></my-number>
        <my-number v-model="infor.glass_view_pic_height" title="预览图高"></my-number>
      </div>
    </div>

    <!--展示图-->
    <div class="btn_setting btm_4cols" v-if="$store.state.parts == 'big_glass3_big'">

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="包含缩略图和展示图的总容器设置" type="info">
        </el-alert>
        <my-number v-model="infor.style3_small_dakuang_width" title="总容器宽"></my-number>
        <my-number v-model="infor.style3_small_dakuang_height" title="总容器高"></my-number>
      </div>

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="展示图所在容器的宽和高设置" type="info">
        </el-alert>
        <my-number v-model="infor.style3_big_kuang_width" title="框宽"></my-number>
        <my-number v-model="infor.style3_big_kuang_height" title="框高"></my-number>
      </div>

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="展示图片宽和高设置" type="info">
        </el-alert>
        <my-number v-model="infor.style3_big_pic_width" title="展示图宽"></my-number>
        <my-number v-model="infor.style3_big_pic_height" title="展示图高"></my-number>
      </div>

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="展示图容器的位置设置" type="info">
        </el-alert>
        <my-number v-model="infor.style3_big_pos_top" title="定位上间距"></my-number>
        <my-number v-model="infor.style3_big_pos_left" title="定位左间距"></my-number>
      </div>

    </div>

    <!--缩略图-->
    <div class="btn_setting " v-if="$store.state.parts == 'big_glass3_small'">

      <my-computed :btype="'all'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.style3_small_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.style3_small_margin_right" :min="0" :max="1000" title="右外间距"></my-number>
          <my-number v-model="infor.style3_small_margin_bottom" :min="0" :max="1000" title="下外间距"></my-number>
          <my-number v-model="infor.style3_small_margin_left" :min="0" :max="1000" title="左外间距"></my-number>
        </div>

        <!-- 四边统一设置 -->
        <div class="setOne" slot="allbordersss" style="height:auto;">
          <el-alert :style="{
              width:`90%`,
              marginBottom: '4px',
            minWidth:'300px'
            }" title="默认状态的图片边框设置" type="info">
          </el-alert>
          <my-border type="all" 
            :my_width.sync="infor.glass_default_border_width" 
            :my_color.sync="infor.glass_default_border_color" 
            :my_style.sync="infor.glass_default_border_style" title="默认边框"></my-border>

          <el-alert :style="{
              width:`90%`,
              marginBottom: '4px',
            minWidth:'300px'
            }" title="选中状态的图片边框设置" type="info">
          </el-alert>
          <my-border type="all" 
            :my_width.sync="infor.glass_select_border_width" 
            :my_color.sync="infor.glass_select_border_color" 
            :my_style.sync="infor.glass_select_border_style" title="选择边框"></my-border>
        </div>

        <!-- 四边统一设置 -->
        <div class="setOne" slot="allbordersss_hover">
          <my-border type="all" 
            :my_width.sync="infor.glass_hover_border_width" 
            :my_color.sync="infor.glass_hover_border_color" 
            :my_style.sync="infor.glass_hover_border_style" title="悬浮边框"></my-border>
        </div>

        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.style3_small_pic_width" title="图宽"></my-number>
          <my-number v-model="infor.style3_small_pic_height" title="图高"></my-number>
        </div>
      </my-computed>
      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="鼠标悬浮或点击缩略图时,触发展示图切换" type="info">
        </el-alert>
        <my-select v-model="infor.big_pic_emit_style" title="触发方式" :option="$store.state.options.glassMethod"></my-select>
      </div>

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="缩略图所在容器的宽和高设置" type="info">
        </el-alert>
        <my-number v-model="infor.style3_small_kuang_width" title="框宽"></my-number>
        <my-number v-model="infor.style3_small_kuang_height" title="框高"></my-number>
      </div>

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="缩略图所在容器的位置设置" type="info">
        </el-alert>
        <my-number v-model="infor.style3_small_pos_top" title="定位上间距"></my-number>
        <my-number v-model="infor.style3_small_pos_right" title="定位右间距"></my-number>
      </div>
    </div>
  </div>
</template>

<script>
import style from './style'

export default {
  name: 'basic_magnifyingglass_edit',
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
        this.templet.module_add_historical('编辑放大镜组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑放大镜组件');
      },
      deep: true
    }
  },
  mounted() {}
}
</script>

<style scoped>
</style>
