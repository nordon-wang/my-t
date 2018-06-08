//多选情况下的拖拽
const MultiSelect = {
    state:{
        position:{
            select:{
                id:0,
                top:0,
                left:0
            },
            all:[]
        }

    },
    mutations: {
        //多选拖拽重置
        position_reset: (state) => {
            state.position = {
                select: {
                    id: 0,
                    top: 0,
                    left: 0
                },
                all: []
            }
        },

        //楷书拖拽时，记录所有符合的
        position_push: (state, obj) => {
            state.position.all.push(obj);


        }
    }
};

export default MultiSelect;