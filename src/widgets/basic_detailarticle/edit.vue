<template>
  <div class="detailarticle_edit">

    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">

      <!--<span @click="$store.state.styleSave_IsOpen = true">样式保存</span>-->
      <span @click="templet.p_select_parts('detailarticle_new_box')"
            class="mouseClass"
            data-Highlight="detailarticle_new_box"
            :class="[
           $store.state.hover_parts == 'detailarticle_new_box'  ? 'index_Highlight' : ''
           ]"
      >容器</span>

      <span @click="templet.p_select_parts('detailarticle_new_header')"
            class="mouseClass"
            data-Highlight="detailarticle_new_header"
            :class="[
           $store.state.hover_parts == 'detailarticle_new_header'  ? 'index_Highlight' : ''
           ]"
      >标题</span>

      <span @click="templet.p_select_parts('detailarticle_new_headerBottom')"
            class="mouseClass"
            data-Highlight="detailarticle_new_headerBottom"
            :class="[
           $store.state.hover_parts == 'detailarticle_new_headerBottom'  ? 'index_Highlight' : ''
           ]"
      >副标题</span>

      <span
              @click="templet.p_select_parts('detailarticle_new_img')"
              class="mouseClass"
              data-Highlight="detailarticle_new_img"
              :class="[
           $store.state.hover_parts == 'detailarticle_new_img'  ? 'index_Highlight' : ''
           ]"
      >图片</span>

      <span
              @click="templet.p_select_parts('detailarticle_new_summary')"
              class="mouseClass"
              data-Highlight="detailarticle_new_summary"
              :class="[
           $store.state.hover_parts == 'detailarticle_new_summary'  ? 'index_Highlight' : ''
           ]"
      >简介</span>

      <span
              @click="templet.p_select_parts('detailarticle_new_content')"
              class="mouseClass"
              data-Highlight="detailarticle_new_content"
              :class="[
           $store.state.hover_parts == 'detailarticle_new_content'  ? 'index_Highlight' : ''
           ]"
      >内容</span>

      <span
              @click="templet.p_select_parts('detailarticle_new_Magnifier')"
              class="mouseClass"
              data-Highlight="detailarticle_new_Magnifier"
              :class="[
           $store.state.hover_parts == 'detailarticle_new_Magnifier'  ? 'index_Highlight' : ''
           ]"
      >放大镜留白</span>

      <span
              @click="templet.p_select_parts('detailarticle_productTab')"
              class="mouseClass"
              data-Highlight="detailarticle_productTab"
              :class="[
           $store.state.hover_parts == 'detailarticle_productTab'  ? 'index_Highlight' : ''
           ]"
      >选项卡</span>
    </div>

    <div class="new_box" v-if="$store.state.parts == 'detailarticle_new_box'">
      <div class="setOne">
        <my-number v-model="infor.box.width" title="整体宽度"></my-number>
        <!--<my-number v-model="infor.box.height" title="整体高度"></my-number>
        <b style="margin-left: 10px;line-height: 34px;color: #f00">此处设置的高度只在可视化中生效，正式网站会自适应高度！</b>-->

      </div>
      <div class="setOne">
        <my-color v-model="infor.box.borderColor" title="边框颜色" classname="box_borderColor"></my-color>
        <my-select v-model="infor.box.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
        <my-color v-model="infor.box.background" title="背景颜色"></my-color>
      </div>
      <div class="setOne">
        <my-number v-model="infor.box.borderLeftWidth" title="左边框宽度"></my-number>
        <my-number v-model="infor.box.borderRightWidth" title="右边框宽度"></my-number>
        <my-number v-model="infor.box.borderTopWidth" title="上边框宽度"></my-number>
        <my-number v-model="infor.box.borderBottomWidth" title="下边框宽度"></my-number>
      </div>
    </div>

    <div class="new_header" v-if="$store.state.parts == 'detailarticle_new_header'">
      <div class="setOne">
        <my-number v-model="infor.header.top"  title="靠上位置"></my-number>
        <my-number v-model="infor.header.left"  title="靠左位置"></my-number>
        <my-number v-model="infor.header.width"  title="标题宽度"></my-number>
        <my-number v-model="infor.header.height" title="标题高度"></my-number>
        <my-color v-model="infor.header.borderColor" title="边框颜色" classname="header_borderColor"></my-color>

      </div>
      <div class="setOne">
        <my-select v-model="infor.header.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
        <my-number v-model="infor.header.borderLeftWidth" title="左边框宽度"></my-number>
        <my-number v-model="infor.header.borderRightWidth" title="右边框宽度"></my-number>
        <my-number v-model="infor.header.borderTopWidth" title="上边框宽度"></my-number>
        <my-number v-model="infor.header.borderBottomWidth" title="下边框宽度"></my-number>
      </div>

      <div class="setOne">
        <my-color v-model="infor.header.color" title="文字颜色"></my-color>
        <my-number v-model="infor.header.fontSize" title="文字大小" :min="12"></my-number>
        <my-number v-model="infor.header.lineHeight" title="文字行高"></my-number>
        <my-color v-model="infor.header.background" title="背景颜色"></my-color>
        <my-select v-model="infor.header.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
      </div>
      <div class="setOne">

        <my-number v-model="infor.header.zIndex" title="层级设置"></my-number>
        <my-select v-model="infor.header.fontWeight" :option="$store.state.options.myFontWeight" title="文字粗细" ></my-select>
      </div>
    </div>

    <div class="new_header" v-if="$store.state.parts == 'detailarticle_new_headerBottom'">
      <el-tabs type="border-card">
        <el-tab-pane label="基础设置">
          <div class="setOne">
            <my-select v-model="infor.headerBottom.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
            <my-number v-model="infor.headerBottom.top"  title="靠上位置"></my-number>
            <my-number v-model="infor.headerBottom.left"  title="靠左位置"></my-number>
            <my-number v-model="infor.headerBottom.zIndex"  title="层级设置"></my-number>
            <my-number v-model="infor.headerBottom.width" title="副标题宽"></my-number>
          </div>
          <div class="setOne">
            <my-number v-model="infor.headerBottom.height" title="副标题高"></my-number>
            <my-number v-model="infor.headerBottom.fontSize"  title="文字大小" :min="12"></my-number>
            <my-color v-model="infor.headerBottom.background" title="背景颜色"></my-color>
            <my-color v-model="infor.headerBottom.nameColor" title="名称颜色" ></my-color>
            <my-color v-model="infor.headerBottom.valColor" title="值颜色"></my-color>
          </div>

        </el-tab-pane>
        <el-tab-pane label="边框设置">
          <div class="setOne">
            <my-number v-model="infor.headerBottom.borderLeftWidth"  title="左边框宽度"></my-number>
            <my-number v-model="infor.headerBottom.borderRightWidth"  title="右边框宽度"></my-number>
            <my-number v-model="infor.headerBottom.borderTopWidth"  title="上边框宽度"></my-number>
            <my-number v-model="infor.headerBottom.borderBottomWidth"  title="下边框宽度"></my-number>
            <my-color v-model="infor.headerBottom.borderColor" title="边框颜色"></my-color>
          </div>
          <div class="setOne">
            <my-select v-model="infor.headerBottom.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
          </div>
        </el-tab-pane>

        <el-tab-pane label="发布时间设置" class="btm_4cols">
          <div class="setOne">
            <my-select v-model="infor.headerBottom.time.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
            <my-number v-model="infor.headerBottom.time.marginLeft" title="左边距"></my-number>
            <my-number v-model="infor.headerBottom.time.marginRight" title="右边距"></my-number>
          </div>
          </el-tab-pane>


        <el-tab-pane label="文章来源设置" class="btm_4cols">
          <div class="setOne">
            <my-select v-model="infor.headerBottom.source.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
            <my-number v-model="infor.headerBottom.source.marginLeft" title="左边距"></my-number>
            <my-number v-model="infor.headerBottom.source.marginRight" title="右边距"></my-number>
          </div>


        </el-tab-pane>

        <el-tab-pane label="浏览量设置" class="btm_4cols">
          <div class="setOne">
            <my-select v-model="infor.headerBottom.look.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
            <my-number v-model="infor.headerBottom.look.marginLeft" title="左边距"></my-number>
            <my-number v-model="infor.headerBottom.look.marginRight" title="右边距"></my-number>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="new_img" v-if="$store.state.parts == 'detailarticle_new_img'">
      <div class="setOne">
        <my-select v-model="infor.img.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
        <my-number v-model="infor.img.top"  title="靠上位置"></my-number>
        <my-number v-model="infor.img.left"  title="靠左位置"></my-number>

        <my-number v-model="infor.img.width" title="容器宽度"></my-number>
        <my-number v-model="infor.img.height" title="容器高度"></my-number>

      </div>
      <div class="setOne">
        <my-number v-model="infor.img.borderLeftWidth"  title="左边框宽度"></my-number>
        <my-number v-model="infor.img.borderRightWidth"  title="右边框宽度"></my-number>
        <my-number v-model="infor.img.borderTopWidth"  title="上边框宽度"></my-number>
        <my-number v-model="infor.img.borderBottomWidth"  title="下边框宽度"></my-number>
        <my-select v-model="infor.img.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
      </div>
      <div class="setOne">
        <my-color v-model="infor.img.borderColor" title="边框颜色"></my-color>
        <my-number v-model="infor.img.imgWidth" title="图片宽度"></my-number>
        <my-number v-model="infor.img.imgHeight" title="图片高度"></my-number>
        <my-number v-model="infor.img.zIndex"  title="层级设置"></my-number>
        <my-number v-model="infor.img.margin" title="图片外边距"></my-number>
      </div>
      <div class="setOne">
        <my-color v-model="infor.img.background" title="背景颜色"></my-color>
      </div>
    </div>

    <div class="new_summary" v-if="$store.state.parts == 'detailarticle_new_summary'">
      <div class="setOne">
        <my-select v-model="infor.summary.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
        <my-number v-model="infor.summary.top"  title="靠上位置"></my-number>
        <my-number v-model="infor.summary.left"  title="靠左位置"></my-number>
        <my-number v-model="infor.summary.width" title="简介宽度"></my-number>
        <my-number v-model="infor.summary.height" title="简介高度"></my-number>

      </div>

      <div class="setOne">
        <my-number v-model="infor.summary.borderLeftWidth"  title="左边框宽"></my-number>
        <my-number v-model="infor.summary.borderRightWidth"  title="右边框宽"></my-number>
        <my-number v-model="infor.summary.borderTopWidth"  title="上边框宽"></my-number>
        <my-number v-model="infor.summary.borderBottomWidth"  title="下边框宽"></my-number>
        <my-color v-model="infor.summary.borderColor" title="边框颜色"></my-color>

      </div>
      <div class="setOne">
        <my-number v-model="infor.summary.fontSize" title="文字大小" :min="12"></my-number>
        <my-number v-model="infor.summary.lineHeight" title="文字行高"></my-number>
        <my-color v-model="infor.summary.background" title="背景颜色"></my-color>
        <my-select v-model="infor.summary.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
        <my-number v-model="infor.summary.zIndex"  title="层级设置"></my-number>
      </div>

      <div class="setOne">
        <my-select v-model="infor.summary.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
        <my-color v-model="infor.summary.color" title="文字颜色" classname="header_color"></my-color>
      </div>
    </div>

    <div class="new_content" v-if="$store.state.parts == 'detailarticle_new_content'">
      <div class="setOne">
        <my-select v-model="infor.content.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
        <my-number v-model="infor.content.top"  title="靠上位置"></my-number>
        <my-number v-model="infor.content.left"  title="靠左位置"></my-number>
        <my-number v-model="infor.content.height" title="最小高度"></my-number>
        <my-number v-model="infor.content.width" title="内容宽度"></my-number>

      </div>
      <div class="setOne">
        <my-number v-model="infor.content.borderLeftWidth"  title="左边框宽度"></my-number>
        <my-number v-model="infor.content.borderRightWidth"  title="右边框宽度"></my-number>
        <my-number v-model="infor.content.borderTopWidth"  title="上边框宽度"></my-number>
        <my-number v-model="infor.content.borderBottomWidth"  title="下边框宽度"></my-number>
        <my-color v-model="infor.content.background" title="背景颜色" classname="content_background"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.content.zIndex"  title="层级设置"></my-number>
        <my-color v-model="infor.content.borderColor" title="边框颜色" classname="content_borderColor"></my-color>
        <my-select v-model="infor.content.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
      </div>
    </div>

    <div class="new_Magnifier btm_3cols" v-if="$store.state.parts == 'detailarticle_new_Magnifier'">
      <!--<div class="setOne">
        <my-number v-model="infor.magnifier.top"  title="靠上位置"></my-number>
        <my-number v-model="infor.magnifier.left"  title="靠左位置"></my-number>
      </div>-->
      <div class="setOne">
        <my-select v-model="infor.magnifier.display" :option="$store.state.options.display" title="打开/关闭" ></my-select>
        <my-number v-model="infor.magnifier.margin" title="占位外边距"></my-number>
      </div>

      <div class="setOne">
        <my-number v-model="infor.magnifier.width" title="占位宽度"></my-number>
        <my-number v-model="infor.magnifier.height" title="占位高度"></my-number>
        <my-number v-model="infor.magnifier.zIndex" title="层级设置"></my-number>
      </div>
    </div>

    <div class="productTab" v-if="$store.state.parts == 'detailarticle_productTab'">
      <el-tabs type="border-card">
        <el-tab-pane label="容器样式">
          <div class="setOne">
            <my-select v-model="infor.tab.box.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
            <my-number v-model="infor.tab.box.top"  title="靠上位置"></my-number>
            <my-number v-model="infor.tab.box.left"  title="靠左位置"></my-number>
            <my-number v-model="infor.tab.box.width" title="宽度设置"></my-number>

            <my-color v-model="infor.tab.box.borderColor" title="边框颜色"></my-color>
          </div>

          <div class="setOne">
            <my-number v-model="infor.tab.box.borderTopWidth" title="上边框宽度"></my-number>
            <my-number v-model="infor.tab.box.borderLeftWidth" title="左边框宽度"></my-number>
            <my-number v-model="infor.tab.box.borderRightWidth" title="右边框宽度"></my-number>
            <my-number v-model="infor.tab.box.borderBottomWidth" title="下边框宽度"></my-number>
            <my-select v-model="infor.tab.box.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
          </div>

          <div class="setOne">
            <my-color v-model="infor.tab.box.background" title="背景颜色"></my-color>
            <my-number v-model="infor.tab.box.padding" title="内边距"></my-number>
            <my-number v-model="infor.tab.box.zIndex"  title="层级设置"></my-number>
            <!--<my-number v-model="infor.tab.box.marginTop" title="上外边距"></my-number>
            <my-number v-model="infor.tab.box.marginBottom" title="下外边距"></my-number>-->
          </div>

        </el-tab-pane>

        <el-tab-pane label="按钮样式">
          <div class="setOne">
            <my-number v-model="infor.tab.btn.width" title="宽度设置"></my-number>
            <my-number v-model="infor.tab.btn.height" title="高度设置"></my-number>
            <my-color v-model="infor.tab.btn.borderColor" title="边框颜色"></my-color>
            <my-color v-model="infor.tab.btn.background" title="按钮颜色"></my-color>
            <my-color v-model="infor.tab.btn.color" title="文字颜色"></my-color>
          </div>
          <div class="setOne">
            <my-select v-model="infor.tab.btn.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
            <my-number v-model="infor.tab.btn.borderTopWidth" title="上边框宽度"></my-number>
            <my-number v-model="infor.tab.btn.borderLeftWidth" title="左边框宽度"></my-number>
            <my-number v-model="infor.tab.btn.borderRightWidth" title="右边框宽度"></my-number>
            <my-number v-model="infor.tab.btn.borderBottomWidth" title="下边框宽度"></my-number>
          </div>

          <div class="setOne">
            <my-number v-model="infor.tab.btn.fontSize" title="文字大小" :min="12"></my-number>
            <my-select v-model="infor.tab.btn.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
            <my-number v-model="infor.tab.btn.marginRight" title="右边距"></my-number>
            <my-color v-model="infor.tab.btn.lineBackground" title="按钮行颜色"></my-color>
          </div>

        </el-tab-pane>

        <el-tab-pane label="按钮选中样式">
          <div class="setOne">
            <my-color v-model="infor.tab.btnSelect.background" title="背景颜色"></my-color>
            <my-color v-model="infor.tab.btnSelect.color" title="文字颜色"></my-color>
            <my-number v-model="infor.tab.btnSelect.fontSize" title="文字大小" :min="12"></my-number>
          </div>

        </el-tab-pane>

        <el-tab-pane label="内容基础设置">
          <div class="setOne">
            <my-number v-model="infor.tab.content.height" title="最小高度"></my-number>
            <my-color v-model="infor.tab.content.color" title="文字颜色"></my-color>
            <my-number v-model="infor.tab.content.fontSize" title="文字大小" :min="12"></my-number>
            <my-select v-model="infor.tab.content.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
            <my-number v-model="infor.tab.content.lineHeight" title="行高设置"></my-number>
          </div>
          <div class="setOne">
            <my-number v-model="infor.tab.content.padding" title="内容内边距"></my-number>
            <!--<my-number v-model="infor.tab.content.height" title="内容高度"></my-number>-->
          </div>
        </el-tab-pane>

        <el-tab-pane label="内容边距设置">
          <div class="setOne">
            <my-color v-model="infor.tab.content.borderColor" title="边框颜色"></my-color>
            <my-number v-model="infor.tab.content.borderTopWidth" title="上边框宽"></my-number>
            <my-number v-model="infor.tab.content.borderLeftWidth" title="左边框宽"></my-number>
            <my-number v-model="infor.tab.content.borderRightWidth" title="右边框宽"></my-number>
            <my-number v-model="infor.tab.content.borderBottomWidth" title="下边框宽"></my-number>
          </div>
          <div class="setOne">

            <my-select v-model="infor.tab.content.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
            <my-number v-model="infor.tab.content.marginTop" title="内容上边距"></my-number>
            <my-number v-model="infor.tab.content.marginBottom" title="内容下边距"></my-number>
            <my-number v-model="infor.tab.content.marginLeft" title="内容左边距"></my-number>
            <my-number v-model="infor.tab.content.marginRight" title="内容右边距"></my-number>
          </div>

        </el-tab-pane>

        <el-tab-pane label="查看详情/询价设置">
          <div class="setOne">
            <my-select v-model="infor.tab.box.inquiryDisplay" :option="$store.state.options.display" title="询价显示" ></my-select>
            <my-input title="内容设置" v-model="infor.tab.box.text"></my-input>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>



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
      }
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑文章详情组件');

        },
        deep: true
      },
      listArr:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'listArr',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑文章详情组件');
        },
        deep: true
      },
    },
    created(){

    },
    components:{
    },
    methods:{

    },

    mounted(){
      Bus.$on('detailarticle_update_data', ({name,key1,val1,key2,val2}) => {
        if(name === 'tab'){
          this.infor.tab.box[key1] = val1;
          this.infor.tab.box[key2] = val2;
        }
        else{
          this.infor[name][key1] = val1;
          this.infor[name][key2] = val2;
        }

      });
    }
  }
</script>
