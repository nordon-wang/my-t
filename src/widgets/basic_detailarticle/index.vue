<template>
  <div class="index_detailarticle"
  >

    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_detailarticle')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择" >
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>

        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_detailarticle','public_defaultStyle')"></li>
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
<!--height:infor.box.height +'px',-->
<!--height:newsIndexHeight +'px',-->
    <div class="newsIndex mouseClass allSetFM"
         id="my_pages"
         @dblclick.stop="select_parts('detailarticle_new_box','basic_detailarticle')"
         :class="[
           $store.state.module_Data ? $store.state.parts == 'detailarticle_new_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'detailarticle_new_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
         ]"
         data-Highlight="detailarticle_new_box"
         :style="{
            width:infor.box.width + 'px',
            height:newsIndexHeight +'px',
            background:infor.box.background,
            borderLeftWidth:infor.box.borderLeftWidth + 'px',
            borderRightWidth:infor.box.borderRightWidth + 'px',
            borderTopWidth:infor.box.borderTopWidth + 'px',
            borderBottomWidth:infor.box.borderBottomWidth + 'px',
            borderColor:infor.box.borderColor,
            borderStyle:infor.box.borderStyle,
        }">
      <div class="newsIndex_header indexContainer detailarticle_move mouseClass"
           @dblclick.stop="select_parts('detailarticle_new_header','basic_detailarticle')"
           :class="[
           $store.state.module_Data ? $store.state.parts == 'detailarticle_new_header' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'detailarticle_new_header' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
         ]"
           data-Highlight="detailarticle_new_header"
           data-name="header"
           :style="{
                width:infor.header.width + 'px',
                height:infor.header.height + 'px',
                background:infor.header.background,
                borderLeftWidth:infor.header.borderLeftWidth + 'px',
                borderRightWidth:infor.header.borderRightWidth + 'px',
                borderTopWidth:infor.header.borderTopWidth + 'px',
                borderBottomWidth:infor.header.borderBottomWidth + 'px',
                borderColor:infor.header.borderColor,
                borderStyle:infor.header.borderStyle,
                lineHeight:infor.header.lineHeight + 'px',
                color:infor.header.color,
                fontSize:infor.header.fontSize + 'px',
                textAlign:infor.header.textAlign,
                top:infor.header.top + 'px',
                left:infor.header.left + 'px',
                zIndex:infor.header.zIndex,
                fontWeight:infor.header.fontWeight,
            }"
      >此处显示文章标题！(以下均为默认数据，真实数据请前往后台填写！)</div>
      <div class="newsIndex_headerBottom indexContainer detailarticle_move mouseClass"
           @dblclick.stop="select_parts('detailarticle_new_headerBottom','basic_detailarticle')"
           :class="[
           $store.state.module_Data ? $store.state.parts == 'detailarticle_new_headerBottom' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'detailarticle_new_headerBottom' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
         ]"
           data-Highlight="detailarticle_new_headerBottom"
           data-name="headerBottom"
           :style="{
                width:infor.headerBottom.width + 'px',
                height:infor.headerBottom.height + 'px',
                background:infor.headerBottom.background,
                borderLeftWidth:infor.headerBottom.borderLeftWidth + 'px',
                borderRightWidth:infor.headerBottom.borderRightWidth + 'px',
                borderTopWidth:infor.headerBottom.borderTopWidth + 'px',
                borderBottomWidth:infor.headerBottom.borderBottomWidth + 'px',
                borderColor:infor.headerBottom.borderColor,
                borderStyle:infor.headerBottom.borderStyle,
                top:infor.headerBottom.top + 'px',
                left:infor.headerBottom.left + 'px',
                zIndex:infor.headerBottom.zIndex,
                display:infor.headerBottom.display,
            }">
        <p v-if="infor.headerBottom.time.display == 'block'">
                    <span :style="{
                        lineHeight:infor.headerBottom.height + 'px',
                        marginLeft:infor.headerBottom.time.marginLeft + 'px',
                        marginRight:infor.headerBottom.time.marginRight + 'px',
                        fontSize:infor.headerBottom.fontSize + 'px',
                        color:infor.headerBottom.nameColor,
                    }">发布时间：</span>
          <b :style="{
                        lineHeight:infor.headerBottom.height + 'px',
                        fontSize:infor.headerBottom.fontSize + 'px',
                        color:infor.headerBottom.valColor,
                    }">2018-01-01</b>
        </p>
        <p v-if="infor.headerBottom.source.display == 'block'">
                    <span :style="{
                        lineHeight:infor.headerBottom.height + 'px',
                        marginLeft:infor.headerBottom.source.marginLeft + 'px',
                        marginRight:infor.headerBottom.source.marginRight + 'px',
                        fontSize:infor.headerBottom.fontSize + 'px',
                        color:infor.headerBottom.nameColor,
                    }">来源：</span>
          <b :style="{
                        lineHeight:infor.headerBottom.height + 'px',
                        fontSize:infor.headerBottom.fontSize + 'px',
                        color:infor.headerBottom.valColor,
                    }">此处显示来源信息</b>
        </p>
        <p v-if="infor.headerBottom.look.display == 'block'">
                    <span :style="{
                        lineHeight:infor.headerBottom.height + 'px',
                        marginLeft:infor.headerBottom.look.marginLeft + 'px',
                        marginRight:infor.headerBottom.look.marginRight + 'px',
                        fontSize:infor.headerBottom.fontSize + 'px',
                        color:infor.headerBottom.nameColor,
                    }">浏览次数：</span>
          <b :style="{
                        lineHeight:infor.headerBottom.height + 'px',
                        fontSize:infor.headerBottom.fontSize + 'px',
                        color:infor.headerBottom.valColor,
                    }">0</b>
        </p>

      </div>
      <div class="newsIndex_img indexContainer resetCss detailarticle_move mouseClass"
           @dblclick.stop="select_parts('detailarticle_new_img','basic_detailarticle')"
           :class="[
           $store.state.module_Data ? $store.state.parts == 'detailarticle_new_img' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'detailarticle_new_img' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
         ]"
           data-Highlight="detailarticle_new_img"
           data-name="img"
           :style="{
                width:infor.img.width + 'px',
                height:infor.img.height + 'px',
                background:infor.img.background,
                borderLeftWidth:infor.img.borderLeftWidth + 'px',
                borderRightWidth:infor.img.borderRightWidth + 'px',
                borderTopWidth:infor.img.borderTopWidth + 'px',
                borderBottomWidth:infor.img.borderBottomWidth + 'px',
                borderColor:infor.img.borderColor,
                borderStyle:infor.img.borderStyle,
                display:infor.img.display,
                top:infor.img.top + 'px',
                left:infor.img.left + 'px',
                zIndex:infor.img.zIndex,
            }">
        <img src="../../../static/image/pic.png" :style="{
          width:infor.img.imgWidth + 'px',
          height:infor.img.imgHeight + 'px',
          margin:infor.img.margin + 'px',
        }">
      </div>
      <div class="newsIndex_summary indexContainer detailarticle_move mouseClass"
           @dblclick.stop="select_parts('detailarticle_new_summary','basic_detailarticle')"
           :class="[
           $store.state.module_Data ? $store.state.parts == 'detailarticle_new_summary' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'detailarticle_new_summary' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
         ]"
           data-Highlight="detailarticle_new_summary"
           data-name="summary"
           :style="{
                 display:infor.summary.display,
                width:infor.summary.width + 'px',
                height:infor.summary.height + 'px',
                background:infor.summary.background,
                borderLeftWidth:infor.summary.borderLeftWidth + 'px',
                borderRightWidth:infor.summary.borderRightWidth + 'px',
                borderTopWidth:infor.summary.borderTopWidth + 'px',
                borderBottomWidth:infor.summary.borderBottomWidth + 'px',
                borderColor:infor.summary.borderColor,
                borderStyle:infor.summary.borderStyle,
                lineHeight:infor.summary.lineHeight + 'px',
                color:infor.summary.color,
                fontSize:infor.summary.fontSize + 'px',
                textAlign:infor.summary.textAlign,
                top:infor.summary.top + 'px',
                left:infor.summary.left + 'px',
                zIndex:infor.summary.zIndex,
            }"
      >此处显示文章简介！</div>
      <div class="newsIndex_content indexContainer detailarticle_move mouseClass"
           @dblclick.stop="select_parts('detailarticle_new_content','basic_detailarticle')"
           :class="[
           $store.state.module_Data ? $store.state.parts == 'detailarticle_new_content' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'detailarticle_new_content' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
         ]"
           data-Highlight="detailarticle_new_content"
           data-name="content"
           :style="{
                 display:infor.content.display,
                width:infor.content.width + 'px',
                minHeight:infor.content.height + 'px',
                background:infor.content.background,
                borderLeftWidth:infor.content.borderLeftWidth + 'px',
                borderRightWidth:infor.content.borderRightWidth + 'px',
                borderTopWidth:infor.content.borderTopWidth + 'px',
                borderBottomWidth:infor.content.borderBottomWidth + 'px',
                borderColor:infor.content.borderColor,
                borderStyle:infor.content.borderStyle,
                top:infor.content.top + 'px',
                left:infor.content.left + 'px',
                zIndex:infor.content.zIndex,
            }">
        <div :style="{
               width:infor.content.width + 'px',
               minHeight:infor.content.height + 'px',
               lineHeight:infor.content.height + 'px',
           }" v-if="$store.state.now_page === 'video'" class="content_video">
          <i class="fa fa-play-circle-o" style="font-family: FontAwesome"></i>
        </div>
        <div v-else>
          <div class="magnifier_frame mouseClass"
               @dblclick.stop="select_parts('detailarticle_new_Magnifier','basic_detailarticle')"
               :class="[
           $store.state.module_Data ? $store.state.parts == 'detailarticle_new_Magnifier' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'detailarticle_new_Magnifier' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
         ]"
               data-Highlight="detailarticle_new_Magnifier"
               :style="{
          width:infor.magnifier.width + 'px',
          height:infor.magnifier.height + 'px',
          margin:infor.magnifier.margin + 'px',
          display:infor.magnifier.display,}">
            <span>放大镜预留</span>
            <img :style="{width:infor.magnifier.width + 'px',height:infor.magnifier.height + 'px',}" class="zhanwei">
          </div>


          <div class="content_show">{{text_content}}</div>
        </div>
      </div>
      <div class="productIndexTab detailarticle_move mouseClass"
           @dblclick.stop="select_parts('detailarticle_productTab','basic_detailarticle')"
           :class="[
           $store.state.module_Data ? $store.state.parts == 'detailarticle_productTab' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'detailarticle_productTab' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
         ]"
           data-Highlight="detailarticle_productTab"
           data-name="tab"
           :style="{
                display:infor.tab.box.display,
                width:infor.tab.box.width + 'px',
                background:infor.tab.box.background,
                borderLeftWidth:infor.tab.box.borderLeftWidth + 'px',
                borderRightWidth:infor.tab.box.borderRightWidth + 'px',
                borderTopWidth:infor.tab.box.borderTopWidth + 'px',
                borderBottomWidth:infor.tab.box.borderBottomWidth + 'px',
                borderColor:infor.tab.box.borderColor,
                borderStyle:infor.tab.box.borderStyle,
                top:infor.tab.box.top + 'px',
                left:infor.tab.box.left + 'px',
                zIndex:infor.tab.box.zIndex,
                padding:infor.tab.box.padding + 'px',
      }">
        <div class="productIndexTab-title">
          <ul :style="{
            height:infor.tab.btn.height + 'px',
            background:infor.tab.btn.lineBackground,
          }">
            <li :style="{
              width:infor.tab.btn.width + 'px',
               height:infor.tab.btn.height + 'px',
               background:i == 0 ? infor.tab.btnSelect.background : infor.tab.btn.background,
                borderLeftWidth:infor.tab.btn.borderLeftWidth + 'px',
                borderRightWidth:infor.tab.btn.borderRightWidth + 'px',
                borderTopWidth:infor.tab.btn.borderTopWidth + 'px',
                borderBottomWidth:infor.tab.btn.borderBottomWidth + 'px',
                borderColor:infor.tab.btn.borderColor,
                borderStyle:infor.tab.btn.borderStyle,
                lineHeight:infor.tab.btn.height + 'px',
                color:i == 0 ? infor.tab.btnSelect.color : infor.tab.btn.color,
                fontSize:i == 0 ? infor.tab.btnSelect.fontSize + 'px' : infor.tab.btn.fontSize + 'px',
                marginRight:infor.tab.btn.marginRight + 'px',
                textAlign:infor.tab.btn.textAlign,
                display:i === 2 ? infor.tab.box.inquiryDisplay : 'block'

            }" v-for="(val,i) in tab_btn_arr">{{val}}</li>
          </ul>
        </div>
        <div class="productIndexTab-content">
          <div class="contentText" :style="{
                minHeight:infor.tab.content.height + 'px',
                borderLeftWidth:infor.tab.content.borderLeftWidth + 'px',
                borderRightWidth:infor.tab.content.borderRightWidth + 'px',
                borderTopWidth:infor.tab.content.borderTopWidth + 'px',
                borderBottomWidth:infor.tab.content.borderBottomWidth + 'px',
                borderColor:infor.tab.content.borderColor,
                borderStyle:infor.tab.content.borderStyle,
                padding:infor.tab.content.padding + 'px',
                lineHeight:infor.tab.content.lineHeight + 'px',
                color:infor.tab.content.color,
                fontSize:infor.tab.content.fontSize + 'px',
                textAlign:infor.tab.content.textAlign,
                marginTop:infor.tab.content.marginTop + 'px',
                marginRight:infor.tab.content.marginRight + 'px',
                marginBottom:infor.tab.content.marginBottom + 'px',
                marginLeft:infor.tab.content.marginLeft + 'px',
          }">{{text_content}}</div>
        </div>

      </div>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from '../../base/bus';
  export default {
    name: 'basic_detailarticle',
    props:{
      infor:{
        type:Object,
        default:null,
      },
      listArr:{},
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
        text_content:'此处显示文章内容，具体内容，请于后台填写并设置您需要的样式！此处显示文章内容，具体内容，请于后台填写并设置您需要的样式！此处显示文章内容，具体内容，请于后台填写并设置您需要的样式！此处显示文章内容，具体内容，请于后台填写并设置您需要的样式！此处显示文章内容，具体内容，请于后台填写并设置您需要的样式！此处显示文章内容，具体内容，请于后台填写并设置您需要的样式！此处显示文章内容，具体内容，请于后台填写并设置您需要的样式！此处显示文章内容，具体内容，请于后台填写并设置您需要的样式！',
        type:'',
        //tab_btn_arr:[`${this.infor.tab.box.text}`,'分类选项','询价'],
        newsIndexHeight:100,
          targetDom:[],//在同屏幕的dom数组
          Error_amount:1,//对齐的误差量
          Error_lock:5,//锁定的误差
          lock:{
              transverse_lock:false,//横向锁定值
              vertical_lock:false,//竖向锁定值
          },


      }
    },
    computed:{
        tab_btn_arr(){
            return [`${this.infor.tab.box.text}`,'分类选项','询价']
        }
    },
    components:{


    },
    watch:{
        infor:{
            handler: function (val, oldVal) {
                this.$nextTick(()=>{
                    this.rowHeight();
                });
            },
            deep: true
        }

    },
    filters:{

    },


    methods:{
      //拖拽和缩放，公共的更新数据
      update_data({dom,key1,val1,key2,val2}){
        const pid = this.pid;
        const id = this.id;
        const type = this.rowType;
        const IndexObj = this.templet.p_find_moduleIndex({pid,type,id});
        const name = dom.attr('data-name');
        //修改数据源
        if(name === 'tab'){
          this.$store.state[type][IndexObj.row].children[IndexObj.module].data.infor.tab.box[key1] = val1;
          this.$store.state[type][IndexObj.row].children[IndexObj.module].data.infor.tab.box[key2] = val2;
        }
        else{
          this.$store.state[type][IndexObj.row].children[IndexObj.module].data.infor[name][key1] = val1;
          this.$store.state[type][IndexObj.row].children[IndexObj.module].data.infor[name][key2] = val2;
        }




        Bus.$emit('detailarticle_update_data',{name,key1,val1,key2,val2});
      },

      //拖拽
      my_draggable(){
        const that = this;
        var is_disabled = false;
        if(this.$store.state.module_name != 'basic_detailarticle'){
          is_disabled = true;//row排序后，重新渲染组件，这时拖拽应该是关闭的
        }

        $(`#u${this.id}`).find('.detailarticle_move').draggable({
          //containment:"parent",
          disabled: is_disabled,
            start:function () {
                //对齐线开始准备//对齐线逻辑
                that.templet.aline_start(that,$(this),'.detailarticle_move');
            },
          drag:function ( event, ui) {
              //对齐线逻辑
              var dragLeft = $(this).offset().left;
              var dragTop = $(this).offset().top;

              var moveLeft = ui.offset.left;
              var moveTop = ui.offset.top;


              var dragWidth = $(this).width();
              var dragHeight = $(this).height();

              that.templet.aline_drag(that,$(this),dragLeft,dragTop,dragWidth,dragHeight,moveLeft,moveTop);
          },
            stop:function (event, ui) {
                that.update_data({
                    dom:$(this),
                    key1:'left',
                    val1:ui.position.left,
                    key2:'top',
                    val2:ui.position.top,
                });


                that.templet.p_remove_line();

            }
        });
      },

      //缩放
      my_resizable(){
        const that = this;
        $(`#u${this.id}`).find('.detailarticle_move').resizable({
          containment:"parent",
          autoHide: true,
          handles: "n, e, s, w, ne, se, sw, nw",
            stop:function (event, ui) {
            that.update_data({
              dom:$(this),
              key1:'width',
              val1:ui.size.width,
              key2:'height',
              val2:ui.size.height,
            });
            that.update_data({
                dom:$(this),
                key1:'left',
                val1:ui.position.left,
                key2:'top',
                val2:ui.position.top,
            });
          }

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

      rowHeight:function(type){
        const moduleTop = parseInt($(`#u${this.id}`).css('top'));
        var newsIndex = $(`#u${this.id}`).find('.newsIndex').children();
        const row_id = $(`#u${this.id}`).attr('pid');
        const row_type = $(`#u${this.id}`).attr('rowtype');
        var heightArr = [];
        var newsIndexHeight = 0;//挂件的高度
        for(var i = 0;i<newsIndex.length;i++){
          var display = $(newsIndex[i]).css('display');
          var childTop = parseInt($(newsIndex[i]).css('top'));
          var childHeight = parseInt($(newsIndex[i]).css('height'));

          if( display == 'block'){
            var allHeight = childTop + childHeight;
            heightArr.push(allHeight);
          }
        }

        if(heightArr.length > 0){
          heightArr.sort(function(a,b){
            return b-a});
          newsIndexHeight = heightArr[0];
        }
        this.newsIndexHeight = newsIndexHeight + 10;

        const row_height = moduleTop + newsIndexHeight;

        const row_index = this.templet.p_find_rowIndex({
            id:row_id,
            type:row_type
        });

        this.$store.state[row_type][row_index].data.infor.module_height = row_height + 50;

          this.templet.createGuide();
      },



    },

    mounted(){
      this.my_draggable();
      this.my_resizable();
      this.rowHeight();

    }
  }
</script>
<style>



</style>
