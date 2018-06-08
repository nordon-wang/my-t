<template>
<div class="dateIndex" >
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_jobs')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_jobs','public_defaultStyle')"></li>
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
    <div   @dblclick.stop="select_parts('','basic_jobs')" :style="alls" >
      <!-- 样式1 -->
      <ul class="style11" v-show="infor.styleID == '0' ? true : false" >
        <li v-for='(item,$index) in infos' :key="$index" v-show="$index >= 0 && $index < infor.page_num ? true : false" >
          <b  :style="[pos,{
						backgroundColor: $index == 0 && infor.jobs_datas_is_open == 'yes' ? infor.job_pos_bc_after_color : infor.job_pos_bc_color,
						color: $index == 0 && infor.jobs_datas_is_open == 'yes' ? infor.job_pos_after_color : infor.job_pos_color
					}]" 
					data-Highlight="jobs6" @dblclick.stop="select_parts('jobs6','basic_jobs')" 
					:class="[
						$store.state.module_Data && $store.state.parts == 'jobs6' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
						$store.state.module_Data && $store.state.hover_parts == 'jobs6' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
						'mouseClass'
					]" >{{item.subject}} 
						<i :style="addIcons" 
							data-Highlight="jobs2" @dblclick.stop="select_parts('jobs2','basic_jobs')" 
							:class="[
							$store.state.module_Data && $store.state.parts == 'jobs2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
							$store.state.module_Data && $store.state.hover_parts == 'jobs2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
							'mouseClass',
							$index == 0 && infor.jobs_datas_is_open == 'yes' ? infor.clickicon : infor.defaulticon
							]"></i> 
					</b>
            <div :class=" $index == 0 ? 'yes' : 'no'" v-show="infor.jobs_datas_is_open == 'yes'">
							<p :style="cons" 
							data-Highlight="jobs7" @dblclick.stop="select_parts('jobs7','basic_jobs')" 
							:class="[
								$store.state.module_Data && $store.state.parts == 'jobs7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								$store.state.module_Data && $store.state.hover_parts == 'jobs7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								'mouseClass'
							]" >工作地址:{{item.address}}</p>
							<p :style="cons" 
							data-Highlight="jobs7" @dblclick.stop="select_parts('jobs7','basic_jobs')" 
							:class="[
								$store.state.module_Data && $store.state.parts == 'jobs7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								$store.state.module_Data && $store.state.hover_parts == 'jobs7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								'mouseClass'
							]" >招聘有效期:{{item.exp_date}}</p>
							<p :style="cons" 
							data-Highlight="jobs7" @dblclick.stop="select_parts('jobs7','basic_jobs')" 
							:class="[
								$store.state.module_Data && $store.state.parts == 'jobs7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								$store.state.module_Data && $store.state.hover_parts == 'jobs7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								'mouseClass'
							]">联系人:{{item.name}}</p>
							<p :style="cons" data-Highlight="jobs7" @dblclick.stop="select_parts('jobs7','basic_jobs')" 
							:class="[
								$store.state.module_Data && $store.state.parts == 'jobs7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								$store.state.module_Data && $store.state.hover_parts == 'jobs7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								'mouseClass'
							]">联系电话:{{item.tel}}</p>
							<p :style="cons" 
							data-Highlight="jobs7" @dblclick.stop="select_parts('jobs7','basic_jobs')" 
							:class="[
								$store.state.module_Data && $store.state.parts == 'jobs7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								$store.state.module_Data && $store.state.hover_parts == 'jobs7' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								'mouseClass'
							]" >招聘单位:{{item.unit}}</p>
							<div :style='{backgroundColor:infor.job_cons_bg_color,wordWrap:"break-word"}' v-html='item.content' class="resetcss s222">
							</div>
							<a :style="email0" href="javascript:;" v-if="infor.jobs_emailto_is_show == 'block'"
							data-Highlight="jobs5" @dblclick.stop="select_parts('jobs5','basic_jobs')" 
							:class="[
								$store.state.module_Data && $store.state.parts == 'jobs5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								$store.state.module_Data && $store.state.hover_parts == 'jobs5' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								'mouseClass'
							]" >{{infor.jobs_emailto_txt}}</a>
            </div>
        </li>
      </ul>

      <!-- 样式2 -->
			<ul class="style22" v-show="infor.styleID == '1' ">
				<li class="tit"  >
					<p :style="titleFir" 
					data-Highlight="jobs9" @dblclick.stop="select_parts('jobs9','basic_jobs')" 
					:class="[
						$store.state.module_Data && $store.state.parts == 'jobs9' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
						$store.state.module_Data && $store.state.hover_parts == 'jobs9' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
						'mouseClass'
					]">
						<span :style="spans1" class="s1"></span>
						<span v-for="(item,$index) in infor.jobSelectArrs" 
							:key="$index" :style="stylenums($index)" :class="stylenums($index)">
							{{item.title}}
						</span>
					</p>
				</li>
			</ul>
			<!-- 样式2 内容 -->
			<ul  class="style22" v-show="infor.styleID == '1'">
				<li v-for='(item,$index) in infos' class="conRow"
				 :key="$index" v-show="$index >= 0 && $index < infor.page_num ? true : false">
					<p :style="titleTwo" 
					data-Highlight="jobs10" @dblclick.stop="select_parts('jobs10','basic_jobs')" 
					:class="[
						$store.state.module_Data && $store.state.parts == 'jobs10' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
						$store.state.module_Data && $store.state.hover_parts == 'jobs10' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
						'mouseClass'
					]">
						<span :style="spans1" class="s1">
							<i :style="jobs2Icon" 
							 v-show="infor.job_icon_is_show == 'block'"
							  data-Highlight="jobs2" @dblclick.stop="select_parts('jobs2','basic_jobs')" 
							:class="[
								$store.state.module_Data && $store.state.parts == 'jobs2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								$store.state.module_Data && $store.state.hover_parts == 'jobs2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								'mouseClass',
								$index == 0 && infor.jobs_datas_is_open == 'yes' ? infor.clickicon : infor.defaulticon
								]" ></i>
						</span>
						<span v-for="(items,$index) in infor.jobSelectArrs" :key="$index" :style="stylenum($index)" class="stylenum($index)" >
							<a :style="email0" href="javascript:;" v-if="infor[items.con] == 'email' ? true : false">{{infor.jobs_emailto_txt}}</a>

							<a  href="javascript:;" :style="gotolink" v-if="infor[items.con] == 'gotolink' ? true : false"
							data-Highlight="jobs11" @dblclick.stop="select_parts('jobs11','basic_jobs')" 
							:class="[
								$store.state.module_Data && $store.state.parts == 'jobs11' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								$store.state.module_Data && $store.state.hover_parts == 'jobs11' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
								'mouseClass'
							]">{{infor.jobs_gotolink_txt}}</a>

							<span v-else  :style="stylenum($index)" class="stylenum($index)"  >{{item[infor[items.con]]}}</span>
						</span>
					</p>

					<div
					v-if="infor.is_exit_gotolink == 'yes' && infor.jobs_datas_is_open == 'yes' && $index === 0"  
					v-html='item.content' :style='[newConBorder,{backgroundColor:infor.job_cons_bg_color,wordWrap:"break-word"}]'
					data-Highlight="jobs13" @dblclick.stop="select_parts('jobs13','basic_jobs')" 
					:class="[
						$store.state.module_Data && $store.state.parts == 'jobs13' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
						$store.state.module_Data && $store.state.hover_parts == 'jobs13' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
						'mouseClass',
						'resetcss',
						 $index == 0 ? 'yes' : 'no'
					]">
					</div>

					<div class="contantJobs1 editcontantJobs1"
						v-if="infor.is_exit_gotolink === 'yes' && $index > 0"  v-html='item.content' :style='[newConBorder,{backgroundColor:infor.job_cons_bg_color,wordWrap:"break-word"}]' 
						data-Highlight="jobs13" @dblclick.stop="select_parts('jobs13','basic_jobs')" 
						:class="[
							$store.state.module_Data && $store.state.parts == 'jobs13' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
							$store.state.module_Data && $store.state.hover_parts == 'jobs13' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
							'mouseClass',
							'resetcss',
							$index == 0 ? 'yes' : 'no'
						]" >
					</div>

				</li>
			</ul>

      <!-- 样式3 -->
			<ul v-show="infor.styleID == '2' ">
				<li :style="li3" v-for='(item,$index) in infos' class="clearfix" 
				:key="$index"  v-show="$index >= 0 && $index < infor.page_num " 
				data-Highlight="jobs12" @dblclick.stop="select_parts('jobs12','basic_jobs')" 
				:class="[
					$store.state.module_Data && $store.state.parts == 'jobs12' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
					$store.state.module_Data && $store.state.hover_parts == 'jobs12' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
					'mouseClass'
				]">
			    	<i :style="i3" 
							data-Highlight="jobs2" @dblclick.stop="select_parts('jobs2','basic_jobs')" 
							:class="[
							$store.state.module_Data && $store.state.parts == 'jobs2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
							$store.state.module_Data && $store.state.hover_parts == 'jobs2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
							'mouseClass',
							$index == 0 && infor.jobs_datas_is_open == 'yes' ? infor.clickicon : infor.defaulticon
							]"></i>
						<a :style="a3" href="javascript:;" >{{item[infor.job3_con_value1]}}</a>
		    	 	<span :style="span3" v-text="item[infor.job3_con_value2]"  v-if="infor.job3_con_value2 == 'email' ? false : true"></span>
		    	 	<a :style="email0" href="javascript:;" v-if="infor.job3_con_value2 == 'email' ? true : false">{{infor.jobs_emailto_txt}}</a>
			  	</li>
			</ul>

      <div class="block self_fenye" v-show="infor.fenye_is_show == 'true' ? true : false" :style="[pages,{
    marginTop: '6px'}]" 
				data-Highlight="jobs3" @dblclick.stop="select_parts('jobs3','basic_jobs')" 
				:class="[
					$store.state.module_Data && $store.state.parts == 'jobs3' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
					$store.state.module_Data && $store.state.hover_parts == 'jobs3' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
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
  name: "basic_jobs",
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
	filters:{
		myFilter(val){
			console.log(val);
			return val
		}
	},
  data() {
    return {
      datas:{
      },
      infos:[],
      minNum:0,
      maxNum:1
    };
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
      let d = (date.getDate() + 1) > 9 ? (date.getDate() + 1) : '0' + (date.getDate() + 1);
      let h = (date.getHours() + 1) > 9 ? (date.getHours() + 1) : '0' + (date.getHours() + 1);
      let min = (date.getMinutes() + 1) > 9 ? (date.getMinutes() + 1) : '0' + (date.getMinutes() + 1);
      let s = (date.getSeconds() + 1) > 9 ? (date.getSeconds() + 1) : '0' + (date.getSeconds() + 1);

      return date.getFullYear() + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
    }
  },
	computed:{
		alls(){
      return {
        width:`${this.infor.allwidth}px`,
        minWidth:`${this.infor.allwidth}px`,
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
		gotolink:function(){
			return {
			  position:"absolute",
	          bottom:this.infor.jobs_gotolink_bottom + 'px',
	          right:this.infor.jobs_gotolink_right + 'px',
	          width:this.infor.jobs_gotolink_width + 'px',
	          height:this.infor.jobs_gotolink_height + 'px',
	          lineHeight:this.infor.jobs_gotolink_height + 'px',
	          borderRadius:this.infor.jobs_gotolink_border_radiu + 'px',
	          fontSize:this.infor.jobs_gotolink_fs + 'px',
	          textAlign:this.infor.jobs_gotolink_text_align,
	          color:this.infor.jobs_gotolink_fs_color,
	          backgroundColor:this.infor.jobs_gotolink_bc_color,
	          borderWidth:this.infor.jobs_gotolink_border_width + 'px',
	          borderStyle: this.infor.jobs_gotolink_border_style,
	          borderColor: this.infor.jobs_gotolink_border_color
			};
		},
		email0:function(){
			return {
			  position:"absolute",
	          bottom:this.infor.jobs_emailto_bottom + 'px',
	          right:this.infor.jobs_emailto_right + 'px',
	          width:this.infor.jobs_emailto_width + 'px',
	          height:this.infor.jobs_emailto_height + 'px',
	          lineHeight:this.infor.jobs_emailto_height + 'px',
	          borderRadius:this.infor.jobs_emailto_border_radiu + 'px',
	          fontSize:this.infor.jobs_emailto_fs + 'px',
	          textAlign:this.infor.jobs_emailto_text_align,
	          color:this.infor.jobs_emailto_fs_color,
	          backgroundColor:this.infor.jobs_emailto_bc_color,
	          borderWidth:this.infor.jobs_emailto_border_width + 'px',
	          borderStyle: this.infor.jobs_emailto_border_style,
            borderColor: this.infor.jobs_emailto_border_color
			};
		},
		questionP:function(){
			return {
				lineHeight:this.infor.help_question_p_height + 'px',
				height:this.infor.help_question_p_height + 'px',
				color:this.infor.help_question_p_fs_color,
				backgroundColor:this.infor.help_question_p_bc_color,
				fontSize:this.infor.help_question_p_fs + 'px',
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
				float:"right",
				marginRight:this.infor.help_question_icon_margin_right + 'px',
				marginTop:this.infor.help_question_icon_margin_top + 'px',
				fontSize:this.infor.job_icon_fs + 'px',
				color:this.infor.job_icon_color,
				display:this.infor.job_icon_is_show
			};
		},
		questionSpan:function(){
			return {
				float:"right",
				marginRight:this.infor.help_question_date_margin_right + 'px'
			};
		},
		answerP:function(){
			return {
				lineHeight:this.infor.help_answer_div_line_height + 'px',
				color:this.infor.help_answer_div_fs_color,
				backgroundColor:this.infor.help_answer_div_bc_color,
				fontSize:this.infor.help_answer_div_fs + 'px',
				textIndent: this.infor.help_answer_text_indent + "em"
			};
		},
		li3:function(){
			return {
				width:this.infor.job3_li_width + 'px',
				height:this.infor.job3_li_height + 'px',
				lineHeight:this.infor.job3_li_height + 'px',
				backgroundColor:this.infor.job3_li_bc_color,
				color:this.infor.job3_li_bc_color,
				marginTop:this.infor.job3_li_top + 'px',
				marginBottom:this.infor.job3_li_bottom + 'px',
				position:"relative",
				borderBottomColor:this.infor.job3_li_bottom_border_color,
				borderBottomStyle:this.infor.job3_li_bottom_border_style,
				borderBottomWidth:this.infor.job3_li_bottom_border_width +'px',
				borderRadius:this.infor.job_pos_border_radius +'px'

			}
		},
		i3:function(){
			return {
				position:'absolute',
				left:this.infor.job_icon_all_left + 'px',
				top:this.infor.job_icon_all_top + 'px',
				fontSize:this.infor.job_icon_fs + 'px',
				color:this.infor.job_icon_color,
				display:this.infor.job_icon_is_show,
        fontFamily: 'FontAwesome'
			}
		},
		a3:function(){
			return {
				marginLeft:this.infor.job3_a_left + 'px',
				fontSize:this.infor.job3_fs + 'px',
				color:this.infor.job3_li_fs_color,
				float:"left"
			}
		},
		span3:function(){
			return {
				marginRight:this.infor.job3_span_left + 'px',
				fontSize:this.infor.job3_fs + 'px',
				color:this.infor.job3_li_fs_color,
				float:"right"
			}
		},
		pages:function(){
			return {
				width:this.infor.job_page_width + 'px',
				marginLeft:this.infor.job_page_margin_left + 'px',
				color:this.infor.job_fenye_font_color,
				fontSize:this.infor.job_fenye_font_size + 'px',
				position:'relative'
			}
		},
		defaultIcon:function(){
			return this.infor.clickNames;
		},
		titleFir:function(){
			return {
				color:this.infor.job1_title_color,
			 	backgroundColor:this.infor.job1_title_bc_color,
			 	fontSize:"0px",
				height:this.infor.job1_title_height + 'px',
				lineHeight:this.infor.job1_title_height + "px",
				marginTop:this.infor.job1_title_margin_top + "px",
				marginBottom:this.infor.job1_title_margin_bottom + "px",
				borderRadius:this.infor.job_pos_border_radius + 'px'
			}
		},
		titleTwo:function(){
			return {
				paddingLeft:this.infor.job1_con_padding_left + "px",
				paddingTop:this.infor.job1_con_padding_top + "px",
				paddingRight:this.infor.job1_con_padding_right + "px",
				paddingBottom:this.infor.job1_con_padding_bottom + "px",
				color:this.infor.job1_con_color,
			 	backgroundColor:this.infor.job1_con_bc_color,
				height:this.infor.job1_con_height + 'px',
				lineHeight:this.infor.job1_con_height + "px",
				marginTop:this.infor.job1_con_margin_top + "px",
				marginBottom:this.infor.job1_con_margin_bottom + "px",
				borderRadius:this.infor.job_pos_border_radius + 'px',
				position:"relative",
				borderTopWidth:this.infor.job_title_border_top_width + 'px',
				borderTopStyle:this.infor.job_title_border_top_style,
				borderTopColor:this.infor.job_title_border_top_color,
				borderLeftWidth:this.infor.job_title_border_left_width + 'px',
				borderLeftStyle:this.infor.job_title_border_left_style,
				borderLeftColor:this.infor.job_title_border_left_color,
				borderBottomWidth:this.infor.job_title_border_bottom_width + 'px',
				borderBottomStyle:this.infor.job_title_border_bottom_style,
				borderBottomColor:this.infor.job_title_border_bottom_color,
				borderRightWidth:this.infor.job_title_border_right_width + 'px',
				borderRightStyle:this.infor.job_title_border_right_style,
				borderRightColor:this.infor.job_title_border_right_color,
			}
		},
		spans1:function(){
			return {
			 	color:this.infor.job_icon_color,
				fontSize:this.infor.job_icon_fs + "px"
			}
		},
		jobs2Icon:function(){
			return {
				position:'absolute',
				left:this.infor.job_icon_all_left + 'px',
				top:this.infor.job_icon_all_top + 'px',
        fontFamily: 'FontAwesome'
			}
		},
		spans2:function(){
			return {
				width:this.infor.job1_subject_width1 + "px",
 				textAlign:this.infor.job1_text_pos
			}
		},
		spans3:function(){
			return {
				width:this.infor.job1_subject_width2 + "px",
 				textAlign:this.infor.job1_text_pos
			}
		},
		spans4:function(){
			return {
				width:this.infor.job1_subject_width3 + "px",
 				textAlign:this.infor.job1_text_pos
			}
		},
		spans5:function(){
			return {
				width:this.infor.job1_subject_width4 + "px",
 				textAlign:this.infor.job1_text_pos
			}
		},
		spans6:function(){
			return {
				width:this.infor.job1_subject_width5 + "px",
 				textAlign:this.infor.job1_text_pos
			}
		},
		spans7:function(){
			return {
				width:this.infor.job1_subject_width6 + "px",
 				textAlign:this.infor.job1_text_pos
			}
		},
		spans8:function(){
			return {
				width:this.infor.job1_subject_width7 + "px",
 				textAlign:this.infor.job1_text_pos
			}
		},
		spans9:function(){
			return {
				width:this.infor.job1_subject_width8 + "px",
 				textAlign:this.infor.job1_text_pos
			}
		},
		spans10:function(){
			return {
				width:this.infor.job1_subject_width9 + "px",
 				textAlign:this.infor.job1_text_pos
			}
		},
		spans11:function(){
			return {
				width:this.infor.job1_subject_width10 + "px",
 				textAlign:this.infor.job1_text_pos
			}
		},
		pos:function(){
			return {
				paddingLeft:this.infor.job_pos_padding_left + 'px',
				paddingTop:this.infor.job_pos_padding_top + 'px',
				paddingRight:this.infor.job_pos_padding_right + 'px',
				paddingBottom:this.infor.job_pos_padding_bottom + 'px',
				marginLeft:this.infor.job_pos_margin_left + 'px',
				marginTop:this.infor.job_pos_margin_top + 'px',
				marginRight:this.infor.job_pos_margin_right + 'px',
				marginBottom:this.infor.job_pos_margin_bottom + 'px',
				color:this.infor.job_pos_color,
				fontSize:this.infor.job_pos_fs + 'px',
				borderTopWidth:this.infor.job_pos_border_top_width + 'px',
				borderTopStyle:this.infor.job_pos_border_top_style,
				borderTopColor:this.infor.job_pos_border_top_color,
				borderLeftWidth:this.infor.job_pos_border_left_width + 'px',
				borderLeftStyle:this.infor.job_pos_border_left_style,
				borderLeftColor:this.infor.job_pos_border_left_color,
				borderBottomWidth:this.infor.job_pos_border_bottom_width + 'px',
				borderBottomStyle:this.infor.job_pos_border_bottom_style,
				borderBottomColor:this.infor.job_pos_border_bottom_color,
				borderRightWidth:this.infor.job_pos_border_right_width + 'px',
				borderRightStyle:this.infor.job_pos_border_right_style,
				borderRightColor:this.infor.job_pos_border_right_color,
				backgroundColor:this.infor.job_pos_bc_color,
				height:this.infor.job_pos_height + 'px',
				lineHeight:this.infor.job_pos_height + 'px',
				borderRadius:this.infor.job_pos_border_radius + 'px',
        position:'relative',
        display:'block'
			}
		},
		newConBorder:function(){
			return {
				borderTopWidth:this.infor.job_pos_border_top_width + 'px',
				borderTopStyle:this.infor.job_pos_border_top_style,
				borderTopColor:this.infor.job_pos_border_top_color,
				borderLeftWidth:this.infor.job_pos_border_left_width + 'px',
				borderLeftStyle:this.infor.job_pos_border_left_style,
				borderLeftColor:this.infor.job_pos_border_left_color,
				borderBottomWidth:this.infor.job_pos_border_bottom_width + 'px',
				borderBottomStyle:this.infor.job_pos_border_bottom_style,
				borderBottomColor:this.infor.job_pos_border_bottom_color,
				borderRightWidth:this.infor.job_pos_border_right_width + 'px',
				borderRightStyle:this.infor.job_pos_border_right_style,
				borderRightColor:this.infor.job_pos_border_right_color,
				wordWrap:"break-word",
				// display:"block"
			}
		},
		cons:function(){
			return {
				paddingLeft:this.infor.job_con_padding_left+ 'px',
				paddingTop:this.infor.job_con_padding_top+ 'px',
				paddingRight:this.infor.job_con_padding_right+ 'px',
				paddingBottom:this.infor.job_con_padding_bottom+ 'px',
				marginLeft:this.infor.job_con_margin_left+ 'px',
				marginTop:this.infor.job_con_margin_right+ 'px',
				marginRight:this.infor.job_con_margin_top+ 'px',
				marginBottom:this.infor.job_con_margin_bottom+ 'px',
				color:this.infor.job_con_color,
				fontSize:this.infor.job_con_fs  + 'px',
				backgroundColor:this.infor.job_con_bg_color,
				height:this.infor.job_con_height + 'px',
				lineHeight:this.infor.job_con_height + 'px',
				borderTopWidth:this.infor.job_title_border_top_width + 'px',
				borderTopStyle:this.infor.job_title_border_top_style,
				borderTopColor:this.infor.job_title_border_top_color,
				borderLeftWidth:this.infor.job_title_border_left_width + 'px',
				borderLeftStyle:this.infor.job_title_border_left_style,
				borderLeftColor:this.infor.job_title_border_left_color,
				borderBottomWidth:this.infor.job_title_border_bottom_width + 'px',
				borderBottomStyle:this.infor.job_title_border_bottom_style,
				borderBottomColor:this.infor.job_title_border_bottom_color,
				borderRightWidth:this.infor.job_title_border_right_width + 'px',
				borderRightStyle:this.infor.job_title_border_right_style,
				borderRightColor:this.infor.job_title_border_right_color,
			}
		},
		addIcons:function(){
			return {
				position:'absolute',
				left:this.infor.job_icon_all_left + 'px',
				top:this.infor.job_icon_all_top + 'px',
				fontSize:this.infor.job_icon_fs + 'px',
				color:this.infor.job_icon_color,
				display:this.infor.job_icon_is_show,
        fontFamily: 'FontAwesome'
			}
		}
	},
  methods:{
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
    select_parts(partsName,moduleName){
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id:this.id,
        pid:this.pid,
        type:this.rowType
      })
    },
		stylenums:function(num){
			// return 's' + num ;
			num = parseInt(num) + 1;
			let obj = "job1_subject_width" + num;
			return {
				"width":this.infor[obj] +'px',
 				"textAlign":this.infor.job1_text_pos,
				fontSize:this.infor.job1_title_fs + "px",
				display:'inline-block',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap'
			}
		},
		stylenum:function(num){
			// return 's' + num ;
			num = parseInt(num) + 1;
			let obj = "job1_subject_width" + num;
			return {
				"width":this.infor[obj] +'px',
 				"textAlign":this.infor.job1_text_pos,
				display:'inline-block',
			 	fontSize:this.infor.job1_con_fs + "px",
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap'
			}
		},
		yema:function(v){
			this.minNum = this.pm * v - this.pm;
			this.maxNum = this.pm * v;
		},
		yema2:function(val){
			this.yeshu = parseInt(this.totalNum / this.pm);
			if (val == 'add') {
				if (this.indexs < this.yeshu) {
					this.indexs++;
					this.minNum = this.pm * this.indexs - this.pm;
					this.maxNum = this.pm * this.indexs;
				}
			}else{
				if (this.indexs>1) {
					this.indexs--;
					this.minNum = this.pm * this.indexs - this.pm;
					this.maxNum = this.pm * this.indexs;
				}
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
  updated(){
  },
  async created(){
		this.changeIcon();

    let _this = this;
    let data = await $.ajax({
      url: `/index_pc.php/newapi/article/joblist`,
      type: "get",
      dataType: "json"
    });

    if(data.data.rows.length == 0){
      alert('后台没有招聘数据、请前往后台添加')
		}

		this.infos = data.data.rows;
		// this.infor.total_num = data.data.total;
		this.$set(this.infor,'total_num', data.data.total);
  },
  async mounted(){
    
    this.initPages();
		this.changeIcon();

		// 兼容老版本
		if (!this.infor.allwidth) {
				this.initData();
		}

  }
};
</script>

<style  lang="scss" scoped type="text/css" >
.dateIndex{
  border: 1px solid transparent;
}

div.no{
	display: none;
}
div.yes, div.no{
	position: relative;
}

</style>

<style  lang="scss"  type="text/css"  >

.resetcss ol li{
	list-style-type: decimal !important;
	list-style-position: inside !important;
}

.resetcss ul li{
	list-style-type: disc !important;
	list-style-position: inside !important;
}

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
