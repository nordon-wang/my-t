<template>
  <div class="right_sidebar" :class="$store.state.right_sidebar_isShow ? 'right_sidebar_open' : ''">
    <div class="myLayer">
      <div class="myHeader">
        图层设置
        <i class="el-icon-circle-close-outline right_sidebar_close" @click="right_sidebar_close"></i>
      </div>
      <div id="module-location">
        <my-tooltip content="垂直上对齐" dir="down">
          <span @click="verticalTop"></span>
        </my-tooltip>
        <my-tooltip content="垂直居中" dir="down">
          <span @click="verticalCenter"></span>
        </my-tooltip>
        <my-tooltip content="垂直下对齐" dir="down">
          <span @click="verticalBtm"></span>
        </my-tooltip>
        <my-tooltip content="水平左对齐" dir="down">
          <span @click="alignTop"></span>
        </my-tooltip>
        <my-tooltip content="水平居中" dir="down">
          <span @click="alignCenter"></span>
        </my-tooltip>
        <my-tooltip content="水平右对齐" dir="down">
          <span @click="alignBtm"></span>
        </my-tooltip>
      </div>
      <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane label="头部" name="header">
          <Layer type="header"></Layer>
        </el-tab-pane>
        <el-tab-pane label="中部" name="body">
          <Layer type="body"></Layer>
        </el-tab-pane>
        <el-tab-pane label="底部" name="footer">
          <Layer type="footer"></Layer>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Layer from "../public/layer";
