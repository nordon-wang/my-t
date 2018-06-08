<template>
  <div class="languageEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
      <span class="mouseClass " @click="templet.p_select_parts('language1')" data-Highlight="language1" :class="[
           $store.state.hover_parts == 'language1'  ? 'index_Highlight' : ''
           ]" v-show="infor.w_languageStyle == 1">基础设置</span>
      <span class="mouseClass " @click="templet.p_select_parts('language2')" data-Highlight="language2" :class="[
           $store.state.hover_parts == 'language2'  ? 'index_Highlight' : ''
           ]" v-show="infor.w_languageStyle == 1">链接设置</span>
      <!-- <span class="mouseClass " @click="templet.p_select_parts('language3')" data-Highlight="language3" :class="[
           $store.state.hover_parts == 'language3'  ? 'index_Highlight' : ''
           ]" v-show="infor.w_languageStyle == 1">边框设置</span> -->
      <span class="mouseClass " @click="templet.p_select_parts('language4')" data-Highlight="language4" :class="[
           $store.state.hover_parts == 'language4'  ? 'index_Highlight' : ''
           ]" v-show="infor.w_languageStyle == 1">图片设置</span>
      <span class="mouseClass " @click="templet.p_select_parts('language5')" data-Highlight="language5" :class="[
           $store.state.hover_parts == 'language5'  ? 'index_Highlight' : ''
           ]" v-show="infor.w_languageStyle == 2">基础设置</span>
    </div>

    <!-- 基础设置 样式2 -->
    <div class="Routine_setting btm_4cols" v-if="$store.state.parts == 'language5'">

      <div class="setOne">
        <my-number v-model="infor.w_languageWidth" :min="0" :max="1000" title="宽"></my-number>
        <my-number v-model="infor.w_languageHeight" :min="0" :max="1000" title="高"></my-number>
        <my-number v-model="infor.w_minbeds" :min="10" :max="100" title="字体大小"></my-number>
        <my-number v-model="infor.w_style2_border_radius" :min="0" :max="100" title="圆角半径"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.w_fontColor" title="字体颜色"></my-color>
        <my-color v-model="infor.w_inputColor" title="背景颜色"></my-color>
        <my-number v-model="infor.w_style2_padding_left" :min="0" :max="200" title="左内间距"></my-number>
      </div>

      <div class="language_btn">
        <strong style="padding-left: 12px;display: inline-block;width: 80px;height: 34px;line-height: 34px;">语言设置</strong>
        <p v-for="(items,index) in listArr.img_items" :key="index">
          <el-button type="success" size="small" @click="openModal(index)">{{items.lang}}</el-button>
        </p>
      </div>

      <div class="setOne" v-for="(items,index) in listArr.img_items" :key="index">
        <div v-if="index == languagaOpenID" style="margin-bottom:6px;">
          <my-input v-model="listArr.txt_arr[index]" :title="items.lang"></my-input>
        </div>
      </div>

    </div>

    <!-- 基础设置 样式1 -->
    <div class="Routine_setting self-tabs_setting" v-if="$store.state.parts == 'language1'">

      <my-computed :btype="'all'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.w_style1_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.w_style1_margin_right" :min="0" :max="1000" title="右外间距"></my-number>
          <my-number v-model="infor.w_style1_margin_bottom" :min="0" :max="1000" title="下外间距"></my-number>
          <my-number v-model="infor.w_style1_margin_left" :min="0" :max="1000" title="左外间距"></my-number>
        </div>
        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.w_style1_padding_top" :min="0" :max="1000" title="上内间距"></my-number>
          <my-number v-model="infor.w_style1_padding_right" :min="0" :max="1000" title="右内间距"></my-number>
          <my-number v-model="infor.w_style1_padding_bottom" :min="0" :max="1000" title="下内间距"></my-number>
          <my-number v-model="infor.w_style1_padding_left" :min="0" :max="1000" title="左内间距"></my-number>
        </div>
        <div class="setOne" slot="allbordersss">
          <my-border type="all" :my_width.sync="infor.language_a_border_all_width" :my_color.sync="infor.language_a_border_all_color" :my_style.sync="infor.language_a_border_all_styles" title="默认边框"></my-border>
        </div>
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.w_style1_languageWidth" :min="0" :max="1000" title="宽"></my-number>
          <my-number v-model="infor.w_style1_languageHeight" :min="0" :max="1000" title="高"></my-number>
          <my-color v-model="infor.w_inputColor" title="背景颜色"></my-color>
          <my-color v-model="infor.w_a_hover_bc_color" title="悬浮背景"></my-color>
        </div>
      </my-computed>

        <!-- <my-number v-model="infor.w_languageWidth" :min="0" :max="1000" title="总宽"></my-number> -->
      <!-- <div class="setOne">
      </div> -->

      <div class="setOne">
        <my-select v-model="infor.w_style1_float" title="排序方向" :option="$store.state.options.myDirective"></my-select>
        <my-select v-model="infor.w_style1_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
      </div>

      <div class="setOne">
        <my-number v-model="infor.w_style1_border_radius" :min="0" :max="1000" title="圆角半径"></my-number>
      </div>

    </div>

    <!-- 链接设置 btm_3cols -->
    <div class="Routine_setting btm_con_4cols" v-if="$store.state.parts == 'language2'">
      <el-tabs type="border-card">
        <el-tab-pane label="链接设置">
          <div class="setOne">
            <my-number v-model="infor.w_style1_a_width" :min="0" :max="1000" title="链接宽"></my-number>
            <my-number v-model="infor.w_style1_a_height" :min="0" :max="1000" title="链接高"></my-number>
            <my-number v-model="infor.w_minbeds" :min="0" :max="1000" title="字体大小"></my-number>
          </div>

          <div class="setOne">
            <my-select v-model="infor.w_language_txt_show" title="文字" :option="$store.state.options.twoBtn"></my-select>
            <my-color v-model="infor.w_fontColor" title="字体颜色"></my-color>
            <my-color v-model="infor.w_a_hover_font_color" title="悬浮字体"></my-color>
          </div>
        </el-tab-pane>
        <el-tab-pane label="边框设置">
          <div class="setOne">
            <el-alert :style="{
                  width:'25%',
                  float:'left',
                  marginRight:'12px'
                }" title="第一个链接左右边框设置" type="info">
            </el-alert>
            <my-border type="left" :my_width.sync="infor.language_a_border_first_left_width" :my_color.sync="infor.language_a_border_first_left_color" :my_style.sync="infor.language_a_border_first_left_styles" title="首链接左"></my-border>
            <my-border type="right" :my_width.sync="infor.language_a_border_first_right_width" :my_color.sync="infor.language_a_border_first_right_color" :my_style.sync="infor.language_a_border_first_right_styles" title="首链接右"></my-border>
          </div>

          <div class="setOne">
            <el-alert :style="{
                  width:'25%',
                  float:'left',
                  marginRight:'12px'
                }" title="最后一个链接左右边框设置" type="info">
            </el-alert>
            <my-border type="left" :my_width.sync="infor.language_a_border_last_left_width" :my_color.sync="infor.language_a_border_last_left_color" :my_style.sync="infor.language_a_border_last_left_styles" title="尾链接左"></my-border>
            <my-border type="right" :my_width.sync="infor.language_a_border_last_right_width" :my_color.sync="infor.language_a_border_last_right_color" :my_style.sync="infor.language_a_border_last_right_styles" title="尾链接右"></my-border>
          </div>

          <div class="setOne">
            <el-alert :style="{
                  width:'25%',
                  float:'left',
                  marginRight:'12px'
                }" title="除去第一个和最后一个链接的左右边框设置" type="info">
            </el-alert>
            <my-border type="left" :my_width.sync="infor.language_a_border_other_left_width" :my_color.sync="infor.language_a_border_other_left_color" :my_style.sync="infor.language_a_border_other_left_styles" title="剩余左"></my-border>
            <my-border type="right" :my_width.sync="infor.language_a_border_other_right_width" :my_color.sync="infor.language_a_border_other_right_color" :my_style.sync="infor.language_a_border_other_right_styles" title="剩余右"></my-border>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>


    <!-- 图片设置 twoBtn -->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'language4'">

      <div class="setOne">
        <my-select v-model="infor.w_language_img_show" title="图片" :option="$store.state.options.twoBtn"></my-select>
        <my-number v-model="infor.w_language_img_width" :min="0" :max="1000" title="宽"></my-number>
        <my-number v-model="infor.w_language_img_height" :min="0" :max="1000" title="高"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.w_language_img_left" :min="0" :max="1000" title="左间距"></my-number>
        <my-number v-model="infor.w_language_img_top" :min="0" :max="1000" title="上间距"></my-number>
        <my-number v-model="infor.w_language_img_border_radius" :min="0" :max="1000" title="圆角半径"></my-number>
      </div>

      <div class="language_btn">
        <strong style="padding-left: 12px;display: inline-block;width: 80px;height: 34px;line-height: 34px;">语言设置</strong>
        <p v-for="(items,index) in listArr.img_items" :key="index">
          <el-button type="success" size="small" @click="openModal(index)">{{items.lang}}</el-button>
        </p>
      </div>

      <div class="setOne" v-for="(items,index) in listArr.img_items" :key="index">
        <div v-if="index == languagaOpenID" style="margin-bottom:6px;">
          <my-input v-model="listArr.txt_arr[index]" :title="items.lang"></my-input>
          <my-img v-model="infor.img_obj[index]"></my-img>
        </div>
      </div>
    </div>

    <!-- 图片、文字管理 -->
    <div class="Routine_setting" v-if="$store.state.parts == 'pic_manage'">
      <div class="setOne">
        <div v-for="(items,index) in listArr.img_items" :key="index" class="" style="margin-bottom:6px;">
          <my-input v-model="listArr.txt_arr[index]" :title="items.lang"></my-input>
          <my-img v-model="infor.img_obj[index]"></my-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import style from './style'

