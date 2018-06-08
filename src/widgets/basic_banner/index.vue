<template>
  <!--
  @mouseover.stop="templet.p_index_hover_parts('banner_routine')"
       @mouseout.stop="templet.p_index_out_parts()"
  -->
  <div class="indexBanner mouseClass myTest"
       data-Highlight="banner_routine"
       @dblclick.stop="select_parts('banner_routine','basic_banner')"
       :class="[
       $store.state.module_Data ? $store.state.parts == 'banner_routine' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '' : '',
       $store.state.module_Data ? $store.state.hover_parts == 'banner_routine' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '' : '',
       $store.state.module_Data ? $store.state.parts == 'defaultstyle' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '' : '',
       ]"
       :style="{
           width:infor.bannerSet.width + 'px',
            height:infor.bannerSet.height + 'px'
       }"
  >

    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_banner')">{{templet.p_nameToChinese(name)}}编辑</li>
        <!--<my-tooltip content="动画选择" >
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>-->
        <!--<my-tooltip content="特效选择" >
          <li class="edit_module" @click.stop="select_parts('','public_effects')">
            <span class="el-icon-news"></span>
          </li>
        </my-tooltip>-->
        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_banner','public_defaultStyle')"></li>
        </my-tooltip>
        <my-tooltip content="样式保存" >
          <li class="edit_module el-icon-star-off" @click.stop="select_parts('','');$store.state.styleSave_IsOpen = true"></li>
        </my-tooltip>
        <my-tooltip content="基础设置" >
          <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>


      </ul>
    </div>

    <swiper  ref="mySwiper"
             :options="swiperOption"
             :class="infor.bannerSet.animation === 'coverflow' ? 'coverflow' : ''"
             :style="{
            width:infor.bannerSet.width + 'px',
            height:infor.bannerSet.height + 'px'}"
             v-if="swiper_update && listArr.picList.length > 0"
    >
      <swiper-slide v-for="(val,i) in listArr.picList" :key="i" :style="{
        width:infor.bannerSet.animation === 'coverflow' ? infor.bannerSet.slideWidth + 'px' : '100%',

      }">
        <a :style="{
         height:infor.bannerSet.height + 'px',
        lineHeight:infor.bannerSet.height + 'px',
        }">
          <!-- width:infor.bannerSet.animation === 'coverflow' ? infor.bannerSet.slideWidth + 'px' : '100%'-->
          <img :src="$store.state.domain + val.src" :alt="val.alt" :title='val.alt' class="banner_img">

          <!--<img-effect
            :src="val.src"
            :effectsObj="infor.effectsObj"
            classname="banner_img"
            :styleObj="{
              width:infor.bannerSet.animation === 'coverflow' ? infor.bannerSet.slideWidth + 'px' : infor.bannerSet.width + 'px',
              height:infor.bannerSet.height + 'px',
            }"
          ></img-effect>-->
        </a>
      </swiper-slide>

      <!--点状分页器-->
      <div
        class="swiper-pagination swiper-pagination-bullets mouseClass"
        data-Highlight="banner_page"
        v-show="(infor.pageStyle.type =='point' && infor.bannerSet.pagination == 'block') || (infor.bannerSet.animation === 'coverflow' && infor.bannerSet.pagination == 'block')"
        slot="pagination"

        @dblclick.stop="select_parts('banner_page','basic_banner')"
        :class="[
           $store.state.module_Data ? $store.state.parts == 'banner_page' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'banner_page' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
           ]"
        :style="{
          textAlign:infor.pageStyle.textAlign,
          height:infor.pageStyle.height + 'px',
        }"

      >
      </div>

      <div class="swiper-button-prev mouseClass"
           data-Highlight="banner_btn"
           @dblclick.stop="select_parts('banner_btn','basic_banner')"
           :style="{
                     top:(infor.bannerSet.height-infor.btnStyle.height)/2 + 'px',
                     display:infor.bannerSet.btn,
                     background:infor.btnStyle.background,
                     fontSize:infor.btnStyle.fontSize + 'px',
                     color:infor.btnStyle.color,
                     width:infor.btnStyle.width + 'px',
                     height:infor.btnStyle.height + 'px',
                     textAlign:'center',
                     lineHeight:infor.btnStyle.height + 'px',
                     marginTop:infor.btnStyle.marginTop + 'px',
                     marginLeft:infor.btnStyle.marginLR + 'px',
                     backgroundImage:'none',
                     fontFamily:'FontAwesome',
                     borderRadius:infor.btnStyle.borderRadius + 'px',
                     }"
           :class="[
           infor.btnStyle.leftIcon,
           $store.state.module_Data ? $store.state.parts == 'banner_btn' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'banner_btn' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
           ]"  slot="button-prev"></div>

      <div class="swiper-button-next mouseClass"
           data-Highlight="banner_btn"
           @dblclick.stop="select_parts('banner_btn','basic_banner')"
           :style="{
                     display:infor.bannerSet.btn,
                     top:(infor.bannerSet.height-infor.btnStyle.height)/2 + 'px',
                     background:infor.btnStyle.background,
                     fontSize:infor.btnStyle.fontSize + 'px',
                     color:infor.btnStyle.color,
                     width:infor.btnStyle.width + 'px',
                     height:infor.btnStyle.height + 'px',
                     textAlign:'center',
                     lineHeight:infor.btnStyle.height + 'px',
                     marginTop:infor.btnStyle.marginTop + 'px',
                     marginRight:infor.btnStyle.marginLR + 'px',
                     backgroundImage:'none',
                     fontFamily:'FontAwesome',
                     borderRadius:infor.btnStyle.borderRadius + 'px',
                  }"
           :class="[
           infor.btnStyle.rightIcon,
           $store.state.module_Data ? $store.state.parts == 'banner_btn' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'banner_btn' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
           ]" slot="button-next"></div>

    </swiper>

    <p :style="{
        width:infor.bannerSet.width + 'px',
        height:infor.bannerSet.height + 'px',
        lineHeight:infor.bannerSet.height + 'px',
        textAlign: 'center'
    }" v-if="listArr.picList.length === 0" @dblclick.stop="select_parts('banner_pic','basic_banner')">双击添加图片！</p>

    <!--缩略图分页器-->
    <div class="thumbnail-page mouseClass"
         v-show="infor.pageStyle.type =='thumbnail' && infor.bannerSet.pagination == 'block' && infor.bannerSet.animation != 'coverflow'"
         data-Highlight="banner_page"
         @dblclick.stop="select_parts('banner_page','basic_banner')"
         :style="{
        left:infor.pageStyle.left + 'px',
        bottom:infor.pageStyle.bottom + 'px',
        height:infor.pageStyle.height + 'px',
      }"
         :class="[
           $store.state.module_Data ? $store.state.parts == 'banner_page' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'banner_page' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
           ]"
    >
      <img v-for="(val,i) in listArr.picList"
           :src="$store.state.domain + val.src"
           :style="{
                width:infor.pageStyle.width + 'px',
                height:infor.pageStyle.height + 'px',
                marginLeft:infor.pageStyle.margin + 'px',
                marginRight:infor.pageStyle.margin + 'px',
                borderWidth:infor.pageStyle.borderWidth + 'px',
                borderColor:infor.pageStyle.borderColor,
                borderStyle:'solid'
            }"
      ><!--:class="{'thumbnail-page-select' : index == i}"-->
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'basic_banner',
    props:{
      infor:{
        type:Object,
        default:null,
      },
      listArr:{
        type:Object,
        default:null,
      },
      id:{
        type:String,
        default:'',
      },
      pid:{
        type:String,
        default:'',
      },
      rowType:{
        type:String,
        default:'',
      },
        name:{
            type:String,
            default:''
        },


    },
    data () {
      return {
        index:1,
        update_key:['time','speed','animation','pattern'],
        swiper_update:true,
      }
    },
    computed:{
      swiperOption(){
        return {
          myVm:this,
          loop: true,
          //observer: true,
          //observeParents: true, //时时监听
          direction:this.infor.bannerSet.animation === 'coverflow' ? 'horizontal' : this.infor.bannerSet.pattern,
          effect:this.infor.bannerSet.animation,
          speed : this.infor.bannerSet.speed,
          autoplay: {
            delay: this.infor.bannerSet.time,
            disableOnInteraction: false,
          },
          grabCursor: this.infor.bannerSet.animation === 'coverflow' ? true : false,
          centeredSlides: this.infor.bannerSet.animation === 'coverflow' ? true : false,
          slidesPerView:this.infor.bannerSet.animation === 'coverflow' ? 'auto' : 1,
          cube: {
            slideShadows: true,
            shadow: true,
            shadowOffset: 100,
            shadowScale: 0.6
          },
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier:this.infor.bannerSet.slideModifier,
            slideShadows : true
          },
          simulateTouch:false,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          paginationClickable :true,
          pagination: {
            el: '.swiper-pagination',
          },
          on:{
            slideChange: function(){
              const that = this.passedParams.myVm;
              that.pagination();
            },
          },
        }
      }
    },
    components:{


    },
    watch:{

      'infor.bannerSet':{
        handler: function (val, oldVal) {
            //找出变化的key
          var key = '';
          for(var i in val){
              if(typeof val[i] === 'object'){
                  if(JSON.stringify(val[i]) != JSON.stringify(oldVal[i])){
                      key = i;
                      break;
                  }
              }
              else{
                  if(val[i] != oldVal[i]){
                      key = i;
                      break;
                  }
              }
          }
          if(this.update_key.indexOf(key) > -1){
            this.reset_swiper();
          }
        },
        deep: true
      },
      'listArr.picList'(){
        this.reset_swiper();
      }

    },


    updated:function () {
      this.pagination();
    },

    methods:{
      reset_swiper(){
          this.swiper_update = false;
        this.$nextTick(()=>{
            this.swiper_update = true;
        })
      },
      select_parts(partsName,moduleName){
        this.templet.p_index_select_parts({
          partsName,
          moduleName,
          id:this.id,
          pid:this.pid,
          type:this.rowType
        })
      },

      pagination(){
          $(`#u${this.id}`).find('.swiper-pagination').children('span').css({
              'width':this.infor.pageStyle.width + 'px',
              'height':this.infor.pageStyle.height + 'px',
              'marginRight':this.infor.pageStyle.margin + 'px',
              'marginLeft':this.infor.pageStyle.margin + 'px',
              'borderColor':this.infor.pageStyle.borderColor,
              'background':this.infor.pageStyle.background,
              'borderRadius':this.infor.pageStyle.borderRadius + 'px'

          });

          $(`#u${this.id}`).find('.swiper-pagination').children('.swiper-pagination-bullet-active').css({
              'background':this.infor.pageStyle.selectbackground,
          });

          $(`#u${this.id}`).find('.swiper-slide').children('.swiper-slide-shadow-left').css({
              'background':`rgba(0,0,0,${this.infor.bannerSet.slideOpacity})`,
          });
          $(`#u${this.id}`).find('.swiper-slide').children('.swiper-slide-shadow-right').css({
              'background':`rgba(0,0,0,${this.infor.bannerSet.slideOpacity})`,
          });
         /* $(`#u${this.id}`).find('.coverflow').find('.swiper-slide-duplicate').css({
              'transform':`translate3d(0px, 0px, -${this.infor.bannerSet.slideModifier*100}px)`,
          });*/


      }
    },

    mounted(){

        let timer = setTimeout(()=>{
            this.reset_swiper();
            this.pagination();
            clearTimeout(timer);
        },0)


    }
  }
</script>
<style>
  .swiper-pagination span{
    border-width:1px;
    border-style:solid;
    opacity:1 !important;
  }


</style>
