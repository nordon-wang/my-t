<template>
  <div class="dateEdit">
    <!--初始显示-->
    <div class="init_edit" v-if="$store.state.parts == ''">
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobdetail1')" data-Highlight="jobdetail1" :class="[
           $store.state.hover_parts == 'jobdetail1'  ? 'index_Highlight' : ''
           ]">表头设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobdetail2')" data-Highlight="jobdetail2" :class="[
           $store.state.hover_parts == 'jobdetail2'  ? 'index_Highlight' : ''
           ]">标题设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobdetail3')" data-Highlight="jobdetail3" :class="[
           $store.state.hover_parts == 'jobdetail3'  ? 'index_Highlight' : ''
           ]">简历按钮</span>
    </div>

    <!--表头设置-->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'jobdetail1'">
      <div class="setOne">
        <my-select v-model="infor.job3_con_value1" title="表头内容" :option="$store.state.options.jobsOptions"></my-select>
        <my-select v-model="infor.job_detail_is_show_title" title="是否显示" :option="$store.state.options.display"></my-select>
        <my-number v-model="infor.job_detail_title_fs" :min="12" :max="100" title="字体大小"></my-number>
      </div>
    </div>

    <!--标题设置-->
    <div class="btn_setting btm_2cols" v-if="$store.state.parts == 'jobdetail2'">
      <div class="setOne">
        <my-number v-model="infor.job_detail_title_width" :min="12" :max="2000" title="标题宽"></my-number>
        <my-number v-model="infor.job_detail_con_fs" title="字体大小" :min="12" :max="100"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.job_detail_title_fs_color" title="标题颜色"></my-color>
        <my-color v-model="infor.job_detail_con_fs_color" title="内容颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.job_detail_height" title="列高" :min="12" :max="1000"></my-number>
      </div>
    </div>

    <!--简历按钮-->
    <div class="btn_setting btm_4cols" v-if="$store.state.parts == 'jobdetail3'">
      <div class="setOne">
        <my-input v-model="infor.job_detail_a_con" title="链接文本"></my-input>
        <my-number v-model="infor.job_detail_a_width" title="链接宽" :min="12" :max="1000"></my-number>
        <my-number v-model="infor.job_detail_a_height" title="链接高" :min="12" :max="1000"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.job_detail_a_bc_color" title="链接背景"></my-color>
        <my-color v-model="infor.job_detail_a_fs_color" title="链接文字"></my-color>
        <my-color v-model="infor.job_detail_a_bc_color_hover" title="背景悬浮"></my-color>
        <my-color v-model="infor.job_detail_a_fs_color_hover" title="文字悬浮"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.job_detail_a_fs" title="字体大小" :min="12" :max="1000"></my-number>
        <my-number v-model="infor.job_detail_a_border_radius" title="链接圆角" :min="0" :max="1000"></my-number>
        <my-number v-model="infor.job_detail_a_margin_top" title="上间距" :min="0" :max="1000"></my-number>
        <my-number v-model="infor.job_detail_a_margin_left" title="右间距" :min="0" :max="1000"></my-number>
      </div>
    </div>

  </div>
</template>

<script>
import style from './style'

export default {
  name: 'basic_jobdetail_edit',
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
        this.templet.module_add_historical('编辑招聘详情组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑招聘详情组件');
      },
      deep: true
    }
  },
  mounted() {}
}
</script>

<style scoped>
</style>
