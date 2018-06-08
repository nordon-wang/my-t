
<template>
  <div class="topBar">
    <div class="all_logo">
      <img src="static/image/color_logo.png">
      <span>T云，让网络营销变简单！</span>
    </div>

    <div class="save" id="top-save">
      <my-tooltip content="清空挂件" dir="down" v-if="isShowClearAll">
        <el-button type="primary" size="mini" @click="clearAll" icon="fa-trash-o" title=""></el-button>
      </my-tooltip>

      <my-tooltip content="帮助" dir="down" v-if="isShowClearAll">
        <el-button type="primary" size="mini" @click="gotoHelp" icon="fa-question-circle" title=""></el-button>
      </my-tooltip>

      <my-tooltip content="复制：shift+c" dir="down">
        <el-button type="primary" size="mini" icon="fa-files-o" @click="copy" :disabled="this.$store.state.select_module.jsonArr.length > 0 || this.$store.state.select_row != null ? false : true"></el-button>
      </my-tooltip>

      <my-tooltip content="粘贴：shift+v" dir="down">
        <el-button type="primary" size="mini" icon="fa-clipboard" @click="paste" :disabled="this.$store.state.copy_board != null  && this.$store.state.select_row != null? false : true"></el-button>
      </my-tooltip>

      <my-tooltip content="撤销：ctrl+z" dir="down">
        <el-button type="primary" size="mini" @click="Revoke" icon="fa-mail-reply" :disabled="Revoke_data != null ? false:true"></el-button>
      </my-tooltip>
      <!--:disabled="templet.Revoke_data() != null ? false:true"-->

      <my-tooltip content="恢复：ctrl+x" dir="down">
        <el-button type="primary" size="mini" @click="Recovery" icon="fa-mail-forward" :disabled="Recovery_data != null ? false:true"></el-button>
      </my-tooltip>

      <my-tooltip content="全局设置" class="item" transition="fade-tan" effect="dark" dir="down">
        <el-button type="primary" size="mini" @click="dialogVisible = true" icon="fa-sliders" title=""></el-button>
      </my-tooltip>

      <my-tooltip content="模板列表" dir="down">
        <el-button type="primary" size="mini" @click="open_template" icon="fa-file-code-o" title=""></el-button>
      </my-tooltip>

      <my-tooltip content="容器组合" dir="down">
        <el-button type="primary" size="mini" @click="open_row_group" icon="fa-delicious" title=""></el-button>
      </my-tooltip>

      <my-tooltip content="历史记录" dir="down">
        <el-button type="primary" size="mini" @click="open_historical" icon="fa-history" title=""></el-button>
      </my-tooltip>

      <my-tooltip content="图层" dir="down">
        <el-button type="primary" size="mini" @click="open_right_sidebar" icon="fa-database" title=""></el-button>
      </my-tooltip>

      <my-tooltip content="预览" dir="down">
        <el-button type="primary" size="mini" @click="open_look" icon="fa-eye" title=""></el-button>
      </my-tooltip>

      <my-tooltip content="保存" dir="down">
        <el-button type="warning" size="mini" @click="save" icon="fa-save"> 保存</el-button>
      </my-tooltip>

      <my-tooltip content="退出" dir="down">
        <el-button type="danger" size="mini" @click="web_close" icon="fa-sign-out" title=""></el-button>
      </my-tooltip>

    </div>

    <el-dialog title="全局设置" :visible.sync="dialogVisible" :modal-append-to-body="true" :append-to-body="true" width="600px">
      <el-tabs v-model="activeName" class="topSet">
        <el-tab-pane label="全局设置" name="first">
          <el-alert title="链接效果需要在链接设置中单独设置,若浏览器不支持所选字体则使用浏览器默认的字体" type="info" close-text="知道了">
          </el-alert>
          <div class="setOne top-set" v-if="dialogVisible">
            <my-select v-model="alls.font.chinese" title="中文字体" :option="$store.state.options.fontFamilyZh"></my-select>
            <my-select v-model="alls.font.english" title="英语字体" :option="$store.state.options.fontFamilyEn"></my-select>
          </div>

          <!-- <div class="setOne top-set" v-if="dialogVisible" >
            <my-select v-model="alls.font.fontweight" title="加粗" :option="$store.state.options.fontWeight"></my-select>
            <my-select v-model="alls.font.fontitalics" title="斜体" :option="$store.state.options.fontStyle"></my-select>
          </div> -->

          <div class="setOne top-set" v-if="dialogVisible">
            <my-number v-model="alls.bg.pagewidth" title="页面宽度"></my-number>
            <!-- <my-number v-model="alls.font.fontSize" title="字体大小"></my-number> -->
            <!-- <my-color v-model="alls.font.fontcolor" title="字体颜色"></my-color> -->
          </div>
        </el-tab-pane>

        <el-tab-pane label="链接设置" name="second">
          <div class="setOne top-set" v-if="dialogVisible">
            <my-select v-model="alls.link.chinese" title="中文字体" :option="$store.state.options.fontFamilyZh"></my-select>
            <my-select v-model="alls.link.english" title="英语字体" :option="$store.state.options.fontFamilyEn"></my-select>
          </div>
        </el-tab-pane>
      </el-tabs>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAllSet">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
