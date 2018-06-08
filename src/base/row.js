import Store from '../vuex/store';
import PersonBase from './row_base';
import Module from './one_module';
import Row from './one_row';
import RowStyle from '../widgets/layout_row/style';




import moduleStyle from './style_list_config';
import { debug, log } from 'util';
//如果要使用到全局state，使用Store.state
//基础方法，会加入到vue原型中，全局this.templet+方法名调用
export default class Person_Templet extends PersonBase {
    constructor(...args) {
        super(...args);
        let that = this;
        /*this.p_$nextTick = Vue.prototype.$nextTick;
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
        this.widgets_id = 0;*/

    }

    //创建一个新的module对象
    /*
     * name:挂件的名称
     * x:放置的位置
     * y:放置的位置
     * type:放置在body、header或footer
     * pid:父级row 的id
     *
     * */
    p_add_module({ name, left, top, type, pid }) {
        const that = this;

        Store.state.widgets_id++;

        let rowIndex = this.p_find_rowIndex({
            id: pid,
            type: Store.state.editing_block
        });

        var newModule = new Module({
            name: name,
            rowType: Store.state.editing_block, //插入的row的类型，必须知道
            widgets_id: Store.state.widgets_id.toString(),
            pid,
        });

        newModule.data.css.module_top = top;
        newModule.data.css.module_left = left;
        //判断是否为拖拽至新挂件的状态
        Store.state.addNewModule = true;

        // 富文本第一次拖拽进来 打开编辑框
        if (name === 'basic_customedit') {
            newModule.data.infor.openShow = true;
        }

        if (name === 'basic_language') {
            newModule.data.infor.w_languageWidth = 60;
        }

        //插入判断
        // debugger;
        Store.state[Store.state.editing_block][rowIndex].children.push(newModule);

        //console.log(JSON.stringify(newModule));

        //先给全局编辑对象赋值
        Store.state.module_Data = JSON.parse(JSON.stringify(newModule));

        //弹出编辑框，编辑框读取全局编辑对象的数据


        // 如果是自定义文本 特殊处理 basic_customedit
        if (this.no_bottom_edit().indexOf(name) > -1) {
            Store.state.module_name = '';
            Store.state.parts = '';
        } else {
            Store.state.module_name = name;
            Store.state.parts = '';
        }


        this.p_$nextTick(function() {
            that.p_disabled_draggable_resizable();
            that.module_scroll(newModule.widgets_id);
        });

        const Chinese_name = this.p_nameToChinese(newModule.name);
        this.module_add_historical(`新增${Chinese_name}`);



    }

    /*
     * 不存在底部编辑框的组件集合
     * */
    no_bottom_edit() {
        return [
            // 'basic_customedit',
            'basic_text_editor',
            'basic_picarticle',
            'basic_gratext'
        ]
    }

    //找到row的索引
    /*
     id:row的id
     type:放置在body、header或footer
     返回row 的索引
    * */
    p_find_rowIndex({ id, type }) {
        let index = 0;
        let list = [];
        let rowId = id;
        if (type == 'body') {
            list = Store.state.body;
        } else if (type == 'header') {
            list = Store.state.header;
        } else {
            list = Store.state.footer;
        }

        for (let i = 0; i < list.length; i++) {
            if (rowId == list[i].widgets_id) {
                index = i;
                break;
            }
        }
        return index;

    }

    //找到module的索引
    /*
     id：挂件的id,不带'u'
     pid:不带'u'
    * type:每个挂件里的rowType
    * 返回一个对象，row是row的index，module是module的index
    *
    * */
    p_find_moduleIndex({ pid, type, id }) {
        let index = 0;
        let list = [];
        let moduleId = id;
        const rowIndex = this.p_find_rowIndex({
            id: pid,
            type
        });

        if (type == 'body') {
            list = Store.state.body[rowIndex].children;
        } else if (type == 'header') {
            list = Store.state.header[rowIndex].children;
        } else {
            list = Store.state.footer[rowIndex].children;
        }

        for (let i = 0; i < list.length; i++) {
            if (moduleId == list[i].widgets_id) {
                index = i;
                break;
            }
        }
        return {
            row: rowIndex,
            module: index
        };
    }




    //全局module编辑方法
    /*
     * key:要编辑的key
     * val：编辑的值0
     * */
    p_editModule({ key, val }) {
        const widgets_id = Store.state.module_Data.widgets_id;
        const rowType = Store.state.module_Data.rowType;
        const rowId = Store.state.module_Data.pid;

        const IndexObj = this.p_find_moduleIndex({
            pid: rowId,
            type: rowType,
            id: widgets_id
        });

        const rowIndex = IndexObj.row;
        const moduleIndex = IndexObj.module;

        Store.state[rowType][rowIndex].children[moduleIndex].data[key] = val;
    }

    //选择部件
    p_select_parts(name) {
        Store.state.parts = name;
    }

    //挂件index选择部件
    /*
     * name:部件名称
     * moduleName：挂件名称
     * */
    p_index_select_parts({ partsName, moduleName, id, pid, type }) {
        //if(Store.state.module_Data == null || id != Store.state.module_Data.widgets_id){
        //先给全局编辑对象赋值
        const IndexObj = this.p_find_moduleIndex({ pid, type, id });
        const rowIndex = IndexObj.row;
        const moduleIndex = IndexObj.module;
        Store.state.module_Data = JSON.parse(JSON.stringify(Store.state[type][rowIndex].children[moduleIndex]));

        //弹出编辑框，编辑框读取全局编辑对象的数据
        Store.state.module_name = moduleName;
        //}
        //选择的部件名赋值
        Store.state.parts = partsName;

        //如果关闭底部弹窗，则恢复拖拽和缩放
        if (moduleName == '' && Store.state.parts == '') {
            const moduleId = 'u' + id;
            $('#' + moduleId).draggable({ disabled: false });
            $('#' + moduleId).resizable({ disabled: false });
            $('#' + moduleId).find('.ui-resizable-handle').removeClass('resizable-handle-none');
        }

        this.p_disabled_draggable_resizable();

    }

    //编辑悬浮选中
    p_index_hover_parts(name) {
        Store.state.hover_parts = name;
    }

    //编辑悬浮离开
    p_index_out_parts() {
        Store.state.hover_parts = '';
    }



