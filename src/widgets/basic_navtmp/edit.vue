<template>
  <div class="navEdit">

    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">

        <span @click="column_dialog"
              class="mouseClass"
              data-Highlight=""

        >栏目管理</span>
        <span
                @click="templet.p_select_parts('nav_custom')"
                class="mouseClass"
                data-Highlight="nav_custom"
                :class="[
           $store.state.hover_parts == 'nav_custom'  ? 'index_Highlight' : ''
           ]"
        >自定义样式</span>
        <span
                @click="templet.p_select_parts('nav_fixed')"
                class="mouseClass"
                data-Highlight="nav_fixed"
                :class="[
           $store.state.hover_parts == 'nav_fixed'  ? 'index_Highlight' : ''
           ]"
        >固定样式</span>
        <span
                @click="templet.p_select_parts('nav_icon')"
                class="mouseClass"
                data-Highlight="nav_icon"
                :class="[
           $store.state.hover_parts == 'nav_icon'  ? 'index_Highlight' : ''
           ]"
        >图标设置</span>
    </div>

      <my-nav v-if="nav_column"></my-nav>

      <div class="navIconStyleChoice" id="navIconStyleChoice" v-if="$store.state.parts == 'nav_icon'">
          <div class="iconStyleChoice">
              <ul class="iconPositionBtn">
                  <li v-for="val in iconPositionBtn"
                      :class="{'selectBtn': infor.icon.position == val}"
                      @click="positionSelect(val)"></li>
              </ul>
          </div>
          <div class="setOne">
              <my-number v-model="infor.icon.fontSize" title="图标大小"></my-number>
          </div>
          <div class="setOne">
              <my-color v-model="infor.icon.color" title="图标颜色"></my-color>
          </div>
      </div>

      <div class="navStyleChoice" id="navStyleChoice" v-if="$store.state.parts == 'nav_fixed'">
          <div class="Switch" v-if="infor.navCustomStyle" @click="infor.navCustomStyle =!infor.navCustomStyle">
              <i class="el-icon-view"></i>
              <span>点击开启固定样式选择！</span>
          </div>
          <div v-else>
              <swiper :options="swiperOption">
                  <swiper-slide v-for="(val,i) in styleChoiceVal" :key="i">
                      <div class="mychild" :class="{'select':infor.styleChoicIndex == val.styleId}" @click="selectNavStyle(val.styleId,i)">
                          <img :src="val.src">

                      </div>
                  </swiper-slide>

                  <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
          </div>


      </div>

      <div class="navCustomStyleChoice" id="navCustomStyleChoice" v-if="$store.state.parts == 'nav_custom'">
          <div class="Switch" v-if="!infor.navCustomStyle" @click="infor.navCustomStyle =!infor.navCustomStyle">
              <i class="el-icon-view"></i>
              <span>点击开启自定义样式设置！</span>
          </div>
          <div>
              <el-tabs type="border-card">

                  <el-tab-pane label="导航全局状态设置" class="btm_4cols">
                      <div class="setOne">
                          <!--<my-color v-model="infor.style.navBackground" title="背景颜色"></my-color>-->
                          <my-color v-model="infor.style.navLiBackground" title="导航颜色"></my-color>
                          <my-color v-model="infor.style.navColor" title="文字颜色"></my-color>
                          <my-select v-model="infor.style.navFontWeight" title="字体粗细" :option="$store.state.options.myFontWeight"></my-select>
                      </div>

                      <div class="setOne">
                          <my-select v-model="infor.style.navFontAlign" title="字体对齐" :option="$store.state.options.textAlign"></my-select>
                          <my-color v-model="infor.style.navBorderColor" title="分割线颜色"></my-color>
                          <my-select v-model="infor.style.navBorderStyle" title="分割线类型" :option="$store.state.options.borderStyle"></my-select>

                      </div>

                  </el-tab-pane>

                  <el-tab-pane label="导航尺寸设置" class="btm_4cols">
                      <div class="setOne">
                          <my-number v-model="infor.style.navOneWidth" title="栏目宽度"></my-number>
                          <my-number v-model="infor.style.navWidth" title="整体宽度"></my-number>
                          <my-number v-model="infor.style.navHeight" title="导航高度"></my-number>
                          <my-number v-model="infor.style.navFontSize" title="文字大小" :min="12"></my-number>
                      </div>
                  </el-tab-pane>

                  <el-tab-pane label="导航选中状态设置" class="btm_4cols">
                      <div class="setOne">
                          <my-color v-model="infor.navSelectStyle.navSelectBackground" title="选中背景"></my-color>
                          <my-color v-model="infor.navSelectStyle.navSelectColor" title="选中文字色"></my-color>
                          <my-number v-model="infor.navSelectStyle.navSelectFontSize" title="选中文字大小"></my-number>
                      </div>
                  </el-tab-pane>

                  <el-tab-pane label="下拉菜单默认设置" class="btm_4cols">
                      <div class="setOne">
                          <my-color v-model="infor.dropDownStyle.dropDownBackground" title="背景颜色"></my-color>
                          <my-number v-model="infor.dropDownStyle.opacity" :max="1" :min="0" title="透明度" :step="0.1"></my-number>
                          <my-number v-model="infor.dropDownStyle.dropDownFontSize" title="文字大小" :min="12"></my-number>
                          <my-color v-model="infor.dropDownStyle.dropDownColor" title="文字颜色"></my-color>

                      </div>
                      <div class="setOne">
                          <my-number v-model="infor.dropDownStyle.dropDownHeight" title="高度设置"></my-number>
                          <my-number v-model="infor.dropDownStyle.navMarginTopHeight" title="上边距"></my-number>
                          <my-number v-model="infor.dropDownStyle.navMarginBottomHeight" title="底部边距"></my-number>
                      </div>

                  </el-tab-pane>

                  <el-tab-pane label="下拉菜单背景设置" class="btm_4cols">
                      <div class="setOne">
                          <my-img v-model="infor.dropDownStyle.dropDownBackgroundImage"></my-img>

                          <my-select v-model="infor.dropDownStyle.isRepeat" title="背景重复" :option="$store.state.options.backgroundRepeat"></my-select>
                      </div>


                  </el-tab-pane>

                  <el-tab-pane label="下拉菜单选中设置" class="btm_4cols">
                    <div class="setOne">
                        <my-color v-model="infor.dropDownSelectStyle.dropDownSelectBackground" title="选中颜色"></my-color>
                        <my-color v-model="infor.dropDownSelectStyle.dropDownSelectColor" title="文字颜色"></my-color>
                        <my-number v-model="infor.dropDownSelectStyle.dropDownSelectFontSize" title="文字大小" :min="12"></my-number>
                        <my-number v-model="infor.dropDownSelectStyle.height" title="选中高度"></my-number>
                    </div>
                      <div class="setOne">
                          <my-number v-model="infor.dropDownSelectStyle.opacity" :max="1" :min="0" title="透明度" :step="0.1"></my-number>
                      </div>
                  </el-tab-pane>
              </el-tabs>

          </div>
      </div>
  </div>
