<template>
  <!--  v-if="myShow" -->
  <div id="edit_public" @dblclick.stop="mystop($event)">
    <div class="edit_public_title">
      <i class="el-icon-menu"></i>
      <span>{{editTitle}}</span>
      <i class="el-icon-circle-close-outline close" @click="closeModel"></i>
    </div>

    <!-- 内容.. -->
    <div style="cursor: default;background-color: #fff;">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="配置管理" name="first">
          <el-row style="height:40px;">
            <el-col :span="4" :style="{textAlign: 'center'}">
              <el-button type="primary" size="mini" v-on:click.stop="addRow">增加</el-button>
            </el-col>
            <el-col :span="16">
              <el-alert title="建议数量在1--20个,第一个链接可以独立设置样式,链接地址不可为空" type="info">
              </el-alert>
            </el-col>
          </el-row>
          <div style="height:400px;overflow-y:auto;">
            <el-row class="rows clearfix" v-for="(item,index) in infor.cityLists" :key="index" style="border-bottom: 1px solid #ccc;">
              <el-col :span="8">
                <P>
                  <b class="sliderB" style="width: 40px; margin-bottom: 12px;">标题</b>
                  <el-input v-model="item.title" placeholder="请输入标题" style="width: 150px;margin-bottom: 12px;"></el-input>
                </P>
                <P>
                  <b class="sliderB" style="width: 40px; margin-bottom: 12px;">链接</b>
                  <el-input v-model="item.href" placeholder="http://www.xxx.com" style="width: 150px; margin-bottom: 12px;"></el-input>
                </P>
                <P v-if="infor.links_styles == 0">
                  <b class="sliderB" style="width: 40px; margin-bottom: 12px;">提示</b>
                  <el-input v-model="item.imgalt" placeholder="请输入提示" style="width: 150px; margin-bottom: 12px;"></el-input>
                </P>
              </el-col>

              <el-col :span="7">
                <P>
                  <b class="sliderB" style="width: 40px;margin-bottom: 12px;">打开</b>
                  <el-select v-model="item.target" laceholder="请选择" style="width: 120px;margin-bottom: 12px;">
                    <el-option :label="'当前窗口'" :value="'_self'">
                    </el-option>
                    <el-option :label="'新窗口'" :value="'_blank'">
                    </el-option>
                  </el-select>
                </P>
                <P v-if="infor.links_styles == 0">
                  <b class="sliderB" style="width: 40px;margin-bottom: 12px;">图片</b>
                  <el-select v-model="item.isShowPics" placeholder="请选择" :class="item.isShowPics" style="width: 120px;margin-bottom: 12px;">
                    <el-option :label="'显示'" value="true">
                    </el-option>
                    <el-option :label="'隐藏'" value="false">
                    </el-option>
                  </el-select>
                </P>
                <p class="clearfix myicon">
                  <my-icon v-model="item.iconCLass" :title="item.title || '标题'"></my-icon>
                </p>
              </el-col>

              <el-col :span="7" >
                <my-img :class="'self-img_select'" v-if="infor.links_styles == 0" v-model="infor.cityLists[index].imgUrls" :title="'悬浮图片'"></my-img>
                <my-img :class="'self-img_select'" v-model="infor.cityLists[index].backgroundImage" :title="'默认背景'"></my-img>
                <my-img :class="'self-img_select'" v-model="infor.cityLists[index].backgroundImageHover" :title="'悬浮背景'"></my-img>
              </el-col>

              <el-col :span="2">
                <el-button :class="'self-buttom'" type="warning" size="mini" v-on:click="deleteRow(index)">删除行</el-button>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <!-- <el-tab-pane label="配置管理" name="second">
                    <div class="setOne">
                        <ul style="width:100%;">
                            <li v-for="(item,index) in infor.cityLists"
                            :key="index">
                            <my-icon v-model="infor.cityLists[index].iconCLass" :title="item.title"></my-icon>
                            </li>
                        </ul>
                    </div>
                </el-tab-pane> -->
      </el-tabs>
    </div>
    <!-- 内容.. -->

    <div class="edit_public_title edit_public_btn">
      <el-button type="primary" size="mini" @click="closeModel">确定</el-button>
      <!-- <el-button type="warning" size="mini" @click="cancelModel">取消</el-button> -->
    </div>

    <!-- <div id="selfmask"  @click="closeModel"></div> -->
  </div>
</template>

<script>
import style from './style'

