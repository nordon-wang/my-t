// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import myajax from './js/ajax';
import axios from 'axios';


//jquery-ui中引入了jq，然后这里直接引入jq-ui就行
import $ from './js/jquery-ui';
//import ElementUI from 'element-ui';
import {
    Checkbox,
    Button,
    Select,
    Input,
    InputNumber,
    Switch,
    Radio,
    Tabs,
    Icon,
    Dialog,
    Table,
    TabPane,
    Loading,
    Option,
    Alert,
    ColorPicker,
    Message,
    Notification,
    RadioGroup,
    RadioButton,
    Pagination,
    Upload,
    Slider,
    Col,
    Row,
    Tooltip,
    MessageBox,
    TableColumn,
    Collapse,
    CollapseItem,
    CheckboxGroup
} from 'element-ui';
import store from './vuex/store';
// var store = require('@/vuex/store.js')
import TempletPerson from './base/row';
import Templet from './base/row_extend';
import TempletX from './base/row_extend_x';
import 'element-ui/lib/theme-chalk/index.css';
//import 'font-awesome/css/font-awesome.min.css'
import '../static/css/font-awesome.min.css'
import './css/base.css';
import './css/jquery_ui.css';
import './css/style_y.css';
import './css/style_wy.css';
import './css/style_x.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import animate from 'animate.css';


// 富文本框引入
import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/kindeditor-all-min.js'
// import '../static/js/kindeditor-all.js'
import 'kindeditor/themes/default/default.css'

// codemirror 引入和使用
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodemirror)


//自己封装的组件，注册为全局组件
import myNumber from './view/public/edit_number';
import editAnimated from './view/public/edit_animated';
import editEffects from './view/public/edit_effects';
import mySelect from './view/public/edit_select';
import myColor from './view/public/edit_color';
import picSelect from './view/public/pic_select';
import myDefaultstyle from './view/public/edit_defaultStyle';
import myBorder from './view/public/edit_boder';
import myInput from './view/public/edit_input';
import myImg from './view/public/edit_img';
import myIcon from './view/public/edit_icon';
import imgEffect from './view/public/index_effect_img';
import iconSearch from './view/public/icon_search';
import myTooltip from './view/public/edit_tooltip';
import myThumbnail from './view/public/module_thumbnail';
import myDistance from './view/public/edit_distance';
import myEditList from './view/public/edit_list';
import myComputed from './view/public/edit_computed';
import { log } from 'util';
//import '@/service/mock';

Vue.config.productionTip = false;
// 注册 vue-kikindeditor plugin
Vue.use(VueKindEditor);

Vue.prototype.axios = axios;


// 注册一个全局前置守卫
// 配置页面的title  在路由中进行配置 meta:{title:'xxx'}
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        // 将路由中meta中title拿来赋值给页面的title
        document.title = to.meta.title
    }
    next();
});

Vue.use(animate);
Vue.config.productionTip = false;
//Vue.use(ElementUI);
Vue.use(Select);
Vue.use(Upload);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(Dialog);
Vue.use(Checkbox);
Vue.use(Button);
Vue.use(Table);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(TabPane);
Vue.use(Loading);
Vue.use(Option);
Vue.use(Alert);
Vue.use(ColorPicker);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Pagination);
Vue.use(Slider);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(Switch);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(CheckboxGroup);

// Vue.prototype.$message = Message;
// Vue.prototype.$notify = Notification;
Object.defineProperty(Vue.prototype, '$message', { value: Message });
Object.defineProperty(Vue.prototype, '$notify', { value: Notification });

Object.defineProperty(Vue.prototype, '$confirm', { value: MessageBox.confirm });

Vue.use(VueAwesomeSwiper, /* { default global options } */ );


Vue.component('my-number', myNumber);
Vue.component('my-animated', editAnimated);
Vue.component('my-effects', editEffects);
Vue.component('my-select', mySelect);
Vue.component('my-color', myColor);
Vue.component('my-input', myInput);
Vue.component('my-tooltip', myTooltip);
Vue.component('my-distance', myDistance);
Vue.component('picSelect', picSelect);
Vue.component('my-defaultstyle', myDefaultstyle);
Vue.component('my-border', myBorder);
Vue.component('my-img', myImg);
Vue.component('my-icon', myIcon);
Vue.component('img-effect', imgEffect);
Vue.component('icon-search', iconSearch);
Vue.component('my-thumbnail', myThumbnail);
Vue.component('my-edit-list', myEditList);
Vue.component('my-computed', myComputed);

//公共方法定义到Vue原型中，全局调用在this.templet
Vue.prototype.templet = new TempletX(Vue);

window.myVm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App },
});