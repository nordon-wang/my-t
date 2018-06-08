<template>
<div class="dateIndex  "  >
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_magnifyingglass')">{{templet.p_nameToChinese(name)}}编辑</li>
        <!-- <my-tooltip content="动画选择">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip> -->
        <my-tooltip content="样式选择" >
          <li class="edit_module el-icon-date" @click.stop="select_parts('basic_magnifyingglass','public_defaultStyle')"></li>
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
    <div  id="date" 
    style="background-color:#fff;"
      data-Highlight="basic_magnifyingglass" @dblclick.stop="select_parts('','basic_magnifyingglass')" >
        <!-- 样式1 -->
        <div v-show="infor.glass_styles == 0 ? true : false" id="mymagnifier1" 
            data-Highlight="big_glass1" @dblclick.stop="select_parts('big_glass1','basic_magnifyingglass')" 
            :class="[
            $store.state.module_Data && $store.state.parts == 'big_glass1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'big_glass1' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]">
            <div class="magnifier" id="magnifier1" :style="style1">
                <div class="magnifier-container" :style="style2">
                    <div class="images-cover">
                        <img src="../../../static/image/1.jpg" :style="style2" />
                    </div>
                    <div class="move-view"></div>
                </div>
                <div class="magnifier-assembly" :style="style3s1">
                    <div class="magnifier-btn" :style="magnifierBtn1">
                        <span :style="spanl1">&lt;</span>
                        <span :style="spanr1">&gt;</span>
                    </div>
                    <div class="magnifier-line">
                        <ul class="clearfix animation03">
                            <li :style="{width:'100px'}">
                                <div class="small-img">
                                    <img src="../../../static/image/1.jpg" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="magnifier-view"></div>
            </div>
        </div>

        <!-- 样式2 -->
        <div v-show="infor.glass_styles == 1 ? true : false" id="mymagnifier2" 
            data-Highlight="big_glass2" @dblclick.stop="select_parts('big_glass2','basic_magnifyingglass')" 
            :class="[
            $store.state.module_Data && $store.state.parts == 'big_glass2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'big_glass2' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]">
            <div class="magnifier" id="magnifier1" :style="{width:infor.glass_width + 120+'px'}" >
                <div class="magnifier-container" :style="style2">
                    <div class="images-cover">
                        <img src="../../../static/image/1.jpg" :style="style2" />
                    </div>
                    <div class="move-view"></div>
                </div>
                <div class="magnifier-assembly" :style="style3">
                    <div class="magnifier-btn">
                        <span :style="spanl2">&lt;</span>
                        <span :style="spanr2">&gt;</span>
                    </div>
                    <div class="magnifier-line" :style="styleLeft">
                        <ul class="clearfix animation03">
                            <li>
                                <div class="small-img">
                                    <img src="../../../static/image/1.jpg" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="magnifier-view"></div>
            </div>
        </div>

        <!-- 样式3 -->
        <div :style="style31" v-show="infor.glass_styles == 2" class="outMouseHight">
          <div id="" :style="style32" 
            data-Highlight="big_glass3_big" @dblclick.stop="select_parts('big_glass3_big','basic_magnifyingglass')" 
            :class="[
            $store.state.module_Data && $store.state.parts == 'big_glass3_big' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'big_glass3_big' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]">
            <img :style="style33" src="../../../static/image/style-bg.png" />
          </div>
          <!--  -->
          <div :style="style34" 
            data-Highlight="big_glass3_small" @dblclick.stop="select_parts('big_glass3_small','basic_magnifyingglass')" 
            :class="[
            $store.state.module_Data && $store.state.parts == 'big_glass3_small' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            $store.state.module_Data && $store.state.hover_parts == 'big_glass3_small' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
            'mouseClass'
            ]">
            <ul class="clearfix" :style="style35">
              <li>
                  <img :style="style36" src="../../../static/image/style-bg.png" />
              </li>
            </ul>
          </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: "basic_magnifyingglass",
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
  computed: {
      spanl2:function(){
          return {
              lineHeight: '90px',
              height: '90px',
              width: '20px',
              backgroundColor: '#6e6e6e',
              color: '#fff',
              display: 'block',
              zIndex: '9998',
              textAlign: 'center',
              fontSize: '20px',
              cursor: 'pointer',
              borderRdius: '3px',
              transform: 'rotate(90deg)',
              position: 'absolute',
              top: '-32px',
              left: '40px',
              float: 'left'
          }
      },
      spanr2:function(){
          return {
              lineHeight: '90px',
              height: '90px',
              width: '20px',
              backgroundColor: '#6e6e6e',
              color: '#fff',
              display: 'block',
              zIndex: '9998',
              textAlign: 'center',
              fontSize: '20px',
              cursor: 'pointer',
              borderRdius: '3px',
              transform: 'rotate(90deg)',
              position: 'absolute',
              top: `${this.infor.glass_view_pic_height - 60}px`,
              left: '40px',
              float: 'right'
          };
      },
      magnifierBtn1:function(){
          return {
              top:'40px'
          }
      },
      spanl1:function(){
          return {
              float: "left",
              lineHeight: "80px",
              height: "80px",
              width: "20px",
              backgroundColor: "#6e6e6e",
              color: "#fff",
              display: "block",
              zIndex: "9998",
              textAlign: "center",
              fontSize: "20px",
              cursor: "pointer",
              borderRadius: "3px",
              position: "absolute",
              transform: 'rotate(0deg)',
              top: "0px",
              left: "0px",
          };
      },
      spanr1:function(){
          return{
              float: "right",
              lineHeight: "80px",
              height: "80px",
              width: "20px",
              backgroundColor: "#6e6e6e",
              color: "#fff",
              display: "block",
              zIndex: "9998",
              textAlign: "center",
              fontSize: "20px",
              cursor: "pointer",
              borderRadius: "3px",
              position: "absolute",
              transform: 'rotate(0deg)',
              top: "0px",
              left: `${this.infor.glass_width - 20}px`,
          };
      },
      style31:function(){
          return {
              position:'relative',
              width:this.infor.style3_small_dakuang_width + 'px',
              height:this.infor.style3_small_dakuang_height + 'px'
          }
      },
      style32:function(){
          return {
              position:'absolute',
              width:this.infor.style3_big_kuang_width + 'px',
              height:this.infor.style3_big_kuang_height + 'px',
              top:this.infor.style3_big_pos_top + 'px',
              left:this.infor.style3_big_pos_left + 'px'
          }
      },
      style33:function(){
          return {
              width:this.infor.style3_big_pic_width + 'px',
              height:this.infor.style3_big_pic_height + 'px'
          }
      },
      style34:function(){
          return {
              position:'absolute',
              width:this.infor.style3_small_kuang_width + 'px',
              height:this.infor.style3_small_kuang_height + 'px',
              top:this.infor.style3_small_pos_top + 'px',
              right:this.infor.style3_small_pos_right + 'px'
          }
      },
      style35:function(){
          return {
              width:this.infor.style3_small_kuang_width + 'px',
              height:this.infor.style3_small_kuang_height + 'px'
          }
      },
      style36:function(){
          return {
              width:this.infor.style3_small_pic_width + 'px',
              height:this.infor.style3_small_pic_height + 'px',
              borderStyle:this.infor.glass_default_border_style,
              borderColor:this.infor.glass_default_border_color,
              borderWidth:this.infor.glass_default_border_width + 'px',
              margin:`${this.infor.style3_small_margin_top}px ${this.infor.style3_small_margin_right}px  ${this.infor.style3_small_margin_bottom}px  ${this.infor.style3_small_margin_left}px`
          }
      },
      style1:function(){
            return {
                width:this.infor.glass_width + 'px',
                height:this.infor.glass_view_pic_height + 92 + 'px'
            }
      },
      style2:function(){
          return {
              width:this.infor.glass_width + 'px',
              height:this.infor.glass_view_pic_height + 'px'
          }
      },
      style3:function(){
          return {
              height:this.infor.glass_view_pic_height + 'px',
              left:this.infor.glass_width + 12 + 'px'
          }
      },
      style3s1:function(){
          return {
              width:this.infor.glass_width + 'px',
            //   height:this.infor.glass_small_pic_height + 'px',
            //   left: 20 + 'px',
              position:'relative',
              zIndex:'1'
          }
      },
      styleSpan:function(){
          return {
              top:this.infor.glass_view_pic_height - 20 + "px"
          }
      },
      styleLeft:function(){
          return {
              height:this.infor.glass_view_pic_height - 40 + "px",
              left:"0px",
              top:'20px'
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
    initData() {
      // 获取三个参数 可以拿到所在的row moudule 和 row的类型
      let _pid = this.pid
      let _rowtype = this.rowType
      let _id = this.id

      let IndexObj = this.templet.p_find_moduleIndex({
        pid: _pid,
        type: _rowtype,
        id: _id
      })

      let rowIndex = IndexObj.row
      let moduleIndex = IndexObj.module
      let rowtype = this.rowType

      let moduleObj = this.$store.state[rowtype][rowIndex].children[moduleIndex]
        .data.css

      this.$set(this.infor, 'allwidth', moduleObj.module_width || 200)
      this.$set(this.infor, 'allheight', moduleObj.module_height || 200)
    }
  },
  updated(){
  },
  mounted(){

    // 兼容老版本
    if (!this.infor.allwidth) {
      this.initData()
    }

  }
};

</script>


<style scoped>

#mymagnifier1 ul li{
	list-style: none;
}
#mymagnifier1 img{
	border: 0;
}
/* 垂直居中 */
#mymagnifier1 .images-cover,
#mymagnifier1 .small-img{
	display: flex;
	align-items:center;
	justify-content: center;
}
#mymagnifier1 .clearfix:before,
#mymagnifier1 .clearfix:after{
  display: table;
  line-height: 0;
  content: "";
}
#mymagnifier1 .magnifier{
	width: 500px;
	position: relative;
}
#mymagnifier1 .magnifier-container{
	width: 500px;
	height: 500px;
	overflow: hidden;
	position: relative;
	border: 1px solid #ddd;
}
#mymagnifier1 .move-view{
	width: 100px;
	height: 100px;
	position: absolute;
	background-color: rgba(255,255,255,0.6);
	cursor: move;
	display: none;
}
#mymagnifier1 .images-cover{
	height: 100%;
}
#mymagnifier1 .images-cover img{
	max-width: 100%;
	max-height: 100%;
}
#mymagnifier1 .magnifier-assembly{
	height: 92px;
	overflow: hidden;
	position: relative;
	padding-left: 20px;
	padding-right: 30px;
    z-index: 1;
}
#mymagnifier1 .magnifier-btn{
	position: absolute;
	font-family: "宋体";
	width: 100%;
	top: 50%;
	left: 0;
	margin-top: -40px;
}
#mymagnifier1 .magnifier-btn span{
	line-height: 80px;
	height: 80px;
	width: 20px;
	background-color: #6e6e6e;
	color: #fff;
	display: block;
	z-index: 9998;
	text-align: center;
	font-size: 20px;
	cursor: pointer;
	border-radius: 3px;
}
#mymagnifier1 .magnifier-btn span:nth-child(1){
	float: left;
}
#mymagnifier1 .magnifier-btn span:nth-child(2){
	float: right;
}
#mymagnifier1 .magnifier-line{
	position: relative;
	overflow: hidden;
	height: 92px;
}
#mymagnifier1 .magnifier-line ul{
	display: block;
	font-size: 0;
	width: 10000%;
	position: absolute;
	left: 0;
	z-index: 9997;
}
#mymagnifier1 .magnifier-line li{
	float: left;
	width: 100px;
	cursor: pointer;
}
#mymagnifier1 .magnifier-line ul > .active .small-img{
	border-color: #bbb;
}
#mymagnifier1 .small-img{
	height: 78px;
	padding: 1px;
	margin: 5px;
	overflow: hidden;
	border: 1px solid #ddd;
}
#mymagnifier1 .small-img img{
	max-width: 100%;
	max-height: 100%;
}
#mymagnifier1 .magnifier-view{
	width: 100%;
	height: 100%;
	position: absolute;
	right: -105%;
	top: 0;
	z-index: 9999;
	background-color: #fff;
	background-repeat: no-repeat;
	display: none;
}
#mymagnifier1 .animation03{
	transition: all 0.3s ease-in 0.1s;
	-ms-transition: all 0.3s ease-in 0.1s;
	-moz-transition: all 0.3s ease-in 0.1s;
	-webkit-transition: all 0.3s ease-in 0.1s;
	-o-transition: all 0.3s ease-in 0.1s;
}
</style>


