import Store from '../vuex/store';
import { debug, log } from 'util';

import Event from "../../static/js/Event";
import Dragdrop from "../../static/js/Dragdrop";
import RulersGuides from "../../static/js/RulersGuides";
//如果要使用到全局state，使用Store.state
//基础方法，会加入到vue原型中，全局this.templet+方法名调用
export default class Person_base {
    constructor(Vue) {
        let that = this;
        this.p_$nextTick = Vue.prototype.$nextTick;
        this.p_$forceUpdate = Vue.prototype.$forceUpdate;
        this.p_$message = Vue.prototype.$message;
        this.p_$confirm = Vue.prototype.$confirm;

        //将Store里面的_mutations方法集，打入到本构造函数中，然后再打入到vue原型中，全局this.templet+方法名调用
        Object.keys(Store._mutations).map(function(val) {
            that[val] = Store._mutations[val][0];
        });


        //屏幕宽度
        this.screenWidth = document.documentElement.clientWidth || document.body.clientWidth;

        //屏幕高度
        this.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;

        //前端模拟的widgets_id
        this.widgets_id = 0;

    }

    //在这下面加方法。。。。

    createGuide() {
        $(".main-wrapper").empty();
        $('.rg-menu').remove();
        $('.menu-btn').remove();
        $('.snap-dialog').remove();
        $('.open-dialog').remove();
        var evt = new Event(),
            dragdrop = new Dragdrop(evt);
        var rg = new RulersGuides(evt, dragdrop);


        //console.log(document.body.scrollHeight);

        // console.log($('.rg-overlay').height())
    }

    /*
     * 部件名称翻译
     * */
    p_partsToChinese(value) {
        let str = value;

        let temObj = {
            'goback_set1':'按钮设置',
            'goback_set2':'图标设置',
            'banner_routine':'常规设置',
            'banner_btn':'左右按钮设置',
            'banner_page':'分页器设置',
            'row':'行容器设置',
            'laybox':'居中容器设置',
            'banner_pic':'图片管理',
            'nav_fixed':'固定样式',
            'nav_icon':'图标设置',
            'nav_custom':'自定义样式',
            'box_set':'容器设置',
            'module_attribute':'模块属性',
            'module_img':'图片属性',
            'module_title':'标题属性',
            'module_content':'内容属性',
            'module_time':'时间属性',
            'module_id':'序列属性',
            'class_title':'分类标题',
            'module_header':'组件标题',
            'class_btn':'分类按钮',
            'banner_btn':'轮播按钮',
            'mongolia_layer':'蒙层设置',
            'listandpage_listFrame':'列表容器',
            'listandpage_box':'单个容器',
            'listandpage_hoverAnimation':'蒙层设置',
            'listandpage_listPage':'分页器设置',
            'listandpage_name':'标题组件',
            'listandpage_up_time':'时间组件',
            'listandpage_summary':'简介组件',
            'listandpage_price_sell':'价格组件',
            'listandpage_more':'更多按钮',
            'listandpage_img':'图片组件',
            'listandpage_icon':'图标组件',
            'honor_box':'容器设置',
            'honor_title':'标题设置',
            'honor_module':'单模块设置',
            'honor_module_pic':'单模块图片',
            'honor_module_title':'单模块标题',
            'honor_module_content':'单模块简介',
            'honor_layer':'弹出层设置',
            'catelog_vertical':'整体设置',
            'catelog_title':'标题设置',
            'catelog_oneLevel':'一级栏目',
            'catelog_twoLevel':'二级栏目',
            'catelog_threeLevel':'三级栏目',
            'detailarticle_new_box':'容器',
            'detailarticle_new_header':'标题',
            'detailarticle_new_headerBottom':'副标题',
            'detailarticle_new_img':'图片',
            'detailarticle_new_summary':'简介',
            'detailarticle_new_content':'内容',
            'detailarticle_new_Magnifier':'放大镜留白',
            'detailarticle_productTab':'选项卡',
            'date_set':'日期设置',
            'time_set':'时间设置',
            'button_set':'按钮设置',
            'icon_set':'图标设置',
            'fun_set':'内容设置',
            'honor_pic_box':'图片容器',
            'honor_tab_box':'选项容器',
            'honor_tab_one':'选项设置',
            'map_set':'地图设置',
            'help1':'基础设置',
            'helps1':'基础设置',
            'help2':'图标设置',
            'help3':'默认分页',
            'help4':'分页状态',
            'help5':'问题',
            'help6':'问题标题',
            'help7':'问题图片',
            'help8':'回答',
            'help9':'回答标题',
            'help10':'回答图片',
            'help11':'日期设置',
            'date_set1':'日期设置',
            'date_set2':'时间设置',
            'goback_set1':'按钮设置',
            'goback_set2':'图标设置',
            'jobdetail1':'表头设置',
            'jobdetail2':'标题设置',
            'jobdetail3':'简历按钮',
            'jobs1':'基础设置',
            'jobs2':'图标设置',
            'jobs3':'默认分页',
            'jobs4':'分页状态',
            'jobs5':'简历按钮',
            'jobs6':'招聘职位',
            'jobs7':'行内容',
            'jobs8':'通用设置',
            'jobs9':'表头设置',
            'jobs10':'行内容设置',
            'jobs13':'内容设置',
            'jobs11':'详情设置',
            'jobs12':'栏目设置',
            'language1':'基础设置',
            'language2':'链接设置',
            'language3':'边框设置',
            'language4':'图片设置',
            'language5':'基础设置',
            'links1':'友情链接',
            'links2':'链接动画',
            'links3':'一级链接',
            'links4':'二级链接',
            'links5':'悬浮图片',
            'links6':'链接状态',
            'links7':'图标设置',
            'location1':'内容设置',
            'location2':'图标设置',
            'locationtitle1':'内容设置',
            'big_glass1':'样式设置',
            'big_glass2':'样式设置',
            'big_glass3_big':'展示图',
            'big_glass3_small':'缩略图',
            'leavemessage1':'表单设置',
            'leavemessage2':'配置管理',
            'pages1':'总容器设置',
            'pages2':'页容器设置',
            'pages3':'文本设置',
            'pages4':'链接设置',
            'pages5':'日期设置',
            'picture1':'图片管理',
            'video_set':'视频管理',
            'public_set':'通用设置',
            'first_set':'一级菜单',
            'sec_set':'二级菜单',
            'thr_set':'三级菜单',
            'four_set':'四级菜单',
            'placeholder_set':'提示信息',
            'input_set':'输入框设置',
            'style3_input_set':'输入框设置',
            'iconstyle_set':'图标样式',
            'txt_btn_set':'文本按钮',
            'icon_btn_set':'按钮图标',
            'x_btn_set':'X设置',
            'select_btn_set':'下拉选项',
            'style5_icon_btn_set':'图标样式',
            'search_icon_set':'图标选择',
            'listandpage_dataChoice':'数据类型',
            'custom1':'样式设置',
            'search_style3_icon':'图标样式',
            'code1':'代码管理',
            'code2':'高级代码2',
        };
        str = temObj[value]
        return str
    }

