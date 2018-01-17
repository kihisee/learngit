<template>
<div class="login_wrap">

    <div class="link_head">
    <h1>
        <span>
            <a href="javascript:history.go(-1);" id="showmenu">
                <img src="static/img/icon_left.png">
            </a>
        </span>
        {{title}}
    </h1>
</div>
<div class="cz_contb">
    <div class="form-chongz form-chongzl">
        <span class="left_one">可用金额：</span>
        <p class="fcz_p"><span>{{state.basset.Balance}}</span>元</p>
    </div>
</div>
<div class="cz_cont" id="chongzhi">
    <div class="form-chongz form-chongzl">
        <span class="left_one">充值金额</span>
        <input type="text" name="rechargeMoney" id="rechargeMoney" placeholder="请输入充值金额" v-on:input ="checkmoney()"  v-model="money">
        <span class="cz_yuan">元</span>
    </div>
        <div class="form-group form-chongz form-chongzl">
    <span class="left_one">充值卡号</span>
    <span class="left_bank" :style="background" style="width:12%">
    </span>
                 <p class="bank_p" style="width:auto">
                     <span class="fir_bank">{{bankname}}</span>
                     <span class="sco_num">{{bankcode.substr(0,4)}}********{{bankcode.substr(bankcode.length-4,bankcode.length)}}</span>
                 </p>

    </div>
</div>

<div class="cz_cont">
    <div class="form-chongz form-chongzl form-group" style="border:none"><span class="left_one" style="width:25%">验证码</span> <input id="MobileVCode" placeholder="请输入验证码" type="tel" v-model="vcode"> <input type="button" :class="color" :value="timerCodeMsg" v-bind:disabled="dis" @click="getvcode()"></div>
</div>

<div class="cz_contb" v-show="mobileshow">
    <div class="form-chongz form-chongzl">
        <p class="fcz_p" style="width:100%">验证码已发送到您的手机{{state.user.MobilePhone.substr(0,3)}}****{{state.user.MobilePhone.substr(state.user.MobilePhone.length-4,state.user.MobilePhone.length)}}</p>
    </div>
</div>

<div class="fin_wen cz_fin">

    <div class="div_zh">
        <a href="javascript:;" class="lijitou" @click="submityibao()">确定充值</a>
    </div>
