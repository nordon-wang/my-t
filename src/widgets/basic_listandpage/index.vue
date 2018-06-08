<template>
  <div class="index_listandpage"
  >

    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_listAndPage')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择" >
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>

        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_listAndPage','public_defaultStyle')"></li>
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
    <div class="listAndPage mouseClass allSetFM"
         id="my_pages"
         @dblclick.stop="select_parts('listandpage_listFrame','basic_listAndPage')"
         :class="[
         $store.state.module_Data ? $store.state.parts == 'listandpage_listFrame' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
         $store.state.module_Data ? $store.state.hover_parts == 'listandpage_listFrame' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
         $store.state.module_Data ? $store.state.parts == 'defaultstyle' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
         ]"
         data-Highlight="listandpage_listFrame"
         :style="{
            width:infor.frame.width + 'px',
            height:infor.frame.heightType ? infor.frame.heightType == 'num' ? infor.frame.height + 'px' : 'auto' : infor.frame.height + 'px',
            borderLeftWidth:infor.frame.borderLeftWidth + 'px',
            borderRightWidth:infor.frame.borderRightWidth + 'px',
            borderTopWidth:infor.frame.borderTopWidth + 'px',
            borderBottomWidth:infor.frame.borderBottomWidth + 'px',
            borderColor:infor.frame.borderColor,
            borderStyle:infor.frame.borderStyle,
            background:infor.frame.background,
            borderRadius:infor.frame.borderRadius + 'px',
            paddingTop:infor.frame.paddingTop + 'px',
            paddingLeft:infor.frame.paddingLeft + 'px',
            paddingRight:infor.frame.paddingRight + 'px',
        }" v-loading="loading">

      <div class="list_index_Prompt" :style="{
           height:infor.Prompt && infor.Prompt.height + 'px',
           lineHeight:infor.Prompt && infor.Prompt.height + 'px',
           color:infor.Prompt && infor.Prompt.color,
           fontSize:infor.Prompt && infor.Prompt.fontSize + 'px',
           textAlign:'center'
      }" v-if="indexData.length === 0 && infor.Prompt">{{listArr.Prompt && listArr.Prompt}}</div>
      <div class="listEveryOne mouseClass" v-for="list in indexData"
           @dblclick.stop="select_parts('listandpage_box','basic_listAndPage')"
           :class="[
           $store.state.module_Data ? $store.state.parts == 'listandpage_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
           $store.state.module_Data ? $store.state.hover_parts == 'listandpage_box' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
                   ]"
           data-Highlight="listandpage_box"
           :style="{
                width:infor.box.width + 'px',
                height:infor.box.height + 'px',
                borderLeftWidth:infor.box.borderLeftWidth + 'px',
                borderRightWidth:infor.box.borderRightWidth + 'px',
                borderTopWidth:infor.box.borderTopWidth + 'px',
                borderBottomWidth:infor.box.borderBottomWidth + 'px',
                borderColor:infor.box.borderColor,
                borderStyle:infor.box.borderStyle,
                background:infor.box.background,
                marginTop:infor.box.marginTop + 'px',
                marginLeft:infor.box.marginLeft + 'px',
                marginRight:infor.box.marginRight + 'px',
                marginBottom:infor.box.marginBottom + 'px',
                borderRadius:infor.box.borderRadius + 'px',
                padding:infor.box.padding + 'px'
            }">

        <!--下载专用的a-->

        <a class="listEveryOne-a" :target="infor.box.target">
          <ul :style="{
                }" class="listEveryOne-ul">
            <li
              class="li_move"
              v-for="(val,c_i) in infor.Component"
              :class="val.englishName"
              :component_index="c_i"
              v-show="val.select === true || val.select === 'block'"
              :style="{
                  width:val.width + 'px',
                  height:val.height + 'px',
                  left:val.left + 'px',
                  top:val.top + 'px',
                  borderLeftWidth:val.borderLeftWidth + 'px',
                  borderRightWidth:val.borderRightWidth + 'px',
                  borderTopWidth:val.borderTopWidth + 'px',
                  borderBottomWidth:val.borderBottomWidth + 'px',
                  borderColor:val.borderColor,
                  borderStyle:val.borderStyle,
                  zIndex:val.zIndex,
                  padding:val.padding + 'px',
                  borderRadius:val.borderRadius + 'px',
                  background:val.background,
              }">
              <img
                :src="list[val.englishName] ? $store.state.domain + list[val.englishName] : 'static/image/pic.png'"
                class="mouseClass"
                @dblclick.stop="select_parts('listandpage_img','basic_listAndPage')"
                :class="[
                   $store.state.module_Data ? $store.state.parts == 'listandpage_img' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
                   $store.state.module_Data ? $store.state.hover_parts == 'listandpage_img' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
                   ]"
                data-Highlight="listandpage_img"
                v-if="val.englishName == 'img'">
              <p v-else
                 class="mouseClass"
                 v-show="val.englishName != 'icon'"
                 :style="{
                    lineHeight:val.lineHeight + 'px',
                    textAlign:val.textAlign,
                    color:val.color,

                    fontSize:val.fontSize + 'px',
                    fontWeight:val.englishName == 'name' ? val.fontWeight : 'normal'
                  }"
                 @dblclick.stop="select_parts(`listandpage_${val.englishName}`,'basic_listAndPage')"
                 :class="[
                 {'oneLine' : val.englishName != 'summary'},
                 $store.state.module_Data ? $store.state.parts == `listandpage_${ val.englishName}` && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
                   $store.state.module_Data ? $store.state.hover_parts == `listandpage_${ val.englishName}` && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
                 ]"
                 :data-Highlight="'listandpage_' + val.englishName"
              >{{list[val.englishName]|myFilter}}</p>

              <p v-if = "val.englishName == 'more'"
                 class="btnMore mouseClass"
                 @dblclick.stop="select_parts('listandpage_more','basic_listAndPage')"
                 :class="[
                   $store.state.module_Data ? $store.state.parts == 'listandpage_more' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
                   $store.state.module_Data ? $store.state.hover_parts == 'listandpage_more' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
                   ]"
                 data-Highlight="listandpage_more"
                 :style="{
                     background:val.background,
                    lineHeight:val.lineHeight + 'px',
                    textAlign:val.textAlign,
                    color:val.color,
                    fontSize:val.fontSize + 'px',
                    position: 'absolute',
                    top:0,
                    left:0,
                    zIndex:1,
                    }">{{val.content|myFilter}}</p>

              <!--图标-->
              <p v-if = "val.englishName == 'icon'"

                 :style="{
                    lineHeight:val.lineHeight + 'px',
                    textAlign:val.textAlign,
                  }">
                <i :style="{ background:val.background}"></i>
                <b
                  :class="[
                val.content,
                $store.state.module_Data ? $store.state.parts == 'listandpage_icon' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
                   $store.state.module_Data ? $store.state.hover_parts == 'listandpage_icon' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
                ]"
                  class="mouseClass"
                  @dblclick.stop="select_parts('listandpage_icon','basic_listAndPage')"
                  data-Highlight="listandpage_icon"
                  :style="{color:val.color,fontSize:val.fontSize + 'px',}"></b>
              </p>
            </li>
          </ul>
        </a>

        <div class="Mongolia"
             v-if="infor.Mongolia.isOpen === 'true'"

             :style="{
               display:($store.state.hover_parts == 'listandpage_hoverAnimation' || $store.state.parts == 'listandpage_hoverAnimation') && $store.state.module_Data.widgets_id == id ? 'block' : 'none',
               width:infor.Mongolia.width + 'px',
               height:infor.Mongolia.height + 'px',
               marginTop:infor.Mongolia.marginTop + 'px',
               marginLeft:infor.Mongolia.marginLeft + 'px',
                background:'transparent',
                opacity:1
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
                     :class="infor.MongoliaIcon.icon" class="icon" v-if="infor.MongoliaIcon.display == 'block'"></b>
                  <i :style="{
                            lineHeight:infor.MongoliaTitle.lineHeight + 'px',
                            width:infor.MongoliaTitle.width + 'px',
                            height:infor.MongoliaTitle.height + 'px',
                            fontSize:infor.MongoliaTitle.fontSize + 'px',
                            color:infor.MongoliaTitle.color}" v-text="list.name" v-if="infor.MongoliaTitle.display == 'block'"></i>
                  <em :style="{
                            lineHeight:infor.MongoliaContent.lineHeight + 'px',
                            width:infor.MongoliaContent.width + 'px',
                            height:infor.MongoliaContent.height + 'px',
                            fontSize:infor.MongoliaContent.fontSize + 'px',
                            color:infor.MongoliaContent.color}" v-text="list.summary" v-if="infor.MongoliaContent.display == 'block'"></em>

                </strong>

              </p>

            </div>

                    <span :style="{
                        opacity:infor.Mongolia.opacity,
                        background:infor.Mongolia.background,
                    }"></span>
          </a>
        </div>
      </div>

      <div id="page" :style="{
                    textAlign:infor.pageDefault.pagePosition,
                    height:infor.pageDefault.height + 'px',
                    left:infor.pageDefault.left + 'px',
                    bottom:infor.pageDefault.bottom + 'px',
                }"
           v-if="page != 0 && infor.pageDefault.isOpen == 'true' && listArr.Pattern === 'list'"
           class="mouseClass"
           @dblclick.stop="select_parts('listandpage_listPage','basic_listAndPage')"
           data-Highlight="listandpage_listPage"
           :class="[
                   $store.state.module_Data ? $store.state.parts == 'listandpage_listPage' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':'',
                   $store.state.module_Data ? $store.state.hover_parts == 'listandpage_listPage' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '':''
                   ]"
      >
        <div class="pageBox">
          <p :style="{
                        width:infor.pageDefault.firstBtnWidth + 'px',
                        height:infor.pageDefault.height + 'px',
                        background:infor.pageDefault.background,
                        borderLeftWidth:infor.pageDefault.borderLeftWidth + 'px',
                        borderRightWidth:infor.pageDefault.borderRightWidth + 'px',
                        borderTopWidth:infor.pageDefault.borderTopWidth + 'px',
                        borderBottomWidth:infor.pageDefault.borderBottomWidth + 'px',
                        borderColor:infor.pageDefault.borderColor,
                        borderStyle:infor.pageDefault.borderStyle,
                        borderRadius:infor.pageDefault.borderRadius + 'px',
                        marginLeft:infor.pageDefault.margin + 'px',
                        marginRight:infor.pageDefault.margin + 'px',
                    }">
            <a :style="{
                        lineHeight:infor.pageDefault.height + 'px',
                        color:infor.pageDefault.color,
                        textAlign:infor.pageDefault.textAlign,
                        fontSize:infor.pageDefault.fontSize + 'px',
                    }">首页</a>
          </p>
          <p :style="{
                        width:infor.pageDefault.nextBtnWidth + 'px',
                        height:infor.pageDefault.height + 'px',
                        background:infor.pageDefault.background,
                        borderLeftWidth:infor.pageDefault.borderLeftWidth + 'px',
                        borderRightWidth:infor.pageDefault.borderRightWidth + 'px',
                        borderTopWidth:infor.pageDefault.borderTopWidth + 'px',
                        borderBottomWidth:infor.pageDefault.borderBottomWidth + 'px',
                        borderColor:infor.pageDefault.borderColor,
                        borderStyle:infor.pageDefault.borderStyle,
                        borderRadius:infor.pageDefault.borderRadius + 'px',
                        marginLeft:infor.pageDefault.margin + 'px',
                        marginRight:infor.pageDefault.margin + 'px',

                    }">
            <a :style="{
                        lineHeight:infor.pageDefault.height + 'px',
                        color:infor.pageDefault.color,
                        textAlign:infor.pageDefault.textAlign,
                        fontSize:infor.pageDefault.fontSize + 'px',
                    }">上一页</a>
          </p>
          <ul>
            <li v-for="(val,i) in page" :class="{'selectPage': nowPage == i + 1}"
                :style="{
                        width:infor.pageDefault.width + 'px',
                        height:infor.pageDefault.height + 'px',
                        background:infor.pageDefault.background,
                        borderLeftWidth:infor.pageDefault.borderLeftWidth + 'px',
                        borderRightWidth:infor.pageDefault.borderRightWidth + 'px',
                        borderTopWidth:infor.pageDefault.borderTopWidth + 'px',
                        borderBottomWidth:infor.pageDefault.borderBottomWidth + 'px',
                        borderColor:infor.pageDefault.borderColor,
                        borderStyle:infor.pageDefault.borderStyle,
                        borderRadius:infor.pageDefault.borderRadius + 'px',
                        marginLeft:infor.pageDefault.margin + 'px',
                        marginRight:infor.pageDefault.margin + 'px',
                    }">
              <a
                v-text="i+1"
                :style="{
                  lineHeight:infor.pageDefault.height + 'px',
                  color:infor.pageDefault.color,
                  textAlign:infor.pageDefault.textAlign,
                  fontSize:infor.pageDefault.fontSize + 'px',
                }"></a>
            </li>
          </ul>
          <p :style="{
                width:infor.pageDefault.nextBtnWidth + 'px',
                height:infor.pageDefault.height + 'px',
                background:infor.pageDefault.background,
                borderLeftWidth:infor.pageDefault.borderLeftWidth + 'px',
                borderRightWidth:infor.pageDefault.borderRightWidth + 'px',
                borderTopWidth:infor.pageDefault.borderTopWidth + 'px',
                borderBottomWidth:infor.pageDefault.borderBottomWidth + 'px',
                borderColor:infor.pageDefault.borderColor,
                borderStyle:infor.pageDefault.borderStyle,
                borderRadius:infor.pageDefault.borderRadius + 'px',
                marginLeft:infor.pageDefault.margin + 'px',
                marginRight:infor.pageDefault.margin + 'px',
            }">
            <a
               :style="{
                        lineHeight:infor.pageDefault.height + 'px',
                        color:infor.pageDefault.color,
                        textAlign:infor.pageDefault.textAlign,
                        fontSize:infor.pageDefault.fontSize + 'px',
                    }">下一页</a>
          </p>
          <p :style="{
                        width:infor.pageDefault.firstBtnWidth + 'px',
                        height:infor.pageDefault.height + 'px',
                        background:infor.pageDefault.background,
                        borderLeftWidth:infor.pageDefault.borderLeftWidth + 'px',
                        borderRightWidth:infor.pageDefault.borderRightWidth + 'px',
                        borderTopWidth:infor.pageDefault.borderTopWidth + 'px',
                        borderBottomWidth:infor.pageDefault.borderBottomWidth + 'px',
                        borderColor:infor.pageDefault.borderColor,
                        borderStyle:infor.pageDefault.borderStyle,
                        borderRadius:infor.pageDefault.borderRadius + 'px',
                        marginLeft:infor.pageDefault.margin + 'px',
                        marginRight:infor.pageDefault.margin + 'px',
                    }">
            <a :style="{
                        lineHeight:infor.pageDefault.height + 'px',
                        color:infor.pageDefault.color,
                        textAlign:infor.pageDefault.textAlign,
                        fontSize:infor.pageDefault.fontSize + 'px',
                    }">末页</a>
          </p>
        </div>
      </div>

      <div class="bottomHeight" :style="{
                height:infor.frame.paddingBottom + 'px',
                width:'100%',
                float:'left'
            }"></div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import Bus from '../../base/bus';
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
        indexData:[],
        page:0,
        selectPage:0,
        nowPage:0,
        nextBtnUrl:'',
        lastBtnUrl:'',
        searchType:'',
        pageType:'',
        loading:false,
        myList:[],
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
    },
    components:{


    },
    watch:{
      'listArr.listArr'(val){
        this.init();
      },
      'listArr.listType'(val){
          if(val != 'search'){
              this.ajax_init();
          }
          else{
              this.indexData = [];
              this.page = 0;
          }

      },
      'listArr.Pattern'(){
        this.init();
        this.ajax_init();
      },
      'infor.summaryLength':function (val) {
        this.textLength();
      },
        'infor.frame.showNum'(){
            this.ajax_init();
        },

    },
    filters:{
      myFilter:function(value){
        if(typeof value === 'string'){
          var str = value.replace(/`/g,'"');
          return str
        }
        else{
            return value
        }
      },
    },


    methods:{
      textLength:function () {
        var module = this.indexData;
        for(var i = 0; i < module.length; i++ ){
          //第一次的时候，备份一下简介数据，后面每次修改，都在备份的这个简介上做操作
          if(!module[i].mySummary){
            module[i].mySummary = module[i].summary;
          }
          if(module[i].mySummary.length > this.infor.summaryLength){
            module[i].summary = module[i].mySummary.substring(0,this.infor.summaryLength) + '...';
          }
          else if(module[i].mySummary.length == this.infor.summaryLength){
            module[i].summary = module[i].mySummary
          }

          if (this.infor.summaryLength == 0){
            module[i].summary = '';
          }
        }
        this.indexData = module;
      },
      init(){
        if(this.listArr.Pattern != 'recommend'){
          return;
        }
        this.indexData = this.listArr.listArr;
        this.textLength();
        this.$nextTick(()=>{
          this.my_draggable();
          this.my_resizable();
          //this.Mongolia_init();
        })
      },
      ajax_init(){
        if(this.listArr.Pattern != 'list'){
          return;
        }
        if(this.listArr.listType == 'search'){
            this.indexData = [];
            this.page = 0;
            return;
        }
        const that = this;
        var $url = '';
        if (this.listArr.listType == 'product') {
          $url = '/index_pc.php/newapi/goods/getlist';
        }
        if (this.listArr.listType == 'case') {
          $url = '/index_pc.php/newapi/article/getlist/type/3';
        }
        if (this.listArr.listType == 'article') {
          $url = '/index_pc.php/newapi/article/getlist/type/1';
        }
        if (this.listArr.listType == 'download') {
          $url = '/index_pc.php/newapi/article/getlist/type/4';
        }
        if (this.listArr.listType == 'video') {
          $url = '/index_pc.php/newapi/article/getlist/type/11';
        }
        if (this.listArr.listType == 'help') {
          $url = '/index_pc.php/newapi/article/getlist/type/2';
        }

        //const path = this.$store.state.domain + $url;
        this.loading = true;
        $.get($url, function(data){
          that.loading = false;
          var list = [];
          if(data.code === 200){
            var list_length = data.data.length;
            if(!data.data instanceof Array){
              return;
            }

            list = [...data.data];
            for(var i = 0;i<list.length;i++){
              var num = parseInt(list[i].updatetime)*1000;
              var t = new Date(num).toLocaleString();
              var nian = t.split(' ')[0].replace(/\//g,'-');
              list[i].createtime = nian;
              list[i].up_time = nian;
              list[i].time = nian;
              list[i].src = list[i].img;
              list[i].content = list[i].summary;
              list[i].link = `/${that.type}-item-${list[i].id}.html`;
              list[i].name = list[i].title;
              list[i].mySummary = list[i].summary;
              list[i].price_sell = list[i].price_sell ? list[i].price_sell.toFixed(2) : '0.00';
            }

            that.indexData = list.splice(0,that.infor.frame.showNum);
            that.textLength();
            that.page = Math.ceil(list_length/that.infor.frame.showNum);

            that.$nextTick(()=>{
              that.my_draggable();
              that.my_resizable();
              //that.Mongolia_init();
            })
          }
          else{
            that.loading = false;
            that.$message.error('网络异常，请稍后尝试！');
          }
        });
      },

      //拖拽和缩放，公共的更新数据
      update_data({dom,key1,val1,key2,val2}){
        const pid = this.pid;
        const id = this.id;
        const type = this.rowType;
        const IndexObj = this.templet.p_find_moduleIndex({pid,type,id});
        const component_index = dom.attr('component_index');
        //修改数据源
        this.$store.state[type][IndexObj.row].children[IndexObj.module].data.infor.Component[component_index][key1] = val1;
        this.$store.state[type][IndexObj.row].children[IndexObj.module].data.infor.Component[component_index][key2] = val2;
        Bus.$emit('listandpage_update_data',{component_index,key1,val1,key2,val2});
      },

      //拖拽
      my_draggable(){
        const that = this;
        var is_disabled = false;
        if(this.$store.state.module_name != 'basic_listAndPage'){
          is_disabled = true;//row排序后，重新渲染组件，这时拖拽应该是关闭的
        }

        $(`#u${this.id}`).find('.li_move').draggable({
          containment:"parent",
          disabled: is_disabled,
            start:function () {
                //对齐线开始准备//对齐线逻辑
                that.templet.aline_start(that,$(this),'.li_move');
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
        $(`#u${this.id}`).find('.li_move').resizable({
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

      open_draggable(){
        $(`#u${this.id}`).find('.li_move').draggable({ disabled: false });

      },

      Mongolia_init(){
        const that = this;
        if(this.infor.Mongolia.isOpen == 'true'){

          $(`#u${this.id}`).find('.listEveryOne').hover(
            function () {
              $(this).find('.Mongolia').stop(true,true).delay(200).show(
                {
                  effect:that.infor.Mongolia.animation,
                  direction:that.infor.Mongolia.direction,
                  duration:that.infor.Mongolia.time
                }
              )
            },
            function () {
              $(this).find('.Mongolia').stop(true,true).delay(200).hide(
                {
                  effect:that.infor.Mongolia.animation,
                  direction:that.infor.Mongolia.direction,
                  duration:that.infor.Mongolia.time
                }
              )
            }
          )
        }
      }




    },

    mounted(){
      this.init();
      this.ajax_init();





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
