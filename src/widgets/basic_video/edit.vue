<template>
  <div class="bannerEdit">
    <!--初始显示-->
    <div class="init_edit" v-show="$store.state.parts == ''">
      <span class="mouseClass edit_second_level" @click="templet.p_select_parts('video_set')" data-Highlight="video_set" :class="[
           $store.state.hover_parts == 'video_set'  ? 'index_Highlight' : ''
           ]">视频管理</span>
    </div>

    <!--视频管理-->
    <div class="Routine_setting btm_3cols" v-if="$store.state.parts == 'video_set'">
      <div class="setOne">
        <my-select v-model="infor.videoSouceStyle" title="视频格式" :option="$store.state.options.videoStyle"></my-select>
        <my-input v-show="infor.videoSouceStyle == 'flash' ? true : false" v-model="infor.videoUrlFlash" title="url地址" placeholder="请输入视频地址"></my-input>
        <my-input @change.native="myblur" v-show="infor.videoSouceStyle == 'mp' ? true : false" v-model="infor.videoUrl" title="url地址" placeholder="请输入视频地址"></my-input>
        <my-number v-model="infor.videoHeight" title="大小设置"></my-number>
      </div>

      <div class="setOne" v-show="infor.videoSouceStyle == 'flash'">
          <el-alert :style="{
              width:`60%`,
              marginBottom: '4px',
            minWidth:'300px'
            }" title="falsh格式支持优酷全部格式和腾讯视频等embed格式视频源" type="info">
          </el-alert>
      </div>

      <div class="setOne" v-show="infor.videoSouceStyle == 'mp' ? true : false">
        <my-select v-model="infor.autoplay" title="自动播放" :option="$store.state.options.videoAutoplay"></my-select>
        <my-select v-model="infor.loop" title="循环播放" :option="$store.state.options.videoLoop"></my-select>
        <my-select v-model="infor.controls" title="控制条" :option="$store.state.options.videoControl"></my-select>
      </div>

      <div class="setOne">
        <my-select v-model="infor.videoPosition" title="视频定位" :option="$store.state.options.videoPosition"></my-select>
        <my-number v-show="infor.videoPosition == 'fixed' ? true : false" v-model="infor.posLeft" title="定位-左"></my-number>
        <my-number v-show="infor.videoPosition == 'fixed' ? true : false" v-model="infor.posTop" title="定位-上"></my-number>
      </div>
      
      <div class="setOne" v-show="infor.videoPosition == 'fixed'">
          <el-alert :style="{
              width:`60%`,
              marginBottom: '4px',
            minWidth:'300px'
            }" title="视屏绝对定位之后，动画效果不能设置、也不起作用" type="info">
          </el-alert>
      </div>
    </div>

  </div>
</template>

<script>
import style from './style'
export default {
  name: 'basic_picture_edit',
  props: {},
  data() {
    return {
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
  watch: {
    infor: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'infor',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑视频组件');
        // flash 格式处理
        if (val.videoSouceStyle == 'flash') {
          let url = this.newVideoTypesTem();
          this.infor.realUrl = url;
          this.infor.picStyles = 4;
        } else {
          this.infor.picStyles = 2;
        }
      },
      deep: true
    },
    animateObj: {
      handler: function(val, oldVal) {
        this.templet.p_editModule({
          key: 'animateObj',
          val: JSON.parse(JSON.stringify(val))
        })
        this.templet.module_add_historical('编辑视频组件');
      },
      deep: true
    }
  },
  methods: {
    newVideoTypesTem(){
      
      let falshUrl = this.infor.videoUrlFlash
      if(!falshUrl){
        return "";
      }



      // 1. 优酷 直接的url地址 优酷
      let reg1 = /[==/v.swf]$/ig
      if(reg1.test(falshUrl)){
        this.infor.videoTypes = 'youku'
        return falshUrl;
      }
      
      // 判断是qq还是优酷
      if( $(falshUrl).attr('src').indexOf('qq.com') >=0){
        this.infor.videoTypes = 'qq'
      }else{
        this.infor.videoTypes = 'youku'
      }

      // 获取dom元素
      let urlType = $(falshUrl)[0].nodeName.toLowerCase()
      

      // 2.  优酷、qq embed
      if(urlType == 'embed'){
        return $(falshUrl).attr('src');
      }

      //3. 优酷 ifram
      if(urlType == 'iframe'){
        let iframUrl = $(falshUrl).attr('src');

        let iframArr = iframUrl.split('/')
        let iframLen = iframArr.length - 1
        return 'http://player.youku.com/player.php/sid/' + iframArr[iframLen] + '/v.swf'
      } 
      
    },
    videoTypesTem: function() {
      //根据传入的地址 来判断已何种方式显示
      var videoUrl = this.infor.videoUrlFlash
      var dotIndex = videoUrlFlash.lastIndexOf('.')


      var _isFrame = $(this.infor.videoUrlFlash)[0].nodeName == 'IFRAME'
      var _isEmbed = $(this.infor.videoUrlFlash)[0].nodeName == 'EMBED'

      //优酷
      if (_isFrame && this.infor.videoUrlFlash.indexOf('youku.com') >= 0) {
        console.log('优酷iframe的地址', $(this.infor.videoUrlFlash).attr('src'))
        this.infor.videoSourceTyoe = 'youkuiframe'

        var str = $(this.infor.videoUrlFlash).attr('src')
        var arr = str.split('/')
        var len = arr.length
        var lastArr = arr[len - 1]

        //http://player.youku.com/player.php/sid/XMzM3NTAxMDY0MA==/v.swf

        this.infor.realUrl =
          'http://player.youku.com/player.php/sid/' + lastArr + '/v.swf'

        this.infor.picStyles = 4

        return 'youkuiframe'
      }

      //腾讯
      if (_isFrame && this.infor.videoUrlFlash.indexOf('qq.com') >= 0) {
        console.log('腾讯embed的地址', $(this.infor.videoUrlFlash).attr('src'))
        this.infor.videoSourceTyoe = 'qqiframe'
        this.infor.realUrl = $(this.infor.videoUrlFlash).attr('src')

        this.infor.picStyles = 5
        return 'qqiframe'
      }

      if (_isEmbed && this.infor.videoUrlFlash.indexOf('qq.com') >= 0) {
        console.log('腾讯iframe的地址', $(this.infor.videoUrlFlash).attr('src'))
        this.infor.videoSourceTyoe = 'qqembed'
        this.infor.realUrl = $(this.infor.videoUrlFlash).attr('src')

        this.infor.picStyles = 6
        return 'qqembed'
      }

      return 'mp4'
    },
    myblur(value) {}
  },
  components: {},
  mounted() {}
}
</script>
<style >
</style>

