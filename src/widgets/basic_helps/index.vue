<template>
<div class="dateIndex  " >
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_helps')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_helps','public_defaultStyle')"></li>
        </my-tooltip>
        <my-tooltip content="样式保存" >
          <li class="edit_module el-icon-star-off" @click.stop="select_parts('','');$store.state.styleSave_IsOpen = true"></li>
        </my-tooltip>
        <my-tooltip content="基础设置">
          <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>
    <div 
      @dblclick.stop="select_parts('','basic_helps')" :style="alls">
      <ul class="style44" ref="helpcon">
				<li  v-for='(item,$index) in infos' :key="$index" v-show="$index >= 0 && $index < infor.page_num" >
					<p :style="[questionP,{position:'relative'}]" class="clearfix" 
            data-Highlight="help5" @dblclick.stop="select_parts('help5','basic_helps')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'help5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'help5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]">
						<img :src="$store.state.domain + infor.imgUrl" :style="questionImg" 
            data-Highlight="help7" @dblclick.stop="select_parts('help7','basic_helps')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'help7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'help7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]">
						<span  :style="questionTitle" 
            data-Highlight="help6" @dblclick.stop="select_parts('help6','basic_helps')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'help6' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'help6' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]">{{infor.help_question_title_txt}}</span>
						<a :style="questionA" href="javascript:;" >{{item.title}}</a>
						<i :style="questionI"  
            data-Highlight="help2" @dblclick.stop="select_parts('help2','basic_helps')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'help2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'help2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass',
              infor.job_slidedown_style == '1' ? 
              infor.clickicon : (infor.job_slidedown_style == '3' ? infor.defaulticon : 
              ($index == 0 ? infor.clickicon : infor.defaulticon) )
              ]" ></i>
						<span :style="questionSpan" v-show="infor.help_question_is_date == 'block' ? true : false" 
            data-Highlight="help11" @dblclick.stop="select_parts('help11','basic_helps')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'help11' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'help11' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]"
            >{{item.createtime | formatTime}}</span>
					</p>
          <div class="help_contents clearfix"  :class=" $index == 0 ? 'yes' : 'no'" v-show="conShows($index)">
            <img :src="$store.state.domain + infor.answer_img_url" :style="answerImg" 
            data-Highlight="help10" @dblclick.stop="select_parts('help10','basic_helps')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'help10' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'help10' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]">
            <p :style="answerP" 
            data-Highlight="help8" @dblclick.stop="select_parts('help8','basic_helps')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'help8' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'help8' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]"><span :style="answerTitle" 
            data-Highlight="help9" @dblclick.stop="select_parts('help9','basic_helps')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'help9' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'help9' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]">{{infor.help_answer_title_txt}}</span>{{item.summary}}</p>
          </div>
				</li>
      </ul>
      <!-- <div id="pages" v-show="infor.fenye_is_show == 'true' ? true : false">
        <Page  :style="pages" :total="infor.num"  :page-size="pm"  v-on:on-change="yema" :show-total='infor.jobs_total_pagenum_show == "true" ? true : false' :show-elevator='infor.jobs_jump_pagenum_show == "true" ? true : false'></Page>
      </div> -->
      <div class="block self_fenye" v-show="infor.fenye_is_show == 'true' ? true : false" :style="[pages,{
    marginTop: '6px'}]" 
      data-Highlight="help3" @dblclick.stop="select_parts('help3','basic_helps')" 
      :class="[
        $store.state.module_Data && $store.state.parts == 'help3' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.module_Data && $store.state.hover_parts == 'help3' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        'mouseClass'
        ]" >
        <div style="width:100%;height:100%;background:rgba(0,0,0,0);position:absolute;z-index:99;"></div>
        <el-pagination
          :current-page="1"
					:pager-count="4"
          :page-size="infor.page_num"
          :layout="myCon"
          :total="infor.num" 
          ref="mypages" >
        </el-pagination>
      </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'