    p_nameToChinese(value) {
        let str = value;
        if (value == 'basic_text') {
            str = '文本组件';
        } else if (value == 'basic_line') {
            str = '线组件';
        } else if (value == 'basic_pic') {
            str = '图片组件';
        } else if (value == 'basic_button') {
            str = '按钮组件';
        } else if (value == 'basic_banner') {
            str = '轮播图组件';
        } else if (value == 'basic_catelog') {
            str = '分类组件';
        } else if (value == 'basic_customer_service') {
            str = '客服会话组件';
        } else if (value == 'basic_detailarticle') {
            str = '文章详情组件';
        } else if (value == 'basic_doublerow') {
            str = '双栏组件';
        } else if (value == 'basic_detailarticle') {
            str = '内容详情组件';
        } else if (value == 'basic_freerow') {
            str = '自由面板组件';
        } else if (value == 'basic_line') {
            str = '线条组件';
        } else if (value == 'basic_map') {
            str = '地图组件';
        } else if (value == 'basic_mleavemessage') {
            str = '留言系统组件';
        } else if (value == 'basic_listAndPage') {
            str = '列表与分页组件';
        } else if (value == 'basic_msearchs') {
            str = '搜索组件';
        } else if (value == 'basic_navbottom') {
            str = '底部导航组件';
        } else if (value == 'basic_pic') {
            str = '图文组件';
        } else if (value == 'basic_pic_list') {
            str = '图片列表组件';
        } else if (value == 'basic_picarticle') {
            str = '图文展示组件';
        } else if (value == 'basic_text') {
            str = '文本组件';
        } else if (value == 'basic_video') {
            str = '视频组件';
        } else if (value == 'basic_dynamic_class') {
            str = '动态分类组件';
        } else if (value == 'basic_navtmp') {
            str = '导航组件';
        } else if (value == 'basic_header') {
            str = '顶部导航组件';
        } else if (value == 'layout_row') {
            str = '容器组件';
        } else if (value == 'public_animated') {
            str = '模块动画组件';
        } else if (value == 'public_effects') {
            str = '模块特效组件';
        } else if (value == 'public_defaultStyle') {
            str = '样式选择';
        } else if (value == 'basic_picarticle_a') {
            str = '图文展示组件';
        } else if (value == 'basic_locationtitle') {
            str = '当前标题组件';
        } else if (value == 'basic_date') {
            str = '日期组件';
        } else if (value == 'basic_goback') {
            str = '返回组件';
        } else if (value == 'basic_location') {
            str = '当前位置组件';
        } else if (value == 'basic_searchs') {
            str = '搜索组件';
        } else if (value == 'basic_language') {
            str = '多语言组件';
        } else if (value == 'basic_customedit') {
            str = '自定义内容组件';
        } else if (value == 'basic_links') {
            str = '链接组件';
        } else if (value == 'basic_links') {
            str = '链接组件';
        } else if (value == 'basic_nleavemessage') {
            str = '留言组件';
        } else if (value == 'basic_picture') {
            str = '图片组件';
        } else if (value == 'basic_text_editor') {
            str = '快速文本组件';
        } else if (value == 'basic_listandpage') {
            str = '列表与分页组件';
        } else if (value == 'basic_pages') {
            str = '页码组件';
        } else if (value == 'basic_honor') {
            str = '荣誉资质';
        } else if (value == 'basic_gratext') {
            str = '单图文';
        } else if (value == 'basic_honor_rl') {
            str = '荣誉列表';
        }
        else if (value == 'basic_module') {
            str = '基础属性';
        }
        else if (value == 'basic_magnifyingglass') {
            str = '放大镜';
        }
        else if (value == 'basic_jobs') {
            str = '招聘组件';
        }
        else if (value == 'basic_helps') {
            str = '帮助组件';
        }
        else if (value == 'basic_jobdetail') {
            str = '招聘详情组件';
        }
        else if (value == 'basic_webmap') {
            str = '站点地图';
        }
        else if (value == 'basic_code') {
            str = '高级代码';
        }
        return str
    }

