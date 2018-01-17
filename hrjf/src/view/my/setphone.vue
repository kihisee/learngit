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
<div class="phone_bind" v-show="oldphonediv">
        <ul class="reg_cont">
            <li style="display:none;" class="form-group"><strong>绑定手机</strong></li>
            <li class="form-group top-group">
                <span class="left_one">原手机号码</span>
                <span class="password_new">
                    {{state.user.MobilePhone.substr(0,3)}}****{{state.user.MobilePhone.substr(7,11)}}
                </span>
            </li>

            <li style="border-bottom:none;">
                <vincode :MobilePhone="state.user.MobilePhone" :type="2" v-on:getcode="getoldvcode"></vincode>
            </li>

        </ul>
        <div class="next" style="width:83%;"><a href="javascript:" id="nextBtn" @click="nextStep()">下一步</a></div>
    </div>
    <div class="phone_bind" id="second-step" v-show="newphonediv">
        <ul class="reg_cont">

            <li>
                <div class="form-group">
                    <span class="left_one">新手机</span>
                    <span class="password_new" style="padding-left:0">
                        <input class="phone_new" placeholder="新手机号" type="text" value="" v-model="newphonebind">
                    </span>

                </div>
            </li>

            <li style="border-bottom:none;">
                <vincode :MobilePhone="newphonebind" :type="3" v-on:getcode="getnewvcode"></vincode>
            </li>

        </ul>
        <div class="next" style="width:83%;"><a href="javascript:" @click="submitbindphone()">确认修改</a></div>
    </div>


</div>
</template>

<script>
import vincode from '../../components/vcode'
import ls from '../../store/lStorage.js'
export default {
  data () {
    return {
      title:"修改手机号码",
      state:this.$store.state,
      newphonediv:false,
      oldphonediv:true,
      oldvcode:"",
      newvcode:"",
      newphonebind:""
    }
  },
   methods:{
    getoldvcode(data){
      this.oldvcode=data
    },
    getnewvcode(data){
      this.newvcode=data
    },
   nextStep(){
    let _this=this
    if(this.oldvcode==""){
      this.$msg.alert("验证码不能为空")
      return
    }
    this.$http(this.$api.checkSmsVcode({"MobilePhone":this.state.user.MobilePhone,"MobileVCode":this.oldvcode,"TimeType":2}))
      .then((data) => {
        console.log(data)
        if(data.data.ResultCode==100000){
          _this.newphonediv=true;
          _this.oldphonediv=false;
        }else{
          _this.$msg.alert(data.data.ResultMessage)
        }

      });

   },
   submitbindphone(){
    let _this=this
    let rep = /^1[34578]\d{9}$/;
    if(this.newphonebind==""){
        this.$msg.alert("新手机号码不能为空！")
        return false
      }
      if(!rep.test(this.newphonebind)){
        this.$msg.alert("请输入正确的手机号码！")
        return false
      }
      if(this.newvcode==""){
      this.$msg.alert("验证码不能为空")
      return
    }
    this.$http(this.$api.updataphone({"OrgMobilePhone":this.state.user.MobilePhone,"OrgVCode":this.oldvcode,"NewMobilePhone":this.newphonebind,"NewVCode":this.newvcode,"TerminalType":2}))
      .then((data) => {
        if(data.data.ResultCode==100000){
          ls.clear()
          _this.$store.commit("userinfo")
          _this.$store.commit("xjhinfo")
          _this.$msg.alert("修改成功，请重新登录",function(){
             _this.$router.push('/login')
          })
        }else{
          _this.$msg.alert(data.data.ResultMessage)
        }

      });
   }
  },
  created:function(){

  },
  components:{
    vincode
  },
}
</script>


