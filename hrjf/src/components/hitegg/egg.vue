<template>

<div class="niceegg">
    <p class="rulebottom" @click="rulebottom()"></p>

    <div class="eggclick">
        <div class="egginside" style="position:relative">
        <marquee scrolldelay="100" style=" position:absolute; top:0.35rem;left:0;color:#fff;"><span style="padding:0 0.5rem">{{ marqueedata }} </span></marquee>
            <ul>
                <li v-for="(item,index) in eggnumber"  @click="hitegg($event)" :class="{isclose:isclose}" > <span ref="chuizi" v-show="showme"></span> </li>
            </ul>
            <p class="eggcount" v-if="loginmessage"> 已砸<span v-if="isoutside">{{hitEggTimes}}</span><span v-if="!isoutside">{{myGoldenEggTimes}}</span>次金蛋</p>
            <p class="eggcount" v-else><a @click="logindi()" style="color:#fff;">查看砸蛋次数</a></p>
        </div>
    </div>


     <div class="tanalertlist" v-if="alltan">
            <div class="toppic"></div>
            <div class="contenttan">
                 <div class="topred">{{returndata.messagetishi}}</div>
                  <p class="message">{{returndata.message}}</p>
                  <div class="surebot" @click="closetan()">确定</div>
            </div>

          </div>

          <div class="graybg"  v-if="alltan"></div>

</div>

</template>

<script>
import ls from '../../store/lStorage.js'

  export default {
  data () {
    return {
      state:this.$store.state,
      isoutside:true,
      dialogshow:false,
      activeIndex:0,
      isUl:true,
      eggnumber:{egg1:"1",egg2:"2",egg3:"3"},
      myGoldenEggTimes:'',

      openegg:true,

      settime:0,
      alltan:false,
      isclose:false,
      showme:true,
      onlytime:true,
      intervalid:null,
      returndata:{
          hittime:'',
          usetimes:'',
          message:'',
          messagetishi:'提示',
      },
    }
  },
   props: {
        loginmessage: Boolean,  //是否有登录
        hitEggTimes:'',
        marqueedata:'',
        idata:Number,
      },
  methods:{
    rulebottom(){ //点击规则按钮
         let _this=this
        this.$emit("rulebottom",_this.rule)
    },
    logindi(){
      this.$lg.applogin()
    },

    closetan(){
        let _this=this
        _this.alltan=false
        _this.zhonglist=false
        _this.isB=false
         _this.isclose=true
         _this.showme=true
         _this.onlytime=true
      },

    hitegg(e){ //砸蛋
          let _this=this

          let query = this.$route.query

          // if(typeof query.ver=="undefined"){//微信打开
                // _this.$msg.alert("注册成为恒瑞金服会员，投资2000元固定理财即可获奖哦！",function(){

                    //window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinyang.wealth"
                 //})

                //  return
      //  }

        if(this.$lg.isapp()&&typeof this.$store.state.user === 'undefined'){
           _this.$msg.confirm("请先注册或登录",function(){
               _this.$router.push("/reg?back=hitegg")
               return false;
              },function(){
                _this.$router.push("/login?back=hitegg")
                return false;
              },"登录","注册")
           clearInterval(this.intervalid)
           return
        }

          if(!_this.$lg.applogin()){
            clearInterval(this.intervalid)
            return
          }
          _this.isclose=false
          _this.showme=false
          if(_this.onlytime){
            _this.onlytime=false
            _this.$http(this.$api.GoldenEggDraw({}))
              .then((data) => {
                    console.log(data)
                      if(data.data.ResultData.isSuccess){
                           e.target.className = "openegg";
                           _this.returndata.messagetishi = '砸蛋结果';
                      }else{
                        _this.returndata.messagetishi = '提示';
                      }
                       _this.returndata.hittime=data.data.ResultData.times
                       _this.returndata.usetimes=data.data.ResultData.useTimes
                       _this.returndata.message=data.data.ResultMessage
                      console.log(_this.returndata)
                        _this.$emit("getreturn",_this.returndata)
                       setTimeout(function(){
                          _this.alltan=true

                           },500)
                       //
              })
          }

    },

    init() {
      const self = this;
      let getMenuText = this.$refs.chuizi;
      let indexspan=0
      this.intervalid = setInterval(_ => {
          if(indexspan>2){
              indexspan=0

          }else{
             for(let i=0;i<getMenuText.length;i++){
                    getMenuText[i].className=""
              }
              getMenuText[indexspan].className="showon"
              indexspan++
          }
       }, 1000);
    },

  },
computed: {

  },
mounted() {

 this.init()

},
  created:function(){
    let _this = this

   //_this.loginmessage=_this.$lg.applogin()
   //console.log(  _this.loginmessage);

  },

}
</script>


<style lang="scss" scoped>
.egginside ul{width:93%;height:4rem;margin:0 auto;padding-top: 0.2rem;}
.egginside ul li{background:url(../../../static/img/activity/hitegg/closeegg.png) no-repeat center bottom;background-size: 100%;width:33%;float:left;height:4rem;position:relative;}
.egginside ul li.openegg{background:url(../../../static/img/activity/hitegg/openegg.png) no-repeat center  bottom;background-size: 100%;width:34%;}
.egginside ul li.openeggover{background:url(../../../static/img/activity/hitegg/closeegg.png) no-repeat center bottom;background-size: 100%;;width:33%;}
.egginside ul li span{display:none;}
.egginside ul li span.showon{background:url(../../../static/img/activity/hitegg/chuizi.gif) no-repeat center bottom;background-size: 100%;width:1.5rem;height:1.5rem;display:block;position: absolute;top:rem(0);right:rem(-10);}
.egginside .eggcount{clear:both;line-height:rem(50);color:#fff;}


.tanalertlist{width:rem(300);min-height:auto;background-size:100%;position:fixed;top:50%;left:50%;z-index:11;margin:rem(-180) 0 0 rem(-150);text-align:center;}
.bingolist{width:rem(300);min-height:auto;background-size:100%;position:fixed;top:50%;left:50%;z-index:11;margin:rem(-280) 0 0 rem(-150);text-align:center;}
.tanalertlist .toppic{@include bg("/static/img/activity/hitegg/hittan.png");height:rem(100);width:100%}
.tanalertlist .topred{color:#f23352;font-size: rem(18);padding-top:rem(10);font-weight: bold;}
.tanalertlist .contenttan{background:#fff9df;border-radius:0 0 rem(8) rem(8);min-height:auto;padding-bottom:rem(15)}
.tanalertlist .contenttan .message{width:85%;margin:rem(10) auto;}
.tanalertlist .contenttan .surebot{height:rem(40);line-height:rem(40);width:40%;margin:rem(15) auto;color:#fff;background:#f23352;border-radius:rem(5)}
.tanalertlist .contenttan .toppic{}
.tanalertlist .smbot{line-height:rem(30);color:#545454;}
.graybg{width:100%;height:100%;background:#000;opacity: 0.3;position:fixed;top:0;left:0;z-index:10;}
</style>