    /*
     * 挂件删除
     * id:挂件的id
     * pid：挂件的pid
     * type：放置在body、header或footer
     * */
    p_del_module({ id, pid, type }, box) {
        if (box) {
            Store.state.module_name = '';
            Store.state.parts = '';
            Store.state.module_Data = null;
            Store.state.hover_parts = '';
            const IndexObj = this.p_find_moduleIndex({ pid, type, id });
            const rowIndex = IndexObj.row;
            const moduleIndex = IndexObj.module;
            const M_name = this.p_nameToChinese(Store.state[type][rowIndex].children[moduleIndex].name);
            Store.state[type][rowIndex].children.splice(moduleIndex, 1);
            this.module_add_historical('删除'+M_name);
            Store.commit('special_mongolian_close');

        } else {
            this.p_$confirm('是否删除挂件', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Store.state.addNewModule = true;
                Store.state.module_name = '';
                Store.state.parts = '';
                Store.state.module_Data = null;
                Store.state.hover_parts = '';
                const IndexObj = this.p_find_moduleIndex({ pid, type, id });
                const rowIndex = IndexObj.row;
                const moduleIndex = IndexObj.module;
                const M_name = this.p_nameToChinese(Store.state[type][rowIndex].children[moduleIndex].name);
                Store.state[type][rowIndex].children.splice(moduleIndex, 1);
                this.module_add_historical('删除'+M_name);
                Store.commit('special_mongolian_close');

            }).catch(() => {
                //console.log('取消')
            });
        }
    }

    p_change_size({ id, name, type, rowIndex, moduleIndex, width, height }) {
        if (name == 'basic_banner') {
            Store.state[type][rowIndex].children[moduleIndex].data.infor.bannerSet.width = width;
            Store.state[type][rowIndex].children[moduleIndex].data.infor.bannerSet.height = height;
            return;
        } else if (name == 'basic_text_editor') {
            Store.state[type][rowIndex].children[moduleIndex].data.infor.width = width;
            return;
        } else if (name == 'basic_navtmp') {
            Store.state[type][rowIndex].children[moduleIndex].data.infor.style.navWidth = width;
            Store.state[type][rowIndex].children[moduleIndex].data.infor.style.navHeight = height;
            return;
        } else if (name == 'basic_picarticle_a') {
            Store.state[type][rowIndex].children[moduleIndex].data.infor.patternWidth = width;
            Store.state[type][rowIndex].children[moduleIndex].data.infor.patternHeight = height;
            return;
        } else if (name == 'basic_picarticle') {
            Store.state[type][rowIndex].children[moduleIndex].data.infor.patternWidth = width;
            Store.state[type][rowIndex].children[moduleIndex].data.infor.patternHeight = height;
            return;
        } else if (name == 'basic_catelog') {
            Store.state[type][rowIndex].children[moduleIndex].data.infor.frameBox = width;
            Store.state[type][rowIndex].children[moduleIndex].data.infor.frameHeight = height;
            return;
        } else if (name == 'basic_honor') {
            const header_height = Store.state[type][rowIndex].children[moduleIndex].data.infor.header.height;
            Store.state[type][rowIndex].children[moduleIndex].data.infor.box.width = width;
            Store.state[type][rowIndex].children[moduleIndex].data.infor.box.height = height - header_height;
            return;
        } else if (name == 'basic_honor_rl') {
            const header_height = Store.state[type][rowIndex].children[moduleIndex].data.infor.header.height;
            Store.state[type][rowIndex].children[moduleIndex].data.infor.box.width = width;
            Store.state[type][rowIndex].children[moduleIndex].data.infor.box.height = height - header_height;
            return;
        } else if (name == 'basic_listAndPage') {
            const heightType = Store.state[type][rowIndex].children[moduleIndex].data.infor.frame.heightType;
            Store.state[type][rowIndex].children[moduleIndex].data.infor.frame.width = width;
            if (heightType === 'num') {
                Store.state[type][rowIndex].children[moduleIndex].data.infor.frame.height = height;
            }
            return;
        } else if (name == 'basic_detailarticle') {
            Store.state[type][rowIndex].children[moduleIndex].data.infor.box.width = width;
            Store.state[type][rowIndex].children[moduleIndex].data.infor.box.height = height;
            return;
        }

    }

    /*
     *
     * */
    p_ajax(params) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: `${params.url}`,
                type: params.type,
                data: params.data,
                success: e => { resolve(e); },
                error: e => { reject(e); }
            });
        });
    }

    /*
     * 取消底部弹框
     * */
    p_bottomBar_close() {
        const moduleId = 'u' + Store.state.module_Data.widgets_id;
        Store.state.module_name = '';
        Store.state.parts = '';
        Store.state.module_Data = null;
        Store.state.hover_parts = '';

        // 判断视频是否是固定,只能是module，不能是row，不然关闭开启固定，row就能拖拽了
        if ($('#' + moduleId).css('position') != 'fixed' && $('#' + moduleId).attr('name') != 'layout_row') {
            $('#' + moduleId).draggable({ disabled: false });
            $('#' + moduleId).resizable({ disabled: false });
            $('#' + moduleId).find('.ui-resizable-handle').removeClass('resizable-handle-none');
            $('#' + moduleId).find('.ui-resizable-handle').css('display', 'none');
        }

    }

    /*
     *
     * 编辑的module去除拖拽和缩放
     * */
    p_disabled_draggable_resizable() {
        const name = Store.state.module_name;
        if (name != '' && name != 'basic_text_editor') {
            const moduleId = 'u' + Store.state.module_Data.widgets_id;
            $('#' + moduleId).draggable({ disabled: true });
            $('#' + moduleId).resizable({ disabled: true });
            $('#' + moduleId).children('.ui-resizable-handle').addClass('resizable-handle-none'); //鼠标悬浮不出现缩放的小点
        }
    }


    /*
     * 选择当前编辑模块
     * */
    select_editing_block(type) {
        Store.state.editing_block = type;
    }


    p_module_draggable(obj) {
        const that = this;
        obj.draggable({
            start: function(event, ui) {
                $(this).addClass('Module_one')
            },
            stop: function(event, ui) {
                const left = ui.position.left;
                const top = ui.position.top;
                const module_pid = $(this).attr('pid');
                const module_id = $(this).attr('id').replace('u', '');
                const rowType = $(this).attr('rowType');

                //当前module和当前的row index
                const IndexObj = that.p_find_moduleIndex({
                    pid: module_pid,
                    type: rowType,
                    id: module_id
                });
                Store.state[rowType][IndexObj.row].children[IndexObj.module].data.css.module_left = left;
                Store.state[rowType][IndexObj.row].children[IndexObj.module].data.css.module_top = top;
            }
        });
    }

    /*
     * row 中的module重新渲染，个别地方需要用到
     * */
    p_rowChild_Renderer({ id, type }) {
        const prev_row_index = this.p_find_rowIndex({ id, type });
        const list = JSON.parse(JSON.stringify(Store.state[type][prev_row_index].children));
        Store.state[type][prev_row_index].children = [];
        this.p_$nextTick(function() {
            Store.state[type][prev_row_index].children = list;
        });
    }

    /*
     * 初始化请求，获取数据
     * */
    p_init() {
        const init_s = Date.now();
        // /index_pc.php/newapi/base/getInfo?page=${page}&theme_id=${theme_id}
        // url:`/index.php?app=site&m=desktop_ntheme_theme&a=getInfo&page=${page}&theme_id=${theme_id}`,
        const that = this;
        const page = sessionStorage.getItem('pageName') ? sessionStorage.getItem('pageName') : Store.state.now_page;
        const theme_id = Store.state.theme_id;
        this.p_ajax({
            type: 'get',
            url: `/index_pc.php/newapi/base/getInfo?page=${page}&theme_id=${theme_id}`,
        }).then(function(e) {
            console.log('初始化请求用时', Date.now() - init_s);
            if (e == '' && e == 'null') {
                that.p_$message.error('网络异常，请稍后尝试！');
                return;
            }

            const data = e;

            if (data.code !== 200) {
                that.p_$message.error('网络异常，请稍后尝试！');
                return;
            }

            //首次加载，等到首屏数据加载完毕，删除蒙层
            if ($('.init_mongolia_layer').length > 0) {
                $('.init_mongolia_layer').remove();
                Store.commit('CHANGEINITSTATUS')
            }
            //debugger;
            Store.state.body = that.created_list({ list: data.data.body, type: 'body' });
            Store.state.header = that.created_list({ list: data.data.header, type: 'header' });
            Store.state.footer = that.created_list({ list: data.data.footer, type: 'footer' });

            //初始化插入历史记录
            //that.historical_init_INSERT();
            Store.dispatch('historical/historical_init_INSERT');


            var data_end = Date.now();
            console.log('初始化header', Store.state.header);
            console.log('初始化body', Store.state.body);
            console.log('初始化footer', Store.state.footer);
            Store.state.changePage = false;
            that.p_$nextTick(function() {
                console.log('页面所有dom渲染', Date.now() - data_end);
                console.log('首屏总时间', Date.now() - startTime);
                that.createGuide();
            })
        }).catch(function(err) {
            console.log(err);
        })
    }




    //撤销
    Revoke(event, $message) {

        if (event.ctrlKey == true && event.keyCode == 90) {
            Store.state.module_name = '';
            if (openDatabase) {
                this.find_sql($message, 'Revoke');
            }
        }

    }

    //恢复
    Recovery(event, $message) {

            if (event.ctrlKey == true && event.keyCode == 88) {
                Store.state.module_name = '';
                if (openDatabase) {
                    this.find_sql($message, 'Recovery');
                }
            }

        }
        //sql分装
    my_websql(sql, data) {
        return new Promise(function(resolve, reject) {
            Store.state.websql.transaction((tx) => {
                tx.executeSql(sql, data, (TX, Result) => {
                    try {
                        //console.log(sql,data,Result);
                        resolve(Result);
                    } catch (err) {
                        reject(err);
                    }
                })
            })
        })
    }

    //查找需要的历史记录
    /*find_sql($message, type, id) {
        let Revoke_id = null;
        if (type === 'Revoke') {
            Revoke_id = this.Revoke_data();
        } else if (type === 'Select') {
            Revoke_id = id;
        } else if (type === 'Recovery') {
            Revoke_id = this.Recovery_data();
        }
        const sql_text = 'SELECT * FROM historical_list WHERE id=?';
        const sql_data = [Revoke_id];

        if (Revoke_id === null) {
            this.p_$message.error('已经到底了！');
            return;
        }

        this.my_websql(sql_text, sql_data).then((Result) => {
            //sql没数据的时候，才插入
            if (Result.rows.length > 0) {
                const sql_data = Result.rows[0];
                const sstyle_data = JSON.parse(sql_data.data);
                Store.state.body = sstyle_data.body;
                Store.state.header = sstyle_data.header;
                Store.state.footer = sstyle_data.footer;
                this.set_Pointer(sql_data, 'select', sql_data.data);
            }
        })

    }*/

    //找到撤销应该读那个
    /*Revoke_data() {
        const Pointer_id = Store.state.Pointer.id;
        let obj_id = null;
        for (let i = 0; i < Store.state.historical_record.length; i++) {
            if (Store.state.historical_record[i].id == Pointer_id && i != 0) {
                obj_id = Store.state.historical_record[i - 1].id;
            }
        }
        return obj_id;
    }

    //找到恢复应该读那个
    Recovery_data() {
        const Pointer_id = Store.state.Pointer.id;
        let obj_id = null;
        for (let i = 0; i < Store.state.historical_record.length; i++) {
            if (Store.state.historical_record[i].id == Pointer_id && i != Store.state.historical_record.length - 1) {
                obj_id = Store.state.historical_record[i + 1].id;
            }
        }
        return obj_id;
    }*/



    //历史记录视图初始化
    /*historical_init_view() {
        Store.state.historical_record = [];
        const sql_text = 'SELECT * FROM historical_list WHERE page=?';
        const sql_data = [Store.state.now_page];
        this.my_websql(sql_text, sql_data).then((Result) => {
            if (Result.rows.length > 0) {
                for (let i = 0; i < Result.rows.length; i++) {
                    const row_data = Result.rows[i];
                    delete row_data.data;
                    Store.state.historical_record.push(row_data);

                    //初始化指针,循环到最后一个
                    if (i == Result.rows.length - 1) {
                        this.set_Pointer(row_data);
                    }
                }
            }
        });
    }*/

    //初始化插入历史记录
    /*historical_init_INSERT() {
        if (openDatabase) {
            const record = this.create_historical_data();
            const clear_sql = 'DELETE FROM historical_list WHERE type != ?';
            this.my_websql(clear_sql, [Store.state.theme_id]).then((e) => {
                this.sql_init_judge(record); //初始化做历史记录的判断
            });


        }
    }*/

    //初始化做历史记录的判断
    /*sql_init_judge(record) {
        Store.state.websql.transaction((tx) => {
            tx.executeSql('SELECT COUNT(*) FROM historical_list WHERE page=?', [Store.state.now_page], (txx, Result) => {
                //sql没数据的时候，才插入
                if (Result.rows.length > 0) {
                    if (Result.rows[0]['COUNT(*)'] === 0) {
                        //如果初始化时空记录，则按照当前情况，插入一条
                        tx.executeSql('INSERT INTO historical_list (id,type,page,time,name,data) VALUES (?,?,?,?,?,?)', this.websql_data_filter(record), (t, Result) => {

                            //插入完成，渲染历史记录视图
                            this.historical_init_view();
                        })
                    } else {

                        //如果历史记录里面有，直接渲染
                        this.historical_init_view();
                    }
                }
            });
        })
    }*/


    //插入数据过滤
    /*websql_data_filter(data) {
        const sql_val = [];
        for (var key in data) {
            sql_val.push(data[key]);
        }
        return sql_val;
    }*/

    //删除第一条记录
    /*delect_first_sql(id) {
        const sql_id = Store.state.historical_record[0].id;
        const del_sql = 'DELETE FROM historical_list WHERE id == ?';

        this.my_websql(del_sql, [sql_id]).then((e) => {
            //删除成功，视图删除
            if (e.rowsAffected > 0) {
                Store.state.historical_record.splice(0, 1);
            }
        })
    }*/

    //数据更新。sql插入一条记录
    /*websql_data_last() {
        const record = this.create_historical_data();
        const that = this;
        //选择历史记录的时候，由于视图更新了，防止插入选中的那条
        if (record.data === Store.state.Pointer.data) {
            Store.state.Pointer.data = '';
            return;
        }

        Store.state.websql.transaction((tx) => {

            tx.executeSql('select * FROM historical_list WHERE page=? order by rowid desc limit 1', [Store.state.now_page], (txx, Result) => {

                //本来就存在数据，做比较
                if (Result.rows.length > 0) {
                    const last_data = Result.rows[0];

                    //在选中前面的历史记录，先删除后面的，再插入新的
                    //debugger;
                    if (Store.state.Pointer.state === 'select') {

                        tx.executeSql('DELETE FROM historical_list WHERE id > ? and page=?', [Store.state.Pointer.id, Store.state.now_page], (txx, Result) => {
                            //console.log(Result);
                            this.websql_INSERT(tx, record, this.historical_init_view);
                        })
                    }
                    //正常插入
                    else {
                        //判断本次要插入的和记录里最后一条是否一样
                        if (record.data != last_data.data) {
                            const COUNT_sql = 'SELECT COUNT(*) FROM historical_list WHERE page=?';
                            const as = async function() {

                                //先查数量
                                const COUNT_data = await that.my_websql(COUNT_sql, [Store.state.now_page]);

                                if (COUNT_data.rows.length > 0) {

                                    //超出最大上限，删除第一条
                                    if (COUNT_data.rows[0]['COUNT(*)'] >= Store.state.websql_max) {

                                        //删除第一条
                                        const del_data = await that.delect_first_sql();
                                    }
                                }
                                //插入
                                await that.websql_INSERT(tx, record);
                            };
                            as().catch(() => {
                                that.websql_INSERT(tx, record);
                            });
                        }
                    }

                } else {

                    //清空后，继续往里面加
                    this.websql_INSERT(tx, record);
                }
            });
        })
    }*/

    //插入的逻辑
   /* websql_INSERT(tx, data, fn) {
        const add_sql = 'INSERT INTO historical_list (id,type,page,time,name,data) VALUES (?,?,?,?,?,?)';
        const add_data = this.websql_data_filter(data);
        this.my_websql(add_sql, add_data).then((Result) => {
            //插入成功
            if (Result) {
                delete data.data;

                if (fn) {
                    fn.apply(this);
                } else {
                    Store.state.historical_record.push(data);
                    this.set_Pointer(data);
                }


            }
        });
    }*/

    //设置指针
    /*set_Pointer(obj, state = 'last', val = '') {
        Store.state.Pointer.id = obj.id;
        Store.state.Pointer.index = 0;
        Store.state.Pointer.state = state;
        Store.state.Pointer.data = val;
    }*/

    //websql创建
    /*websql_create() {
        //如果存在，则不创建
        Store.state.websql = openDatabase('historical', '1.0', '历史记录', 500 * 1024 * 1024);
        Store.state.websql.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS historical_list (
              id INT UNSIGNED KEY AUTO_INCREMENT,
              type tinyint(2) DEFAULT 0,
              page char(10) NOT NULL,
              time INT UNSIGNED NOT NULL,
              name char(20),
              data mediumtext NOT NULL
            )`);
        })


    }*/

    //查询数据库总条数
    sql_COUNT() {
        const sql_text = 'SELECT COUNT(*) FROM historical_list page=?';
        const sql_data = [Store.state.now_page];
        this.my_websql(sql_text, sql_data).then((Result) => {
            //sql没数据的时候，才插入
            if (Result.rows.length > 0) {
                const sql_data = Result.rows[0];
                const sstyle_data = JSON.parse(sql_data.data);
                Store.state.body = sstyle_data.body;
                Store.state.header = sstyle_data.header;
                Store.state.footer = sstyle_data.footer;
                this.set_Pointer(sql_data, 'select', sql_data.data);
            }
        })



    }


    //创建body，header，footer数据集合
    created_list({ list, type }) {
        let arr = [];
        if (!list && list.length <= 0) {
            return arr;
        }

        for (let i = 0; i < list.length; i++) {
            arr.push(this.created_one_row(list[i], type));
        }
        return arr;
    }

    /*
     * 初始化创建一个row
     * */
    created_one_row(val, type) {
        if(!val.data){
            return;
        }

        //row的infor做老版本后台的兼容,StorageVal只有打开一次编辑框，保存后才会有，初始化的时候之后css
        //这块是从老模板过来的数据兼容,没有type就是老数据
        if(!val.data.type){
            if(val.data.StorageVal){
                var row_StorageVal = JSON.parse(val.data.StorageVal);
                row_StorageVal.module_width = val.data.StorageVal.module_width ? val.data.StorageVal.module_width : val.data.css.module_width;
            }
            else{
                var row_StorageVal = val.data.css;
            }

            //这是在新建模板的情况下,css属性只有两条
            if (Object.getOwnPropertyNames(row_StorageVal).length <= 2) {
                row_StorageVal = JSON.parse(JSON.stringify(RowStyle.infor));
            }



            //这些属性，在老建站里面，是存在$css里，不在StorageVal里


            row_StorageVal.module_height = val.data.css.module_height;
            row_StorageVal.module_index = row_StorageVal.module_index ? parseInt(row_StorageVal.module_index) : 1;
            row_StorageVal.r_bg_src = val.data.css.r_bg_src ? val.data.css.r_bg_src : '';
            row_StorageVal.w_bg_src = val.data.css.w_bg_src ? val.data.css.w_bg_src : '';
            row_StorageVal.r_border_top_color = val.data.css.r_border_top_color ? val.data.css.r_border_top_color : '#fff';
            row_StorageVal.r_border_bottom_color = val.data.css.r_border_bottom_color ? val.data.css.r_border_bottom_color : '#fff';
            row_StorageVal.r_bg_position = val.data.css.r_bg_position ? val.data.css.r_bg_position : 'center center';
            row_StorageVal.w_bg_position = val.data.css.w_bg_position ? val.data.css.w_bg_position : 'center center';
            row_StorageVal.w_border_top_color = val.data.css.w_border_top_color ? val.data.css.w_border_top_color : '#fff';
            row_StorageVal.w_border_right_color = val.data.css.w_border_right_color ? val.data.css.w_border_right_color : '#fff';
            row_StorageVal.w_border_bottom_color = val.data.css.w_border_bottom_color ? val.data.css.w_border_bottom_color : '#fff';
            row_StorageVal.w_border_left_color = val.data.css.w_border_left_color ? val.data.css.w_border_left_color : '#fff';
            this.str_to_number(row_StorageVal);
        }
        else{
            this.str_to_number(val.data.infor);
        }

        let children = []; //子挂件
        const rowType = type;
        const pid = '0'; //row的pid都是0

        //在新建站中保存过，就会存在一个type的标志位
        let data = {
            infor: val.data.type === 'new' ? val.data.infor : row_StorageVal,
            css: val.data.css ? val.data.css : {}
        };

        //创建这个row下面的每一个module
        if (val.children && val.children.length > 0) {
            children = this.created_one_module(val, type);

        }
        let obj = new Row({
            id: val.widgets_id,
            widgets_id: val.widgets_id.toString(),
            rowType: rowType,
            children,
            data,
            pid
        });


        return obj;
    }

    /*
     * 初始化创建一个module
     * */
    created_one_module(val, type) {
        let children_arr = [];

        val.children.map((childVal) => {
            const child_rowType = type;
            const child_pid = val.widgets_id;
            /*if(childVal.widgets_id == '392456'){
                console.log(JSON.parse(childVal.data.StorageVal))
                debugger;
            }*/

            //特效模块兼容
            if (childVal.data.infor) {
                if (!childVal.data.infor.effectsObj) {
                    childVal.data.infor.effectsObj = this.created_effectsObj();
                }
            }

            //过滤挂件的css属性，把所有数字字符串转成数字
            this.str_to_number(childVal.data.css ? childVal.data.css : {});

            //module的infor做老版本后台的兼容（要用StorageVal，不然所有的数字都要变成字符串了）
            //地图挂件保存数据的名称不一致，单独做判断
            if (childVal.name === 'basic_map') {
                var module_StorageVal = childVal.data.address ? JSON.parse(childVal.data.address) : childVal.data.infor;
            }

            else {
                var module_StorageVal = childVal.data.StorageVal ? JSON.parse(childVal.data.StorageVal) : childVal.data.infor;
            }

            //列表与分页兼容
            if(childVal.name === 'basic_listAndPage'){
                module_StorageVal.Component.map((val)=>{
                    if(val.select === true || val.select === 'true'){
                        val.select = 'block';
                    }
                    else if(val.select === false || val.select === 'false'){
                        val.select = 'none';
                    }
                })
            }



            this.str_to_number(module_StorageVal);

            if (!module_StorageVal.effectsObj) {
                module_StorageVal.effectsObj = this.created_effectsObj();

            }

            const child_data = {
                infor: module_StorageVal,
                listArr: childVal.data.listArr ? JSON.parse(childVal.data.listArr) : module_StorageVal,
                css: childVal.data.css,
                animateObj: childVal.data.animateObj ? childVal.data.animateObj : this.created_animateObj()
            };
            child_data.css.w_opacity = child_data.css.w_opacity > 1 ? child_data.css.w_opacity/100 : child_data.css.w_opacity;
            var newModule = new Module({
                name: childVal.name,
                rowType: child_rowType,
                widgets_id: childVal.widgets_id.toString(),
                pid: child_pid.toString(),
                data: child_data
            });

            children_arr.push(newModule);

        });
        return children_arr;
    }

    /*
     * 创建一个effectsObj对象（特效模块）
     * */
    created_effectsObj() {
        return {
            type: '', //特效类型
            icon: 'fa-adjust', //icon图标
            iconSize: 50, //icon大小
            iconColor: '#fff', //icon颜色
            changeSrc: '', //替换图片
            borderStyle: 'solid', //边框类型
            borderWidth: 1, //边框尺寸
            borderColor: '#ccc', //边框颜色
            deg: 90, //旋转角度
            zoom: 1.5, //放大的倍率
            distance: 20, //位移距离
        };
    }

    /*
     * 创建一个animateObj（动画模块）
     * */
    created_animateObj() {
        return {
            animatedType: '',
            animatedDuration: 0.5,
            animatedDelay: 0,
            animatedIterationCount: false,
            animatedState: '',
        }
    }


    //递归遍历所有数据，将数字字符串改成数字
    str_to_number(data) {
        for (var i in data) {
            if (data[i] instanceof Object) {
                this.str_to_number(data[i])
            } else {
                /*if (!isNaN(data[i]) && typeof data[i] === 'string' && data[i]) {
                    data[i] = parseFloat(data[i])
                }*/
                //扫描透明度
                if (data[i] === 'transparent') {
                    data[i] = `rgba(255,255,255,0)`;
                }
                if (i === 'module_index' && data[i] === '') {
                    data[i] = 1;
                }
                //列表与分页，显示隐藏过滤


            }
        }
    }

    p_test() {
        //首次加载，等到首屏数据加载完毕，删除蒙层
        if ($('.init_mongolia_layer').length > 0) {
            $('.init_mongolia_layer').remove();
            Store.commit('CHANGEINITSTATUS')
        }
        //这里是测试代码--------------------------------------
        for (let i = 0; i < 6; i++) {
            Store.state.widgets_id++;
            let obj = new Row({
                id: Store.state.widgets_id,
                widgets_id: Store.state.widgets_id.toString(),
                rowType: 'body',
                children: []
            });
            Store.state.body.push(obj);
        }


        for (let i = 0; i < 1; i++) {
            Store.state.widgets_id++;
            let Hobj = new Row({
                id: Store.state.widgets_id,
                widgets_id: Store.state.widgets_id.toString(),
                rowType: 'header',
                children: []
            });
            Store.state.header.push(Hobj);
        }


        const that = this;
        setTimeout(function() {
            Store.state.widgets_id++;
            let Fobj = new Row({
                id: Store.state.widgets_id,
                widgets_id: Store.state.widgets_id.toString(),
                rowType: 'footer',
                children: []
            });
            Store.state.footer.push(Fobj);
        }, 200);

        //这里是测试代码--------------------------------------
    }

    //不是当前编辑模块，出现蒙城
    p_editing_block_Mongolia(e, type) {
        const $this = e.target;
        const Mongolia = $($this).children('.editing_block_Mongolia');
        if (Mongolia.length == 0) {
            return
        }
        const $this_offset_top = $($this).offset().top;
        const $this_offset_height = $($this).height();
        Mongolia.css({
            'opacity': 0.6,
            'top': $this_offset_top + 'px',
            'height': $this_offset_height + 'px'
        });
    }

    p_Mongolia_close(e, type) {
        const $this = e.target;
        const Mongolia = $($this).children('.editing_block_Mongolia');
        if (Mongolia.length == 0) {
            return
        }
        const $this_offset_top = $($this).offset().top;
        const $this_offset_height = $($this).height();
        Mongolia.css({
            'opacity': 0,
            'top': $this_offset_top + 'px',
            'height': $this_offset_height + 'px'
        });
    }

    //删除排序提示元素
    del_sort_Prompt(){
        if($('.sort_Prompt').length > 0){
            $('.sort_Prompt').remove();
        }
    }

    //排序隐藏的row显示
    row_show(){
        const row_arr = $('.layout_row');
        for(let i = 0;i<row_arr.length;i++){
            if($(row_arr[i]).hasClass('Sortableitem_ing')){
                $(row_arr[i]).removeClass('Sortableitem_ing');
            }
        }
    }

    //创建row排序提示元素
    create_sort_Prompt(mouse_top){
        //没有则创建
        if($('.sort_Prompt').length === 0){
            const dom = $('<div class="sort_Prompt">上下移动进行排序！</div>');
            dom.css('top',mouse_top-15 + 'px');
            dom.appendTo('body');
        }
    }

    //row排序
    p_row_sortable(ele, type, handle = '.handle_sortable', placeholder = 'mySortableModule') {
        const that = this;
        let next_id = '';
        let module_index = 0;
        //debugger;
        $('.' + ele).sortable({
            handle: handle,
            placeholder: placeholder,
            axis: "y",
            sort:function (event, ui) {
                //排序的是row
                if(ui.helper.hasClass('layout_row')){
                    const mouse_top = event.clientY;

                    //没有则创建
                    that.create_sort_Prompt(mouse_top);

                    //有了则改变位置
                    if($('.sort_Prompt').length > 0){
                        $('.sort_Prompt').css('top',mouse_top-15 + 'px');
                    }
                }

            },

            start: function(event, ui) {
                //ui.item.addClass('Sortableitem');
                /*module_index = ui.item.index();//初始记录被排序的index
                next_id = ui.item.parent().children('.layout_row').eq(module_index+1).attr('id');*/
            },
            stop: function(event, ui) {
                /*const end_module_index = ui.item.index();
                const id = ui.item.attr('id').replace('u','');
                const type = ui.item.attr('rowType');
                const row_index = that.p_find_rowIndex({id,type});
                const handle_row = Store.state[type].splice(row_index,1)[0];
                ui.item.removeClass('Sortableitem');
                if(next_id){
                  const dom = ui.item.remove();
                  $('#'+next_id).before(dom);
                }
                that.p_$nextTick(function () {
                  Store.state[type].splice(end_module_index,0,handle_row);
                });*/
                that.row_show();
                that.del_sort_Prompt();


                //以下是重新渲染做法
                var nowModules = $(this).children();
                var idArr = []; //准备一个数组，存放id
                var endArr = []; //最终排序好的结果
                var dataArr = []; //数据源的id排序
                var modulesArr = JSON.parse(JSON.stringify(Store.state[type]));

                //如果存在顶部固定的垫高层，则先删除掉

                //dom的id顺序
                for (let i = 0; i < nowModules.length; i++) {
                    if($(nowModules[i]).attr('data-id')){
                        idArr.push($(nowModules[i]).attr('data-id').replace('u', ''));
                    }
                }

                //数据源的id顺序
                for (let i = 0; i < Store.state[type].length; i++) {
                    dataArr.push(Store.state[type][i].widgets_id);
                }

                //如果顺序没有发生变化，则不重新排序
                if (idArr.join() == dataArr.join()) {
                    ui.item.removeClass('Sortableitem');
                    return;
                }

                ui.item.css('display', 'none');
                for (let i = 0; i < idArr.length; i++) {
                    var isContinue = false;
                    for (let j = 0; j < modulesArr.length; j++) {
                        if (idArr[i] == modulesArr[j].widgets_id) {
                            endArr.push(modulesArr[j]);
                            isContinue = true;
                            break;
                        }
                    }
                    if (isContinue) {
                        continue;
                    }
                }
                //var s = new Date().getTime();
                Store.state[type] = [];
                that.p_$nextTick(function() {
                    Store.state[type] = endArr;
                });

                that.module_add_historical('行容器排序');
            }
        });
    }

    /*
     * 大保存
     * */
    async p_save($message) {
        const that = this;
        // debugger
        //保存前数据过滤下
        let body = JSON.parse(JSON.stringify(Store.state.body));
        let header = JSON.parse(JSON.stringify(Store.state.header));
        let footer = JSON.parse(JSON.stringify(Store.state.footer));

        body.map(function(val, i) {
            that.p_save_filter(val, 'body');
        });

        header.map(function(val) {
            that.p_save_filter(val, 'header');
        });

        footer.map(function(val) {
            that.p_save_filter(val, 'footer');
        });

        const page = Store.state.now_page;

        var arr = {
            header,
            body,
            footer,
            page,
            theme_id: Store.state.theme_id,
        };

        // console.log('保存', arr);
        let _this = this;

        let data1 = await this.p_ajax({
            type: 'post',
            url: '/index_pc.php/newapi/base/saveAll',
            data: arr
        });

        let domians = Store.state.domain;
        if(data1.code === 200){
            if (my_host == '{$host}') {
                // 开发
                let data2 = await this.p_ajax({
                    type: 'get',
                    url: `${domians}/index.php?app=site&m=index&a=setWidgetScript&page=${page}`,
                })
            } else {
                // 生产
                let data2 = await this.p_ajax({
                    type: 'get',
                    url: `/index.php?app=site&m=index&a=setWidgetScript&page=${page}`,
                })
            }
            $message.success('保存成功！');
        }
        else{
            $message.error('保存失败，请检查网络！');
           // return;
        }
        Store.state.finishSave = true;
        Store.commit('historyChange',false)

    }


    /*大保存里的数据过滤
     * */
    p_save_filter(val, type) {
        val.data.StorageVal = JSON.stringify(val.data.infor);
        val.data.type = 'new';

        val.data.css = val.data.infor;
        let children = val.children;
        if (children) {
            children.map(function(childVal, i) {
                if (childVal.data.infor) {
                    childVal.data.StorageVal = JSON.stringify(childVal.data.infor);
                }
                if (childVal.data.listArr) {
                    childVal.data.listArr = JSON.stringify(childVal.data.listArr);
                }
                //兼容预览

                //列表分页
                if(childVal.name === 'basic_listAndPage'){
                    childVal.data.row = childVal.data.infor.frame.showNum;
                    childVal.data.module = JSON.parse(childVal.data.listArr).listType;

                }

                //图文展示
                if(childVal.name === 'basic_picarticle_a'){
                    childVal.data.limit = JSON.parse(childVal.data.listArr).RelevantLimit;
                    childVal.data.listType = JSON.parse(childVal.data.listArr).listType;
                }

                //导航
                if(childVal.name === 'basic_navtmp'){
                    childVal.data.limit = JSON.parse(childVal.data.listArr).RelevantLimit;
                    childVal.data.navigation = JSON.parse(childVal.data.listArr);
                }



            })

        }
    }


    //row绑定放置
    row_droppable() {
        const list = $('.row_droppable_region');
        //循环所有row，如果没有绑定放置，则绑定放置
        for (let i = 0; i < list.length; i++) {
            if (!list.eq(i).hasClass('ui-droppable')) {
                this.row_droppable_methods(list.eq(i));
            }
        }
    }

    //row放置的核心逻辑
    row_droppable_methods(dom) {
        const that = this;
        dom.droppable({
            accept: '.Pendant_one',
            //放上来
            over: function(event, ui) {
                if ($(this).parents('.layout_parent').hasClass('editing_block')) {
                   $(this).addClass('select_laybox_now');
                } else {
                    $(this).addClass('no_laybox');
                }

            },
            //拿走
            out: function(event, ui) {
                if ($(this).parents('.layout_parent').hasClass('editing_block')) {
                    $(this).removeClass('select_laybox_now');
                    //that.p_$message.error('请把新挂件放置在中间容器上！');
                } else {
                    $(this).removeClass('no_laybox');
                }

            },
            //放下
            drop: function(event, ui) {
                if (!$(this).parents('.layout_parent').hasClass('editing_block')) {
                    $(this).removeClass('no_laybox');
                    return false;
                }
                var name = ui.helper.attr('data-name');
                $('.left_sidebar_dialog').css('opacity', 1);
                $(this).removeClass('select_laybox');
                const layboxLeft = $(this).offset().left; //距离文档左边的偏移
                const layboxTop = $(this).offset().top; //距离文档顶部的偏移
                const pid = $(this).parents('.layout_row').attr('id').replace('u', '');
                const left = parseInt(event.pageX - layboxLeft);
                const top = parseInt(event.pageY - layboxTop);

                that.p_add_module({
                    name,
                    pid,
                    left,
                    top
                });


            }
        })
    }

    //图层，挂件列表排序
    right_sidebar_child_sort() {
        const list = $('.right_sidebar_child');

        //循环所有，如果没有绑定排序，则绑定放置
        for (let i = 0; i < list.length; i++) {
            if (!list.eq(i).hasClass('ui-sortable')) {
                this.right_sidebar_child_sort_methods(list.eq(i));
            }
        }
    }

    right_sidebar_child_sort_methods(dom) {
        const that = this;
        dom.sortable({
            handle: '.right_sidebar_child_handle',
            placeholder: '',
            axis: "y",
            start: function(event, ui) {},
            stop: function(event, ui) {
                var nowModules = $(this).children();
                const pid = $(this).children('li').attr('pid');
                const type = $(this).children('li').attr('rowtype');
                const id = $(this).children('li').attr('moduleid').replace('u', '');
                var idArr = []; //准备一个数组，存放id
                var endArr = []; //最终排序好的结果
                var dataArr = []; //数据源的id排序
                const row_index = that.p_find_moduleIndex({ pid, type, id }).row;


                var modulesArr = JSON.parse(JSON.stringify(Store.state[type][row_index].children));


                //dom的id顺序
                for (let i = 0; i < nowModules.length; i++) {
                    idArr.push($(nowModules[i]).attr('moduleid').replace('u', ''));
                }


                //数据源的id顺序
                for (let i = 0; i < Store.state[type][row_index].children.length; i++) {
                    dataArr.push(Store.state[type][row_index].children[i].widgets_id);
                }

                //如果顺序没有发生变化，则不重新排序
                if (idArr.join() == dataArr.join()) {
                    //ui.item.removeClass('Sortableitem');
                    return;
                }

                ui.item.css('display', 'none');
                for (let i = 0; i < idArr.length; i++) {
                    var isContinue = false;
                    for (let j = 0; j < modulesArr.length; j++) {
                        if (idArr[i] == modulesArr[j].widgets_id) {
                            endArr.push(modulesArr[j]);
                            isContinue = true;
                            break;
                        }
                    }
                    if (isContinue) {
                        continue;
                    }
                }
                //var s = new Date().getTime();
                Store.state[type][row_index].children = [];
                that.p_$nextTick(function() {
                    Store.state[type][row_index].children = endArr;
                });

                that.module_add_historical('组件排序');
            }
        });
    }


    //组件滚动到适合的位置
    module_scroll(id) {
        let selectedMoudule = $(`#u${id}`);
        let h = $(window).height() - $('.topBar').height() - $('.bottomBar').height();
        if (selectedMoudule.length > 0) {
            if (selectedMoudule.height() < h) {
                let offsetTop = selectedMoudule.offset().top;
                $('html,body').delay(300).animate({ scrollTop: `${offsetTop-h/2 + selectedMoudule.height()/2 - $('.topBar').height()}px` }, 200);
            } else {
                selectedMoudule[0].scrollIntoView({ block: "start", behavior: "smooth" });
            }
        }

    }

    //row滚动到适合的位置
    row_scroll(id) {
            const offsetTop = $(`#u${id}`).offset().top;
            $('html,body').animate({ scrollTop: `${offsetTop-60}px` }, 400);
        }
        //组件插入选中集合
    in_select_module(name, id, pid, rowType, data) {
        const obj = {
            name,
            id,
            pid,
            rowType,
            data
        };
        Store.state.select_module.jsonArr.push(obj);
        Store.state.select_module.idArr.push(id);
        //console.log(obj);
    }

    //重置组件选中集合
    clear_select_module() {
        //console.log('clear');
        Store.state.mousedown_front.child_length = Store.state.select_module.jsonArr.length;
        Store.state.mousedown_front.row_id = Store.state.select_row ? Store.state.select_row.widgets_id : '';
        Store.state.select_module.jsonArr = [];
        Store.state.select_module.idArr = [];
        Store.state.select_row = null;


    }

    //上下左右
    up_and_down(event) {
        //向下
        if (event.ctrlKey == true && event.keyCode === 40) {
            event.preventDefault();
            this.module_move('top', 1);
        }
        //向上
        else if (event.ctrlKey == true && event.keyCode === 38) {
            event.preventDefault();
            this.module_move('top', -1);
        }
        //向左
        else if (event.ctrlKey == true && event.keyCode === 37) {
            this.module_move('left', -1);
        }
        //向右边
        else if (event.ctrlKey == true && event.keyCode === 39) {
            this.module_move('left', 1);
        }
    }

    //选中的挂件移动
    /*
     * direction:移动的方向
     * pn:正负值
     * */
    module_move(direction, pn) {
        const jsonArr = Store.state.select_module.jsonArr;
        for (let i = 0; i < jsonArr.length; i++) {
            const pid = jsonArr[i].pid;
            const type = jsonArr[i].rowType;
            const id = jsonArr[i].id;
            const row_index = this.p_find_moduleIndex({ pid, type, id }).row;
            const module_index = this.p_find_moduleIndex({ pid, type, id }).module;
            const nowTop = Store.state[type][row_index].children[module_index].data.css.module_top;
            const nowLeft = Store.state[type][row_index].children[module_index].data.css.module_left;

            if (direction == 'top') {
                const endTop = nowTop + 1 * pn;
                Store.state[type][row_index].children[module_index].data.css.module_top = endTop;
                $(`#u${id}`).find('.module_top').text(endTop); //调整位置提示
            } else {
                const endLeft = nowLeft + 1 * pn;
                Store.state[type][row_index].children[module_index].data.css.module_left = endLeft;
                $(`#u${id}`).find('.module_left').text(endLeft); //调整位置提示
            }
        }
        this.module_add_historical('组件位置微调');
    }

    //选中row
    select_row(id, type) {
        //当前点击加好的row的index
        const index = this.p_find_rowIndex({ id, type });
        const row = JSON.parse(JSON.stringify(Store.state[type][index]));
        //去掉第顶部固定
        row.data.infor.fixed = 'static';
        Store.state.select_row = row;
    }

    //套索选中
    module_selectable() {
        const that = this;
        $('.module_selectable').selectable({
            appendTo: "#app",
            tolerance: "touch",
            filter: ".module",
            //disabled:true,
            start: function() {


            },
            selecting: function(event, ui) {
                const id = $(ui.selecting).attr('id').replace('u', '');
                const rowType = $(ui.selecting).attr('rowtype');
                const pid = $(ui.selecting).attr('pid');
                const obj_index = that.p_find_moduleIndex({
                    id,
                    type: rowType,
                    pid
                });
                const module_name = Store.state[rowType][obj_index.row].children[obj_index.module].name;
                const module_data = Store.state[rowType][obj_index.row].children[obj_index.module].data;
                that.in_select_module(module_name, id, pid, rowType, module_data);

            },
            stop: function(event, ui) {
                const id = $(this).parents('.layout_row').attr('id').replace('u', '');
                const type = $(this).parents('.layout_row').attr('rowtype');
                if (Store.state.select_module.jsonArr.length > 0) {
                    return
                }
                if (Store.state.mousedown_front.child_length > 0) {
                    return
                }
                if (Store.state.mousedown_front.row_id === id) {
                    return
                }
                that.select_row(id, type)
            },
            unselecting: function(event, ui) {
                const id = $(ui.unselecting).attr('id').replace('u', '');
                const jsonArr = Store.state.select_module.jsonArr;
                const idArr = Store.state.select_module.idArr;

                for (let i = 0; i < jsonArr.length; i++) {
                    if (jsonArr[i].id == id) {
                        jsonArr.splice(i, 1);
                        idArr.splice(i, 1);
                    }
                }

            }
        });
    }

    //监听列表与分页和文章详情，小部件拖拽
    module_draggable_state(val, className, moduleName) {
        //debugger;
        if (val === moduleName) {
            if (!Store.state.module_Data) {
                return;
            }
            const id = Store.state.module_Data.widgets_id;
            //如果这个module下的部件关闭了拖拽，则打开
            if ($(`#u${id}`).find(`.${className}`).hasClass('ui-draggable-disabled')) {
                $(`#u${id}`).find(`.${className}`).draggable({ disabled: false });
            }
        } else {
            //关闭拖拽
            const dom_list = $(`.${className}`);
            //没有关闭的，都关闭掉
            for (let i = 0; i < dom_list.length; i++) {
                if (!$(dom_list[i]).hasClass('ui-draggable-disabled')) {
                    $(dom_list[i]).draggable({ disabled: true });
                }
            }
        }
    }


    //固定设置
    header_fixed_set(id) {
        //所有row固定的样式重置掉
        $('.myheader').find('.layout_row').css({
            'position': 'relative',
            'top': 0,
            'zIndex': 'auto'
        });
        $('.rowFixedNext').remove(); //垫高去掉

        Store.state.fixed.id = id;
        Store.state.fixed.top = $(`#u${id}`).offset().top;
        Store.state.fixed.height = $(`#u${id}`).height();
        //console.log(Store.state.fixed);

        //生成新的rowFixed
        this.p_$nextTick(() => {
            if ($('.rowFixedNext').length == 0) {
                $('.rowFixed').after('<div class="rowFixedNext"></div>');
                $('.rowFixedNext').css('height', 0);
            }

        })
    }

    /*
     * 对齐线，放到开始拖拽里的
     * that:使用方法的vue对象
     * $this：当前拖拽的元素
     * */
    aline_start(that, $this, dom) {
        //一开始拖拽的时候，就把同屏幕的dom找出来
        var thisId = $this.attr('id');
        var srcollTop = $(window).scrollTop(); //窗口卷去高度
        var moduleArr = $(dom);
        //that.targetDom = [];
        Store.commit('clear_targetDom');

        //在刚开始拖拽的时候，找出屏幕范围内，所有的方块，把它们的信息插入到一个数组中，在拖拽时，就遍历这个数组，而不是遍历所有的dom,在100个左右的dom情况下，性能会更好
        for (var i = 0; i < moduleArr.length; i++) {
            var moduleHeight = moduleArr.eq(i).height(); //每个方块的高度
            var moduleTop = moduleArr.eq(i).offset().top; //每个方块距离文档顶部的距离
            var screenTop = moduleTop - srcollTop; //每个方块距离屏幕顶部的距离
            var module_id = moduleArr.eq(i).attr('id');
            //记录每个方块的信息，用于遍历计算
            var module_data = {
                id: module_id,
                width: moduleArr.eq(i).width(),
                height: moduleHeight,
                top: moduleTop,
                left: moduleArr.eq(i).offset().left,
            };

            //module的对齐线
            if (dom === '.module') {
                //在当前屏幕范围内的方块，去除拖拽的那个
                if (screenTop + moduleHeight > 0 && screenTop < this.screenHeight && module_id != thisId) {
                    Store.commit('add_targetDom',module_data);
                    //that.targetDom.push(module_data);
                }
            } else {
                const dom_i = $this.index();
                if (i != dom_i) {
                    Store.commit('add_targetDom',module_data);
                    //that.targetDom.push(module_data);
                }

            }
        }
        //console.log(Store.state.align.targetDom);
    }

    //删除线
    p_remove_line() {
        if ($('.align_line').length > 0) {
            $('.align_line').remove();
        }
    }

    /*
     * 竖向一根对齐线
     * target_top:目标元素的top
     * target_height:目标元素的height
     * dragTop:拖拽元素的top
     * dragHeight:拖拽元素的height
     * dragLeft:拖拽元素的left
     * dragLeft:拖拽元素的left
     * lineLeft：竖向对齐线的left值
     * */
    left_right_line(target_top, target_height, dragTop, dragHeight, lineLeft) {
        //如果目标方块在拖拽方块上面
        if (target_top < dragTop) {
            this.p_create_line({
                type: 'vertical',
                size: dragTop + dragHeight - target_top + 20,
                top: target_top - 10,
                left: lineLeft
            });
        } else {
            this.p_create_line({
                type: 'vertical',
                size: target_top + target_height - dragTop + 20,
                top: dragTop - 10,
                left: lineLeft
            });
        }


    }

    /*
     * 横向向一根对齐线
     * */
    top_bottm_line(dragLeft, dragWidth, target_left, target_width, lineLeft) {
        //如果目标方块在拖拽方块左面
        if (target_left < dragLeft) {
            //debugger;
            this.p_create_line({
                type: 'transverse',
                size: dragLeft + dragWidth - target_left + 20,
                top: lineLeft,
                left: target_left - 10
            });
        } else {
            this.p_create_line({
                type: 'transverse',
                size: target_left + target_width - dragLeft + 20,
                top: lineLeft,
                left: dragLeft - 10
            });
        }
    }

    p_create_line(param) {
        let type = param.type;
        let size = param.size;
        let top = param.top;
        let left = param.left;

        var line = $('<div class="align_line"></div>');
        //var line = $('.align_line')
        //type代表是横线还是竖线
        if (type == 'transverse') {
            line.css({
                width: size + 'px',
                height: '1px',
                top: top,
                left: left
            });
        } else {
            line.css({
                width: '1px',
                height: size + 'px',
                top: top,
                left: left
            });
        }
        line.appendTo('body');
    }

    p_lock(moveLeft, moveTop, self, that) {
        //console.log(dragTop);
        const moduleId = self.attr('id');
        //竖向锁定了
        if (Store.state.align.lock.vertical_lock) {



            let module_Top = parseFloat(self.css('top')); //拖拽元素当前的位置
            let module_offset_Top = self.offset().top; //拖拽元素距离文档顶部的距离
            //插入锁定标签
            if ($('.lock_Top_style').length == 0) {
                var lock_Top_style = $(`<style class="lock_Top_style">#${moduleId} {top:${module_Top}px !important;}</style>`);
                lock_Top_style.appendTo('head');
            }
            //debugger;//
            if (moveTop < module_offset_Top - Store.state.align.Error_lock || moveTop > module_offset_Top + Store.state.align.Error_lock) {
                Store.commit('lock_vertical_false');
                //that.lock.vertical_lock = false;
                this.p_remove_line();
                this.p_remove_lock();
            }
        }

        //横向锁定了
        if (Store.state.align.lock.transverse_lock) {
            //console.log(123);
            let module_Left = parseFloat(self.css('left')); //拖拽元素当前的位置
            let module_offset_Left = self.offset().left; //拖拽元素距离文档顶部的距离
            //插入锁定标签
            if ($('.lock_Left_style').length == 0) {
                var lock_Left_style = $(`<style class="lock_Left_style">#${moduleId} {left:${module_Left}px !important;}</style>`);
                lock_Left_style.appendTo('head');
            }
            //debugger;
            if (moveLeft < module_offset_Left - Store.state.align.Error_lock || moveLeft > module_offset_Left + Store.state.align.Error_lock) {
                Store.commit('lock_transverse_false');
                //that.lock.transverse_lock = false;
                this.p_remove_line();
                this.p_remove_lock();
            }
        }
    }

    //删除锁定元素
    p_remove_lock() {
        if ($('.lock_Top_style').length > 0) {
            $('.lock_Top_style').remove();
        }

        if ($('.lock_Left_style').length > 0) {
            $('.lock_Left_style').remove();
        }
    }

    /*
     * 对齐线，放到正在拖拽里的
     * */
    aline_drag(that, $this, dragLeft, dragTop, dragWidth, dragHeight, moveLeft, moveTop, isLock) {
        //移动开始前，先清除线
        this.p_remove_line();
        //console.log(dragLeft,dragTop);
        const lines = Store.state.align.targetDom;

        for (var i = 0; i < lines.length; i++) {
            var target_left = lines[i].left;
            var target_top = lines[i].top;
            var target_width = lines[i].width;
            var target_height = lines[i].height;


            //10种可能的对齐线
            //拖拽元素的左边，与目标元素的左边一致,就只有一根线
            if (dragLeft > target_left - Store.state.align.Error_amount && dragLeft < target_left + Store.state.align.Error_amount) {
                Store.commit('lock_transverse_true');
                //that.lock.transverse_lock = true; //横向锁定
                this.left_right_line(target_top, target_height, dragTop, dragHeight, dragLeft);
            }
            //拖拽元素的左边，与目标元素的右边一致,就只有一根线
            if (dragLeft > target_left + target_width - Store.state.align.Error_amount && dragLeft < target_left + target_width + Store.state.align.Error_amount) {
                Store.commit('lock_transverse_true');
                //that.lock.transverse_lock = true; //横向锁定
                this.left_right_line(target_top, target_height, dragTop, dragHeight, dragLeft);
            }
            //中间的竖向对齐线
            if (dragLeft + (dragWidth / 2) > target_left + (target_width / 2) - Store.state.align.Error_amount && dragLeft + (dragWidth / 2) < target_left + (target_width / 2) + Store.state.align.Error_amount) {
                Store.commit('lock_transverse_true');
                //that.lock.transverse_lock = true; //横向锁定
                this.left_right_line(target_top, target_height, dragTop, dragHeight, dragLeft + (dragWidth / 2));
            }
            //拖拽元素的右边，与目标元素的右边一致,就只有一根线
            if (dragLeft + dragWidth > target_left + target_width - Store.state.align.Error_amount && dragLeft + dragWidth < target_left + target_width + Store.state.align.Error_amount) {
                Store.commit('lock_transverse_true');
                //that.lock.transverse_lock = true; //横向锁定
                this.left_right_line(target_top, target_height, dragTop, dragHeight, dragLeft + dragWidth);
            }
            //拖拽元素的右边，与目标元素的左边一致,就只有一根线
            if (dragLeft + dragWidth > target_left - Store.state.align.Error_amount && dragLeft + dragWidth < target_left + Store.state.align.Error_amount) {
                Store.commit('lock_transverse_true');
                //that.lock.transverse_lock = true; //横向锁定
                this.left_right_line(target_top, target_height, dragTop, dragHeight, dragLeft + dragWidth);
            }


            //拖拽元素的上边，与目标元素的上边一致,就只有一根线
            if (dragTop > target_top - Store.state.align.Error_amount && dragTop < target_top + Store.state.align.Error_amount) {
                Store.commit('lock_vertical_true');
                //that.lock.vertical_lock = true; //竖向锁定
                this.top_bottm_line(dragLeft, dragWidth, target_left, target_width, dragTop);
            }
            //拖拽元素的上边，与目标元素的下边一致,就只有一根线
            if (dragTop > target_top + target_height - Store.state.align.Error_amount && dragTop < target_top + target_height + Store.state.align.Error_amount) {
                Store.commit('lock_vertical_true');
                //that.lock.vertical_lock = true; //竖向锁定
                this.top_bottm_line(dragLeft, dragWidth, target_left, target_width, dragTop);
            }
            //中间的竖向对齐线
            if (dragTop + (dragHeight / 2) > target_top + (target_height / 2) - Store.state.align.Error_amount && dragTop + (dragHeight / 2) < target_top + (target_height / 2) + Store.state.align.Error_amount) {
                Store.commit('lock_vertical_true');
                //that.lock.vertical_lock = true; //竖向锁定
                this.top_bottm_line(dragLeft, dragWidth, target_left, target_width, dragTop + (dragHeight / 2));
            }

            //拖拽元素的下边，与目标元素的下边一致,就只有一根线
            if (dragTop + dragHeight > target_top + target_height - Store.state.align.Error_amount && dragTop + dragHeight < target_top + target_height + Store.state.align.Error_amount) {
                //that.lock.vertical_lock = true; //竖向锁定
                Store.commit('lock_vertical_true');
                this.top_bottm_line(dragLeft, dragWidth, target_left, target_width, dragTop + dragHeight);
            }

            //拖拽元素的下边，与目标元素的上边一致,就只有一根线
            if (dragTop + dragHeight > target_top - Store.state.align.Error_amount && dragTop + dragHeight < target_top + Store.state.align.Error_amount) {
                Store.commit('lock_vertical_true');
                //that.lock.vertical_lock = true; //竖向锁定
                this.top_bottm_line(dragLeft, dragWidth, target_left, target_width, dragTop + dragHeight);
            }
        }
        if (isLock) {
            this.p_lock(moveLeft, moveTop, $this, that);
        }

    }

    /*
     * 复制module
     * */

    copy_assembly(e) {
        if (e.keyCode == 67 && e.shiftKey) {
            this.copy_methods();
        }
    }

    /*
     * 复制逻辑
     * */
    copy_methods() {
        //复制module
        if (Store.state.select_module.jsonArr.length > 0) {
            Store.state.copy_type = 'module';
            let copy_module = JSON.parse(JSON.stringify(Store.state.select_module.jsonArr));
            Store.state.copy_board = copy_module;
        }

        //复制row
        if (Store.state.select_row) {
            Store.state.copy_type = 'row';
            Store.state.copy_board = JSON.parse(JSON.stringify(Store.state.select_row));
        }
    }


    paste_module_filter(obj) {
        const row_id = Store.state.select_row.widgets_id;
        const rowType = Store.state.select_row.rowType;
        const row_index = this.p_find_rowIndex({
            id: row_id,
            type: rowType
        });
        obj.map((val) => {
            Store.state.widgets_id++;
            const newModule = new Module({
                name: val.name,
                rowType,
                widgets_id: Store.state.widgets_id.toString(),
                pid: row_id,
                data: val.data
            });
            newModule.data.css.module_top = newModule.data.css.module_top + 10;
            newModule.data.css.module_left = newModule.data.css.module_left + 10;

            Store.state[rowType][row_index].children.push(newModule);
        });
    }

    /*
     * 黏贴
     * */
    paste_assembly(e, $message) {
        if (e.keyCode == 86 && e.shiftKey) {
            this.paste_methods($message);
        }
    }


    /*
     * 黏贴的主要逻辑
     * */
    paste_methods($message) {
        if (Store.state.copy_type === 'module') {
            if (Store.state.select_row === null) {
                $message.error('请选中行容器！');
                return;
            }
            if (Store.state.copy_board) {
                let copy_module = JSON.parse(JSON.stringify(Store.state.copy_board));
                this.paste_module_filter(copy_module);
                this.module_add_historical('黏贴组件');

            } else {
                $message.error('请先复制挂件！');
            }
        } else {
            if (Store.state.select_row === null) {
                $message.error('请选中行容器！');
                return;
            }
            if (Store.state.copy_board) {
                const row_id = Store.state.select_row.widgets_id;
                const rowType = Store.state.select_row.rowType;
                const row_index = this.p_find_rowIndex({
                    id: row_id,
                    type: rowType
                });

                Store.state[rowType].splice(row_index + 1, 0, this.paste_row_filter(JSON.parse(JSON.stringify(Store.state.copy_board))));
                //console.log(row_index);
                this.module_add_historical('黏贴行容器');

            } else {
                $message.error('请先复制行容器！');
            }
        }
    }

    //黏贴row的时候，数据过滤
    paste_row_filter(arr) {
        Store.state.widgets_id++;
        const new_row_id = Store.state.widgets_id.toString();
        let new_row = arr;
        const rowType = Store.state.select_row.rowType;

        new_row.widgets_id = new_row_id;
        new_row.rowType = rowType;

        //row下面的module  id和pid修改
        new_row.children.map((val) => {
            Store.state.widgets_id++;
            val.widgets_id = Store.state.widgets_id.toString();
            val.pid = new_row_id;
            val.rowType = rowType;
        });

        return new_row;
    }

    /**
     * 去抖函数
     */

    mydebounce(func, wait, options) {
        var lastArgs,
            lastThis,
            maxWait,
            result,
            timerId,
            lastCallTime,
            lastInvokeTime = 0,
            leading = false,
            maxing = false,
            trailing = true;

        if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = parseInt(wait) || 0;

        function invokeFunc(time) {
            var args = lastArgs,
                thisArg = lastThis;

            lastArgs = lastThis = undefined;
            lastInvokeTime = time;
            result = func.apply(thisArg, args);
            return result;
        }

        function leadingEdge(time) {
            // Reset any `maxWait` timer.
            lastInvokeTime = time;
            // Start the timer for the trailing edge.
            timerId = setTimeout(timerExpired, wait);
            // Invoke the leading edge.
            return leading ? invokeFunc(time) : result;
        }

        function remainingWait(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime,
                timeWaiting = wait - timeSinceLastCall;

            return maxing ?
                nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) :
                timeWaiting;
        }

        function shouldInvoke(time) {
            var timeSinceLastCall = time - lastCallTime,
                timeSinceLastInvoke = time - lastInvokeTime;

            return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
                (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
        }

        function timerExpired() {
            var time = Date.now();
            if (shouldInvoke(time)) {
                return trailingEdge(time);
            }
            timerId = setTimeout(timerExpired, remainingWait(time));
        }

        function trailingEdge(time) {
            timerId = undefined;

            if (trailing && lastArgs) {
                return invokeFunc(time);
            }
            lastArgs = lastThis = undefined;
            return result;
        }

        function cancel() {
            if (timerId !== undefined) {
                clearTimeout(timerId);
            }
            lastInvokeTime = 0;
            lastArgs = lastCallTime = lastThis = timerId = undefined;
        }

        function flush() {
            return timerId === undefined ? result : trailingEdge(Date.now());
        }

        function debounced() {
            var time = Date.now(),
                isInvoking = shouldInvoke(time);

            lastArgs = arguments;
            lastThis = this;
            lastCallTime = time;

            if (isInvoking) {
                if (timerId === undefined) {
                    return leadingEdge(lastCallTime);
                }
                if (maxing) {
                    // Handle invocations in a tight loop.
                    timerId = setTimeout(timerExpired, wait);
                    return invokeFunc(lastCallTime);
                }
            }
            if (timerId === undefined) {
                timerId = setTimeout(timerExpired, wait);
            }
            return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
    }


    /*
    * moudle绑定拖拽判断
    * */
    moudle_draggable(){
        const modules = $('.module');
        for(let i = 0;i<modules.length;i++){
            const $module = $(modules[i]);
            const position = $module.css('position');
            const is_draggable = $module.hasClass('ui-draggable');
            //如果没有绑定拖拽，则绑定
            if(position != 'fixed' && !is_draggable){
                this.moudle_draggable_methods($module);
            }

        }

    }

    /*
    * module绑定拖拽
    *
    * */
    moudle_draggable_methods(dom){
        const that = this;
        dom.draggable({
            containment:'.editing_block',
            grid: [ 1, 1 ],
            start:function(event, ui){

                //视频的定位类型 为fixed时  禁止拖拽
                if($(this).css('position') == 'fixed'){
                    $(this).draggable( "destroy");
                    return ;
                }

                $(this).addClass('Module_one');

                //对齐线开始准备//对齐线逻辑
                //选中1个已上，不触发对齐线
                if(Store.state.select_module.jsonArr.length <= 1){
                    that.aline_start(that,$(this),'.module');
                }


                //在多选模式下拖拽移动
                if(Store.state.select_module.jsonArr.length > 1){
                    that.all_module_draggable_start(event, ui,$(this));

                }

            },
            drag:function(event, ui){

                //对齐线逻辑
                var dragLeft = $(this).offset().left;
                var dragTop = $(this).offset().top;

                var moveLeft = ui.offset.left;
                var moveTop = ui.offset.top;

                var dragWidth = $(this).width();
                var dragHeight = $(this).height();

                const left = Math.round(parseFloat($(this).css('left')));
                const top = Math.round(parseFloat($(this).css('top')));
                //var s = new Date().getTime();//用于测试性能的
                //位置
                $(this).find('.module_left').text(left);
                $(this).find('.module_top').text(top);

                //对齐线逻辑
                if(Store.state.select_module.jsonArr.length <= 1){
                    that.aline_drag(null,$(this),dragLeft,dragTop,dragWidth,dragHeight,moveLeft,moveTop,true);
                }


                //在多选模式下拖拽移动
                if(Store.state.select_module.jsonArr.length > 1){
                    that.all_module_draggable_drag(event, ui);
                }



            },
            stop:function(event, ui){
                const left = Math.round(parseFloat($(this).css('left')));
                const top = Math.round(parseFloat($(this).css('top')));

                $(this).find('.module_left').text(left);
                $(this).find('.module_top').text(top);

                const module_pid = $(this).attr('pid');
                const module_id = $(this).attr('id').replace('u','');
                const rowType = $(this).attr('rowtype');

                //对齐线逻辑
                if(Store.state.align.lock.transverse_lock){
                    $(this).css('left',left);
                }
                if(Store.state.align.lock.vertical_lock){
                    $(this).css('top',top);
                }

                that.module_data_position(module_pid,rowType,module_id,left,top);

                that.p_remove_line();
                that.p_remove_lock();
                Store.commit('clear_targetDom');//清除数组，减少内存消耗
                //all_module_draggable_end
                //在多选模式下拖拽移动
                if(Store.state.select_module.jsonArr.length > 1){
                    that.all_module_draggable_end(event, ui);
                }


            }
        });
    }

    //批量选中module，一起拖拽
    all_module_draggable_start(event, ui,$this){
        //先重置
        Store.commit('position_reset');
        const this_id = $this.attr('id').replace('u','');
        Store.state.MultiSelect.position.select.top = ui.position.top;
        Store.state.MultiSelect.position.select.left = ui.position.left;
        Store.state.MultiSelect.position.select.id = this_id;

        const dom_list = Store.state.select_module.jsonArr;
        //初始保存除了选中，所有的module位置
        dom_list.map((val)=>{
            //当前正在拖拽的那个，不改变位置
            if(val.id != this_id){
                //获取每个的位置
                const every_module_top = parseInt($(`#u${val.id}`).css('top'));
                const every_module_left = parseInt($(`#u${val.id}`).css('left'));
                const obj = {
                    id:val.id,
                    pid:val.pid,
                    rowType:val.rowType,
                    top:every_module_top,
                    left:every_module_left
                };
                Store.commit('position_push',obj);
            }
        })
    }

    //批量选中module，一起拖拽
    all_module_draggable_drag(event, ui){
        //当前拖拽挂件的新位置
        const this_module_top = ui.position.top;
        const this_module_left = ui.position.left;

        //当前移动的位置和开始移动的差值
        const position_top_diff = this_module_top - Store.state.MultiSelect.position.select.top;
        const position_left_diff = this_module_left - Store.state.MultiSelect.position.select.left;

        //操作dom，改变所有module位置
        Store.state.MultiSelect.position.all.map((val)=>{
            //当前正在拖拽的那个，不改变位置
            $(`#u${val.id}`).css({
                top:val.top + position_top_diff + 'px',
                left:val.left + position_left_diff + 'px',
            })

        })
    }

    //module数据改变位置
    module_data_position(module_pid,rowType,module_id,left,top){
        const IndexObj = this.p_find_moduleIndex({
            pid:module_pid,
            type:rowType,
            id:module_id
        });
        //当前拖拽的dom的数据
        const that_module = Store.state[rowType][IndexObj.row].children[IndexObj.module];
        if(that_module){
            //dom的id 要和 数据源对得上
            if(that_module.widgets_id ==  module_id){
                Store.state[rowType][IndexObj.row].children[IndexObj.module].data.css.module_left = left;
                Store.state[rowType][IndexObj.row].children[IndexObj.module].data.css.module_top = top;
                const name = this.p_nameToChinese(Store.state[rowType][IndexObj.row].children[IndexObj.module].name);
                this.module_add_historical('移动'+name);
            }
        }
    }


    //批量选中module，一起拖拽
    all_module_draggable_end(event, ui){
        Store.state.MultiSelect.position.all.map((val)=>{
            const module_id = val.id;
            const rowType = val.rowType;
            const module_pid = val.pid;
            const top = parseInt($(`#u${val.id}`).css('top'));
            const left = parseInt($(`#u${val.id}`).css('left'));
            this.module_data_position(module_pid,rowType,module_id,left,top);
        });

        //重置
        Store.commit('position_reset');
    }


    /*
    * moudle绑定缩放
    * */
    moudle_resizable(){
        const modules = $('.module');
        for(let i = 0;i<modules.length;i++){
            const $module = $(modules[i]);
            const is_resizable = $module.hasClass('ui-resizable');
            //如果没有绑定拖拽，则绑定
            if(!is_resizable){
                this.moudle_resizable_methods($module);
            }

        }

    }

    moudle_resizable_methods(dom){
        const that = this;
        dom.resizable({
            autoHide: true,
            handles: "n, e, s, w, ne, se, sw, nw",
            minHeight:30,
            resize:function (event, ui ) {
                const id = $(this).attr('id').replace('u','');
                const type = $(this).attr('rowtype');
                const name = $(this).attr('name');
                const pid = $(this).attr('pid');
                const IndexObj = that.p_find_moduleIndex({pid,type,id});
                const rowIndex = IndexObj.row;
                const moduleIndex = IndexObj.module;
                const width = ui.size.width ;
                const height = ui.size.height;
                // module的宽和高
                //that.css.module_width = width;
                //that.css.module_height = height;

                $('.module_width .module_left').text($(this).children().width())
                $('.module_width .module_top').text($(this).children().height())
                that.p_change_size({id,name,type,rowIndex,moduleIndex,width,height});
                that.t_change_size({id,name,type,rowIndex,moduleIndex,width,height});
                that.x_change_size({id,name,type,rowIndex,moduleIndex,width,height});

            },
            start( event, ui ){
                $(this).find('.module_width').show();
            },
            stop(event , ui){
                $('.module_width').hide();

                //缩放后重新计算位置
                const top = ui.position.top;
                const left = ui.position.left;
                const module_pid = $(this).attr('pid');
                const module_id = $(this).attr('id').replace('u','');
                const rowType = $(this).attr('rowtype');
                const name = that.p_nameToChinese($(this).attr('name'));
                that.module_data_position(module_pid,rowType,module_id,left,top);
                //位置
                $(this).find('.module_left').text(left);
                $(this).find('.module_top').text(top);
                that.module_add_historical('缩放'+name);


            }
        });
    }

    page_type(type){
        const obj = {
            product:'产品',
            case:'案例',
            article:'文章',
            download:'下载',
            video:'视频',
            help:'帮助',
            job:'招聘'
        }
        return obj[type];
    }

    row_removeClass_clear(){
        const row_arr = $('.layout_row');
        for(let i = 0;i<row_arr.length;i++){
            if($(row_arr[i]).hasClass('clear_z-index')){
                $(row_arr[i]).removeClass('clear_z-index');
            }
        }
    }

    //编辑框判断
    public_edit_judge(dom){
        //获取编辑牌子的状态
        const module = dom.parents('.module');
        //不是挂件
        if(module.length === 0){
            return;
        }
        // 挂件定位类型
        const positionStyle = module.css('position')

        this.public_edit_recovery();//先重置所有牌子的位置
        const module_top = parseInt(module.css('top'));

        if(positionStyle == 'fixed'){
            if(module_top > 100){
                return;
            }
        }else{
            if(module_top > 40){
                return;
            }
        }

        const module_pid = module.attr('pid');
        const module_id = module.attr('id').replace('u', '');
        const rowType = module.attr('rowType');
        const IndexObj = this.p_find_moduleIndex({
            pid: module_pid,
            type: rowType,
            id: module_id
        });

        if(IndexObj.row > 0){
            return;
        }

        //在范围内,需要把牌子往下移动
        const public_edit_top = parseInt(module.find('.public_edit').css('top'));
        if(public_edit_top >= 0){
            //到位置了，就不重新改变位置了
            return;
        }

        module.find('.public_edit').css('top',0);

    }


    //编辑牌子恢复位置
    public_edit_recovery(){
        const public_edit_arr = $('.public_edit');
        for(let i = 0;i<public_edit_arr.length;i++){
            if(parseInt($(public_edit_arr[i]).css('top')) === 0 ){
                $(public_edit_arr[i]).css('top','-43px')
            }
        }


    }



    /*
    * row绑定缩放
    * */
    row_resizable(){
        const rows = $('.layout_row');
        for(let i = 0;i<rows.length;i++){
            const $rows = $(rows[i]);
            const is_resizable = $rows.hasClass('ui-resizable');
            //如果没有绑定缩放，则绑定
            if(!is_resizable){
               this.row_resizable_methods($rows);
            }

        }

    }


    row_resizable_methods(dom){
        const that = this;
        dom.resizable({
            //autoHide: true,
            handles: "s",
            minHeight:30,
            resize:function (event, ui ) {


            },
            start( event, ui ){

            },
            stop(event , ui){
                //缩放后重新计算位置
                const id = $(this).attr('id').replace('u','');
                const type = $(this).attr('rowtype');
                const rowIndex = that.p_find_rowIndex({id,type});
                const height = ui.size.height;
                Store.state[type][rowIndex].data.infor.module_height = height;
                that.module_add_historical('编辑行容器');
                /*that.p_$nextTick(()=>{
                    that.createGuide();
                });*/



            }
        });
    }














}