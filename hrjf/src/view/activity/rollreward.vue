<template>
    <div class="container">
          <div class="banner"></div>

          <div class="eggmessage">
            <p class="eggtop"><span>我的积分：<b>{{hittime}} </b></span><span class="eggsco">每次消耗{{needPoint}}积分</span> </p>



            <roll :loginmessage="loginyn" :PointDrawTimes="PointDrawTimes" v-on:score="score" :idata="idata"></roll>

            <div style="position:relative">
              <div class="bingodetail" @click="bingolist()" v-if="loginyn">中奖明细</div>
            </div>
            <div class="rulebot">
              <p>活动规则</p>
              <p>1、每次抽奖需花{{needPoint}}积分，用户每天最多有{{dayTimes}}次抽奖机会；</p>
              <p>2、所获投资券、现金红包或加息券直接放入个人优惠券中，优惠券使用规则以实际发放奖品为准；</p>
              <p>3、积分抽奖活动最终解释权归恒瑞金服所有<span v-if="!isIos">。</span><span v-if="isIos">，活动与苹果公司无关。</span></p>
            </div>
          </div>

          <div class="tanalertlist" v-if="alltan" v-bind:class="{ bingolist: isB,isNobor:isZero }">
            <div class="contenttan">
                 <div class="topred">中奖明细</div>
                  <ul class="zhonglist" v-if="zhonglist">

                      <li v-if="isZero">暂无记录</li>
                      <li v-for="item in bingoEggList" v-if="!isZero">
                        <p>{{item.date}}</p>
                        <p>{{item.prize}}</p>
                      </li>
                  </ul>
                  <p class="smbot"  v-if="zhonglist">仅展示最近10条记录</p>
                  <div class="surebot" @click="closetan()">确定</div>
            </div>

          </div>

          <div class="graybg"  v-if="alltan"></div>
          <loadapp v-if="loginyn"></loadapp>
    </div>
</template>

<script>
import ls from '../../store/lStorage.js'
import roll from '../../components/rollreward/roll'
import loadapp from '../../components/loadapp';
export default {
  data () {
    return {
      state:this.$store.state,
       loginyn:true,//是否登录
       GoldenEggTimes:0,//砸金蛋抽奖次数
       resutlToken:'',
       messagetishi:"砸蛋结果",
       alltan:false,
       message:'',
       binglistcont:false,
       zhonglist:false,
       isB:false,
       bingoEggList:'',
       hittime:'',
       needPoint:'',

       PointDrawTimes:0,

       isZero:false,
       dayTimes:0,
       isIos:false,
       idata:0,
    }
  },
  methods:{
    checkAppLogin(){//判断是否登录
        let query = this.$route.query
        let _this = this
        if(typeof query.ver=="undefined"){//微信打开
            if(typeof this.state.user=="undefined"){
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

        _this.hittime=returndata.hittime
      },

      bingolist(){
        let _this=this

        this.$http(this.$api.PointDrawGiftList({}))
      .then((data) => {
         console.log(data);
         if(data.data.ResultCode==100000){
          _this.bingoEggList=data.data.ResultData
          //data.data.ResultData.length=0
          if(data.data.ResultData.length==0){
            _this.isZero=true
          }
          _this.zhonglist=true
          _this.alltan=true
          _this.isB=true
         }

      })

      },

      score(data){
        let _this=this
        _this.hittime=data
      },
  },
  created:function(){
    let _this = this
    let query = this.$route.query
     if(query.ver=="ios"){
      _this.isIos=true
    }

    if(_this.checkAppLogin()){
        _this.loginyn=true

    }else{
       _this.loginyn=false
    }

      this.$http(this.$api.PointDrawInfo({token:_this.resutlToken}))
      .then((data) => {
         console.log(data);
         _this.bingoEggList=data.data.ResultData.list
         _this.hittime=data.data.ResultData.gold
         _this.PointDrawTimes=data.data.ResultData.times
         _this.needPoint=data.data.ResultData.needPoint
         _this.dayTimes=data.data.ResultData.dayTimes
      })
  },
  beforeDestory() {
  },
  components:{
    roll,
    loadapp,
  },
}
</script>


<style lang="scss" scoped>
.container{background:#be9d59;padding-bottom:rem(60);height:rem(680)}
.container .banner{
  @include bg("/static/img/activity/rollreward/rollbanner.jpg")
  background-size:100%;
  height:rem(740)
}
.eggmessage{
  margin:rem(-580) auto 0;
  text-align:center;
}
.eggmessage .eggtop{
@include fontStyle(rem(20),rem(40))
@include sizeColor(rem(20), #9e6c13)
font-weight:bold;
width:85%;text-align:left;
margin: 0 auto;
height:rem(30);
line-height:rem(30);
}
.eggmessage .eggtop span{display:block;width:50%;font-size:rem(16)}
.eggmessage .eggtop span:first-child{float:left;font-weight:bold;@include sizeColor(rem(18), #9e6c13)}
.eggmessage .eggtop span:nth-child(2){float:right;text-align:right;font-size:rem(16)}
.eggmessage .eggtop span{
  @include sizeColor(rem(18), #d81616)
  font-weight:normal;
}
.eggmessage span.eggsco{
@include fontStyle(rem(18),rem(30))
@include sizeColor(rem(18), #9e6c13)
}
.rulebot{text-align:left;width:90%;margin:0 auto;background:none;color:#fff;border-radius:rem(7)}
.rulebot p{width:90%;margin:0 auto;line-height:rem(25)}
.rulebot p:first-child{padding-top:rem(0);line-height:rem(40)}
.rulebot p:last-child{padding-bottom:rem(15)}

.bingodetail{position: absolute;top:rem(5);right:rem(35);width:rem(80);height:rem(25);line-height:rem(25);border-radius:rem(10);background:#af0200;color:#fff;text-align:center;}

.graybg{width:100%;height:100%;background:#000;opacity: 0.3;position:fixed;top:0;left:0;z-index:10;}
.tanalertlist{width:rem(300);min-height:auto;background-size:100%;position:fixed;top:50%;left:50%;z-index:11;margin:rem(-180) 0 0 rem(-150);text-align:center;}
.bingolist{width:rem(300);min-height:auto;background-size:100%;position:fixed;top:50%;left:50%;z-index:11;margin:rem(-280) 0 0 rem(-150);text-align:center;}
.isNobor{margin:rem(-120) 0 0 rem(-150);}
.tanalertlist .toppic{@include bg("/static/img/activity/hitegg/hittan.png");height:rem(100);width:100%}
.tanalertlist .topred{color:#f23352;font-size: rem(18);padding-top:rem(20);font-weight: bold;}
.tanalertlist .contenttan{background:#fff9df;border-radius:rem(8) rem(8) rem(8) rem(8);min-height:auto;padding-bottom:rem(15)}
.tanalertlist .contenttan .message{width:85%;margin:rem(10) auto;}
.tanalertlist .contenttan .surebot{height:rem(40);line-height:rem(40);width:40%;margin:rem(10) auto;color:#fff;background:#f23352;border-radius:rem(5)}
.tanalertlist .contenttan .toppic{}
.tanalertlist .zhonglist{width:90%;margin:rem(20) auto;border-radius:rem(2);border-top:rem(1) solid #f23352;border-bottom:rem(1) solid #f23352;padding:rem(5) 0;}
.tanalertlist .zhonglist li{line-height:rem(30);color:#626262;text-align:center;height:rem(30)}
.tanalertlist .zhonglist li p{width:50%;float:left;font-size:rem(12);}
.tanalertlist .smbot{line-height:rem(30);color:#545454;}
</style>