<style scoped>

#mymagnifier2 ul li{
	list-style: none;
}
img{
	border: 0;
}
/* 垂直居中 */
#mymagnifier2 .images-cover,
#mymagnifier2 .small-img{
	display: flex;
	align-items:center;
	justify-content: center;
}
#mymagnifier2 .clearfix:before,
#mymagnifier2 .clearfix:after{
  display: table;
  line-height: 0;
  content: "";
}
#mymagnifier2 .magnifier{
	width: 500px;
	position: relative;
}
#mymagnifier2 .magnifier-container{
	width: 500px;
	height: 500px;
	overflow: hidden;
	position: relative;
	border: 1px solid #ddd;
}
#mymagnifier2 .move-view{
	width: 80px;
	height: 80px;
	position: absolute;
	background-color: rgba(255,255,255,0.6);
	cursor: move;
	display: none;
}
#mymagnifier2 .images-cover{
	height: 100%;
}
#mymagnifier2 .images-cover img{
	max-width: 100%;
	max-height: 100%;
}
#mymagnifier2 .magnifier-assembly{
	width: 120px;
	height: 320px;
	overflow: hidden;
	position: absolute;
    z-index: 1;
	top: 0;
	left: 420px;
}
#mymagnifier2 .magnifier-btn{
    position: absolute;
    font-family: "宋体";
    width: 100%;
}
#mymagnifier2 .magnifier-btn span{
	line-height: 90px;
    height: 90px;
    width: 20px;
    background-color: #6e6e6e;
    color: #fff;
    display: block;
    z-index: 9998;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
    border-radius: 3px;
    /*transform: rotate(90deg);*/
}
#mymagnifier2 .magnifier-btn span:nth-child(1){
	    position: absolute;
}
#mymagnifier2 .magnifier-btn span:nth-child(2){
    position: absolute;
    left: 340px;
}
#mymagnifier2 .magnifier-line{
    position: relative;
    overflow: hidden;
    height: 260px;
    /*margin-top: 18px;*/
}
#mymagnifier2 .magnifier-line ul{
	display: block;
	font-size: 0;
	width: 10000%;
	position: absolute;
	left: 0;
	z-index: 9997;
}
#mymagnifier2 .magnifier-line li{
	width: 100px;
	cursor: pointer;
}
#mymagnifier2 .magnifier-line ul > .active .small-img{
	border-color: #bbb;
}
#mymagnifier2 .small-img{
	height: 78px;
	padding: 1px;
	margin: 5px;
	overflow: hidden;
	border: 1px solid #ddd;
}
#mymagnifier2 .small-img img{
	max-width: 100%;
	max-height: 100%;
}
#mymagnifier2 .magnifier-view{
	width: 100%;
	height: 100%;
	position: absolute;
	right: -105%;
	top: 0;
	z-index: 9999;
	background-color: #fff;
	background-repeat: no-repeat;
	display: none;
}
#mymagnifier2 .animation03{
	transition: all 0.3s ease-in 0.1s;
	-ms-transition: all 0.3s ease-in 0.1s;
	-moz-transition: all 0.3s ease-in 0.1s;
	-webkit-transition: all 0.3s ease-in 0.1s;
	-o-transition: all 0.3s ease-in 0.1s;
}
</style>
