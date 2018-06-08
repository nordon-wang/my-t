<template>
  <div class="dateEdit">
    <!--初始显示-->
    <div class="init_edit" v-if="$store.state.parts == ''">
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs1')" data-Highlight="jobs1" :class="[
           $store.state.hover_parts == 'jobs1'  ? 'index_Highlight' : ''
           ]">基础设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs2')" data-Highlight="jobs2" :class="[
           $store.state.hover_parts == 'jobs2'  ? 'index_Highlight' : ''
           ]">图标设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs3')" data-Highlight="jobs3" :class="[
           $store.state.hover_parts == 'jobs3'  ? 'index_Highlight' : ''
           ]">默认分页</span>
      <!-- <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs4')" data-Highlight="jobs4" :class="[
           $store.state.hover_parts == 'jobs4'  ? 'index_Highlight' : ''
           ]">分页状态</span> -->
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs5')" data-Highlight="jobs5" :class="[
           $store.state.hover_parts == 'jobs5'  ? 'index_Highlight' : ''
           ]" v-show="infor.styleID == 0">简历按钮</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs6')" data-Highlight="jobs6" :class="[
           $store.state.hover_parts == 'jobs6'  ? 'index_Highlight' : ''
           ]" v-show="infor.styleID == 0">招聘职位</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs7')" data-Highlight="jobs7" :class="[
           $store.state.hover_parts == 'jobs7'  ? 'index_Highlight' : ''
           ]" v-show="infor.styleID == 0">行内容</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs8')" data-Highlight="jobs8" :class="[
           $store.state.hover_parts == 'jobs8'  ? 'index_Highlight' : ''
           ]" v-show="infor.styleID == 1">通用设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs9')" data-Highlight="jobs9" :class="[
           $store.state.hover_parts == 'jobs9'  ? 'index_Highlight' : ''
           ]" v-show="infor.styleID == 1">表头设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs10')" data-Highlight="jobs10" :class="[
           $store.state.hover_parts == 'jobs10'  ? 'index_Highlight' : ''
           ]" v-show="infor.styleID == 1">行内容设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs13')" data-Highlight="jobs13" :class="[
           $store.state.hover_parts == 'jobs13'  ? 'index_Highlight' : ''
           ]" v-show="infor.styleID == 1">内容设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs11')" data-Highlight="jobs11" :class="[
           $store.state.hover_parts == 'jobs11'  ? 'index_Highlight' : ''
           ]" v-show="infor.styleID == 1">详情设置</span>
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('jobs12')" data-Highlight="jobs12" :class="[
           $store.state.hover_parts == 'jobs12'  ? 'index_Highlight' : ''
           ]" v-show="infor.styleID == 2">栏目设置</span>
    </div>

    <!--基础设置-->
    <div class="Routine_setting btm_2cols" v-if="$store.state.parts == 'jobs1'">
      <div class="setOne">
        <my-number v-model="infor.job_pos_border_radius" :min="0" :max="10000" title="圆角"></my-number>
        <my-color v-model="infor.job_cons_bg_color" title="内容背景" v-show="infor.styleID == 0"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.job_pos_animate_time" :min="0" :max="10000" title="动画时间"></my-number>
        <my-select v-model="infor.job_pos_animate_type" title="动画类型" :option="$store.state.options.helpsAni"></my-select>
      </div>

    </div>

    <!--图标设置-->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'jobs2'">
      <div class="setOne">
        <my-select v-model="infor.job_icon_is_show" title="图标显示" :option="$store.state.options.twoBtn"></my-select>
        <my-number v-model="infor.job_icon_fs" :max="100" :min="12" title="图标大小"></my-number>
        <my-color v-model="infor.job_icon_color" title="图标颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.job_icon_all_left" :max="1000" :min="-1000" title="左间距"></my-number>
        <my-number v-model="infor.job_icon_all_top" :max="1000" :min="-1000" title="上间距"></my-number>
      </div>

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="招聘的标题栏默认图标--选择" type="info">
        </el-alert>
        <my-icon v-model="infor.defaulticon"></my-icon>
      </div>

      <div class="setOne" v-show="infor.styleID != 2">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            marginBottom: '4px',
            minWidth:'300px'
          }" title="招聘的标题栏点击时图标--选择" type="info">
        </el-alert>
        <my-icon v-model="infor.clickicon"></my-icon>
      </div>

    </div>

    <!--默认分页-->
    <div class="btn_setting self-tabs_setting btm_con_4cols" v-if="$store.state.parts == 'jobs3'">

      <el-tabs type="border-card">
        <el-tab-pane label="公共设置">
          <div class="setOne">
            <my-select v-model="infor.fenye_is_show" title="分页" :option="$store.state.options.twoBtns"></my-select>
            <my-number prompt="分页器的总条数设置" v-model="infor.num" :min="1" :max="infor.total_num" title="总条数"></my-number>
            <my-number prompt="每页显示的条数" v-model="infor.page_num" :min="1" :max="infor.num" title="每页条数"></my-number>
            <my-select prompt="是否显示分页器的总数控件" v-model="infor.jobs_total_pagenum_show" title="显示总条数" :option="$store.state.options.isOpen"></my-select>
          </div>

          <!-- <my-select prompt="是否显示分页器的页面跳转控件" v-model="infor.jobs_jump_pagenum_show" title="页数跳转" :option="$store.state.options.isOpen"></my-select> -->

          <div class="setOne">
            <my-color prompt="页面总数和页面跳转文字颜色" v-model="infor.job_fenye_font_color" title="文字颜色"></my-color>
            <my-number prompt="分页器整体左间距" v-model="infor.job_page_margin_left" :max="1000" :min="0" title="左间距"></my-number>
            <my-number prompt="分页器总数和页面跳转控件内的字体大小" v-model="infor.job_fenye_font_size" :max="100" :min="12" title="文字大小"></my-number>
          </div>

          <div class="setOne">
            <my-number v-model="infor.job_page_width" :max="1000" :min="12" title="页码总宽"></my-number>
            <my-number v-model="infor.job_fenye_btn_width" :max="1000" :min="12" title="按钮宽"></my-number>
            <my-number v-model="infor.job_fenye_btn_height" :max="1000" :min="12" title="按钮高"></my-number>
          </div>
          
        </el-tab-pane>
        <!--  -->
        <el-tab-pane label="默认分页">
          <div class="setOne">
            <el-alert :style="{
                width:`50%`,
                float:'left',
                minWidth:'300px'
              }" title="分页默认状态的颜色设置" type="info">
            </el-alert>
          </div>
          <div class="setOne">
            <my-color prompt="默认的分页器按钮背景颜色" v-model="infor.job_fenye_default_bc_color" title="按钮背景"></my-color>
            <my-color prompt="默认的分页器按钮数字颜色" v-model="infor.job_fenye_default_font_color" title="按钮数字"></my-color>
            <my-border prompt="分页器每个按钮的边框设置" type="all" :my_width.sync="infor.job_fenye_btn_border_width" :my_color.sync="infor.job_fenye_btn_border_color" :my_style.sync="infor.job_fenye_btn_border_style" title="默认边框"></my-border>
          </div>
          
        </el-tab-pane>
        <!--  -->
        <el-tab-pane label="悬浮分页">
          <div class="setOne">
            <el-alert :style="{
                width:`50%`,
                float:'left',
                minWidth:'300px'
              }" title="分页悬浮时的颜色设置" type="info">
            </el-alert>
          </div>

          <div class="setOne">
            <my-color v-model="infor.job_fenye_hover_bc_color" title="背景颜色"></my-color>
            <my-color v-model="infor.job_fenye_hover_font_color" title="文字颜色"></my-color>
            <my-color v-model="infor.job_fenye_btn_hover_border_color" title="边框颜色"></my-color>
          </div>
          
        </el-tab-pane>
        <!--  -->
        <el-tab-pane label="选中分页">
          <div class="setOne">
            <el-alert :style="{
                width:`50%`,
                float:'left',
                minWidth:'300px'
              }" title="分页点击时的颜色设置" type="info">
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
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'jobs4'">
    </div>

    <!-- 简历按钮 -->
    <div class="btn_setting btm_4cols" v-if="$store.state.parts == 'jobs5'">
       <my-computed :btype="'all'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.jobs_emailto_bottom" :min="12" :max="100" title="下间距"></my-number>
          <my-number v-model="infor.jobs_emailto_right" :min="12" :max="100" title="右间距"></my-number>
        </div>
        <!-- 默认的边框设置 -->
        <div class="setOne" slot="allbordersss">
          <my-border type="all" :my_width.sync="infor.jobs_emailto_border_width" :my_color.sync="infor.jobs_emailto_border_color" :my_style.sync="infor.jobs_emailto_border_style" title="默认边框"></my-border>
        </div>
        <!-- 默认的边框设置-悬浮 -->
        <div class="setOne" slot="allbordersss_hover">
          <my-border type="all" :my_width.sync="infor.jobs_emailto_border_width_hover" :my_color.sync="infor.jobs_emailto_border_color_hover" :my_style.sync="infor.jobs_emailto_border_style_hover" title="悬浮边框"></my-border>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-select v-model="infor.jobs_emailto_is_show" title="是否显示" :option="$store.state.options.twoBtn"></my-select>
          <my-input v-model="infor.jobs_emailto_txt" title="简历文本"></my-input>
          <my-number v-model="infor.jobs_emailto_width" :max="1000" :min="12" title="按钮宽"></my-number>
          <my-number v-model="infor.jobs_emailto_height" :max="1000" :min="12" title="按钮高"></my-number>
        </div>
      </my-computed>

      <div class="setOne">
        <my-number v-model="infor.jobs_emailto_border_radiu" :min="0" :max="10000" title="圆角"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.jobs_emailto_fs_color" title="文字颜色"></my-color>
        <my-color v-model="infor.jobs_emailto_bc_color" title="背景颜色"></my-color>
      </div>
      
      <div class="setOne">
        <my-color v-model="infor.jobs_emailto_fs_color_hover" title="文字悬浮"></my-color>
        <my-color v-model="infor.jobs_emailto_bc_color_hover" title="背景悬浮"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.jobs_emailto_fs" :min="12" :max="100" title="字体大小"></my-number>
        <my-select v-model="infor.jobs_emailto_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
      </div>

    </div>

    <!-- 样式1设置 -->
    <!-- 招聘职位  jobsOpen -->
    <div class="btn_setting btm_5cols" v-if="$store.state.parts == 'jobs6'">
      <my-computed :btype="'diff_hover'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.job_pos_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.job_pos_margin_right" :min="0" :max="1000" title="右外间距"></my-number>
          <my-number v-model="infor.job_pos_margin_bottom" :min="0" :max="1000" title="下外间距"></my-number>
          <my-number v-model="infor.job_pos_margin_left" :min="0" :max="1000" title="左外间距"></my-number>
        </div>
        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.job_pos_padding_top" :min="0" :max="1000" title="上内间距"></my-number>
          <my-number v-model="infor.job_pos_padding_right" :min="0" :max="1000" title="右内间距"></my-number>
          <my-number v-model="infor.job_pos_padding_bottom" :min="0" :max="1000" title="下内间距"></my-number>
          <my-number v-model="infor.job_pos_padding_left" :min="0" :max="1000" title="左内间距"></my-number>
        </div>
        <!-- 默认的边框设置  -->
        <div class="setOne" slot="diff_border">
          <my-border type="top" :my_style.sync="infor.job_pos_border_top_style" :my_color.sync="infor.job_pos_border_top_color" :my_width.sync="infor.job_pos_border_top_width" title="上边框"></my-border>
          <my-border type="right" :my_style.sync="infor.job_pos_border_right_style" :my_color.sync="infor.job_pos_border_right_color" :my_width.sync="infor.job_pos_border_right_width" title="右边框"></my-border>
          <my-border type="bottom" :my_style.sync="infor.job_pos_border_bottom_style" :my_color.sync="infor.job_pos_border_bottom_color" :my_width.sync="infor.job_pos_border_bottom_width" title="下边框"></my-border>
          <my-border type="left" :my_style.sync="infor.job_pos_border_left_style" :my_color.sync="infor.job_pos_border_left_color" :my_width.sync="infor.job_pos_border_left_width" title="左边框"></my-border>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.job_pos_fs" :min="10" :max="100" title="字体大小"></my-number>
          <my-number v-model="infor.job_pos_height" :min="0" :max="1000" title="高度"></my-number>
          <my-color v-model="infor.job_pos_bc_color" title="背景"></my-color>
          <my-color v-model="infor.job_pos_color" title="字体"></my-color>
        </div>
      </my-computed>

      <div class="setOne">
        <my-select v-model="infor.job1_slide_switch" title="手风琴" :option="$store.state.options.jobsOpen3"></my-select>
      </div>

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            minWidth:'300px'
          }" title="页面加载完成时，第一条数据是否展开" type="info">
        </el-alert>
        <my-select v-model="infor.jobs_datas_is_open" title="默认展开" :option="$store.state.options.jobsOpen2"></my-select>
      </div>

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            minWidth:'300px'
          }" title="点击栏目切换时的背景颜色" type="info">
        </el-alert>
        <my-color v-model="infor.job_pos_bc_after_color" title="点击时背景"></my-color>
      </div>

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            minWidth:'300px'
          }" title="点击栏目切换时的字体颜色" type="info">
        </el-alert>
        <my-color v-model="infor.job_pos_after_color" title="点击时字体"></my-color>
      </div>

    </div>

    <!-- 行内容 -->
    <div class="btn_setting btm_4cols" v-if="$store.state.parts == 'jobs7'">
      <my-computed :btype="'diff_hover'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.job_con_margin_right" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.job_con_margin_left" :min="0" :max="1000" title="左外间距"></my-number>
        </div>
        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.job_con_padding_top" :min="0" :max="1000" title="上内间距"></my-number>
          <my-number v-model="infor.job_con_padding_right" :min="0" :max="1000" title="右内间距"></my-number>
          <my-number v-model="infor.job_con_padding_bottom" :min="0" :max="1000" title="下内间距"></my-number>
          <my-number v-model="infor.job_con_padding_left" :min="0" :max="1000" title="左内间距"></my-number>
        </div>
        <!-- 默认的边框设置  -->
        <div class="setOne" slot="diff_border">
          <my-border type="top" :my_style.sync="infor.job_title_border_top_style" :my_color.sync="infor.job_title_border_top_color" :my_width.sync="infor.job_title_border_top_width" title="上边框"></my-border>
          <my-border type="right" :my_style.sync="infor.job_title_border_right_style" :my_color.sync="infor.job_title_border_right_color" :my_width.sync="infor.job_title_border_right_width" title="右边框"></my-border>
          <my-border type="bottom" :my_style.sync="infor.job_title_border_bottom_style" :my_color.sync="infor.job_title_border_bottom_color" :my_width.sync="infor.job_title_border_bottom_width" title="下边框"></my-border>
          <my-border type="left" :my_style.sync="infor.job_title_border_left_style" :my_color.sync="infor.job_title_border_left_color" :my_width.sync="infor.job_title_border_left_width" title="左边框"></my-border>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-number v-model="infor.job_con_fs" :min="10" :max="100" title="字体大小"></my-number>
          <my-color v-model="infor.job_con_color" title="字体"></my-color>
          <my-color v-model="infor.job_con_bg_color" title="背景"></my-color>
        </div>
      </my-computed>

    </div>

    <!-- 样式2设置 -->
    <!-- 通用设置 -->
    <div class="btn_setting btm_3cols" v-if="$store.state.parts == 'jobs8'">
      
      <div class="setOne">
        <my-select v-model="infor.job1_slide_switch" title="手风琴效果" :option="$store.state.options.jobsOpen3"></my-select>
        <el-button type="primary" size="small" @click="dialogVisible = true">栏目管理</el-button>
      </div>
      <!-- <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            minWidth:'300px'
          }" title="是否显示招聘的详情信息" type="info">
        </el-alert>
        <my-select v-model="infor.is_exit_gotolink" title="招聘详情" :option="$store.state.options.jobsOpen1"></my-select>
      </div> -->

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            minWidth:'300px'
          }" title="页面加载完成时，第一条数据是否展开" type="info">
        </el-alert>
        <my-select v-model="infor.jobs_datas_is_open" title="默认展开" :option="$store.state.options.jobsOpen2"></my-select>
      </div>

      <div class="setOne">
        <el-alert :style="{
            width:`20%`,
            float:'left',
            minWidth:'300px'
          }" title="表头和行内容统一设置水平位置" type="info">
        </el-alert>
        <my-select v-model="infor.job1_text_pos" title="水平位置" :option="$store.state.options.textAlign"></my-select>
      </div>

      <!-- 栏目管理.... -->
    </div>

    <!-- 表头设置 -->
    <div class="btn_setting btm_4cols" v-if="$store.state.parts == 'jobs9'">

      <div class="setOne">
        <my-color v-model="infor.job1_title_bc_color" title="表头背景"></my-color>
        <my-color v-model="infor.job1_title_color" title="表头字体"></my-color>
        <my-number v-model="infor.job1_title_fs" :min="12" :max="100" title="字体大小"></my-number>
        <my-number v-model="infor.job1_title_height" :min="0" :max="1000" title="高度"></my-number>
      </div>

      <div class="setOne">
        
        <my-number v-model="infor.job1_title_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
        <my-number v-model="infor.job1_title_margin_bottom" :min="0" :max="1000" title="下外间距"></my-number>
      </div>

    </div>

    <!-- 行内容设置 -->
    <div class="btn_setting btm_4cols" v-if="$store.state.parts == 'jobs10'">
      <my-computed :btype="'diff_hover'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.job1_con_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
          <my-number v-model="infor.job1_con_margin_bottom" :min="0" :max="1000" title="下外间距"></my-number>
        </div>
        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.job1_con_padding_top" :min="0" :max="1000" title="上内间距"></my-number>
          <my-number v-model="infor.job1_con_padding_right" :min="0" :max="1000" title="右内间距"></my-number>
          <my-number v-model="infor.job1_con_padding_bottom" :min="0" :max="1000" title="下内间距"></my-number>
          <my-number v-model="infor.job1_con_padding_left" :min="0" :max="1000" title="左内间距"></my-number>
        </div>
        <!-- 默认的边框设置  -->
        <div class="setOne" slot="diff_border">
          <my-border type="top" :my_style.sync="infor.job_title_border_top_style" :my_color.sync="infor.job_title_border_top_color" :my_width.sync="infor.job_title_border_top_width" title="上边框"></my-border>
          <my-border type="right" :my_style.sync="infor.job_title_border_right_style" :my_color.sync="infor.job_title_border_right_color" :my_width.sync="infor.job_title_border_right_width" title="右边框"></my-border>
          <my-border type="bottom" :my_style.sync="infor.job_title_border_bottom_style" :my_color.sync="infor.job_title_border_bottom_color" :my_width.sync="infor.job_title_border_bottom_width" title="下边框"></my-border>
          <my-border type="left" :my_style.sync="infor.job_title_border_left_style" :my_color.sync="infor.job_title_border_left_color" :my_width.sync="infor.job_title_border_left_width" title="左边框"></my-border>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-color v-model="infor.job1_con_bc_color" title="内容背景"></my-color>
          <my-color v-model="infor.job1_con_color" title="内容字体"></my-color>
          <my-number v-model="infor.job1_con_fs" :min="12" :max="100" title="字体大小"></my-number>
          <my-number v-model="infor.job1_con_height" :min="10" :max="1000" title="高度"></my-number>
        </div>
      </my-computed>
    </div>

    <!-- 内容设置 -->
    <div class="btn_setting btm_4cols" v-if="$store.state.parts == 'jobs13'">

      <div class="setOne">
        <my-border type="top" :my_style.sync="infor.job_pos_border_top_style" :my_color.sync="infor.job_pos_border_top_color" :my_width.sync="infor.job_pos_border_top_width" title="上边框"></my-border>
        <my-border type="right" :my_style.sync="infor.job_pos_border_right_style" :my_color.sync="infor.job_pos_border_right_color" :my_width.sync="infor.job_pos_border_right_width" title="右边框"></my-border>
        </div>
      <div class="setOne">
        <my-border type="bottom" :my_style.sync="infor.job_pos_border_bottom_style" :my_color.sync="infor.job_pos_border_bottom_color" :my_width.sync="infor.job_pos_border_bottom_width" title="下边框"></my-border>
        <my-border type="left" :my_style.sync="infor.job_pos_border_left_style" :my_color.sync="infor.job_pos_border_left_color" :my_width.sync="infor.job_pos_border_left_width" title="左边框"></my-border>
      </div>

      <div class="setOne">
          <my-color v-model="infor.job_cons_bg_color" title="内容背景"></my-color>
      </div>
    </div>

    <!-- 详情设置 -->
    <div class="btn_setting btm_4cols" v-if="$store.state.parts == 'jobs11'">      
      <my-computed :btype="'all'">
        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.jobs_gotolink_bottom" :min="0" :max="1000" title="下间距"></my-number>
          <my-number v-model="infor.jobs_gotolink_right" :min="0" :max="2000" title="右间距"></my-number>
        </div>
        <!-- 默认的边框设置 -->
        <div class="setOne" slot="allbordersss">
          <my-border type="all" :my_width.sync="infor.jobs_gotolink_border_width" :my_color.sync="infor.jobs_gotolink_border_color" :my_style.sync="infor.jobs_gotolink_border_style" title="默认边框"></my-border>
        </div>
        <!-- 默认的边框设置-悬浮 -->
        <div class="setOne" slot="allbordersss_hover">
          <my-border type="all" :my_width.sync="infor.jobs_gotolink_border_width_hover" :my_color.sync="infor.jobs_gotolink_border_color_hover" :my_style.sync="infor.jobs_gotolink_border_style_hover" title="悬浮边框"></my-border>
        </div>
        <!-- contain_control -->
        <div slot="contain_control" class="setOne">
          <my-input v-model="infor.jobs_gotolink_txt" title="详情文本"></my-input>
          <my-number v-model="infor.jobs_gotolink_width" :min="0" :max="1000" title="按钮宽"></my-number>
          <my-number v-model="infor.jobs_gotolink_height" :min="0" :max="1000" title="按钮高"></my-number>
          <my-number v-model="infor.jobs_gotolink_fs" :min="12" :max="100" title="字体大小"></my-number>
        </div>
      </my-computed>

      <div class="setOne">
        <my-number v-model="infor.jobs_gotolink_border_radiu" :min="0" :max="1000" title="圆角半径"></my-number>
        <my-select v-model="infor.jobs_gotolink_text_align" title="水平位置" :option="$store.state.options.textAlign"></my-select>
      </div>

      <div class="setOne">
        <my-color v-model="infor.jobs_gotolink_fs_color" title="文字颜色"></my-color>
        <my-color v-model="infor.jobs_gotolink_bc_color" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-color v-model="infor.jobs_gotolink_fs_color_hover" title="文字悬浮"></my-color>
        <my-color v-model="infor.jobs_gotolink_bc_color_hover" title="背景悬浮"></my-color>
      </div>
    </div>

    <!-- 样式3设置 jobsOptions -->
    <div class="btn_setting btm_4cols" v-if="$store.state.parts == 'jobs12'">
      <div class="setOne">
        <my-select v-model="infor.job3_con_value1" title="表头1内容" :option="$store.state.options.jobsOptions"></my-select>
        <my-select v-model="infor.job3_con_value2" title="表头2内容" :option="$store.state.options.jobsOptions"></my-select>
      </div>

      <div class="setOne">
        <my-number v-model="infor.job3_li_width" :min="12" :max="1000" title="列宽"></my-number>
        <my-number v-model="infor.job3_li_height" :min="12" :max="1000" title="列高"></my-number>
        <!-- <my-number v-model="infor.job3_li_titile_width" :min="12" :max="1000" title="表头1宽"></my-number> -->
        <!-- <my-select v-model="infor.job3_li_titile_hidden" title="文字超出" :option="$store.state.options.jobsTrue"></my-select> -->
      </div>

      <div class="setOne">
        <my-border type="bottom" :my_width.sync="infor.job3_li_bottom_border_width" :my_color.sync="infor.job3_li_bottom_border_color" :my_style.sync="infor.job3_li_bottom_border_style" title="悬浮边框"></my-border>
        <my-color v-model="infor.job3_li_bc_color" title="背景颜色"></my-color>
        <my-color v-model="infor.job3_li_fs_color" title="文字颜色"></my-color>
        <my-number v-model="infor.job3_fs" :min="12" :max="100" title="字体大小"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.job3_a_left" :min="-1000" :max="1000" title="表1左间距"></my-number>
        <my-number v-model="infor.job3_span_left" :min="-1000" :max="1000" title="表2右间距"></my-number>
        <my-number v-model="infor.job3_li_top" :min="-1000" :max="1000" title="列上间距"></my-number>
        <my-number v-model="infor.job3_li_bottom" :min="-1000" :max="1000" title="列下间距"></my-number>
      </div>

    </div>

    <!-- 样式2的栏目管理  -->
    <el-dialog title="提示" :visible.sync="dialogVisible" :append-to-body="true" :modal-append-to-body="true" width="750px">

      <el-row style="margin-bottom:12px;">
        <el-col :span="4" :style="{textAlign: 'center'}">
          <el-button type="primary" size="mini" v-on:click.stop="addJobs">增加</el-button>
        </el-col>
        <el-col :span="16">
          <el-alert title="建议数量在1--6个、最多增加10个、最少一个" type="info">
          </el-alert>
        </el-col>
      </el-row>
      <div style="height:460px;
    overflow-x: hidden;
    overflow-y: auto;">
        <el-row class="rows clearfix" v-for="(item,$index) in infor.jobSelectArr" :key="$index" style="border-bottom: 1px solid #ccc;padding-top:6px;">
          <el-col :span="7">
            <P>
              <b class="sliderB" style="width: 40px; margin-bottom: 6px;">标题</b>
              <el-input v-model="infor[item.title]" placeholder="请输入标题" style="width: 150px;margin-bottom: 6px;" @change="changes($index,item.title)" :ref="item.title"></el-input>
            </P>
          </el-col>

          <el-col :span="7">
            <P>
              <b class="sliderB" style="width: 40px;margin-bottom: 6px;">数据</b>
              <el-select v-model="infor[item.con]" laceholder="请选择" style="width: 120px;margin-bottom: 6px;">
                <el-option v-for="item in $store.state.options.jobsOptions2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </P>
          </el-col>

          <el-col :span="7">
            <P>
              <b class="sliderB" style="width: 40px; margin-bottom: 6px;">宽度</b>
              <el-input-number v-model="infor[item.width]" placeholder="请输入标题" style="width: 150px;margin-bottom: 6px;"></el-input-number>
            </P>
          </el-col>

          <el-col :span="2">
            <el-button type="warning" size="mini" v-on:click="deleteJobs($index,item.title)">删除行</el-button>
          </el-col>
        </el-row>

      </div>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import style from './style'

