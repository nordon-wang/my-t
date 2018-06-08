<template>
  <div class="dateEdit">
    <!--初始显示-->
    <div class="init_edit" v-if="$store.state.parts == ''">
        <span @click="templet.p_select_parts('helps1')"
         class="mouseClass edit_second_level"
              data-Highlight="helps1"
              :class="[
           $store.state.hover_parts == 'helps1'  ? 'index_Highlight' : ''
           ]">基础设置</span>
        <span
           @click="templet.p_select_parts('help2')"
          class="mouseClass edit_second_level"
              data-Highlight="help2"
              :class="[
           $store.state.hover_parts == 'help2'  ? 'index_Highlight' : ''
           ]"
        >图标设置</span>
        <span @click="templet.p_select_parts('help3')"
          class="mouseClass edit_second_level"
              data-Highlight="help3"
              :class="[
           $store.state.hover_parts == 'help3'  ? 'index_Highlight' : ''
           ]"
        >默认分页</span>
        <!-- <span @click="templet.p_select_parts('help4')"
          class="mouseClass edit_second_level"
              data-Highlight="help4"
              :class="[
           $store.state.hover_parts == 'help4'  ? 'index_Highlight' : ''
           ]"
        >分页状态</span> -->
        <span @click="templet.p_select_parts('help5')"
          class="mouseClass edit_second_level"
              data-Highlight="help5"
              :class="[
           $store.state.hover_parts == 'help5'  ? 'index_Highlight' : ''
           ]"
        >问题</span>
        <span @click="templet.p_select_parts('help6')"
          class="mouseClass edit_second_level"
              data-Highlight="help6"
              :class="[
           $store.state.hover_parts == 'help6'  ? 'index_Highlight' : ''
           ]"
        >问题标题</span>
        <span @click="templet.p_select_parts('help7')"
          class="mouseClass edit_second_level"
              data-Highlight="help7"
              :class="[
           $store.state.hover_parts == 'help7'  ? 'index_Highlight' : ''
           ]"
        >问题图片</span>
        <span @click="templet.p_select_parts('help11')"
          class="mouseClass edit_second_level"
              data-Highlight="help11"
              :class="[
           $store.state.hover_parts == 'help11'  ? 'index_Highlight' : ''
           ]"
        >日期设置</span>
        <span @click="templet.p_select_parts('help8')"
          class="mouseClass edit_second_level"
              data-Highlight="help8"
              :class="[
           $store.state.hover_parts == 'help8'  ? 'index_Highlight' : ''
           ]"
        >回答</span>
        <span @click="templet.p_select_parts('help9')"
          class="mouseClass edit_second_level"
              data-Highlight="help9"
              :class="[
           $store.state.hover_parts == 'help9'  ? 'index_Highlight' : ''
           ]"
        >回答标题</span>
        <span @click="templet.p_select_parts('help10')"
          class="mouseClass edit_second_level"
              data-Highlight="help10"
              :class="[
           $store.state.hover_parts == 'help10'  ? 'index_Highlight' : ''
           ]"
        >回答图片</span>
    </div>


    <!--基础设置-->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'helps1'">
      <div class="setOne">
        <my-select v-model="infor.job_slidedown_style" title="展开" :option="$store.state.options.helpsStyle"></my-select>
        <my-number v-model="infor.job_pos_border_radius" title="圆角"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.num" :min="1" :max="infor.max_num" title="总数"></my-number>
        <my-number v-model="infor.page_num" :min="1" :max="infor.num" title="每页条数"></my-number>
      </div>

      <div class="setOne">
        <my-select v-model="infor.job_pos_animate_type" title="动画类型" :option="$store.state.options.helpsAni"></my-select>
        <my-number v-model="infor.job_pos_animate_time" title="动画时间"></my-number>
      </div>
    </div>

    <!--图标设置-->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'help2'">
      <div class="setOne">
        <my-select v-model="infor.job_icon_is_show" title="图标显示" :option="$store.state.options.twoBtn"></my-select>
        <my-number v-model="infor.job_icon_fs" :max="100" :min="12" title="图标大小"></my-number>
        <my-color v-model="infor.job_icon_color" title="图标颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.help_question_icon_margin_right" :max="1000" :min="0" title="图标右间距"></my-number>
        <my-number v-model="infor.help_question_icon_margin_top" :max="1000" :min="0" title="图标上间距"></my-number>
      </div>
      
      <div class="setOne">
        <el-alert
          :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }"
          title="帮助的标题栏默认图标--选择"
          type="info">
        </el-alert>
        <my-icon v-model="infor.defaulticon"></my-icon>
      </div>
      
      <div class="setOne">
        <el-alert
          :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }"
          title="帮助的标题栏点击时图标--选择"
          type="info">
        </el-alert>
        <my-icon v-model="infor.clickicon"></my-icon>
      </div>
    </div>
    
    <!--默认分页 btm_4cols-->
    <div class="btn_setting self-tabs_setting btm_con_4cols" v-if="$store.state.parts == 'help3'">
      <el-tabs type="border-card">
        <el-tab-pane label="公共设置">
          <div class="setOne">
            <my-select v-model="infor.fenye_is_show" title="分页" :option="$store.state.options.twoBtns"></my-select>
            <my-select v-model="infor.jobs_total_pagenum_show" title="显示总条数" :option="$store.state.options.isOpen"></my-select>
            <!-- <my-select v-model="infor.jobs_jump_pagenum_show" title="页数跳转" :option="$store.state.options.isOpen"></my-select> -->
           
          </div>

          <div class="setOne">
            <my-color v-model="infor.job_fenye_font_color" title="文字颜色"></my-color>
            <my-number v-model="infor.job_page_margin_left" :max="1000" :min="0" title="左间距"></my-number>
            <my-number v-model="infor.job_fenye_font_size" :max="100" :min="12" title="文字大小"></my-number>
          </div>

          <div class="setOne">
            <my-number v-model="infor.job_page_width" :max="1000" :min="12" title="分页总宽"></my-number>
            <my-number v-model="infor.job_fenye_btn_width" :max="1000" :min="12" title="按钮宽"></my-number>
            <my-number v-model="infor.job_fenye_btn_height" :max="1000" :min="12" title="按钮高"></my-number>
          </div>
          
        </el-tab-pane>
        <el-tab-pane label="默认分页">
          <div class="setOne">
            <el-alert
              :style="{
                width:`50%`,
                float:'left',
                minWidth:'300px'
              }"
              title="分页默认状态的颜色设置"
              type="info">
            </el-alert>
          </div>
          <div class="setOne">
            <my-color v-model="infor.job_fenye_default_bc_color" title="按钮背景"></my-color>
            <my-color v-model="infor.job_fenye_default_font_color" title="按钮数字"></my-color>
            <my-border
              type="all"
              :my_width.sync="infor.job_fenye_btn_border_width"
              :my_color.sync="infor.job_fenye_btn_border_color"
              :my_style.sync="infor.job_fenye_btn_border_style"
              title="默认边框"
            ></my-border>
          </div>
          
        </el-tab-pane>
        <el-tab-pane label="悬浮分页">
          <div class="setOne">
            <el-alert
              :style="{
                width:`50%`,
                float:'left',
                minWidth:'300px'
              }"
              title="分页悬浮时的颜色设置"
              type="info">
            </el-alert>
          </div>

          <div class="setOne">
            <my-color v-model="infor.job_fenye_hover_bc_color" title="背景颜色"></my-color>
            <my-color v-model="infor.job_fenye_hover_font_color" title="文字颜色"></my-color>
            <my-color v-model="infor.job_fenye_btn_hover_border_color" title="边框颜色"></my-color>
          </div>
        </el-tab-pane>
        <el-tab-pane label="选中分页">
          <div class="setOne">
            <el-alert
              :style="{
                width:`50%`,
                float:'left',
                minWidth:'300px'
              }"
              title="分页选中时的颜色设置"
              type="info">
            </el-alert>
          </div>

          <div class="setOne">
            <my-color v-model="infor.job_fenye_click_bc_color" title="背景颜色"></my-color>
            <my-color v-model="infor.job_fenye_click_font_color" title="文字颜色"></my-color>
            <my-color v-model="infor.job_fenye_btn_click_border_color" title="边框颜色"></my-color>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!--分页状态-->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'help4'">
      
    </div>

    <!-- 问题  -->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'help5'">
      
      <div class="setOne">
        <my-number v-model="infor.help_question_p_height" :max="1000" :min="12" title="高"></my-number>
        <my-number v-model="infor.help_question_p_fs" :max="100" :min="12" title="字体大小"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.help_question_p_bc_color" title="背景颜色"></my-color>
        <my-color v-model="infor.help_question_p_fs_color" title="文字颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.help_question_a_margin_left" :max="1000" :min="0" title="问题左间距"></my-number>
      </div>
    </div>

    <!-- 问题标题  -->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'help6'">
      <div class="setOne">
        <my-select v-model="infor.help_question_is_title" title="问题标题" :option="$store.state.options.display"></my-select>
        <my-select v-model="infor.help_question_title_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
        <my-input v-model="infor.help_question_title_txt" title="按钮文本"></my-input>
      </div>
      
      <div class="setOne">
        <my-number v-model="infor.help_question_title_width" :max="1000" :min="12" title="宽"></my-number>
        <my-number v-model="infor.help_question_title_fs" :max="100" :min="12" title="字体大小"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.help_question_title_bc_color" title="背景颜色"></my-color>
        <my-color v-model="infor.help_question_title_fs_color" title="文字颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.question_title_left" :max="1000" :min="0" title="标题左间距"></my-number>
        <my-number v-model="infor.question_title_right" :max="1000" :min="0" title="标题右间距"></my-number>
      </div>
    </div>

    <!-- 问题图片  -->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'help7'">
      <div class="setOne">
        <my-select v-model="infor.help_question_img_show" title="图片" :option="$store.state.options.display"></my-select>
        <my-number v-model="infor.question_img_border_radius" :max="1000" :min="0" title="圆角半径"></my-number>
        <!-- <el-button type="primary" size="small" @click='selectPic("imgUrl",infor.imgUrl)'>选择图片</el-button> -->
        <my-img v-model="infor.imgUrl"></my-img>
      </div>
      
      <div class="setOne">
        <my-number v-model="infor.question_img_width" :max="1000" :min="12" title="图片宽"></my-number>
        <my-number v-model="infor.question_img_height" :max="1000" :min="12" title="图片高"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.question_img_top" :max="1000" :min="0" title="图片上间距"></my-number>
        <my-number v-model="infor.question_img_left" :max="1000" :min="0" title="图片左间距"></my-number>
        <my-number v-model="infor.question_img_right" :max="1000" :min="0" title="图片右间距"></my-number>
      </div>

    </div>

    <!-- 回答  -->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'help8'">
      <div class="setOne">
        <my-number v-model="infor.help_answer_text_indent" :max="20" :min="0" title="首行缩进"></my-number>
        <my-number v-model="infor.help_answer_padding_left" :max="1000" :min="0" title="左内间距"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.help_answer_div_line_height" :max="1000" :min="12" title="行高"></my-number>
        <my-number v-model="infor.help_answer_div_fs" :max="100" :min="12" title="字体大小"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.help_answer_div_bc_color" title="背景颜色"></my-color>
        <my-color v-model="infor.help_answer_div_fs_color" title="文字颜色"></my-color>
      </div>
    </div>

    <!-- 回答标题  -->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'help9'">
      <div class="setOne">
        <my-select v-model="infor.help_answer_is_title" title="问题标题" :option="$store.state.options.display"></my-select>
        <my-select v-model="infor.help_answer_title_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
        <my-input v-model="infor.help_answer_title_txt" title="按钮文本"></my-input>
      </div>
      
      <div class="setOne">
        <my-number v-model="infor.help_answer_title_width" :max="1000" :min="12" title="宽"></my-number>
        <my-number v-model="infor.help_answer_title_fs" :max="100" :min="12" title="字体大小"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.help_answer_title_bc_color" title="背景颜色"></my-color>
        <my-color v-model="infor.help_answer_title_fs_color" title="文字颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.answer_title_left" :max="1000" :min="0" title="标题左间距"></my-number>
        <my-number v-model="infor.answer_title_right" :max="1000" :min="0" title="标题右间距"></my-number>
      </div>
      
    </div>

    <!-- 回答图片  -->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'help10'">
      
      <div class="setOne">
        <my-select v-model="infor.help_answer_img_show" title="图片" :option="$store.state.options.display"></my-select>
        <my-number v-model="infor.answer_img_border_radius" :max="1000" :min="0" title="圆角半径"></my-number>
        <!-- <el-button type="primary" size="small" @click='selectPic("answer_img_url",infor.answer_img_url)'>选择图片</el-button> -->
        <my-img v-model="infor.answer_img_url"></my-img>
      </div>
      
      <div class="setOne">
        <my-number v-model="infor.answer_img_width" :max="1000" :min="12" title="图片宽"></my-number>
        <my-number v-model="infor.answer_img_height" :max="1000" :min="12" title="图片高"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.answer_img_top" :max="1000" :min="0" title="图片上间距"></my-number>
        <my-number v-model="infor.answer_img_left" :max="1000" :min="0" title="图片左间距"></my-number>
        <my-number v-model="infor.answer_img_right" :max="1000" :min="0" title="图片右间距"></my-number>
      </div>
    </div>

    <!-- 日期设置  -->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'help11'">
      
      <div class="setOne">
      </div>

      <div class="setOne">
        <my-select v-model="infor.help_question_is_date" title="日期" :option="$store.state.options.display"></my-select>
        <my-number v-model="infor.help_question_date_margin_right" :max="1000" :min="0" title="日期右间距"></my-number>
      </div>
      
    </div>
  </div>
