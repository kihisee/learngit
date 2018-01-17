<template>
 <div class="inputtext">

        <input  id="MobileVCode"  placeholder="请输入验证码" type="tel" v-model="code" @change="setCode"/>
        <input type="button"  v-on:click="send"  class="yzmwz" v-model="timerCodeMsg" v-bind:disabled="dis" >
</div>
</template>

<script>
  export default {
    props: {
      MobilePhone: "",
      type:"",
      imgcode:""
    },
    methods:{
        send(){
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
        console.log(me.timerCodeMsg);
          this.$http(this.$api.vcode({"MobilePhone":me.MobilePhone,"type":me.type,"Vcode":me.imgcode}))
                .then(function(data){
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
.invitebody .shurphone .inputtext span{line-height: 1.2rem;height:1.2rem;width:39%;border-radius: 0 0.125rem 0.125rem 0;float:right;display:block;background:url(../../static/img/invitelink/hqucode.png) no-repeat center top;background-size: 100%;color:#fff;font-size: 0.4rem;}
.invitebody .shurphone .inputtext .yzmwz{line-height: 0.6rem;height:1.2rem;width:39%;border-radius: 0 0.125rem 0.125rem 0;float:right;display:block;background:url(../../static/img/invitelink/hqucode.png) no-repeat center top;background-size: 100%;color:#fff;font-size: 0.4rem;}
.invitebody .shurphone .inputtext{height:1.2rem;line-height:1.2rem;width:100%;clear:both;position:relative;}

.invitebody .shurphone .inputtext input{line-height: 0.6rem;height:0.6rem;width:61%;border-radius: 0.125rem 0 0 0.125rem;float:left;display:block;margin:0px;padding:0;border:none; text-align:left;text-indent: 1em;padding:0.3rem 0;}
.invitebody .shurphone input.step2bot{line-height: 1.2rem;height:1.2rem;width:100%;border-radius: 0.125rem ;display:block;margin:0px;padding:0;border:none; text-align:left;text-indent: 1em;background:#fff;position:relative;margin-top: 0.2rem;}

  </style>