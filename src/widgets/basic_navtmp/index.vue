<template>
  <div class="indexBanner mouseClass"
       v-loading="loading"
       @dblclick.stop="select_parts('nav_custom','basic_navtmp')"
       :class="[
       $store.state.parts == 'nav_custom' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
       $store.state.hover_parts == 'nav_custom' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
       ]"
  >
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_navtmp')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择" >
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>

        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_navtmp','public_defaultStyle')"></li>
        </my-tooltip>
        <my-tooltip content="样式保存" v-show="infor.navCustomStyle">
          <li class="edit_module el-icon-star-off" @click.stop="select_parts('','');$store.state.styleSave_IsOpen = true"></li>
        </my-tooltip>
        <my-tooltip content="基础设置" >
          <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>


      </ul>
    </div>
    <div class="indexCustom allSetFM" v-if="infor.navCustomStyle">
      <div class="menumenu" :style="{
        background:infor.style.navLiBackground,
                    height:infor.style.navHeight,
                    }">
        <!--overflowX:'auto',
                        overflowY:'hidden',width:infor.style.navWidth + 'px',-->
        <div class="nav" :style="{
                        background:infor.style.navLiBackground,
                        width:infor.style.navWidth + 'px',
                        height:infor.style.navHeight + 'px',
                        overflowX:'auto',
                        overflowY:'hidden',
                        }">
          <ul class="indexNav" :style="{
              height:infor.style.navHeight + 'px',
          }">
            <li class="indexNavChild"
                v-for="(val,parentIndex) in list"
                v-show="val.disabled == 'false'"
                :style="{
                    background:infor.style.navLiBackground,
                    width:infor.style.navOneWidth + 'px',
                    height:infor.style.navHeight + 'px',
                    borderRightStyle:infor.style.navBorderStyle,
                    borderRightColor:infor.style.navBorderColor,
                    borderRightWidth:'1px',
                    zIndex:1
              }">
              <a
                      v-text="val.name"
                      :class="{'aSelect': val.selected == 'true'}"
                      class="parent" :style="{
                          width:infor.style.navOneWidth + 'px',
                          height:infor.style.navHeight + 'px',
                          lineHeight:infor.style.navHeight + 'px',
                          fontWeight:infor.style.navFontWeight,
                          fontSize:infor.style.navFontSize + 'px',
                          textAlign:infor.style.navFontAlign,
                          color:infor.style.navColor,
                          borderRadius:infor.style.navBorderRadius,
                          }"></a>

              <i
                      class="mouseClass"
                      @dblclick.stop="select_parts('nav_icon','basic_navtmp')"
                      :class="[
                          val.icon,
           $store.state.parts == 'nav_icon' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
           $store.state.hover_parts == 'nav_icon' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
           ]"
              ></i>

              <ul style="display: none" v-if="val.children.length > 0" class="children_list">
                <p class="navMarginTop" :style="{
                  backgroundColor:infor.dropDownStyle.dropDownBackground,
                       opacity:infor.dropDownStyle.opacity,
                       height:infor.dropDownStyle.navMarginTopHeight + 'px',
                       margin:0,
                }"></p>
                <li
                        v-for="childVal in val.children"
                        v-show="childVal.disabled == 'false'"
                        :style="{
                            height:infor.dropDownStyle.dropDownHeight + 'px',
                            backgroundImage:infor.dropDownStyle.dropDownBackgroundImage ? `url('${infor.dropDownStyle.dropDownBackgroundImage}')` : '',
                             backgroundRepeat:infor.dropDownStyle.isRepeat
                        }"
                >

                  <!--高亮-->
                  <p class="Interlayer"></p>

                  <!--背景颜色加透明度-->
                  <span class="backColor" :style="{
                       backgroundColor:infor.dropDownStyle.dropDownBackground,
                       opacity:infor.dropDownStyle.opacity,

                  }"></span>

                  <a v-text="childVal.name" class="childNav" :style="{
                      color:infor.dropDownStyle.dropDownColor,
                      fontSize:infor.dropDownStyle.dropDownFontSize + 'px',
                      height:infor.dropDownStyle.dropDownHeight + 'px',
                      lineHeight:infor.dropDownStyle.dropDownHeight + 'px',
                      borderRadius:infor.style.navBorderRadius + 'px',
                  }"></a>
                  <i :class="infor.icon.childIcon" :style="{
                      top:(infor.dropDownStyle.dropDownHeight - infor.icon.fontSize)/2 + 'px',
                      bottom:'',
                    left:'7%',
                    right:'',
                    fontSize:infor.icon.fontSize + 'px',
                    color:infor.icon.color
                  }"></i>
                </li>
                <p class="navMarginBottom" :style="{
                      backgroundColor:infor.dropDownStyle.dropDownBackground,
                       opacity:infor.dropDownStyle.opacity,
                       height:infor.dropDownStyle.navMarginBottomHeight + 'px',
                       margin:0,
                      float: 'left',
                      width: '100%'
                }"></p>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="menumenu fixed_css" :id="infor.styleId" v-else :style="{
        width:infor.style.navWidth + 'px',
        height:infor.style.navHeight + 'px',
    }">
      <div class="nav">
        <ul class="indexNav" :style="{width: '100%',
        zIndex: 0,
        backgroundSize:'100%',
    }">
          <li
                  class="indexNavChild"
                  v-for="val in list"
                  style="z-index:1"
                  track-by="$index"
                  :class="{'zSeleNav': val.link == url}"
                  v-show="val.disabled == 'false'">
            <a v-text="val.name" style="color: #fff"></a>
            <i :class="val.icon"></i>
            <ul style="display: none">
              <li
                      v-for="childVal in val.children"
                      v-show="val.disabled == 'false'">
                <a v-text="childVal.name" style="color: #fff"></a>
                <i :class="infor.icon.childIcon"></i>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>



  </div>
