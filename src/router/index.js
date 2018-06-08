import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import H1 from '@/components/H1'
// import H2 from '@/components/H2'
import Index from '@/view/index.vue'



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      alias:'/mi',
      meta:{
        title:'首页'
      }
    },
    {
      path: '/h',
      component: HelloWorld
    }
  ]
  // url地址会显示正常 但是需要后台配置
  // mode:'history'
})

