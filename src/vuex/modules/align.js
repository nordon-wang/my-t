//对齐线
const align = {
    state:{
        targetDom:[],//在同屏幕的dom数组
        Error_amount:1,//对齐的误差量
        Error_lock:5,//锁定的误差
        lock:{
            transverse_lock:false,//横向锁定值
            vertical_lock:false,//竖向锁定值
        },
    },
    mutations:{
        clear_targetDom:(state)=>{
            state.targetDom = [];
        },
        add_targetDom:(state,obj)=>{
            state.targetDom.push(obj);
        },
        lock_transverse_true:(state)=>{
            state.lock.transverse_lock = true;
        },
        lock_transverse_false:(state)=>{
            state.lock.transverse_lock = false;
        },
        lock_vertical_true:(state)=>{
            state.lock.vertical_lock = true;
        },
        lock_vertical_false:(state)=>{
            state.lock.vertical_lock = false;
        },
    }
};

export default align;