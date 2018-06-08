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
            <el-tab-pane name="second" label="标题">
                <!-- <el-alert title="每个字段的标题为统一设置样式" type="info"></el-alert> -->
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">宽:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.titleWidth"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">高:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.titleHeight"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">显示:</b>
                        <my-select v-model="tem_datas.styles.titleDisplay" title="" :option="$store.state.options.twoBtn"></my-select>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">行高:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.titleLineHeight"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">水平位置:</b>
                        <my-select v-model="tem_datas.styles.titleTextAlign" title="" :option="$store.state.options.textAlign"></my-select>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">字体粗细:</b>
                        <my-select v-model="tem_datas.styles.titleFontWeight" title="" :option="$store.state.options.myFontWeight"></my-select>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">字体大小:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.titleFs"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">上间距:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.titleTop"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">左间距:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.titleLeft"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">右间距:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.titleRight"></my-number>
                    </el-col>
                </el-row>
                <el-row class="rows2">
                    <div class="setOne">
                        <my-color v-model="tem_datas.styles.titleColor" title="字体:"></my-color>
                        <my-color v-model="tem_datas.styles.titleBackgroundColor" title="背景:"></my-color>
                    </div>
                </el-row>
            </el-tab-pane>
            <el-tab-pane name="third" label="输入框">
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
                        <b class="left inputB">上间距:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.inputTop"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="tem_datas.styles.selfYzmColor" title="字体:"></my-color>
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
                        <b class="left inputB">圆角半径:</b>
                        <my-number :max="1000" :min="0" v-model="tem_datas.styles.inputBorderRadius"></my-number>
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
            <el-tab-pane name="fourths" label="图片" >
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">宽:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.yzmImgWidth"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">高:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.yzmImgHeight"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">上外间距:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.yzmImgTop"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">右外间距:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.yzmImgRight"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">左外间距:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.yzmImgLeft"></my-number>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane name="links" label="链接" >
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">字体大小:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.yzmAFs"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">上外间距:</b>
                        <my-number :max="1000" :min="1" v-model="tem_datas.styles.yzmATop"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="tem_datas.styles.yzmAColor" title="字体:"></my-color>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="infor.yzmABC" title="悬浮字体:"></my-color>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane name="fourth" label="*号">
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">显示:</b>
                        <my-select v-model="tem_datas.styles.xingDisplay" title="" :option="$store.state.options.twoBtn"></my-select>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">左间距:</b>
                        <my-number :max="1000" :min="-100" v-model="tem_datas.styles.xingLeft"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">上间距:</b>
                        <my-number :max="1000" :min="-100" v-model="tem_datas.styles.xingTop"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">大小:</b>
                        <my-number :max="200" :min="12" v-model="tem_datas.styles.xingFS"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="tem_datas.styles.xingColor" title="颜色:"></my-color>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane name="five" label="图标设置">
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">显示:</b>
                        <my-select v-model="tem_datas.styles.iconDisplay" title="" :option="$store.state.options.twoBtn"></my-select>
                    </el-col>
                    <el-col :span="12">
                        <my-icon v-model="tem_datas.styles.iconClassName" :title="'图标'"></my-icon>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">左间距:</b>
                        <my-number :max="1000" :min="-100" v-model="tem_datas.styles.iconLeft"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <b class="left inputB">上间距:</b>
                        <my-number :max="1000" :min="-100" v-model="tem_datas.styles.iconTop"></my-number>
                    </el-col>
                </el-row>
                <el-row class="row-modal">
                    <el-col :span="12">
                        <b class="left inputB">大小:</b>
                        <my-number :max="200" :min="12" v-model="tem_datas.styles.iconFS"></my-number>
                    </el-col>
                    <el-col :span="12">
                        <div class="setOne single-color">
                            <my-color v-model="tem_datas.styles.iconColor" title="颜色:"></my-color>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <!-- <el-tab-pane name="six" label="图标选择">
                <div class="naviconList" style="width: 100%; border: 0; height: 100%;">
                    <p style="height: 10px;margin-bottom:0 "></p>
                    <my-icon v-model="tem_datas.styles.iconClassName" :title="图标"></my-icon>
                </div>
            </el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
export default {
  name: "form-yzm",
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
        this.templet.module_add_historical('编辑留言组件验证码');
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
