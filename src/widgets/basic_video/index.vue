<template>
  <div class="picture mouseClass">
    <!--编辑框-->
    <div class="public_edit">
      <ul>
        <li class="edit_module" @click.stop="select_parts('','basic_video')">{{templet.p_nameToChinese(name)}}编辑</li>
        <my-tooltip content="动画选择" v-show="infor.videoPosition != 'fixed'">
          <li class="edit_module" @click.stop="select_parts('','public_animated')">
            <span class="fa fa-flash"></span>
          </li>
        </my-tooltip>
        <my-tooltip content="基础设置">
          <li class="edit_module el-icon-setting" @click.stop="select_parts('','basic_module')"></li>
        </my-tooltip>
        <li class="el-icon-delete" @click.stop="templet.p_del_module({id,pid,type:rowType})"></li>
      </ul>
    </div>

    <div :style="[conStyle,{
      overflow:'hidden'
    }]" class="mouseClass wDefaultBorder" data-Highlight="video_set" @dblclick.stop="select_parts('video_set','basic_video')" :class="[
        $store.state.module_Data && $store.state.parts == 'video_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : '',
        $store.state.module_Data && $store.state.hover_parts == 'video_set' && $store.state.module_Data.widgets_id == id ? 'index_Highlight' : ''
        ]">
      <video id="videoStyle2" v-if="infor.videoSouceStyle == 'mp' && infor.videoUrl !='' " 
      :controls="infor.controls == 'true'"
      :loop="infor.loop ? 'loop' : false" :autoplay="infor.autoplay ? 'autoplay' : false" :style="panduan2">
        <source class="videoSource" :src="infor.videoUrl" type="video/mp4">
      </video>
      <!-- <h1>{{infor.videoTypes}}</h1> -->
      <!-- <embed v-if="infor.videoSouceStyle == 'flash' && infor.realUrl != '' " autostart=true :style="[panduan2,{
         visibility: 'visible'
       }]" allowscriptaccess="never" flashvars="playMovie=true&amp;auto=1" 
       allowfullscreen="true" quality="hight" :src='infor.realUrl' type="application/x-shockwave-flash" 
       wmode="opaque" /> -->

      <img v-if="infor.videoTypes == 'youku'" src="/newapi/view/home/index/static/image/video-youku.png" :style="panduan2" alt="">
      <img v-if="infor.videoTypes == 'qq'" src="/newapi/view/home/index/static/image/video-qq.png" :style="panduan2" alt="">

      <!-- <iframe  v-if="videoTypes == 'qqiframe' && infor.videoSouceStyle != 'mp'"
       frameborder="0" style="visibility: visible;z-index:-2" :style="panduan2" 
        :src='infor.realUrl' allowfullscreen></iframe> -->

      <!-- 遮罩 -->
      <div :style="{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'transparent',
      }">
      </div>

      <!-- <embed :style="panduan2" v-if="videoTypes == 'qqembed' && infor.videoSouceStyle != 'mp' " 
      :src="infor.realUrl" allowFullScreen="true" quality="high"  align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'basic_video',
  props: {
    infor: {
      type: Object,
      default: null
    },
    listArr: {
      type: Object,
      default: null
    },
    id: {
      type: String,
      default: ''
    },
    pid: {
      type: String,
      default: ''
    },
    rowType: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showToolBar: false
    }
  },
  watch: {
    infor: {
      handler: function(val, oldVal) {
        if (val.videoPosition == 'fixed') {
          $(this.$parent.$el).css({
            position: val.videoPosition,
            left: val.posLeft + 'px',
            top: val.posTop + 60 + 'px'
          })
        } else {
          $(this.$parent.$el).css({
            position: val.videoPosition,
            left: this.$parent.css.module_left + 'px',
            top: this.$parent.css.module_top + 'px'
          })
        }
      },
      deep: true
    }
  },
  computed: {
    videoTypes: function() {
      //根据传入的地址 来判断已何种方式显示

      var videoUrl = $.trim(this.infor.videoUrl)

      if (!videoUrl) {
        return ''
      }
      var dotIndex = videoUrl.lastIndexOf('.')

      var isMp4 = videoUrl.substr(dotIndex + 1)

      //mp4
      if (isMp4 == 'mp4') {
        return 'mp4'
      }
      // debugger;

      var _isFrame =
        $(this.infor.videoUrl).length &&
        $(this.infor.videoUrl)[0].nodeName == 'IFRAME'
      var _isEmbed =
        $(this.infor.videoUrl).length &&
        $(this.infor.videoUrl)[0].nodeName == 'EMBED'

      //优酷
      if (_isFrame && this.infor.videoUrl.indexOf('youku.com') >= 0) {
        this.infor.videoSourceTyoe = 'youkuiframe'

        var str = $(this.infor.videoUrl).attr('src')
        var arr = str.split('/')
        var len = arr.length
        var lastArr = arr[len - 1]

        this.infor.realUrl =
          'http://player.youku.com/player.php/sid/' + lastArr + '/v.swf'

        this.infor.picStyles = 4

        return 'youkuiframe'
      }

      //腾讯
      if (_isFrame && this.infor.videoUrl.indexOf('qq.com') >= 0) {
        this.infor.videoSourceTyoe = 'qqiframe'
        this.infor.realUrl = $(this.infor.videoUrl).attr('src')

        this.infor.picStyles = 5
        return 'qqiframe'
      }

      if (_isEmbed && this.infor.videoUrl.indexOf('qq.com') >= 0) {
        this.infor.videoSourceTyoe = 'qqembed'
        this.infor.realUrl = $(this.infor.videoUrl).attr('src')

        this.infor.picStyles = 6
        return 'qqembed'
      }

      return 'mp4'
    },
    conStyle() {
      return {
        width: this.infor.videoWidth + 'px',
        height: this.infor.videoHeight + 'px'
      }
    },
    panduan3: function() {
      return {
        display: this.infor.picStyles == 3 ? 'block' : 'none',
        height: this.infor.videoHeight + 'px'
      }
    },
    panduan2: function() {
      return {
        display: this.infor.picStyles != 3 ? 'block' : 'none',
        width: this.infor.videoWidth + 'px',
        height: this.infor.videoHeight + 'px'
      }
    },
    panduan5: function() {
      return {
        display: this.infor.picStyles == 5 ? 'block' : 'none',
        height: this.infor.videoHeight + 'px',
        width: this.infor.videoWidth + 'px'
      }
    }
  },
  methods: {
    initData() {
      // 获取三个参数 可以拿到所在的row moudule 和 row的类型
      let _pid = this.pid
      let _rowtype = this.rowType
      let _id = this.id

      let IndexObj = this.templet.p_find_moduleIndex({
        pid: _pid,
        type: _rowtype,
        id: _id
      })

      let rowIndex = IndexObj.row
      let moduleIndex = IndexObj.module
      let rowtype = this.rowType

      let moduleObj = this.$store.state[rowtype][rowIndex].children[moduleIndex]
        .data.css

      this.$set(this.infor, 'videoWidth', 600)
      this.$set(this.infor, 'videoHeight', 600)
    },
    select_parts(partsName, moduleName) {
      this.templet.p_index_select_parts({
        partsName,
        moduleName,
        id: this.id,
        pid: this.pid,
        type: this.rowType
      })
    },
    changeModule() {
      if (this.infor.videoPosition == 'fixed') {
        $(this.$parent.$el).css({
          position: this.infor.videoPosition,
          left: this.infor.posLeft + 'px',
          top: this.infor.posTop + 60 + 'px'
        })
      }
    },
    changePos() {
      if (this.infor.videoPosition == 'fixed') {
        $('#u' + this.id).css('z-index', 9999)
      } else {
        $('#u' + this.id).css('z-index', '')
      }
    }
  },
  created() {
    this.changePos()
  },
  mounted() {
    this.changePos()
    this.changeModule()

    if (this.infor.videoPosition == 'fixed') {
      $(this.$parent.$el).draggable()
      $(this.$parent.$el).draggable('disable')
    }

    // 兼容
    if(!this.infor.controls){
      this.infor.controls = 'true';
    }
  }
}
</script>
<style>
.picture {
  position: relative;
}
</style>
