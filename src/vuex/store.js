import Vue from 'vue';
import Vuex from 'vuex';
import align from './modules/align';
import MultiSelect from './modules/MultiSelect';
import special_mongolian from './modules/special_mongolian';
import historical from './modules/historical_records';
import test from './modules/PendantList';
import * as actions from './actions'
import * as getters from './getters';


import options from '../base/select_options_config';
import { log } from 'util';
Vue.use(Vuex);

if (process.env.NODE_ENV === 'development') {
    var my_config = require('../../config/index');
}


// 应用初始状态
const state = {
    domain: '', //全局域名
    theme_id: '', //全局模板id,
    username: '', //全局用户名
    isMdouleShow: false,
    module_name: '', //当前选中的挂件名称basic_banner
    parts: 'name', //当前选中的部件名
    hover_parts: '', //当前悬浮选中的部件名
    widgets_id: 1000000, //前端模拟挂件id
    PendantList: [], //挂件列表
    header: [], //头部（数据源）
    body: [], //身体（数据源）
    footer: [], //底部（数据源）
    module_Data: null, //当前编辑的中转 对象,只做中转用，储存的挂件id，名字是对的，但是挂件的data不同步，要获取当前挂件数据，请在数据源里取
    options: options, //全局下拉框内容配置
    showPicCon: false, //图片选择容器
    imgUrls: null, //图片选择的图片url(回调函数的中转),
    styleSave_IsOpen: false, //样式保存
    editing_block: 'body', //正在编辑的模块，body、header、footer
    icon_IsOpen: false, //图标选择的开关
    icon_Callback: null, //选择图标的回调函数中转
    icon_select_now: 'fa-adjust', //当前选中的图标
    now_page: 'index', //当前选中的页面
    view_module: 'index:index', // 预览的 M 值
    localName: '首页',
    localTitle: '首页',
    pagewidth:980,//全局设置 页面宽度
    showCustomModel: false, //控制 富文本的 弹出框
    test_count: 0,
    showMyMask: false, //遮罩层
    show_my_dodel: false,
    module_checked:{},
    module_checked_rowtype:'',
    changePage: false, //切换页面 遮罩层
    right_sidebar_isShow: false, //图层开关
    //当前选中的挂件集合
    select_module: {
        jsonArr: [], //用来查找module
        idArr: [], //控制视图渲染

    },
    mousedown_front: {
        child_length: 0, //记录清空前选中个数
        row_id: ''
    },
    select_row: null, //当前选中的row
    finishSave: true,
    //开启固定的row
    fixed: {
        id: '',
        top: '',
        height: ''
    },
    allSetFont: {},
    guideColor: '#06f', //标尺线的颜色
    initStatus: false, //初始化是否完成
    copy_module_list: [], //复制module
    copy_row: null, //储存复制的row
    copy_board:null,//复制板
    copy_type: '',
    template_is_show:false,//模板保存
    row_group_is_show:false,//容器组合
    default_picture:require('../../static/image/pic.png'),
    add_module_prompt:false,
    addNewModule:false, //判断是否为拖拽至新挂件的状态
    modulePostion:true,//挂件fixed定位之后 不能设置module的left top
    rank:'',//用户身份
    historyIsChange:false, //判断当前页面的历史记录 是否改变
};
//获取url的参数---------
//获取url的参数---------
//如果php变量中存在，则直接获取,正式环境下运行
if (process.env.NODE_ENV === 'production') {

    //处理theme_id
    if (my_theme_id && my_theme_id != '{$theme_id}') {
        state.theme_id = my_theme_id;
    }
    //反之通过url获取
    else {
        var hrefStr = window.location.href;
        var hrefArr = hrefStr.split('?');
        let theme_id = '';
        if (hrefArr.length > 1) {
            var searchArr = hrefArr[1].split('&');
            for (let i = 0; i < searchArr.length; i++) {
                if (searchArr[i].indexOf('theme_id=') > -1) {
                    theme_id = searchArr[i].replace('theme_id=', '');
                    break;
                }
            }
        }
        if (theme_id) {
            state.theme_id = theme_id;
        }
    }

    //处理username
    state.username = my_username;

    //处理用户身份
    state.rank = rank;
} else {
    state.username = my_config.dev.new_station_username;
    state.theme_id = my_config.dev.new_station_theme_id;
    state.domain = my_config.dev.proxyTable['/index_pc.php'].target;
    //处理用户身份(开发环境里面，我是最高权限)
    state.rank = 'designer';
}

