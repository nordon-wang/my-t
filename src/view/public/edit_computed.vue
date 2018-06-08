<template>
  <div class="computed_containt">
      <div class="public_computed" :style="{
        backgroundColor:showType == 'margin_control' ? '#f00 !important' : ''
      }" ref="my_margin" @click.stop="marginClick" @mouseover.stop="enter1" @mouseleave.stop="leave1">
        <p class="c_con">外边距<span class="computed_edit" v-show="showType == 'margin_control'">编辑中...</span></p>
        <div class="c_border" ref="my_border" @click.stop="borderClick" @mouseover.stop="enter2" @mouseleave.stop="leave2">
            <p class="c_con">边框<span class="computed_edit" v-show="showType == 'border_control'">编辑中...</span></p>
            <!-- 边框分别设置icon -->
            <i :class="{'el-icon-edit':borderShowType,'el-icon-back':!borderShowType}"
             @click.stop="changeBorder" 
             v-if="this.btype == 'diff_hover' && showType == 'border_control'" 
             title="编辑悬浮边框" alt="编辑悬浮边框"></i>
            <!-- 边框统一设置icon -->
            <i :class="{'el-icon-edit':allBorderShowType,'el-icon-back':!allBorderShowType}"
             @click.stop="changeAllBorder" 
             v-if="this.btype == 'all' && showType == 'border_control'" 
             title="编辑悬浮边框" alt="编辑悬浮边框"></i>

            <div class="c_padding" ref="my_padding" @click.stop="paddingClick" @mouseover.stop="enter3" @mouseleave.stop="leave3">
                <p class="c_con">内边距<span class="computed_edit" v-show="showType == 'padding_control'">编辑中...</span></p>
                <div class="c_contain" ref="my_contain"  @click.stop="containClick" @mouseover.stop="enter4" @mouseleave.stop="leave4">
                    <p class="" style="white-space: nowrap;">内容<span class="computed_edit" v-show="showType == 'contain_control'">编辑中...</span></p>
                </div>
            </div>
        </div>
    </div>
    <div class="computed_right">
        <!-- 控制外边距 -->
        <div class="margin_control" style="width:100%;" v-show="showType == 'margin_control'">
            <slot name="margin_control"><h1>外边距设置为空</h1></slot>
        </div>
        <!-- 控制内边距 -->
        <div class="padding_control" style="width:100%;"  v-show="showType == 'padding_control'">
            <slot name="padding_control"><h1>内边距设置为空</h1></slot>
        </div>
        <!-- 控制边框 全部设置 默认的 -->
        <div class="border_control border_all_control"  v-show="showType == 'border_control' && this.btype == 'all' && allBorderShowType ">
            <slot name="allbordersss"><h1>边框设置为空</h1></slot>
        </div>
        <!-- 控制边框 全部设置 悬浮的 -->
        <div class="border_control border_all_control"  v-show="showType == 'border_control' && this.btype == 'all' && !allBorderShowType ">
            <slot name="allbordersss_hover"><h1>悬浮边框设置为空</h1></slot>
        </div>
        <!-- 控制边框 分别设置 默认的 -->
        <div class="border_control"  v-show="showType == 'border_control' && this.btype == 'diff_hover' && borderShowType">
            <slot name="diff_border"><h1>边框设置为空</h1></slot>
        </div>
        <!-- 控制边框 分别设置 悬浮的 -->
        <div class="border_control"  v-show="showType == 'border_control' && this.btype == 'diff_hover' && !borderShowType">
            <slot name="diff_border_hover"><h1>悬浮边框设置为空</h1></slot>
        </div>
        <!-- 宽 高 -->
        <div class="contain_control"  v-show="showType == 'contain_control'">
          <slot name="contain_control" ><h1>内容设置为空</h1></slot>
        </div>
    </div>

  </div>
</template>

<script>
/**@augments
 *  btype: 代表边框统一设置还是分别设置 all、diff_hover
 *  checktype: 代表初始化默认编辑的状态 默认值为margin_control --> 名字是slot名称
    <my-computed 
      :btype="'all'" :checktype="'padding_control'">
        外边距
        <div slot="margin_control" class="setOne" >
          <my-number v-model="infor.w_style1_margin_top" :min="0" :max="1000" title="上外间距"></my-number>
        </div>
        内边距
        <div slot="padding_control" class="setOne">
          <my-number v-model="infor.w_style1_padding_top" :min="0" :max="1000" title="上内间距"></my-number>
        </div>

        四边统一设置
        <div class="setOne" slot="allbordersss">
          <my-border
            type="all"
            :my_width.sync="infor.language_a_border_all_width"
            :my_color.sync="infor.language_a_border_all_color"
            :my_style.sync="infor.language_a_border_all_styles"
            title="默认边框"
          ></my-border>
        </div>

        四边分别设置 -- 默认
        <div class="setOne" slot="diff_border"></div>

        四边分别设置 -- 悬浮
        <div class="setOne" slot="diff_border_hover"></div>
        内容设置 -- 优先级 宽 高 字体大小 行高 字体颜色 背景颜色...
        <div slot="contain_control" class="setOne"></div>
    </my-computed>
 */
