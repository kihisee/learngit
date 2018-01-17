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
<div class="new_bank cz_cont">
        <ul>

                <li>
                    <span class="left_one add_card">开户名：</span>
                    <input class="bank" id="UserName" placeholder="请输入持卡人姓名" type="text" v-model="username">
                </li>
               <li>
                <span class="left_one add_card">身份证号码：</span>
              <input class="bank" id="IdCard" placeholder="请输入身份证号码" type="text" v-model="usercard">
            </li>

            <li style="position:relative;">
                <span class="left_one add_card">开户银行：</span>
                <select id="BankName" class="bankname valid"  v-model="selected">

                    <option :value="item.BankName" v-for="item in banklist">{{item.BankName}}</option>
                </select>
            </li>

            <li style="position:relative;">
                <span class="left_one add_card">卡号：</span>
                <input class="bank" id="CardNo" placeholder="银行卡号" type="text" v-model="bankcode">
                <div style="clear:both;"></div>
            </li>
            <li>
                <span class="left_one add_card">手机号码：</span>
                <input class="bank" id="MobilePhone" placeholder="请输入手机号码" type="text" v-model="phone">
            </li>
             <li>
                <div class="form-group" style="border:none;width:100%;"><span class="left_one" style="">验证码</span> <input id="MobileVCode" placeholder="请输入验证码" type="tel"  v-model="vcode"> <input type="button" :class="code" :value="timerCodeMsg" @click="getvcode()" v-bind:disabled="dis"></div>
            </li>
        </ul>

    </div>
    <a href="javascript:" id="submitBtn" class="next" @click="send()">提交</a>
</div>
</template>

<script>
export default {
  data () {
    return {
        title:"绑定银行卡",
        username:"",
        usercard:"",
        phone:"",
        selected:"",
        bankcode:"",
        vcode:"",
        banklist:[],
        timerCodeMsg:"获取验证码",
        sendMsgDisabled :true,
        time:60,
        dis:false,
        code:"yzmwz"
    }
  },
  methods:{
        checkinput(){
            let rename = /[\u4E00-\u9FA5]/g;  //测试中文字符的正则
            let rephone = /^1[34578]\d{9}$/; //手机号码
            let rebank = /^\+?[1-9][0-9]*$/;
            if(this.username==""){
                this.$msg.alert("请输入开户名！")
                return false
            }
            if(rename.test(this.username).length >20){
                this.$msg.alert("开户名不能大于20个中文字符")
                return false
            }
            if(this.usercard==""){
                this.$msg.alert("请输入身份证号！")
                return false
            }
            if(this.usercard.length<15||this.usercard.length>18){
                this.$msg.alert("请输入正确的身份证号码！")
                return false
            }
            if(this.phone==""){
                this.$msg.alert("请输入手机号！")
                return false
            }
            if(!rephone.test(this.phone)){
                this.$msg.alert("请输入正确的手机号码！")
                return false
              }

            if(this.bankcode==""){
                this.$msg.alert("请输入银行卡号！")
                return false
            }

            if(!rebank.test(this.bankcode)||this.bankcode.length>19||this.bankcode.length<16){
                this.$msg.alert("请输入正确的银行卡号！")
                return false
            }
            return true
        },
        send(){
            let _this = this
            if(!this.checkinput()){
                return
            }
            if(this.vcode==""){
                this.$msg.alert("请手机验证码！")
                return
            }
            this.$http(this.$api.getYePayBindCardConfirm({"username":this.username,"idcardno":this.usercard,"bankname":this.selected,"cardno":this.bankcode,"phone":this.phone,"validatecode":this.vcode}))
            .then(function(data){
                if(data.data.ResultCode==100000 ){
                    _this.$msg.alert(data.data.ResultMessage,function(){
                        _this.$router.push('/my')
                    })
                }else{
                     _this.$msg.alert(data.data.ResultMessage)
                }
            })

        },
        getvcode(){
            let _this = this
            if(!this.checkinput()){
                return
            }
            this.$http(this.$api.getYiPayAuthVcode({"username":this.username,"idcardno":this.usercard,"bankname":this.selected,"cardno":this.bankcode,"phone":this.phone}))
            .then(function(data){
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
                        _this.code="yzmwz"
                      }else{
                        _this.timerCodeMsg=_this.time+'秒后获取'
                        _this.dis=true
                        _this.code="yzmwz_bd"
                      }
                    }, 1000)
                  }
            })
        }
       },
   created :function(){
    let _this=this
            this.$http(this.$api.getquerybankinfo({"data":1}))
            .then(function(data){
                    _this.banklist = data.data.ResultData
                    _this.selected = _this.banklist[0].BankName
            })
   }
}
</script>

<style scoped>

</style>