export default {
  name: 'basic_language_edit',
  props: {},
  data() {
    return {
      languagaOpenID: 0,
      infor: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.infor)
      ),
      listArr: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.listArr)
      ),
      animateObj: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.animateObj)
      ),
        isFirst:false
    }
  },
  methods: {
    openModal(index) {
      this.languagaOpenID = index
    },
    txtArr: function(arr) {
      var _this = this
      if (!this.listArr.txt_arr.length) {
        this.listArr.txt_arr.length = 0
        $.each(arr, function(index, item) {
          _this.listArr.txt_arr.push(item.lang)
        })
      }

      _this.listArr.txt_arr_str = _this.listArr.txt_arr.join(',')
      // this.$set(this,'listArr.txt_arr_str',this.listArr.txt_arr.join(','));
      // debugger;
    }
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'infor',
          val: JSON.parse(JSON.stringify(val))
        });
        if(this.isFirst){
            this.templet.module_add_historical('编辑多语言组件');
        }

      },
      deep: true
    },
    listArr: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'listArr',
          val: JSON.parse(JSON.stringify(val))
        });
          if(this.isFirst){
              this.templet.module_add_historical('编辑多语言组件');
          }

      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
      },
      deep: true
    }
  },
  created() {},
  mounted() {
    // order flex-grow flex-shrink flex-basis flex
    // console.log($(this.$refs.sss));
    let _this = this
    $.ajax({
      url: `${this.$store.state.domain}/index_pc.php/newapi/language/getinfo`,
      type: 'get',
      dataType: 'json',
      success(data) {
        _this.listArr.img_items = data.data
        // _this.$set(this,'listArr.img_items',data.data);
        _this.txtArr(_this.listArr.img_items);
          _this.$nextTick(()=>{
              _this.isFirst = true; 
          });

      },
      error(){
          _this.$nextTick(()=>{
              _this.isFirst = true;
          });
      }
    })
    // console.log('getgetgetget', this.infor.img_obj)
  }
}
</script>

<style>
div.setOne:empty {
  display: none;
}
div.language_btn {
  margin-top: 6px;
}
div.language_btn p {
  display: inline-block;
  margin-right: 12px;
}
</style>
