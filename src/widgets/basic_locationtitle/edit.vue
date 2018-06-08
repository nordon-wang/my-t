<template>
  <div class="locationtitleEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('locationtitle1')" data-Highlight="locationtitle1" :class="[
           $store.state.hover_parts == 'locationtitle1'  ? 'index_Highlight' : ''
           ]">内容设置</span>
    </div>

    <!-- 功能设置 -->
    <div class="Routine_setting btm_4cols " v-if="$store.state.parts == 'locationtitle1'">
      <my-computed :btype="'all'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.location_title_margin_top" title="上外间距"></my-number>
        </div>
        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.location_title_padding_top" title="上内间距"></my-number>
          <my-number v-model="infor.location_title_padding_bottom" title="下内间距"></my-number>
        </div>
        <!-- 默认的边框设置 -->
        <div class="setOne" slot="allbordersss">
          <my-border type="all" :my_width.sync="infor.location_title_border_width" :my_color.sync="infor.location_title_border_color" :my_style.sync="infor.location_title_border_style"></my-border>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-select v-model="infor.location_title_data_source" title="数据" :option="$store.state.options.locationFun"></my-select>
          <my-input v-if="infor.location_title_data_source === 'self'" v-model="infor.location_title_self_data" placeholder="自定义当前标题内容" title="自定义"></my-input>
          <my-number v-model="infor.location_title_fs" :min="12" :max="100" title="字体大小"></my-number>
          <my-select v-model="infor.location_title_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
        </div>
      </my-computed>

      <div class="setOne">
        <my-color v-model="infor.location_title_fs_color" title="文字颜色"></my-color>
      </div>

      <div class="setOne">
        <my-color v-model="infor.location_title_bc_color" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.location_title_border_radius" :min="0" :max="1000" title="圆角半径"></my-number>
      </div>
    </div>

  </div>
</template>

<script>
import style from './style'

export default {
  name: 'basic_locationtitle_edit',
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
        this.templet.module_add_historical('编辑当前标题组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑当前标题组件');
      },
      deep: true
    }
  },
  created(){
    if(!this.infor.location_title_self_data){
      this.infor.location_title_self_data = '';
    }
  }
}
</script>

<style>
</style>
