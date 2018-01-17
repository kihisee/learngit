import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      alias: '/', //别名
      name:'恒瑞金服',
      //redirect: '/b'   重定向
      component: require('../view/index'),
    },
    //登录
    {
      path: '/login',
      component: require('../view/pass/login')
    },
    //注册
    {
      path: '/reg',
      component: require('../view/pass/reg')
    },
    //存钱宝注册
    {
      path: '/cqbreg',
      name:'暖冬投资壕礼相送',
      component: require('../view/pass/cqbreg')
    },
    //个人中心
    {
      path: '/my',
      name:'个人中心',
      component: require('../view/my/index'),
      meta: {auth: true}
    },
     //注册协议
    {
      path: '/agreement',
      name:'注册协议',
      component: require('../view/help/agreement')
    },

     //金服介绍
    {
      path: '/introduction',
      name:'积分说明',
      component: require('../view/help/introduction')
    },
    /*****************************活动区******************************/
     //百万体验金活动
    {
      path: '/experienceMoney',
      name:'百万体验金',
      component: require('../view/activity/experienceMoney'),
    },
     //邀请新手注册
    {
      path: '/invitelink',
      name:'邀请新手注册',
      component: require('../view/pass/invitelink'),
    },
     //打卡签到
    {
      path: '/clock',
      name:'早起打卡赚积分',
      component: require('../view/activity/clock'),
    },
     //砸金蛋活动
    {
      path: '/hitegg',
      name:'欢乐砸金蛋',
      component: require('../view/activity/hitegg'),
    },
     //砸金蛋活动
    {
      path: '/rollreward',
      name:'小积分抽大奖',
      component: require('../view/activity/rollreward'),
    },
    //资讯
    {
      path: '/news',
      name:'资讯',
      component: require('../view/news/index'),
    },
    //资讯详情
    {
      path: '/newsdetail',
      name:'资讯详情',
      component: require('../view/news/newsdetail'),
    },
    //暖冬注册
    {
      path: '/winter',
      name:'暖冬注册',
      component: require('../view/activity/winter'),
    },
    //帮助中心
    {
      path: '/help',
      name:'帮助中心',
      component: require('../view/help/index'),
    },
    //帮助中心列表
    {
      path: '/helplist',
      name:'帮助中心列表',
      component: require('../view/help/helplist'),
    },
    //帮助中心详细
    {
      path: '/helpdetail',
      name:'帮助中心详细',
      component: require('../view/help/helpdetail'),
    },
    //信息披露
    {
      path: '/infocate',
      name:'信息披露',
      component: require('../view/help/infocate'),
    },
    //信息披露列表
    {
      path: '/infolist',
      name:'信息披露列表',
      component: require('../view/help/infolist'),
    },
    //信息披露详细
    {
      path: '/infodetail',
      name:'信息披露详细',
      component: require('../view/help/infodetail'),
    },
    //会员详情
    {
      path: '/member',
      name:'会员详细',
      component: require('../view/activity/member'),
    },
    //等级说明
    {
      path: '/levalexplain',
      name:'等级说明',
      component: require('../view/activity/levalexplain'),
    },
  ]

})



