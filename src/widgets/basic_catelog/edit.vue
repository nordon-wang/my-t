<template>
  <div class="catelog_edit">

    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">

      <!--<span @click="$store.state.styleSave_IsOpen = true">样式保存</span>-->
      <span @click="templet.p_select_parts('catelog_vertical')"
            class="mouseClass"
            data-Highlight="catelog_vertical"
            :class="[
           $store.state.hover_parts == 'catelog_vertical'  ? 'index_Highlight' : ''
           ]"
      >整体设置</span>

      <span
              @click="templet.p_select_parts('catelog_title')"
              class="mouseClass"
              data-Highlight="catelog_title"
              :class="[
           $store.state.hover_parts == 'catelog_title'  ? 'index_Highlight' : ''
           ]"
      >标题设置</span>


      <span
              @click="templet.p_select_parts('catelog_oneLevel')"
              class="mouseClass"
              data-Highlight="catelog_oneLevel"
              :class="[
           $store.state.hover_parts == 'catelog_oneLevel'  ? 'index_Highlight' : ''
           ]"
      >一级栏目</span>
      <span
              @click="templet.p_select_parts('catelog_twoLevel')"
              class="mouseClass"
              data-Highlight="catelog_twoLevel"
              :class="[
           $store.state.hover_parts == 'catelog_twoLevel'  ? 'index_Highlight' : ''
           ]"
      >二级栏目</span>
      <span
              @click="templet.p_select_parts('catelog_threeLevel')"
              class="mouseClass"
              data-Highlight="catelog_threeLevel"
              :class="[
           $store.state.hover_parts == 'catelog_threeLevel'  ? 'index_Highlight' : ''
           ]"
      >三级栏目</span>
    </div>

    <div class="catelog_vertical" v-if="$store.state.parts == 'catelog_vertical'">
      <el-tabs type="border-card">
        <el-tab-pane label="模式设置">
          <div class="setOne">
            <my-select v-model="infor.modeSelection" :option="$store.state.options.pattern" title="模式选择" ></my-select>
            <b style="margin-left: 10px;line-height: 34px;color: #f00">请选择的样式类型与模式类型相同 。(不要选择竖型的样式，再选择横向模式)</b>
          </div>
          <div class="setOne" v-if="infor.modeSelection == 'vertical'">

            <my-select v-model="infor.animation" :option="$store.state.options.catelog_animation" title="展开动画" ></my-select>
            <my-number v-model="infor.animationTime"  title="动画时间"></my-number>
          </div>
          <div class="setOne" v-if="infor.modeSelection == 'horizontal'">
            <my-select v-model="infor.sort" :option="$store.state.options.sort" title="排列选择" prompt="超出滚动模式下，一级栏目不能自由设置宽度"></my-select>
            <div v-if="infor.sort == 'swiper'" style="display: inline">
              <my-color v-model="infor.btn.color" title="图标颜色"></my-color>
              <my-color v-model="infor.btn.borderColor" title="边框颜色"></my-color>
              <my-number v-model="infor.btn.borderRadius" title="圆角半径"></my-number>
            </div>

          </div>
          <div class="setOne" v-if="infor.sort === 'swiper' && infor.modeSelection ==='horizontal'">
            <my-number v-model="infor.numShow" title="显示个数" :min="1"></my-number>
            <my-number v-model="infor.padding" title="单项间隔"></my-number>
            <my-number v-model="infor.btn.width"  title="按钮宽度"></my-number>
            <my-number v-model="infor.btn.fontSzie"  title="图标大小"></my-number>
            <my-color v-model="infor.btn.background" title="背景颜色"></my-color>
          </div>



        </el-tab-pane>

        <el-tab-pane label="容器设置">
          <div class="setOne">
            <my-number v-model="infor.frameBox"  title="容器宽度"></my-number>
            <my-number v-model="infor.frameHeight"  title="容器高度"></my-number>
            <my-number v-model="infor.box.width"  title="菜单宽度"></my-number>
            <my-number v-model="infor.box.height"  title="菜单高度" v-if="infor.modeSelection == 'vertical'"></my-number>
            <my-color v-model="infor.box.borderColor" title="边框颜色"></my-color>

          </div>

          <div class="setOne">
            <my-select v-model="infor.box.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
            <my-number v-model="infor.box.borderWidth"  title="边框宽度"></my-number>
            <my-color v-model="infor.box.background" title="背景颜色"></my-color>
            <my-number v-model="infor.box.padding"  title="外边距" v-if="infor.sort != 'swiper'"></my-number>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="catelog_title btm_3cols" v-if="$store.state.parts == 'catelog_title'">
      <div class="setOne">
        <my-select v-model="infor.title.display" :option="$store.state.options.display" title="显示/隐藏" ></my-select>
        <my-select v-model="infor.title.fontAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
        <my-select v-model="infor.title.fontWeight" :option="$store.state.options.myFontWeight" title="文字粗细" ></my-select>
      </div>

      <div class="setOne">
        <my-input title="标题设置" v-model="listArr.title.content"></my-input>
        <my-number v-model="infor.title.height" title="标题高度"></my-number>
        <my-number v-model="infor.title.paddingLeft" title="左内边距"></my-number>
      </div>


      <div class="setOne">
        <my-number v-model="infor.title.fontSize"  title="字体大小" :min="12"></my-number>
        <my-color v-model="infor.title.background" title="背景颜色"></my-color>
        <my-color v-model="infor.title.color" title="文字颜色"></my-color>
      </div>
    </div>


    <div class="catelog_oneLevel" v-if="$store.state.parts == 'catelog_oneLevel'">
      <my-module :infor="infor.onelevel" :type="infor.sort" :modeSelection="infor.modeSelection"></my-module>
    </div>

    <div class="catelog_twoLevel" v-if="$store.state.parts == 'catelog_twoLevel'">
      <my-module :infor="infor.twolevel" :type="infor.sort" :modeSelection="infor.modeSelection"></my-module>
    </div>

    <div class="catelog_threeLevel" v-if="$store.state.parts == 'catelog_threeLevel'">
      <my-module :infor="infor.threelevel" :type="infor.sort" :modeSelection="infor.modeSelection"></my-module>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import MyModule from './catelog_module.vue';

  export default {
    name: 'basic_catelog_edit',
    props:{

    },
    data () {
      return {
        infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
        listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr))

      }
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑分类组件');
        },
        deep: true
      },
      listArr:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'listArr',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑分类组件');
        },
        deep: true
      },
    },
    created(){

    },
    components:{
      MyModule
    },
    methods:{

    },

    mounted(){
    }
  }
</script>
