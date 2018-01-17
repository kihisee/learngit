<template>
<div class="invitebody">
    <div class="bannerimg">
        <img src="../../../static/img/invitelink/regbanner.jpg">
    </div>
    <div class="shurphone"  v-if="step1">
            <p class="step1p" v-if="isvcode">您的好友{{ usermobile }}向您推荐恒瑞金服</p>
            <p class="step1p" v-else>恒瑞金服送您8888元投资券</p>
            <input class="inputphone" type="phone" placeholder="请输入手机号" v-model="MobilePhone"/>
    </div>

    <div class="shurphone step2"  v-if="step2">
          <p class="whitetop"> 手机号 ：{{ MobilePhone }}</p>
         <div class="inputtext" style="margin-bottom:0.25rem">

                <input placeholder="请输入右侧结果" type="tel" v-model="imgcode"/>
                <span class="vcodeimg" :style="base64"></span>
        </div>
         <tgvcode :MobilePhone="MobilePhone" :type="1" :imgcode="imgcode" @getcode="getincode"></tgvcode>

          <input class="step2bot"  placeholder="请输入登录密码" v-model="password" type="password">
    </div>

    <div class="shurphone step3"  v-if="step3">
          <div class="step3img"></div>
          <p v-if="!gochou" >请登录恒瑞金服客户端马上开始投资</p>
    </div>


    <div class="receive" v-if="step1" @click="step1click()"></div>

    <div class="receive  receivestep2"  v-if="step2" @click="step2click()"></div>
    <div class="stepview" v-if="step2" ><input type="checkbox" v-model="agree" >阅读并同意<router-link to="/agreement" class="bluea">《恒瑞金服服务协议》</router-link></div>

    <div class="receive receivestep3 nogo"  v-if="step3  && gochou==false" @click="step3click()"></div>
    <div class="receive receivestep3 go"  v-if="step3 && gochou" @click="step3clickgo()"></div>


    <div class="partone tender" v-if="step1">
        <div class="tendertitle"></div>
          <ul>
              <li>
                    <p>10.<span class="redspan">2%</span></p>
                    <p>预期年化</p>
              </li>
              <li>
                    <p>2<span class="grayspan">天</span></p>
                    <p>投资期限</p>
              </li>
               <li>
                    <p>168888</p>
                    <p>最高体验金额</p>
              </li>
          </ul>
    </div>

      <div class="parttwo tender"  v-if="step1">
        <div class="tendertitle"></div>
          <ul>
              <li>
                    <p>10<span class="redspan">%</span></p>
                    <p>预期年化</p>
              </li>
              <li>
                    <p>30<span class="grayspan">天</span></p>
                    <p>投资期限</p>
              </li>
               <li>
                    <p>100</p>
                    <p>起投金额</p>
              </li>
          </ul>
    </div>


  <div class="partthree tender"   v-if="step1">
      <div class="tendertitle"></div>
  </div>

    <div class="partfour tender"   v-if="step1">
      <div class="tendertitle"></div>
      <div class="forulist">
          <dl>
                <dd>
                    <p>高回报</p>
                    <p>预期年化</p>
                    <p>可达</p>
                    <p>8%-15%</p>
                </dd>
                <dd>
                    <p>低门槛</p>
                    <p>投资门槛低</p>
                    <p>100元</p>
                    <p>起投</p>
                </dd>
                <dd>
                    <p>低风险</p>
                    <p>全站加密</p>
                    <p>银行级</p>
                    <p>风控</p>
                </dd>
                <dd>
                    <p>高便捷</p>
                    <p>充值快</p>
                    <p>提现快</p>
                    <p>效率高</p>
                </dd>
          </dl>
      </div>
  </div>

  <div class="invitebottom"   v-if="step1">
      <p class="invitebred">2017© 湖南金洋信息技术有限公司</p>
      <p class="invitebray">投资有风险，最终收益以实际为准</p>
  </div>
</div>

</div>
</template>

