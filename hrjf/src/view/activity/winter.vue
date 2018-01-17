<template>
    <div class="container">
          <div class="banner"></div>
          <div class="bingodetail" @click="bingolist()" :class="{isshow:Iswap}">我的抽奖记录</div>


          <div class="eggmessage">

            <winter :loginmessage="loginyn" :idata="idata"></winter>

            <p class="rightbot">活动范围：仅限永州地区新注册用户</p>


            <div class="rulebot">
              <p>抽奖规则：</p>
              <p>1.活动期间注册成为恒瑞金服会员，免费获得1次抽奖机会，100%中奖；</p>
              <p>2.抽中实物奖品的会员，需分享活动图片至朋友圈，并凭注册手机号码在现场领取；抽中红包的会员，需添加现场工作人员微信后领取；</p>
              <p>3.因特殊原因无法现场领取奖品的，可在获奖3天内前往永州市冷水滩区河东双洲路626-628号恒瑞金服公司领取，超过3天未领取的，视为自动放弃，奖品不予补发；</p>
              <p>4.本活动奖品不提供发票及相关奖品的后续服务；</p>
              <p>5.本活动最终解释权归恒瑞金服所有<span v-if="!isIos">。</span><span v-if="isIos">，活动与苹果公司无关。</span></p>
              <p>活动咨询电话：400-876-0616</p>
            </div>
          </div>
        <loadapp v-if="loginyn"></loadapp>

          <div class="tanalertlist" v-if="alltan" v-bind:class="{ bingolist: isB }">
            <div class="toppic"></div>
            <div class="contenttan">
                 <div class="topred">{{messagetishi}}</div>
                  <p class="message">{{message}}</p>
                  <ul class="zhonglist" v-if="zhonglist">

                      <li v-for="item in bingoEggList">
                      <p>{{item.prize}}</p>
                        <p>{{item.date}}</p>

                        <p>{{item.status}}</p>
                      </li>
                  </ul>
                  <div class="surebot" @click="closetan()">确定</div>
            </div>

          </div>

          <div class="graybg"  v-if="alltan"></div>
    </div>
</template>

<script>
import ls from '../../store/lStorage.js'
import winter from '../../components/winter/winter'
import loadapp from '../../components/loadapp';
export default {
  data () {
    return {
      state:this.$store.state,
       loginyn:true,//是否登录
       resutlToken:'',
       messagetishi:"我的抽奖记录",
       alltan:false,
       message:'',
       binglistcont:false,
       zhonglist:false,
       isB:false,
       bingoEggList:'',
       Iswap:false,
       isIos:false,
       idata:0,
    }
  },
  methods:{
    checkAppLogin(){//判断是否登录
        let query = this.$route.query
        let _this = this
        if(typeof query.ver=="undefined"){//微信打开
          console.log("wap")
              _this.Iswap=true
            if(typeof this.$store.state.user === 'undefined'){
              return false
            }else{
              return true;//微信已登录

            }
        }else{
            if(query.token){//APP打开
                    _this.resutlToken = query.token;
                    _this.rowlogin = false;
                     if(_this.resutlToken!=""){
                        ls.setItem("_user",{"Token":query.token})
                        this.$store.commit("userinfo")
                      }
                return true;//APP已登录
              }else{
              //console.log(234)
               return false;
              }
        }
      },

      closetan(){
        let _this=this
        _this.alltan=false
        _this.zhonglist=false
        _this.isB=false
      },
      getreturn(returndata){
         let _this=this
        console.log(returndata);

        _this.messagetishi=returndata.messagetishi
        _this.message=returndata.message
        _this.alltan=returndata.tanbool
      },
      bingolist(){
        let _this=this
        _this.zhonglist=true
        _this.alltan=true
       _this.isB=true

      this.$http(this.$api.RegisterGiftList({token:_this.resutlToken}))
      .then((data) => {
         console.log(data);
         _this.bingoEggList=data.data.ResultData
         //_this.bingoEggList.length=1;
         _this.hittime=data.data.ResultData.times
         _this.usetimes=data.data.ResultData.useTimes
      })
      },
  },
  created:function(){
    let _this = this
    let query = this.$route.query

   _this.idata=query.i
   console.log(_this.idata)

    if(query.ver=="ios"){
      _this.isIos=true
    }
    if(_this.checkAppLogin()){
        _this.loginyn=true

    }else{
       _this.loginyn=false
    }

  },
  beforeDestory() {
  },
  components:{
    winter,
    loadapp,
  },
}
</script>


<style lang="scss" scoped>
.container{background:#f1c27b;padding-bottom:rem(60);height:rem(1080);}
.container .banner{
  @include bg("/static/img/activity/winter/warmbanner.jpg")
  background-size:100%;
  height:rem(580)
}
.eggmessage{
  margin:rem(20) auto rem(20);
  text-align:center;
  height:17.5rem;
}
.share{width:85%;text-align:center;height:rem(60);line-height:rem(60);border-radius:rem(10);background:#de3121;color:#fff;margin:0 auto;font-size:rem(18)}
.eggmessage .eggtop{
@include fontStyle(rem(20),rem(40))
@include sizeColor(rem(20), #9e6c13)
font-weight:bold;
}
.eggmessage .eggtop span{
  @include sizeColor(rem(18), #d81616)
  font-weight:normal;
}
.eggmessage span.eggsco{
@include fontStyle(rem(18),rem(30))
@include sizeColor(rem(18), #9e6c13)
}
.rulebot{text-align:left;width:90%;margin:rem(20) auto;background:#ffe8ca;color:#6d0909;border-radius:rem(7)}
.rulebot p{width:90%;margin:0 auto;line-height:rem(25)}
.rulebot p:first-child{padding-top:rem(10);line-height:rem(40)}
.rulebot p:last-child{padding-bottom:rem(15)}

.bingodetail{width:rem(150);height:rem(28);line-height:rem(28);border-radius:rem(10);background:#f3303c;color:#ffef80;text-align:center;margin:rem(-310) auto 0;}
.isshow{height:0;overflow:hidden;}
.graybg{width:100%;height:100%;background:#000;opacity: 0.3;position:fixed;top:0;left:0;z-index:10;}
.bingolist{width:rem(300);min-height:auto;background-size:100%;position:fixed;top:50%;left:50%;z-index:11;margin:rem(-150) 0 0 rem(-150);text-align:center;}
.tanalertlist .toppic{}
.tanalertlist .topred{color:#f23352;font-size: rem(18);padding-top:rem(20);font-weight: bold;}
.tanalertlist .contenttan{background:#fff9df;border-radius:rem(8) rem(8) rem(8) rem(8);min-height:auto;padding-bottom:rem(15)}
.tanalertlist .contenttan .message{width:85%;margin:rem(10) auto;}
.tanalertlist .contenttan .surebot{height:rem(40);line-height:rem(40);width:40%;margin:rem(10) auto;color:#fff;background:#f23352;border-radius:rem(5)}
.tanalertlist .contenttan .toppic{}
.tanalertlist .zhonglist{width:90%;margin:rem(20) auto;border-radius:rem(2);border-top:rem(1) solid #f23352;border-bottom:rem(1) solid #f23352;padding:rem(5) 0;}
.tanalertlist .zhonglist li{line-height:rem(60);color:#626262;text-align:center;height:rem(60)}
.tanalertlist .zhonglist li p{width:33%;float:left;font-size:rem(12);}
.tanalertlist .smbot{line-height:rem(30);color:#545454;}

.rightbot{color:#6d0909;text-align:right;width:85%;line-height: rem(30);margin:0 auto;}

</style>