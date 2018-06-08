<template>
  <div class="indexCatelogView">

    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_catelog')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择" >
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_catelog','public_defaultStyle')"></li>
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

    <div class="indexCatelog mouseClass allSetFM"
         :style="{
            width:infor.frameBox ? infor.frameBox + 'px' : css.module_width + 'px',
            height:infor.frameHeight ? infor.frameHeight + 'px' : css.module_height + 'px',
            background:infor.box.background,
            borderStyle:infor.box.borderStyle,
            borderColor:infor.box.borderColor,
            borderWidth:infor.box.borderWidth + 'px',
        }"
         @dblclick.stop="select_parts('catelog_vertical','basic_catelog')"
         data-Highlight="catelog_vertical"
         :class="[
       $store.state.module_Data ? $store.state.parts == 'catelog_vertical' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       $store.state.module_Data ? $store.state.hover_parts == 'catelog_vertical' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       ]"
         v-loading="isLoading">
      <div class="swiperCatelog" v-if="infor.modeSelection == 'horizontal'">
        <div class="title mouseClass"
             @dblclick.stop="select_parts('catelog_title','basic_catelog')"
             :class="[
       $store.state.module_Data ? $store.state.parts == 'catelog_title' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       $store.state.module_Data ? $store.state.hover_parts == 'catelog_title' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       ]"
             data-Highlight="catelog_title"
             v-text="listArr.title.content"
             :style="{
                    width:infor.box.width + 'px',
                    paddingLeft:infor.title.paddingLeft + 'px',
                    lineHeight:infor.title.height + 'px',
                    height:infor.title.height + 'px',
                    background:infor.title.background,
                    color:infor.title.color,
                    fontWeight:infor.title.fontWeight,
                    textAlign:infor.title.fontAlign,
                    fontSize:infor.title.fontSize + 'px',
                    display:infor.title.display,
                }"></div>

        <!--超出滚动-->
        <div class="swiperCatelog-onelevel" v-if="infor.sort == 'swiper'"
             :style="{height:infor.onelevel.height + 'px'}"><!--超出滚动-->
          <div class="swiperLeft"
               :style="{
                         height:infor.onelevel.height + 'px',
                         width:infor.btn.width + 'px',
                         color:infor.btn.color,
                         background:infor.btn.background,
                         borderColor:infor.btn.borderColor,
                         borderRadius:infor.btn.borderRadius + 'px',
                         lineHeight:infor.onelevel.height + 'px'
                         }">
            <button style="background:transparent"><i class="fa-angle-left" style="font-family: FontAwesome" :style="{
                            lineHeight:infor.onelevel.height + 'px',
                            fontSize:infor.btn.fontSzie + 'px',
                            color:infor.btn.color,
                        }"></i></button>
          </div>
          <div class="swiperCenter" :style="{
                        width:infor.box.width + 'px',
                        height:infor.onelevel.height + 'px',
                    }">
            <div class="swiperCatelog-container swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="val in testList" :style="{
                height:infor.onelevel.height + 'px',
                width:swiperWidth + 'px',
                marginRight:infor.padding+ 'px',
                }" v-show="val.disabled != 'true'">
                  <div class="border" :style="{
                                    borderStyle:infor.onelevel.borderStyle,
                                    borderColor:infor.onelevel.borderColor,
                                    borderRadius:infor.onelevel.borderRadius+ 'px',
                                    borderTopWidth:infor.onelevel.borderTopWidth+ 'px',
                                    borderBottomWidth:infor.onelevel.borderBottomWidth+ 'px',
                                    borderLeftWidth:infor.onelevel.borderleftWidth+ 'px',
                                    borderRightWidth:infor.onelevel.borderRightWidth+ 'px',


                                    }">
                    <a v-text="val.name"
                       class="mouseClass"
                       @dblclick.stop="select_parts('catelog_oneLevel','basic_catelog')"
                       :class="[
                         $store.state.module_Data ? $store.state.parts == 'catelog_oneLevel' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
                         $store.state.module_Data ? $store.state.hover_parts == 'catelog_oneLevel' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
                       ]"
                       data-Highlight="catelog_oneLevel"
                       :style="{
                                        lineHeight:infor.onelevel.height + 'px',
                                        background:infor.onelevel.background,
                                        color:infor.onelevel.color,
                                        fontWeight:infor.onelevel.fontWeight,
                                        textAlign:infor.onelevel.fontAlign,
                                        borderRadius:infor.onelevel.borderRadius+ 'px',
                                        paddingLeft:infor.onelevel.paddingLeft+ 'px',
                                        fontSize:infor.onelevel.fontSize+ 'px',
                                        }"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiperRight"
               :style="{
                         height:infor.onelevel.height + 'px',
                         lineHeight:infor.onelevel.height + 'px',
                         width:infor.btn.width + 'px',
                         color:infor.btn.color,
                         background:infor.btn.background,
                         borderColor:infor.btn.borderColor,
                         borderRadius:infor.btn.borderRadius + 'px',
                         }">
            <button style="background:transparent"><i class="fa-angle-right" style="font-family: FontAwesome" :style="{
                            lineHeight:infor.onelevel.height + 'px',
                            fontSize:infor.btn.fontSzie + 'px',
                            color:infor.btn.color,
                        }"></i></button>
          </div>
        </div>

        <!--超出换行-->
        <div class="floatCatelog-onelevel mouseClass"
             @dblclick.stop="select_parts('catelog_vertical','basic_catelog')"
             :class="[
       $store.state.module_Data ? $store.state.parts == 'catelog_vertical' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       $store.state.module_Data ? $store.state.hover_parts == 'catelog_vertical' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       ]"
             data-Highlight="catelog_vertical"
             v-else
             :style="{
                    width:infor.box.width + 'px',
                }"><!--超出换行-->
          <ul>
            <li v-for="val in testList" :style="{
                            width:infor.onelevel.width + 'px',
                            height:infor.onelevel.height + 'px',
                            borderStyle:infor.onelevel.borderStyle,
                            borderColor:infor.onelevel.borderColor,
                            borderRadius:infor.onelevel.borderRadius+ 'px',
                            marginLeft:infor.box.padding+ 'px',
                            marginBottom:infor.box.padding+ 'px',
                            marginRight:infor.box.padding+ 'px',
                            borderTopWidth:infor.onelevel.borderTopWidth+ 'px',
                            borderBottomWidth:infor.onelevel.borderBottomWidth+ 'px',
                            borderLeftWidth:infor.onelevel.borderleftWidth+ 'px',
                            borderRightWidth:infor.onelevel.borderRightWidth+ 'px',
                        }" v-show="val.disabled != 'true'">
              <a v-text="val.name"
                 class="mouseClass"
                 @dblclick.stop="select_parts('catelog_oneLevel','basic_catelog')"
                 :class="[
                 $store.state.module_Data ? $store.state.parts == 'catelog_oneLevel' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
                 $store.state.module_Data ? $store.state.hover_parts == 'catelog_oneLevel' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
                 ]"
                 data-Highlight="catelog_oneLevel"
                 :style="{
                            lineHeight:infor.onelevel.height + 'px',
                            background:infor.onelevel.background,
                            color:infor.onelevel.color,
                            fontWeight:infor.onelevel.fontWeight,
                            textAlign:infor.onelevel.fontAlign,
                            borderRadius:infor.onelevel.borderRadius+ 'px',
                            paddingLeft:infor.onelevel.paddingLeft+ 'px',
                            fontSize:infor.onelevel.fontSize+ 'px',
                            }"></a>
            </li>
          </ul>
        </div>

        <div class="swiperCatelog-twolevel" :style="{
          width:infor.box.width + 'px',
        }">
          <ul>
            <li v-for="twoVal in two_list"
                :style="{
            display:$store.state.parts == 'catelog_twoLevel' || $store.state.parts == 'catelog_threeLevel' ? 'block' : 'none',
              width:infor.twolevel.width + 'px',
              height:infor.twolevel.height + 'px',
              borderStyle:infor.twolevel.borderStyle,
              borderColor:infor.twolevel.borderColor,
              borderRadius:infor.twolevel.borderRadius+ 'px',
              marginLeft:infor.box.padding+ 'px',
              marginRight:infor.box.padding+ 'px',
              borderTopWidth:infor.twolevel.borderTopWidth+ 'px',
              borderBottomWidth:infor.twolevel.borderBottomWidth+ 'px',
              borderLeftWidth:infor.twolevel.borderleftWidth+ 'px',
              borderRightWidth:infor.twolevel.borderRightWidth+ 'px',
            }">
              <a :style="{
                lineHeight:infor.twolevel.height + 'px',
                background:infor.twolevel.background,
                color:infor.twolevel.color,
                fontWeight:infor.twolevel.fontWeight,
                textAlign:infor.twolevel.fontAlign,
                fontSize:infor.twolevel.fontSize + 'px',
                borderRadius:infor.twolevel.borderRadius+ 'px',
                paddingLeft:infor.twolevel.paddingLeft+ 'px',
            }">{{twoVal.name}}</a>
            </li>
          </ul>
        </div>

        <div class="swiperCatelog-threelevel">
          <ul>
            <li v-for="threeVal in three_list" :style="{
            display:$store.state.parts == 'catelog_threeLevel' ? 'block' : 'none',
              width:infor.threelevel.width + 'px',
              height:infor.threelevel.height + 'px',
              borderStyle:infor.threelevel.borderStyle,
              borderColor:infor.threelevel.borderColor,
              borderRadius:infor.threelevel.borderRadius+ 'px',
              marginLeft:infor.box.padding+ 'px',
              marginRight:infor.box.padding+ 'px',
              borderTopWidth:infor.threelevel.borderTopWidth+ 'px',
              borderBottomWidth:infor.threelevel.borderBottomWidth+ 'px',
              borderLeftWidth:infor.threelevel.borderleftWidth+ 'px',
              borderRightWidth:infor.threelevel.borderRightWidth+ 'px',
            }">
              <a :style="{
                lineHeight:infor.threelevel.height + 'px',
                background:infor.threelevel.background,
                color:infor.threelevel.color,
                fontWeight:infor.threelevel.fontWeight,
                textAlign:infor.threelevel.fontAlign,
                fontSize:infor.threelevel.fontSize + 'px',
                borderRadius:infor.threelevel.borderRadius+ 'px',
                paddingLeft:infor.threelevel.paddingLeft+ 'px',
            }">{{threeVal.name}}</a>
            </li>
          </ul>
        </div>

      </div>

      <div class="verticalState" v-if="infor.modeSelection == 'vertical'"><!--竖型状态-->
        <div class="title mouseClass"
             @dblclick.stop="select_parts('catelog_title','basic_catelog')"
             :class="[
       $store.state.module_Data ? $store.state.parts == 'catelog_title' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       $store.state.module_Data ? $store.state.hover_parts == 'catelog_title' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
       ]"
             data-Highlight="catelog_title"
             v-text="listArr.title.content"
             :style="{
                    width:infor.box.width + 'px',
                    lineHeight:infor.title.height + 'px',
                    height:infor.title.height + 'px',
                    background:infor.title.background,
                    color:infor.title.color,
                    fontWeight:infor.title.fontWeight,
                    textAlign:infor.title.fontAlign,
                    fontSize:infor.title.fontSize + 'px',
                    display:infor.title.display,
                    paddingLeft:infor.title.paddingLeft + 'px',
                }"></div>
        <ul class="oneUl" :style="{
                    width:infor.box.width + 'px',
                    height:infor.box.height + 'px',
                }">
          <li v-for="val in testList"

              :style="{
                    width:infor.onelevel.width + 'px',
                    marginBottom:infor.box.padding+ 'px',
                    }" v-show="val.disabled != 'true'">
            <a v-text="val.name"
               class="mouseClass"
               @dblclick.stop="select_parts('catelog_oneLevel','basic_catelog')"
               :class="[
                 $store.state.module_Data ? $store.state.parts == 'catelog_oneLevel' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
                 $store.state.module_Data ? $store.state.hover_parts == 'catelog_oneLevel' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
                 ]"
               data-Highlight="catelog_oneLevel"
               :style="{
                            lineHeight:infor.onelevel.height + 'px',
                            height:infor.onelevel.height + 'px',
                            background:infor.onelevel.background,
                            color:infor.onelevel.color,
                            fontWeight:infor.onelevel.fontWeight,
                            textAlign:infor.onelevel.fontAlign,
                            fontSize:infor.onelevel.fontSize + 'px',
                            borderRadius:infor.onelevel.borderRadius+ 'px',
                            borderStyle:infor.onelevel.borderStyle,
                            borderColor:infor.onelevel.borderColor,
                            borderTopWidth:infor.onelevel.borderTopWidth+ 'px',
                            borderBottomWidth:infor.onelevel.borderBottomWidth+ 'px',
                            borderLeftWidth:infor.onelevel.borderleftWidth+ 'px',
                            borderRightWidth:infor.onelevel.borderRightWidth+ 'px',
                            paddingLeft:infor.onelevel.paddingLeft+ 'px',
                        }"></a>

            <ul class="twoUl" :style="{
            width:infor.box.width + 'px'
            }">
              <li v-for="twolevelVal in val.children" :style="{
                    display:$store.state.parts == 'catelog_twoLevel'  ? 'block' : twolevelVal.children ? twolevelVal.children.length > 0 && $store.state.parts == 'catelog_threeLevel' ? 'block' : 'none' : 'none',
                    width:infor.twolevel.width + 'px',
                    marginTop:infor.box.padding+ 'px',
                    marginBottom:0
                    }">
                <a v-text="twolevelVal.name"
                   :style="{
                            lineHeight:infor.twolevel.height + 'px',
                            height:infor.twolevel.height + 'px',
                            background:infor.twolevel.background,
                            color:infor.twolevel.color,
                            fontWeight:infor.twolevel.fontWeight,
                            textAlign:infor.twolevel.fontAlign,
                            fontSize:infor.twolevel.fontSize + 'px',
                            borderRadius:infor.twolevel.borderRadius+ 'px',
                            borderStyle:infor.twolevel.borderStyle,
                            borderColor:infor.twolevel.borderColor,
                            borderTopWidth:infor.twolevel.borderTopWidth+ 'px',
                            borderBottomWidth:infor.twolevel.borderBottomWidth+ 'px',
                            borderLeftWidth:infor.twolevel.borderleftWidth+ 'px',
                            borderRightWidth:infor.twolevel.borderRightWidth+ 'px',
                            paddingLeft:infor.twolevel.paddingLeft+ 'px',
                        }"></a>

                <ul class="threeUl" :style="{
                display:$store.state.parts == 'catelog_threeLevel' ? 'block' : 'none',
                width:infor.twolevel.width + 'px'
                }">
                  <li v-for="threelevelVal in twolevelVal.children" :style="{
                    width:infor.threelevel.width + 'px',
                    marginTop:infor.box.padding+ 'px',
                    marginBottom:0
                    }" v-show="threelevelVal.disabled != 'true'">
                    <a v-text="threelevelVal.name" :class="{'selectThreelevel' : threelevelVal.id == threeSelectId }" :style="{
                            lineHeight:infor.threelevel.height + 'px',
                            height:infor.threelevel.height + 'px',
                            background:infor.threelevel.background,
                            color:infor.threelevel.color,
                            fontWeight:infor.threelevel.fontWeight,
                            textAlign:infor.threelevel.fontAlign,
                            fontSize:infor.threelevel.fontSize + 'px',
                            borderRadius:infor.threelevel.borderRadius+ 'px',
                            borderStyle:infor.threelevel.borderStyle,
                            borderColor:infor.threelevel.borderColor,
                            borderTopWidth:infor.threelevel.borderTopWidth+ 'px',
                            borderBottomWidth:infor.threelevel.borderBottomWidth+ 'px',
                            borderLeftWidth:infor.threelevel.borderleftWidth+ 'px',
                            borderRightWidth:infor.threelevel.borderRightWidth+ 'px',

                            paddingLeft:infor.threelevel.paddingLeft+ 'px',
                        }"></a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>


    </div>



  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'basic_catelog',
    props:{
      infor:{
        type:Object,
        default:null,
      },
      css:{
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
        testList:[],
        oneSelectId:'',
        twoSelectId:'',
        threeSelectId:'',
        oneSelectIndex:'',
        twoSelectIndex:'',
          isLoading:false,
          two_list:[],//用于展示横向二级
          three_list:[],//用于展示横向三级

      }
    },
    computed:{
      swiperWidth(){
        const width = (this.infor.box.width - this.infor.padding * (this.infor.numShow - 1))/this.infor.numShow;
        return width
      },

    },
    components:{


    },
    watch:{


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
        init(){
          const view_module = this.$store.state.view_module;
          const v_m = view_module.split(':')[0];
          const v_a = view_module.split(':')[1];
          const pam = {
              url:'/index_pc.php/newapi/case/getlist',
              type:'post',
              data:{
                  model:v_m,
                  action:v_a
              }
          };

          this.templet.p_ajax(pam).then((e)=>{
              this.isLoading = false;
              if(e.code===200){
                  if(e.data instanceof Array){
                      this.testList = e.data;
                      for(let i = 0;i<e.data.length;i++){
                          //任意找到一组二级数据
                          if(e.data[i].children && e.data[i].children.length > 0 ){
                              if(this.two_list.length === 0){
                                  this.two_list = e.data[i].children;
                              }

                              //如果这个一级下面有二级，循环每个二级，查他是否有三级
                              for(let j = 0;j<e.data[i].children.length;j++){
                                  if(e.data[i].children[j].children && e.data[i].children[j].children.length > 0 && this.three_list.length == 0){
                                      this.three_list = e.data[i].children[j].children;
                                  }
                              }
                          }


                          if(this.three_list.length > 0 && this.two_list.length > 0){
                              break;
                          }
                      }
                  }
                  else {
                      this.$message.error('网络异常，数据类型错误！');
                  }
              }
              else{
                  this.$message.error('请求返回非200！');
              }

              console.log(e);
          }).catch((err)=>{
              console.log(err);
              this.isLoading = false;
              this.$message.error('请求异常错误！');

          })




        }

    },

    mounted(){
        this.init();

    }
  }
</script>
<style>


</style>