<script>
import ls from '../../store/lStorage.js'
import config from '../../api/ajax.js'
import wx from 'weixin-js-sdk'
import tgvcode from '../../components/tgvcode'
export default {
  components:{
    tgvcode,
  },
  data () {
    return {
      title:"邀请注册页专题",
      MobilePhone:'',
      step1:true,
      step2:false,
      step3:false,
      invitecode:'',
      daydown:'',
      usermobile:'',
      code:'',
      password:'',
      EnterChannel:'',
      agree:true,
      isvcode:false,
      Imios:true,
      Imiandroid:false,
      gochou:false,
      base64:"",
      imgcode:""
    }
  },
   methods:{
      step1click(){
          let _this=this
        let reg = /^[1]\d{10}$/;
        if (!reg.test(_this.MobilePhone)) {
             _this.$msg.alert("请输入正确的手机号码",function(){
                  _this.MobilePhone=''
             })
            return;
        }
        console.log(_this.MobilePhone);
          _this.$http(_this.$api.ifreg({MobilePhone:_this.MobilePhone}))
           .then((data) => {
             if(data.data.ResultCode==100000){
                  _this.step1=false
                  _this.step2=true
             }
            })
         _this.$http(_this.$api.GetVcodeimg({"MobilePhone":_this.MobilePhone,"type":1}))
          .then((data) => {
            this.base64 = 'background:url(data:image/png;base64,'+data.data.ResultData+') no-repeat center top;background-size:100% 100%';
          })
      },

    getincode(msg){
      this.code=msg
    },

    checkinput(){
      let rep = /^1[34578]\d{9}$/;
      //let cpsw= /^(\w){8,20}$/;
      //let cpsw= /^([\d]?[a-zA-Z]?[@()!#$%^&*()-_=~{}?]?){8,20}$/;
      let cpsw=/[\u4e00-\u9fa5]/g;
      let gpsw = /[\s]/g
      if(this.code==""){
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
    step2click(){

       let me = this

        if(!this.checkinput()){
          return
        }

        if(!me.agree){
             me.$msg.alert("请阅读并同意《恒瑞金服服务协议》")
             return
        }

        this.$http(this.$api.reg({"LoginPassword":me.password,"EnterChannel":me.EnterChannel,"TerminalType":2,"MobilePhone":me.MobilePhone,"UserName":"hahah","MobileVCode":me.code,"InviteCode":me.invitecode}))
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

                      me.step2=false
                      me.step3=true


                    }else{
                      me.$msg.alert(data.data.ResultMessage)
                    }

            })



    },
      step3click(){
          let _this=this
          console.log("step3click")
          console.log(_this.checkapp());
                if(_this.checkapp()=="ios"){
                  window.location.href="https://itunes.apple.com/cn/app/id1178579593?mt=8"
              }
              if(_this.checkapp()=="android"){
                window.location.href="http://hrjfappcdn.cpb168.com/app/hrjf/HrjfWealth.apk"
              }


      },
      step3clickgo(){
      console.log("step3clickgo")

          let query = this.$route.query
          console.log(query.back)
          this.$router.push(query.back)
       },
      checkapp(){

        let  _this=this
        let browser = {
            versions: function () {
                let u = navigator.userAgent, app = navigator.appVersion;
                return {//移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase()
        }


    if (browser.versions.mobile) {//判断是否是移动设备打开。browser代码在下面
        let ua = navigator.userAgent.toLowerCase();//获取判断用的对象
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
                //在微信中打开
                //console.log("weixin")
                //_this.$msg.alert("weixin")


        }
        if (browser.versions.ios) {
                return "ios"
        }
        if(browser.versions.android){
                //是否在安卓浏览器打开
                return "android"
        }

        } else {
                //否则就是PC浏览器打开
                console.log("pc")
        }
      },

  },

  created:function(){



      let query = this.$route.query
      let _this=this

      if(query.back=="experienceMoney"){
          _this.gochou=true
      }else{
        _this.gochou=false
      }


        if(typeof _this.$store.state.InviteCode!="undefined"){

        }

        _this.invitecode=_this.$store.state.InviteCode

            _this.$http(_this.$api.invitelink({InviteCode:_this.invitecode}))
           .then((data) => {
             console.log(data);

             if(data.data.ResultData.mobile){
               _this.isvcode=true;
               _this.usermobile=data.data.ResultData.mobile
             }else{
             _this.isvcode=false;
             }
             _this.daydown=data.data.ResultData.day
            })

        if(typeof this.$store.state.EnterChannel!="undefined"){
          this.EnterChannel=this.$store.state.EnterChannel
        }
        console.log(this.$store.state.EnterChannel);


  }
}
</script>


