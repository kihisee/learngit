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
<div id="loginForm">
<div class="forget_box">
        <ul>
            <li class="reg_cont reg_conts" v-if="setpay">
                <div class="form-group top-group">
                    <span class="left_one">手机号码</span>
                    <span class="password_new">
                    {{state.user.MobilePhone.substr(0,3)}}****{{state.user.MobilePhone.substr(7,11)}}
                    </span>

                </div>
            </li>
            <li class="reg_cont reg_conts"  v-if="setpay">
                <vincode :MobilePhone="state.user.MobilePhone" :type="4" v-on:getcode="getvcode"></vincode>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">新密码</span>
                    <input class="duihuang_tex newinnput" type="password" placeholder="设置新密码" v-model="newpassword">
                </div>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one">确认密码</span>
                    <input class="duihuang_tex newinnput" type="password" placeholder="确认新密码" v-model="againpassword">
                </div>
            </li>

            <li><a href="javascript:" class="btn" @click="send()">确认提交</a></li>
        </ul>
    </div>
</div>


</div>
</template>

<script>
import vincode from '../../components/vcode'
export default {
  data () {
    return {
        title:"设置交易密码",
        state:this.$store.state,
        newpassword:"",
        againpassword:"",
        vcode:"",
        setpay:false
    }
  },
  methods:{
    checkinput(){
            //let cpsw= /^([\d]?[a-zA-Z]?[@()!#$%^&*()-_=~{}?]?){8,20}$/;
            let cpsw=/[\u4e00-\u9fa5]/g;
            let gpsw = /[\s]/g
            if(this.newpassword==""){
                    this.$msg.alert("请输入新密码！")
                    return false
            }
            if(cpsw.test(this.newpassword)||gpsw.test(this.newpassword)||this.newpassword.length<8||this.newpassword.length>20){
                this.$msg.alert("密码长度为8-20位字符!")
                return false
            }
            if(this.againpassword==""){
                    this.$msg.alert("请输入确认密码！")
                    return false
            }
            if(this.againpassword!=this.newpassword){
                    this.$msg.alert("密码不一致！")
                    return false
            }
            if(this.setpay){
                if(this.vcode==""){
                    this.$msg.alert("请输入手机验证码！")
                    return false
                }
            }
            return true
    },
        send(){
            let _this = this
            let obj = {}
            if(!this.checkinput()){
                return
            }
            if(this.setpay){
                obj.PayPwd = this.newpassword;
                obj.MobileVCode = this.vcode;
                obj.TerminalType=2;

            }else{
                obj.PayPwd = this.newpassword;
                obj.TerminalType=2;
            }

              this.$http(this.$api.setpaypsw(obj))
                    .then(function(data){
                    if(data.data.ResultCode==100000){
                        _this.$msg.alert("设置交易密码成功",function(){
                            _this.$router.push('/my')
                        })
                    }else{
                        _this.$msg.alert(data.data.ResultMessage)
                    }
              })

        },
        getvcode(data){
          this.vcode=data
        },
       },
 created :function(){
    let _this =this
    this.$http(this.$api.isPayPassword({}))
      .then((data) => {
        if(data.data.ResultData=="true"){
          _this.setpay=true;
          _this.title="修改交易密码"
        }

      });
  },
  components:{
    vincode
  },
}
</script>

<style scoped>

</style>
