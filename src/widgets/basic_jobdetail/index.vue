<template>
<div  >
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_jobdetail')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_jobdetail','public_defaultStyle')"></li>
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
      @dblclick.stop="select_parts('','basic_jobdetail')" :style="alls" >
      <ul id="">
        <li class="clearfix">
          <h1 :style="h1" 
           data-Highlight="jobdetail1" @dblclick.stop="select_parts('jobdetail1','basic_jobdetail')" 
            :class="[
              $store.state.module_Data && $store.state.parts == 'jobdetail1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              $store.state.module_Data && $store.state.hover_parts == 'jobdetail1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
              'mouseClass'
              ]">{{infor.job3_con_value1 | titleMap}}(模拟数据)</h1>
          <a href="javascript:;" 
         data-Highlight="jobdetail3" @dblclick.stop="select_parts('jobdetail3','basic_jobdetail')" 
          :class="[
            $store.state.module_Data && $store.state.parts == 'jobdetail3' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'jobdetail3' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" :style="a" v-text="infor.job_detail_a_con"></a>
          <form id="upload_form"  enctype="multipart/form-data"  method="post">
            <input type="hidden" name="email" value="{$_res.email}">
            <input style="display: none;" type="file" name="file"/>
          </form>
        </li>
        <li class="clearfix">
          <p class="jobdetail_p" 
         data-Highlight="jobdetail2" @dblclick.stop="select_parts('jobdetail2','basic_jobdetail')" 
          :class="[
            $store.state.module_Data && $store.state.parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" :style="lastLiP"><b class="jobdetail_b" :style="lastLiB">招聘职位:</b>招聘职位(模拟数据)</p>
          <p class="jobdetail_p" 
         data-Highlight="jobdetail2" @dblclick.stop="select_parts('jobdetail2','basic_jobdetail')" 
          :class="[
            $store.state.module_Data && $store.state.parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" :style="lastLiP"><b class="jobdetail_b" :style="lastLiB">人数:</b>人数(模拟数据)</p>
          <p class="jobdetail_p" 
         data-Highlight="jobdetail2" @dblclick.stop="select_parts('jobdetail2','basic_jobdetail')" 
          :class="[
            $store.state.module_Data && $store.state.parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" :style="lastLiP"><b class="jobdetail_b" :style="lastLiB">工作地点:</b>工作地点(模拟数据)</p>
          <p class="jobdetail_p" 
         data-Highlight="jobdetail2" @dblclick.stop="select_parts('jobdetail2','basic_jobdetail')" 
          :class="[
            $store.state.module_Data && $store.state.parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" :style="lastLiP"><b class="jobdetail_b" :style="lastLiB">薪资:</b>薪资(模拟数据)</p>
          <p class="jobdetail_p" 
         data-Highlight="jobdetail2" @dblclick.stop="select_parts('jobdetail2','basic_jobdetail')" 
          :class="[
            $store.state.module_Data && $store.state.parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" :style="lastLiP"><b class="jobdetail_b" :style="lastLiB">结束日期:</b>结束日期(模拟数据)</p>
          <div style="word-wrap: break-word;"  class="resetCss">
            <b class="jobdetail_b demob" data-Highlight="jobdetail2" @dblclick.stop="select_parts('jobdetail2','basic_jobdetail')" 
          :class="[
            $store.state.module_Data && $store.state.parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'jobdetail2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]" :style="lastLiDivB">需求描述:</b>
            <p>需求描述(模拟数据、以后台编辑内容为准、仅供参考)</p>
          </div>
        </li>
      </ul>
    </div>
</div>
</template>

<script>

export default {
  name: "basic_jobdetail",
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
  data() {
    return {
      datas:{
      }
    };
  },
  filters:{
    titleMap(val){
      let mapArr = [
        {value:'subject',label: '招聘职位'},
        {value:'num',label: '招聘人数'},
        {value:'salary',label: '工资待遇'},
        {value:'unit',label: '招聘单位'},
        {value:'createtime',label: '创建时间'},
        {value:'exp_date',label: '招聘期限'},
        {value:'name',label: '联系人'},
        {value:'tel',label: '联系电话'},
        {value:'email',label: '电子邮件'},
        {value:'address',label: '工作地址'},
        {value:'gotolink',label: '查看详情'},
      ];

      let obj = mapArr.filter(item => item.value === val);
      return obj[0].label;
    }
  },
	computed:{
    alls(){
      return {
        minWidth:`${this.infor.allwidth}px`,
        width:`${this.infor.allwidth}px`,
        minHeight:`${this.infor.allheight}px`
      }
    },
		lastLiP:function(){
			return {
				fontSize:this.infor.job_detail_con_fs + 'px',
				color:this.infor.job_detail_con_fs_color,
				height:this.infor.job_detail_height + 'px',
				lineHeight:this.infor.job_detail_height + 'px',
			}
		},
		lastLiDivB:function(){
			return {
				display:"inline-block",
				fontSize:this.infor.job_detail_con_fs + 'px',
				color:this.infor.job_detail_title_fs_color,
				height:this.infor.job_detail_height + 'px',
				lineHeight:this.infor.job_detail_height + 'px',
				width:this.infor.job_detail_title_width + 'px',
			}
		},
		lastLiB:function(){
			return {
				fontSize:this.infor.job_detail_con_fs + 'px',
				display:"inline-block",
				color:this.infor.job_detail_title_fs_color,
				height:this.infor.job_detail_height + 'px',
				lineHeight:this.infor.job_detail_height + 'px',
				width:this.infor.job_detail_title_width + 'px',
			}
		},
		h1:function(){
			return {
				float:"left",
				display:this.infor.job_detail_is_show_title,
        fontSize:this.infor.job_detail_title_fs + 'px',
        color:"#000",
        fontWeight:'500'
			}
		},
		a:function(){
			return {
				position:"absolute",
				textAlign: 'center',
				width:this.infor.job_detail_a_width + 'px',
				height:this.infor.job_detail_a_height + 'px',
				lineHeight:this.infor.job_detail_a_height + 'px',
				fontSize:this.infor.job_detail_a_fs + 'px',
				borderRadius:this.infor.job_detail_a_border_radius + 'px',
				top:this.infor.job_detail_a_margin_top + 'px',
				right:this.infor.job_detail_a_margin_left + 'px',
				color:this.infor.job_detail_a_fs_color,
				background:this.infor.job_detail_a_bc_color,
			}
		}
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
  mounted(){
    // 兼容老版本
    if (!this.infor.allwidth) {
        this.initData();
    }
  }
};

</script>

<style  lang="scss" scoped="" type="text/css" >

</style>