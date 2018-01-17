<template>
<div class="login_wrap">

  <heads :title="title"></heads>
<div id="loginForm">
  <div class="reg_cont reg_contfir">
      <div class="form-group top-group">
          <span class="left_one">手机号码</span>
          <input  data-val="true"  name="UserName" placeholder="请输入手机号码" type="tel" value="" v-model="phone">
      </div>
  </div>
  <div class="reg_cont">
      <div class="form-group thelast">
          <span class="left_one">密码</span>
          <input class="password"  placeholder="请输入密码"   v-model="password"  type="text" v-if="isActive">
          <input class="password"  placeholder="请输入密码"   v-model="password"  type="password" v-if="!isActive">
          <a href="javascript:" v-bind:class="{ yzmwz_hvs: isActive, yzmwz_hv:isActive==false}" v-on:click="changeeye()"></a>
      </div>
  </div>

  <div class="fin_wen">
      <div class="div_zh">
          <a herf="javascript:;" id="loginBtn" v-on:click="login()" class="lijitou">登录</a>
      </div>
      <p class="yell_bl">

      <!-- <span><router-link to="/findpassword" class="blue_a">忘记密码</router-link> </span>｜ <span><router-link to="/reg" class="blue_a">免费注册</router-link></span> -->
      </p>
  </div>
</div>


</div>
</template>

<script>
import heads from '../../components/head';
export default {
  data () {
    return {
      title:"登录",
      phone:"",
      password:"",
      isActive:false,
      typetwo:"password",
    }
  },
   methods:{
    changeeye(){
      if(this.isActive){
          this.typetwo="password"
      }else{
          this.typetwo="text"
      }
       this.isActive=!this.isActive
       },
       login(){
        if(this.phone==""){
        this.$msg.alert("请输入手机号码！")
          return false
        }
        if(this.password==""){
        this.$msg.alert("请输入登录密码！")
          return
        }
        this.$store.dispatch('upuserinfo',{phone:this.phone,password:this.password})
        .then(() => {
          let query = this.$route.query
          if(query.back){
            this.$router.push(query.back)
          }else{
            this.$router.push('/my')
          }

        })
       }
  },
  created:function(){

  },
    components:{
    heads
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
.password_new{float: left;width: 70%;text-align: left;padding-left: 0.25rem;  box-sizing: border-box; font-size:0.4rem;}

.forget_box .reg_conts {padding:0px;}
.forget_box li {min-height:auto;line-height:0px;}
#VCode {width:30%;height:0.75rem;margin:0px;border:none;font-size:0.35rem;box-shadow:none;}

span.field-validation-error{line-height:0.325rem!important;display:block;}

span.field-validation-valid {line-height:0px;display:block;}

.form-group input.newinnput {border:none !important;box-shadow:none;}

.form-chongz .right_onedl {text-indent:1em;text-align:center;line-height:50px;display:block;float:left;width:70%;color:#999;}
.fin_wen {font-size:0.3rem;width:90%;line-height:0.625rem;margin:0 auto;text-align:left;text-indent:1em;clear:both;}
.div_zh{height: 0.95rem;line-height: 0.95rem;position: relative;overflow:hidden;}
.forget_box .phone_bind_numb {line-height:50px;color:#333;text-align:center;font-weight:normal;}
.div_zh .lijitou{background:#ffbb2a;color:#fff;display: inline-block;width: 100%;}
.fin_wen .div_zh {margin-top:0.5rem;text-align:center;font-size:0.4rem;text-indent:0;clear:both;margin-bottom:0.5rem;border-radius:0.15rem;}
.div_zh .lijitout{background:#ffbb2a;color:#fff;display: inline-block;width: 100%;}
.yell_bl {margin:0 auto;line-height:35px;color:#32a5e7;text-align:center;font-size:14px;}
.blue_a {color:#32a5e7;font-size:0.4rem;}
</style>