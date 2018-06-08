<template>
  <div class="locationEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('location1')"
         data-Highlight="location1" :class="[
           $store.state.hover_parts == 'location1'  ? 'index_Highlight' : ''
           ]">内容设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('location2')"
         data-Highlight="location2" :class="[
           $store.state.hover_parts == 'location2'  ? 'index_Highlight' : ''
           ]">图标设置</span>
    </div>

    <!-- 功能设置 -->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'location1'">
      <div class="setOne">
        <my-select v-model="infor.location_data_source" title="数据" :option="$store.state.options.locationFun"></my-select>
        <my-input v-if="infor.location_data_source === 'self'" v-model="infor.location_self_data" placeholder="自定义当前标题内容" title="自定义"></my-input>
        <my-input v-model="infor.location_title" placeholder="您当前所在的位置" title="标题"></my-input>
      </div>

      <div class="setOne">
        <my-color v-model="infor.font_color" title="字体:开始"></my-color>
        <my-color v-model="infor.last_font_color" title="字体:结束"></my-color>
        <my-color v-model="infor.hover_font_color" title="字体:悬浮"></my-color>
      </div>

      <div class="setOne">
        <my-select v-model="infor.location_text_align_all" title="水平位置" :option="$store.state.options.textAlign"></my-select>
        <my-number v-model="infor.font_sizes" :min="12" :max="100" title="字体大小"></my-number>
        <my-number v-model="infor.line_height" :min="12" :max="1000" title="行高"></my-number>
      </div>

    </div>

    <!-- 图标设置 -->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'location2'">
      <div class="setOne">
        <my-icon v-model="infor.icon_class"></my-icon>
        <my-number v-model="infor.icon_sizes" :min="12" :max="100" title="图标大小"></my-number>
        <my-color v-model="infor.location_icon_color" title="图标颜色"></my-color>
      </div>
      <div class="setOne">
        <my-number v-model="infor.location_icon_left" :min="0" :max="1000" title="左间距"></my-number>
        <my-number v-model="infor.location_icon_top" :min="0" :max="1000" title="右间距"></my-number>
      </div>
      <div class="setOne">
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
        this.templet.module_add_historical('编辑当前位置组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑当前位置组件');
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