</template>

<script type="text/ecmascript-6">
  import List from './list';
  export default {
    name: 'basic_banner',
    props:{
      infor:{
        type:Object,
        default:null,
      },
      listArr:{
        type:Array,
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
          list:[],
          url:'',
          loading:false,

      }
    },
    components:{


    },
      watch:{
          'infor.style.navHeight'(val, oldVal){
              this.$nextTick(()=>{
                  this.iconFourStyle();
              });
          },
          infor:{
              handler: function (val, oldVal) {
                  if(val.style.navHeight != oldVal.style.navHeight || val.style.navOneWidth != oldVal.style.navOneWidth || val.icon.fontSize != oldVal.icon.fontSize || val.icon.position != oldVal.icon.position || val.icon.color != oldVal.icon.color){
                      this.$nextTick(()=>{
                          this.iconFourStyle();
                      });
                  }

              },
              deep: true
          },
          'infor.navCustomStyle'(){
              this.Re_binding();
          },
          listArr:{
              handler: function (val, oldVal) {
                  this.list = JSON.parse(JSON.stringify(val));
                  //console.log(val);
                  //this.Re_binding();
              },
              deep: true
          },
      },

    updated:function () {


    },

    methods:{
        select_parts(partsName,moduleName){
            this.templet.p_index_select_parts({
                partsName,
                moduleName,
                id:this.id,
                pid:this.pid,
                type:this.rowType
            })
        },
        hoverUlShow:function () {
            const that = this;
            $(`#u${this.id}`).find('.indexNavChild').hover(
                function () {

                    $(this).children('ul').stop(true,true).slideDown(300);

                    if(that.infor.navCustomStyle){
                        $(this).css({
                            background:that.infor.navSelectStyle.navSelectBackground
                        });

                        $(this).find('.parent').css({
                            'font-size':that.infor.navSelectStyle.navSelectFontSize + 'px',
                            color:that.infor.navSelectStyle.navSelectColor
                        })
                    }



                },
                function () {
                    $(this).children('ul').stop(true,true).slideUp(300);

                    if(that.infor.navCustomStyle){
                        $(this).css({
                            background:that.infor.style.navLiBackground
                        });

                        $(this).find('.parent').css({
                            'font-size':that.infor.style.navFontSize + 'px',
                            color:that.infor.style.navColor
                        })
                    }

                }
            );
        },
        childLiHover(){
            const that = this;
            $(`#u${this.id}`).find('.children_list').children('li').hover(
                function () {


                    $(this).children('a').css({
                        'font-size':that.infor.dropDownSelectStyle.dropDownSelectFontSize + 'px',
                        color:that.infor.dropDownSelectStyle.dropDownSelectColor
                    });

                    $(this).children('.Interlayer').css({
                        'background-color':that.infor.dropDownSelectStyle.dropDownSelectBackground,
                        height:that.infor.dropDownSelectStyle.height + 'px',
                        marginTop:(that.infor.dropDownStyle.dropDownHeight - that.infor.dropDownSelectStyle.height)/2 + 'px',
                        opacity:that.infor.dropDownSelectStyle.opacity
                    });
                },
                function () {

                    $(this).children('a').css({
                        'font-size':that.infor.dropDownStyle.dropDownFontSize + 'px',
                        color:that.infor.dropDownStyle.dropDownColor
                    });

                    $(this).children('.Interlayer').css({
                        'background-color':'transparent',
                        height:'100%',
                        marginTop:0,
                        opacity:1
                    });
                }
            );
        },
        iconFourStyle:function () {
            const that = this;
            var fontSize = parseInt(this.infor.icon.fontSize);
            var navIconPosition = this.infor.icon.position;
            var color = this.infor.icon.color;
            var liHeight = $(`#u${this.id}`).find('.indexNav').children('.indexNavChild').height();
            var liWidth = $(`#u${this.id}`).find('.indexNav').children('li').width();
            var dropDownMenuHeight = $(`#u${this.id}`).find('.indexNavChild').children('ul').children('li').height();
            if(navIconPosition == 'top-left'){
                $(`#u${this.id}`).find('.indexNav').children('li').children('i').css({
                    top:'3%',
                    bottom:'',
                    left:'7%',
                    right:'',
                    fontSize:fontSize+'px',
                    color:color
                });
            }

            else if(navIconPosition == 'top-center'){
                $(`#u${this.id}`).find('.indexNav').children('li').children('i').css({
                    top:'3%',
                    bottom:'',
                    left:(liWidth - fontSize)/2+'px',
                    right:'',
                    fontSize:fontSize+'px',
                    color:color
                });
            }

            else if(navIconPosition == 'top-right'){
                $(`#u${this.id}`).find('.indexNav').children('li').children('i').css({
                    top:'3%',
                    bottom:'',
                    left:'',
                    right:'7%',
                    fontSize:fontSize+'px',
                    color:color
                });
            }

            else if(navIconPosition == 'center-left'){
                $(`#u${this.id}`).find('.indexNav').children('li').children('i').css({
                    top:(liHeight - fontSize)/2+'px',
                    bottom:'',
                    left:'7%',
                    right:'',
                    fontSize:fontSize+'px',
                    color:color
                });

            }

            else if(navIconPosition == 'center-center'){
                $(`#u${this.id}`).find('.indexNav').children('li').children('i').css({
                    top:(liHeight - fontSize)/2+'px',
                    bottom:'',
                    left:(liWidth - fontSize)/2+'px',
                    right:'',
                    fontSize:fontSize+'px',
                    color:color
                });

            }

            else if(navIconPosition == 'center-right'){
                $(`#u${this.id}`).find('.indexNav').children('li').children('i').css({
                    top:(liHeight - fontSize)/2+'px',
                    bottom:'',
                    left:'',
                    right:'7%',
                    fontSize:fontSize+'px',
                    color:color
                });
            }

            else if(navIconPosition == 'bottom-left'){
                $(`#u${this.id}`).find('.indexNav').children('li').children('i').css({
                    top:'',
                    bottom:'3%',
                    left:'7%',
                    right:'',
                    fontSize:fontSize+'px',
                    color:color
                });
            }

            else if(navIconPosition == 'bottom-center'){
                $(`#u${this.id}`).find('.indexNav').children('li').children('i').css({
                    top:'',
                    bottom:'3%',
                    left:(liWidth - fontSize)/2+'px',
                    right:'',
                    fontSize:fontSize+'px',
                    color:color
                });
            }

            else if(navIconPosition == 'bottom-right'){
                $(`#u${this.id}`).find('.indexNav').children('li').children('i').css({
                    top:'',
                    bottom:'3%',
                    left:'',
                    right:'7%',
                    fontSize:fontSize+'px',
                    color:color
                });
            }

            //下拉菜单样式
            $(`#u${this.id}`).find('.indexNavChild').children('ul').find('i').css({
                top:(dropDownMenuHeight - fontSize)/2+'px',
                bottom:'',
                left:'7%',
                right:'',
                fontSize:fontSize+'px',
                color:color
            });

        },
        init(){
            this.loading = true;
            const that = this;
          const param = {
            url:'/index_pc.php/newapi/nav/getlist'
          };
          this.templet.p_ajax(param).then((e)=>{
            that.loading = false;
            if(e.code === 200){
              if(e.data instanceof Array && e.data.length > 0){
                that.list = e.data;
                that.$nextTick(()=>{
                  that.Re_binding();
                  //that.get_width();
                });
              }
            }
            //console.log(e);
          }).catch((err)=>{
            that.loading = false;
            that.$message.error('网络异常，请稍后尝试！');
          });
        },
        Re_binding(){
            this.$nextTick(()=>{
                this.iconFourStyle();
                //this.hoverUlShow();
                //this.childLiHover();
            });
        },
        get_width(){
          const width = $(`#u${this.id}`).find('.nav').width();
          //console.log(width);
        }

    },

    mounted(){
        this.init();
    }
  }
</script>
<style>



</style>
