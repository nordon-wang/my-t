
const obj = {
    namespaced: true,
    state:{

        test:12312313123
    },
    mutations:{
        mytest:(state)=>{
            debugger;
            console.log('测试');
        }


    },
    actions:{
        actions_mytest:(state)=>{
            debugger;
            console.log('测试');
        },
        actions_mytest2:(store)=>{
            const { commit, dispatch, state, rootState } = store;
            dispatch('actions_mytest');
        }

    }
};

export default obj;