export default {
  name: 'basic_jobs_edit',
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
      ),
      dialogVisible: false,
      isFirst:false
    }
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        
        // 每页显示条数 不能小于总数
        if(val.num < val.page_num){
          this.infor.page_num = val.num;
        }

        this.templet.p_editModule({
          key: 'infor',
          val: JSON.parse(JSON.stringify(val))
        })
        if(this.isFirst){
          this.templet.module_add_historical('编辑招聘组件');
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
        if(this.isFirst){
          this.templet.module_add_historical('编辑招聘组件');
        }
      },
      deep: true
    }
  },
  methods: {
    changes($index, value) {
      this.infor.jobSelectArrs[$index].title = $(this.$refs[value][0].$el)
        .find('input')
        .val()
    },
    changeValue: function(length, index) {
      var tem = '',
        temWidth = '',
        _this = this
      for (var i = 1; i <= 11; i++) {
        // debugger;
        // console.log('test',this.infor['job1_con_value' + i],index);
        // 若是小于剩余个数,原有的值不改变
        if (length >= i) {
          // 当索引值index === i时，即为删除的值， 后面的值都会向前移动一位
          if (index + 1 == i) {
            tem = this.infor['job1_con_value' + (i + 1)]
            this.infor['job1_con_value' + i] = tem
            // 宽度 infor[item.width]
            tem = this.infor['job1_subject_width' + (i + 1)]
            this.infor['job1_subject_width' + i] = tem
            // console.log('选择框的值',_this.infor['job1_con_value' + (i +  2 )]);
            _this.infor['job1_con_value' + (i + 1)] =
              _this.infor['job1_con_value' + (i + 2)]
            _this.infor['job1_subject_width' + (i + 1)] =
              _this.infor['job1_subject_width' + (i + 2)]
          }
        } else if (length < i) {
          this.infor['job1_con_value' + (i - 1)] = ''
          this.infor['job1_subject_width' + (i - 1)] = 40
          this.infor['job_title_value' + (i - 1)] = ''
        }
      }
    },
    resetArr: function(arr) {
      var tem = [],
        _this = this
      $.each(arr, function(index, item) {
        item = {
          title: 'job_title_value' + (index + 1),
          con: 'job1_con_value' + (index + 1),
          width: 'job1_subject_width' + (index + 1),
          show: 'block',
          span: 'spans' + (index + 1)
        }
        tem.push(item)
      })
      return tem
    },
    resetArrs: function(arr, indexs) {
      var tem = [],
        _this = this
      $.each(arr, function(index, item) {
        item = {
          title: item.title,
          con: 'job1_con_value' + (index + 1),
          width: 'job1_subject_width' + (index + 1),
          show: 'block',
          span: 'spans' + (index + 1),
          num: index + 1
        }
        _this.infor['job_title_value' + (index + 1)] = item.title
        tem.push(item)
      })
      return tem
    },
    deleteJobs: function(index, item) {
      this.infor.jobs_num--
      // console.log('delete', this.infor.jobs_num)
      if (this.infor.jobs_num < 1) {
        this.infor.jobs_num = 1
        alert('合理删除数据，最少需要1条数据')
        return
      }

      if (this.infor.jobSelectArr[index].show === 'block') {
        this.infor.jobSelectArr[index].show = 'none'
      } else {
        this.infor.jobSelectArr[index].show = 'block'
      }

      this.infor.rowNumber--

      this.changeValue(this.infor.jobSelectArr.length, index)
      this.infor.jobSelectArr.splice(index, 1)
      this.infor.jobSelectArrs.splice(index, 1)

      this.infor.jobSelectArr = this.resetArr(this.infor.jobSelectArr)
      this.infor.jobSelectArrs = this.resetArrs(this.infor.jobSelectArrs, index)
    },
    changeTitle: function(index, value) {
      // console.log(value, $('.' + value + ' .ivu-input').val())
      this.infor.jobSelectArrs[index].title = $(
        '.' + value + ' .ivu-input'
      ).val()
    },
    changeSelect: function(index, value) {
      var _this = this
      setTimeout(function() {
        _this.infor.jobSelectArr.con = 'job1_con_value' + (index + 1)
      }, 200)
    },
    addJobs: function() {
      this.infor.jobs_num++

      if (this.infor.jobs_num > 10) {
        this.infor.jobs_num = 10
        alert('合理添加数据，最多增加10条')
        return
      }

      this.infor.jobSelectArr.push({
        title: 'job_title_value' + this.infor.jobs_num,
        con: 'job1_con_value' + this.infor.jobs_num,
        width: 'job1_subject_width' + this.infor.jobs_num,
        show: 'block',
        span: 'spans' + this.infor.jobs_num
      })

      // 新增时  宽度为 80
      this.infor['job1_subject_width' + this.infor.jobs_num] = 80;
      // 新增时 内容为空
      this.infor['job1_con_value' + this.infor.jobs_num] = "";

      // debugger;

      this.infor.jobSelectArrs.push({
        title: '',
        con: 'job1_con_value' + this.infor.jobs_num,
        width: 'job1_subject_width' + this.infor.jobs_num,
        show: 'block',
        span: 'spans' + this.infor.jobs_num,
        num: parseInt(this.infor.jobs_num)
      })
    }
  },
  updated() {
    $.each($('.el-dialog__header'), item => {
      $('.el-dialog__header')
        .eq(item)
        .parent()
        .draggable({ handle: 'div.el-dialog__header,div.el-dialog__footer' })
    })
  },
  async created() {
    let data = await $.ajax({
      url: `/index_pc.php/newapi/article/joblist`,
      type: 'get',
      dataType: 'json'
    })

    this.$set(this.infor, 'total_num', data.data.total)
    this.$nextTick(()=>{
      this.isFirst = true;
    })

  },
  mounted() {}
}
</script>

<style>
div.el-dialog__header,
div.el-dialog__footer {
  cursor: move;
}
</style>

<style  scoped>
p b.sliderB{
  display:inline-block;
}
</style>
