<template>
  <div class="dateEdit">
    <!--初始显示-->
    <div class="init_edit" v-if="$store.state.parts == ''">
        <span 
              @click="templet.p_select_parts('date_set1')"
              class="mouseClass edit_second_level"
              data-Highlight="date_set1"
              :class="[
           $store.state.hover_parts == 'date_set1'  ? 'index_Highlight' : ''
           ]"
        >日期设置</span>
        <span
          @click="templet.p_select_parts('date_set2')"
          class="mouseClass edit_second_level"
          data-Highlight="date_set2"
          :class="[
           $store.state.hover_parts == 'date_set2'  ? 'index_Highlight' : ''
           ]"
        >时间设置</span>
    </div>

    <!--日期设置-->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'date_set1'">
      <div class="setOne">
        <my-select v-model="infor.date_is_show" title="显示" :option="$store.state.options.twoBtn"></my-select>
        <my-color v-model="infor.date_color" title="字体颜色"></my-color>
        <my-number v-model="infor.date_fs" title="字体大小"></my-number>
      </div>

      <div class="setOne">
        <my-input v-model="infor.year" title="年"></my-input>
        <my-input v-model="infor.month" title="月"></my-input>
        <my-input v-model="infor.day" title="日"></my-input>
      </div>
      <div class="setOne">
        <my-number v-model="infor.date_mr" title="右间距"></my-number>
      </div>
    </div>

    <!--时间设置-->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'date_set2'">
      <div class="setOne">
        <my-select v-model="infor.time_is_show" title="显示" :option="$store.state.options.twoBtn"></my-select>
        <my-color v-model="infor.time_color" title="字体颜色"></my-color>
        <my-number v-model="infor.time_fs" title="字体大小"></my-number>
      </div>
      
      <div class="setOne">
        <my-input v-model="infor.hours" title="时"></my-input>
        <my-input v-model="infor.minutes" title="分"></my-input>
        <my-input v-model="infor.seconds" title="秒"></my-input>
      </div>
    </div>

  </div>
</template>

<script>
import style from './style';

export default {
    name:'basic_date_edit',
    props:{
    },
    data(){
        return {
          infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
          listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
          animateObj:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.animateObj)),
        };
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
          this.templet.module_add_historical('编辑日期组件');
        },
        deep: true
      },
      animateObj:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'animateObj',
            val:JSON.parse(JSON.stringify(val))
          });
          this.templet.module_add_historical('编辑日期组件');
        },
        deep: true
      }
    },
    computed:{
      inputStyle(){
        return {
          width: '130px',
          marginTop: '0px',
          textAlign:'center'
        };
      }
    },
    mounted(){
       
    }
}

</script>

<style scoped>

</style>
