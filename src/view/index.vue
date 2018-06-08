<template>
  <!-- 屏蔽右键  @click="clear_select_module"-->

  <div class="hello " id="app_child_frame" @mousedown="selectableOpen" oncontextmenu="return false">
    <!-- <div class="hello " id="app_child_frame"> -->

    <div class="main-wrapper"></div>
    <div class="guideColor">
      <span>参考线颜色：</span>
      <el-color-picker v-model="color" popper-class="guideColorSelect" @active-change="changeColor"></el-color-picker>
    </div>
    <!--左侧栏-->
    <Left-sidebar></Left-sidebar>

    <!--右侧边栏-->
    <right-sidebar></right-sidebar>

    <!--历史记录-->
    <historical-record></historical-record>

    <!--挂件保存-->
    <template-dialog></template-dialog>

    <!--容器组合-->
    <row-group></row-group>

    <!--顶部栏-->
    <top-bar></top-bar>

    <!--底部栏-->
    <bottom-bar></bottom-bar>

    <!--主体-->
    <!--<div class="subject" id="main-subject" :style="{height:`${subjectHeight}px`}">

		</div>-->
    <p style="height: 60px;"></p>
    <my-header></my-header>
    <my-body></my-body>
    <my-footer></my-footer>

    <div class="allMongolia" v-if="$store.state.module_name != '' && $store.state.module_name != 'basic_text_editor'" @click="templet.p_bottomBar_close()"></div>
    <div class="allMongolia special_mongolian" v-if="$store.state.special_mongolian.switch" @click="templet.Special_Mongolian_Close()"></div>
    <!-- 图片选择 -->
    <!--<pic-select></pic-select>-->
    <picture-selector v-if="$store.state.showPicCon"></picture-selector>
    <edit-mask></edit-mask>

    <!-- 公用的框 -->
    <edit-public></edit-public>
    <!--<div class="Mongolia" v-if="$store.state.parts"></div>-->

    <!--样式保存-->
    <style-save v-if="$store.state.styleSave_IsOpen"></style-save>

    <!--icon选择-->
    <icon-search></icon-search>

    <!--数据选择器-->
    <!--<edit-list></edit-list>-->

    <!--<my-nav></my-nav>-->
  </div>
</template>

<script type="text/ecmascript-6">

import TopBar from "./public/topBar";
import MyHeader from "./public/header";
import MyBody from "./public/body";
import MyFooter from "./public/footer";
import BottomBar from "./dialog/bottomBar";
import LeftSidebar from "./dialog/leftSidebar";
import rightSidebar from "./dialog/rightSidebar";
import historicalRecord from "./dialog/historical_record";
import templateDialog from "./dialog/template";
import rowGroup from "./dialog/row_group";
//import picSelect from './public/pic_select';
import editMask from "./public/edit_mask";
import editPublic from "./dialog/edit_public";
import StyleSave from "./public/edit_styleSave.vue";
import PictureSelector from "./public/picture_selector.vue";
//import EditList from './public/edit_list';