export default {
  name: "public_computed",
  data() {
    return {
      borderShowType: true,
      allBorderShowType: true,
      showType: this.myShowType()
    };
  },
  watch: {},
  props: {
    btype: {
      type: String,
      default: "all"
    },
    checktype:{
      type:String,
      default:'margin_control'
    }
  },
  computed: {
  },
  methods: {
    myShowType(){
      if(this.checktype == 'allbordersss'){
        this.allBorderShowType = true;
        return  'border_control'
      }

      if(this.checktype == 'allbordersss_hover'){
        this.allBorderShowType = false;
        return  'border_control'
      }

      if(this.checktype == 'diff_border'){
        this.btype = 'diff_hover' 
        this.borderShowType = true;
        return  'border_control'
      }

      if(this.checktype == 'diff_border_hover'){
        this.btype = 'diff_hover' 
        this.borderShowType = false;
        return  'border_control'
      }

      return  this.checktype
    },
    changeTypes(item){
      // margin_control => my_margin
      return 'my_' + item.replace('_control','');
    },
    changeBorder() {
      this.borderShowType = !this.borderShowType;

      if(!this.borderShowType){
        this.$notify({
          title: '切换边框',
          type: 'success',
          message: '切换至悬浮边框设置',
          position: 'top-left'
        });
      }else{
        this.$notify({
          title: '切换边框',
          type: 'success',
          message: '切换至默认边框设置',
          position: 'top-left'
        });
      }
      
    },
    changeAllBorder(){
      this.allBorderShowType = !this.allBorderShowType;
      
      if(!this.allBorderShowType){
        this.$notify({
          title: '切换边框',
          type: 'success',
          message: '切换至悬浮边框设置',
          position: 'top-left'
        });
      }else{
        this.$notify({
          title: '切换边框',
          type: 'success',
          message: '切换至默认边框设置',
          position: 'top-left'
        });
      }
    },
    marginClick() {
      if(this.showType == 'margin_control'){
        return ;
      }
      this.showType = "margin_control";
      this.$notify({
        title: '外边距设置',
        type: 'success',
        message: '当前部件与外层之间的间距设置',
        position: 'top-left'
      });
    },
    borderClick() {
      if(this.showType == 'border_control'){
        return ;
      }
      this.showType = "border_control";
      this.$notify({
        title: '边框设置',
        type: 'success',
        message: '当前部件默认和悬浮分别设置,可设置边框粗细、颜色和边框类型',
        position: 'top-left'
      });
    },
    paddingClick() {
      if(this.showType == 'padding_control'){
        return ;
      }
      this.showType = "padding_control";
      this.$notify({
        title: '内边距设置',
        type: 'success',
        message: '设置当前部件内部各个方向的内部间距',
        position: 'top-left'
      });
    },
    containClick() {
      if(this.showType == 'contain_control'){
        return ;
      }
      this.showType = "contain_control";
      this.$notify({
        title: '内容设置',
        type: 'success',
        message: '根据不同的部件,进行对当前部件的宽、高等属性设置',
        position: 'top-left'
      });
    },
    enter1() {
      // console.log('enter111',Date.now());
      this.$refs.my_margin.style.backgroundColor = `rgba(249,204,157,1)`;
      this.$refs.my_contain.style.backgroundColor = `#fff`;
      this.$refs.my_padding.style.backgroundColor = "#fff";
      this.$refs.my_border.style.backgroundColor = "#fff";
    },
    leave1() {
      // console.log('leave1111',Date.now());
      this.$refs.my_margin.style.backgroundColor = `rgba(249,204,157,1)`;
      this.$refs.my_padding.style.backgroundColor = `rgba(196,223,184,1)`;
      this.$refs.my_contain.style.backgroundColor = `rgba(160,198,192,1)`;
      this.$refs.my_border.style.backgroundColor = `rgba(255,238,188,1)`;

      this.$refs[this.changeTypes(this.showType)].style.backgroundColor = `#F56C6C`;
    },
    enter2() {
      this.$refs.my_border.style.backgroundColor = `rgba(255,238,188,1)`;
      this.$refs.my_margin.style.backgroundColor = "#fff";
    },
    leave2() {
      this.$refs.my_border.style.backgroundColor = "#fff";
    },
    enter3() {
      this.$refs.my_padding.style.backgroundColor = `rgba(196,223,184,1)`;
      this.$refs.my_border.style.backgroundColor = "#fff";
      this.$refs.my_margin.style.backgroundColor = "#fff";
    },
    leave3() {
      this.$refs.my_padding.style.backgroundColor = "#fff";
    },
    enter4() {
      this.$refs.my_contain.style.backgroundColor = `rgba(160,198,192,1)`;
      this.$refs.my_padding.style.backgroundColor = "#fff";
      this.$refs.my_border.style.backgroundColor = "#fff";
      this.$refs.my_margin.style.backgroundColor = "#fff";
    },
    leave4() {
      this.$refs.my_contain.style.backgroundColor = "#fff";
    }
  },
  mounted() {
      this.$refs[this.changeTypes(this.showType)].style.backgroundColor = `#F56C6C`;
  }
};
</script>

