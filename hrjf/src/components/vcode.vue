
<template>
 <div class="form-group">
        <span class="left_one">验证码</span>
        <input id="MobileVCode"  placeholder="请输入验证码" type="tel" v-model="code" @change="setCode">
        <input type="button"  v-on:click="send()"  class="yzmwz" v-model="timerCodeMsg" v-bind:disabled="dis">
</div>
</template>

<script>
  export default {

    props: {
      MobilePhone: "",
      types:""
    },
    methods:{
        send(){
          console.log("come")
        let me = this
        let rep = /^1[34578]\d{9}$/;
        if(this.MobilePhone==""){
          this.$msg.alert("手机号码不能为空！")
          return false
        }
        if(!rep.test(this.MobilePhone)){
          this.$msg.alert("请输入正确的手机号码！")
          return false
        }
        //console.log(me.timerCodeMsg);
        console.log(me.MobilePhone)
        console.log(me.types)
          this.$http(this.$api.vcode({"MobilePhone":me.MobilePhone,"type":me.types}))
                .then(function(data){
                  console.log("in")
                  if(data.data.ResultCode !=100000 ){
                          me.$msg.alert(data.data.ResultMessage,function(){
                    })
                }else{
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
        setCode(){
            this.$emit("getcode",this.code)
        }
    },

  data () {
    return {
      timerCodeMsg:"获取验证码",
      sendMsgDisabled :true,
      time:60,
      dis:false,
      code:""
    }
  },

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

.form-group .yzmwz {position:absolute;top:0px;right:0px;width:30%;margin:0.25rem 0;height:0.75rem;line-height:0.75rem;text-align:center;border-left:0.025rem solid #dddddd;color:#fff;font-size:0.35rem;background:#ffbb2a;text-indent: 0em;padding:0rem;}
</style>