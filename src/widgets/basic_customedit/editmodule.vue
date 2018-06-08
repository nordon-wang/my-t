<template>
  <div id="edit_public" @dblclick.stop="mystop($event)">
    <div class="edit_public_title" id="handleDrap">
      <i class="el-icon-menu"></i>
      <span>{{editTitle}}</span>
      <i class="el-icon-circle-close-outline close" @click="closeModel"></i>
    </div>
    <!-- 自定义内容编辑 -->
    <div class="custom_edit_con" style="cursor: default;">
      <editor id="editor_id" height="100%" width="100%" :content="result" 
      pluginsPath="/static/kindeditor/plugins/" 
      :loadStyleMode="false" @on-content-change="onContentChange" :items="editCofig"></editor>
    </div>

    <div class="edit_public_title edit_public_btn">
      <el-button type="primary" size="mini" @click="closeModel">确定</el-button>
      <!-- <el-button type="warning" size="mini" @click="cancelModel">取消</el-button> -->
    </div>

    <div id="self-edit" v-show="selfMask"></div>
  </div>

</template>

<script>
//只在生产环境中引入
if (process.env.NODE_ENV === 'development') {
  var my_path = require('../../../config/index')
}

export default {
  name: 'edit_module',
  data() {
    return {
      editTitle: '自定义内容编辑',
      editCofig: [
        'source',
        '|',
        // "undo",
        // "redo",
        // "|",
        // "preview",
        // "print",
        // "template",
        // "cut",
        // "copy",
        // "paste",
        'plainpaste',
        'wordpaste',
        '|',
        'justifyleft',
        'justifycenter',
        'justifyright',
        'justifyfull',
        'insertorderedlist',
        'insertunorderedlist',
        'indent',
        'outdent',
        'subscript',
        'superscript',
        'clearhtml',
        // "quickformat",
        'selectall',
        // "|",
        // "fullscreen",
        '/',
        // "fontname",
        // "formatblock",
        'fontsize',
        '|',
        'forecolor',
        'hilitecolor',
        'bold',
        'italic',
        'underline',
        // "strikethrough",
        'lineheight',
        'removeformat',
        '|',
        'image',
        // "multiimage",
        // "flash",
        // "media",
        // "table",
        'hr',
        // "baidumap",
        // "code",
        // "pagebreak",
        'link',
        'unlink'
      ],
      result: this.val,
      selfMask: false
    }
  },
  watch: {},
  props: {
    val: {
      type: String,
      default: ''
    }
  },
  methods: {
    mystop(event) {
      event.stopPropagation()
      event.cancelBubble = true
    },
    onContentChange(val) {
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
        ].data.infor.contents = val

        this.templet.module_add_historical('编辑自定义内容组件内容')
      } catch (e) {
        console.log('取消时')
      }
      this.result = val
    },
    closeModel() {
      this.$store.state.module_name = ''
      this.$store.state.parts = ''
      this.$store.state.module_Data = null
      this.$store.state.hover_parts = ''
      this.$emit('closem')
      this.$store.state.showMyMask = false
      this.$store.state.showCustomModel = false
      this.templet.Special_Mongolian_Close()
    },
    cancelModel() {
      this.$store.state.module_name = ''
      this.$store.state.parts = ''
      this.$store.state.module_Data = null
      this.$store.state.hover_parts = ''
      this.$emit('closem')
      this.templet.Special_Mongolian_Close()
      // this.$store.state.showMyMask = false;
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
    },
    selectPic() {
      this.$store.state.showPicCon = true
      this.$store.state.imgUrls = function(val, bol) {
        // 图片选择 最终是否点击确定按钮
        $('input#remoteUrl').val(val.src)
      }
    }
  },
  components: {},
  mounted() {
    try {
      this.result = this.$store.state.module_Data.data.infor.contents
      this.onContentChange(this.result)
    } catch (e) {
      console.log(e)
      this.closeModel()
    }

    let el = this.$el
    let _this = this

    $(this.$el).draggable({ handle: 'div.edit_public_title', scroll: false })
    $(this.$el).resizable({
      autoHide: true,
      resize: function(event, ui) {
        let width = ui.size.width
        let height = ui.size.height
        width = width > 395 ? width : 395
        height = height > 180 ? height : 180
        $(el)
          .height(height)
          .width(width)
        _this.selfMask = true
      },
      stop() {
        _this.selfMask = false
      }
    })

    this.templet.judge_model_location(this)
    
    // 点击图片选择
    $('span[data-name="image"]').on('click', () => {
      let timer = setTimeout(() => {
        $(
          'div.tab1 div.ke-dialog-row span.ke-button-common input.ke-button'
        ).on('click', () => {
          this.selectPic()
        })

        /**
         * 样式选择 图片域名地址..
         */
        if (process.env.NODE_ENV === 'development' && my_path) {
          // this.picUrl = '/static/image/mbg01.png';
          $('img[name="defaultImg"]').attr(
            'src',
            '/static/image/kindeditor/align_top.gif'
          )
          $('img[name="leftImg"]').attr(
            'src',
            '/static/image/kindeditor/align_left.gif'
          )
          $('img[name="rightImg"]').attr(
            'src',
            '/static/image/kindeditor/align_right.gif'
          )
          $('img.ke-refresh-btn').attr(
            'src',
            '/static/image/kindeditor/refresh.png'
          )
        } else {
          // this.picUrl = '/newapi/view/home/index/' + '/static/image/mbg01.png';
          $('img[name="defaultImg"]').attr(
            'src',
            '/newapi/view/home/index/static/image/kindeditor/align_top.gif'
          )
          $('img[name="leftImg"]').attr(
            'src',
            '/newapi/view/home/index/static/image/kindeditor/align_left.gif'
          )
          $('img[name="rightImg"]').attr(
            'src',
            '/newapi/view/home/index/static/image/kindeditor/align_right.gif'
          )
          $('img.ke-refresh-btn').attr(
            'src',
            '/newapi/view/home/index/static/image/kindeditor/refresh.png'
          )
        }

        clearTimeout(timer)
      }, 100)
    })

    // 点击标题
   /*  $('span[data-name="formatblock"]').on('click',() => {
      let timer = setTimeout(() => {
        $('div.ke-menu-default > div.ke-menu-item:nth-of-type(1), div.ke-menu-default > div.ke-menu-item:nth-of-type(2)').css('display','block')
          clearTimeout(timer)
      },20)
    }) */
    // 点击 font-size
    /* $('span[data-name="fontsize"]').on('click',() => {
      let timer = setTimeout(() => {
        $('div.ke-menu-default > div.ke-menu-item:nth-of-type(1), div.ke-menu-default > div.ke-menu-item:nth-of-type(2)').css('display','none')
          clearTimeout(timer)
      },20)
    }) */

    // ke-edit-iframe 获取iframe的对象 并插入默认的样重置
    const iframeObj = $('.ke-edit-iframe').eq(0)[0].contentWindow.document.documentElement

    $(`<style>
      html {margin:0;padding:0;}
      body {margin:0;padding:5px;}
      body, td {font:12px/1.5 "sans serif",tahoma,verdana,helvetica;}
      body, p, div {word-wrap: break-word;}
      p {margin:0;}
      ul, ol {padding:0;margin:0;}
      table {border-collapse:collapse;}
      img {border:0;}
      noscript {display:none;}
      table.ke-zeroborder td {border:1px dotted #AAA;}
      img.ke-flash {
        border:1px solid #AAA;
        background-image:url(http://nordon3.com/static/js/kindeditor/themes/common/flash.gif);
        background-position:center center;
        background-repeat:no-repeat;
        width:100px;
        height:100px;
      }
      img.ke-rm {
        border:1px solid #AAA;
        background-image:url(http://nordon3.com/static/js/kindeditor/themes/common/rm.gif);
        background-position:center center;
        background-repeat:no-repeat;
        width:100px;
        height:100px;
      }
      img.ke-media {
        border:1px solid #AAA;
        background-image:url(http://nordon3.com/static/js/kindeditor/themes/common/media.gif);
        background-position:center center;
        background-repeat:no-repeat;
        width:100px;
        height:100px;
      }
      img.ke-anchor {
        border:1px dashed #666;
        width:16px;
        height:16px;
      }
      .ke-script, .ke-noscript, .ke-display-none {
        display:none;
        font-size:0;
        width:0;
        height:0;
      }
      .ke-pagebreak {
        border:1px dotted #AAA;
        font-size:0;
        height:2px;
      }

      em {
        font-style: italic;
      }
      ul li {
        list-style-type: disc;
        list-style-position: inside;
      }
      ol li {
        list-style-type: decimal;
        list-style-position: inside;
      }
      blockquote {
        font-size: inherit;
      }
      p {
        margin:0;
      }
       h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6 {
        font-family: inherit;
        font-weight: 500;
        line-height: 1.1;
        color: inherit;
    }
    h3 {
        font-size: 24px;
    }
    h1 {
        font-size: 2em;
    }
    h2,
    .h2 {
        font-size: 30px;
    }
    h4,
    .h4 {
        font-size: 18px;
    }
    </style>`).appendTo(iframeObj)
    
  },
  updated() {
    // 绑定拖拽若是放在mounted会导致拖拽绑定不上去 因为使用的v-if，若是使用v-show则没有问题
    // $("#edit_public").draggable({ handle: "div.edit_public_title" });
  }
}
</script>

