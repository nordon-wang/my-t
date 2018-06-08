<!--图层-->
<template>
  <div class="right_sidebar_layer">
    <ul class="one right_sidebar_parent" :class="'right_sidebar_parent_'+type">
      <li v-for="(val,i) in $store.state[type]" :data-id="val.widgets_id" :rowtype="val.rowType" :class="[
          selectId == val.widgets_id ? 'oneLi selectli' : 'oneLi',
          val.isShow ? '' : 'oneLiClose',
          $store.state.select_row ? $store.state.select_row.widgets_id == val.widgets_id ? 'select_parent' : '' : ''
          ]" @click.stop="selectRow(val)">
        <div class="line">
          <b :class="val.children.length > 0 ? val.isShow ? 'el-icon-minus':'el-icon-plus':'noChild'" @click.stop="oneLi_open(val)"></b>
          <span class="right_sidebar_parent_handle">{{val.name|rename(templet.p_nameToChinese)}}</span>
          <i class="el-icon-delete" @click.stop="parent_del(val)" title="删除"></i>
          <i class="el-icon-caret-top" @click.stop="up(val)" title="向上"></i>
          <i class="el-icon-caret-bottom" @click.stop="down(val)" title="向下"></i>

        </div>

        <ul class="two right_sidebar_child" @mousedown.stop>
          <!--twoli-->
          <li :class="selectId == childVal.widgets_id ? 'twoli selectli' : 'twoli'" :moduleid="'u'+childVal.widgets_id" :pid="childVal.pid" :rowtype="childVal.rowType" v-for="(childVal,childi) in val.children">
            <div class="line" :class="[
            childVal.isShow ? '' : 'moduleNoShow',
            $store.state.select_module.idArr.indexOf(childVal.widgets_id) > -1 ? 'sline' : '']" @click.stop="toScroll($event,childVal)">
              <b :class="childVal.isShow ? 'fa-eye' : 'fa-eye-slash'" @click.stop="child_show(childVal)"></b>
              <span class="right_sidebar_child_handle">{{childVal.name|rename(templet.p_nameToChinese)}}</span>
              <i class="el-icon-delete" @click.stop="childDel(childVal)" title="删除"></i>
              <i class="el-icon-edit" @click.stop="childEdit(childVal)" v-show="templet.no_bottom_edit().indexOf(childVal.name) == -1" title="编辑"></i>

            </div>

          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "right_sidebar",
  data() {
    return {
      selectId: "",
      isShow: true
    };
  },
  props: {
    type: {
      type: String,
      default: "body"
    }
  },
  methods: {

    //向下
    down: function(val) {
      const index = this.templet.p_find_rowIndex({
        id: val.widgets_id,
        type: val.rowType
      });
      const arrLength = this.$store.state[val.rowType].length;
      if (index == arrLength - 1) {
        this.$message.error("已经是最后一个了，无法向下了！");
        return;
      }
      const handle_row = this.$store.state[val.rowType].splice(index, 1)[0];
      this.$store.state[val.rowType].splice(index + 1, 0, handle_row);
        this.templet.module_add_historical('行容器排序');
    },

    //向上
    up: function(val) {
      //当前点击加好的row的index
      const index = this.templet.p_find_rowIndex({
        id: val.widgets_id,
        type: val.rowType
      });
      if (index == 0) {
        this.$message.error("已经是第一个了，无法向上了！");
        return;
      }
      const handle_row = this.$store.state[val.rowType].splice(index, 1)[0];
      this.$store.state[val.rowType].splice(index - 1, 0, handle_row);
        this.templet.module_add_historical('行容器排序');
    },

    //一级删除
    parent_del: function(val) {
      const num = this.$store.state[val.rowType].length;
      if (num <= 1) {
        this.$message.error("最后一个无法删除！");
        return;
      }

        this.$confirm(`确定删除当前容器?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            //当前点击加好的row的index
            const index = this.templet.p_find_rowIndex({
                id: val.widgets_id,
                type: val.rowType
            });
            this.$store.state[val.rowType].splice(index, 1);
            this.templet.module_add_historical('删除行容器');
        })


    },
    childDel: function(val) {
        this.$confirm(`确定删除当前组件?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            const pid = val.pid;
            const type = val.rowType;
            const id = val.widgets_id;
            const row_index = this.templet.p_find_moduleIndex({ pid, type, id }).row;
            const module_index = this.templet.p_find_moduleIndex({ pid, type, id }).module;
            const module_name = this.templet.p_nameToChinese(this.$store.state[type][row_index].children[module_index].name);

            this.templet.module_add_historical('删除'+module_name);

            this.$store.state[type][row_index].children.splice(module_index, 1);

        });


    },

    right_sidebar_close() {
      this.isShow = false;
    },
    oneLi_open(val) {
        val.isShow = !val.isShow;

        this.$nextTick(()=>{
            //如果点击的式头部容器
            if(val.rowType === 'header'){
                //强制滚动下浏览器，让顶部固定重新计算下
                const nowY = $(window).scrollTop();
                $(window).scrollTop(nowY-1)
            }
        })




    },
    childEdit(val) {

      const moduleName = val.name;
      const partsName = "";
      const id = val.widgets_id;
      const pid = val.pid;
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id,
        pid,
        type: this.type
      });

      this.templet.module_scroll(id);
      //this.$store.state.select_module_id = val.widgets_id;
    },
    child_show(val) {
      val.isShow = !val.isShow;
    },
    toScroll(e, val) {
      // module_checked
      if (e.ctrlKey) {
        //按住了ctrl
        this.templet.in_select_module(val.name,val.widgets_id, val.pid, val.rowType,val.data);
      } else {
        this.templet.module_scroll(val.widgets_id);
        this.templet.clear_select_module();
        this.templet.in_select_module(val.name,val.widgets_id, val.pid, val.rowType,val.data);
      }

      this.$store.state.module_checked = val;
      this.$store.state.module_checked_rowtype = this.type;
    },
    selectRow(val) {
      const row = JSON.parse(JSON.stringify(val));
      delete row.children;
      this.$store.state.select_row = row;
      this.templet.row_scroll(val.widgets_id);
    }
  },
  filters: {
    rename(val, methods) {
      let str = methods(val);

      // if(str == 'basic_gratext'){
      //   str = '单图文';
      // }

      if (str) {
        return str;
      } else {
        return val;
      }
    }
  },
  components: {},
  computed: {
    scrollViewID: {
      get: function() {
        if (this.$store.state.select_module.idArr.length > 0) {
          return this.$store.state.select_module.idArr[0];
        }
      },
      set: function() {}
    }
  },
  watch: {
    scrollViewID(val) {
      if (document.querySelector(".sline")) {
        document
          .querySelector(".sline")
          .scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  },
  created() {},
  mounted() {
    const that = this;
  }
};
</script>
<style>

</style>

