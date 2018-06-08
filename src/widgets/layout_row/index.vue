<template>
  <!--position: $store.state.fixed.id === widgetId ? 'fixed' : 'relative',-->
  <div class="layout_row layrow"
       :id="'u' + widgetId"
       :data-id="'u' + widgetId"
       :style="{
    backgroundColor:infor.r_background,
    height:infor.module_height + 'px',
    padding:infor.r_fill + 'px',
    borderTopStyle:infor.r_border_top_style,
    borderTopWidth:infor.r_border_top_width + 'px',
    borderTopColor:infor.r_border_top_color,
    borderBottomStyle:infor.r_border_bottom_style,
    borderBottomWidth:infor.r_border_bottom_width + 'px',
    borderBottomColor:infor.r_border_bottom_color,
    backgroundImage:infor.r_bg_src ? `url(${$store.state.domain}${infor.r_bg_src})` : '',
    backgroundRepeat:infor.r_tile_style,
    backgroundPosition:infor.r_bg_position,
    zIndex:infor.module_index,
  }"
       :rowType="rowType" name="layout_row"
       :class="[
       $store.state.parts == 'row' && $store.state.module_Data.widgets_id == widgetId ? 'index_Highlight' : '',
       $store.state.hover_parts == 'row' && $store.state.module_Data.widgets_id == widgetId ? 'index_Highlight' : '',
       $store.state.select_row ? $store.state.select_row.widgets_id == widgetId ? 'index_Highlight' : '' : '',
       $store.state.module_Data ? $store.state.module_Data.widgets_id == widgetId ? 'moduleTop' : '' : '',
       $store.state.fixed.id === widgetId && rowType=='header'? 'rowFixed' : '',
       special_moduleTop,
       ]">


    <div class="Sortable_Door" @mousedown.stop>
      <i class="el-icon-caret-bottom" @click.stop="row_down"></i>
      <i class="el-icon-caret-top" @click.stop="row_up"></i>
    </div>

    <!--排序门板-->
    <div class="handle_sortable">
      <i class="el-icon-tickets"></i>
    </div>

    <div class="editing_block_Mongolia"
         @click="templet.select_editing_block('header')"
         v-if="$store.state.editing_block != 'header' && $store.state.fixed.id === widgetId && rowType=='header'"
         style="height: 100%;"
    >点击蒙层，开启顶部编辑！</div>



    <!--编辑状态渲染-->
    <div class="row_Mongolia" v-if="$store.state.module_Data ? $store.state.module_Data.widgets_id == widgetId ? true : false : false" @click.stop="close"></div>

    <!--编辑状态不渲染-->
    <div class="row_edit" v-if="$store.state.module_Data ? $store.state.module_Data.widgets_id == widgetId ? false : true : true"  @mousedown.stop>
      <ul>
        <li class="el-icon-edit" @click.stop="select_parts('')" title="编辑容器"></li>
        <li class="el-icon-plus" @click.stop="addRow" title="增加容器"></li>
        <li class="el-icon-delete" @click.stop="dele_row" title="删除容器"></li>
        <!--<li class="fa-hand-o-down" @click.stop="templet.select_row(widgetId,rowType)" style="font-family: FontAwesome" title="选中容器"></li>-->
      </ul>
    </div>

    <div class="module_selectable" @mousedown="templet.clear_select_module" >
      <div class="laybox row_droppable_region" :style="{
      width:infor.module_width + 'px',
      height:'100%',
      backgroundColor:infor.w_background,
      opacity:infor.w_opacity,
      borderTopStyle:infor.w_border_top_style,
      borderTopWidth:infor.w_border_top_width + 'px',
      borderTopColor:infor.w_border_top_color,
      borderBottomStyle:infor.w_border_bottom_style,
      borderBottomWidth:infor.w_border_bottom_width + 'px',
      borderBottomColor:infor.w_border_bottom_color,
      borderLeftStyle:infor.w_border_left_style,
      borderLeftWidth:infor.w_border_left_width + 'px',
      borderLeftColor:infor.w_border_left_color,
      borderRightStyle:infor.w_border_right_style,
      borderRightWidth:infor.w_border_right_width + 'px',
      borderRightColor:infor.w_border_right_color,
      backgroundImage:infor.w_bg_src ? `url(${$store.state.domain}${infor.w_bg_src})` : '',
      backgroundRepeat:infor.w_tile_style,
      backgroundPosition:infor.w_bg_position
    }"
           :class="[
       $store.state.parts == 'laybox' && $store.state.module_Data.widgets_id == widgetId ? 'index_Highlight' : '',
       $store.state.hover_parts == 'laybox' && $store.state.module_Data.widgets_id == widgetId ? 'index_Highlight' : '',
       moduleTop,
       $store.state.add_module_prompt && $store.state.editing_block === rowType ? 'select_laybox' : ''



       ]">
        <div class="allMongolia"
             v-if="$store.state.module_name != '' && $store.state.module_name != 'basic_text_editor' && $store.state.module_Data && $store.state.module_Data.pid == widgetId"
             @mousedown.stop
             @click.stop="templet.p_bottomBar_close()"></div>
        <div class="allMongolia special_mongolian" v-if="$store.state.special_mongolian.switch && $store.state.special_mongolian.module && $store.state.special_mongolian.module.pid == widgetId" @click="templet.Special_Mongolian_Close()"></div>
        <basic-module
          v-for="(val,i) in children"
          :id="val.widgets_id"
          :name="val.name"
          :css="val.data.css"
          :key="i"
          :pid="val.pid"
          :rowType="val.rowType"
          :animateObj="val.data.animateObj"
          :infor="val.data.infor"
          :listArr="val.data.listArr"
          :isShow="val.isShow"
        >
          <component :is="widgets.indexOf(val.name) >-1 ? val.name : ''"
                     slot="content"
                     :name="val.name"
                     :infor="val.data.infor"
                     :listArr="val.data.listArr"
                     :id="val.widgets_id"
                     :pid="val.pid"
                     :css="val.data.css"
                     :rowType="val.rowType" ></component>

        </basic-module>

      </div>
    </div>


  </div>
