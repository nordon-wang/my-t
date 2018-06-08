//没有底部编辑的挂件，专用的特殊蒙层
const special_mongolian = {
    state:{
        switch:false,//开关
        module:null//当前选择的挂件



    },
    mutations:{
        special_mongolian_open:(state,obj) => {
            state.switch = true;
            state.module = obj;
        },
        special_mongolian_close:(state) => {
            state.switch = false;
            state.module = null;
        },



    }
};

export default special_mongolian;