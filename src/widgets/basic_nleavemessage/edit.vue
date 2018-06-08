<template>
  <div class="dateEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
        <span 
            class="mouseClass edit_second_level" @click="templet.p_select_parts('leavemessage1')"
              data-Highlight="leavemessage1"
              :class="[
           $store.state.hover_parts == 'leavemessage1'  ? 'index_Highlight' : ''
           ]">表单设置</span>
        <span
            class="mouseClass edit_second_level" @click="templet.p_select_parts('leavemessage2')"
              data-Highlight="leavemessage2"
              :class="[
           $store.state.hover_parts == 'leavemessage2'  ? 'index_Highlight' : ''
           ]"
        >配置管理</span>
    </div>

    <!--日期设置-->
    <div class="Routine_setting btm_3cols" v-show="$store.state.parts == 'leavemessage1'">
      <div class="setOne">
        <my-select class="msgedit" v-model="infor.form_title" title="表单名" :option="title_datas"></my-select>
        <my-number class="msgedit" v-model="infor.form_all_width" :max='2000' :min='10' title="容器宽"></my-number>
        <my-number class="msgedit" v-model="infor.form_all_height" :max='2000' :min='10' title="容器高"></my-number>
      </div>
      <div class="setOne">
        <el-alert class="msgedit"
        :style="{
          width:'50%'
        }"
          title="统一设置文本框内提示信息的字体大小和颜色"
          type="info">
        </el-alert>
      </div>
      <div class="setOne">
        <my-number class="msgedit" v-model="infor.placeholder_fs" :max='2000' :min='12' title="字体大小"></my-number>
        <my-color v-model="infor.placeholder_color" title="字体颜色"></my-color>
      </div>
    </div>

    <!--时间设置-->
    <div class="btn_setting" v-show="$store.state.parts == 'leavemessage2'">
      <ul id="edit-form-ul">
        <li>
            <!-- <span >公共设置</span> -->
            <el-button icon="el-icon-edit" size="mini" type="primary" @click="editPublic">公共设置</el-button>
        </li>
        <li v-for="(items,index) in infor.form_ziduan_arr" :key="index" 
            v-on:click="editItem(index)"
            @mouseover="liHover(index)" >
            <el-button icon="el-icon-edit"  size="mini" v-if="items.name" type="primary">{{items.name}}</el-button>
            <el-button icon="el-icon-edit" size="mini" v-else type="primary">按钮</el-button>
        </li>
      </ul>
    </div>

    <!-- <edit-module v-if="isShow" v-on:closem="myclose" :isShow="isShow" ></edit-module> -->
    <!-- 私有modal -->
    <el-dialog title="表单编辑" 
        :modal="false" 
        width="800px"
        :append-to-body="true"
        :visible.sync="style_modal" 
        class="my-msg-module">

        <component  @dblclick.stop.native="cancelBubles" :is="getTypeComponent" :tem_datas="tem_datas" 
        :infor="infor" ></component>

        <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="style_modal = false">取 消</el-button> -->
            <el-button type="primary" @click="style_modal = false">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 公有modal -->
    <el-dialog title="公共设置" 
            :modal="false" 
            width="800px"
            :append-to-body="true"
            :visible.sync="style_public_modal" 
            class="my-msg-module" :modal-append-to-body="true">

            <div  class="public-form-styles"  @dblclick.stop="cancelBubles" :style="{
                    height: '400px',
                    overflowY: 'auto'
            }">
                    <el-tabs v-model="activeName" >
                            <el-tab-pane name="first" label="标题">
                                    <el-alert title="每个字段的标题为统一设置样式" type="info"></el-alert>
                                    <el-row class="row-modal">
                                            <el-button type="primary" v-on:click="mobsyncTitle">同步</el-button>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">宽:</b>
                                                    <my-number :max="1000" :min="1" v-model="infor.publicTitle.titleWidth"></my-number>
                                            </el-col>
                                            <el-col :span="12">
                                                    <b class="left inputB">高:</b>
                                                    <my-number :max="1000" :min="1" v-model="infor.publicTitle.titleHeight"></my-number>
                                            </el-col>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">显示:</b>
                                                    <my-select v-model="infor.publicTitle.titleDisplay" title="" :option="$store.state.options.twoBtn"></my-select>
                                            </el-col>
                                            <el-col :span="12">
                                                    <b class="left inputB">行高:</b>
                                                    <my-number :max="1000" :min="1" v-model="infor.publicTitle.titleLineHeight"></my-number>
                                            </el-col>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">水平位置:</b>
                                                    <my-select v-model="infor.publicTitle.titleTextAlign" title="" :option="$store.state.options.textAlign"></my-select>
                                            </el-col>
                                            <el-col :span="12">
                                                    <b class="left inputB">字体粗细:</b>
                                                    <my-select v-model="infor.publicTitle.titleFontWeight" title="" :option="$store.state.options.myFontWeight"></my-select>
                                            </el-col>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">字体大小:</b>
                                                    <my-number :max="1000" :min="1" v-model="infor.publicTitle.titleFs"></my-number>
                                            </el-col>
                                            <el-col :span="12">
                                                    <b class="left inputB">上间距:</b>
                                                    <my-number :max="1000" :min="0" v-model="infor.publicTitle.titleTop"></my-number>
                                            </el-col>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">左间距:</b>
                                                    <my-number :max="1000" :min="0" v-model="infor.publicTitle.titleLeft"></my-number>
                                            </el-col>
                                            <el-col :span="12">
                                                    <b class="left inputB">右间距:</b>
                                                    <my-number :max="1000" :min="0" v-model="infor.publicTitle.titleRight"></my-number>
                                            </el-col>
                                    </el-row>
                                    <el-row class="rows2">
                                            <div class="setOne">
                                                    <my-color v-model="infor.publicTitle.titleColor" title="字体:"></my-color>
                                                    <my-color v-model="infor.publicTitle.titleBackgroundColor" title="背景:"></my-color>
                                            </div>
                                    </el-row>
                            </el-tab-pane>
                            <el-tab-pane name="third" label="单文本">
                                    <el-alert title="每个字段的单文本为统一设置样式" type="info"></el-alert>
                                    <el-row class="row-modal">
                                            <el-button type="primary" v-on:click="mobsyncInput">同步</el-button>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">宽:</b>
                                                    <my-number :max="1000" :min="1" v-model="infor.publicInput.selfInputWidth"></my-number>
                                            </el-col>
                                            <el-col :span="12">
                                                    <b class="left inputB">高:</b>
                                                    <my-number :max="1000" :min="1" v-model="infor.publicInput.selfInputHeight"></my-number>
                                            </el-col>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">左内间距:</b>
                                                    <my-number :max="1000" :min="0" v-model="infor.publicInput.selfInputPaddingLeft"></my-number>
                                            </el-col>
                                            <el-col :span="12">
                                                    <b class="left inputB">上间距:</b>
                                                    <my-number :max="1000" :min="0" v-model="infor.publicInput.selfInputTop"></my-number>
                                            </el-col>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <div class="setOne single-color">
                                                            <my-color v-model="infor.publicInput.selfInputColor" title="字体:"></my-color>
                                                    </div>
                                            </el-col>
                                            <el-col :span="12">
                                                    <div class="setOne single-color">
                                                            <my-color v-model="infor.publicInput.selfInputBC" title="背景:"></my-color>
                                                    </div>
                                            </el-col>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">圆角半径:</b>
                                                    <my-number :max="1000" :min="0" v-model="infor.publicInput.selfInputBorderRadius"></my-number>
                                            </el-col>
                                    </el-row>
                                    
                                    <div class="setOne">
                                            <my-border
                                            type="top"
                                            :my_style.sync="infor.publicInput.selfInputBorderTopStyle"
                                            :my_color.sync="infor.publicInput.selfInputBorderTopColor"
                                            :my_width.sync="infor.publicInput.selfInputBorderTopWidth"
                                            title="上边框"
                                            ></my-border>
                                            <my-border
                                            type="right"
                                            :my_style.sync="infor.publicInput.selfInputBorderRightStyle"
                                            :my_color.sync="infor.publicInput.selfInputBorderRightColor"
                                            :my_width.sync="infor.publicInput.selfInputBorderRightWidth"
                                            title="右边框"
                                            ></my-border>
                                            <my-border
                                            type="bottom"
                                            :my_style.sync="infor.publicInput.selfInputBorderBottomStyle"
                                            :my_color.sync="infor.publicInput.selfInputBorderBottomColor"
                                            :my_width.sync="infor.publicInput.selfInputBorderBottomWidth"
                                            title="下边框"
                                            ></my-border>
                                            <my-border
                                            type="left"
                                            :my_style.sync="infor.publicInput.selfInputBorderLeftStyle"
                                            :my_color.sync="infor.publicInput.selfInputBorderLeftColor"
                                            :my_width.sync="infor.publicInput.selfInputBorderLeftWidth"
                                            title="左边框"
                                            ></my-border>
                                    </div>
                            </el-tab-pane>
                            <el-tab-pane name="fourth" label="*号">
                                    <el-alert title="每个字段的*号为统一设置样式" type="info"></el-alert>
                                    <el-row class="row-modal">
                                            <el-button type="primary" v-on:click="mobsyncXing">同步</el-button>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">显示:</b>
                                                    <my-select v-model="infor.publicXing.xingDisplay" title="" :option="$store.state.options.twoBtn"></my-select>
                                            </el-col>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">左间距:</b>
                                                    <my-number :max="1000" :min="-100" v-model="infor.publicXing.xingLeft"></my-number>
                                            </el-col>
                                            <el-col :span="12">
                                                    <b class="left inputB">上间距:</b>
                                                    <my-number :max="1000" :min="-100" v-model="infor.publicXing.xingTop"></my-number>
                                            </el-col>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">大小:</b>
                                                    <my-number :max="200" :min="12" v-model="infor.publicXing.xingFS"></my-number>
                                            </el-col>
                                            <el-col :span="12">
                                                    <div class="setOne single-color">
                                                            <my-color v-model="infor.publicXing.xingColor" title="颜色:"></my-color>
                                                    </div>
                                            </el-col>
                                    </el-row>
                            </el-tab-pane>
                            <el-tab-pane name="five" label="图标设置">
                                    <el-alert title="每个字段的图标为统一设置样式" type="info"></el-alert>
                                    <el-row class="row-modal">
                                            <el-button type="primary" v-on:click="mobsyncIcon">同步</el-button>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">显示:</b>
                                                    <my-select v-model="infor.publicIcon.iconDisplay" title="" :option="$store.state.options.twoBtn"></my-select>
                                            </el-col>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">左间距:</b>
                                                    <my-number :max="1000" :min="-100" v-model="infor.publicIcon.iconLeft"></my-number>
                                            </el-col>
                                            <el-col :span="12">
                                                    <b class="left inputB">上间距:</b>
                                                    <my-number :max="1000" :min="-100" v-model="infor.publicIcon.iconTop"></my-number>
                                            </el-col>
                                    </el-row>
                                    <el-row class="row-modal">
                                            <el-col :span="12">
                                                    <b class="left inputB">大小:</b>
                                                    <my-number :max="200" :min="12" v-model="infor.publicIcon.iconFS"></my-number>
                                            </el-col>
                                            <el-col :span="12">
                                                    <div class="setOne single-color">
                                                            <my-color v-model="infor.publicIcon.iconColor" title="背景:"></my-color>
                                                    </div>
                                            </el-col>
                                    </el-row>
                            </el-tab-pane>
                    </el-tabs>
            </div>
            <div slot="footer" class="dialog-footer">
                <!-- <el-button @click="style_public_modal = false">取 消</el-button> -->
                <el-button type="primary" @click="style_public_modal = false">确 定</el-button>
            </div>
    </el-dialog>
  </div>
