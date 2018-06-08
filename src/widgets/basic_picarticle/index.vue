<template>
  <div class="basic_picarticle_a  basic_picarticle_old">
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>
    <div id="productList" :style="{ width:infor.patternWidth + 'px'}">
      <div class="Prompt">此为旧版图文展示挂件，无法使用新版功能，请删除此挂件，并使用新版图文展示，以达到更好的体验！</div>

      <div class="productListTitle" :style="{ display:infor.header.display}">
        <h1 v-text="infor.header.name"
            :style="{
              height:infor.header.height + 'px',
              fontSize:infor.header.fontSize + 'px',
              color:infor.header.color,
              textAlign:infor.header.textAlign,
              lineHeight:infor.header.height + 'px',
          }"></h1>
      </div>
      <!--无分类模式下-->
      <div id="picSwiper-noClass" v-if="!infor.classOpen" class="picSwiper" :style="{
                height:infor.patternHeight + 'px',
                padding:infor.patternPadding + 'px',
                borderStyle:infor.patternBorderType,
                borderColor:infor.patternBordercolor,
                borderWidth:infor.patternBorderSize + 'px',
                }">

        <swiper  ref="mySwiper" :options="swiperOption" :style="{height:infor.patternHeight + 'px'}" v-if="swiper_update">
          <swiper-slide v-for="(val,i) in views" :key="i" :style="{
                height:infor.model.height + 'px',
            }">
            <div class="border" :style="{
                      background:infor.model.background,
                      borderStyle:infor.model.borderStyle,
                      borderTopColor:infor.model.borderTopColor,
                      borderBottomColor:infor.model.borderBottomColor,
                      borderLeftColor:infor.model.borderLeftColor,
                      borderRightColor:infor.model.borderRightColor,
                      borderWidth:'1px',
                      }">
              <a>
                <img :src="val.src" :style="{
                      width:infor.pic.width + 'px',
                      height:infor.pic.height + 'px',
                      marginTop:infor.pic.marginTop + 'px',
                      marginLeft:infor.pic.marginLeft + 'px',
                      marginRight:infor.pic.marginRight + 'px',
                      marginBottom:infor.pic.marginBottom + 'px',
                      display:infor.pic.display}">
                <!--部分旧模板是没有这个属性的，没有就不渲染-->
                <h1 :style="{
                      width:infor.classTitle.width + 'px',
                      height:infor.classTitle.height + 'px',
                      lineHeight:infor.classTitle.height + 'px',
                      fontSize:infor.classTitle.fontSize + 'px',
                      color:infor.classTitle.color,
                      textAlign:infor.classTitle.textAlign,
                      marginTop:infor.classTitle.marginTop + 'px',
                      marginLeft:infor.classTitle.marginLeft + 'px',
                      marginRight:infor.classTitle.marginRight + 'px',
                      marginBottom:infor.classTitle.marginBottom + 'px',
                      display:infor.classTitle.display,
                      borderLeftWidth:infor.classTitle.borderLeftWidth + 'px',
                      borderRightWidth:infor.classTitle.borderRightWidth + 'px',
                      borderTopWidth:infor.classTitle.borderTopWidth + 'px',
                      borderBottomWidth:infor.classTitle.borderBottomWidth + 'px',
                      borderColor:infor.classTitle.borderColor,
                      borderStyle:infor.classTitle.borderStyle,
                      paddingLeft:infor.classTitle.paddingLeft + 'px',
                      borderRadius:infor.classTitle.borderRadius + 'px',
                      background:infor.classTitle.background,
                      }"
                    v-if="infor.classTitle"
                    v-text="val.type_name"></h1>
                <i v-text="i + 1" :style="{
                      width:infor.sequence.width + 'px',
                      height:infor.sequence.height + 'px',
                      lineHeight:infor.sequence.height + 'px',
                      fontSize:infor.sequence.fontSize + 'px',
                      color:infor.sequence.color,
                      textAlign:infor.sequence.textAlign,
                      margin:infor.sequence.margin + 'px',
                      display:infor.sequence.display,
                      borderLeftWidth:infor.sequence.borderLeftWidth + 'px',
                      borderRightWidth:infor.sequence.borderRightWidth + 'px',
                      borderTopWidth:infor.sequence.borderTopWidth + 'px',
                      borderBottomWidth:infor.sequence.borderBottomWidth + 'px',
                      borderColor:infor.sequence.borderColor,
                      borderStyle:infor.sequence.borderStyle,
                      }"></i>

                <b v-text="val.title" :style="{
                      width:infor.title.width + 'px',
                      height:infor.title.height + 'px',
                      fontSize:infor.title.fontSize + 'px',
                      color:infor.title.color,
                      textAlign:infor.title.textAlign,
                      margin:infor.title.margin + 'px',
                      display:infor.title.display,
                      borderLeftWidth:infor.title.borderLeftWidth + 'px',
                      borderRightWidth:infor.title.borderRightWidth + 'px',
                      borderTopWidth:infor.title.borderTopWidth + 'px',
                      borderBottomWidth:infor.title.borderBottomWidth + 'px',
                      borderColor:infor.title.borderColor,
                      borderStyle:infor.title.borderStyle,
                      paddingLeft:infor.title.paddingLeft + 'px',
                      borderRadius:infor.title.borderRadius + 'px'
                      }"></b>

                <!--处理两种时间-->

                <span v-text="val.time" :style="{
                      width:infor.time.width + 'px',
                      height:infor.time.height + 'px',
                      lineHeight:infor.time.height + 'px',
                      fontSize:infor.time.fontSize + 'px',
                      color:infor.time.color,
                      textAlign:infor.time.textAlign,
                      margin:infor.time.margin + 'px',
                      display:infor.time.display,
                       background:infor.time.background
                      }"
                      v-if="infor.time.timePattern =='ordinary'"></span>

                <div class="UpAndDownTime" :style="{
                      width:infor.time.width + 'px',
                      height:infor.time.height + 'px',
                      marginTop:infor.time.marginTop + 'px',
                      marginLeft:infor.time.marginLeft + 'px',
                      marginRight:infor.time.marginRight + 'px',
                      marginBottom:infor.time.marginBottom + 'px',
                      display:infor.time.display,
                      background:infor.time.background
                      }" v-if="infor.time.timePattern =='UpAndDown'">
                  <p :style="{
                      height:infor.time.day_line_height + 'px',
                      lineHeight:infor.time.day_line_height + 'px',
                      fontSize:infor.time.day_fontsize + 'px',
                      color:infor.time.color,
                      }">{{val.time|myYear}}</p>
                  <em :style="{
                      height:infor.time.year_line_height + 'px',
                      lineHeight:infor.time.year_line_height + 'px',
                      fontSize:infor.time.year_fontsize + 'px',
                      color:infor.time.color,
                      }">{{val.time|myYear}}</em>

                </div>


                <strong :style="{
                    width:infor.content.width + 'px',
                    height:infor.content.height + 'px',
                    fontSize:infor.content.fontSize + 'px',
                    color:infor.content.color,
                    textAlign:infor.content.textAlign,
                    margin:infor.content.margin + 'px',
                    lineHeight:infor.content.lineHeight + 'px',
                    display:infor.content.display
                    }">{{val.content|my_picarticle(infor.content.textLength)}}</strong>
              </a>
            </div>

            <!--<div class="Mongolia"
                 v-if="infor.Mongolia.isOpen === 'true'"
                 :style="{
                     display:($store.state.hover_parts == 'mongolia_layer' || $store.state.parts == 'mongolia_layer') && $store.state.module_Data.widgets_id == id ? 'block' : 'none'
                 }">
              <a>
                <div>
                  <p>
                    <strong>
                      <b :style="{
                            fontFamily: 'FontAwesome',
                            lineHeight:infor.MongoliaIcon.fontSize + 'px',
                            height:infor.MongoliaIcon.fontSize + 'px',
                            fontSize:infor.MongoliaIcon.fontSize + 'px',
                            color:infor.MongoliaIcon.color}"
                         :class="infor.MongoliaIcon.icon" v-if="infor.MongoliaIcon.display == 'block'"></b>
                      <i :style="{
                            lineHeight:infor.MongoliaTitle.lineHeight + 'px',
                            width:infor.MongoliaTitle.width + 'px',
                            height:infor.MongoliaTitle.height + 'px',
                            fontSize:infor.MongoliaTitle.fontSize + 'px',
                            fontFamily:infor.MongoliaTitle.fontFamily,
                            color:infor.MongoliaTitle.color}" v-text="val.title" v-if="infor.MongoliaTitle.display == 'block'"></i>
                      <em :style="{
                            lineHeight:infor.MongoliaContent.lineHeight + 'px',
                            width:infor.MongoliaContent.width + 'px',
                            height:infor.MongoliaContent.height + 'px',
                            fontSize:infor.MongoliaContent.fontSize + 'px',
                            fontFamily:infor.MongoliaContent.fontFamily,
                            color:infor.MongoliaContent.color}" v-text="val.content" v-if="infor.MongoliaContent.display == 'block'"></em>

                    </strong>

                  </p>

                </div>
                <span :style="{opacity:infor.Mongolia.opacity,background:infor.Mongolia.background,}"></span>
              </a>
            </div>-->
          </swiper-slide>
        </swiper>

        <div class="banner-btn banner-btn-prev"
             :style="{
            display:infor.btnStyle.display,
            width:infor.btnStyle.width + 'px',
            height:infor.btnStyle.height + 'px',
            color:infor.btnStyle.color,
            background:infor.btnStyle.background,
            fontSize:infor.btnStyle.fontSize + 'px',
            top:infor.btnStyle.top + 'px',
            left:infor.btnStyle.left + 'px',
            lineHeight:infor.btnStyle.height + 'px',}"></div>

        <div class="banner-btn banner-btn-next"
             :style="{
            display:infor.btnStyle.display,
            width:infor.btnStyle.width + 'px',
            height:infor.btnStyle.height + 'px',
            color:infor.btnStyle.color,
            background:infor.btnStyle.background,
            fontSize:infor.btnStyle.fontSize + 'px',
            top:infor.btnStyle.top + 'px',
            right:infor.btnStyle.left + 'px',
            lineHeight:infor.btnStyle.height + 'px',
        }"></div>
      </div>

      <!--分类模式下-->
      <div class="classSwiper picSwiper" v-if="infor.classOpen">
        <ul class="classSwiperBox" :style="{
                        width:infor.classStyle.boxWidth + 'px',
                        height:infor.classStyle.boxHeight + 'px',
                        marginLeft:infor.classStyle.boxMarginLeft + 'px',
                    }">
          <li
                  v-for="(val,i) in listArr.classArr"
                  @mouseover="openSwiper(i)"
                  @click="openSwiper(i)"
                  v-text="val.value"
                  :style="{
                      width:infor.classStyle.width + 'px',
                      height:infor.classStyle.height + 'px',
                      lineHeight:infor.classStyle.height + 'px',
                      background:infor.classStyle.background,
                      marginLeft:infor.classStyle.margin + 'px',
                      marginRight:infor.classStyle.margin + 'px',
                      borderColor:infor.classStyle.borderColor,
                      fontSize:infor.classStyle.fontSize + 'px',
                      color:infor.classStyle.color,
                  }"></li>
        </ul>
        <div id="picSwiper-Class" :style="{
                    height:infor.patternHeight + 'px',
                    borderStyle:infor.patternBorderType,
                    borderColor:infor.patternBordercolor,
                    borderWidth:infor.patternBorderSize + 'px',
          }">

          <swiper  ref="mySwiper" :options="swiperOption" :style="{height:infor.patternHeight + 'px'}" v-if="swiper_update">
            <swiper-slide v-for="(val,i) in listArr.classArr[classIndex].listArr" :key="i" :style="{
                height:infor.model.height + 'px',
            }">
              <div class="border" :style="{
                      background:infor.model.background,
                      borderStyle:infor.model.borderStyle,
                      borderTopColor:infor.model.borderTopColor,
                      borderBottomColor:infor.model.borderBottomColor,
                      borderLeftColor:infor.model.borderLeftColor,
                      borderRightColor:infor.model.borderRightColor,
                      borderWidth:'1px',
                      }">
                <a>
                  <img :src="val.src" :style="{
                      width:infor.pic.width + 'px',
                      height:infor.pic.height + 'px',
                      marginTop:infor.pic.marginTop + 'px',
                      marginLeft:infor.pic.marginLeft + 'px',
                      marginRight:infor.pic.marginRight + 'px',
                      marginBottom:infor.pic.marginBottom + 'px',
                      display:infor.pic.display}">
                  <h1 :style="{
                      width:infor.classTitle.width + 'px',
                      height:infor.classTitle.height + 'px',
                      lineHeight:infor.classTitle.height + 'px',
                      fontSize:infor.classTitle.fontSize + 'px',
                      color:infor.classTitle.color,
                      textAlign:infor.classTitle.textAlign,
                      marginTop:infor.classTitle.marginTop + 'px',
                      marginLeft:infor.classTitle.marginLeft + 'px',
                      marginRight:infor.classTitle.marginRight + 'px',
                      marginBottom:infor.classTitle.marginBottom + 'px',
                      display:infor.classTitle.display,
                      borderLeftWidth:infor.classTitle.borderLeftWidth + 'px',
                      borderRightWidth:infor.classTitle.borderRightWidth + 'px',
                      borderTopWidth:infor.classTitle.borderTopWidth + 'px',
                      borderBottomWidth:infor.classTitle.borderBottomWidth + 'px',
                      borderColor:infor.classTitle.borderColor,
                      borderStyle:infor.classTitle.borderStyle,
                      paddingLeft:infor.classTitle.paddingLeft + 'px',
                      borderRadius:infor.classTitle.borderRadius + 'px',
                      background:infor.classTitle.background,
                      }"
                      v-text="val.type_name"
                      v-if="infor.classTitle"></h1>
                  <i v-text="i + 1" :style="{
                      width:infor.sequence.width + 'px',
                      height:infor.sequence.height + 'px',
                      lineHeight:infor.sequence.height + 'px',
                      fontSize:infor.sequence.fontSize + 'px',
                      color:infor.sequence.color,
                      textAlign:infor.sequence.textAlign,
                      margin:infor.sequence.margin + 'px',
                      display:infor.sequence.display,
                      borderLeftWidth:infor.sequence.borderLeftWidth + 'px',
                      borderRightWidth:infor.sequence.borderRightWidth + 'px',
                      borderTopWidth:infor.sequence.borderTopWidth + 'px',
                      borderBottomWidth:infor.sequence.borderBottomWidth + 'px',
                      borderColor:infor.sequence.borderColor,
                      borderStyle:infor.sequence.borderStyle,
                      }"></i>

                  <b v-text="val.title" :style="{
                      width:infor.title.width + 'px',
                      height:infor.title.height + 'px',
                      fontSize:infor.title.fontSize + 'px',
                      color:infor.title.color,
                      textAlign:infor.title.textAlign,
                      margin:infor.title.margin + 'px',
                      display:infor.title.display,
                      borderLeftWidth:infor.title.borderLeftWidth + 'px',
                      borderRightWidth:infor.title.borderRightWidth + 'px',
                      borderTopWidth:infor.title.borderTopWidth + 'px',
                      borderBottomWidth:infor.title.borderBottomWidth + 'px',
                      borderColor:infor.title.borderColor,
                      borderStyle:infor.title.borderStyle,
                      paddingLeft:infor.title.paddingLeft + 'px',
                      borderRadius:infor.title.borderRadius + 'px'
                      }"></b>

                  <!--处理两种时间-->

                  <span v-text="val.time" :style="{
                      width:infor.time.width + 'px',
                      height:infor.time.height + 'px',
                      lineHeight:infor.time.height + 'px',
                      fontSize:infor.time.fontSize + 'px',
                      color:infor.time.color,
                      textAlign:infor.time.textAlign,
                      margin:infor.time.margin + 'px',
                      display:infor.time.display,
                       background:infor.time.background
                      }"
                        v-if="infor.time.timePattern =='ordinary'"></span>

                  <div class="UpAndDownTime" :style="{
                      width:infor.time.width + 'px',
                      height:infor.time.height + 'px',
                      marginTop:infor.time.marginTop + 'px',
                      marginLeft:infor.time.marginLeft + 'px',
                      marginRight:infor.time.marginRight + 'px',
                      marginBottom:infor.time.marginBottom + 'px',
                      display:infor.time.display,
                      background:infor.time.background
                      }" v-if="infor.time.timePattern =='UpAndDown'">
                    <p :style="{
                      height:infor.time.day_line_height + 'px',
                      lineHeight:infor.time.day_line_height + 'px',
                      fontSize:infor.time.day_fontsize + 'px',
                      color:infor.time.color,
                      }">{{val.time|myYear}}</p>
                    <em :style="{
                      height:infor.time.year_line_height + 'px',
                      lineHeight:infor.time.year_line_height + 'px',
                      fontSize:infor.time.year_fontsize + 'px',
                      color:infor.time.color,
                      }">{{val.time|myYear}}</em>

                  </div>


                  <strong :style="{
                    width:infor.content.width + 'px',
                    height:infor.content.height + 'px',
                    fontSize:infor.content.fontSize + 'px',
                    color:infor.content.color,
                    textAlign:infor.content.textAlign,
                    margin:infor.content.margin + 'px',
                    lineHeight:infor.content.lineHeight + 'px',
                    display:infor.content.display
                    }">{{val.content|my_picarticle(infor.content.textLength)}}</strong>
                </a>
              </div>

              <!--<div class="Mongolia"
                   v-if="infor.Mongolia.isOpen === 'true'"
                   :style="{
                     display:($store.state.hover_parts == 'mongolia_layer' || $store.state.parts == 'mongolia_layer') && $store.state.module_Data.widgets_id == id ? 'block' : 'none'
                 }">
                <a>
                  <div>
                    <p>
                      <strong>
                        <b :style="{
                            fontFamily: 'FontAwesome',
                            lineHeight:infor.MongoliaIcon.fontSize + 'px',
                            height:infor.MongoliaIcon.fontSize + 'px',
                            fontSize:infor.MongoliaIcon.fontSize + 'px',
                            color:infor.MongoliaIcon.color}"
                           :class="infor.MongoliaIcon.icon" v-if="infor.MongoliaIcon.display == 'block'"></b>
                        <i :style="{
                            lineHeight:infor.MongoliaTitle.lineHeight + 'px',
                            width:infor.MongoliaTitle.width + 'px',
                            height:infor.MongoliaTitle.height + 'px',
                            fontSize:infor.MongoliaTitle.fontSize + 'px',
                            fontFamily:infor.MongoliaTitle.fontFamily,
                            color:infor.MongoliaTitle.color}" v-text="val.title" v-if="infor.MongoliaTitle.display == 'block'"></i>
                        <em :style="{
                            lineHeight:infor.MongoliaContent.lineHeight + 'px',
                            width:infor.MongoliaContent.width + 'px',
                            height:infor.MongoliaContent.height + 'px',
                            fontSize:infor.MongoliaContent.fontSize + 'px',
                            fontFamily:infor.MongoliaContent.fontFamily,
                            color:infor.MongoliaContent.color}" v-text="val.content" v-if="infor.MongoliaContent.display == 'block'"></em>

                      </strong>

                    </p>

                  </div>
                  <span :style="{opacity:infor.Mongolia.opacity,background:infor.Mongolia.background,}"></span>
                </a>
              </div>-->
            </swiper-slide>
          </swiper>


          <div class="banner-btn banner-btn-prev"
               :style="{
            display:infor.btnStyle.display,
            width:infor.btnStyle.width + 'px',
            height:infor.btnStyle.height + 'px',
            color:infor.btnStyle.color,
            background:infor.btnStyle.background,
            fontSize:infor.btnStyle.fontSize + 'px',
            top:infor.btnStyle.top + 'px',
            left:infor.btnStyle.left + 'px',
            lineHeight:infor.btnStyle.height + 'px',}"></div>

          <div class="banner-btn banner-btn-next"
               :style="{
            display:infor.btnStyle.display,
            width:infor.btnStyle.width + 'px',
            height:infor.btnStyle.height + 'px',
            color:infor.btnStyle.color,
            background:infor.btnStyle.background,
            fontSize:infor.btnStyle.fontSize + 'px',
            top:infor.btnStyle.top + 'px',
            right:infor.btnStyle.left + 'px',
            lineHeight:infor.btnStyle.height + 'px',
        }"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'basic_picarticle_a',
    props:{
      infor:{
        type:Object,
        default:null,
      },
      listArr:{
        type:Object,
        default:function () {
            return {}
        },
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


    },
    data () {
      return {
          isShow:false,
          classSwiperVal:[], //初始化是第一分类的数据
          classIndex:0,
          picSwiper:{},
          swiper_update:true,
          update_key:['pattern','loop','patternSpace','patternSlidesPerView','patternSlidesRow'],
          views:[],
        loading:false


      }
    },
      computed:{
          swiperOption(){
              return {
                  loop: this.infor.loop ? this.infor.loop == 'true' ? true : false : false,
                  slidesPerView: this.infor.patternSlidesPerView, //同时显示数量
                  spaceBetween: this.infor.patternSpace, //间距
                  direction: this.infor.pattern,//模式选择
                  autoplay: this.infor.patternAutoplay,
                  autoplayDisableOnInteraction: false,
                  observer: true,
                  observeParents: true, //时时监听
                  simulateTouch : false,
                  slidesPerColumn : this.infor.pattern == 'horizontal' ? this.infor.patternSlidesRow : 1,
                  //slidesPerColumnFill : this.infor.pattern == 'horizontal' ? 'row' : 'column',
                  navigation: {
                      nextEl: '.swiper-button-next',
                      prevEl: '.swiper-button-prev'
                  },
                  pagination: {
                      el: '.swiper-pagination',
                      clickable :true,
                  },


              }
          }

      },

    components:{


    },
    watch:{

      infor:{
          handler: function (val, oldVal) {
              //找出变化的key
              var key = '';
              for(var i in val){
                  if(val[i] != oldVal[i]){
                      key = i;
                      break;
                  }
              }

              if(this.update_key.indexOf(key) > -1){
                  this.reset_swiper();
              }
          },
          deep: true
      },
      'listArr.listType'(){
        this.type_judge();
      },
      'listArr.RelevantLimit'(){
        this.type_judge();
      }



    },

    filters:{
        my_picarticle(value,textLength){
            if(!value){
              return '';
            }
            var str = value;
            if(value){
                str = value.replace(/`/g,'"');
            }
            if(value.length >textLength){
                str = str.substring(0,textLength) + '...';
            }
            return str
        },
        myYear(value){
            if(value){
                var arr = value.split('-');
                var str = arr[0] + '-' +arr[1];
                return str
            }else{
                return '';
            }
        }
    },
    updated:function () {


    },

    methods:{
        //重新渲染swiper,计算属性能实时刷新swiper参数，然后指定参数变化时，重新渲染
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
        //分类模式(点击切换)
        openSwiper: function(i) {
            this.classIndex = i;
        },

        //分类模式（鼠标悬浮切换）
        mouseOverSwiper:function (i) {
            if(this.infor.classStyle.selectPattern == 'hover'){
                this.openSwiper(i);
            }

        },
        borderHoverAnimation:function () {
            var that = this;
            if(that.infor.Mongolia.isOpen == 'true'){

                $(`#u${this.id}`).on('mouseenter','.swiper-slide',function(){
                    $(this).find('.Mongolia').stop(true,true).delay(200).show(
                        {
                            effect:that.infor.Mongolia.animation,
                            direction:that.infor.Mongolia.direction
                        },
                        that.infor.Mongolia.time
                    )
                })

                $(`#u${this.id}`).on('mouseleave','.swiper-slide',function(){
                    $(this).find('.Mongolia').stop(true,true).delay(200).hide(
                        {
                            effect:that.infor.Mongolia.animation,
                            direction:that.infor.Mongolia.direction
                        },
                        that.infor.Mongolia.time
                    )
                })

            }
        },

        //按照数据类型判断，选择渲染的数据源
        type_judge(){
          //这些是要请求的类型
          const to_ajax = ['productRelevant','caseRelevant','articleRelevant','videoRelevant','downloadRelevant','helpRelevant','productNew','caseNew','articleNew','videoNew','helpNew'];
          if(to_ajax.indexOf(this.listArr.listType) > -1){
            this.data_ajax();
          }
          else{
            this.views = this.listArr.listArr;
          }
        },

        //相关类型等数据请求
        data_ajax(){
          this.loading = true;
          const that = this;
          const param = {
            url:`/index_pc.php/newapi/picarticle/getlist?listType=${this.listArr.listType}&limit=${this.listArr.RelevantLimit}`
          };
          this.templet.p_ajax(param).then((e)=>{
            console.log(e);
            that.loading = false;
            if(e.code === 200){
              if(e.data instanceof Array){

                //数据过滤
                e.data.map((val)=>{
                  const num = parseInt(val.createtime)*1000;
                  const t = new Date(num).toLocaleString();
                  const nian = t.split(' ')[0].replace(/\//g,'-');
                  val.createtime = nian;
                  val.time = nian;
                  val.src = val.img;
                  val.content = val.summary;
                  val.title = val.name;
                  val.link = `/${that.listArr.listType}-item-${val.id}.html`;
                });
                this.views = [];
                that.$nextTick(()=>{
                  this.views = e.data;
                });


              }
            }
          }).catch((err)=>{
            console.log(err);
            that.loading = false;
            that.$message.error('网络异常，请稍后尝试！');
          });
        }




    },

    mounted(){
        const that = this;
        $(`#u${this.id}`).find('.banner-btn-next').click(function () {
            that.$refs.mySwiper.swiper.slideNext();
        });
        $(`#u${this.id}`).find('.banner-btn-prev').click(function () {
            that.$refs.mySwiper.swiper.slidePrev();
        });

        //this.borderHoverAnimation();
      this.type_judge();
        if(this.listArr.classArr.length > 0){
            this.classSwiperVal = this.listArr.classArr[0].listArr;
        }




    }
  }
</script>
<style>



</style>
