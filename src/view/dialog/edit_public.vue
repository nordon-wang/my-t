<template>
    <div id="edit_public" v-if="isShow">
        <div class="edit_public_title">
            <i class="el-icon-menu"></i>
            <span>{{editTitle}}</span>
            <i class="el-icon-circle-close-outline close" @click="closeModel"></i>
        </div>
        
        <!-- 链接编辑 -->
        <!-- <div  v-if="editType == 'basic_links_model'" class="custom_edit_con">
          <basic-links-edit>
          </basic-links-edit>
        </div> -->

        <!-- 表单编辑 -->
        <!-- <div  v-if="editType == 'basic_nleavemessage_model'" class="custom_edit_con">
          <basic-nleavemessage-edit>
          </basic-nleavemessage-edit>
        </div> -->

        <div class="edit_public_title edit_public_btn">
          <el-button type="primary" size="mini" @click="closeModel">确定</el-button>
          <el-button type="warning" size="mini" @click="cancelModel">取消</el-button>
        </div>
    </div>
</template>

<script>
import basicLinksEdit from '../../widgets/basic_links/editmoudle';
import basicNleavemessageEdit from '../../widgets/basic_nleavemessage/editmoudle';
import basicCustomEdit from '../../widgets/basic_customedit/editmodule';

export default {
  name: "edit_public",
  data() {
    return {
      editType:'',
      editTitle:'title',
      initCon: "",
      isShow: false,
      contents: "123"
    };
  },
  props:{
    num1:{
      type:Number,
      default:1
    }
  },
  watch: {
    //监听当前选中的挂件,从而决定不同的编辑渲染
    "$store.state.show_my_dodel": function(val) {
      let shows = this.$store.state.module_name;
      
      if(shows == "basic_links_model"){
        this.isShow = true;
        this.editType = 'basic_links_model';
        this.editTitle = '链接编辑';
      }
      else if(shows == "basic_nleavemessage_model"){
        this.isShow = true;
        this.editType = 'basic_nleavemessage_model';
        this.editTitle = '表单编辑';
      }
      else {
        this.isShow = false;
      }
    }
  },
  methods: {
    closeModel(){
      this.templet.p_bottomBar_close();
    },
    cancelModel() {
      this.templet.p_bottomBar_close();
    }
  },
  components:{
    basicLinksEdit,
    basicNleavemessageEdit,
    basicCustomEdit
  },
  mounted() {
    $("#edit_public").draggable({ handle: "div.edit_public_title" });
  },
  updated(){
    // 绑定拖拽若是放在mounted会导致拖拽绑定不上去 因为使用的v-if，若是使用v-show则没有问题
    $("#edit_public").draggable({ handle: "div.edit_public_title" });
  }
};
</script>

<style scoped>
#edit_public {
  width: 700px;
  height: 600px;
  position: fixed;
  background-color: #fff;
  left: 40%;
  top: 10%;
  z-index: 1999;
}

div.edit_public_title {
  width: 100%;
  height: 42px;
  background-color: #5874d8;
  cursor: move;
  padding-left: 12px;
}
div.edit_public_title i {
  font-size: 20px;
  line-height: 42px;
  color: #fff;
  float: left;
}
div.edit_public_title span {
  font-size: 16px;
  color: #fff;
  float: left;
  height: 42px;
  line-height: 42px;
  margin-left: 12px;
}
div.edit_public_title i.close {
  float: right;
  margin-right: 12px;
  cursor: pointer;
}

div.edit_public_btn {
  background-color: #e5e5e5;
  display: flex;
  justify-content: flex-end;
  padding: 4px;
  padding-right: 12px;
  position: absolute;
  bottom: 0;
}

div.custom_edit_con {
  height: 530px;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  padding-bottom: 40px;
}
</style>