</template>

<script>
import style from './style';
import Vue from 'vue'
// 表单的每个字段单独的样式  分别封装在不同的组件中 根据 component进行显示
import { formText, formTextarea, formSelect, formMultipleselect, formRadios, formButton, formDoublebutton,formYzm } from '@/view/form'


export default {
    name:'basic_date_edit',
    props:{
    },
    components:{
      formText,
      formTextarea,
      formSelect,
      formMultipleselect,
      formRadios,
      formButton,
      formDoublebutton,
      formYzm
    },
    computed:{
      getTypeComponent(){
          // 类型
          let fieldtype = this.tem_datas.fieldtype;
          // 是否多行下拉框
          let valtype = this.tem_datas.valtype;
          if(fieldtype == 'select' &&  valtype == 'multiple'){
              return `form-${valtype}${fieldtype}`;
          }else if(fieldtype == 'checkbox' || fieldtype == 'radio' ){
              // 勾选框
              return 'form-radios';
          }

          return `form-${fieldtype}`;
      }
    },
    data(){
        return {
          isFirst:false,
          isShow:false,
          infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
          listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
          animateObj:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.animateObj)),
          editTitle: "表单编辑new",
          myShow: this.isShow,
          activeName2: 'first',
          activeName: 'first',
          infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
          listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
          animateObj:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.animateObj)),
          form_all_datas:'',
          title_datas:[],
          style_modal:false,
          style_public_modal:false,
          tem_datas:{
              styles:{
                  width:0,
                  height:0,
                  left:0,
                  top:0
              }
          }
        };
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
          if(this.isFirst){
                  this.templet.module_add_historical('编辑留言组件');
          }
        },
        deep: true
      },
      animateObj:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'animateObj',
            val:JSON.parse(JSON.stringify(val))
          });
          if(this.isFirst){
                  this.templet.module_add_historical('编辑留言组件');
          }
        },
        deep: true
      },
      'infor.form_title'(a,b){
          // 根据id 获取其对应的 title
          // console.log('ss222',this.title_datas);
          let vals = '';
          let _this = this;
          this.title_datas.forEach((item,index) => {
              if(item.value == a){
              vals = item.label;
              _this.selectFormID(vals);
              }
          });
      }
    },
    methods:{
        liHover(index){
        },
        // 单文本同步
        mobsyncInput:function () {
          var obj = this.infor.form_select_datas;
          var len = Object.keys(this.infor.form_select_datas).length;
          for (var i = 0; i < len; i++) {
              obj[i].styles.selfInputWidth = this.infor.publicInput.selfInputWidth;
              obj[i].styles.selfInputHeight = this.infor.publicInput.selfInputHeight;
              obj[i].styles.selfInputPaddingLeft = this.infor.publicInput.selfInputPaddingLeft;
              obj[i].styles.selfInputTop = this.infor.publicInput.selfInputTop;
              obj[i].styles.selfInputBorderRadius = this.infor.publicInput.selfInputBorderRadius;
              obj[i].styles.selfInputBC = this.infor.publicInput.selfInputBC;
              obj[i].styles.selfInputBorderTopStyle = this.infor.publicInput.selfInputBorderTopStyle;
              obj[i].styles.selfInputBorderTopWidth = this.infor.publicInput.selfInputBorderTopWidth;
              obj[i].styles.selfInputBorderTopColor = this.infor.publicInput.selfInputBorderTopColor;
              obj[i].styles.selfInputBorderRightStyle = this.infor.publicInput.selfInputBorderRightStyle;
              obj[i].styles.selfInputBorderRightWidth = this.infor.publicInput.selfInputBorderRightWidth;
              obj[i].styles.selfInputBorderRightColor = this.infor.publicInput.selfInputBorderRightColor;
              obj[i].styles.selfInputBorderBottomStyle = this.infor.publicInput.selfInputBorderBottomStyle;
              obj[i].styles.selfInputBorderBottomWidth = this.infor.publicInput.selfInputBorderBottomWidth;
              obj[i].styles.selfInputBorderBottomColor = this.infor.publicInput.selfInputBorderBottomColor;
              obj[i].styles.selfInputBorderLeftStyle = this.infor.publicInput.selfInputBorderLeftStyle;
              obj[i].styles.selfInputBorderLeftWidth = this.infor.publicInput.selfInputBorderLeftWidth;
              obj[i].styles.selfInputBorderLeftColor = this.infor.publicInput.selfInputBorderLeftColor;
              obj[i].styles.selfInputColor = this.infor.publicInput.selfInputColor;
          }

          this.$notify({
              title: '单文本',
              message: '表单中的所有单文本样式同步成功，所有表单使用同一样式，可单独设置每个的样式',
              type: 'success',
              duration: 3000
          });
      },
      // 标题同步
      mobsyncTitle:function () {
          var obj = this.infor.form_select_datas;
          var len = Object.keys(this.infor.form_select_datas).length;
          for (var i = 0; i < len; i++) {
              obj[i].styles.titleWidth = this.infor.publicTitle.titleWidth;
              obj[i].styles.titleHeight = this.infor.publicTitle.titleHeight;
              obj[i].styles.titleLineHeight = this.infor.publicTitle.titleLineHeight;
              obj[i].styles.titleLeft = this.infor.publicTitle.titleLeft;
              obj[i].styles.titleRight = this.infor.publicTitle.titleRight;
              obj[i].styles.titleTop = this.infor.publicTitle.titleTop;
              obj[i].styles.titleFs = this.infor.publicTitle.titleFs;
              obj[i].styles.titleFontWeight = this.infor.publicTitle.titleFontWeight;
              obj[i].styles.titleTextAlign = this.infor.publicTitle.titleTextAlign;
              obj[i].styles.titleDisplay = this.infor.publicTitle.titleDisplay;
              obj[i].styles.titleBackgroundColor = this.infor.publicTitle.titleBackgroundColor;
              obj[i].styles.titleColor = this.infor.publicTitle.titleColor;
          }

          this.$notify({
              title: '标题',
              message: '表单中的所有标题样式同步成功，所有表单使用同一样式，可单独设置每个的样式',
              type: 'success',
              duration: 3000
          });
      },
      // *同步
      mobsyncXing:function () {
          // console.log('图标同步1',this.infor.form_select_datas);
          var obj = this.infor.form_select_datas;
          var len = Object.keys(this.infor.form_select_datas).length;
          for (var i = 0; i < len; i++) {
              obj[i].styles.xingLeft = this.infor.publicXing.xingLeft;
              obj[i].styles.xingTop = this.infor.publicXing.xingTop;
              obj[i].styles.xingFS = this.infor.publicXing.xingFS;
              obj[i].styles.xingColor = this.infor.publicXing.xingColor;
              obj[i].styles.xingDisplay = this.infor.publicXing.xingDisplay;
          }
          
          this.$notify({
              title: '*号',
              message: '表单中的所有*号样式同步成功，所有表单使用同一样式，可单独设置每个的样式',
              type: 'success',
              duration: 3000
          });
      },
      // 图标同步
      mobsyncIcon:function () {
          // console.log('图标同步1',this.infor.form_select_datas);
          var obj = this.infor.form_select_datas;
          var len = Object.keys(this.infor.form_select_datas).length;
          for (var i = 0; i < len; i++) {
              obj[i].styles.iconLeft = this.infor.publicIcon.iconLeft;
              obj[i].styles.iconTop = this.infor.publicIcon.iconTop;
              obj[i].styles.iconFS = this.infor.publicIcon.iconFS;
              obj[i].styles.iconColor = this.infor.publicIcon.iconColor;
              obj[i].styles.iconDisplay = this.infor.publicIcon.iconDisplay;
          }
          
          this.$notify({
              title: '图标',
              message: '表单中的所有图标样式同步成功，所有表单使用同一样式，可单独设置每个的样式。',
              type: 'success',
              duration: 3000
          });
      },
      editPublic:function(){
          this.style_public_modal = !this.style_public_modal; 
          $.each($('.el-dialog__header'), item => {
                $('.el-dialog__header').eq(item).parent().draggable({ handle: "div.el-dialog__header,div.el-dialog__footer" });
        })
      },
      editItem:function(id){
          this.edit_id = id;
          this.style_modal = !this.style_modal;
          this.tem_datas = this.infor.form_select_datas[id];
          this.tem_datas.inputName = this.tem_datas.inputName === null ? '按钮' : this.tem_datas.inputName;
          // modal标题
          // $(".ivu-modal-content > .ivu-modal-header > .ivu-modal-header-inner").eq(2).text(this.tem_datas.inputName)
          $.each($('.el-dialog__header'), item => {
                $('.el-dialog__header').eq(item).parent().draggable({ handle: "div.el-dialog__header,div.el-dialog__footer" });
        })
      },
      randomColor:function(){
          var num  =  Math.floor(Math.random()*0xffffff).toString(10);
          num = Math.max(num,1000000);
          num = Math.min(num,14000000);
          num = '#'+num.toString(16);
          return num.length > 6 ? num : '#4c3085';
      },
      transfromString:function(obj){
          // 将样式中的数字转换成带单位的字符串 30 --> 30px
          obj.styles.width = obj.styles.width + 'px';
          obj.styles.height = obj.styles.height + 'px';
          obj.styles.left = obj.styles.left + 'px';
          obj.styles.top = obj.styles.top + 'px';
          return obj;
      },
      transfromNum:function(obj){
          // 将样式中的字符串转成数字 30px --> 30
          obj.styles.width = parseInt(obj.styles.width);
          obj.styles.height = parseInt(obj.styles.height);
          obj.styles.left = parseInt(obj.styles.left);
          obj.styles.top = parseInt(obj.styles.top);
          // console.log('将样式中的字符串转成数字',obj.styles);        
          return obj;
      },
      selectFormID:function(val){

          // 兼容 获取val 在 title_datas中的索引 label value
          let myIndex = 0;
          let $formId = 0;
          this.title_datas.forEach((item,index) => {
            if(item.label == val){
              myIndex = index;
              $formId = item.value;
            }
          });

          // 具体选择的表单
          this.infor.form_select_datas = JSON.parse(this.form_all_datas[myIndex]._fields);

          // 表单的id
          this.infor.formID =  $formId;

          // 为选择的表单 添加一个键 为样式的像 
          this.infor.form_select_datas = this.createDatas(this.infor.form_select_datas);

          // 所选中表单的字段
          this.ziduan(this.infor.form_select_datas);
          this.foramtPos();
      },
      // 创建用于保存样式数据的对象 styles用于保存 字段的全部样式
      createDatas:function(obj){

          var _this = this;

          $.each(obj,function(index,item){
              if (obj[index].styles) {
                  obj[index].styles = {
                      width: obj[index].styles.width,
                      height:obj[index].styles.height,
                      left: obj[index].styles.left,
                      top:obj[index].styles.top,
                      backgroundColor:obj[index].styles.backgroundColor, 
                      color:obj[index].styles.color,
                      rowBorderTopStyle:obj[index].styles.rowBorderTopStyle,
                      rowBorderTopWidth:obj[index].styles.rowBorderTopWidth,
                      rowBorderTopColor:obj[index].styles.rowBorderTopColor,
                      rowBorderRightStyle:obj[index].styles.rowBorderRightStyle,
                      rowBorderRightWidth:obj[index].styles.rowBorderRightWidth,
                      rowBorderRightColor:obj[index].styles.rowBorderRightColor,
                      rowBorderBottomStyle:obj[index].styles.rowBorderBottomStyle,
                      rowBorderBottomWidth:obj[index].styles.rowBorderBottomWidth,
                      rowBorderBottomColor:obj[index].styles.rowBorderBottomColor,
                      rowBorderLeftStyle:obj[index].styles.rowBorderLeftStyle,
                      rowBorderLeftWidth:obj[index].styles.rowBorderLeftWidth,
                      rowBorderLeftColor:obj[index].styles.rowBorderLeftColor,
                      titleWidth:obj[index].styles.titleWidth,
                      titleHeight:obj[index].styles.titleHeight,
                      titleLineHeight:obj[index].styles.titleLineHeight,
                      titleLeft:obj[index].styles.titleLeft,
                      titleRight:obj[index].styles.titleRight,
                      titleTop:obj[index].styles.titleTop,
                      titleFs:obj[index].styles.titleFs,
                      titleFontWeight:obj[index].styles.titleFontWeight,
                      titleTextAlign:obj[index].styles.titleTextAlign,
                      titleDisplay:obj[index].styles.titleDisplay,
                      titleBackgroundColor:obj[index].styles.titleBackgroundColor, 
                      titleColor:obj[index].styles.titleColor,
                      inputWidth:obj[index].styles.inputWidth,
                      inputHeight:obj[index].styles.inputHeight,
                      inputPaddingLeft:obj[index].styles.inputPaddingLeft,
                      inputTop:obj[index].styles.inputTop,
                      inputBorderRadius:obj[index].styles.inputBorderRadius,
                      inputBC:obj[index].styles.inputBC,
                      inputBorderTopStyle:obj[index].styles.inputBorderTopStyle,
                      inputBorderTopWidth:obj[index].styles.inputBorderTopWidth,
                      inputBorderTopColor:obj[index].styles.inputBorderTopColor,
                      inputBorderRightStyle:obj[index].styles.inputBorderRightStyle,
                      inputBorderRightWidth:obj[index].styles.inputBorderRightWidth,
                      inputBorderRightColor:obj[index].styles.inputBorderRightColor,
                      inputBorderBottomStyle:obj[index].styles.inputBorderBottomStyle,
                      inputBorderBottomWidth:obj[index].styles.inputBorderBottomWidth,
                      inputBorderBottomColor:obj[index].styles.inputBorderBottomColor,
                      inputBorderLeftStyle:obj[index].styles.inputBorderLeftStyle,
                      inputBorderLeftWidth:obj[index].styles.inputBorderLeftWidth,
                      inputBorderLeftColor:obj[index].styles.inputBorderLeftColor,
                      selfInputWidth:obj[index].styles.selfInputWidth,
                      selfInputHeight:obj[index].styles.selfInputHeight,
                      selfInputPaddingLeft:obj[index].styles.selfInputPaddingLeft,
                      selfInputTop:obj[index].styles.selfInputTop,
                      selfInputBorderRadius:obj[index].styles.selfInputBorderRadius,
                      selfInputBC:obj[index].styles.selfInputBC,
                      selfInputBorderTopStyle:obj[index].styles.selfInputBorderTopStyle,
                      selfInputBorderTopColor:obj[index].styles.selfInputBorderTopColor,
                      selfInputBorderTopWidth:obj[index].styles.selfInputBorderTopWidth,
                      selfInputBorderRightStyle:obj[index].styles.selfInputBorderRightStyle,
                      selfInputBorderRightColor:obj[index].styles.selfInputBorderRightColor,
                      selfInputBorderRightWidth:obj[index].styles.selfInputBorderRightWidth,
                      selfInputBorderBottomStyle:obj[index].styles.selfInputBorderBottomStyle,
                      selfInputBorderBottomColor:obj[index].styles.selfInputBorderBottomColor,
                      selfInputBorderBottomWidth:obj[index].styles.selfInputBorderBottomWidth,
                      selfInputBorderLeftStyle:obj[index].styles.selfInputBorderLeftStyle,
                      selfInputBorderLeftColor:obj[index].styles.selfInputBorderLeftColor,
                      selfInputBorderLeftWidth:obj[index].styles.selfInputBorderLeftWidth,
                      selectFontWeight:obj[index].styles.selectFontWeight,
                      selectPaddingTop:obj[index].styles.selectPaddingTop,
                      selectFS:obj[index].styles.selectFS,
                      selectColor:obj[index].styles.selectColor,
                      checkboxDistance:obj[index].styles.checkboxDistance,
                      inputWidth2:obj[index].styles.inputWidth2,
                      inputHeight2:obj[index].styles.inputHeight2,
                      inputPaddingLeft2:obj[index].styles.inputPaddingLeft2,
                      selectPaddingTop2:obj[index].styles.selectPaddingTop2,
                      selectFS2:obj[index].styles.selectFS2,
                      inputBorderRadius2:obj[index].styles.inputBorderRadius2,
                      selectColor2:obj[index].styles.selectColor2,
                      inputBC2:obj[index].styles.inputBC2,
                      inputBorderTopStyle2:obj[index].styles.inputBorderTopStyle2,
                      inputBorderTopWidth2:obj[index].styles.inputBorderTopWidth2,
                      inputBorderTopColor2:obj[index].styles.inputBorderTopColor2,
                      inputBorderRightStyle2:obj[index].styles.inputBorderRightStyle2,
                      inputBorderRightWidth2:obj[index].styles.inputBorderRightWidth2,
                      inputBorderRightColor2:obj[index].styles.inputBorderRightColor2,
                      inputBorderBottomStyle2:obj[index].styles.inputBorderBottomStyle2,
                      inputBorderBottomWidth2:obj[index].styles.inputBorderBottomWidth2,
                      inputBorderBottomColor2:obj[index].styles.inputBorderBottomColor2,
                      inputBorderLeftStyle2:obj[index].styles.inputBorderLeftStyle2,
                      inputBorderLeftWidth2:obj[index].styles.inputBorderLeftWidth2,
                      inputBorderLeftColor2:obj[index].styles.inputBorderLeftColor2,
                      yzmImgWidth:obj[index].styles.yzmImgWidth,
                      yzmImgHeight:obj[index].styles.yzmImgHeight,
                      yzmImgTop:obj[index].styles.yzmImgTop,
                      yzmImgRight:obj[index].styles.yzmImgRight,
                      yzmImgBottom:obj[index].styles.yzmImgBottom,
                      yzmImgLeft:obj[index].styles.yzmImgLeft,
                      yzmAFs:obj[index].styles.yzmAFs,
                      yzmAColor:obj[index].styles.yzmAColor,
                      yzmATop:obj[index].styles.yzmATop,
                      xingLeft:obj[index].styles.xingLeft,
                      xingTop:obj[index].styles.xingTop,
                      xingFS:obj[index].styles.xingFS,
                      xingColor:obj[index].styles.xingColor,
                      xingDisplay:obj[index].styles.xingDisplay,
                      iconClassName:obj[index].styles.iconClassName,
                      iconLeft:obj[index].styles.iconLeft,
                      iconTop:obj[index].styles.iconTop,
                      iconFS:obj[index].styles.iconFS,
                      iconColor:obj[index].styles.iconColor,
                      iconDisplay:obj[index].styles.iconDisplay,
                      doubleBtnImg1:obj[index].styles.doubleBtnImg1,
                      doubleBtnImg2:obj[index].styles.doubleBtnImg2,
                      selfInputColor:obj[index].styles.selfInputColor,
                      selfTextareaColor:obj[index].styles.selfTextareaColor,
                      selfYzmColor:obj[index].styles.selfYzmColor,
                      textreaTopPadging:obj[index].styles.textreaTopPadging,
                  }
              }else{
                  obj[index].styles = {
                      width: ((obj[index].styles && obj[index].styles.width) || 300),
                      height:((obj[index].styles && obj[index].styles.height) || 60),
                      backgroundColor:_this.randomColor(),
                      left:((obj[index].styles && obj[index].styles.left) || 30),
                      top:((obj[index].styles && obj[index].styles.top) || 30),
                      color:"#fff",
                      rowBorderTopStyle:'solid',
                      rowBorderTopWidth:0,
                      rowBorderTopColor:'#000',
                      rowBorderRightStyle:'solid',
                      rowBorderRightWidth:0,
                      rowBorderRightColor:'#000',
                      rowBorderBottomStyle:'solid',
                      rowBorderBottomWidth:0,
                      rowBorderBottomColor:'#000',
                      rowBorderLeftStyle:'solid',
                      rowBorderLeftWidth:0,
                      rowBorderLeftColor:'#000',
                      titleWidth:80,
                      titleHeight:40,
                      titleLineHeight:40,
                      titleLeft:0, 
                      titleRight:0,
                      titleTop:0,
                      titleFs:14,
                      titleFontWeight:'normal',
                      titleTextAlign:'center',
                      titleDisplay:'block',
                      titleBackgroundColor:'#fff', 
                      titleColor:'#000',
                      inputWidth:80,
                      inputHeight:40,
                      inputPaddingLeft:0,
                      inputTop:0,
                      inputBorderRadius:0,
                      inputBC:"#fff",
                      inputBorderTopStyle:'solid',
                      inputBorderTopWidth:1,
                      inputBorderTopColor:'#000',
                      inputBorderRightStyle:'solid',
                      inputBorderRightWidth:1,
                      inputBorderRightColor:'#000',
                      inputBorderBottomStyle:'solid',
                      inputBorderBottomWidth:1,
                      inputBorderBottomColor:'#000',
                      inputBorderLeftStyle:'solid',
                      inputBorderLeftWidth:1,
                      inputBorderLeftColor:'#000',
                      selfInputWidth:80,
                      selfInputHeight:40,
                      selfInputPaddingLeft:0,
                      selfInputTop:0,
                      selfInputBorderRadius:0,
                      selfInputBC:"#fff",
                      selfInputBorderTopStyle:'solid',
                      selfInputBorderTopWidth:1,
                      selfInputBorderTopColor:'#000',
                      selfInputBorderRightStyle:'solid',
                      selfInputBorderRightWidth:1,
                      selfInputBorderRightColor:'#000',
                      selfInputBorderBottomStyle:'solid',
                      selfInputBorderBottomWidth:1,
                      selfInputBorderBottomColor:'#000',
                      selfInputBorderLeftStyle:'solid',
                      selfInputBorderLeftWidth:1,
                      selfInputBorderLeftColor:'#000',
                      selectColor:'#000',
                      selectFontWeight:'normal',
                      selectPaddingTop:0,
                      selectFS:14,
                      checkboxDistance:0,
                      inputWidth2:80,
                      inputHeight2:40,
                      inputPaddingLeft2:0,
                      selectPaddingTop2:0,
                      selectFS2:14,
                      inputBorderRadius2:0,
                      selectColor2:"#fff",
                      inputBC2:"#000",
                      inputBorderTopStyle2:'solid',
                      inputBorderTopWidth2:1,
                      inputBorderTopColor2:'#000',
                      inputBorderRightStyle2:'solid',
                      inputBorderRightWidth2:1,
                      inputBorderRightColor2:'#000',
                      inputBorderBottomStyle2:'solid',
                      inputBorderBottomWidth2:1,
                      inputBorderBottomColor2:'#000',
                      inputBorderLeftStyle2:'solid',
                      inputBorderLeftWidth2:1,
                      inputBorderLeftColor2:'#000',
                      yzmImgWidth:50,
                      yzmImgHeight:22,
                      yzmImgTop:0,
                      yzmImgRight:0,
                      yzmImgBottom:0,
                      yzmImgLeft:0,
                      yzmAFs:14,
                      yzmAColor:"#000",
                      yzmATop:0,
                      xingLeft:0,
                      xingTop:0,
                      xingFS:14,
                      xingColor:"#f00",
                      xingDisplay:"block",
                      iconClassName:"",
                      iconLeft:0,
                      iconTop:0,
                      iconFS:14,
                      iconColor:"#f00",
                      iconDisplay:"block",
                      doubleBtnImg1:"",
                      doubleBtnImg2:"",
                      selfInputColor:"#000",
                      selfTextareaColor:"#000",
                      selfYzmColor:"#000",
                      textreaTopPadging:0,
                  }
              }
          });
          // console.log('遍历结束',obj);
          this.ziduan(obj);
          return obj;
      },
      ziduan:function(obj){
          // 就是将表单选中的字段 遍历增加一个样式键styles
          // 所选中表单的字段
          var that = this;
          that.infor.form_ziduan_arr.length = 0;
          
          var listArr = [];
          Vue.nextTick(function () {
              for (var i = 0; i < Object.keys(obj).length; i++) {
                  listArr.push({
                      name:that.infor.form_select_datas[i].inputName,
                      id:that.infor.form_select_datas[i].field,
                      styles:that.infor.form_select_datas[i].styles
                  })
              }
              that.infor.form_ziduan_arr = listArr;
          });
      },
      // 初始化数据
      init:function(){
          var _this = this;
          // 获取表单数据
          $.ajax({
            type: "POST",
        //     url:`${this.$store.state.domain}/index_pc.php/newapi/form/getlist`,
            url:`/index_pc.php/newapi/form/getlist`,
            success(msg){
                  // 所有后台表单数据
                  msg = msg.data;
                  _this.form_all_datas = msg;

                  msg = msg;

                  if ( Object.keys(msg).length <= 0) {
                      alert('后台表单为空，请前往后台添加');
                      return;
                  }
                  
                  // 具体的表单 默认选择第一个表单 排在第一位的
                  var items = msg[0]._fields;
                  // _this.infor.form_select_datas = JSON.parse(items);

                  // 为选择的表单 添加一个键 为样式的像 
                  _this.infor.form_select_datas = _this.createDatas(_this.infor.form_select_datas);
                    
                  // console.log('所有后台表单数据',msg);
                  // console.log('具体的表单',msg[0].id);
                  // 表单id
                  if (_this.infor.formID == 0 || _this.infor.formID == msg[0].id) {
                      _this.infor.formID = msg[0].id;
                  }

                  // 初始化title
                  if (_this.title_datas.length > 0) {
                      _this.title_datas = [];
                  }

                  // 新版的select中option数据结构 与老版本的不同
                  // videoStyle:[
                  //   {value: 'mp', label: 'mp4'},
                  //   {value: 'flash', label: 'flash'}
                  // ]
                  for (var i = 0; i < Object.keys(msg).length; i++) {
                      // _this.title_datas.push(msg[i].title);
                      _this.title_datas.push({"value": msg[i].id, "label": msg[i].title});
                  }
                  
                  // 初始化表单选择 默认第一项
                  if (!_this.infor.form_title) {
                      _this.infor.form_title = msg[0].title;
                      _this.selectFormID( _this.infor.form_title);
                  }
                  _this.$nextTick(() => {
                        this.isFirst = true
                  })

            },
            error(err){
              console.log('获取表单数据失败');
                _this.$nextTick(() => {
                this.isFirst = true
                })
            }
          });
      },
      foramtPos(){
        let datas = this.infor.form_select_datas;

        // 将选择的表单的数据的位置进行初始化 不让其都重叠在一起
        // 每个的    宽:200    高:40 
        // 默认的    总宽:690  高:400
        // 每行  放2个
        for(let item in datas){
          
          let colmuns = item % 2; //  colmuns 所在的列
          let rows = Math.floor( item / 2); //  rows 所在的行
          datas[item].styles.left =  340 * colmuns || 20;
          datas[item].styles.top = 80 * rows || 10;

          // 验证码
          if(datas[item].fieldtype === 'yzm'){
            datas[item].styles.width =  340 ;
          }
        }

        this.infor.form_select_datas = datas;
        // 字段太多 保持一致
        this.infor.form_all_height = Math.ceil(Object.keys(datas).length / 2) * 80;

      }
    },
    created(){
        this.infor.form_title = this.infor.form_title;
    },
    mounted(){
      this.init();
    }
}

</script>

<style lang="scss" scoped>

ul#edit-form-ul{
  width:60%;
  margin: 0 auto;
  li{
    display: inline-block;
    margin-right: 12px;
    margin-top: 12px;
  }
}
</style>