//只在生产环境中引入
if (process.env.NODE_ENV === 'development') {
  var my_path = require('../../../config/index')
}
import { mapGetters } from 'vuex'

export default {
  name: 'topBar',
  data() {
    return {
      dialogVisible: false,
      alls: {},
      isShowClearAll: false,
      save_time: 0,
      activeName: 'first'
    }
  },
  components: {},
  methods: {
    gotoHelp(){
      window.open(`http://t.71360.com/webhelp`)
    },
    clearAll() {
      this.$confirm(`清空"当前页面"的全部挂进并刷新页面?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // body 清空
          let bodyArr = this.$store.state.body
          bodyArr.forEach(element => {
            element.children.length = 0
          })
          this.$store.state.body = bodyArr

          // header 清空
          let headerArr = this.$store.state.header
          headerArr.forEach(element => {
            element.children.length = 0
          })
          this.$store.state.header = headerArr

          // footer 清空
          let footerArr = this.$store.state.footer
          footerArr.forEach(element => {
            element.children.length = 0
          })
          this.$store.state.footer = footerArr

          this.templet.p_save(this.$message)

          // location.reload();
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消清空挂件'
          })
        })
    },
    async saveAllSet() {
      let items = this.alls
      let zhArr = this.$store.state.options.fontFamilyZh
      let enArr = this.$store.state.options.fontFamilyEn

      // debugger;
      // 中文 全局
      let zhLabel = zhArr.filter(item => items.font.chinese.includes(item.label))

      if (zhLabel.length) {
        items.font.chinese = zhLabel[0].label
      } else {
        items.font.chinese = '微软雅黑'
      }

      // 英文 全局
      let enLabel = enArr.filter(item => items.font.english.includes(item.label))

      if (enLabel.length) {
        items.font.english = enLabel[0].label
      } else {
        items.font.english = 'Arial'
      }

      // 中文 链接
      let zhLabelLink = zhArr.filter(item => items.link.chinese.includes(item.label))

      if (zhLabelLink.length) {
        items.link.chinese = zhLabelLink[0].label
      } else {
        items.link.chinese = '微软雅黑'
      }

      // 英文 链接
      let enLabelLink = enArr.filter(item => items.link.english.includes(item.label))

      if (enLabelLink.length) {
        items.link.english = enLabelLink[0].label
      } else {
        items.link.english = 'Arial'
      }

      this.$store.state.pagewidth = +items.bg.pagewidth

      try {
        let data = await $.post(`/index_pc.php/newapi/base/saveThemeConfig`, {
          config: items
        })
        this.dialogVisible = false
        if (!data.error) {

          // 全局字体
          $(`<style type="text/css">
            #app > #app_child_frame > div.myheader div.module > div > div:nth-of-type(2),
            #app > #app_child_frame > div.mybody div.module > div > div:nth-of-type(2), 
            #app > #app_child_frame > div.myfooter div.module > div > div:nth-of-type(2),
            #app > #app_child_frame > div.myheader div.module > div > .allSetFM,
            #app > #app_child_frame > div.mybody div.module > div > .allSetFM, 
            #app > #app_child_frame > div.myfooter div.module > div > .allSetFM {
              font-family:${zhLabel[0].value},${enLabel[0].value},"微软雅黑" !important;
            }

            #app > #app_child_frame > div.myheader div.module div:nth-of-type(2) a,
            #app > #app_child_frame > div.mybody div.module div:nth-of-type(2) a,
            #app > #app_child_frame > div.myfooter div.module div:nth-of-type(2) a,
            #app > #app_child_frame > div.myheader div.module .allSetFM a,
            #app > #app_child_frame > div.mybody div.module .allSetFM a,
            #app > #app_child_frame > div.myfooter div.module .allSetFM a,
            #app > #app_child_frame > div.mybody div.module .self_fenye ul.el-pager li{
              font-family:${zhLabelLink[0].value},${enLabelLink[0].value},"微软雅黑"
            }
          </style>`).appendTo('head')

          this.$message({
            showClose: true,
            message: '恭喜你,全局设置成功!',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: '全局设置失败,请稍后重试1!',
            type: 'warning'
          })
        }
      } catch (err) {
        console.log(err);
        this.$message({
          showClose: true,
          message: '全局设置失败,请稍后重试2!',
          type: 'warning'
        })
        this.dialogVisible = false
      }
    },
    open_right_sidebar() {
      this.$store.state.right_sidebar_isShow = true
      this.$store.commit('historical/websql_close')
      this.$store.state.template_is_show = false
      this.$store.state.row_group_is_show = false
    },
    save() {
      if (this.save_time === 0) {
        this.save_time = Date.now()
      } else {
        if (Date.now() - this.save_time < 5000) {
          this.$message.error('每5秒只能保存一次！')
          return
        }
      }

      if (this.$store.state.finishSave) {
        //开始保存
        this.save_time = 0 //重置时间戳
        this.templet.p_save(this.$message).catch((err)=>{
            this.save_time = 0 //重置时间戳
            this.$store.state.finishSave = true;
        })
        this.$store.state.finishSave = false;
        // this.$store.state.finishSave = false
      }
    },
    open_look() {
      const view_module = this.$store.state.view_module;
      const v_m = view_module.split(':')[0];
      const v_a = view_module.split(':')[1];
      let tempwindow=window.open();//提前打开新窗口，避免拦截
      //如果在详情页面点预览，需要请求获取一个id
      if (v_a === 'item') {
        this.look_get_id(v_m,tempwindow)
      } else {
        this.look_go(tempwindow)
      }
    },
    look_get_id(type,tempwindow) {
      const that = this
      var $url = ''
      if (type == 'product') {
        $url = '/index_pc.php/newapi/goods/getlist'
      } else if (type == 'case') {
        $url = '/index_pc.php/newapi/article/getlist/type/3'
      } else if (type == 'article') {
        $url = '/index_pc.php/newapi/article/getlist/type/1'
      } else if (type == 'download') {
        $url = '/index_pc.php/newapi/article/getlist/type/4'
      } else if (type == 'video') {
        $url = '/index_pc.php/newapi/article/getlist/type/11'
      } else if (type == 'help') {
        $url = '/index_pc.php/newapi/article/getlist/type/2'
      } else if (type == 'job') {
        $url = '/index_pc.php/newapi/article/joblist'
      }

      $.get($url, function(data) {
        if (data.code === 200) {
          //普通的列表返回
          if (data.data instanceof Array && data.data.length > 0) {
            const id = data.data[0].id;
              that.look_go(tempwindow,id);
          } else if (
            data.data instanceof Object &&
            data.data.rows instanceof Array &&
            data.data.rows.length > 0
          ) {
            //招聘列表
            const id = data.data.rows[0].id;
            that.look_go(tempwindow,id)
          } else {
              tempwindow.close();
            that.$message.error(
              `请先去后台添加至少一个${that.templet.page_type(type)}！`
            )
            return
          }
        }
      })
    },
    look_go(tempwindow,id = '') {
      const view_module = this.$store.state.view_module;
      const v_m = view_module.split(':')[0];
      const v_a = view_module.split(':')[1];

      if (process.env.NODE_ENV === 'development' && my_path) {
        const my_domain = my_path.dev.proxyTable['/index_pc.php'].target;
          tempwindow.location = `${my_domain}/index.php?_preview=pc&app=site&m=${v_m}&a=${v_a}&lang=zh-cn&id=${id}`;
        /*window.open(
          `${my_domain}/index.php?_preview=pc&app=site&m=${v_m}&a=${v_a}&lang=zh-cn&id=${id}`,
          '_blank'
        )*/
      } else {
          tempwindow.location = `/index.php?_preview=pc&app=site&m=${v_m}&a=${v_a}&lang=zh-cn&id=${id}`;
        /*window.open(
          `/index.php?_preview=pc&app=site&m=${v_m}&a=${v_a}&lang=zh-cn&id=${id}`,
          '_blank'
        )*/
      }
    },
    all_set() {},
    open_historical() {
      this.$store.commit('historical/websql_open')
      this.$store.state.right_sidebar_isShow = false
      this.$store.state.template_is_show = false
      this.$store.state.row_group_is_show = false
    },
    open_template() {
      this.$store.state.template_is_show = true
      this.$store.state.right_sidebar_isShow = false
      this.$store.commit('historical/websql_close')
      this.$store.state.row_group_is_show = false
    },
    Revoke() {
      this.$store.state.module_name = ''
      if (openDatabase) {
        this.$store.dispatch('historical/find_sql', {
          $message: this.$message,
          type: 'Revoke'
        })
      }
    },
    Recovery() {
      this.$store.state.module_name = ''
      if (openDatabase) {
        this.$store.dispatch('historical/find_sql', {
          $message: this.$message,
          type: 'Recovery'
        })
        //this.templet.find_sql(this.$message,'Recovery');
      }
    },
    open_row_group() {
      this.$store.state.row_group_is_show = true
      this.$store.state.template_is_show = false
      this.$store.state.right_sidebar_isShow = false
      //this.$store.state.websql_is_show = false;
      this.$store.commit('historical/websql_close')
    },
    copy() {
      this.templet.copy_methods()
    },
    paste() {
      this.templet.paste_methods(this.$message)
    },
    web_close() {
      this.$confirm('是否退出当前模板？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (process.env.NODE_ENV === 'development' && my_path) {
            const my_domain = my_path.dev.proxyTable['/index_pc.php'].target
            window.location.href = `${my_domain}/index.php?app=desktop`
          } else {
            window.location.href = `/index.php?app=desktop`
          }
        })
        .catch(() => {})
    }
  },
  created() {},
  computed: {
    Revoke_data() {
      return this.$store.getters['historical/Revoke_data']
    },
    Recovery_data() {
      return this.$store.getters['historical/Recovery_data']
    }
  },
  async mounted() {
    let zhArr = this.$store.state.options.fontFamilyZh
    let enArr = this.$store.state.options.fontFamilyEn

    let clear_all = localStorage.getItem('clearall')
    this.isShowClearAll = clear_all ? true : false

    let data = await $.ajax({
      url: `/index_pc.php/newapi/base/getThemeConfig`,
      type: 'get',
      dataType: 'json'
    })

    // 过滤 

    let items = data.data
    // 中文 全局
    let zhLabel = zhArr.filter(item => items.font.chinese.includes(item.label))

    if (zhLabel.length) {
      items.font.chinese = zhLabel[0].label
    } else {
      items.font.chinese = '微软雅黑'
    }

    // 英文 全局
    let enLabel = enArr.filter(item => items.font.english.includes(item.label))

    if (enLabel.length) {
      items.font.english = enLabel[0].label
    } else {
      items.font.english = 'Arial'
    }

    // 中文 链接
    let zhLabelLink = zhArr.filter(item => items.link.chinese.includes(item.label))

    if (zhLabelLink.length) {
      items.link.chinese = zhLabelLink[0].label
    } else {
      items.link.chinese = '微软雅黑'
    }

    // 英文 链接
    let enLabelLink = enArr.filter(item => items.link.english.includes(item.label))

    if (enLabelLink.length) {
      items.link.english = enLabelLink[0].label
    } else {
      items.link.english = 'Arial'
    }


    this.$store.state.pagewidth = +data.data.bg.pagewidth

    this.alls = data.data
    this.alls.font.fontSize = parseInt(this.alls.font.fontSize)
    this.$store.state.allSetFont = data.data.font

    this.alls.bg.pagewidth = parseInt(this.alls.bg.pagewidth)

    // 全局字体

    /* this.$root.$el.style.cssText = `
      font-family:${zhLabel[0].value},${enLabel[0].value},"微软雅黑" !important;
      font-size: ${data.data.font.fontSize}px !important;
      font-weight: ${data.data.font.fontweight == 1 ? 'bolder' : 'normal'} !important;
      font-style: ${data.data.font.fontitalics == 1 ? 'italic' : 'normal'} !important; 
    ` */
    // #app > #app_child_frame > div.myheader div.module > div > div:not(.public_edit),
    // allSetFM
      $(`<style type="text/css">
        #app > #app_child_frame > div.myheader div.module > div > div:nth-of-type(2),
        #app > #app_child_frame > div.mybody div.module > div > div:nth-of-type(2), 
        #app > #app_child_frame > div.myfooter div.module > div > div:nth-of-type(2),
        #app > #app_child_frame > div.myheader div.module > div > .allSetFM,
        #app > #app_child_frame > div.mybody div.module > div > .allSetFM, 
        #app > #app_child_frame > div.myfooter div.module > div > .allSetFM {
          font-family:${zhLabel[0].value},${enLabel[0].value},"微软雅黑" !important;
          font-size: ${data.data.font.fontSize}px !important;
          font-weight: ${data.data.font.fontweight == 1 ? 'bolder' : 'normal'} !important;
          font-style: ${data.data.font.fontitalics == 1 ? 'italic' : 'normal'} !important;
        }

        #app > #app_child_frame > div.myheader div.module div:nth-of-type(2) a,
        #app > #app_child_frame > div.mybody div.module div:nth-of-type(2) a,
        #app > #app_child_frame > div.myfooter div.module div:nth-of-type(2) a,
        #app > #app_child_frame > div.myheader div.module .allSetFM a,
        #app > #app_child_frame > div.mybody div.module .allSetFM a,
        #app > #app_child_frame > div.myfooter div.module .allSetFM a,
        #app > #app_child_frame > div.mybody div.module .self_fenye ul.el-pager li{
          font-family:${zhLabelLink[0].value},${enLabelLink[0].value},"微软雅黑"
        }

      </style>`).appendTo('head')

    // 链接字体
    /* $(this.$root.$el).find('a').css({
      fontFamily:`${zhLabelLink[0].value},${enLabelLink[0].value},"微软雅黑"`
    }) */
  }
}
</script>

<style scoped>
div.top-set {
  min-width: 600px;
}
div.top-set p {
  width: 50%;
}

div.save {
  display: flex;
  align-items: center;
  height: 100%;
  margin-top: 0;
}
</style>

<style >
#top-save button i {
  font-family: FontAwesome !important;
}
#top-save .my-tooltip {
  margin-left: 10px;
}

/* .fade-tan-enter-active, .fade-tan-leave-active {
  transition: opacity 0s;
}
.fade-tan-enter, .fade-tan-leave-to {
  opacity: 0;
} */

div.topSet .el-tabs__content {
  height: 140px;
}
</style>