const PendantList = [{
    name: 'basic_picture',
    title: '图片',
    icon: require('../../static/image/nav1/img.png')
}, {
    name: 'basic_date',
    title: '日期',
    icon: require('../../static/image/nav1/date.png')
}, {
    name: 'basic_goback',
    title: '返回',
    icon: require('../../static/image/nav1/back.png')
}, {
    name: 'basic_location',
    title: '当前位置',
    icon: require('../../static/image/nav1/map2.png')
}, {
    name: 'basic_locationtitle',
    title: '当前标题',
    icon: require('../../static/image/nav1/title.png')
}, {
    name: 'basic_video',
    title: '视频',
    icon: require('../../static/image/nav1/video.png')
}, {
    name: 'basic_searchs',
    title: '搜索',
    icon: require('../../static/image/nav1/search.png')
}, {
    name: 'basic_language',
    title: '多语言',
    icon: require('../../static/image/nav1/language.png')
}, {
    name: 'basic_customedit',
    title: '自定义内容',
    icon: require('../../static/image/nav1/diy.png')
}, {
    name: 'basic_links',
    title: '链接',
    icon: require('../../static/image/nav1/link.png')
}, {
    name: 'basic_nleavemessage',
    title: '留言',
    icon: require('../../static/image/nav1/contentDetail.png')
}, {
    name: 'basic_webmap',
    title: '站点地图',
    icon: require('../../static/image/nav1/stationMap.png')
}, {
    name: 'basic_pages',
    title: '页码',
    icon: require('../../static/image/nav1/page.png')
}, {
    name: 'basic_magnifyingglass',
    title: '放大镜',
    icon: require('../../static/image/nav1/big.png')
}, {
    name: 'basic_helps',
    title: '帮助',
    icon: require('../../static/image/nav1/help.png')
}, {
    name: 'basic_jobs',
    title: '招聘',
    icon: require('../../static/image/nav1/join.png')
}, {
    name: 'basic_jobdetail',
    title: '招聘详情',
    icon: require('../../static/image/nav1/joinDetail.png')
}, {
    name: 'basic_map',
    title: '地图',
    icon: require('../../static/image/nav1/map.png')
}, {
    name: 'basic_text_editor',
    title: '快速文本',
    icon: require('../../static/image/nav1/font.png')
}, {
    name: 'basic_listAndPage',
    title: '列表与分页',
    icon: require('../../static/image/nav1/listPage.png')
}, {
    name: 'basic_detailarticle',
    title: '文章详情',
    icon: require('../../static/image/nav1/contentDetail.png')
}, {
    name: 'basic_banner',
    title: '轮播图',
    icon: require('../../static/image/nav1/swiper.png')
}, {
    name: 'basic_catelog',
    title: '分类',
    icon: require('../../static/image/nav1/sort.png')
}, {
    name: 'basic_honor',
    title: '荣誉资质',
    icon: require('../../static/image/nav1/hero.png')
}, {
    name: 'basic_honor_rl',
    title: '荣誉列表',
    icon: require('../../static/image/nav1/heroList.png')
}, {
    name: 'basic_navtmp',
    title: '导航',
    icon: require('../../static/image/nav1/nav.png')
}, {
    name: 'basic_picarticle_a',
    title: '图文展示',
    icon: require('../../static/image/nav1/picshow.png')
}, {
    name: 'basic_code',
    title: '高级代码',
    icon: require('../../static/image/nav1/picshow.png')
}, ];
// basic_map

state.PendantList = PendantList;


//-----------------------------------


// 定义所需的 mutations
//这里mutations的所有方法，我会加到vue原型链里面去，为了不和row.js里面的方重名，这里需要遵循命名规则，所有方法名加上前缀m_
const mutations = {

    m_change_module_Data(state, val) {
        state.module_Data = val
    },

    test(state, { rowType, target_index, move_module }) {
        state[rowType][target_index].children.push(move_module);
    },

    add_counts(state, num) {
        // test_count
        state.test_count += num;
    },
    CHANGCOLOR(state, val) {
        state.guideColor = val;
    },
    CHANGEINITSTATUS(state) {
        state.initStatus = true;
    },
    historyChange(state,bol){
        state.historyIsChange = bol;
    }



};

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    modules:{
        align,
        MultiSelect,
        special_mongolian,
        historical,
        test
    },
    state,
    mutations
})