    //特殊蒙层关闭
    Special_Mongolian_Close(){

        // console.log($('.special_mongolian'))


        const special_mongolian = Store.state.special_mongolian.module;
        if(special_mongolian == null){
            return;
        }

        //找到这个挂件
        let IndexObj = this.p_find_moduleIndex({
            pid: special_mongolian.pid,
            type: special_mongolian.rowType,
            id: special_mongolian.widgets_id
        });

        //快速文本关闭

        if(special_mongolian.name === 'basic_text_editor'){
            $("#u" + special_mongolian.widgets_id).draggable({ disabled: false });
            $("#u" + special_mongolian.widgets_id).resizable({ disabled: false });
            $("#u" + special_mongolian.widgets_id).children(".ui-resizable-handle").removeClass("resizable-handle-none");

            //获取内容后，在赋值
            const content_html = $(`#u${special_mongolian.widgets_id}`).find('.w-e-text').html();
            Store.state[special_mongolian.rowType][IndexObj.row].children[IndexObj.module].data.listArr.content =content_html;
                //Store.state[special_mongolian.rowType][IndexObj.row].children[IndexObj.module].data.listArr.content = Store.state[special_mongolian.rowType][IndexObj.row].children[IndexObj.module].data.infor.editorContent;
            Store.state[special_mongolian.rowType][IndexObj.row].children[IndexObj.module].data.infor.isEdit = false;

            this.p_$nextTick(()=>{
                this.module_add_historical('编辑快速文本组件');
            });


        }
        else if(special_mongolian.name === 'basic_links'){
            Store.state.module_name = "";
            Store.state.parts = "";
            Store.state.module_Data = null;
            Store.state.hover_parts = "";
            // this.myShow = false;
            // this.$emit("closem");
            Store.state[special_mongolian.rowType][IndexObj.row].children[IndexObj.module].data.infor.isShows = false;
            Store.state.showMyMask = false;
        }
        else if(special_mongolian.name === 'basic_customedit'){
            Store.state.module_name = "";
            Store.state.parts = "";
            Store.state.module_Data = null;
            Store.state.hover_parts = "";
            Store.state.showMyMask = false;
            Store.state.showCustomModel = false;
            Store.state[special_mongolian.rowType][IndexObj.row].children[IndexObj.module].data.infor.isShows = false;
        }

        Store.commit('special_mongolian_close');

    }

    //生成一条历史记录
   /* create_historical_data() {
        const data = {
            body: Store.state.body,
            header: Store.state.header,
            footer: Store.state.footer
        };
        const record = {
            id: Date.now(),
            type: Store.state.theme_id,
            page: Store.state.now_page,
            time: Date.now(),
            name: '',
            data: JSON.stringify(data)

        }
        return record;
    }*/

    //挂件中的加入历史记录
    module_add_historical(name){
        if(Store.state.historical.websql_debounce != null){
            Store.commit('historical/set_edit_module_name',name);
            Store.state.historical.websql_debounce();
            Store.commit('historyChange',true)
        }
    }







}