<style lang="scss"  type="text/css" scoped>
$width: 200px;
$height: 160px;
$delWidth: 40px;
$delHeight: 40px;

.computed_containt {
  width: 40%;
  float: left;
  height: $height;
  min-width:500px;
  border-right: 1px #777 dotted;
}
.computed_right {
  float: right;
  width: calc(100% - 214px);
  height: $height;
  overflow: hidden;
  > div {
    width: 100%;
    height: $height;
  }
  h1{
    width: 100%;
    font-size: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    background-color: #e5e5e5;
  }
}

.public_computed {
  cursor: pointer;
  float: left;
  width: $width;
  height: $height;
  border: 1px dotted #000;
  margin-left: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 12px;
  z-index: 1;
  background-color: rgba(249, 204, 157, 1);
  .c_con {
    position: absolute;
    left: 0;
    top: 0;
    transform: scale(0.8);
    z-index: 11;
  }
  .computed_edit {
    color: #f00;
    display: inline-block;
    margin-left: 6px;
    transform: scale(0.9);
  }
  .c_border {
    width: $width - $delWidth;
    height: $height - $delHeight;
    border: 1px solid #666;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 238, 188, 1);
    z-index: 2;
  }
  .c_padding {
    width: $width - $delWidth*2;
    height: $height - $delHeight*2;
    border: 1px dotted #000;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(196, 223, 184, 1);
    z-index: 3;
  }
  .c_contain {
    width: $width - $delWidth*3;
    height: $height - $delHeight*3;
    border: 1px solid #666;
    position: relative;
    background-color: rgba(160, 198, 192, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 4;
  }
  p {
    transform: scale(0.8);
  }
  i {
    position: absolute;
    right: 0;
    top: 0;
    width: 16px;
    height: 16px;
    &:hover {
      color: #f00;
    }
  }
}
</style>
<style lang="scss"  type="text/css" >

.border_all_control{
  display:flex;
  strong{
    display:none;
    color:#f00;
  }
}

// 边框的样式
.border_control .myBorder {
  width: 100% !important;
  .sele,
  .int {
    width: 90px !important;
  }
  .el-color-picker {
    height: 34px;
    overflow: hidden;
    .el-color-picker__trigger {
      height: 34px;
      width: 34px;
    }
    span {
      height: 20px;
      margin-top: 0;
    }
  }
  .el-input-number__decrease {
    height: 14px;
    margin-bottom: 4px;
  }
  .el-input-number__increase {
    height: 14px;
  }
}

.computed_right {
   div.setOne{
    display: flex;
    flex-direction: column;
  }
  .mySelect, .row_back_frame, .myCloor{
    margin-bottom: 4px;
  }
  .myInput {
    margin-bottom: 4px;
    strong {
      box-sizing: border-box;
      padding-left: 12px;
      line-height: 34px;
      height: 34px;
      text-align: left;
      display: inline-block;
      width: 30%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 90px;
      max-width: 110px;
    }
  }
  div.row_back_frame {
  }
  .border_control {
    .setOne {
      min-width: 100px;
      width: 100%;
    }
  }
}

.computed_right .border_control .myBorder {
  margin-bottom: 4px;
}
</style>

