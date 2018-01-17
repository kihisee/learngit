<template>
<div class="container">
  <div class="banner"></div>
  <div class="maininput">
      <div class="regbox" v-if="isuser==0">
          <ul>
            <li><input placeholder="请输入手机号码" type="tel"  v-model="MobilePhone"></li>
            <li class="inputtext" style="margin-bottom:0.25rem" v-if="showcode">
                <input placeholder="请输入右侧结果" type="tel" v-model="imgcode"/>
                <span class="vcodeimg" :style="base64"></span>
            </li>
            <li><input placeholder="请输入验证码" type="tel" class="vcodes"  v-model="vcode"><input type="button"  v-on:click="sendcode()"  class="yzmwz" v-model="timerCodeMsg" v-bind:disabled="dis"></li>
            <li><input placeholder="请设置登录密码" type="password"  v-model="password"></li>
          </ul>
          <div class="regsunmit"><a herf="javascript:" @click="reg">立即报名</a></div>
          <div class="login_box"><span class="tw">已有账号？</span><a href="javascript:" @click="loginbox">登录报名</a></div>
      </div>
      <div class="regbox" v-if="isuser==1">
          <ul>
            <li><input placeholder="请输入手机号码" type="tel"  v-model="MobilePhone"></li>
            <li><input placeholder="请输入登录密码" type="password"  v-model="password"></li>
          </ul>
          <div class="regsunmit"><a herf="javascript:" @click="login">登录报名</a></div>
          <div class="login_box"><span class="tw">没有账号？</span><a href="javascript:" @click="regbox">马上注册</a></div>
      </div>
      <div class="regbox" v-if="isuser==2">
          <p class="success">恭喜您，报名成功！</p>
          <div class="regsunmit"><a herf="javascript:" @click="gopage">马上前往APP投资活期宝</a></div>
      </div>
  </div>
  <div class="subcont_box">
    <div class="row">
      <p class="title">活动规则</p>
      <div class="text_box">
        <div class="borderline">
          <p>1、活动期间注册用户投资活期宝1000元以上，并锁定30天内不提现即免费送100元购物卡（步步高超市购物卡、中邦卜蜂莲花购物卡二选一）。（例如：投资3000，锁定1000元30天不提现；投资5000元，锁定1000元30天不提现）；</p>
          <p>2、领取方式：投资完成后即可凭在平台预留号码前往永州市冷水滩区双洲路626-628领取；</p>
          <p>3、领取时间：活动期间及活动结束后一周内，过期不领取将视为失效；</p>
          <p>4、本次活动最终解释权归恒瑞金服所有。</p>
        </div>
      </div>
    </div>
    <div class="row">
      <p class="title">如何投资活期宝</p>
      <div class="img"><img src="/static/img/activity/cqb/conte.png"></div>
    </div>
    <p class="textbig">完成充值即可获得100元购物卡</p>
    <p><img src="/static/img/activity/cqb/coupon.png"></p>
  </div>
</div>
</template>