//import Module from '../base/one_module';
export default {
  name: "index",
  data() {
    return {
      subjectHeight: this.templet.screenHeight - 60,
      animatedArr: [],
      docWidth: $("body").width(),
      color: this.$store.state.guideColor,
      mydebounce:null,
      mouse_over_debounce:null,
      mouse_obj:null,
      mouse_out_debounce:null,
      is_out:false
    };
  },
  components: {
    TopBar,
    BottomBar,
    MyHeader,
    MyBody,
    MyFooter,
    LeftSidebar,
    editMask,
    editPublic,
    PictureSelector,
    StyleSave,
    rightSidebar,
    //EditList,
    historicalRecord,
      templateDialog,
      rowGroup
  },
  methods: {
    changeColor(val){
      this.color = val
    },
    mousedown(e) {
      if (e.which == 3) {
        this.$store.state.parts = "";
      }
    },

    selectableOpen(e) {
      if (e.which == 3) {
        this.$store.state.parts = "";
      }
    },
   

    header_fixed() {
      const ele = document.querySelector(".rowFixed"); //是否存在固定的row

      if (ele) {
        var nextEle = document.querySelector(".rowFixedNext"); //如果不存在就插入一个
        if (!nextEle) {
          $(".rowFixed").after('<div class="rowFixedNext"></div>');
          $(".rowFixedNext").css("marginTop", 0);
        }
        var nowY = $(window).scrollTop();

        if (nowY + 60 > this.$store.state.fixed.top) {
          $(".rowFixed").css({
            position: "fixed",
            left: 0,
            top: 60,
            zIndex: 900
          });

          $(".rowFixedNext").css(
            "height",
            this.$store.state.fixed.height + "px"
          );
        } else {
          $(".rowFixed").css({
            position: "relative",
            top: 0,
            zIndex: "auto"
          });
          $(".rowFixedNext").css("height", 0);
        }
      }
    },

      copy_row(){
        const Store = this.$store;
          if(e.keyCode == 67 && e.shiftKey) {

              if(Store.state.select_row){
                  Store.state.widgets_id ++ ;
                  Store.state.copy_row = JSON.parse(JSON.stringify(Store.state.select_row));
                  Store.state.copy_row.widgets_id = Store.state.widgets_id;
                  console.log(Store.state.copy_row);
              }

          }
      },

      historical_record(){


      },

      //初始化防抖函数
      mydebounce_init(){
          this.mydebounce = this.templet.mydebounce(()=>{
              //this.templet.websql_data_last();
              this.$store.dispatch('historical/websql_data_last');
          },1000);
      },

      //悬浮防抖
      mouse_debounce(){
          this.mouse_over_debounce = this.templet.mydebounce(()=>{
              this.update_module_name();
          },300);
      },

      update_module_name(){


          if(this.$store.state.module_name && this.mouse_obj){
              const Highlight = this.mouse_obj.attr('data-Highlight');
              this.templet.p_index_hover_parts(Highlight);
          }
      },

      out_debounce(){

          this.mouse_out_debounce = this.templet.mydebounce(()=>{
              this.templet.p_index_out_parts();
              //this.mouse_obj = null;
          },200);
      },






  },
  updated() {
    this.$nextTick(function() {
        //将所有拥有动画的dom 去除dom的class
      let temArr = $("#app #main-subject .hasAnimated");
      for (let i = 0, len = temArr.length; i < len; i++) {
        // oldAnimated 若是旧的动画挂件  则不需要移除其动画的class
        if (!$(temArr[i]).hasClass("oldAnimated")) {
          // $(temArr[i]).removeClass().addClass('animated hasAnimated oldAnimated');
          $(temArr[i]).addClass("oldAnimated");
        }
      }
    });
  },
  computed: {
    initStatus() {
      return this.$store.state.initStatus;
    }
  },
  watch: {
      "$store.state.body":{
          handler: function (val, oldVal) {

              this.$nextTick(() => {
                  //其中的逻辑做过判断，不会每次监控触发都触发绑定拖拽
                  this.templet.right_sidebar_child_sort();

                  //插入历史记录的入口
                  /*if(this.mydebounce != null){
                      this.mydebounce()
                  }*/

                  //绑定拖拽，防止拖拽失效
                  this.templet.moudle_draggable();

                  //绑定缩放，防止拖拽失效
                  this.templet.moudle_resizable();

                  //row绑定缩放，防止缩放失效
                  this.templet.row_resizable();


              });
          },
          deep: true
      },
      "$store.state.header":{
          handler: function (val, oldVal) {
              this.$nextTick(() => {
                  if ($(".rowFixed").length > 0) {
                      this.templet.header_fixed_set($(".rowFixed").attr("id").replace("u", ""));
                  }
                  this.templet.right_sidebar_child_sort();

                  //插入历史记录的入口
                  /*if(this.mydebounce != null){
                      this.mydebounce()
                  }*/

                  //绑定拖拽，防止拖拽失效
                  this.templet.moudle_draggable();

                  //绑定缩放，防止拖拽失效
                  this.templet.moudle_resizable();

                  //row绑定缩放，防止缩放失效
                  this.templet.row_resizable();
              });
          },
          deep: true
      },
      "$store.state.footer":{
          handler: function (val, oldVal) {
              this.$nextTick(() => {
                  this.templet.right_sidebar_child_sort();
                  //插入历史记录的入口
                  /*if(this.mydebounce != null){
                      this.mydebounce()
                  }*/

                  //绑定拖拽，防止拖拽失效
                  this.templet.moudle_draggable();

                  //绑定缩放，防止拖拽失效
                  this.templet.moudle_resizable();

                  //row绑定缩放，防止缩放失效
                  this.templet.row_resizable();

              });
          },
          deep: true
      },
      '$store.state.special_mongolian.switch'(val){
          if(val){
              const row_id = this.$store.state.special_mongolian.module.pid;
              $(`#u${row_id}`).addClass('clear_z-index');
          }
          else{
              this.templet.row_removeClass_clear();
          }
      },


    docWidth(val) {
      if (!this.timer) {
        this.docWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.templet.createGuide();
          that.timer = false;
        }, 400);
      }
    },
    color(val) {
      $(".guide").css("border-color", val);
      this.$store.commit("CHANGCOLOR", val);
    },
    initStatus(val) {
      setTimeout(() => {
        //增加标尺
        this.templet.createGuide();
      }, 0);
    },

  },
  mounted() {
      const that = this;
    // this.templet.p_test();
    //这个是正式接口的
    this.templet.p_init();
    //this.templet.websql_create();//创建websql
    //this.$store.commit.websql_create();//创建websql
    //this.$store.commit('test/mytest');//创建websql
    this.$store.dispatch('historical/websql_create');//创建websql
    this.mydebounce_init();//初始化防抖函数
     this.mouse_debounce();//初始化防抖函数
     //this.out_debounce();//初始化防抖函数

    // 动画
    $(document).scroll(() => {
      this.templet.animatedAll();
      //this.templet.header_fixed();

      this.header_fixed();
    });


    /* $("#app").on("mouseenter", ".module", function(e) {
          e.stopPropagation();


          //that.templet.public_edit_judge($(this))
      });*/

    //module悬浮状态

    //row排序优化，鼠标按下，先把被拖拽元素隐藏掉，这样开始排序后，计算高度不会因为太高从而影像排序
    $("#app").on("mousedown", ".handle_sortable", function(e) {
        //e.stopPropagation();
        if(e.button === 0){
            $(this).parents('.layout_row').addClass('Sortableitem_ing');
            const mouse_top = e.clientY;
            that.templet.create_sort_Prompt(mouse_top);
        }

    });

    $("#app").on("mouseup", function(e) {
        that.templet.row_show();
        that.templet.del_sort_Prompt();
    });

    $("body").on("mouseup", '.sort_Prompt',function(e) {
        that.templet.row_show();
        that.templet.del_sort_Prompt();
    });



    $("#app").on("mouseover", ".mouseClass", function(e) {
      e.stopPropagation();
        $(this).addClass("index_Highlight_hover");
        that.mouse_obj = $(this);
        that.mouse_over_debounce();
        that.templet.public_edit_judge($(this))
    });



    $("#app").on("mouseout", ".mouseClass", function(e) {
      e.stopPropagation();
      $(this).removeClass("index_Highlight_hover");
        that.mouse_obj =null;
        //that.templet.public_edit_recovery();
    });


      /*$("#app").on("mouseleave", ".module", function(e) {
          e.stopPropagation();
          that.templet.public_edit_recovery();
          //that.mouse_out_debounce();
      });*/





    //row悬浮状态
    /*$("#app").on("mouseover", ".layout_row", function(e) {
      $(this).addClass("layout_row_hover");
    });

    $("#app").on("mouseout", ".layout_row", function(e) {
      $(this).removeClass("layout_row_hover");
    });

    //laybox 悬浮状态
    $("#app").on("mouseover", ".laybox", function(e) {
      e.stopPropagation();
      $(this).addClass("layout_row_hover");
    });

    $("#app").on("mouseout", ".laybox", function(e) {
      e.stopPropagation();
      $(this).removeClass("layout_row_hover");
    });*/

      /* $("#app").on("click", ".edit_second_level", function(e) {
          e.stopPropagation();
          const edit_type = $(this).attr('data-Highlight');
          const ch = $(this).text();
          that.templet.p_select_parts(edit_type);
          if($('.bottom_second').length > 0){
              $('.bottom_second').text('/' + ch);
          }
      }); */


      //键盘事件
      $(document).keydown((e)=>{
          //上下左右
          this.templet.up_and_down(e);

          //delete键删除挂件
          this.templet.deleteKey(e);

          //复制挂件
          this.templet.copy_assembly(e);

          //黏贴挂件
          this.templet.paste_assembly(e,this.$message);

          //撤销
          this.$store.dispatch('historical/Revoke',{
              event:e,
              $message:this.$message,
          });
          //this.templet.Revoke(e,this.$message);

          //恢复
          this.$store.dispatch('historical/Recovery',{
              event:e,
              $message:this.$message,
          });
          //this.templet.Recovery(e,this.$message);

      });

    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.docWidth = window.screenWidth;
      })();
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>


