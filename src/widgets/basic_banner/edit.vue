<template>
  <div class="bannerEdit">

    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">

      <!--<span @click="$store.state.styleSave_IsOpen = true">样式保存</span>-->
      <span @click="openPicSet"
            class="mouseClass"
            data-Highlight="banner_pic"
      >图片管理</span>
      <span
              @click="templet.p_select_parts('banner_routine')"
              class="mouseClass"
              data-Highlight="banner_routine"
              :class="[
           $store.state.hover_parts == 'banner_routine'  ? 'index_Highlight' : ''
           ]"
      >常规设置</span>
      <span
              @click="templet.p_select_parts('banner_btn')"
              class="mouseClass"
              data-Highlight="banner_btn"
              :class="[
           $store.state.hover_parts == 'banner_btn'  ? 'index_Highlight' : ''
           ]"
      >按钮设置</span>
      <span
              @click="templet.p_select_parts('banner_page')"
              class="mouseClass"
              data-Highlight="banner_page"
              :class="[
           $store.state.hover_parts == 'banner_page'  ? 'index_Highlight' : ''
           ]"
      >分页器设置</span>
    </div>

    <!--常规设置-->
    <div class="Routine_setting" v-show="$store.state.parts == 'banner_routine'">
      <el-alert
              title="相册效果，缩放效果法在可视化中显示，请以预览效果为准！"
              type="warning"
              show-icon
              v-if="infor.bannerSet.animation === 'coverflow'"
      >
      </el-alert>
      <div class="setOne">
        <my-number v-model="infor.bannerSet.width" title="图片宽度"></my-number>
        <my-number v-model="infor.bannerSet.height" title="图片高度"></my-number>
        <my-number v-model="infor.bannerSet.time" title="切换时间"></my-number>
        <my-number v-model="infor.bannerSet.speed" title="动画速度"></my-number>
        <my-select v-model="infor.bannerSet.animation" title="动画效果" :option="$store.state.options.banner_nimation"></my-select>
      </div>



      <div class="setOne" v-if="infor.bannerSet.animation === 'coverflow'">
        <my-number v-model="infor.bannerSet.slideWidth" title="卡片宽度"></my-number>
        <my-number v-model="infor.bannerSet.slideOpacity" title="透明度" :step="0.1" :min="0" :max="1"></my-number>
        <my-number v-model="infor.bannerSet.slideModifier" title="缩放比"></my-number>
      </div>

      <div class="setOne">
        <my-select v-model="infor.bannerSet.pattern" title="动画模式" :option="$store.state.options.pattern" v-if="infor.bannerSet.animation != 'coverflow'"></my-select>
      </div>


    </div>

    <!--左右按钮-->
    <div class="btn_setting btm_4cols" v-if="$store.state.parts == 'banner_btn'">

      <div class="setOne">
        <my-select v-model="infor.bannerSet.btn" title="左右按钮" :option="$store.state.options.twoBtn"></my-select>
        <my-number v-model="infor.btnStyle.width" title="按钮宽度"></my-number>
        <my-number v-model="infor.btnStyle.height" title="按钮高度"></my-number>
        <my-number v-model="infor.btnStyle.marginTop" title="上边距" :min="-1000"></my-number>

      </div>

      <div class="setOne">
        <my-number v-model="infor.btnStyle.marginLR" title="左右边距" :min="-1000"></my-number>
        <my-color v-model="infor.btnStyle.color" title="图标颜色"></my-color>
        <my-color v-model="infor.btnStyle.background" title="图标背景色"></my-color>
        <my-number v-model="infor.btnStyle.fontSize" title="图标大小"></my-number>
      </div>

      <div class="setOne">
        <my-icon v-model="infor.btnStyle.leftIcon" title="左按钮选择"></my-icon>
        <my-icon v-model="infor.btnStyle.rightIcon" title="右按钮选择"></my-icon>
        <my-number v-model="infor.btnStyle.borderRadius" title="圆角半径"></my-number>

      </div>
    </div>

    <!--分页器-->
    <div class="page_setting" v-if="$store.state.parts == 'banner_page'">
      <el-alert
              title="相册效果下，只能使用点状分页器！"
              type="warning"
              show-icon
              v-if="infor.bannerSet.animation === 'coverflow'"
      >
      </el-alert>
      <div class="setOne">
        <my-select v-model="infor.bannerSet.pagination" title="显示/隐藏" :option="$store.state.options.twoBtn"></my-select>
        <my-select v-model="infor.pageStyle.type" title="类型" :option="$store.state.options.pageType"  v-if="infor.bannerSet.animation != 'coverflow'"></my-select>
        <my-number v-model="infor.pageStyle.margin" title="左右间距："></my-number>
        <my-number v-model="infor.pageStyle.width" title="宽度"></my-number>
        <my-number v-model="infor.pageStyle.height" title="高度"></my-number>
      </div>

      <div class="setOne" v-if="infor.pageStyle.type == 'thumbnail'">

        <my-number v-model="infor.pageStyle.left" title="靠左距离"></my-number>
        <my-number v-model="infor.pageStyle.bottom" title="靠下距离"></my-number>
        <my-number v-model="infor.pageStyle.borderWidth" title="边框宽度"></my-number>
      </div>

      <div class="setOne" v-if="infor.pageStyle.type == 'point'">
        <my-color v-model="infor.pageStyle.background" title="默认颜色"></my-color>
        <my-color v-model="infor.pageStyle.selectbackground" title="选中颜色"></my-color>
        <my-number v-model="infor.pageStyle.borderRadius" title="圆角半径"></my-number>
        <my-select v-model="infor.pageStyle.textAlign" :option="$store.state.options.textAlign" title="分页器位置" v-if="infor.bannerSet.pattern === 'horizontal'"></my-select>
      </div>

      <div class="setOne">
        <my-color v-model="infor.pageStyle.borderColor" title="边框颜色"></my-color>
      </div>

    </div>

    <!--图片管理-->
    <div class="pic_admin" v-if="$store.state.parts == 'banner_pic'">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(val,i) in listArr.picList" :key="i">
          <div class="child">
            <div class="imgFrame">
              <p @click="selePic(val)" class="click_btn">点击选择图片</p>
              <my-thumbnail
                  :src="$store.state.domain + val.src"
                  :is-mongolia="false"
                  :is-max="true"
                  :radius="0"
              ></my-thumbnail>
            </div>
            <p class="edit">
              <i class="el-icon-edit" @click="edit_pic(val,i)"></i>
              <i class="el-icon-delete" @click="del_pic(i)"></i>
            </p>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="addPic" @click="addPic()">
            <i class="el-icon-plus"></i>
          </div>
        </swiper-slide>


        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>


    <div class="banner_pic_edit" v-if="visible">
      <el-dialog
        title="图片编辑"
        :modal-append-to-body="false"
        :before-close="handleClose"
        :visible="true">
        <div class="pic_edi_frame">
          <!--<div class="addStyle_imgFrame">
            <img :src="temporaryPicInfor.src">
          </div>-->
          <div class="setOne">
            <my-select v-model="temporaryPicInfor.openMode" title="打开方式" :option="$store.state.options.open"></my-select>
          </div>
          <div class="setOne">
            <my-input v-model="temporaryPicInfor.link" title="跳转链接"></my-input>
          </div>
          <div class="setOne">
            <my-input v-model="temporaryPicInfor.alt" title="图片说明"></my-input>
          </div>


        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="editSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>



  </div>
</template>

<script type="text/ecmascript-6">


  export default {
    name: 'basic_banner_edit',
    props:{

    },
    data () {
      return {
        infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
        listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
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
          this.templet.module_add_historical('编辑轮播图组件');
        },
        deep: true
      },
      listArr:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'listArr',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑轮播图组件');
        },
        deep: true
      },
    },
    created(){

    },
    components:{
    },
    methods:{
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
      selePic(data){
        const that = this;
        this.$store.state.showPicCon = true;
        this.$store.state.imgUrls = function (val) {
          data.src = val.src;
        };


      },
      addPic:function () {
        var obj = {
          src:'static/image/pic.png',
          link:'',
          alt:'',
          openMode:'_blank',
        };
        this.listArr.picList.push(obj);
        this.$nextTick(()=>{
          this.$refs.mySwiper.swiper.slideTo(this.listArr.picList.length-4,1000,false)
        })

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
      openPicSet(){
        this.templet.p_select_parts('banner_pic');
        //this.templet.p_index_out_parts();
        this.$nextTick(()=>{
          this.$refs.mySwiper.swiper.slideTo(this.listArr.picList.length-4,1000,false);
        })
      }
    },

    mounted(){}
  }
</script>
