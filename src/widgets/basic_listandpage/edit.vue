<template>
  <div class="listandpage_edit" ref="listandpage_edit">

    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">

      <!--<span @click="$store.state.styleSave_IsOpen = true">样式保存</span>-->
      <span @click="templet.p_select_parts('listandpage_dataChoice')"
            class="mouseClass"
            data-Highlight="listandpage_dataChoice"
            :class="[
           $store.state.hover_parts == 'listandpage_dataChoice'  ? 'index_Highlight' : ''
           ]"
      >数据类型</span>

      <span @click="templet.p_select_parts('listandpage_listFrame')"
            class="mouseClass"
            data-Highlight="listandpage_listFrame"
            :class="[
           $store.state.hover_parts == 'listandpage_listFrame'  ? 'index_Highlight' : ''
           ]"
      >列表容器</span>

      <span @click="templet.p_select_parts('listandpage_box')"
            class="mouseClass"
            data-Highlight="listandpage_box"
            :class="[
           $store.state.hover_parts == 'listandpage_box'  ? 'index_Highlight' : ''
           ]"
      >单个容器</span>

      <span
              @click="templet.p_select_parts('listandpage_hoverAnimation')"
              class="mouseClass"
              data-Highlight="listandpage_hoverAnimation"
              :class="[
           $store.state.hover_parts == 'listandpage_hoverAnimation'  ? 'index_Highlight' : ''
           ]"
      >
        蒙层设置
        <i v-if="infor.Mongolia.isOpen === 'false'" class="fa fa-eye-slash"></i>
      </span>

      <span
              @click="templet.p_select_parts('listandpage_listPage')"
              class="mouseClass"
              data-Highlight="listandpage_listPage"
              :class="[
           $store.state.hover_parts == 'listandpage_listPage'  ? 'index_Highlight' : ''
           ]"
      >
        分页器设置
        <i v-if="infor.pageDefault.isOpen === 'false'" class="fa fa-eye-slash"></i>
      </span>

      <span
              @click="templet.p_select_parts('listandpage_name')"
              class="mouseClass"
              data-Highlight="listandpage_name"
              :class="[
           $store.state.hover_parts == 'listandpage_name'  ? 'index_Highlight' : ''
           ]"
      >
        标题组件
        <i v-if="infor.Component[0].select === 'none'" class="fa fa-eye-slash"></i>
      </span>

      <span
              @click="templet.p_select_parts('listandpage_up_time')"
              class="mouseClass"
              data-Highlight="listandpage_up_time"
              :class="[
           $store.state.hover_parts == 'listandpage_up_time'  ? 'index_Highlight' : ''
           ]"
      >
        时间组件
        <i v-if="infor.Component[1].select === 'none'" class="fa fa-eye-slash"></i>
      </span>

      <span
              @click="templet.p_select_parts('listandpage_summary')"
              class="mouseClass"
              data-Highlight="listandpage_summary"
              :class="[
           $store.state.hover_parts == 'listandpage_summary'  ? 'index_Highlight' : ''
           ]"
      >
        简介组件
        <i v-if="infor.Component[2].select === 'none'" class="fa fa-eye-slash"></i>
      </span>

      <span
              @click="templet.p_select_parts('listandpage_price_sell')"
              class="mouseClass"
              data-Highlight="listandpage_price_sell"
              :class="[
           $store.state.hover_parts == 'listandpage_price_sell'  ? 'index_Highlight' : ''
           ]"
      >
        价格组件
        <i v-if="infor.Component[3].select === 'none'" class="fa fa-eye-slash"></i>
      </span>

      <span
              @click="templet.p_select_parts('listandpage_more')"
              class="mouseClass"
              data-Highlight="listandpage_more"
              :class="[
           $store.state.hover_parts == 'listandpage_more'  ? 'index_Highlight' : ''
           ]"
      >
        更多按钮
        <i v-if="infor.Component[4].select === 'none'" class="fa fa-eye-slash"></i>
      </span>

      <span
              @click="templet.p_select_parts('listandpage_img')"
              class="mouseClass"
              data-Highlight="listandpage_img"
              :class="[
           $store.state.hover_parts == 'listandpage_img'  ? 'index_Highlight' : ''
           ]"
      >
        图片组件
        <i v-if="infor.Component[5].select === 'none'" class="fa fa-eye-slash"></i>
      </span>

      <span
              @click="templet.p_select_parts('listandpage_icon')"
              class="mouseClass"
              data-Highlight="listandpage_icon"
              :class="[
           $store.state.hover_parts == 'listandpage_icon'  ? 'index_Highlight' : ''
           ]"
      >
        图标组件
        <i v-if="infor.Component[6].select === 'none'" class="fa fa-eye-slash"></i>
      </span>

    </div>

    <div class="listFrame"  v-if="$store.state.parts == 'listandpage_listFrame'">
      <my-computed :btype="'diff_hover'">

        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.frame.paddingTop" title="上内间距"></my-number>
          <my-number v-model="infor.frame.paddingRight" title="右内间距"></my-number>
          <my-number v-model="infor.frame.paddingBottom" title="下内间距"></my-number>
          <my-number v-model="infor.frame.paddingLeft" title="左内间距"></my-number>
        </div>

        <!-- 默认的边框设置 -->
        <div slot="diff_border" class="setOne">
          <my-border
            type="top"
            :my_style.sync="infor.frame.borderStyle"
            :my_color.sync="infor.frame.borderColor"
            :my_width.sync="infor.frame.borderTopWidth"
            title="上边框"
          ></my-border>
          <my-border
            type="right"
            :my_style.sync="infor.frame.borderStyle"
            :my_color.sync="infor.frame.borderColor"
            :my_width.sync="infor.frame.borderRightWidth"
            title="右边框"
          ></my-border>
          <my-border
            type="bottom"
            :my_style.sync="infor.frame.borderStyle"
            :my_color.sync="infor.frame.borderColor"
            :my_width.sync="infor.frame.borderBottomWidth"
            title="下边框"
          ></my-border>
          <my-border
            type="left"
            :my_style.sync="infor.frame.borderStyle"
            :my_color.sync="infor.frame.borderColor"
            :my_width.sync="infor.frame.borderLeftWidth"
            title="左边框"
          ></my-border>
        </div>
      </my-computed>

      <div class="setOne">
        <my-select v-model="infor.frame.heightType" :option="$store.state.options.heightType" title="高度选择" prompt="自适应模式下，会根据内容数量自动伸展高度！"></my-select>
        <my-number v-model="infor.frame.borderRadius"  title="圆角半径"></my-number>
        <my-number v-model="infor.frame.width"  title="宽度设置"></my-number>
        <my-number v-model="infor.frame.height"  title="高度设置"></my-number>

      </div>
    </div>

    <div class="hoverAnimation" v-if="$store.state.parts == 'listandpage_hoverAnimation'">
      <el-tabs type="border-card">

        <el-tab-pane label="蒙层容器设置" class="btm_4cols">
          <div class="setOne">
            <my-select title="蒙层状态" v-model="infor.Mongolia.isOpen" :option="$store.state.options.isOpen"></my-select>
            <my-select title="动画特效" v-model="infor.Mongolia.animation" :option="$store.state.options.animation"></my-select>
            <my-number v-model="infor.Mongolia.opacity" title="透明度" :step="0.1" :max="1" :min="0"></my-number>
            <my-number v-model="infor.Mongolia.time" title="动画时间"></my-number>

          </div>

          <div class="setOne">
            <my-number v-model="infor.Mongolia.width" title="宽度设置"></my-number>
            <my-number v-model="infor.Mongolia.height" title="高度设置"></my-number>
            <my-number v-model="infor.Mongolia.marginTop" title="上外边距"></my-number>
            <my-number v-model="infor.Mongolia.marginLeft" title="左外边距"></my-number>
          </div>
          <div class="setOne">
            <my-color v-model="infor.Mongolia.background" title="背景颜色"></my-color>
          </div>
        </el-tab-pane>

        <el-tab-pane label="蒙层图标设置" class="btm_4cols">
          <div class="setOne">
            <my-select title="显示/隐藏" v-model="infor.MongoliaIcon.display" :option="$store.state.options.display"></my-select>
            <my-icon v-model="infor.MongoliaIcon.icon" title="图标选择"></my-icon>
            <my-number v-model="infor.MongoliaIcon.fontSize" title="图标大小"></my-number>
            <my-color v-model="infor.MongoliaIcon.color" title="图标颜色"></my-color>
          </div>
        </el-tab-pane>

        <el-tab-pane label="蒙层标题设置" class="btm_4cols">
          <div class="setOne">
            <my-select title="显示/隐藏" v-model="infor.MongoliaTitle.display" :option="$store.state.options.display"></my-select>
            <my-number v-model="infor.MongoliaTitle.fontSize" title="文字大小" :min="12"></my-number>
            <my-color v-model="infor.MongoliaTitle.color" title="文字颜色"></my-color>
            <my-number v-model="infor.MongoliaTitle.lineHeight" title="行高设置"></my-number>
          </div>

          <div class="setOne">
            <my-number v-model="infor.MongoliaTitle.width" title="宽度设置"></my-number>
            <my-number v-model="infor.MongoliaTitle.height" title="高度设置"></my-number>

          </div>
        </el-tab-pane>

        <el-tab-pane label="蒙层内容设置" class="btm_4cols">

          <div class="setOne">
            <my-select title="显示/隐藏" v-model="infor.MongoliaContent.display" :option="$store.state.options.display"></my-select>
            <my-number v-model="infor.MongoliaContent.fontSize" title="文字大小" :min="12"></my-number>
            <my-color v-model="infor.MongoliaContent.color" title="文字颜色"></my-color>
            <my-number v-model="infor.MongoliaContent.width" title="宽度设置"></my-number>
          </div>

          <div class="setOne">
            <my-number v-model="infor.MongoliaContent.height" title="高度设置"></my-number>
            <my-number v-model="infor.MongoliaContent.lineHeight" title="行高设置"></my-number>
          </div>

        </el-tab-pane>
        <el-tab-pane label="背景变化设置" class="btm_4cols">

          <div class="setOne">
            <my-select title="开启/关闭" v-model="infor.backgroundSelect.isOpen" :option="$store.state.options.isOpen"></my-select>
            <b style="margin-left: 10px;line-height: 34px;color: #f00">开启后，单个组件悬浮效果无效！</b>

          </div>

          <div class="setOne">
            <my-color v-model="infor.backgroundSelect.color" title="文字颜色"></my-color>
            <my-color v-model="infor.backgroundSelect.background" title="背景颜色"></my-color>
          </div>

        </el-tab-pane>

      </el-tabs>

    </div>

    <div class="listPage" v-if="$store.state.parts == 'listandpage_listPage'">
      <el-tabs type="border-card">

        <el-tab-pane label="分页器基础状态">
          <div class="setOne">
            <my-select title="开启/关闭" v-model="infor.pageDefault.isOpen" :option="$store.state.options.isOpen"></my-select>
            <my-select title="位置" v-model="infor.pageDefault.pagePosition" :option="$store.state.options.textAlign"></my-select>
            <my-number v-model="infor.pageDefault.bottom" title="靠下位置"></my-number>
            <my-number v-model="infor.pageDefault.nextBtnWidth" title="上下页宽"></my-number>
            <my-number v-model="infor.pageDefault.firstBtnWidth" title="首末页宽"></my-number>
          </div>

          <div class="setOne">
            <my-number v-model="infor.pageDefault.borderRadius" title="圆角半径"></my-number>
            <my-number v-model="infor.pageDefault.fontSize" title="文字大小" :min="12"></my-number>

            <my-select v-model="infor.pageDefault.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
            <my-color v-model="infor.pageDefault.color" title="文字颜色"></my-color>
            <my-number v-model="infor.pageDefault.margin" title="外边距"></my-number>
          </div>

          <div class="setOne">
            <my-number v-model="infor.pageDefault.width" title="按钮宽"></my-number>
            <my-number v-model="infor.pageDefault.height" title="按钮高"></my-number>
          </div>
        </el-tab-pane>

        <el-tab-pane label="分页器边框">

          <div class="setOne">
            <my-number v-model="infor.pageDefault.borderLeftWidth" title="左边框"></my-number>
            <my-number v-model="infor.pageDefault.borderRightWidth" title="右边框"></my-number>
            <my-number v-model="infor.pageDefault.borderTopWidth" title="上边框"></my-number>
            <my-number v-model="infor.pageDefault.borderBottomWidth" title="下边框"></my-number>
            <my-color v-model="infor.pageDefault.borderColor" title="边框颜色"></my-color>
          </div>

          <div class="setOne">

            <my-select v-model="infor.pageDefault.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
          </div>
        </el-tab-pane>



        <el-tab-pane label="分页器选中状态">
          <div class="setOne">
            <my-number v-model="infor.pageSelect.borderLeftWidth" title="左边框"></my-number>
            <my-number v-model="infor.pageSelect.borderRightWidth" title="右边框"></my-number>
            <my-number v-model="infor.pageSelect.borderTopWidth" title="上边框"></my-number>
            <my-number v-model="infor.pageSelect.borderBottomWidth" title="下边框"></my-number>
            <my-color v-model="infor.pageSelect.borderColor" title="边框颜色"></my-color>
          </div>

          <div class="setOne">
            <my-color v-model="infor.pageSelect.background" title="背景颜色"></my-color>
            <my-number v-model="infor.pageSelect.borderRadius" title="圆角半径"></my-number>
            <my-number v-model="infor.pageSelect.fontSize" title="文字大小" :min="12"></my-number>
            <my-select v-model="infor.pageSelect.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
            <my-color v-model="infor.pageSelect.color" title="文字颜色"></my-color>
          </div>

          <!--<div class="setOne">
            <my-number v-model="infor.pageSelect.margin" title="外边距"></my-number>
          </div>-->

        </el-tab-pane>

      </el-tabs>
    </div>

    <div class="dataChoice btm_3cols" v-if="$store.state.parts == 'listandpage_dataChoice'">

      <div class="setOne">

        <my-select title="模式选择" v-model="listArr.Pattern" :option="$store.state.options.listandpage_Pattern" prompt="推荐模式下没有分页展示，建议关闭分页！"></my-select>

        <my-select
          title="数据类型"
          v-model="listArr.listType"
          :option="$store.state.options.listandpage_listType"></my-select>
        <my-number
          v-model="infor.frame.showNum"
          v-if="listArr.Pattern == 'list'"
          title="显示条数" :min="1"></my-number>

        <el-button
          class="btn"
          size="small"
          @click="openListSele"
          v-if="listArr.Pattern == 'recommend' && listArr.listType != 'search'"
          type="primary">内容选择</el-button>
        <div class="selectLength" v-if="listArr.Pattern == 'recommend'">
          <i>当前已选中：</i>
          <b>{{listArr.listArr.length}}条</b>
        </div>
      </div>

      <div class="setOne">
        <my-input title="提示内容" v-model="listArr.Prompt"></my-input>
        <my-number v-model="infor.Prompt.fontSize" title="提示大小"></my-number>
        <my-color v-model="infor.Prompt.color" title="提示颜色"></my-color>

      </div>

    </div>

    <div class="listandpage_box" v-if="$store.state.parts == 'listandpage_box'">

      <my-computed :btype="'diff_hover'">

        <div slot="margin_control" class="setOne">
          <my-number v-model="infor.box.marginTop" title="上外间距"></my-number>
          <my-number v-model="infor.box.marginRight" title="右外间距"></my-number>
          <my-number v-model="infor.box.marginBottom" title="下外间距"></my-number>
          <my-number v-model="infor.box.marginLeft" title="左外间距"></my-number>
        </div>

        <!-- 默认的边框设置 -->
        <div slot="diff_border" class="setOne">
          <my-border
            type="top"
            :my_style.sync="infor.box.borderStyle"
            :my_color.sync="infor.box.borderColor"
            :my_width.sync="infor.box.borderTopWidth"
            title="上边框"
          ></my-border>
          <my-border
            type="right"
            :my_style.sync="infor.box.borderStyle"
            :my_color.sync="infor.box.borderColor"
            :my_width.sync="infor.box.borderRightWidth"
            title="右边框"
          ></my-border>
          <my-border
            type="bottom"
            :my_style.sync="infor.box.borderStyle"
            :my_color.sync="infor.box.borderColor"
            :my_width.sync="infor.box.borderBottomWidth"
            title="下边框"
          ></my-border>
          <my-border
            type="left"
            :my_style.sync="infor.box.borderStyle"
            :my_color.sync="infor.box.borderColor"
            :my_width.sync="infor.box.borderLeftWidth"
            title="左边框"
          ></my-border>
        </div>
      </my-computed>

      <div class="setOne">
        <my-number v-model="infor.box.width" title="宽度设置"></my-number>
        <my-number v-model="infor.box.height" title="高度设置"></my-number>
        <my-number v-model="infor.box.borderRadius" title="圆角半径"></my-number>

      </div>
      <div class="setOne">
        <my-color v-model="infor.box.background" title="背景颜色"></my-color>
        <my-select v-model="infor.box.target" :option="$store.state.options.open" title="打开方式" ></my-select>
      </div>

    </div>

    <div
      :class="`Component_${val.englishName}`"
      v-if="$store.state.parts == `listandpage_${val.englishName}`"
      v-for="(val,i) in infor.Component" >
      <el-tabs type="border-card">
        <el-tab-pane label="基础设置">

          <div class="setOne">
            <my-select title="显示/隐藏" v-model="val.select" :option="$store.state.options.display"></my-select>
            <my-number v-model="val.zIndex" title="层级设置" ></my-number>
            <my-number v-model="val.borderRadius" title="圆角半径" ></my-number>
            <my-icon v-model="val.content" title="按钮选择"  v-if="val.englishName === 'icon'"></my-icon>
          </div>

          <div class="setOne">
            <my-number v-model="val.top" title="靠上位置" ></my-number>
            <my-number v-model="val.left" title="靠左位置" ></my-number>
            <my-number v-model="val.width" title="宽度" ></my-number>
            <my-number v-model="val.height" title="高度" ></my-number>

          </div>



        </el-tab-pane>
        <el-tab-pane label="普通状态">
          <div class="setOne">
            <my-number v-model="val.borderLeftWidth" title="左边框"></my-number>
            <my-number v-model="val.borderRightWidth" title="右边框"></my-number>
            <my-number v-model="val.borderTopWidth" title="上边框"></my-number>
            <my-number v-model="val.borderBottomWidth" title="下边框"></my-number>
            <my-color v-model="val.borderColor" title="边框颜色"></my-color>
          </div>
          <div class="setOne">
            <my-select v-model="val.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
            <my-number v-model="val.fontSize" :title="val.englishName === 'icon' ? '图标大小' : '文字大小'" v-if="val.englishName != 'img'" :min="12"></my-number>

            <my-select v-model="val.textAlign" :option="$store.state.options.textAlign" title="对齐方式" v-if="val.englishName != 'img'"></my-select>
            <my-color v-model="val.color" :title="val.englishName === 'icon' ? '图标颜色' : '文字颜色'"  v-if="val.englishName != 'img'"></my-color>
            <my-number v-model="val.lineHeight" title="行高设置" v-if="val.englishName != 'img'"></my-number>

          </div>
          <div class="setOne">
            <my-number v-model="val.padding" title="内边距"></my-number>
            <my-select v-model="val.fontWeight" :option="$store.state.options.myFontWeight" title="文字粗细" v-if="val.englishName == 'name'"></my-select>
            <my-number v-model="infor.summaryLength" title="显示字数" v-if="val.englishName == 'summary'"></my-number>
            <my-input title="按键文字" v-model="val.content" v-if="val.englishName == 'more'"></my-input>
            <my-color v-model="val.background" title="背景颜色"></my-color>
          </div>

        </el-tab-pane>
        <el-tab-pane label="选中状态">
          <div class="setOne">
            <my-select v-model="val.hover" :option="$store.state.options.isOpen" title="选中状态" v-if="val.englishName == 'img'"></my-select>
            <div v-if="val.englishName != 'img'">
              <my-number v-model="val.Swidth" title="宽度"></my-number>
              <my-number v-model="val.Sheight" title="高度" ></my-number>
              <my-number v-model="val.SfontSize" :title="val.englishName === 'icon' ? '图标大小' : '文字大小'" :min="12"></my-number>
            </div>
            <my-select v-model="val.StextAlign" :option="$store.state.options.textAlign" title="对齐方式" v-if="val.englishName != 'img'"></my-select>
            <my-color v-model="val.Scolor" :title="val.englishName === 'icon' ? '图标颜色' : '文字颜色'"  v-if="val.englishName != 'img'"></my-color>
          </div>

          <div class="setOne">
            <my-number v-model="val.SborderLeftWidth" title="左边框"></my-number>
            <my-number v-model="val.SborderRightWidth" title="右边框"></my-number>
            <my-number v-model="val.SborderTopWidth" title="上边框"></my-number>
            <my-number v-model="val.SborderBottomWidth" title="下边框"></my-number>
            <my-color v-model="val.SborderColor" title="边框颜色"></my-color>
          </div>

          <div class="setOne">
            <my-select v-model="val.SborderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
            <my-select v-model="val.SfontWeight" :option="$store.state.options.myFontWeight" title="文字粗细" v-if="val.englishName == 'name'"></my-select>
            <my-color v-model="val.Sbackground" title="背景颜色"  v-if="val.englishName != 'img' && val.englishName != 'icon'"></my-color>
            <my-number v-model="val.Spadding" title="内边距"></my-number>
            <my-number v-model="val.scale" title="缩放比" v-if="val.englishName === 'img'"></my-number>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>






    <my-edit-list
      :list-arr="listArr.listArr"
      @close="edit_dialog = false"
      @get_data="seleSure"
      :type="listArr.listType"
      v-if="edit_dialog"></my-edit-list>

  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from '../../base/bus';

  export default {
    name: 'basic_banner_edit',
    props:{

    },
    data () {
      return {
        infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
        listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
        edit_dialog:false,
        borderWidth:2,
        borderColor:'#ccc',
        borderStyle:'solid',
        swiperOption: {
          slidesPerView: 5,
          spaceBetween:5,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        visible:false,
        editIndex:0,
        temporaryPicInfor:{
          src:'',
          link:'',
          alt:'',
          openMode:'_blank',
        }

      }
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑列表与分页组件');
        },
        deep: true
      },
      listArr:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'listArr',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑列表与分页组件');
        },
        deep: true
      },
    },
    created(){

    },
    components:{
    },
    methods:{
      seleSure(arr){
        this.listArr.listArr = arr;
        //console.log(JSON.stringify(arr));
        this.edit_dialog = false;
      },
      //打开数据选择器
      openListSele(){
        this.edit_dialog = true;

      },
    },

    mounted(){
      Bus.$on('listandpage_update_data', ({component_index,key1,val1,key2,val2}) => {
        this.infor.Component[component_index][key1] = val1;
        this.infor.Component[component_index][key2] = val2;
      });
    }
  }
</script>
