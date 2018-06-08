<template>
    <!-- 单文本 -->
    <div  class="public-form-styles" :style="{
        height: '400px',
        overflowY: 'auto'
    }">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane name="first" label="块设置" >
                <!-- <el-alert title="设置表单每一行的公共属性" type="info"></el-alert> -->
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">宽:</b>
                        <my-number :max="1000"  :min="1" v-model="tem_datas.styles.width"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">高:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.height"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">左间距:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.left"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">上间距:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.top"></my-number>
                    </el-col>
                </el-row>
                <!-- <el-row class="rows2">
                    <div class="setOne">
                        <my-color v-model="tem_datas.styles.color" title="字体:"></my-color>
                        <my-color v-model="tem_datas.styles.backgroundColor" title="背景:"></my-color>
                    </div>
                </el-row> -->
                <div class="setOne">
                    <my-border
                    type="top"
                    :my_style.sync="tem_datas.styles.rowBorderTopStyle"
                    :my_color.sync="tem_datas.styles.rowBorderTopColor"
                    :my_width.sync="tem_datas.styles.rowBorderTopWidth"
                    title="上边框"
                    ></my-border>
                    <my-border
                    type="right"
                    :my_style.sync="tem_datas.styles.rowBorderRightStyle"
                    :my_color.sync="tem_datas.styles.rowBorderRightColor"
                    :my_width.sync="tem_datas.styles.rowBorderRightWidth"
                    title="右边框"
                    ></my-border>
                </div>
                <div class="setOne">
                    <my-border
                    type="bottom"
                    :my_style.sync="tem_datas.styles.rowBorderBottomStyle"
                    :my_color.sync="tem_datas.styles.rowBorderBottomColor"
                    :my_width.sync="tem_datas.styles.rowBorderBottomWidth"
                    title="下边框"
                    ></my-border>
                    <my-border
                    type="left"
                    :my_style.sync="tem_datas.styles.rowBorderLeftStyle"
                    :my_color.sync="tem_datas.styles.rowBorderLeftColor"
                    :my_width.sync="tem_datas.styles.rowBorderLeftWidth"
                    title="左边框"
                    ></my-border>
                </div>
            </el-tab-pane>
            <el-tab-pane name="second" label="按钮1">
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">按钮间距:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.checkboxDistance"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">宽:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.inputWidth"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">高:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.inputHeight"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">左内间距:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.inputPaddingLeft"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">上内间距:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.selectPaddingTop"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">字体大小:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.selectFS"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">圆角半径:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.inputBorderRadius"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="tem_datas.styles.selectColor" title="字体:"></my-color>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="tem_datas.styles.inputBC" title="背景:"></my-color>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="infor.double_btn_color1" title="悬浮字体:"></my-color>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="infor.double_btn_bc1" title="悬浮背景:"></my-color>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">默认:</b>
                        <my-img v-model="tem_datas.styles.doubleBtnImg1"></my-img>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">悬浮:</b>
                        <my-img v-model="infor.doubleBtnHoverImg1"></my-img>
                    </el-col>
                </el-row>
                <div class="setOne">
                    <my-border
                    type="top"
                    :my_style.sync="tem_datas.styles.inputBorderTopStyle"
                    :my_color.sync="tem_datas.styles.inputBorderTopColor"
                    :my_width.sync="tem_datas.styles.inputBorderTopWidth"
                    title="上边框"
                    ></my-border>
                    <my-border
                    type="right"
                    :my_style.sync="tem_datas.styles.inputBorderRightStyle"
                    :my_color.sync="tem_datas.styles.inputBorderRightColor"
                    :my_width.sync="tem_datas.styles.inputBorderRightWidth"
                    title="右边框"
                    ></my-border>
                </div>
                <div class="setOne">
                    <my-border
                    type="bottom"
                    :my_style.sync="tem_datas.styles.inputBorderBottomStyle"
                    :my_color.sync="tem_datas.styles.inputBorderBottomColor"
                    :my_width.sync="tem_datas.styles.inputBorderBottomWidth"
                    title="下边框"
                    ></my-border>
                    <my-border
                    type="left"
                    :my_style.sync="tem_datas.styles.inputBorderLeftStyle"
                    :my_color.sync="tem_datas.styles.inputBorderLeftColor"
                    :my_width.sync="tem_datas.styles.inputBorderLeftWidth"
                    title="左边框"
                    ></my-border>
                </div>
            </el-tab-pane>
            <el-tab-pane name="third" label="按钮2">
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">宽:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.inputWidth2"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">高:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.inputHeight2"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">左内间距:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.inputPaddingLeft2"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">上内间距:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.selectPaddingTop2"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">字体大小:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.selectFS2"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">圆角半径:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.inputBorderRadius2"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="tem_datas.styles.selectColor2" title="字体:"></my-color>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="tem_datas.styles.inputBC2" title="背景:"></my-color>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="infor.double_btn_color2" title="悬浮字体:"></my-color>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="infor.double_btn_bc2" title="悬浮背景:"></my-color>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">默认:</b>
                        <my-img v-model="tem_datas.styles.doubleBtnImg2"></my-img>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">悬浮:</b>
                        <my-img v-model="infor.doubleBtnHoverImg2"></my-img>
                    </el-col>
                </el-row>
                <div class="setOne">
                    <my-border
                    type="top"
                    :my_style.sync="tem_datas.styles.inputBorderTopStyle2"
                    :my_color.sync="tem_datas.styles.inputBorderTopColor2"
                    :my_width.sync="tem_datas.styles.inputBorderTopWidth2"
                    title="上边框"
                    ></my-border>
                    <my-border
                    type="right"
                    :my_style.sync="tem_datas.styles.inputBorderRightStyle2"
                    :my_color.sync="tem_datas.styles.inputBorderRightColor2"
                    :my_width.sync="tem_datas.styles.inputBorderRightWidth2"
                    title="右边框"
                    ></my-border>
                </div>
                <div class="setOne">
                    <my-border
                    type="bottom"
                    :my_style.sync="tem_datas.styles.inputBorderBottomStyle2"
                    :my_color.sync="tem_datas.styles.inputBorderBottomColor2"
                    :my_width.sync="tem_datas.styles.inputBorderBottomWidth2"
                    title="下边框"
                    ></my-border>
                    <my-border
                    type="left"
                    :my_style.sync="tem_datas.styles.inputBorderLeftStyle2"
                    :my_color.sync="tem_datas.styles.inputBorderLeftColor2"
                    :my_width.sync="tem_datas.styles.inputBorderLeftWidth2"
                    title="左边框"
                    ></my-border>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
  name: "form-doublebutton",
  data() {
    return {
        activeName:'first'
    };
  },
  props: {
    tem_datas: Object,
    infor:Object,
    default: {}
  },
  watch:{
    infor:{
      handler(val, oldVal){
        this.templet.module_add_historical('编辑留言组件双按钮');
      },
      deep:true
    }
  },
  methods:{
    handleClick(tab, event) {
    }
  },
  mounted() {
    // console.log('datas-----',this.tem_datas)
  }
};
</script>

<style>

</style>
