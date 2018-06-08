/*
 * @Author: kaker.xutianxing 
 * @Date: 2018-04-11 16:20:00 
 * @Last Modified by: kaker.xutianxing
 * @Last Modified time: 2018-05-04 14:30:01
 */
import WY from './row_extend';
import Store from '../vuex/store';
import { loadavg } from 'os';
import { log, debug } from 'util';

class Child_Templet extends WY {
    constructor(...args) {
        super(...args);
        //这里定义属性

    }



    x_change_size({ id, name, type, rowIndex, moduleIndex, width, height }) {
        let props = Store.state[type][rowIndex].children[moduleIndex].data.infor;
        if (name == 'basic_select') {
            props.width = width;
            props.height = height;
            return false;
        } else if (name == 'basic_map') {
            props.width = width;
            props.height = height;
            return false;
        }

    }


    x_change_size_tem({ id, name, type, rowIndex, moduleIndex, width, height }) {

        this.x_change_size({ id, name, type, rowIndex, moduleIndex, width, height });
        // debugger;
    }

    deleteKey(e) {
        if (e.keyCode == 46) {
            let module_message = Store.state.module_Data;
            let select_message = Store.state.select_module;
            if (module_message != null) {

                let id = module_message.widgets_id,
                    pid = module_message.pid,
                    type = module_message.rowType;
                this.p_del_module({ id, pid, type });


            } else if (select_message.jsonArr.length > 0) {
                this.p_$confirm('是否删除挂件', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (let index = 0; index < select_message.jsonArr.length; index++) {
                        const element = select_message.jsonArr[index];
                        let id = select_message.jsonArr[index].id,
                            pid = select_message.jsonArr[index].pid,
                            type = select_message.jsonArr[index].rowType;
                        this.p_del_module({ id, pid, type }, 'you');
                    }
                }).catch(() => {
                    console.log('取消')
                });


            }
        }
    }
    




}

export default Child_Templet;