<template>
  <div class="gobackEdit">
    <!--初始显示-->
    <div class="init_edit" v-if="$store.state.parts == ''">
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('pages1')" data-Highlight="pages1" :class="[
           $store.state.hover_parts == 'pages1'  ? 'index_Highlight' : ''
           ]">总容器设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('pages2')" data-Highlight="pages2" :class="[
           $store.state.hover_parts == 'pages2'  ? 'index_Highlight' : ''
           ]">页容器设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('pages3')" data-Highlight="pages3" :class="[
           $store.state.hover_parts == 'pages3'  ? 'index_Highlight' : ''
           ]">文本设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('pages4')" data-Highlight="pages4" :class="[
           $store.state.hover_parts == 'pages4'  ? 'index_Highlight' : ''
           ]">链接设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('pages5')" data-Highlight="pages5" :class="[
           $store.state.hover_parts == 'pages5'  ? 'index_Highlight' : ''
           ]">日期设置</span>
    </div>

    <!-- 一级菜单  -->
    <div class="Routine_setting btm_2cols " v-if="$store.state.parts == 'pages1'">
      <div class="setOne">
        <my-number v-model="infor.page_box_li_width" :min="0" :max="2000" title="宽"></my-number>
        <my-number v-model="infor.page_box_li_height" :min="0" :max="1000" title="高"></my-number>
      </div>
    </div>

    <!-- 页容器设置  -->
    <div class="Routine_setting btm_2cols" v-if="$store.state.parts == 'pages2'">
      <div class="setOne">
        <my-number v-model="infor.page_li_width" :min="0" :max="2000" title="宽"></my-number>
        <my-number v-model="infor.page_li_height" :min="0" :max="1000" title="高"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.page_li_bc_color" title="背景颜色"></my-color>
        <my-color v-model="infor.page_li_bc_color_hover" title="背景悬浮"></my-color>
      </div>

      <div class="setOne">
        <my-select v-model="infor.is_unify" title="统一颜色" :option="$store.state.options.customOptionTwo2"></my-select>
        <el-alert :style="{
            width:'600px'
          }" title="文本和链接统一设置,开启之后不能对文本和链接进行单独设置,使用统一设置颜色效果" type="info">
        </el-alert>
      </div>

      <div class="setOne" v-show="infor.is_unify === '0'">
        <my-color v-model="infor.is_unify_color" title="字体颜色"></my-color>
        <my-color v-model="infor.is_unify_bc" title="字体悬浮"></my-color>
      </div>
    </div>

    <!-- 文本设置  -->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'pages3'">

      <!-- <div class="setOne">
        <my-select v-model="infor.page_span_a_hover" title="悬浮颜色" :option="$store.state.options.someColor"></my-select>
        <el-alert :style="{
            width:'400px'
          }" title="文本与链接颜色一致是否一致" type="info">
        </el-alert>
      </div> -->

      <div class="setOne">
        <my-input v-model="infor.page_pre_txt" title="上文本"></my-input>
        <my-input v-model="infor.page_next_txt" title="下文本"></my-input>
        <my-number v-model="infor.page_span_fs" :min="12" :max="2000" title="字体大小"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.page_txt_width" :min="0" :max="2000" title="宽"></my-number>
        <my-number v-model="infor.page_txt_height" :min="0" :max="1000" title="高"></my-number>
        <my-number v-model="infor.page_txt_lineheight" :min="0" :max="1000" title="行高"></my-number>
      </div>

      <div class="setOne" v-show="infor.is_unify === '1'">
        <my-color v-model="infor.page_span_fs_color" title="字体颜色"></my-color>
        <my-color v-model="infor.page_span_fs_color_hover" title="字体悬浮"></my-color>
      </div>

    </div>

    <!-- 链接设置  -->
    <div class="Routine_setting btm_3cols " v-if="$store.state.parts == 'pages4'">

      <!-- <div class="setOne">
        <my-select v-model="infor.page_a_span_hover" title="悬浮颜色" :option="$store.state.options.someColor"></my-select>
        <el-alert :style="{
            width:'400px'
          }" title="文本与链接颜色一致是否一致" type="info">
        </el-alert>
      </div> -->

      <div class="setOne">
        <my-number v-model="infor.page_a_width" :min="0" :max="2000" title="宽"></my-number>
        <my-number v-model="infor.page_a_height" :min="0" :max="1000" title="高"></my-number>
        <my-number v-model="infor.page_a_lineheight" :min="0" :max="1000" title="行高"></my-number>
      </div>

      <div class="setOne">
        <my-select v-model="infor.page_a_width_overfllow" title="超出省略号" :option="$store.state.options.customOptionTwo2"></my-select>
        <my-number v-model="infor.page_a_fs" :min="12" :max="2000" title="字体大小"></my-number>
      </div>

      <div class="setOne" v-show="infor.is_unify === '1'">
        <my-color v-model="infor.page_a_fs_color" title="链接颜色"></my-color>
        <my-color v-model="infor.page_a_fs_color_hover" title="链接悬浮"></my-color>
      </div>

    </div>

    <!-- 日期设置  -->
    <div class="Routine_setting btm_3cols " v-if="$store.state.parts == 'pages5'">

      <div class="setOne">
        <my-number v-model="infor.page_date_width" :min="0" :max="2000" title="宽"></my-number>
        <my-number v-model="infor.page_date_height" :min="0" :max="1000" title="高"></my-number>
        <my-number v-model="infor.page_b_fs" :min="0" :max="1000" title="字体大小"></my-number>
      </div>

      <div class="setOne">
        <my-select v-model="infor.page_b_is_show" title="显示" :option="$store.state.options.twoBtn"></my-select>
        <my-color v-model="infor.page_b_fs_color" title="日期颜色"></my-color>
        <my-color v-model="infor.page_b_fs_color_hover" title="日期悬浮"></my-color>
      </div>
    </div>

  </div>
</template>

<script>
import style from './style'
import Bus from '../../base/bus'

export default {
  name: 'basic_pages_edit',
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
        this.templet.module_add_historical('编辑页码组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑页码组件');
      },
      deep: true
    }
  },
  methods: {
    num2str() {
      /**
       * 将num类型的select 转换为 String类型
       */
      this.infor.is_unify = this.infor.is_unify.toString()
      this.infor.page_span_a_hover = this.infor.page_span_a_hover.toString()
      this.infor.page_a_width_overfllow = this.infor.page_a_width_overfllow.toString()
      this.infor.page_a_span_hover = this.infor.page_a_span_hover.toString()
    }
  },
  created() {
    this.num2str()
  },
  mounted() {
    Bus.$on('pages_resize', (width, height, widthNum, heightNum) => {
      this.infor[width] = widthNum
      this.infor[height] = heightNum
    })

    Bus.$on('pages_dragble', (type, top, left) => {
      if (type == 'pre' || type == 'next') {
        this.infor[type].top = top
        this.infor[type].left = left
      } else {
        this.infor[type].top = top
        this.infor[type].left = left
      }
    })
  }
}
</script>

<style>
</style>