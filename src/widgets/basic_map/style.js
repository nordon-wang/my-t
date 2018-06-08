export default {
    infor: {
        zoom: 10,
        addressList: [{
                title: '我是标题1',
                address: '上海珍岛信息技术有限公司',
                lng: 121.481877,
                lat: 31.289386
            },

        ],
        width: 500,
        height: 300
    },
    modal: false,
    editModal: false,
    addInfor: {
        title: '',
        address: '',
    },
    editInfor: {
        index: '',
        title: '',
        address: '',
        lng: Number,
        lat: Number
    },
    keyword: ['上海珍岛信息技术有限公司', '虹口足球场'],
    listArr: {

    },
    animateObj: {
        animatedType: '',
        animatedDuration: 0.5,
        animatedDelay: 0,
        animatedIterationCount: false,
        animatedState: '',
    }
}