<template>
<div class="login_wrap">

    <div class="link_head">
    <h1>
        <span>
            <a href="javascript:history.go(-1);" id="showmenu">
                <img src="static/img/icon_left.png">
            </a>
        </span>
        找回密码
    </h1>
</div>
<div id="loginForm">
<div class="forget_box">
        <ul>
            <li class="reg_cont reg_conts">
                <div class="form-group top-group">
                    <span class="left_one" style="width:39%;">注册时的手机号码</span>
                    <input class="newinnput" id="Mobile" name="Mobile" placeholder="" style="width:51%;" type="text" v-model="oldphone">

                </div>
                <p class="error-tips"><span class="field-validation-valid"></span></p>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">验证码</span>
                    <input autocomplete="off" class="duihuang_yz newinnput"  id="VCode" name="VCode" placeholder="" type="text" v-model="vcode">
                    <input type="button"  v-on:click="send"  class="yzmwz" v-model="timerCodeMsg" v-bind:disabled="dis">

                </div>
                <p class="error-tips">
                    <span class="field-validation-valid"></span>
                </p>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">新密码</span>
                    <input class="duihuang_tex newinnput" type="password" v-model="newpassword">
                </div>
                    <p class="error-tips"><span class="field-validation-valid"></span></p>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">确认密码</span>
                    <input class="duihuang_tex newinnput" type="password" v-model="againpassword">
                </div>
                    <p class="error-tips"><span class="field-validation-valid"></span></p>
            </li>
            <li><a href="javascript:" class="btn" id="submitBtn" @click="sendfind()">确认</a></li>
        </ul>
    </div>
</div>


</div>
</template>

<script>
import ls from '../../store/lStorage.js'

export default {
  data () {
    return {
        oldphone:"",
        vcode:"",
        newpassword:"",
        againpassword:"",
        sendMsgDisabled :true,
        timerCodeMsg:"获取验证码",
         time:60,
        dis:false
    }
  },
  methods:{
        send(){
            let me = this
            let rep = /^1[34578]\d{9}$/;
            if(this.oldphone==""){
                this.$msg.alert("手机号码不能为空！")
                return false
              }
            if(!rep.test(this.oldphone)){
                this.$msg.alert("请输入正确的手机号码！")
                return false
              }
              this.$http(this.$api.vcode({"MobilePhone":me.oldphone,"type":5}))
                    .then(function(data){
                    console.log(me.oldphone);
                    if(data.data.ResultCode !=100000 ){
                          me.$msg.alert(data.data.ResultMessage,function(){
                            console.log(data.data.ResultCode)
                    })
                    }else{
                        console.log(data)
                        me.sendMsgDisabled = true
                        let interval = window.setInterval(function() {
                          if ((me.time --) <= 0) {
                            me.time = 60
                            me.sendMsgDisabled = false
                            me.timerCodeMsg="获取验证码";
                            window.clearInterval(interval)
                            me.dis=false
                          }else{
                            me.timerCodeMsg=me.time+'秒后获取'
                            me.dis=true
                          }
                        }, 1000)
                    }
                   })
        },
        checkinput(){
              let rep = /^1[34578]\d{9}$/;
              let cpsw= /^(\w){8,20}$/;
              if(this.oldphone==""){
                this.$msg.alert("手机号码不能为空！")
                return false
              }
            if(!rep.test(this.oldphone)){
                this.$msg.alert("请输入正确的手机号码！")
                return false
              }
              if(this.vcode==""){
                this.$msg.alert("验证码不能为空！")
                return false
              }
              if(this.newpassword==""){
                this.$msg.alert("新密码不能为空！")
                return false
              }
              if(this.newpassword != this.againpassword){
                this.$msg.alert("密码不一致")
                return false
                }
              if(!cpsw.test(this.newpassword)||!cpsw.test(this.againpassword)){
                this.$msg.alert("密码长度为8-20位字符！")
                return false
              }
              return true
            },
        sendfind(){
            let me = this
            if(!this.checkinput()){
                return
            }
                this.$http(this.$api.findpass({"MobilePhone":me.oldphone,"MobileVCode":me.vcode,"NewPassword":me.newpassword,"TerminalType":1,"type":5}))
                    .then(function(data){
                    if(data.data.ResultCode !=100000 ){
                          me.$msg.alert(data.data.ResultMessage,function(){
                            console.log(data)
                    })
                    }else{
                         ls.clear()
                        me.$router.push('/login')
                    }
                   })

        }
       }
}
</script>

<style scoped>

</style>