</template>

<script>
import style from './style';

export default {
    name:'basic_helps_edit',
    props:{
    },
    data(){
        return {
          infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
          listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
          animateObj:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.animateObj)),
          isFirst:false
        };
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          // 每页显示条数 不能小于总数
          if(val.num < val.page_num){
            this.infor.page_num = val.num;
          }
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
          if(this.isFirst){
            this.templet.module_add_historical('编辑帮助组件');
          }
        },
        deep: true
      },
      animateObj:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'animateObj',
            val:JSON.parse(JSON.stringify(val))
          });
          if(this.isFirst){
            this.templet.module_add_historical('编辑帮助组件');
          }
        },
        deep: true
      }
    },
    methods:{
      selectPic(item,urls){
        var that = this;
        let myurls = urls;
        this.$store.state.showPicCon = true;
        this.$store.state.imgUrls = function (val,bol) {
          that.infor[item] = val.src;
        }
      }
    },
    async mounted(){
      let data = await $.ajax({
        url: `/index_pc.php/newapi/article/getlist/type/2`,
        type: "get",
        dataType: "json"
      });

      let _length = data.data.length;

      this.$set(this.infor,'max_num',_length)

      this.$nextTick(()=>{
        this.isFirst = true;
      })
    }
}

</script>

<style scoped>

</style>
