<template>
        <input type="button"  v-on:click="send"  class="yzmwz" v-model="timerCodeMsg" v-bind:disabled="dis">
</template>

<script>
  export default {
    props: {
      MobilePhone: "",
      type:""
    },
    methods:{
        send(){
        let me = this
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
        },
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