</template>

<script>
  import style from './style';
  import FixedStyle from './fixed_style';

  import MyNav from './nav_column';



  export default {
    name: 'basic_banner_edit',
    props:{

    },
    data () {
      return {
        infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
        listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
        nav_column:false,//栏目管理弹框
        iconPositionBtn:['top-left','top-center','top-right','center-left','center-center','center-right','bottom-left','bottom-center','bottom-right'],
        swiperOption: {
              slidesPerView: 3,
              spaceBetween :10,
              pagination: {
                  el: '.swiper-pagination',
                  clickable: true
              }
          },
          swiperNav:{
              pagination: {
                  el: '.nav-swiper-pagination',
                  clickable: true
              }
          },
          styleChoiceVal:FixedStyle,


      }
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑导航组件');
        },
        deep: true
      },
      listArr:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'listArr',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑导航组件');
        },
        deep: true
      },
    },
    created(){

    },
    components:{
        MyNav
    },
    methods:{
        column_dialog(){

            this.templet.p_select_parts('');
            this.nav_column = true;
        },
      del_pic(i){
        this.listArr.picList.splice(i,1);
      },
      handleClose(){
        this.temporaryPicInfor.src = '';
        this.temporaryPicInfor.link = '';
        this.temporaryPicInfor.alt = '';
        this.temporaryPicInfor.openMode = '_blank';
        this.visible = false;
      },
      //图片选择
      selePic(){
        const that = this;
        this.$store.state.showPicCon = true;
        this.$store.state.imgUrls = function (val) {
          that.temporaryPicInfor.src = val.src;
        }
      },
      addPic:function () {
        var obj = {
          src:'static/image/pic.png',
          link:'',
          alt:'',
          openMode:'_blank',
        };
        this.listArr.picList.unshift(obj);
      },
      editSure(){
        const index = this.editIndex;//编辑的index
        const edit_one = JSON.parse(JSON.stringify(this.temporaryPicInfor));//编辑的那个
        let list = JSON.parse(JSON.stringify(this.listArr.picList));
        list[index] = edit_one;
        this.listArr.picList = list;
        this.visible = false;
      },
      edit_pic(val,i){
        this.visible = true;
        this.editIndex = i;
        this.temporaryPicInfor = JSON.parse(JSON.stringify(val));
      },
        //icon位置选择
        positionSelect:function (p) {
            this.infor.icon.position = p;
        },
        //默认样式选择
        selectNavStyle:function (id,i) {
            this.infor.styleId = id;
            this.infor.styleChoicIndex = id;
        },
    },

    mounted(){

    }
  }
</script>
