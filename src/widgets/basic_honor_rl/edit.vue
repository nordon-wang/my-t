<template>
  <div class="honor_edit_rl honor_edit">

    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">

      <!--<span @click="$store.state.styleSave_IsOpen = true">样式保存</span>-->
        <span class="mouseClass"
              data-Highlight=""
                @click="column_dialog"
        >列表设置</span>

      <span
              @click="templet.p_select_parts('honor_box')"
              class="mouseClass"
              data-Highlight="honor_box"
              :class="[
           $store.state.hover_parts == 'honor_box'  ? 'index_Highlight' : ''
           ]"
      >容器设置</span>


      <span
              @click="templet.p_select_parts('honor_title')"
              class="mouseClass"
              data-Highlight="honor_title"
              :class="[
           $store.state.hover_parts == 'honor_title'  ? 'index_Highlight' : ''
           ]"
      >标题设置</span>
      <span
              @click="templet.p_select_parts('honor_pic_box')"
              class="mouseClass"
              data-Highlight="honor_pic_box"
              :class="[
           $store.state.hover_parts == 'honor_pic_box'  ? 'index_Highlight' : ''
           ]"
      >图片容器</span>

      <span
              @click="templet.p_select_parts('honor_tab_box')"
              class="mouseClass"
              data-Highlight="honor_tab_box"
              :class="[
           $store.state.hover_parts == 'honor_tab_box'  ? 'index_Highlight' : ''
           ]"
      >选项容器</span>

      <span
              @click="templet.p_select_parts('honor_tab_one')"
              class="mouseClass"
              data-Highlight="honor_tab_one"
              :class="[
           $store.state.hover_parts == 'honor_tab_one'  ? 'index_Highlight' : ''
           ]"
      >选项设置</span>

    </div>

    <div class="honor_box btm_4cols" v-if="$store.state.parts == 'honor_box'">
      <div class="setOne">
        <my-number v-model="infor.box.width" title="整体宽度"></my-number>
        <my-number v-model="infor.box.height" title="整体高度"></my-number>
        <my-color v-model="infor.box.background" title="背景颜色"></my-color>
      </div>
      <div class="setOne">
        <my-number v-model="infor.box.padding" title="内边距"></my-number>
        <my-color v-model="infor.box.borderColor" title="边框颜色"></my-color>
        <my-select v-model="infor.box.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
      </div>

      <div class="setOne">
        <my-number v-model="infor.box.borderLeftWidth" title="左边框宽度"></my-number>
        <my-number v-model="infor.box.borderRightWidth" title="右边框宽度"></my-number>
        <my-number v-model="infor.box.borderTopWidth" title="上边框宽度"></my-number>
        <my-number v-model="infor.box.borderBottomWidth" title="下边框宽度"></my-number>
      </div>

    </div>

    <div class="honor_title btm_4cols" v-if="$store.state.parts == 'honor_title'">
      <div class="setOne">
        <my-input v-model="listArr.header.content" title="标题"></my-input>
        <my-number v-model="infor.header.width" title="标题宽度"></my-number>
        <my-number v-model="infor.header.height" title="标题高度"></my-number>
        <my-color v-model="infor.header.color" title="文字颜色"></my-color>
      </div>
      <div class="setOne">
        <my-number v-model="infor.header.fontSize" title="文字大小" :min="12"></my-number>
        <my-color v-model="infor.header.background" title="背景颜色"></my-color>
        <my-select v-model="infor.header.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
      </div>
    </div>

    <div class="honor_pic_box btm_4cols" v-if="$store.state.parts == 'honor_pic_box'">
      <div class="setOne">
        <my-number v-model="infor.imgFrame.width" title="宽度"></my-number>
        <my-number v-model="infor.imgFrame.height" title="高度"></my-number>
        <my-color v-model="infor.imgFrame.background" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-select v-model="infor.imgFrame.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
        <my-color v-model="infor.imgFrame.borderColor" title="边框颜色"></my-color>
      </div>

      <div class="setOne">
        <my-number v-model="infor.imgFrame.borderLeftWidth" title="左边框宽"></my-number>
        <my-number v-model="infor.imgFrame.borderRightWidth" title="右边框宽"></my-number>
        <my-number v-model="infor.imgFrame.borderTopWidth" title="上边框宽"></my-number>
        <my-number v-model="infor.imgFrame.borderBottomWidth" title="下边框宽"></my-number>
      </div>
      <div class="setOne">
        <my-number v-model="infor.imgFrame.padding" title="内边距"></my-number>
        <my-number v-model="infor.imgFrame.marginRight" title="右外边距"></my-number>
      </div>
    </div>

    <div class="honor_tab_box btm_4cols" v-if="$store.state.parts == 'honor_tab_box'">
      <div class="setOne">
        <my-number v-model="infor.tabFrame.width" title="宽度"></my-number>
        <my-number v-model="infor.tabFrame.height" title="高度"></my-number>
        <my-color v-model="infor.tabFrame.background" title="背景颜色"></my-color>
      </div>

      <div class="setOne">
        <my-color v-model="infor.tabFrame.borderColor" title="边框颜色"></my-color>
        <my-number v-model="infor.tabFrame.padding" title="内边距"></my-number>
        <my-select v-model="infor.tabFrame.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
      </div>

      <div class="setOne">
        <my-number v-model="infor.tabFrame.borderLeftWidth" title="左边框宽"></my-number>
        <my-number v-model="infor.tabFrame.borderRightWidth" title="右边框宽"></my-number>
        <my-number v-model="infor.tabFrame.borderTopWidth" title="上边框宽"></my-number>
        <my-number v-model="infor.tabFrame.borderBottomWidth" title="下边框宽"></my-number>
      </div>

    </div>

    <div class="honor_tab_one" v-if="$store.state.parts == 'honor_tab_one'">
      <el-tabs type="border-card">
        <el-tab-pane label="默认状态">
          <div class="setOne">
            <my-number v-model="infor.one.borderLeftWidth" title="左边框宽"></my-number>
            <my-number v-model="infor.one.borderRightWidth" title="右边框宽"></my-number>
            <my-number v-model="infor.one.borderTopWidth" title="上边框宽"></my-number>
            <my-number v-model="infor.one.borderBottomWidth" title="下边框宽"></my-number>
            <my-color v-model="infor.one.borderColor" title="边框颜色"></my-color>
          </div>

          <div class="setOne">
            <my-select v-model="infor.one.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
            <my-color v-model="infor.one.background" title="背景颜色"></my-color>
            <my-number v-model="infor.one.padding" title="内边距"></my-number>
            <my-number v-model="infor.one.margin" title="外边距"></my-number>
            <my-number v-model="infor.one.lineHeight" title="文字行高"></my-number>
          </div>

          <div class="setOne">
            <my-number v-model="infor.one.width" title="宽度"></my-number>
            <my-number v-model="infor.one.height" title="高度"></my-number>
            <my-select v-model="infor.one.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
            <my-color v-model="infor.one.color" title="文字颜色"></my-color>
            <my-number v-model="infor.one.fontSize" title="文字大小"></my-number>
          </div>

        </el-tab-pane>

        <el-tab-pane label="选中状态">

          <div class="setOne">
            <my-number v-model="infor.selectOne.borderLeftWidth" title="左边框宽"></my-number>
            <my-number v-model="infor.selectOne.borderRightWidth" title="右边框宽"></my-number>
            <my-number v-model="infor.selectOne.borderTopWidth" title="上边框宽"></my-number>
            <my-number v-model="infor.selectOne.borderBottomWidth" title="下边框宽"></my-number>
            <my-color v-model="infor.selectOne.borderColor" title="边框颜色"></my-color>
          </div>

          <div class="setOne">
            <my-select v-model="infor.selectOne.borderStyle" :option="$store.state.options.borderStyle" title="边框类型" ></my-select>
            <my-color v-model="infor.selectOne.background" title="背景颜色"></my-color>
            <my-number v-model="infor.selectOne.padding" title="内边距"></my-number>
            <my-number v-model="infor.selectOne.margin" title="外边距"></my-number>
            <my-number v-model="infor.selectOne.lineHeight" title="文字行高"></my-number>
          </div>

          <div class="setOne">
            <my-number v-model="infor.selectOne.width" title="宽度"></my-number>
            <my-number v-model="infor.selectOne.height" title="高度"></my-number>
            <my-select v-model="infor.selectOne.textAlign" :option="$store.state.options.textAlign" title="文字对齐" ></my-select>
            <my-color v-model="infor.selectOne.color" title="文字颜色"></my-color>
            <my-number v-model="infor.selectOne.fontSize" title="文字大小" :min="12"></my-number>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>



    <div class="honor_list" v-if="list_set">
      <el-dialog
        title="列表设置"
        :visible="true"
        :modal-append-to-body="false"
        :before-close="handleClose">
        <div style="height:390px;">
          <h5 class="title">
            列表管理
            <el-button type="primary" size="small" @click="AddList">添加列表</el-button>
          </h5>
          <ul class="honorList honorList_rl">
            <li v-for="(val,i) in listArr.listArr">
              <img :src="val.src">
              <p>
                <b v-text="val.title"></b>
                <strong style="color: #999">荣誉列表无法设置内容</strong>

              </p>
              <div class="honor_btn">
                <el-button size="small" @click="listEditBtn(i)">编辑</el-button>
                <el-button size="small" @click="listDelBtn(i)">删除</el-button>
              </div>
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>

    <div class="listEdit_frame" v-if="editOne">
      <el-dialog
        title="列表编辑"
        :visible="true"
        :modal-append-to-body="false"
        :before-close="listEdit_Close">
        <div class="listEdit">
          <p>
            <b><img :src="oneEdit.src"></b>
            <el-button size="small" @click="editSelePic" type="primary">选择图片</el-button>
          </p>
          <input type="text" placeholder="此处填写标题" v-model="oneEdit.title">
          <textarea placeholder="荣誉列表无法设置内容" disabled></textarea>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="listEdit_Close">取 消</el-button>
          <el-button type="primary" @click="editOneOk">确 定</el-button>
        </span>
      </el-dialog>
    </div>




  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'basic_honor_edit',
    props:{

    },
    data () {
      return {
        infor:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.infor)),
        listArr:JSON.parse(JSON.stringify(this.$store.state.module_Data.data.listArr)),
        list_set:false,
        oneEdit:{
          index:'',
          src: '',
          title:'',
          content:''
        },
        editOne:false,

      }
    },
    watch:{
      infor:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'infor',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑荣誉列表组件');
        },
        deep: true
      },
      listArr:{
        handler: function (val, oldVal) {
          this.templet.p_editModule({
            key:'listArr',
            val:JSON.parse(JSON.stringify(val))
          });
            this.templet.module_add_historical('编辑荣誉列表组件');
        },
        deep: true
      },
      list_set(val){
        if(val){
          this.$nextTick(()=>{
            this.list_sort();
          });

        }
      }
    },
    created(){

    },
    components:{

    },
    methods:{
        AddList:function () {
            var obj = {
                src: 'static/image/pic.png',
                title:'默认数据标题',
                content:'默认数据内容'
            };
            this.listArr.listArr.unshift(obj);
        },
      column_dialog(){
        this.list_set = true;

      },
      handleClose(){
        this.list_set = false;
      },
      //列表编辑
      listEditBtn: function(i) {
        this.editOne = true;
        this.oneEdit.index = i;
        this.oneEdit.src = this.listArr.listArr[i].src;
        this.oneEdit.title = this.listArr.listArr[i].title;
        this.oneEdit.content = this.listArr.listArr[i].content;
      },
      //列表删除
      listDelBtn: function(i) {
        this.listArr.listArr.splice(i, 1);
      },
      //确定编辑
      editOneOk: function() {
        //取出换行和双引号
        var titleStr = this.oneEdit.title.replace(/\r\n/g,'').replace(/\"/g,'“').replace(/\'/g,'‘');
        var contentStr = this.oneEdit.content.replace(/\r\n/g,'').replace(/\"/g,'“').replace(/\'/g,'‘');

        this.listArr.listArr[this.oneEdit.index].src = this.oneEdit.src;
        this.listArr.listArr[this.oneEdit.index].title = titleStr;
        this.listArr.listArr[this.oneEdit.index].content = contentStr;
        this.editOne = false;
      },

      editSelePic: function() {
        const that = this;
        this.$store.state.showPicCon = true;
        this.$store.state.imgUrls = function (val) {
          that.oneEdit.src = val.src;
        };
      },
      listEdit_Close(){
        this.editOne = false;
        this.oneEdit.index = '';
        this.oneEdit.src = '';
        this.oneEdit.title = '';
        this.oneEdit.content = '';
      },

      list_sort(){
        const that = this;
        //左边列表-列表排序
        $('.honorList_rl').sortable({
          placeholder: "listSort",
          stop: function(event, ui) {
            var num = $(this).children('li').length;
            var list = [];

            for (var i = 0; i < num; i++) {
              var one = {
                src: $(this).children('li').eq(i).find('img').attr('src'),
                title: $(this).children('li').eq(i).find('b').text(),
                content: $(this).children('li').eq(i).find('strong').text()
              }
              list.push(one);
            }

            that.listArr.listArr = [];
            that.$nextTick(()=>{
              that.listArr.listArr = list;
            })
          },

        });
      }

    },

    mounted(){


    }
  }
</script>
