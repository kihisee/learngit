import ajax from '../api/ajax.js'
export default {
    /*****************************用户登陆/注册/修改信息******************************/
    //登录
    pass(obj){
        return ajax.getdata("login","userlogin",obj)
    },
    //注册
    reg(obj){
        return ajax.getdata("login","userreg",obj)
    },
    //获取验证码
    vcode(obj){
        return ajax.getdata("login","phonevcode",obj)
    },
    //获取验证码图片
    GetVcodeimg(obj){
        return ajax.getdata("user","GetVcode",obj)
    },
    //验证手机号码与验证码是否匹配的接口
    checkSmsVcode(obj){
        return ajax.getdata("login","CheckSmsVcode",obj)
    },
    //重置登录密码
     findpass(obj){
        return ajax.getdata("login","ResetPassword",obj)
    },
    //修改登录密码
     updatapaw(obj){
        return ajax.getdata("login","UpdateLoginPassword",obj)
    },
    //修改手机号码
    updataphone(obj){
        return ajax.getdata("User","UpdateMobilePhone",obj)
    },
    //退出登录
    userloginout(obj){
        return ajax.getdata("Login","UserLoginout",obj)
    },
    //邀请注册
    invitelink(obj){
        return ajax.getdata("Login","GetUserMobileByInviteCode",obj)
    },
    //判断是否注册
     ifreg(obj){
        return ajax.getdata("Login","CheckIsReg",obj)
    },
    /*****************************积分商城******************************/
    // 奖品列表
    getTakeCouponList(obj){
        return ajax.getdata("UserPointsTask","TakeCouponList",obj);
    },
    // 活动列表
    getActivitys(obj){
        return ajax.getdata("Activity","GetMobileActivitys",obj);
    },
    // 查询个人积分/积分榜
    getPointTopList(obj){
        return ajax.getdata("UserPointsTask","PointTopList",obj);
    },
    // 兑换礼品
    exchangePointCoupon(obj){
        return ajax.getdata("UserPointsTask","ExchangePointCoupon",obj);
    },
    // 当天是否签到
    signToday(obj){
        return ajax.getdata("UserPointsTask","UserIsSignToday",obj);
    },
    // 当天是否签到
    sign(obj){
        return ajax.getdata("UserPointsTask","SignIn",obj);
    },
    // 兑换记录
    pointchange(obj){
        return ajax.getdata("UserPointsTask","MyChange",obj);
    },
    // 查询我的收货地址
    myAddress(obj){
        return ajax.getdata("UserPointsTask","MyAddress",obj);
    },
    // 添加地址
    addAddress(obj){
        return ajax.getdata("UserPointsTask","AddAddress",obj);
    },
     /*****************************个人中心******************************/
    // 查询余额
    userbalance(obj){
        return ajax.getdata("user","queryaccountbalance",obj);
    },
    // 获取个人中心资产
    basset(obj){
        return ajax.getdata("user","queryaccountasset",obj);
    },
    // 获取交易明显
    queryAccountTradeLog(obj){
        return ajax.getdata("user","QueryAccountTradeLog",obj);
    },
    // 获取充值记录
    queryrechargelog(obj){
        return ajax.getdata("user","queryrechargelog",obj);
    },
    // 获取提现记录
    queryfetchmoneyLog(obj){
        return ajax.getdata("user","queryfetchmoneyLog",obj);
    },
    // 获取优惠券列表
    myquerytendercouponlist(obj){
        return ajax.getdata("usertender","querytendercouponlist",obj);
    },
    // 领取现金红包
    getuserusecoupon(obj){
        return ajax.getdata("usertender","userusecoupon",obj);
    },
    //获取持有和结束标的列表
    getquerymytenderinthislist(obj){
        return ajax.getdata("usertender","querymytenderinthislist",obj);
    },
    //获取投资中标的列表
    getquerymytenderprepaylist(obj){
        return ajax.getdata("usertender","querymytenderprepaylist",obj);
    },
    //获取标的详情
    getquerymytenderdetail(obj){
        return ajax.getdata("usertender","querymytenderdetail",obj);
    },
    //获取邀请奖励资产
    getqueryinviterewardasset(obj){
        return ajax.getdata("user","queryinviterewardasset",obj);
    },
    //兑换邀请奖励
    changeinvitereward(obj){
        return ajax.getdata("user","changeinvitereward",obj);
    },
    //获取用户消息列表
    getmsglist(obj){
        return ajax.getdata("user","QueryUserMessage",obj);
    },
    //更新用户消息
    updatamessage(obj){
        return ajax.getdata("user","UserUpdateMessage",obj);
    },
    //检测用户是否设置提现密码
    isPayPassword(obj){
        return ajax.getdata("user","IsPayPassword",obj);
    },
    //检测提现密码是否正确
    ValidatePayPwd(obj){
        return ajax.getdata("user","ValidatePayPwd",obj);
    },
    //设置/修改提现密码
    setpaypsw(obj){
        return ajax.getdata("User","SetPayPassword",obj)
    },
    //查询是否绑过银行卡
    getquerytenderbankcardlist(obj){
        return ajax.getdata("User","querytenderbankcardlist",obj)
    },
    //获取易宝添加银行卡验证码
    getYiPayAuthVcode(obj){
        return ajax.getdata("User","GetYiPayAuthVcode",obj)
    },
    //绑定易宝银行卡
    getYePayBindCardConfirm(obj){
        return ajax.getdata("User","YePayBindCardConfirm",obj)
    },
    //宝付充值接口
    baofucharge(obj){
        return ajax.getdata("user","usertenderrecharge",obj)
    },
    //宝付提现接口
    userfetchmoney(obj){
        return ajax.getdata("user","userfetchmoney",obj)
    },
    //易宝充值接口
    YePayRechargeConfirm(obj){
        return ajax.getdata("user","YePayRechargeConfirm",obj)
    },
    //易宝充值验证码
    YePayRechargeSendMsg(obj){
        return ajax.getdata("user","YePayRechargeSendMsg",obj)
    },
    //易宝提现接口
    YePayWithDraw(obj){
        return ajax.getdata("User","YePayWithDraw",obj)
    },
    //查询银行卡列表
    getquerybankinfo(obj){
        return ajax.getdata("User","querybankinfo",obj)
    },
    //获取自动投标状态
    getQueryAutoMaticList(obj){
        return ajax.getdata("usertender","QueryAutoMaticList",obj)
    },
    //自动投标
    setTenderAutoMatic(obj){
        return ajax.getdata("usertender","TenderAutoMatic",obj)
    },
    //是否绑定微信
    iswxbind(obj){
        return ajax.getdata("User","iswxbind",obj)
    },
    //解绑微信
    ajaxwxunbind(obj){
        return ajax.getdata("User","ajaxwxunbind",obj)
    },
    //获取个人信息
    GetUserInfo(obj){
        return ajax.getdata("User","GetUserInfo",obj)
    },
    /*****************************薪计划******************************/
    // 获取薪计划资产
    xjhBasset(obj){
        return ajax.getdata("hengruibao","queryhrbasset",obj);
    },
    // 获取薪计划七天收益或债权列表
    xjhsevendays(obj){
        return ajax.getdata("hengruibao","queryhrbinterestsandtenders",obj);
    },
    // 获取薪计划我的债权详情
    xjhquerytenderdetail(obj){
        return ajax.getdata("usertender","querytenderdetail",obj);
    },
     //获取薪计划投资人列表接口
    xjhqueryhrbtenderpayer(obj){
        return ajax.getdata("hengruibao","queryhrbtenderpayer",obj);
    },
    //获取薪计划收益，转入，转出记录
    xjhqueryhrbinterestsrecordlist(obj){
        return ajax.getdata("hengruibao","queryhrbinterestsrecordlist",obj);
    },
    //获取可转入恒瑞宝金额
    xjhquerytendersrollinmoney(obj){
        return ajax.getdata("hengruibao","querytendersrollinmoney",obj);
    },
    //获取可转出恒瑞宝金额
    xjhquerytendersrolloutmoney(obj){
        return ajax.getdata("hengruibao","querytendersrolloutmoney",obj);
    },
    //转入恒瑞宝
    xjhHrbRollIn(obj){
        return ajax.getdata("hengruibao","HrbRollIn",obj);
    },
    //转出恒瑞宝
    xjhHrbRollOut(obj){
        return ajax.getdata("hengruibao","HrbRollOut",obj);
    },
    /*****************************首页/标的******************************/
    //获取首页banner图
    getbanner(obj){
        return ajax.getdata("login","homepresent",obj);
    },
    //获取首页标的列表
    gettenderlist(obj){
        return ajax.getdata("usertender","querytenderlist",obj);
    },
    //获取标的投资人列表
    gettenderquerytenderpayer(obj){
        return ajax.getdata("usertender","querytenderpayer",obj);
    },
    //获取优惠券的列表 //新恒瑞
    GetTenderCouponList(obj){
        return ajax.getdata("usertender","GetTenderCouponList",obj);
    },
    //投标
    tenderprepay(obj){
        return ajax.getdata("usertender","prepay",obj);
    },
    //体验金投标
    tenderActivePay(obj){
        return ajax.getdata("usertender","ActivePay",obj);
    },
    /*****************************环迅******************************/
        // 是否注册环迅
    IsRegister(obj){
        return ajax.getdata("ips","IsRegister",obj);
    },
    /*****************************活动接口******************************/
     // 增投活动
    ztUserPeriodUncollectedMoney(obj){
        return ajax.getdata("UserPointsTask","GetUserPeriodUncollectedMoney",obj);
    },

    // 调查问卷提交
    riskfinal(obj){
        return ajax.getdata("User","SaveEvaluate",obj);
    },

    // 查询调查问卷有无评估
     riskEvaluate(obj){
        return ajax.getdata("User","QueryEvaluate",obj);
    },

     // 查询调查问卷有无评估
     riskhas(obj){
         return ajax.getdata("User","queryEvaluatePopUp",obj);
     },
     // 百万体验金活动抽奖接口
     getTYJPrize(obj){
         return ajax.getdata("UserPrize","TYJPrize",obj);
     },
     // 百万体验金活动top10接口
     GetTYJPrizeUserList(obj){
         return ajax.getdata("UserPrize","GetTYJPrizeUserList",obj);
     },
     // 百万体验金活动50红包接口
     CreateActivity50CouponCode(obj){
         return ajax.getdata("Activity","CreateActivity50CouponCode",obj);
     },
     // 百万体验金活动时间接口
     GetbaiwanActivityTime(obj){
         return ajax.getdata("Activity","GetActivityTime",obj);
     },
     // 百万体验金活动领取加息券
     GetAppOneInterestRate(obj){
         return ajax.getdata("Activity","GetAppOneInterestRate",obj);
     },
     // 首页体验标详情
     QueryActiveTenderDetail(obj){
         return ajax.getdata("usertender","QueryActiveTenderDetail",obj);
     },
      // 查询复投标的
     QueryHrbTenderAutoMatic(obj){
         return ajax.getdata("TenderAutomatic","QueryHrbTenderAutoMatic",obj);
     },
       // 修改复投标的
     UpdateHrbTenderAutoMatic(obj){
         return ajax.getdata("TenderAutomatic","UpdateHrbTenderAutoMatic",obj);
     },
     // 请求服务器时间 /home/GetSystemTime
     GetSystemTime(obj){
         return ajax.getdata("home","GetSystemTime",obj);
     },
      //龙虎榜
     TopInvest(obj){
         return ajax.getdata("Activity","TopInvest",obj);
     },

      //百万体验金推广添加8888
     TYJCoupon(obj){
         return ajax.getdata("UserPrize","TYJCoupon",obj);
     },
    //砸金蛋信息
     GoldenEggInfo (obj){
         return ajax.getdata("Activity","GoldenEggInfo",obj);
     },
     //砸金蛋结果
     GoldenEggDraw (obj){
         return ajax.getdata("Activity","GoldenEggDraw",obj);
     },
     //砸金蛋中奖列表
     GoldenEggGiftList (obj){
         return ajax.getdata("Activity","GoldenEggGiftList",obj);
     },

     //暖冬注册结果
     RegisterGiftDraw (obj){
         return ajax.getdata("Activity","RegisterGiftDraw",obj);
     },
     //暖冬注册列表
     RegisterGiftList (obj){
         return ajax.getdata("Activity","RegisterGiftList",obj);
     },

      //积分抽奖结果
     PointDraw (obj){
         return ajax.getdata("Activity","PointDraw",obj);
     },
     //积分抽奖内容
     PointDrawInfo (obj){
         return ajax.getdata("Activity","PointDrawInfo",obj);
     },

     //积分抽奖中奖列表
     PointDrawGiftList (obj){
         return ajax.getdata("Activity","PointDrawGiftList",obj);
     },

     //预约打卡
     UserBookClock (obj){
         return ajax.getdata("UserClock","UserBookClock",obj);
     },
     //打卡
     UserClockOn (obj){
         return ajax.getdata("UserClock","UserClockOn",obj);
     },
     //打卡记录
     QueryUserClockList (obj){
         return ajax.getdata("UserClock","QueryUserClockList",obj);
     },
     //打卡统计
     QueryUserClockTotal (obj){
         return ajax.getdata("UserClock","QueryUserClockTotal",obj);
     },
     //查询打卡情况
     QueryUserClockDetail (obj){
         return ajax.getdata("UserClock","QueryUserClockDetail",obj);
     },
     //暖冬投资好礼相送注册登录报名
     SignUpWarmWinterInvestActivity (obj){
         return ajax.getdata("Activity","SignUpWarmWinterInvestActivity",obj);
     },
     //暖冬投资好礼相送注册登录报名查询
     QueryWarmWinterInvestActivityInfo (obj){
         return ajax.getdata("Activity","QueryWarmWinterInvestActivityInfo",obj);
     },
     /*****************************资讯******************************/
     //资讯列表
     getNewsList (obj){
         return ajax.getdata("News","NewsList",obj);
     },
     //资讯详情
     getNewsDetail (obj){
         return ajax.getdata("News","Detail",obj);
     },
     //帮助中心菜单
     HelpCate (obj){
         return ajax.getdata("News","HelpCate",obj);
     },
     //帮助中心列表
     HelpList (obj){
         return ajax.getdata("News","HelpList",obj);
     },
     //帮助中心列表
     HelpList (obj){
         return ajax.getdata("News","HelpList",obj);
     },
     //信息披露
     InfoCate (obj){
         return ajax.getdata("News","InfoCate",obj);
     },
     //信息披露列表
     InfoList (obj){
         return ajax.getdata("News","InfoList",obj);
     },
     /*****************************新理财******************************/
       //获取标的列表
     getQueryPlanList(obj){
         return ajax.getdata("PlanInvest","QueryPlanList",obj);
     },
       /*****************************会员详情******************************/
     GiftBagDescList(obj){
         return ajax.getdata("Member","GiftBagDescList",obj);
     },
      GiftBagCouponList(obj){
         return ajax.getdata("Member","GiftBagCouponList",obj);
     },
     LevelUpNeedPay(obj){
         return ajax.getdata("Member","LevelUpNeedPay",obj);
     },
}