</template>

<script>
  import Row from '../../base/one_row';
  import BasicModule from '../basic_module/index';
  import basic_banner from '../basic_banner/index';
  import basic_picture from '../basic_picture/index';
  import basic_date from '../basic_date/index';
  import basic_goback from '../basic_goback/index';
  import basic_text_editor from '../basic_text_editor/index';
  import basic_location from '../basic_location/index';
  import basic_locationtitle from '../basic_locationtitle/index';
  import basic_video from '../basic_video/index';
  import basic_searchs from '../basic_searchs/index';
  import basic_language from '../basic_language/index';
  import basic_customedit from '../basic_customedit/index';
  import basic_gratext from '../basic_gratext/index';
  import basic_links from '../basic_links/index';
  import basic_nleavemessage from '../basic_nleavemessage/index';
  import basic_navtmp from '../basic_navtmp/index';
  import basic_picarticle_a from '../basic_picarticle_a/index';
  import basic_webmap from '../basic_webmap/index';
  import basic_listAndPage from '../basic_listandpage/index';
  import basic_pages from '../basic_pages/index';
  import basic_detailarticle from '../basic_detailarticle/index';
  import basic_magnifyingglass from '../basic_magnifyingglass/index';
  import basic_helps from '../basic_helps/index';
  import basic_jobs from '../basic_jobs/index';
  import basic_jobdetail from '../basic_jobdetail/index';
  import basic_map from '../basic_map/index';
  import basic_catelog from '../basic_catelog/index';
  import basic_honor from '../basic_honor/index';
  import basic_honor_rl from '../basic_honor_rl/index';
  import basic_picarticle from '../basic_picarticle/index';
  import basic_code from '../basic_code/index';



  export default {
    name: 'layout_row',
    props:{
      infor:{
        type:Object,
        default:null,
      },
      widgetId:{
        type:String,
        default:''
      },
      pid:{
        type:String,
        default:''
      },
      children:{
        type:Array,
        default:[]
      },
      rowType:{
        type:String,
        default:''
      },
    },
    data () {
      return {
          widgets:['Row','BasicModule','basic_banner','basic_picture','basic_date','basic_goback','basic_text_editor','basic_location','basic_locationtitle','basic_video','basic_searchs','basic_language','basic_customedit','basic_customedit','basic_gratext','basic_links','basic_nleavemessage','basic_navtmp','basic_picarticle_a','basic_webmap','basic_listAndPage','basic_pages','basic_detailarticle','basic_magnifyingglass','basic_helps','basic_jobs','basic_jobdetail','basic_map','basic_catelog','basic_honor','basic_honor_rl','basic_picarticle','basic_code']
      }
    },
      computed:{
          /*no_select_laybox(){
              if(this.$store.state.add_module_prompt){
                  return 'no_select_laybox';
              }
              else{
                  return '';
              }
          },

          select_laybox(){
              if(this.$store.state.add_module_prompt){
                  return 'select_laybox';
              }
              else{
                  return '';
              }
          },*/
          moduleTop(){
              if(this.$store.state.module_Data){
                  //快速文本不应该有高亮
                  if(this.$store.state.module_Data.name == 'basic_text_editor'){
                      return '';
                  }
                  if(this.$store.state.module_Data.pid == this.widgetId){
                      return 'moduleTop';
                  }
              }
          },
          special_moduleTop(){
              if(this.$store.state.special_mongolian.module){
                  if(this.$store.state.special_mongolian.module.pid == this.widgetId){
                      return 'special_moduleTop';
                  }else{
                      return '';
                  }
              }else{
                  return '';
              }

          }
      },
    methods:{
      //行排序向下
      row_down(){
        //当前点击加好的row的index
        const index = this.templet.p_find_rowIndex({
          id:this.widgetId,
          type:this.rowType
        });
        const arrLength = this.$store.state[this.rowType].length;
        if(index == arrLength - 1){
          this.$message.error('已经是最后一个了，无法向下了！');
          return;
        }
        const handle_row = this.$store.state[this.rowType].splice(index,1)[0];
        this.$store.state[this.rowType].splice(index+1,0,handle_row);
          this.templet.module_add_historical('行容器排序');
      },
      //行排序向上
      row_up(){
        //当前点击加好的row的index
        const index = this.templet.p_find_rowIndex({
          id:this.widgetId,
          type:this.rowType
        });
        if(index == 0){
          this.$message.error('已经是第一个了，无法向上了！');
          return;
        }
        const handle_row = this.$store.state[this.rowType].splice(index,1)[0];
        this.$store.state[this.rowType].splice(index-1,0,handle_row);
          this.templet.module_add_historical('行容器排序');
      },

      //删除行
      dele_row(){

        this.$confirm(`确定删除当前容器?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          const num = this.$store.state[this.rowType].length;
          if(num <= 1){
            this.$message.error('最后一个无法删除！');
            return;
          }

          //当前点击加好的row的index
          const index = this.templet.p_find_rowIndex({
            id:this.widgetId,
            type:this.rowType
          });
          this.$store.state[this.rowType].splice(index,1);

            this.templet.module_add_historical('删除行容器');
            this.$nextTick(()=>{
                this.templet.createGuide();
            })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除容器'
          });
        });
      },
      //增加行
      addRow(){
        //当前点击加好的row的index
        const index = this.templet.p_find_rowIndex({
          id:this.widgetId,
          type:this.rowType
        });
        this.$store.state.widgets_id ++;
        let oneRow = new Row({
          widgets_id:this.$store.state.widgets_id.toString()
        });
          oneRow.data.infor.module_width = this.$store.state.pagewidth;

        this.$store.state[this.rowType].splice(index+1,0,oneRow);
          this.templet.module_add_historical('增加行容器');
        this.$nextTick(()=>{
            this.templet.row_scroll(oneRow.widgets_id);
            this.$store.state.select_row = oneRow;
            this.templet.createGuide();
        });



      },
      select_parts(parts){

        const id = this.widgetId;
        const type = this.$store.state.editing_block;
        const index = this.templet.p_find_rowIndex({id,type});

        let editObj = JSON.parse(JSON.stringify(this.$store.state[type][index]));
        delete editObj.children;
        this.$store.state.module_Data = editObj;
        this.$store.state.module_name = 'layout_row';
        this.$store.state.parts = parts;

        //选中的row滚动到顶部
        const row = $('#u' + this.widgetId);
        const rowParent = $('#u' + this.widgetId).parent();
        const rowOffsetTop = row[0].offsetTop + rowParent[0].offsetTop;
        $('#main-subject').animate({scrollTop:rowOffsetTop + 'px'},200);

      },
      close(){
        this.$store.state.module_name = '';
        this.$store.state.parts = '';
        this.$store.state.module_Data = null;
        this.$store.state.hover_parts = '';
      },
      //module放置在row里,module跨row放置
      moduleToLaybox(){
        const that = this;
        $('#u'+this.widgetId).droppable({
          accept:'.Module_one',
          over:function (event, ui) {
            //放上来的是module

            const rowId = $(this).attr('id');
            const module_pid = `u${ui.draggable.attr('pid')}`;

            //跨到另外一个row
            if(module_pid != rowId){
              if($(this).parent('.layout_parent').hasClass('editing_block')){
                $(this).addClass('moduleChangeRow');
              }
            }
          },
          out:function (event, ui) {
            if($(this).hasClass('moduleChangeRow')){
              $(this).removeClass('moduleChangeRow');
            }
          },
          drop:function (event, ui) {

            //放上来的是module
            const rowId = $(this).attr('id');
            const module_pid = `u${ui.draggable.attr('pid')}`;
            const module_id = ui.draggable.attr('id');
            const module_name = ui.draggable.attr('name');
            const rowType = $(this).attr('rowType');
            const layBox = $(this).find('.laybox');

            //如果放置的row不是编辑的范围
            if(rowType != that.$store.state.editing_block){
              that.$message.error('当前容器不可放置！');
              return;
            }

            //module放置到别的row
            if(module_pid != rowId){

              //放置在可以编辑的row上
              if($(this).parent('.layout_parent').hasClass('editing_block')){
                //放置的rowindex
                const row_widgetId = rowId.replace('u','');
                const target_index = that.templet.p_find_rowIndex({
                  id:row_widgetId,
                  type:rowType
                });

                //当前module和当前的row index
                const IndexObj = that.templet.p_find_moduleIndex({
                  pid:module_pid.replace('u',''),
                  type:rowType,
                  id:module_id.replace('u','')
                });

                //删除被拖拽的module
                const move_module = JSON.parse(JSON.stringify(that.$store.state[rowType][IndexObj.row].children.splice(IndexObj.module,1)[0]));

                //计算拖拽后的位置
                const layboxLeft = layBox.offset().left;
                const layboxtop = layBox.offset().top;
                const module_offset_left = ui.draggable.offset().left;
                const module_offset_top = ui.draggable.offset().top;
                const module_left = event.clientX - layboxLeft - (event.clientX - module_offset_left);
                const module_top = event.clientY - layboxtop - (event.clientY - module_offset_top);

                that.$nextTick(function () {
                   move_module.pid = row_widgetId;//修改pid
                   move_module.data.css.module_left = module_left;
                   move_module.data.css.module_top = module_top;
                  that.$store.state[rowType][target_index].children.push(move_module);

                  //重新渲染,删除module的那个row里的所有dom
                  that.templet.p_rowChild_Renderer({
                    id:module_pid.replace('u',''),
                    type:rowType
                  });
                  that.$message.success('组件转移容器成功！');
                    const name = that.templet.p_nameToChinese(module_name);
                    that.templet.module_add_historical(name+'转移');

                });

                //去除悬浮颜色
                if($(this).hasClass('moduleChangeRow')){
                  $(this).removeClass('moduleChangeRow');
                }
              }
            }
          }
        });
      },

      clear_select_module(){
        this.templet.clear_select_module();
      },
      select_row(){
        //当前点击加好的row的index
        const index = this.templet.p_find_rowIndex({
          id:this.widgetId,
          type:this.rowType
        });

        const row = JSON.parse(JSON.stringify(this.$store.state[this.rowType][index]));
        delete row.children;
        this.$store.state.select_row = row;
      }
    },
    components:{
      BasicModule,
      basic_banner,
      basic_picture,
      basic_date,
      basic_goback,
      basic_text_editor,
      basic_location,
      basic_locationtitle,
      basic_video,
      basic_searchs,
      basic_language,
      basic_customedit,
      basic_gratext,
      basic_links,
      basic_nleavemessage,
      basic_navtmp,
      basic_picarticle_a,
      basic_webmap,
      basic_listAndPage,
      basic_pages,
      basic_detailarticle,
      basic_magnifyingglass,
      basic_helps,
      basic_jobs,
      basic_jobdetail,
      basic_map,
      basic_catelog,
      basic_honor,
      basic_honor_rl,
      basic_picarticle,
      basic_code
    },
      watch:{
        'infor.module_height'(){
            this.$nextTick(()=>{
                this.templet.createGuide();
            });

        }

      },

    mounted(){
      // w_bg_position
      if(!this.infor.r_bg_position){
        this.infor.r_bg_position = 'center center'
      }

      if(!this.infor.w_bg_position){
        this.infor.w_bg_position = 'center center'
      }
      //module放置在row里,module跨row放置
      this.moduleToLaybox();

      //laybox放置挂件，新增module
      this.templet.row_droppable();

      //套索选中
      this.templet.module_selectable();

        if(this.infor.fixed === 'fixed'){
            this.templet.header_fixed_set(this.widgetId);
        }

    }
  }
</script>
