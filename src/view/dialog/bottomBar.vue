<template>
  <div class="bottomBar" :class="isShow ? 'bottomBarShow' : ''">
    <h1 class="edit_title">
      <i class="el-icon-edit" v-if="$store.state.parts == '' || $store.state.module_name === 'public_defaultStyle'"></i>
      <i class="el-icon-back" v-if="$store.state.parts != '' && $store.state.module_name != 'public_defaultStyle'" @click="back"></i>
      <span>{{editName}}</span>
      <span v-show="$store.state.parts != '' && $store.state.module_name != 'public_defaultStyle'" class="bottom_second">/ {{second}}</span>
      <i class="el-icon-circle-close-outline close" @click="templet.p_bottomBar_close()"></i>
    </h1>

    <div class="content">

      <component :is="getModuleName"></component>

      <public-animated
        v-if="$store.state.module_name == 'public_animated'"
      ></public-animated>

      <basic-module
        v-if="$store.state.module_name == 'basic_module'">
      </basic-module>

      <public-defaultStyle
        v-if="$store.state.module_name == 'public_defaultStyle'"
      ></public-defaultStyle>

      <public-effects
        v-if="$store.state.module_name == 'public_effects'"
      ></public-effects>

      <!-- <layout-row-edit
        v-if="$store.state.module_name == 'layout_row'"
      ></layout-row-edit> -->

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import publicAnimated from '../public/edit_animated';
  //import basicModule from '../../widgets/basic_module/edit';
  import publicDefaultStyle from '../public/edit_defaultStyle';

  // import basicDateEdit from '../../widgets/basic_date/edit';
  //import basicBannerEdit from '../../widgets/basic_banner/edit';
  //import basicPictureEdit from '../../widgets/basic_picture/edit';
  // import basicDate from '../../widgets/basic_date/edit';
  import publicEffects from '../public/edit_effects';
  //import layoutRowEdit from '../../widgets/layout_row/edit';
  import styleList from '../../base/style_list_config';
  // import basicGobackEdit from '../../widgets/basic_goback/edit';
  // import basicLocationEdit from '../../widgets/basic_location/edit';
  // import basicLocationtitleEdit from '../../widgets/basic_locationtitle/edit';
  // import basicVideoEdit from '../../widgets/basic_video/edit';
  // import basicSearchsEdit from '../../widgets/basic_searchs/edit';
  //import basicLanguageEdit from '../../widgets/basic_language/edit';
  // import basicCustomeditEdit from '../../widgets/basic_customedit/edit';
  // import basicGratextEdit from '../../widgets/basic_gratext/edit';
  //import basicLinksEdit from '../../widgets/basic_links/edit';
  // import basicNleavemessageEdit from '../../widgets/basic_nleavemessage/edit';
  //import basicNavtmpEdit from '../../widgets/basic_navtmp/edit';
  //import basicPicarticleAEdit from '../../widgets/basic_picarticle_a/edit';
  //import basicWebmapEdit from '../../widgets/basic_webmap/edit';
  //import basicListandpageEdit from '../../widgets/basic_listandpage/edit';
  // import basicPagesEdit from '../../widgets/basic_pages/edit';
  //import basicDetailarticleEdit from '../../widgets/basic_detailarticle/edit';
  // import basicMagnifyingglassEdit from '../../widgets/basic_magnifyingglass/edit';
  // import basicHelpsEdit from '../../widgets/basic_helps/edit';
  // import basicJobsEdit from '../../widgets/basic_jobs/edit';
  // import basicJobdetailEdit from '../../widgets/basic_jobdetail/edit';
  // import basicMapEdit from '../../widgets/basic_map/edit';
  // basicLinksEdit 组件名称 要规范 不然渲染不出来

  export default {
    name: 'bottomBar',
    data () {
      return {
        isShow:false,
        editName:'',
        second:'',
        //所有能够触发底部编辑栏的挂件配置
        moduleList:[
          'layout_row',
          'basic_banner',
          'basic_picture',
          'basic_date',
          'public_animated',
          'public_defaultStyle',
          'public_effects',
          'basic_module',
          'basic_goback',
          'basic_location',
          'basic_locationtitle',
          'basic_video',
          'basic_searchs',
          'basic_language',
          'basic_customedit',
          'basic_gratext',
          'basic_links',
          'basic_nleavemessage',
          'basic_navtmp',
          'basic_picarticle_a',
          'basic_webmap',
          'basic_listAndPage',
          'basic_pages',
          'basic_detailarticle',
          'basic_magnifyingglass',
          'basic_helps',
          'basic_jobs',
          'basic_jobdetail',
          'basic_map',
          'basic_catelog',
          'basic_honor',
          'basic_honor_rl',
          'basic_code'
        ]

      }
    },
    watch:{
      //监听当前选中的挂件,从而决定不同的编辑渲染
      '$store.state.module_name':function (val) {
        let isHave = this.moduleList.indexOf(val);
        if( isHave >= 0){
          this.isShow = true;
          const widgets_id = this.$store.state.module_Data.widgets_id;
          this.templet.module_scroll(widgets_id);
        }
        else{
          this.isShow = false;
        }

        this.editName = this.templet.p_nameToChinese(val);

        //监听列表与分页的部件拖拽
        this.templet.module_draggable_state(val,'li_move','basic_listAndPage');
        this.templet.module_draggable_state(val,'detailarticle_move','basic_detailarticle');
        //监听页码的部件拖拽
        this.templet.basic_pages_draggable_state(val);
        //监听表单的部件拖拽
        this.templet.basic_nleavemessage_draggable_state(val);

        //为了让当前编辑的挂件高亮，把父元素的z-index干掉
          if(val != ''){
            const row_id = this.$store.state.module_Data.pid;
            $(`#u${row_id}`).addClass('clear_z-index');
          }
          else{
              const row_arr = $('.layout_row');
              for(let i = 0;i<row_arr.length;i++){
                  if($(row_arr[i]).hasClass('clear_z-index')){
                      $(row_arr[i]).removeClass('clear_z-index');
                  }
              }
          }

      },
      '$store.state.parts':function (val) {
        if(this.$store.state.module_name){
          this.second = this.templet.p_partsToChinese(val);
        }
      }
    },
    computed:{
      getModuleName(){
        let str = this.$store.state.module_name;
        // 初始化判断 为空字符串时  不显示底部弹出框
        if(str){
          let newStr = str.replace(/\_/ig,'-') + '-edit';
          // 自定义文本 链接 basic_module 动画 留言
          // 特殊处理的 不需要显示底部弹出框
          if(newStr != 'public-defaultStyle-edit' &&
           newStr != 'basic-customedit-model-edit' &&
           newStr != 'basic-links-model-edit' &&
           newStr != 'public-animated-edit' &&
           newStr != 'basic-module-edit' &&
           newStr != 'public-effects-edit' &&
           newStr != 'basic-nleavemessage-model-edit' ){
            return newStr;
          }
        }

        return '';
      }
    },
    methods:{
      back(){
        this.$store.state.parts = '';
      },
      close(){
        this.$store.state.module_name = '';
        this.$store.state.parts = '';
        this.$store.state.module_Data = null;
        this.$store.state.hover_parts = '';

      }
    },
    components:{
      basicBannerEdit(resolve){
        require(['../../widgets/basic_banner/edit'], resolve);
      },
      basicPictureEdit(resolve){
        require(['../../widgets/basic_picture/edit'], resolve);
      },
      layoutRowEdit(resolve){
        require(['../../widgets/layout_row/edit'], resolve);
      },
      publicAnimated,
      publicDefaultStyle,
      publicEffects,
      basicModule(resolve){
        require(['../../widgets/basic_module/edit'], resolve);
      },
      basicLanguageEdit(resolve){
        require(['../../widgets/basic_language/edit'], resolve);
      },
      basicLinksEdit(resolve){
        require(['../../widgets/basic_links/edit'], resolve);
      },
      basicNavtmpEdit(resolve){
        require(['../../widgets/basic_navtmp/edit'], resolve);
      },
      basicPicarticleAEdit(resolve){
        require(['../../widgets/basic_picarticle_a/edit'], resolve);
      },
      basicWebmapEdit(resolve){
        require(['../../widgets/basic_webmap/edit'], resolve);
      },
      basicListAndPageEdit(resolve){
        require(['../../widgets/basic_listandpage/edit'], resolve);
      },
      basicDetailarticleEdit(resolve){
        require(['../../widgets/basic_detailarticle/edit'], resolve);
      },
      basicDateEdit(resolve){
        require(['../../widgets/basic_date/edit'], resolve);
      },
      basicGobackEdit(resolve){
        require(['../../widgets/basic_goback/edit'], resolve);
      },
      basicLocationEdit(resolve){
        require(['../../widgets/basic_location/edit'], resolve);
      },
      basicLocationtitleEdit(resolve){
        require(['../../widgets/basic_locationtitle/edit'], resolve);
      },
      basicVideoEdit(resolve){
        require(['../../widgets/basic_video/edit'], resolve);
      },
      basicSearchsEdit(resolve){
        require(['../../widgets/basic_searchs/edit'], resolve);
      },
      basicCustomeditEdit(resolve){
        require(['../../widgets/basic_customedit/edit'], resolve);
      },
      basicGratextEdit(resolve){
        require(['../../widgets/basic_gratext/edit'], resolve);
      },
      basicNleavemessageEdit(resolve){
        require(['../../widgets/basic_nleavemessage/edit'], resolve);
      },
      basicPagesEdit(resolve){
        require(['../../widgets/basic_pages/edit'], resolve);
      },
      basicMagnifyingglassEdit(resolve){
        require(['../../widgets/basic_magnifyingglass/edit'], resolve);
      },
      basicHelpsEdit(resolve){
        require(['../../widgets/basic_helps/edit'], resolve);
      },
      basicJobsEdit(resolve){
        require(['../../widgets/basic_jobs/edit'], resolve);
      },
      basicJobdetailEdit(resolve){
        require(['../../widgets/basic_jobdetail/edit'], resolve);
      },
      basicMapEdit(resolve){
            require(['../../widgets/basic_map/edit'], resolve);
      },
      basicCatelogEdit(resolve){
        require(['../../widgets/basic_catelog/edit'], resolve);
      },
      basicHonorEdit(resolve){
        require(['../../widgets/basic_honor/edit'], resolve);
      },
      basicHonorRlEdit(resolve){
        require(['../../widgets/basic_honor_rl/edit'], resolve);
      },
      basicCodeEdit(resolve){
        require(['../../widgets/basic_code/edit'], resolve);
      }
    },
    created(){

    },
    mounted(){
      this.editName = this.templet.p_nameToChinese(this.$store.state.module_name);
    }
  }
</script>
