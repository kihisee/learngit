<template>
<div class="login_wrap">

    <div class="link_head">
    <h1>
        <span>
            <a href="javascript:history.go(-1);" id="showmenu">
                <img src="static/img/head/icon_left.png">
            </a>
        </span>
        {{title}}
    </h1>
</div>
<div id="loginForm">
 <input type="hidden" value=""/>

<div class="reg_cont reg_contfir">
    <div class="form-group top-group">
        <span class="left_one">手机号码</span>
        <input id="Mobile" name="Mobile" placeholder="请输入手机号码" type="tel"  v-model="MobilePhone">
        <!-- <inputcheck name="手机号码" id="Mobile" placeholder="请输入手机号码" type="tel" :model="MobilePhone"></inputcheck> -->
    </div>
</div>
<div class="reg_cont">
<vincode :MobilePhone="MobilePhone" :types="1" @getcode="getincode"></vincode>
</div>

<div class="reg_cont">
    <div class="form-group thelast">
        <span class="left_one">密码</span>
       <input class="password"  placeholder="请输入密码"   v-model="password"  type="text" v-if="isActive">
          <input class="password"  placeholder="请输入密码"   v-model="password"  type="password" v-if="!isActive">
        <a href="javascript:" v-on:click="changeeye()" v-bind:class="{ yzmwz_hvs: isActive, yzmwz_hv:isActive==false}"></a>
    </div>
</div>

<div class="form-gr" style="display: block;">
                <div class="form-group">
                        <span class="left_one">邀请人</span>
<input autocomplete="off" class="yama" id="InviteCode" name="InviteCode" placeholder="注册邀请码或手机号(选填)" type="text" value=""  v-model="invitecode">                        <div class="inpu-dov"></div>
                </div>
            </div>
<div class="fin_wen">
<!--<b class="fin_b"></b>-->
    <div class="bot_lt">
        同意<router-link to="/agreement" style="color:#32a5e7">《恒瑞金服注册协议》</router-link>
    </div>
    <div class="div_zh">
        <a href="javascript:;"  class="lijitou" id="registerBtn" @click="reg">注册</a>
    </div>

        <!--<p class="yell">
            注册邀请码(选填)
        </p>-->
    <!-- <div class="bot_rt">
        <router-link to="/login" class="blue_a">登录</router-link>
    </div> -->
</div>
</div>


</div>
</template>

<script>
import ls from '../../store/lStorage.js'
import vincode from '../../components/vcode'
export default {
  components:{
    vincode,
  },
  data () {
    return {
      title:'注册',
      isActive:false,
      code:"",
      MobilePhone:"",
      password:"",
      invitecode:'',
      EnterChannel:''
    }
  },
  methods:{
    changeeye(){
       this.isActive=!this.isActive
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
      if(this.MobilePhone==""){
        this.$msg.alert("手机号码不能为空！")
        return false
      }
      if(!rep.test(this.MobilePhone)){
        this.$msg.alert("请输入正确的手机号码！")
        return false
      }
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
      reg(){
      let me = this
      if(!this.checkinput()){
        return
      }
      let query = this.$route.query

      this.$http(this.$api.reg({"LoginPassword":me.password,"EnterChannel":me.EnterChannel,"TerminalType":2,"MobilePhone":me.MobilePhone,"UserName":"hahah","MobileVCode":me.code,"InviteCode":me.invitecode}))
            .then(function(data){
                    if(data.data.ResultCode==100000){
                      me.$msg.alert("注册成功",function(){

                        let obj = {
                          MobilePhone:me.MobilePhone,
                          Token:data.data.ResultData.Token,
                          UserId:data.data.ResultData.UserId,
                          UserName:data.data.ResultData.UserName
                        }

                      ls.setItem("_user",obj)
                      me.$store.commit("userinfo")

                        if(query.back){
                            me.$router.push(query.back)
                        }

                       if(query.point==8888){//百万体验金推广页面进来注册的新用户给8888体验金红包
                              console.log("in8888");
                              console.log(obj.Token)
                              me.$http(this.$api.TYJCoupon({token:obj.Token,dataContent:"cjtyz002"}))
                              .then(function(data){
                                     me.$router.push('/index?TG=true')
                              })


                          }else{
                            console.log("no8888")
                            if(query.back){
                              _taq.push({convert_id: "72462130802", event_type: "button"})
                              me.$router.push(query.back)
                            }else{
                              me.$router.push('/my')
                            }
                          }
                       })


                    }else{
                      me.$msg.alert(data.data.ResultMessage)
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
        console.log(this.$store.state.EnterChannel);
    }
}
</script>

<style scoped>
.left_one{display: inline-block;width: 30%;font-size: 0.35rem;float: left;height:1.25rem;line-height:1.25rem;color: #4f4f4f;text-align:left;text-indent:1em; font-weight:bold;}
.reg_cont {background:#fff;padding-top:0.025rem;}
.reg_contfir {margin-top:0px;}
.form-group {width:90%;margin:0px auto;position:relative;border-top:1px solid #d4d4d4;height: 1.25rem; line-height: 1.25rem;}
.top-group {border-top:none;}

.form-group input {width:60%;height:0.75rem;line-height:0.75rem;padding:0.25rem 0;margin:0px;border:none;text-indent:1em;outline: 0;float: left;font-size:0.35rem;}
.form-gr {background:#fff;}
.bot_rt {text-align:center;color:#333;text-indent:0em;}
.blue_lon {color:#32a5e7;font-size:16px;}
.bot_lt {text-align:left;text-indent:0em;margin-top:10px;}
.fin_wen {font-size:0.3rem;width:90%;line-height:0.625rem;margin:0 auto;text-align:left;text-indent:1em;clear:both;}
.fin_wen .div_zh {margin-top:0.5rem;text-align:center;font-size:0.4rem;text-indent:0;clear:both;margin-bottom:0.5rem;border-radius:0.15rem;}
.div_zh .lijitou{background:#ffbb2a;color:#fff;display: inline-block;width: 100%;}
.fin_wen .div_zh {margin-top:0.5rem;text-align:center;font-size:0.4rem;text-indent:0;clear:both;margin-bottom:0.5rem;border-radius:0.15rem;}
.div_zh{height: 0.95rem;line-height: 0.95rem;position: relative;overflow:hidden;}
</style>
