import {mydebounce,create_historical_data,websql_data_filter} from '../../base/base';


const historical_records = {
    namespaced: true,
    state:{
        historical_record: [], //历史记录
        websql: null, //全局websql对象
        websql_is_show: false,//历史记录开关
        websql_max: 100, //历史记录最大条数
        Pointer: {
            id: 0,
            index: 0,
            state: 'last', //两种状态，last正常插入，指针在最后，select：选中状态，
            data: ''
        },
        websql_debounce:null,//历史记录的防抖函数,
        edit_module_name:'',//websql的name属性



    },
    mutations:{
        clear_record:(state)=>{
            state.historical_record = [];
        },

        //插入历史记录
        historical_record_push:(state,obj)=>{
            state.historical_record.push(obj);
        },

        //设置指针
        set_Pointer:(state,{obj,pointer_state,val })=>{
            state.Pointer.id = obj.id;
            state.Pointer.index = 0;
            state.Pointer.state = pointer_state ? pointer_state : 'last';
            state.Pointer.data = val ? val : '';
        },

        //删除第一个
        del_first:(state)=>{
            state.historical_record.splice(0, 1);
        },

        //清楚所有，重新设置列表
        again_set_list:(state,arr)=>{
            state.historical_record = arr;
        },

        //设置指针id
        set_pointer_id:(state,id)=>{
            state.Pointer.id = id;
        },

        //设置全局数据
        set_all_date:(state,{rootState,style_data})=>{
            rootState.body = style_data.body;
            rootState.header = style_data.header;
            rootState.footer = style_data.footer;

        },

        clear_Pointer_data:(state)=>{
            state.Pointer.data = '';
        },

        websql_open:(state)=>{
            state.websql_is_show = true;
        },

        websql_close:(state)=>{
            state.websql_is_show = false;
        },

        set_edit_module_name:(state,name)=>{
            state.edit_module_name = name;
        }








    },
    actions:{
        //websql创建
        websql_create(store,params){

            if(typeof openDatabase =='undefined'){
                return;
            }
            const { commit, dispatch, state, rootState } = store;
            state.websql = openDatabase('historical', '1.0', '历史记录', 500 * 1024 * 1024);
            state.websql.transaction((tx) => {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS historical_list (
                  id INT UNSIGNED KEY AUTO_INCREMENT,
                  type tinyint(2) DEFAULT 0,
                  page char(10) NOT NULL,
                  time INT UNSIGNED NOT NULL,
                  name char(20),
                  data mediumtext NOT NULL
                )`);
            })
            state.websql_debounce = mydebounce(()=>{dispatch('websql_data_last')},1000);


            //commit('test/mytest',{},{root: true});
            //dispatch('test/actions_mytest');
        },


        my_websql(store,{sql, data}) {
            if(typeof openDatabase =='undefined'){
                return;
            }
            const { commit, dispatch, state, rootState } = store;
            return new Promise(function(resolve, reject) {
                if(state.websql){
                    state.websql.transaction((tx) => {
                        tx.executeSql(sql, data, (TX, Result) => {
                            try {
                                //console.log(sql,data,Result);
                                resolve(Result);
                            } catch (err) {
                                reject(err);
                            }
                        })
                    })
                }

            })
        },

        //初始化插入历史记录
        async historical_init_INSERT(store,params) {

            if(typeof openDatabase =='undefined'){
                return;
            }

            const { commit, dispatch, state, rootState,getters } = store;
            //const record = getters.Revoke_data;
            const record = create_historical_data(rootState,'初始化加载');
            const clear_sql = 'DELETE FROM historical_list WHERE type != ?';

            //删除不属于当前theme_id的所有历史记录
            const Result = await dispatch('my_websql',{
                sql:clear_sql,
                data:[rootState.theme_id]
            });


            dispatch('sql_init_judge',record);
        },

        //初始化做历史记录的判断
        async sql_init_judge(store,record) {
            const { commit, dispatch, state, rootState } = store;
            const COUNT = await dispatch('my_websql',{
                sql:'SELECT COUNT(*) FROM historical_list WHERE page=?',
                data:[rootState.now_page]
            });

            if (COUNT && COUNT.rows && COUNT.rows.length > 0) {
                if (COUNT.rows[0]['COUNT(*)'] === 0) {

                    //如果初始化时空记录，则按照当前情况，插入一条

                    const r = await dispatch('my_websql',{
                        sql:'INSERT INTO historical_list (id,type,page,time,name,data) VALUES (?,?,?,?,?,?)',
                        data:websql_data_filter(record)
                    });

                    //插入完成，渲染历史记录视图
                    dispatch('historical_init_view');
                    /*tx.executeSql('INSERT INTO historical_list (id,type,page,time,name,data) VALUES (?,?,?,?,?,?)', websql_data_filter(record), (t, Result) => {

                        //插入完成，渲染历史记录视图
                        dispatch('historical_init_view');
                    })*/
                } else {

                    //如果历史记录里面有，直接渲染
                    dispatch('historical_init_view');
                }
            }

            /*state.websql.transaction((tx) => {
                tx.executeSql('SELECT COUNT(*) FROM historical_list WHERE page=?', [rootState.now_page], (txx, Result) => {

                    //sql没数据的时候，才插入
                    if (Result.rows.length > 0) {
                        if (Result.rows[0]['COUNT(*)'] === 0) {
                            //如果初始化时空记录，则按照当前情况，插入一条
                            tx.executeSql('INSERT INTO historical_list (id,type,page,time,name,data) VALUES (?,?,?,?,?,?)', websql_data_filter(record), (t, Result) => {

                                //插入完成，渲染历史记录视图
                                dispatch('historical_init_view');
                            })
                        } else {

                            //如果历史记录里面有，直接渲染
                            dispatch('historical_init_view');
                        }
                    }
                });
            })*/
        },

        //插入的逻辑
        async websql_INSERT(store,{data, fn}) {
            const { commit, dispatch, state, rootState } = store;
            const add_sql = 'INSERT INTO historical_list (id,type,page,time,name,data) VALUES (?,?,?,?,?,?)';
            const add_data = websql_data_filter(data);

            const Result = await dispatch('my_websql',{
                sql:add_sql,
                data:add_data
            });

            if(Result){
                delete data.data;

                if (fn) {
                    try{
                        dispatch(fn);
                    }catch (err){}

                } else {
                    commit('historical_record_push',data);
                    commit('set_Pointer',{obj:data});
                }
            }
        },

        //历史记录视图初始化
        historical_init_view(store) {
            const { commit, dispatch, state, rootState } = store;
            commit('clear_record');
            const sql_text = 'SELECT * FROM historical_list WHERE page=?';
            const sql_data = [rootState.now_page];
            dispatch('my_websql',{sql:sql_text,data:sql_data}).then((Result) => {

                if (Result.rows.length > 0) {
                    for (let i = 0; i < Result.rows.length; i++) {
                        const row_data = Result.rows[i];
                        delete row_data.data;
                        commit('historical_record_push',row_data);

                        //初始化指针,循环到最后一个
                        if (i == Result.rows.length - 1) {
                            commit('set_Pointer',{obj:row_data});
                        }
                    }
                }
            });
        },

        //删除第一条记录
        async delect_first_sql(store,id) {
            const { commit, dispatch, state, rootState } = store;
            if(state.historical_record instanceof Array && state.historical_record.length > 0){
                const sql_id = state.historical_record[0].id;
                const del_sql = 'DELETE FROM historical_list WHERE id == ?';
                const Result = await dispatch('my_websql',{
                    sql:del_sql,
                    data:[sql_id]
                });

                if(Result && Result.rowsAffected > 0){
                    commit('del_first');
                }


            }
        },

        //数据更新。sql插入一条记录
        async websql_data_last(store) {
            const { commit, dispatch, state, rootState } = store;
            const record = create_historical_data(rootState,state.edit_module_name);

            //选择历史记录的时候，由于视图更新了，防止插入选中的那条
            if (record.data === state.Pointer.data) {
                commit('clear_Pointer_data');
                return;
            }

            //查询最后一条
            const data_list = await dispatch('my_websql',{
                sql:'select * FROM historical_list WHERE page=? order by rowid desc limit 1',
                data:[rootState.now_page]
            });

            if(data_list && data_list.rows && data_list.rows.length > 0){
                const last_data = data_list.rows[0];

                //在选中前面的历史记录，先删除后面的，再插入新的
                if (state.Pointer.state === 'select') {
                    const del_Result = await dispatch('my_websql',{
                        sql:'DELETE FROM historical_list WHERE id > ? and page=?',
                        data:[state.Pointer.id,rootState.now_page]
                    });

                    dispatch('websql_INSERT',{data:record,fn:'historical_init_view'});

                }
                //正常插入
                else {
                    //判断本次要插入的和记录里最后一条是否一样
                    if (record.data != last_data.data) {
                        const COUNT_sql = 'SELECT COUNT(*) FROM historical_list WHERE page=?';
                        //先查数量
                        const COUNT_data = await dispatch('my_websql',{
                            sql:COUNT_sql,
                            data:[rootState.now_page]
                        });


                        if (COUNT_data && COUNT_data.rows && COUNT_data.rows.length > 0) {

                            //超出最大上限，删除第一条
                            if (COUNT_data.rows[0]['COUNT(*)'] >= state.websql_max) {

                                //删除第一条
                                dispatch('delect_first_sql');
                            }
                        }
                        //插入
                        dispatch('websql_INSERT',{data:record});
                    }
                }
            }
        },

        //清除所有
        async clear_all(store,{last_id,last_obj}){
            const { commit, dispatch, state, rootState } = store;
            const Result = await dispatch('my_websql',{
                sql:'DELETE FROM historical_list WHERE id < ? and page=?',
                data:[last_id,rootState.now_page]
            });
            if(Result && Result.rows && Result.rows.length === 0){
                commit('again_set_list',[last_obj]);
            }

        },

        //查找需要的历史记录
        async find_sql(store,{$message, type, id}) {
            const { commit, dispatch, state, rootState,getters } = store;
            let Revoke_id = null;
            if (type === 'Revoke') {
                //Revoke_id = Revoke_data(state);
                Revoke_id = getters.Revoke_data;
            } else if (type === 'Select') {
                Revoke_id = id;
            } else if (type === 'Recovery') {
                Revoke_id = getters.Recovery_data;
            }
            const sql_text = 'SELECT * FROM historical_list WHERE id=?';
            const sql_data = [Revoke_id];

            if (Revoke_id === null) {
                $message.error('已经到底了！');
                return;
            }
            const Result = await dispatch('my_websql',{
                sql:sql_text,
                data:sql_data
            });

            //sql没数据的时候，才插入
            if (Result && Result.rows && Result.rows.length > 0) {
                const sql_data = Result.rows[0];
                const style_data = JSON.parse(sql_data.data);
                commit('set_all_date',{rootState,style_data});
                commit('set_Pointer',{
                    obj:sql_data,
                    pointer_state:'select',
                    val:sql_data.data
                });
            }
        },

        //撤销
        Revoke(store,{event, $message}) {
            const { commit, dispatch, state, rootState } = store;
            if (event.ctrlKey == true && event.keyCode == 90) {
                rootState.module_name = '';
                //commit('special_mongolian_close', {}, {root: true});
                if (openDatabase) {
                    dispatch('find_sql',{$message,type:'Revoke'});
                }
            }
        },

        //恢复
        Recovery(store,{event, $message}) {
            const { commit, dispatch, state, rootState } = store;
            if (event.ctrlKey == true && event.keyCode == 88) {
                rootState.module_name = '';
                //commit('special_mongolian_close', {}, {root: true});
                if (openDatabase) {
                    dispatch('find_sql',{$message,type:'Recovery'});
                }
            }

        }


    },
    getters:{
        Revoke_data(state) {
            const Pointer_id = state.Pointer.id;
            let obj_id = null;
            for (let i = 0; i < state.historical_record.length; i++) {
                if (state.historical_record[i].id == Pointer_id && i != 0) {
                    obj_id = state.historical_record[i - 1].id;
                }
            }
            return obj_id;
        },

        Recovery_data(state) {
            const Pointer_id = state.Pointer.id;
            let obj_id = null;
            for (let i = 0; i < state.historical_record.length; i++) {
                if (state.historical_record[i].id == Pointer_id && i != state.historical_record.length - 1) {
                    obj_id = state.historical_record[i + 1].id;
                }
            }

            //根据当前的指针状态，判断是否到底
            if(obj_id){
                state.Pointer.state = 'select';
            }
            else{
                state.Pointer.state = 'last';
            }
            return obj_id;
        },

    }
};

export default historical_records;