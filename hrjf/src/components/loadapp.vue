<template>
    <div class="loadapp_box" v-if="isapp">
        <div class="bg"></div>
        <div class="loadapp_main">
            <div class="left">
                <div class="logo left"></div>
                <div class="text left">
                    <p class="bie">恒瑞金服</p>
                    <p>20万人选择的理财神器</p>
                </div>
            </div>
            <div class="right"><a herf="javascript:" @click="gopage()">下载</a></div>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      isapp:false,
    }
  },

methods:{
    gopage(){
        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinyang.wealth"
    }
  },
  created:function(){
    console.log(this.$lg.isapp())
    if(this.$lg.isapp()){
        this.isapp = true;
    }
  },
  computed:{

 },
}
</script>
<style lang="scss" scoped>
.loadapp_box{
    position:fixed;
    height:rem(70);
    top:0;
    left:0;
    .bg{
         width:100%; height:100%; background:rgba(0,0,0,0.5); position:absolute; left:0; top:0; z-index:10;
    }
    .loadapp_main{
        width:100%; height:100%; position:absolute; left:0; top:0; z-index:11; overflow:hidden;
        .logo{
            width:rem(50);
            height:rem(50);
            @include bg("/static/img/logo/s_logo.png");
            margin-left:rem(20);
            margin-top:rem(10);
        }
        .text{
            color:#ffffff;
            margin-top:rem(15);
            margin-left:rem(10);
            .bie{
                font-weight:bold;
            }
        }
        .right{
            margin-right:rem(20);
            margin-top:rem(20);
            a{
                width:rem(80);
                height:rem(30);
                text-align:center;
                color:#ffffff;
                line-height:rem(30);
                background:#d1ae35;
                border-radius:rem(5);
                display:block;
            }
        }
    }
}
</style>