<style scoped>
.invitebody{background:#e61937;padding-bottom: 1.5rem;}
.invitebody .shurphone{width:90%;margin:-5.8rem auto 0;height:5.5rem;text-align:center;}
.invitebody .step2{width:75%;margin:-6.8rem auto 0;height:7rem;text-align:center;}
.invitebody .shurphone p.step1p{line-height:0.8rem;height:0.8rem;font-size: 0.5rem;color:#fff;font-family:"微软雅黑";margin-bottom: 0.5rem;}
.invitebody .shurphone p.step1day{line-height:0.6rem;height:0.6rem;font-size: 0.55rem;color:#fff;font-family:"微软雅黑";margin-top: 0.1rem;background:url(../../../static/img/invitelink/safeyun.png) no-repeat center top;background-size:80%;width:100%;position:relative;text-align: left;text-indent:11em;}
.invitebody .shurphone p.whitetop{line-height:0.8rem;height:0.8rem;font-size: 0.4rem;color:#fff;font-family:"微软雅黑";margin-bottom: 0;}
.invitebody .shurphone .inputtext{height:1.2rem;line-height:1.2rem;width:100%;clear:both;position:relative;}

.invitebody .shurphone .inputtext input{line-height: 0.8rem;height:0.8rem;width:61%;border-radius: 0.125rem 0 0 0.125rem;float:left;display:block;margin:0px;padding:0;border:none; text-align:left;text-indent: 1em;padding:0.2rem 0;}
.invitebody .shurphone input.step2bot{line-height: 0.6rem;height:0.6rem;width:100%;border-radius: 0.125rem ;display:block;margin:0px;padding:0;border:none; text-align:left;text-indent: 1em;background:#fff;position:relative;margin-top: 0.2rem;padding:0.3rem 0;}
.invitebody .shurphone .inputtext span{line-height: 1.2rem;height:1.2rem;width:39%;border-radius: 0 0.125rem 0.125rem 0;float:right;display:block;background:url(../../../static/img/invitelink/hqucode.png) no-repeat center top;background-size: 100%;color:#fff;font-size: 0.4rem;}
.invitebody .shurphone .inputtext .yzmwz{line-height: 1.2rem;height:1.2rem;width:39%;border-radius: 0 0.125rem 0.125rem 0;float:right;display:block;background:url(../../../static/img/invitelink/hqucode.png) no-repeat center top;background-size: 100%;color:#fff;font-size: 0.4rem;}
.invitebody .shurphone input{line-height: 0.8rem;height:0.8rem;border:1px solid #eee;width:100%;text-align: center;padding:0;margin:0;border-radius: 5px;color:#b8b8b8;font-size: 0.4rem;padding:0.3rem 0;}
.invitebody .receive{width:3.5rem;height:3.6rem;background:url(../../../static/img/invitelink/rightnowlq.png) no-repeat center top;margin:-2.2rem auto 0.8rem;background-size: 100%;position:relative;}
.invitebody .receivestep2{width:3.5rem;height:3.6rem;background:url(../../../static/img/invitelink/rightnowreg.png) no-repeat center top;margin:-1.8rem auto 0.1rem;background-size: 100%;position:relative;}
.invitebody .stepview{height:1rem;line-height: 1rem;width:90%;margin:0 auto 0.8rem;text-align:center;font-size: 0.4rem;color:#fff690;}
.invitebody .stepview .bluea{color:#91d4ff;}
.invitebody .receivestep3{width:3.5rem;height:3.6rem;background:url(../../../static/img/invitelink/loadown.png) no-repeat center top;margin:-2rem auto 0.2rem;background-size: 100%;position:relative;}
.invitebody .go{background:url(../../../static/img/invitelink/qwchouj.png) no-repeat center top;background-size: 100%;}
.yelowrouter{color:#fff690;text-decoration: underline;font-size: 0.4rem;}
.invitebody .shurphone .step3img{width:80%;height:0.8rem;background:url(../../../static/img/invitelink/regsuccess.png) no-repeat center 1rem;margin:0rem auto 0;position:relative;background-size: 75%;padding-top: 1rem;}

.invitebody .shurphone .step3imggo{width:80%;height:0.8rem;background:url(../../../static/img/invitelink/loadown.png) no-repeat center 1rem;margin:0rem auto 0;position:relative;background-size: 75%;padding-top: 1rem;}
.invitebody .step3 p{color:#fff;line-height:1rem;margin-top: 0.2rem;text-align:center;font-size: 0.4rem;}
.invitebody .tender{background:#fff;border-radius: 0.25rem;width:90%;margin:0.25rem auto 1rem;position:relative;height:3.2rem;}
.invitebody .tender .tendertitle{position:absolute;top:-0.5rem;left:50%;width:6rem;margin:0 0 0 -3rem;height:1rem;}
.invitebody .partone .tendertitle{background:url(../../../static/img/invitelink/heightmoney.png) no-repeat center top;background-size: 100%;}
.invitebody .parttwo .tendertitle{background:url(../../../static/img/invitelink/newporson.png) no-repeat center top;background-size: 100%;}
.invitebody .partthree .tendertitle{background:url(../../../static/img/invitelink/aboutus.png) no-repeat center top;background-size: 100%;}
.invitebody .partthree{height:5.5rem;background:url(../../../static/img/invitelink/listico.png) no-repeat center 1.5rem #fff;;background-size: 75%;}
.invitebody .partfour .tendertitle{background:url(../../../static/img/invitelink/whychange.png) no-repeat center top;background-size: 100%;}
.invitebody .partfour{height:3.8rem;background: none;background-size: 75%;}
.invitebody .partfour dl{display:flex;flex-direction: row; flex-wrap: nowrap;justify-content:center;text-align:center;padding-top:0.85rem}
.invitebody .partfour dl dd{margin:0 0.05rem;background:#fff;border-radius:0.125rem;padding:0.35rem 0;}
.invitebody .partfour dl dd p:first-child{height:1.0rem;line-height:1.0rem;color:#fff;background:#e61937;font-size:0.45rem;width:96%;margin:0 auto 0.125rem;}
.invitebody .partfour dl dd p{line-height:0.5rem;color:#eb3f46;font-size:0.35rem;font-weight:bold;}



.invitebody .tender ul{width:90%;margin:0 auto;}
.invitebody .tender ul li{width:33%;padding:1.1rem 0 0;float:left;text-align:center;}
.invitebody .tender ul li p:first-child{color:#e61937;font-size: 0.65rem;font-weight: bold;}
.invitebody .tender ul li p:first-child span{font-size: 0.35rem;}
.invitebody .tender ul li p:first-child span.redspan{}
.invitebody .tender ul li p:first-child span.grayspan{color:#797979;}
.invitebody .tender ul li p:nth-child(2){color:#797979;font-size: 0.35rem;}

.invitebody .invitebottom{width:90%;height:1.5rem;padding:0.4rem 0;border-radius: 0.25rem;background:#fff6c5;text-align: center;margin:0 auto;line-height: 0.7rem;;}
.invitebody .invitebottom .invitebred{font-size: 0.45rem;color:#f94048;font-weight: bold;}
.invitebody .invitebottom .invitebray{font-size: 0.4rem;color:#646464;}
.invitebody .shurphone .inputtext span.vcodeimg{line-height: 0.6rem;height:1.2rem;width:39%;border-radius: 0 0.125rem 0.125rem 0;float:right;display:block;color:#fff;font-size: 0.4rem; display:block; background:none;}
</style>