</div>
<div v-if="open">
    <div class="black_bg"></div>
    <div class="main_alert_box">
        <div class="main_box">
            <h1>充值说明</h1>
            <div class="content">
            <p>1. 您充值的资金若未或投资就提现，第三方支付公司会收取您提现金额的1%作为转账费用，且当日充值金额若发起的提现，次日到账。节假日顺延工作到账。</p>
            <p>2. 请尽量使用储蓄卡进行充值，并确认您的银行卡开通了网上银行业务</p>
            <p>3. 快捷支付充值每人单笔最高额度6万、单日最高额度30万</p>
            <p>4. 如需加快到账或长时间未到账可拨打：4008-055-066 或联系在线客服</p>
            </div>
            <div class="bottombtn">
                <a href="javascript:" @click="setprompt()">我知道了</a>
                <input type="checkbox" v-model="checkbox"/>不再弹出
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
        title:"充值",
        background:"",
        bankstyle:"",
        bankname:"",
        bankcode:"",
        vcode:"",
        color:"yzmwz",
        money:"",
        state:this.$store.state,
        open:true,
        checkbox:true,
        mobileshow:false,
        banktype:1,
        timerCodeMsg:"获取验证码",
        sendMsgDisabled :true,
        time:60,
        dis:false,
    }
  },
  methods:{
        checkmoney(){
               if(this.money !=''&& this.money.substr(0,1) == '.'){
            this.money="";
        }
        this.money = this.money.replace(/^0*(0\.|[1-9])/, '$1');
        this.money = this.money.replace(/[^\d.]/g,"");
        this.money = this.money.replace(/\.{2,}/g,".");
        this.money = this.money.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
        this.money = this.money.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
        if(this.money.indexOf(".")< 0 && this.money !=""){
            if(this.money.substr(0,1) == '0' && this.money.length == 2){
                this.money= this.money.substr(1,this.money.length);
            }
        }


        },
        submityibao(){
            let _this =this
            if(this.money==""){
                 _this.$msg.alert("请输入充值金额")
                 return
            }
            if(this.vcode==""){
                 _this.$msg.alert("请输入手机验证码")
                 return
            }
            if(this.banktype==2){
                this.$http(this.$api.YePayRechargeConfirm({"amount":this.money,"validatecode":this.vcode,"yePayVersion":1.0}))
                .then((data) => {
                    if(data.data.ResultCode ==100000 ){
                        _this.$msg.alert(data.data.ResultMessage,function(){
                            _this.$store.dispatch('basset')
                             _this.$router.push('/my')
                        })
                    }

                });
            }
        },
        getvcode(){
            let _this =this
            if(this.money==""){
                 _this.$msg.alert("请输入充值金额")
                 return
            }
            this.$http(this.$api.YePayRechargeSendMsg({"amount":this.money}))
            .then((data) => {
                if(data.data.ResultCode !=100000 ){
                    _this.$msg.alert(data.data.ResultMessage)
                }else{
                    _this.sendMsgDisabled = true
                    let interval = window.setInterval(function() {
                      if ((_this.time --) <= 0) {
                        _this.time = 60
                        _this.sendMsgDisabled = false;
                        _this.timerCodeMsg="获取验证码";
                        window.clearInterval(interval)
                        _this.dis=false
                        _this.color="yzmwz"
                      }else{
                        _this.timerCodeMsg=_this.time+'秒后获取'
                        _this.dis=true
                        _this.color="yzmwz_bd"
                      }
                    }, 1000)
                  }
            });
        },
        getprompt(){
            let ls = window.localStorage
            let getprompt = ls.getItem("chargeprompt")
            if(getprompt){
                this.open = false;
            }
        },
        setprompt(){
            let ls = window.localStorage
            if(this.checkbox){
                ls.setItem("chargeprompt",true)
            }
            this.open = false;
        }
       },
       created :function(){
        let _this=this
        this.getprompt()
        let bankname=[
                    {bankname:"农业银行",bankstyle:"bank-ny"},
                    {bankname:"工商银行",bankstyle:"bank-gs"},
                    {bankname:"建设银行",bankstyle:"bank-js"},
                    {bankname:"交通银行",bankstyle:"bank-jt"},
                    {bankname:"中国银行",bankstyle:"bank-zg"},
                    {bankname:"兴业银行",bankstyle:"bank-zy"},
                    {bankname:"中信银行",bankstyle:"bank-zx"},
                    {bankname:"光大银行",bankstyle:"bank-gd"},
                    {bankname:"平安银行",bankstyle:"bank-pa"},
                    {bankname:"邮政储蓄",bankstyle:"bank-yj"},
                    {bankname:"上海银行",bankstyle:"bank-sh"},
                    {bankname:"浦发银行",bankstyle:"bank-pf"},
                    {bankname:"民生银行",bankstyle:"bank-ms"},
                    {bankname:"招商银行",bankstyle:"bank-zs"},
                ]
            this.$http(this.$api.getquerytenderbankcardlist({}))
            .then((data) => {
                let bankdata = data.data.ResultData.List
                    bankdata.forEach(function(value) {
                        if(value.BankCardType==2){
                        bankname.forEach(function(value) {
                            if(value.bankname==data.data.ResultData.List[0].BankName){
                                _this.bankstyle=value.bankstyle
                                _this.bankname=value.bankname
                            }
                            });
                            _this.bankcode=data.data.ResultData.List[0].CardNo
                            _this.banktype=data.data.ResultData.List[0].BankCardType
                            let src = "background:url(static/img/banklogo/"+_this.bankstyle+".png) no-repeat  0.25rem  center; background-size: 0.75rem;"
                            _this.background=src
                        }else{
                            _this.$msg.alert("支付系统升级请重新绑定银行卡后充值！",function(){
                                _this.$router.push('/addbank')
                            })
                        }
                    });

            });

       }
}
</script>

<style scoped>

</style>
