//所有下拉菜单配置
//value和label属性类型是string
export default {
  pageType:[
    {
      value: 'point',
      label: '点状'
    },
    {
      value: 'thumbnail',
      label: '缩略图'
    }
  ],
  open:[
    {
      value: '_blank',
      label: '新窗口打开'
    }, {
      value: '_self',
      label: '当前窗口打开'
    }
  ],
  twoBtn:[
    {
      value: 'block',
      label: '开启'
    },{
      value: 'none',
      label: '关闭'
    }
  ],
  pagination:[
    {
      value: 'false',
      label: '关闭'
    },{
      value: 'fraction',
      label: '数字型'
    },{
      value: 'progress',
      label: '进度条'
    },{
      value: 'bullets',
      label: '按钮型'
    }
  ],
  speed:[
    {value: 300,label: '0.3秒'},
    {value: 500,label: '0.5秒'},
    {value: 700,label: '0.7秒'},
    {value: 1000,label: '1秒'},
    {value: 1200,label: '1.2秒'},
    {value: 1500,label: '1.5秒'},
    {value: 2000,label: '2秒'},
    {value: 2500,label: '2.5秒'},
    {value: 3000,label: '3秒'},
  ],
  banner_nimation:[
    {value: 'fade',label: '淡入淡出'},
    {value: 'slide',label: '滑动'},
    {value: 'flip',label: '翻牌'},
    {value: 'cube',label: '3d方块'},
    {value: 'coverflow',label: '相册'},
  ],
  pattern:[
    {value: 'horizontal',label: '横向'},
    {value: 'vertical',label: '纵向'},
  ],
  textOpen:[
    {
      value: 'block',
      label: '开启'
    }, {
      value: 'none',
      label: '关闭'
    }
  ],
  textAlign:[
    {
      value: 'left',
      label: '居左'
    },
    {
      value: 'center',
      label: '居中'
    },
    {
      value: 'right',
      label: '居右'
    },
  ],
  borderStyle: [
    {value: 'none', label: '无边框'},
    {value: 'dotted', label: '点虚线'},
    {value: 'dashed', label: '虚线'},
    {value: 'solid', label: '实线'}
  ],
  backgroundRepeat: [
    {value: 'repeat', label: '平铺'},
    {value: 'no-repeat', label: '不平铺'},
    {value: 'repeat-x', label: '横向平铺'},
    {value: 'repeat-y', label: '纵向平铺'},
  ],
  backgroundPosition:[
    {value: 'top left', label: '上-左'},
    {value: 'top center', label: '上-中'},
    {value: 'top right', label: '上-右'},
    {value: 'center left', label: '中-左'},
    {value: 'center center', label: '中-中'},
    {value: 'center right', label: '中-右'},
    {value: 'bottom left', label: '下-左'},
    {value: 'bottom center', label: '下-中'},
    {value: 'bottom right', label: '下-右'},
  ],
  gobackFun:[
    {value: 'top', label: '返回顶部'},
    {value: 'back', label: '返回上一级'}
  ],
  locationFun:[
    {value: 'default', label: '默认数据'},
    {value: 'self', label: '自定义数据'}
  ],
  videoStyle:[
    {value: 'mp', label: 'mp4'},
    {value: 'flash', label: 'flash'}
  ],
  videoPosition:[
    {value: 'absolute', label: '常规定位'},
    {value: 'fixed', label: '绝对定位'}
  ],
  myDirective:[
    {value: 'left', label: '横向'},
    {value: 'none', label: '纵向'}
  ],
  customOption:[
    {value: '0', label: '滚动定位'},
    {value: '1', label: '正常定位'},
    {value: '2', label: '绝对定位'}
  ],
  customOptionTwo:[
    {value: '0', label: '关闭'},
    {value: '1', label: '开启'}
  ],
  customOptionTwo2:[
    {value: '0', label: '开启'},
    {value: '1', label: '关闭'}
  ],
  fontStyle:[
    {value: 0, label: '默认'},
    {value: 1, label: '斜体'}
  ],
  fontWeight:[
    {value: 0, label: '默认'},
    {value: 1, label: '加粗'}
  ],
  myFontWeight:[
    {value: 'normal', label: '默认'},
    {value: 'bold', label: '粗体一'},
    {value: 'bolder', label: '粗体二'},
    {value: 'lighter', label: '细体'},
    /*{value: '100', label: '100'},
    {value: '200', label: '200'},
    {value: '300', label: '300'},
    {value: '400', label: '400'},
    {value: '500', label: '500'},
    {value: '600', label: '600'},
    {value: '700', label: '700'},
    {value: '800', label: '800'},
    {value: '900', label: '900'}*/
  ],
  myFontWeight2:[
    {value: 'normal', label: '默认'},
    {value: 'bolder', label: '粗体'},
    {value: 'lighter', label: '细体'}
  ],
  linkStatus:[
    {value: 'underline', label: '存在'},
    {value: 'none', label: '无'}
  ],
  twoBtns:[
    {
      value: 'true',
      label: '显示'
    },{
      value: 'flase',
      label: '隐藏'
    }
  ],
  emitStyles:[
    {
      value: 'hover',
      label: '悬浮'
    },{
      value: 'click',
      label: '点击'
    }
  ],
  sportStyles:[
    {
      value: 'fade',
      label: '淡入淡出'
    },{
      value: 'slide',
      label: '滑动'
    }
  ],
  target:[
      {value: 'true',label: '新窗口打开'},
      {value: 'false',label: '当前窗口打开'},
  ],
    listType:[
        {value: 'product',label: '产品'},
        {value: 'case',label: '案例'},
        {value: 'article',label: '新闻'},
        {value: 'video',label: '视频'},
        /*{value: 'download',label: '下载'},*/
        {value: 'help',label: '帮助'},
        {value: 'productRelevant',label: '产品相关'},
        {value: 'caseRelevant',label: '案例相关'},
        {value: 'articleRelevant',label: '新闻相关'},
        {value: 'videoRelevant',label: '视频相关'},
        {value: 'downloadRelevant',label: '下载相关'},
        {value: 'helpRelevant',label: '帮助相关'},
        {value: 'productNew',label: '最新产品'},
        {value: 'caseNew',label: '最新案例'},
        {value: 'articleNew',label: '最新新闻'},
        {value: 'videoNew',label: '最新视频'},
        {value: 'helpNew',label: '最新帮助'},

    ],
    timePattern:[
        {value: 'ordinary', label: '普通模式'},
        {value: 'UpAndDown', label: '上下模式'},
    ],
    selectPattern:[
        {value: 'click', label: '鼠标点击'},
        {value: 'hover', label: '鼠标悬浮'}
    ],
    animation:[
        {value:'puff ', label: '膨胀'},
        {value:'explode', label: '爆炸'},
        {value:'fade', label: '淡入淡出'},
        {value:'scale', label: '缩放'},

        {value:'slide', label: '滑动'},
        {value:'blind', label: '百叶窗'},
        {value:'drop', label: '降落'},
        {value:'fold', label: '折叠'},

    ],
    time:[
        {value:200, label: '0.2秒'},
        {value:400, label: '0.4秒'},
        {value:600, label: '0.6秒'},
        {value:800, label: '0.8秒'},
        {value:1000, label: '1秒'}
    ],
    direction:[
        {value:'up', label: '从上往下'},
        {value:'down', label: '从下往上'},
        {value:'left', label: '从左往右'},
        {value:'right', label: '从右往左'},
    ],
    box: [ //容器类型
        {
            value: 'horizontal',
            label: '横向'
        }, {
            value: 'vertical',
            label: '纵向'
        }
    ],
    timeInterval: [
        {
            value: 0,
            label: '不滚动'
        }, {
            value: 1000,
            label: '1秒'
        }, {
            value: 2000,
            label: '2秒'
        }, {
            value: 3000,
            label: '3秒'
        }, {
            value: 5000,
            label: '5秒'
        }, {
            value: 10000,
            label: '10秒'
        }, {
            value: 20000,
            label: '20秒'
        }, {
            value: 30000,
            label: '30秒'
        }, {
            value: 60000,
            label: '60秒'
        }, {
            value: 90000,
            label: '90秒'
        }, ],
    isOpen:[
        {value:'true', label: '开启'},
        {value:'false', label: '关闭'},
    ],
    display:[
        {value:'block', label: '显示'},
        {value:'none', label: '隐藏'},
    ],
    ani:[
        {value:'puff ', label: '膨胀'},
        {value:'explode', label: '爆炸'},
        {value:'fade', label: '淡入淡出'},
        {value:'scale', label: '缩放'},
        {value:'slide', label: '滑动'},
        {value:'blind', label: '百叶窗'},
        {value:'drop', label: '降落'},

    ],
    linksStyle:[
        {value:'none', label: '不跳转'},
        {value:'self', label: '自定义'},
    ],
  picarticle_target:[
    {
      value: '_blank',
      label: '新窗口打开'
    },
    {
      value: '_self',
      label: '当前窗口打开'
    }
  ],
  listandpage_listType:[
    {value:'product', label: '产品列表'},
    {value:'article', label: '新闻列表'},
    {value:'case', label: '成功案例'},
    {value:'search', label: '搜索'},
    {value:'download', label: '下载'},
    {value:'video', label: '视频'},
    {value:'help', label: '帮助'},
  ],
  listandpage_Pattern:[
    {value:'list', label: '列表模式'},
    {value:'recommend', label: '推荐模式'},
  ],
  heightType:[
    {value:'num', label: '自由设置'},
    {value:'auto', label: '自适应'},
  ],
  someColor:[
    {value:'0', label: '颜色一致'},
    {value:'1', label: '颜色不一致'},
  ],
  glassMethod:[
    {value:'hover', label: '悬浮'},
    {value:'click', label: '点击'},
  ],
  helpsStyle:[
    {value:'1', label: '全部展开'},
    {value:'2', label: '首个展开'},
    {value:'3', label: '全部不展开'}
  ],
  helpsAni:[
    {value:'swing', label: '摇摆运动'},
    {value:'linear', label: '线性运动'}
  ],
  catelog_animation:[
    {value: 'toggle',label: '渐进'},
    {value: 'slide',label: '滑动'},
    {value: 'fade',label: '淡入淡出'},
  ],
  sort:[
    {value:'swiper',label: '超出滚动'},
    {value:'float',label: '超出换行'},

  ],
  jobsOptions:[
    {value:'subject',label: '招聘职位'},
    {value:'num',label: '招聘人数'},
    {value:'salary',label: '工资待遇'},
    {value:'unit',label: '招聘单位'},
    {value:'createtime',label: '创建时间'},
    {value:'exp_date',label: '招聘期限'},
    {value:'name',label: '联系人'},
    {value:'tel',label: '联系电话'},
    {value:'email',label: '电子邮件'},
    {value:'address',label: '工作地址'},
  ],
  jobsOptions2:[
    {value:'subject',label: '招聘职位'},
    {value:'num',label: '招聘人数'},
    {value:'salary',label: '工资待遇'},
    {value:'unit',label: '招聘单位'},
    {value:'createtime',label: '创建时间'},
    {value:'exp_date',label: '招聘期限'},
    {value:'name',label: '联系人'},
    {value:'tel',label: '联系电话'},
    {value:'email',label: '电子邮件'},
    {value:'address',label: '工作地址'},
    {value:'gotolink',label: '查看详情'},
  ],
  jobsTrue:[
    {value:'true',label: '显示'},
    {value:'false',label: '隐藏'},
  ],
  jobsOpen1:[
    {value:'yes',label: '显示'},
    {value:'no',label: '隐藏'},
  ],
  jobsOpen2:[
    {value:'yes',label: '展开'},
    {value:'no',label: '缩放'},
  ],
  jobsOpen3:[
    {value:'yes',label: '开启'},
    {value:'no',label: '关闭'},
  ],
  fixed:[
      { value:'fixed',label:'固定中'},
      { value:'static',label:'未固定'}
  ],
  zhSelect:[
      { value:'宋体',label:'宋体'},
      { value:'微软雅黑',label:'微软雅黑'},
      { value:'黑体',label:'黑体'}
  ],
  enSelect:[
    { value:'Arial',label:'Arial'},
    { value:'Helvetica',label:'Helvetica'},
    { value:'sans-serif',label:'sans-serif'}
  ],
  videoAutoplay:[
    { value:'autoplay',label:'开启'},
    { value:'',label:'关闭'}
  ],
  videoLoop:[
    { value:'loop',label:'开启'},
    { value:'',label:'关闭'}
  ],
  videoControl:[
    { value:'true',label:'开启'},
    { value:'false',label:'关闭'}
  ],
  fontFamilyZh:[{"value":"宋体, SimSun","label":"宋体"},{"value":"新细明体, PMingLiU","label":"新细明体"},{"value":"仿宋_GB2312,FangSong_GB2312","label":"仿宋_GB2312"},{"value":"微软雅黑, Microsoft YaHei","label":"微软雅黑"},{"value":"隶书, SimLi","label":"隶书"},{"value":"幼圆","label":"幼圆"},{"value":"华文楷体 ,STKaiti","label":"华文楷体"},{"value":"方正舒体","label":"方正舒体"},{"value":"华文行楷","label":"华文行楷"},{"value":"华文彩云","label":"华文彩云"},{"value":"华文宋体","label":"华文宋体"},{"value":"楷体,楷体_GB2312,SimKai","label":"楷体"},{"value":"黑体, SimHei","label":"黑体"}],
  fontFamilyEn:[{"value":"Tahoma, 微软雅黑","label":"Tahoma"},{"value":"impact, 微软雅黑","label":"impact"},{"value":"Arial Serif, 微软雅黑","label":"Arial Serif"},{"value":"Times New Roman, 微软雅黑","label":"Times New Roman"},{"value":"Arial,微软雅黑","label":"Arial"},{"value":"Georgia, 微软雅黑","label":"Georgia"},{"value":"Garamond, 微软雅黑","label":"Garamond"},{"value":"andale mono, 微软雅黑","label":"andale mono"},{"value":"arial black, avant garde, 微软雅黑","label":"arial black"},{"value":"comic sans ms, 微软雅黑","label":"comic sans ms"}],
    list_display:[
        {value:'true', label: '显示'},
        {value:'false', label: '隐藏'},
    ],
    editThemes:[
      { value:'monokai',label:'monokai'},
      { value:'ambiance',label:'ambiance'},
      { value:'base16-dark',label:'base16-dark'},
      { value:'base16-light',label:'base16-light'},
      { value:'paraiso-light',label:'paraiso-light'},
      { value:'cobalt',label:'cobalt'},
      { value:'rubyblue',label:'rubyblue'},
    ],
}
