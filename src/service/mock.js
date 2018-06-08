
// 配置 Mock 路径
const Mock = require('mockjs');
const Random = Mock.Random;
//导航请求
Mock.mock('/nav', /post|get/i, function() {
    let data = [];
    const list = ['商品分类','小米手机','红米手机','电视机','笔记本','小米盒子','小米手环'];
    for (let i = 0; i <7; i++) {
        var id = Random.id();
        let obj = {
            'id': Random.id(),
            "pid": 0,
            "name": list[i],
            "link": Random.url(),
            "seq":Random.integer(1000, 2000),
            "state": Random.integer(1, 4).toString(),
            "disabled":'false',
            "isopenwindow":Random.boolean().toString(),
            "icon":'',
            "module":'index:index',
            "children_show":'true',
            "children":[]
        };

        let parent = Mock.mock(obj);
        if(Math.random() > 0.5){
            for(var j = 0;j<5;j++){
                var child = Mock.mock(obj);
                child.pid = id;
                child.name = Random.cname();
                parent.children.push(child);

            }
        }
        data.push(parent);
    }
    return data;
});
Mock.setup({ timeout: 880 });

let mydata = Mock.mock([{"id":"8172","pid":"0","title":"\u9996\u9875","name":"index","theme_id":"800013","module":"index:index","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8173","pid":"0","title":"\u4ea7\u54c1\u4e2d\u5fc3","name":"product_index","theme_id":"800013","module":"product:index","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8174","pid":"0","title":"\u4ea7\u54c1\u8be6\u7ec6\u9875","name":"product","theme_id":"800013","module":"product:item","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8175","pid":"0","title":"\u65b0\u95fb\u4e2d\u5fc3","name":"article_index","theme_id":"800013","module":"article:index","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8176","pid":"0","title":"\u65b0\u95fb\u8be6\u60c5\u9875","name":"article","theme_id":"800013","module":"article:item","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8177","pid":"0","title":"\u6210\u529f\u6848\u4f8b","name":"case_index","theme_id":"800013","module":"case:index","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8178","pid":"0","title":"\u6848\u4f8b\u8be6\u60c5\u9875","name":"case","theme_id":"800013","module":"case:item","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8179","pid":"0","title":"\u89c6\u9891\u5217\u8868","name":"video_index","theme_id":"800013","module":"video:index","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8180","pid":"0","title":"\u89c6\u9891\u8be6\u60c5","name":"video","theme_id":"800013","module":"video:item","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8181","pid":"0","title":"\u5e2e\u52a9\u5217\u8868","name":"help_index","theme_id":"800013","module":"help:index","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8182","pid":"0","title":"\u5e2e\u52a9\u8be6\u60c5","name":"help","theme_id":"800013","module":"help:item","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8183","pid":"0","title":"\u4e0b\u8f7d\u5217\u8868","name":"download_index","theme_id":"800013","module":"download:index","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8184","pid":"0","title":"\u4e0b\u8f7d\u8be6\u60c5","name":"download","theme_id":"800013","module":"download:item","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8185","pid":"0","title":"\u5173\u4e8e\u6211\u4eec","name":"about","theme_id":"800013","module":"p:about","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8186","pid":"0","title":"\u4f01\u4e1a\u6587\u5316","name":"culture","theme_id":"800013","module":"p:culture","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8187","pid":"0","title":"\u8363\u8a89\u8d44\u8d28","name":"honor","theme_id":"800013","module":"p:honor","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8188","pid":"0","title":"\u8054\u7cfb\u6211\u4eec","name":"contact","theme_id":"800013","module":"p:contact","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8189","pid":"0","title":"\u5728\u7ebf\u7559\u8a00","name":"message","theme_id":"800013","module":"p:message","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8190","pid":"0","title":"\u4eba\u624d\u62db\u8058","name":"job","theme_id":"800013","module":"p:job","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8191","pid":"0","title":"\u62db\u8058\u8be6\u60c5","name":"job_item","theme_id":"800013","module":"job:item","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8192","pid":"0","title":"\u7ad9\u70b9\u5730\u56fe","name":"sitemap","theme_id":"800013","module":"sitemap:sitemap","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"},{"id":"8193","pid":"0","title":"\u641c\u7d22","name":"search","theme_id":"800013","module":"search:index","is_default":"0","is_system":"true","disp_style":"","updatetime":"0","disabled":"false","theme_type":"pc","language":"zh-cn"}]);

// 页面管理模拟接口
Mock.mock('/dates',/get/i,(options)=>{
    return mydata;
});

