<template>
    <div class="container">
          <div class="banner"></div>
          <div class="bingodetail" @click="bingolist()">中奖明细</div>
          <div class="eggmessage">
            <p class="eggtop">您有<span>{{hittime}}</span>次砸金蛋机会</p>
            <p class="eggsco">投资每2000元可砸蛋</p>

            <hitegg :hitEggTimes="usetimes"  :loginmessage="loginyn" @getreturn="getreturn" :idata="idata"></hitegg>


            <div class="rulebot">
              <p>活动规则</p>
              <p>1、新用户注册当天可免费砸金蛋1次；</p>
              <p>2、用户每投资不低于30天的固定理财2000元，当天即可以砸一次，按2000元/次累积；投资获得的砸金蛋机会每天最多10次；</p>
              <p>3、用户有机会砸出最高1125元现金红包、10~500元投资券，0.5%~2%加息券等；</p>
              <p>4、砸金蛋机会当天23:59清零；</p>
              <p>5、活动奖品直接发放到用户账户中，奖品有效期以实际发放奖品为准；</p>
              <p>6、活动最终解释权归恒瑞金服所有<span v-if="!isIos">。</span><span v-if="isIos">，活动与苹果公司无关。</span></p>
            </div>
          </div>

          <div class="tanalertlist" v-if="alltan" v-bind:class="{ bingolist: isB }">
            <div class="toppic"></div>
            <div class="contenttan">
                 <div class="topred">{{messagetishi}}</div>
                  <ul class="zhonglist" v-if="zhonglist">
                      <li>
                          <p>抽奖时间</p>
                          <p>抽奖时间</p>
                      </li>


                      <li v-for="item in bingoEggList">
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
import hitegg from '../../components/hitegg/egg'
import loadapp from '../../components/loadapp';
export default {
  data () {
    return {
      state:this.$store.state,
       loginyn:true,//是否登录
       GoldenEggTimes:0,//砸金蛋抽奖次数
       resutlToken:'',
       messagetishi:"中奖明细",
       alltan:false,
       message:'',
       binglistcont:false,
       zhonglist:false,
       isB:false,
       bingoEggList:'',
       hittime:'',
       usetimes:'',
       idata:0,
       isIos:false
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

        _this.hittime=returndata.hittime
        _this.usetimes=returndata.usetimes
      },
      bingolist(){
        let _this=this
        _this.zhonglist=true
        _this.alltan=true
       _this.isB=true

       if(!_this.$lg.applogin()){
            return
      }

       this.$http(this.$api.GoldenEggGiftList({token:_this.resutlToken}))
          .then((data) => {
             console.log(data);
             _this.bingoEggList=data.data.ResultData
          })


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

      this.$http(this.$api.GoldenEggInfo({token:_this.resutlToken}))
      .then((data) => {
         console.log(data);
         _this.bingoEggList=data.data.ResultData.list
         _this.hittime=data.data.ResultData.times
         _this.usetimes=data.data.ResultData.useTimes
      })
  },
  beforeDestory() {
  },
  components:{
    hitegg,
    loadapp,
  },
}
</script>


<style lang="scss" scoped>
.container{background:#ed3b58;padding-bottom:rem(60);height:rem(800)}
.container .banner{
  @include bg("/static/img/activity/hitegg/hiteggbanner.jpg")
  height:rem(420)
}
.eggmessage{
  margin:rem(-210) auto;
  text-align:center;
}
.eggmessage .eggtop{
@include fontStyle(rem(26),rem(40))
@include sizeColor(rem(26), #fff)
}
.eggmessage .eggtop span{
  @include sizeColor(rem(26), #ffee34)
  display: inline;
  text-align:center;
}
.eggmessage .eggsco{
@include fontStyle(rem(18),rem(30))
@include sizeColor(rem(18), #fff)
}
.rulebot{text-align:left;width:90%;margin:0 auto;background:#c32740;color:#fff;border-radius:rem(7)}
.rulebot p{width:90%;margin:0 auto;line-height:rem(25)}
.rulebot p:first-child{padding-top:rem(10);line-height:rem(40)}
.rulebot p:last-child{padding-bottom:rem(15)}

.bingodetail{position: absolute;top:rem(135);right:rem(20);width:rem(80);height:rem(25);line-height:rem(25);border-radius:rem(10);background:#ff5176;color:#fff;text-align:center;}
.graybg{width:100%;height:100%;background:#000;opacity: 0.3;position:fixed;top:0;left:0;z-index:10;}
.tanalertlist{width:rem(300);min-height:auto;background-size:100%;position:fixed;top:50%;left:50%;z-index:11;margin:rem(-180) 0 0 rem(-150);text-align:center;}
.bingolist{width:rem(300);min-height:auto;background-size:100%;position:fixed;top:50%;left:50%;z-index:11;margin:rem(-280) 0 0 rem(-150);text-align:center;}
.tanalertlist .toppic{@include bg("/static/img/activity/hitegg/hittan.png");height:rem(100);width:100%}
.tanalertlist .topred{color:#f23352;font-size: rem(18);padding-top:rem(10);font-weight: bold;}
.tanalertlist .contenttan{background:#fff9df;border-radius:0 0 rem(8) rem(8);min-height:auto;padding-bottom:rem(15)}
.tanalertlist .contenttan .message{width:85%;margin:rem(10) auto;}
.tanalertlist .contenttan .surebot{height:rem(40);line-height:rem(40);width:40%;margin:rem(15) auto;color:#fff;background:#f23352;border-radius:rem(5)}
.tanalertlist .contenttan .toppic{}
.tanalertlist .zhonglist{width:90%;margin:0 auto;border:rem(1) solid #fe516d;border-radius:rem(2);}
.tanalertlist .zhonglist li{height:rem(30);line-height:rem(30);color:#626262;text-align:center;}
.tanalertlist .zhonglist li p{width:50%;float:left;}
.tanalertlist .zhonglist li:first-child{color:#fff;background:#fe516d;}
.tanalertlist .smbot{line-height:rem(30);color:#545454;}
</style>