<style scoped>
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
  height: 600px;
  position: absolute;
  background-color: #fff;
  left: 0px;
  top: calc(100% + 12px);
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
  height: 570px;
  height: calc(100% - 84px);
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  /* padding-bottom: 40px; */
}

div.custom_edit_con > div.kindeditor {
  height: 100%;
}

#self-edit {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background-color: aqua;
  opacity: 0;
}
</style>

<style>
div.ke-edit {
  display: block;
  height: calc(100% - 42px) !important;
  width: 100% !important;
}

/* .ke-edit-textarea{
  font-family: 华文彩云,Arial Serif, 微软雅黑,"微软雅黑" !important;
} */

.ke-edit-textarea p {
  margin: 0px;
}

div.custom_edit_con > div.kindeditor > div.ke-container {
  height: 100%;
}
div.custom_edit_con > div.kindeditor > div.ke-container iframe {
  color: #f00;
  height: 100% !important;
}

.ke-edit-textarea {
  height: calc(100% - 12px) !important;
}

.ke-tabs {
  display: none !important;
}

input.ke-button {
  display: block !important;
}

div.ke-menu {
  display: none !important;
}

div.ke-menu-default {
  display: block !important;
}

div.ke-menu-default > div.ke-menu-item:nth-of-type(1), div.ke-menu-default > div.ke-menu-item:nth-of-type(2) {
  display: none !important;
}
</style>
