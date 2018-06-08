<template>
  <div class="videoEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('picture1')" data-Highlight="picture1" :class="[
           $store.state.hover_parts == 'picture1'  ? 'index_Highlight' : ''
           ]">图片管理</span>
    </div>

    <!--图片管理-->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'picture1'">
      <div class="setOne">
        <my-number v-model="infor.picture_width" title="图片宽"></my-number>
        <my-number v-model="infor.picture_height" title="图片高"></my-number>
        <!-- <el-button type="primary" size="small" @click='selectPic("imgUrl",infor.imgUrl)'>选择图片</el-button> -->
        <my-img v-model="infor.imgUrl"></my-img>
      </div>

      <div class="setOne">
        <my-number v-model="infor.picture_border_radius" title="圆角半径"></my-number>
        <my-select v-model="infor.linksStyle" title="跳转方式" :option="$store.state.options.linksStyle"></my-select>
      </div>

      <div class="setOne" v-if="infor.linksStyle == 'self'">
        <my-input v-model="infor.linksUrl" title="链接地址" placeholder="http://www.xxx.com"></my-input>
        <my-select v-model="infor.openStyle" title="打开方式" :option="$store.state.options.open"></my-select>
      </div>
    </div>

  </div>
</template>

<script>
import style from './style'
export default {
  name: 'basic_picture_edit',
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
        this.templet.module_add_historical('编辑图片组件');
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑图片组件');
      },
      deep: true
    }
  },
  created() {},
  methods: {
    changeLinksStyle(val) {},
    selectPic(item, urls) {
      var that = this
      let myurls = urls
      this.$store.state.showPicCon = true
      this.$store.state.imgUrls = function(val, bol) {
        // 图片选择 最终是否点击确定按钮
        that.infor[item] = val.src
        // if(bol){
        // }else{
        //   that.infor[item] = myurls;
        // }
      }
    },
    selectTe(val) {
      this.infor.effectNum = val
    }
  },
  components: {},

  mounted() {}
}
</script>
<style >
</style>