<script>
import ls from '../../store/lStorage.js'
export default {
  data () {
    return {
      MobilePhone:"",
      vcode:"",
      password:"",
      timerCodeMsg:"发送验证码",
      isuser:0,
      sendMsgDisabled :true,
      time:60,
      dis:false,
      codetype:11,
      invitecode:'',
      EnterChannel:'',
      imgcode:'',
      base64:"",
      showcode:false,
      IsShowImgVoce:0,
    }
  },
  methods:{
    gopage(){
        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinyang.wealth"
    },
    loginbox(){
      this.isuser = 1;
    },
    regbox(){
      this.isuser = 0;
    },
    SignUpWarmWinterInvestActivity(){
      let obj={}
      let _this = this
      if(this.isuser==0){
        obj = {"MobilePhone":this.MobilePhone,"SignUpType":1,"MobileVCode":this.vcode}
      }else if(this.isuser==1){
         obj = {"MobilePhone":this.MobilePhone,"SignUpType":0}
      }
      this.$http(this.$api.SignUpWarmWinterInvestActivity(obj))
       .then((data) => {
        console.log(data)
          if(data.data.ResultCode == 100000){
            _this.isuser=2
          }else{
            _this.$msg.alert(data.data.ResultMessage)
          }
       })
    },
    getvcodeimg(){
      let _this = this;
       this.$http(this.$api.GetVcodeimg({"MobilePhone":this.MobilePhone,"type":this.codetype}))
      .then((data) => {
        _this.base64 = 'background:url(data:image/png;base64,'+data.data.ResultData+') no-repeat center top;background-size:100% 100%';
      })
    },
    activityuserinfo(){
      let _this = this;
       this.$http(this.$api.QueryWarmWinterInvestActivityInfo({}))
       .then((data) => {
         if(data.data.ResultCode == 100000){
            if(data.data.ResultData.IsCanSignUp){
              _this.SignUpWarmWinterInvestActivity()
           }else{
            _this.$msg.alert(data.data.ResultMessage)
           }
         }else{
          _this.$msg.alert(data.data.ResultMessage)
         }
       })
    },
    login(){
      let _this = this
        if(this.MobilePhone==""){
        this.$msg.alert("请输入手机号码！")
          return false
        }
        if(this.password==""){
        this.$msg.alert("请输入登录密码！")
          return
        }
        this.$store.dispatch('upuserinfo',{phone:this.MobilePhone,password:this.password})
        .then((data) => {
            this.activityuserinfo()
        })
       },
     reg(){
      let me = this
      if(!this.checkinput()){
        return
      }
      let query = this.$route.query
      this.$http(this.$api.reg({"LoginPassword":me.password,"EnterChannel":me.EnterChannel,"TerminalType":2,"MobilePhone":me.MobilePhone,"UserName":"hahah","MobileVCode":me.vcode,"InviteCode":me.invitecode,"SignUpType":1}))
            .then(function(data){
                    if(data.data.ResultCode==100000){
                        let obj = {
                          MobilePhone:me.MobilePhone,
                          Token:data.data.ResultData.Token,
                          UserId:data.data.ResultData.UserId,
                          UserName:data.data.ResultData.UserName
                        }
                      ls.setItem("_user",obj)
                      me.$store.commit("userinfo")
                      me.activityuserinfo()
                    }else{
                      me.$msg.alert(data.data.ResultMessage)
                    }

            })

       },
    checkinput(){
      let rep = /^1[34578]\d{9}$/;
      let cpsw=/[\u4e00-\u9fa5]/g;
      let gpsw = /[\s]/g
      if(this.MobilePhone==""){
        this.$msg.alert("手机号码不能为空！")
        return false
      }
      if(!rep.test(this.MobilePhone)){
        this.$msg.alert("请输入正确的手机号码！")
        return false
      }
      if(this.vcode==""){
        this.$msg.alert("验证码不能为空！")
        return false
      }
      if(this.password==""){
        this.$msg.alert("密码不能为空！")
        return false
      }
      if(cpsw.test(this.password)||gpsw.test(this.password)||this.password.length<8||this.password.length>20){
        this.$msg.alert("密码长度为8-20位字符!")
        return false
      }
      return true
    },
      sendcode(){
         let _this = this
         let rep = /^1[34578]\d{9}$/;
        if(this.MobilePhone==""){
          this.$msg.alert("手机号码不能为空！")
          return false
        }
        if(!rep.test(this.MobilePhone)){
          this.$msg.alert("请输入正确的手机号码！")
          return false
        }
        this.$http(this.$api.vcode({"MobilePhone":this.MobilePhone,"type":this.codetype,"IsShowImgVoce":this.IsShowImgVoce,"Vcode":this.imgcode}))
                .then(function(data){
                  if(data.data.ResultCode !=100000 ){
                    if(data.data.ResultData==1){
                        _this.showcode = true;
                        _this.IsShowImgVoce = 1;
                        _this.getvcodeimg();
                        _this.$msg.alert("请输入图像验证码！")
                        return false
                    }
                      _this.$msg.alert(data.data.ResultMessage)
                  }else{
                    _this.sendMsgDisabled = true
                  _this.$msg.alert("验证码已发送到您的手机！")
                    let interval = window.setInterval(function() {
                      if ((_this.time --) <= 0) {
                        _this.time = 60
                        _this.sendMsgDisabled = false
                        _this.timerCodeMsg="获取验证码";
                        window.clearInterval(interval)
                        _this.dis=false
                      }else{
                        _this.timerCodeMsg=_this.time+'秒后获取'
                        _this.dis=true
                      }
                    }, 1000)
                  }
             })
      }
    },
    created:function(){
          let query = this.$route.query
        if(typeof this.$store.state.InviteCode!="undefined"){
          this.invitecode=this.$store.state.InviteCode
        }
        if(typeof this.$store.state.EnterChannel!="undefined"){
          this.EnterChannel=this.$store.state.EnterChannel
        }
    }
}
</script>