export default {
  name: 'edit_module',
  data() {
    return {
      editTitle: '链接数据编辑',
      myShow: this.isShow,
      activeName2: 'first',
      infor: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.infor)
      ),
      listArr: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.listArr)
      ),
      animateObj: JSON.parse(
        JSON.stringify(this.$store.state.module_Data.data.animateObj)
      )
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'infor',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑链接组件')
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑链接组件')
      },
      deep: true
    }
  },
  methods: {
    mystop() {},
    closeModel() {
      this.$store.state.module_name = ''
      this.$store.state.parts = ''
      this.$store.state.module_Data = null
      this.$store.state.hover_parts = ''
      this.myShow = false
      this.$emit('closem')
      this.$store.state.showMyMask = false
      this.templet.Special_Mongolian_Close()
    },
    cancelModel() {
      this.$store.state.module_name = ''
      this.$store.state.parts = ''
      this.$store.state.module_Data = null
      this.$store.state.hover_parts = ''
      this.myShow = false
      this.$emit('closem')
      this.$store.state.showMyMask = false
      this.templet.Special_Mongolian_Close()
    },
    handleClick(tab, event) {},
    delpic: function(num) {
      this.infor.cityList[num].imgUrl = ''
      this.infor.cityLists[num].imgUrls = ''
      this.infor.imgUrls[num] = ''
    },
    selectPic(item, urls, num) {
      var _this = this
      let myurls = _this.infor.cityList[num].imgUrl
      this.$store.state.showPicCon = true
      this.$store.state.imgUrls = function(val, bol) {
        // 图片选择 最终是否点击确定按钮
        _this.infor.cityList[num].imgUrl = val.src
        _this.infor.cityLists[num].imgUrls = val.src
        _this.infor.imgUrls[num] = val.src
      }
    },
    deleteRow: function(num) {
      if (this.infor.rowNumber <= 1) {
        alert('最少一个链接')
      } else {
        this.infor.rowNumber--
        this.infor.cityList.splice(num, 1)
        this.infor.cityLists.splice(num, 1)
      }
    },
    addRow: function() {
      if (this.infor.rowNumber > 19) {
        alert('最多只允许添加20个链接')
      } else {
        this.infor.rowNumber++
        // debugger;
        var t = 'link_title' + this.infor.rowNumber,
          h = 'link_href' + this.infor.rowNumber,
          tar = 'link_target' + this.infor.rowNumber,
          a = 'imgalt' + this.infor.rowNumber,
          s = 'isShowPics' + this.infor.rowNumber,
          imgUrls = 'imgUrls' + this.infor.rowNumber
        this.infor.cityList.push({
          linkTitles: t,
          linkLinks: h,
          linkTargets: tar,
          linkAddPic: '添加图',
          linkDelPic: '删除图',
          imgUrl: '',
          isShowPic: 'false',
          isShowPics: s,
          imgUrls: imgUrls,
          imgalt: a,
          linkDeletes: '删除行'
        })
        this.infor.cityLists.push({
          title: '',
          href: '',
          target: '_self',
          iconCLass: '',
          imgalt: '',
          isShowPic: 'false',
          isShowPics: 'false',
          imgUrls: '',
          backgroundImage:'',
          backgroundImageHover:''
        })
      }
    },
    ichange1: function(index, value) {
      this.infor.cityLists[index].title = $('.' + value + ' input').val()
    },
    ichange2: function(index, value) {
      this.infor.cityLists[index].href = $('.' + value + ' input').val()
    },
    ichange4: function(index, value) {
      this.infor.cityLists[index].imgalt = $('.' + value + ' input').val()
    },
    ichange6: function(index, value) {
      this.infor.cityLists[index].imgUrls = $('.' + value + ' input').val()
    },
    ichange3: function(index, value) {
      let _this = this
      var t = setTimeout(function() {
        if ($('.' + value + ' input').val() === '新窗口') {
          _this.infor.cityLists[index].target = '_blank'
        } else {
          _this.infor.cityLists[index].target = '_self'
        }
        clearTimeout(t)
      }, 100)
    },
    ichange5: function(index, value) {
      var _this = this
      // $('.'+value+' input').val()
      var t = setTimeout(function() {
        if ($('.' + value + ' input').val() == '显示') {
          _this.infor.cityLists[index].isShowPics = 'true'
        } else {
          _this.infor.cityLists[index].isShowPics = 'fasle'
        }
        clearTimeout(t)
      }, 100)
    },
    clickIcon: function(item) {
      if (
        this.infor.cityLists[this.infor.clickName].iconCLass ==
        'icon' + ' iconfont ' + item
      ) {
        this.infor.cityLists[this.infor.clickName].iconCLass = ''
      } else {
        this.infor.cityLists[this.infor.clickName].iconCLass =
          'icon' + ' iconfont ' + item
      }
    },
    closeMask() {
      try {
        let _mydata = this.$store.state.module_Data

        let _pid = _mydata.pid
        let _rowtype = _mydata.rowType
        let _id = _mydata.widgets_id

        let IndexObj = this.templet.p_find_moduleIndex({
          pid: _pid,
          type: _rowtype,
          id: _id
        })

        let rowIndex = IndexObj.row
        let moduleIndex = IndexObj.module
        let rowtype = _mydata.rowType

        this.$store.state[rowtype][rowIndex].children[
          moduleIndex
        ].data.infor.isShows = false

        this.$store.state.module_name = ''
        this.$store.state.parts = ''
        this.$store.state.module_Data = null
        this.$store.state.hover_parts = ''
        this.$store.state.showMyMask = false
      } catch (e) {}
    }
  },
  components: {},
  mounted() {
    $('#edit_public').draggable({
      handle: 'div.edit_public_title',
      scroll: false
    })

    this.templet.judge_model_location(this)

    /* $(document).on('click',()=>{
      this.closeMask()
    }) */
  },
  updated() {
    // 绑定拖拽若是放在mounted会导致拖拽绑定不上去 因为使用的v-if，若是使用v-show则没有问题
    // $("#edit_public").draggable({ handle: "div.edit_public_title" });
  }
}
</script>

<style>
#edit_public .el-tabs__content {
  overflow-y: hidden;
}

.self-img_select button:nth-of-type(2){
  margin-left: 0px;
}

.self-buttom{
  margin-top: 5px;
}

div.self-img_select .row_back{
  height:30px;
}
</style>


<style scoped>
div.row_back_frame{
  width:100%;
}

#selfmask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.5);
}

#edit_public {
  width: 700px;
  height: 570px;
  position: absolute;
  background-color: #fff;
  left: 0%;
  top: 110%;
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

.rows b {
  display: inline-block;
  width: 50px !important;
  text-align: center;
}

.rows {
  margin: 6px 0;
  padding-right: 32px;
}

p.myicon .row_back_frame {
  width: 100%;
}

p.myicon .row_back_frame .sele_img {
  margin-top: 5px;
  display: flex;
  flex-wrap: nowrap;
}
</style>