export default {
  name: "right_sidebar",
  data() {
    return {
      selectId: "",
      isShow: true
    };
  },
  computed: {
    activeName: {
      get: function() {
        if (this.$store.state.select_module.jsonArr.length > 0) {
          return this.$store.state.select_module.jsonArr[0].rowType;
        } else {
          return "body";
        }
      },
      set: function() {}
    }
  },
  methods: {
    right_sidebar_close() {
      this.$store.state.right_sidebar_isShow = false;

    },
    getInfor(){
      // 需要 type pid id
      // 获取 rowtype rowIndex moduleIndex
      // const val = this.$store.state.module_checked;
      const val = this.$store.state.select_module.jsonArr[0];

      if(this.$store.state.select_module.jsonArr.length > 1){
        this.$message({
          message: '选择多个挂件编辑时、只对第一个有效果',
          type: 'warning'
        });
      }

      if(!val){
        this.$message({
          message: '请选择挂件，在进行操作',
          type: 'warning'
        });
        return {};
      }

      const type = val.rowType
      const id = val.id;
      const pid = val.pid;

      let IndexObj = this.templet.p_find_moduleIndex({
        pid,
        type,
        id
      });

      let rowIndex = IndexObj.row;
      let moduleIndex = IndexObj.module;
      let rowtype = type;

      if($(`#u${id}`).css('position') == 'fixed'){
        this.$message({
          message: '绝对定位的组件，禁止使用此功能，进行对齐',
          type: 'warning'
        });
        return {};
      }

      return {
        rowIndex,
        moduleIndex,
        rowtype,
        id
      }
    },
    verticalTop(){
      const {rowIndex,moduleIndex,rowtype,id} = this.getInfor();
      
      if(!rowIndex && !moduleIndex && !rowtype){
        return ;
      }
      
      this.$store.state[rowtype][rowIndex].children[moduleIndex].data.css.module_top = 0

      this.$nextTick(() => {
        this.templet.module_scroll(id);
      })
      
      const module_name = this.$store.state[rowtype][rowIndex].children[moduleIndex].name;
      const md_name = this.templet.p_nameToChinese(module_name)

      this.templet.module_add_historical(`${md_name}垂直上对齐`);
    },
    verticalCenter(){

      const {rowIndex,moduleIndex,rowtype,id} = this.getInfor();
      
      if(!rowIndex && !moduleIndex && !rowtype){
        return ;
      }

      // row的高度
      let _rowHeight = this.$store.state[rowtype][rowIndex].data.infor.module_height
      // module 高 id
      let _muduleId = this.$store.state[rowtype][rowIndex].children[moduleIndex].widgets_id
      let _moduleHeight = $(`#u${_muduleId}`).outerHeight()

      
      this.$store.state[rowtype][rowIndex].children[moduleIndex].data.css.module_top = parseInt((_rowHeight - _moduleHeight) / 2)

      this.$nextTick(() => {
        this.templet.module_scroll(id);
      })
      
      const module_name = this.$store.state[rowtype][rowIndex].children[moduleIndex].name;
      const md_name = this.templet.p_nameToChinese(module_name)

      this.templet.module_add_historical(`${md_name}垂直居中`);
    },
    verticalBtm(){

      const {rowIndex,moduleIndex,rowtype,id} = this.getInfor();
      
      if(!rowIndex && !moduleIndex && !rowtype){
        return ;
      }

      // row的高度
      let _rowHeight = this.$store.state[rowtype][rowIndex].data.infor.module_height
      // module 高 id
      let _muduleId = this.$store.state[rowtype][rowIndex].children[moduleIndex].widgets_id
      let _moduleHeight = $(`#u${_muduleId}`).outerHeight()

      this.$store.state[rowtype][rowIndex].children[moduleIndex].data.css.module_top = _rowHeight - _moduleHeight

      this.$nextTick(() => {
        this.templet.module_scroll(id);
      })
      const module_name = this.$store.state[rowtype][rowIndex].children[moduleIndex].name;
      const md_name = this.templet.p_nameToChinese(module_name)

      this.templet.module_add_historical(`${md_name}垂直下对齐`);
    },
    alignTop(){

      const {rowIndex,moduleIndex,rowtype,id} = this.getInfor();
      
      if(!rowIndex && !moduleIndex && !rowtype){
        return ;
      }
      
      this.$store.state[rowtype][rowIndex].children[moduleIndex].data.css.module_left = 0

      this.$nextTick(() => {
        this.templet.module_scroll(id);
      })
      const module_name = this.$store.state[rowtype][rowIndex].children[moduleIndex].name;
      const md_name = this.templet.p_nameToChinese(module_name)

      this.templet.module_add_historical(`${md_name}水平左对齐`);
    },
    alignCenter(){

      const {rowIndex,moduleIndex,rowtype,id} = this.getInfor();
      
      if(!rowIndex && !moduleIndex && !rowtype){
        return ;
      }
      
      // row的宽度
      let _rowWidth = this.$store.state[rowtype][rowIndex].data.infor.module_width
      // module 宽 id
      let _muduleId = this.$store.state[rowtype][rowIndex].children[moduleIndex].widgets_id
      let _moduleWidth = $(`#u${_muduleId}`).outerWidth()


      this.$store.state[rowtype][rowIndex].children[moduleIndex].data.css.module_left = parseInt((_rowWidth - _moduleWidth) / 2)

      this.$nextTick(() => {
        this.templet.module_scroll(id);
      })
      const module_name = this.$store.state[rowtype][rowIndex].children[moduleIndex].name;
      const md_name = this.templet.p_nameToChinese(module_name)

      this.templet.module_add_historical(`${md_name}水平居中`);
    },
    alignBtm(){

      const {rowIndex,moduleIndex,rowtype,id} = this.getInfor();
      
      if(!rowIndex && !moduleIndex && !rowtype){
        return ;
      }
      
      // row的宽度
      let _rowWidth = this.$store.state[rowtype][rowIndex].data.infor.module_width
      // module 宽 id
      let _muduleId = this.$store.state[rowtype][rowIndex].children[moduleIndex].widgets_id
      let _moduleWidth = $(`#u${_muduleId}`).outerWidth()

      this.$store.state[rowtype][rowIndex].children[moduleIndex].data.css.module_left = _rowWidth - _moduleWidth

      this.$nextTick(() => {
        this.templet.module_scroll(id);
      })
      const module_name = this.$store.state[rowtype][rowIndex].children[moduleIndex].name;
      const md_name = this.templet.p_nameToChinese(module_name)

      this.templet.module_add_historical(`${md_name}水平右对齐`);
    }
  },
  filters: {
    rename(val, methods) {
      const str = methods(val);
      if (str) {
        return str;
      } else {
        return val;
      }
    }
  },
  components: {
    Layer
  },
  created() {},
  mounted() {
    //console.log(this.$store.state.select_module.jsonArr[0].rowType)
    const that = this;
    this.$nextTick(() => {
      this.templet.p_row_sortable(
        "right_sidebar_parent_body",
        "body",
        ".right_sidebar_parent_handle",
        "right_sidebar_parent_placeholder"
      );
      this.templet.p_row_sortable(
        "right_sidebar_parent_header",
        "header",
        ".right_sidebar_parent_handle",
        "right_sidebar_parent_placeholder"
      );
      this.templet.p_row_sortable(
        "right_sidebar_parent_footer",
        "footer",
        ".right_sidebar_parent_handle",
        "right_sidebar_parent_placeholder"
      );
    });
  }
};
</script>

<style lang="scss" scoped type="text/css">

  div#module-location{
    height: 30px;
    background-color: #535353;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 2px;
      cursor: pointer;
      background-repeat: no-repeat;
      background-position: center;
    }
    span:hover{
      border: solid 1px gray;
    }
    .my-tooltip:nth-of-type(1) span{
      background-image: url(~@/assets/img/sitebj_29.png);
    }
    .my-tooltip:nth-of-type(2) span{
      background-image: url(~@/assets/img/sitebj_30.png);
    }
     .my-tooltip:nth-of-type(3) span{
      background-image: url(~@/assets/img/sitebj_31.png);
    }
     .my-tooltip:nth-of-type(4) span{
      background-image: url(~@/assets/img/sitebj_32.png);
    }
     .my-tooltip:nth-of-type(5) span{
      background-image: url(~@/assets/img/sitebj_33.png);
    }
     .my-tooltip:nth-of-type(6) span{
      background-image: url(~@/assets/img/sitebj_34.png);
    }
  }
</style>