<style lang="scss" scoped>
.banner{@include bg("/static/img/activity/cqb/banner.jpg");height:rem(320);}
.maininput{padding:0 rem(20);background:#e82815; box-sizing:border-box; padding-bottom:rem(20);}
.regbox{overflow:hidden;}
.regbox li{margin-bottom:rem(15); overflow:hidden;}
.regbox input::-webkit-input-placeholder{@include sizeColor(0.4rem,$gray)font-weight:normal;}
.regbox input{@include widthHeight(100%,rem(40));border-radius:rem(10);border:none; padding:0 rem(15);box-sizing:border-box;outline: 0 none;font-size:rem(18);}
.regbox input.vcodes{@include widthHeight(60%,rem(40)); display:inline-block;vertical-align:top;}
.regbox input.yzmwz{@include widthHeight(37%,rem(40)); display:inline-block; float:right;background:#ffeb45; color:#ea2814;}
.regbox input[disabled].yzmwz{background:#ddd; color:#fff;}
.regbox .regsunmit{@include widthHeight(100%,rem(45)); margin:auto;margin-top:rem(20);border-radius:rem(5); text-align:center; line-height:rem(45);background:#ffe934;}
.regbox .regsunmit a{@include sizeColor(0.45rem,#ea2814); display:block;}
.subcont_box{background:#ffe59b; padding:rem(20) rem(20);box-sizing:border-box; overflow:hidden;}
.subcont_box .row{margin-bottom:rem(20)}
.subcont_box .row .title{@include bg("/static/img/activity/cqb/titilebg.png");@include widthHeight(80%,rem(50)); margin:auto; line-height:rem(45);text-align:center;@include sizeColor(0.45rem,#ffe934);}
.text_box {margin-top:rem(10); background:#c32526;@include sizeColor(0.40rem,#fff);border-radius:rem(5);padding:rem(3) rem(3);box-sizing:border-box; }
.text_box .borderline{padding:rem(10) rem(10);box-sizing:border-box;border-radius:rem(5); border:rem(1) solid #fc513e}
.text_box .borderline p{margin-bottom:rem(10);}
.subcont_box .row .img{margin-top:rem(20);}
.subcont_box .textbig{@include sizeColor(0.45rem,#c32526); text-align:center; font-weight:bold;}
.login_box{margin-top:rem(20);text-align:center;}
.login_box span{color:#ffffff;display:inline-block;vertical-align:model;width:rem(80);height:rem(30);line-height:rem(30);}
.login_box a{width:rem(80);height:rem(30); display:inline-block;vertical-align:model;line-height:rem(30);color:#087279; background:#37ffef;border-radius:rem(5);}
.regbox .success{text-align:center; color:#fff; font-size:0.6rem;}
.inputtext{height:1.2rem;line-height:1.2rem;width:100%;clear:both;position:relative;}
.inputtext input{line-height: 1rem;height:1rem;width:61%;border-radius: 0.125rem 0 0 0.125rem;float:left;display:block;margin:0px;padding:0;border:none; text-align:left;text-indent: 1em;padding:0.2rem 0;}
.inputtext span.vcodeimg{line-height: 0.6rem;height:1rem;width:39%;border-radius: 0 0.125rem 0.125rem 0;float:right;display:block;color:#fff;font-size: 0.4rem; display:block; background:none;}
</style>