Vue.filter('my-filter', function (value) {
    try{
        var str = value.replace(/`/g,'"');
    }catch(e){};
    return str;
});

export default {
  name: "basic_helps",
  props: {
    infor: {
      type: Object,
      default: null
    },
    listArr: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ""
    },
    pid: {
      type: String,
      default: ""
    },
    rowType: {
      type: String,
      default: ""
    },
    name:{
      type:String,
      default:''
    }
  },
  watch:{
    infor:{
      handler(val,oldVar){
        this.$nextTick(() => {
          this.initPages();
        })
      },
      deep:true
    }
  },
  filters:{
    formatTime(val){
      let date = new Date();
      date.setTime(val * 1000);

      let m = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
      let d = (date.getDate()) > 9 ? (date.getDate()) : '0' + (date.getDate());
      let h = (date.getHours()) > 9 ? (date.getHours()) : '0' + (date.getHours());
      let min = (date.getMinutes()) > 9 ? (date.getMinutes()) : '0' + (date.getMinutes());
      let s = (date.getSeconds()) > 9 ? (date.getSeconds()) : '0' + (date.getSeconds());

      return date.getFullYear() + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
    }
  },
  data() {
    return {
      datas:{
      },
      infos:[],
      minNum:0,
      maxNum:2
    };
  },
  computed:{
    alls(){
      return {
        minWidth:`${this.infor.allwidth}px`,
        width:`${this.infor.allwidth}px`,
        minHeight:`${this.infor.allheight}px`
      }
    },
    myCon(){
      let str = 'prev,pager,next';
       if(this.infor.jobs_jump_pagenum_show == 'true'){
          str += `,jumper`
        }
       if(this.infor.jobs_total_pagenum_show == 'true'){
          str =  `total,` + str;
        }
        if(this.infor.jobs_jump_pagenum_show !== 'true' && this.infor.jobs_total_pagenum_show !== 'true'){
          str = 'prev,pager,next';
        }

        return str
    },
		questionP:function(){
			return {
				lineHeight:this.infor.help_question_p_height + 'px',
				height:this.infor.help_question_p_height + 'px',
				color:this.infor.help_question_p_fs_color,
				backgroundColor:this.infor.help_question_p_bc_color,
				fontSize:this.infor.help_question_p_fs + 'px',
				borderRadius:this.infor.job_pos_border_radius + 'px'
			};
		},
		questionImg:function(){
			return {
				float:"left",
	          	width:this.infor.question_img_width + 'px',
	          	height:this.infor.question_img_height + 'px',
	          	marginLeft:this.infor.question_img_left + 'px',
	          	marginRight:this.infor.question_img_right + 'px',
	          	marginTop:this.infor.question_img_top + 'px',
	          	display:this.infor.help_question_img_show,
              borderRadius:this.infor.question_img_border_radius + 'px',
              padding:'1px'
			}
		},
		questionTitle:function(){
			return {
				float:"left",
	          	marginLeft:this.infor.question_title_left + 'px',
	          	marginRight:this.infor.question_title_right + 'px',
	          	color:this.infor.help_question_title_fs_color,
	          	backgroundColor:this.infor.help_question_title_bc_color,
	          	fontSize:this.infor.help_question_title_fs + 'px',
	          	width:this.infor.help_question_title_width + 'px',
	          	display:this.infor.help_question_is_title,
	          	textAlign:this.infor.help_question_title_text_align
			};
		},
		questionA:function(){
			return {
				float:"left",
				marginLeft:this.infor.help_question_a_margin_left + 'px',
				color:this.infor.help_question_p_fs_color,
				fontSize:this.infor.help_question_p_fs + 'px'
			};
		},
		questionI:function(){
			return {
        position:'absolute',
				right:this.infor.help_question_icon_margin_right + 'px',
				top:this.infor.help_question_icon_margin_top + 'px',
				fontSize:this.infor.job_icon_fs + 'px',
				color:this.infor.job_icon_color,
        display:this.infor.job_icon_is_show,
        fontFamily: 'FontAwesome'
			};
		},
		questionSpan:function(){
			return {
				float:"right",
				marginRight:this.infor.help_question_date_margin_right + 'px'
			};
		},
		answerImg:function(){
			return {
				float:"left",
        width:this.infor.answer_img_width + 'px',
        height:this.infor.answer_img_height + 'px',
        marginLeft:this.infor.answer_img_left + 'px',
        marginRight:this.infor.answer_img_right + 'px',
        marginTop:this.infor.answer_img_top + 'px',
        display:this.infor.help_answer_img_show,
        borderRadius:this.infor.answer_img_border_radius + 'px',
        padding:'1px'
			}
		},	
		answerP:function(){
			return {
				lineHeight:this.infor.help_answer_div_line_height + 'px',
				color:this.infor.help_answer_div_fs_color,
				backgroundColor:this.infor.help_answer_div_bc_color,
				fontSize:this.infor.help_answer_div_fs + 'px',
				textIndent: this.infor.help_answer_text_indent + "em",
				paddingLeft:this.infor.help_answer_padding_left + 'px'
			};
		},
		answerTitle:function(){
			return {
				float:"left",
	          	marginLeft:this.infor.answer_title_left + 'px',
	          	marginRight:this.infor.answer_title_right + 'px',
	          	color:this.infor.help_answer_title_fs_color,
	          	backgroundColor:this.infor.help_answer_title_bc_color,
	          	fontSize:this.infor.help_answer_title_fs + 'px',
	          	width:this.infor.help_answer_title_width + 'px',
	          	display:this.infor.help_answer_is_title,
	          	textAlign:this.infor.help_answer_title_text_align,
	          	textIndent:'0'
			};
		},
		pages:function(){
			return {
				width:this.infor.job_page_width + 'px',
        marginLeft:this.infor.job_page_margin_left + 'px',
        position:'relative'
			}
		},

  },
  methods:{
    conShows(index){
      let myIdx = this.infor.job_slidedown_style;

      if(myIdx == 1){
        return true;
      }else if(myIdx == 2){
        return index == 0
      }else if(myIdx == 3){
        return false;
      }
    },
    initPages(){
      let _pageObj = $(`#u${this.id}`).find(this.$refs.mypages.$el);
          
      // 页码特有的
      _pageObj.find('.el-pager li').css({
        'backgroundColor':this.infor.job_fenye_default_bc_color,
        'color':this.infor.job_fenye_default_font_color,
        fontSize:`${this.infor.job_fenye_font_size}px`
      })
      // 页码的分页按钮 前后按钮
      _pageObj.find('.el-pager li, .btn-prev, .btn-next').css({
        'width':this.infor.job_fenye_btn_width + 'px',
        'height':this.infor.job_fenye_btn_height + 'px',
        'lineHeight':this.infor.job_fenye_btn_height + 'px',
        'borderStyle':this.infor.job_fenye_btn_border_style,
        'borderWidth':this.infor.job_fenye_btn_border_width + 'px',
        'borderColor':this.infor.job_fenye_btn_border_color
      })

      // 点击的
      _pageObj.find('.el-pager li.active').css({
        'backgroundColor':this.infor.job_fenye_click_bc_color,
        'borderStyle':this.infor.job_fenye_btn_border_style,
        'borderWidth':this.infor.job_fenye_btn_border_width + 'px',
        'borderColor':this.infor.job_fenye_btn_click_border_color,
        'color':this.infor.job_fenye_click_font_color
      })

      // 总数 跳转
      _pageObj.find('.el-pagination__total, .el-pagination__jump').css({
        fontSize:`${this.infor.job_fenye_font_size}px`,
        color:`${this.infor.job_fenye_font_color}`,
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
    initConfig(){
      if(this.infor.jobs_total_pagenum_show == 'true'){
        let arr = this.configLayout.split(',')
        arr.push('total')
        this.configLayout = arr.join(',')
      }else{
        // this.configLayout.split(',').filter( (item) => item != 'total' )
      }

    },
    changeIcon(){
      let iconObj = {
        'ivu-icon-arrow-up-b':'fa-caret-up',
        'ivu-icon-arrow-down-b':'fa-caret-down',
        'ivu-icon-arrow-up-a':'fa-arrow-up',
        'ivu-icon-arrow-down-a':'fa-arrow-down',
        'ivu-icon-arrow-up-c':'fa-long-arrow-up',
        'ivu-icon-arrow-down-c':'fa-long-arrow-down',
        'ivu-icon-chevron-up':'fa-chevron-up',
        'ivu-icon-chevron-down':'fa-chevron-down',
        'ivu-icon-plus-round':'fa-plus',
        'ivu-icon-minus-round':'fa-minus'
      }

      let defaultIcon = this.infor.defaulticon.split(' ')[1];
      let clickIcon = this.infor.clickicon.split(' ')[1];
      
      if(iconObj[defaultIcon]){
        this.infor.defaulticon = iconObj[defaultIcon];
      }
      if(iconObj[clickIcon]){
        this.infor.clickicon = iconObj[clickIcon];
      }

    },
    initData(){
      // 获取三个参数 可以拿到所在的row moudule 和 row的类型
			let _pid = this.pid;
			let _rowtype = this.rowType;
			let _id = this.id;

			let IndexObj = this.templet.p_find_moduleIndex({
				pid: _pid,
				type: _rowtype,
				id: _id
			});

			let rowIndex = IndexObj.row;
			let moduleIndex = IndexObj.module;
      let rowtype = this.rowType;
      
      let moduleObj = this.$store.state[rowtype][rowIndex].children[moduleIndex].data.css;
      
      this.$set(this.infor,'allwidth',moduleObj.module_width || 200);
      this.$set(this.infor,'allheight',moduleObj.module_height || 200);

    }
  },
  async created(){
    this.infor.job_slidedown_style += '';
    let _this = this;
    let data = await $.ajax({
      url: `/index_pc.php/newapi/article/getlist/type/2`,
      type: "get",
      dataType: "json"
    });

    let _length = data.data.length;

    if(!_length){
      alert('后台没有帮助数据、请前往后台添加')
    }

    this.infos = data.data;
    this.$set(this.infor,'max_num',_length)
    

  },
  updated(){
    this.changeIcon();
  },
  mounted(){
    this.initPages();
    this.changeIcon();

    // 兼容老版本
    if (!this.infor.allwidth) {
        this.initData();
    }
    
  }
};

</script>

<style scoped>

</style>


<style  lang="scss"  type="text/css" >

.self_fenye .el-pager li{
  margin-right: 4px;
  padding: 0;
  font-weight: 400;
  border-radius:4px;
}

.self_fenye .el-pagination .btn-prev{
  margin-right: 8px;
  border-radius:4px;
}

.self_fenye .el-pagination .btn-next{
  border-radius:4px;
  margin-left: 4px;
}

.self_fenye .el-pagination .btn-next{
  color: #666;
}
.self_fenye .el-pager .more::before {
    content: "…";
    line-height: 30px;
    display: block;
    letter-spacing: 1px;
    color: #ccc;
    text-align: center;
    box-sizing: border-box;
}

.self_fenye .el-pagination button.disabled {
    color: #c0c4cc;
}
</style>
