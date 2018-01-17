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
        <span class="left_one">提现金额</span>
        <input type="text" name="rechargeMoney" id="rechargeMoney" placeholder="请输入充值金额" v-on:input ="checkmoney()"  v-model="money">
        <span class="cz_yuan">元</span>
    </div>
        <div class="form-group form-chongz form-chongzl">
    <span class="left_one">提现卡号</span>
    <span class="left_bank" :style="background" style="width:12%">
    </span>
                 <p class="bank_p" style="width:auto">
                     <span class="fir_bank">{{bankname}}</span>
                     <span class="sco_num">{{bankcode.substr(0,4)}}********{{bankcode.substr(bankcode.length-4,bankcode.length)}}</span>
                 </p>

    </div>
</div>

<div class="cz_cont">

    <div class="form-chongz form-chongzl form-group" style="border:none">
        <span class="left_one">交易密码</span>
        <input id="PayPassword" name="PayPassword" placeholder="交易密码" style="width: 55%;" type="password"  v-model="password">
        <router-link :to="'/setpaypsw'" class="wangjimima">
        忘记密码?
        </router-link>
    </div>
</div>


<div class="fin_wen cz_fin">

    <div class="div_zh">
        <a href="javascript:;" class="lijitou" @click="submityibao()">确定提现</a>
    </div>
</div>

<div v-if="open">
    <div class="black_bg"></div>
    <div class="main_alert_box">
        <div class="main_box">
            <h1>提现说明</h1>
            <div class="content" style="height:65%;overflow-y:auto;">
        <p class="putong">1、为提高您的资金安全性，现已不能删除和变更提现银行卡，如您确需变更，请联系客服热线：4008-055-066  </p>
        <p class="putong">2、用户所充值资金未进行投资，且存入恒瑞宝2不超过48小时，提现时需要收取提现资金1%的手续费；</p>
        <p class="putong">3、单笔提现金额低于100元的，收取每笔2元的小额提现手续费；</p>
        <p class="putong">4、严禁信用卡套现等行为，一经发现将予以处罚，包括但不限于：限制收款、冻结账户、永久停止服务，并会影响银行征信记录；</p>
        <p class="putong" style="color: #ee0e13;">5、关于周末及节假日期间各银行到账情况的说明：支持工作日9:00-17：30时段申请的提款，当日到账； 周五下午18点至周日24点期间的提现 ，工作日早上9点后到账。国家法定节假日提现顺延至工作日到账。</p>
        <p class="putong">6、如需要更快完成提现，可致电：<span style="color: #ee0e13;">4008-055-066</span></p>
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
        title:"提现",
        background:"",
        bankstyle:"",
        bankname:"",
        bankcode:"",
        bankid:"",
        open:true,
        checkbox:true,
        money:"",
        state:this.$store.state,
        password:"",

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
                 _this.$msg.alert("请输入提现金额")
                 return
            }
            if(this.money>this.state.basset.Balance){
                _this.$msg.alert("提现金额不能大于余额")
                 return
            }
            if(this.banktype==2){
                this.$http(this.$api.YePayWithDraw({"amount":this.money,"paypwd":this.password,"yePayVersion":1.0}))
                .then((data) => {
                    if(data.data.ResultCode==100000){
                        _this.$msg.alert(data.data.ResultMessage,function(){
                            _this.$store.dispatch('basset')
                            _this.$router.push('/my')
                        })
                    }

                });
            }else if(this.banktype==1){
                _this.checkmoneypsw()
            }
        },
        checkmoneypsw(){
            this.$http(this.$api.ValidatePayPwd({"PayPwd":this.password}))
                .then((data) => {
                    if(data.data.ResultCode ==100000){
                        this.$http(this.$api.userfetchmoney({"Money":this.money,"Id":this.bankid}))
                        .then((data) => {
                            _this.$msg.alert(data.data.ResultMessage)
                        });
                    }else{
                        _this.$msg.alert(data.data.ResultMessage)
                    }

            });
        },
        showbank(data){
            let _this=this
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
                bankname.forEach(function(value) {
                if(value.bankname==data.BankName){
                    _this.bankstyle=value.bankstyle
                    _this.bankname=value.bankname
                }
                });
                _this.bankid = data.Id
                _this.bankcode=data.CardNo
                _this.banktype=data.BankCardType
                let src = "background:url(static/img/banklogo/"+_this.bankstyle+".png) no-repeat  0.25rem  center; background-size: 0.75rem;"
                _this.background=src
        },
        getprompt(){
            let ls = window.localStorage
            let getprompt = ls.getItem("fetchprompt")
            if(getprompt){
                this.open = false;
            }
        },
        setprompt(){
            let ls = window.localStorage
            if(this.checkbox){
                ls.setItem("fetchprompt",true)
            }
            this.open = false;
        }
       },
       created :function(){
            let _this=this
            this.getprompt();
            this.$http(this.$api.getquerytenderbankcardlist({}))
            .then((data) => {
                if(data.data.ResultData.List.length>0){
                    let bankdata = data.data.ResultData.List
                    bankdata.forEach(function(value) {
                        if(value.BankCardType==2){
                            _this.showbank(value)
                        }else{
                           _this.$msg.alert("支付系统升级请重新绑定银行卡后提现！",function(){
                                _this.$router.push('/addbank')
                            })
                        }
                    });
                }else{
                    _this.$msg.alert("请先绑定银行卡！",function(){
                                _this.$router.push('/addbank')
                    })
                }

            });

       }
}
</script>

<style scoped>

</style>
