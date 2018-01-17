<template slot-scope="sss">
<div class="allcontent">
  <div class="tabtopli">
     <div class="ulcont">
       <ul class="borul">
        <li v-for="(item, index) in datatopli" @click="toptabclick(item,index)" :class="{active: activeName == item || index==checkindex && clickcheck}" ref="needli">
          <div class="picword">
            <div class="pic">
              <p class="smallpic"></p>
              <p class="suotou" v-if="!item[1]"></p>
            </div>
            <p class="word">{{item[0]}}</p>
          </div>
        </li>
       </ul>
      <div class="specialword">
        <p>{{textword}}</p>
      </div>

    <div class="bigtab">
        <ul class="bigtabyuan">
          <li v-for="(item,index) in memberlist[0]"  @click="circletabclick(item,index,$event)"  :class="{activeli: activecircle == item || index==memindex}">
            <p class="circle"></p>
            <p class="cname">{{item}}</p>
          </li>
          <p class="line"></p>
        </ul>

              <ul class="bigtabcont activemove1"  ref="mybox">
                <li v-for="(item,index) in memberlist[1]">
                  <div class="pcontent">
                    <p v-for="items in listcont[index]">{{items}}</p>
                  </div>
                </li>
              </ul>

    </div>

      <div class="explaind">
          <p>领取说明</p>
          <p v-for="idd in explain">{{idd}}</p>
     </div>
  </div>
</div>
</div>
</template>

<script>
import ls from '../../store/lStorage.js'
export default {
  data () {
    return {
      state:this.$store.state,
      activeName:'',
      activecircle:'',
      textword:'',
      explain:'',
      listcont:'',
      activeleftindex:'',
      checkindex:0,
      memindex:0,
      leftIndex:'',

      open:true,

      clickcheck:true,

      on:true,

      listcont:'',
      datatopli:['生日特权','积分特权','晋级特权','节日特权','积分加倍特权','周年感恩特权'],
      datatopliword:['生日特权：恒瑞金服为会员庆生，生日月每个会员可领取一个生日礼包','积分特权：恒瑞金服向会员赠送的积分，积分越多可享受的商城服务越','晋级特权：恒瑞金服为晋级会员提供的一次性奖励','节日特权：恒瑞金服在特定节日里向会员发放的节日礼品','积分加倍：达到指定级别可自动获得投资积分加速奖励','周年庆特权：恒瑞金服周年活动回馈高等级会员的实物奖励'],
      datalingqu:[
        ['1、会员生日以激活用户的身份证号码为准，生日当月1号起可领取；','2、每个会员每年限领一次，生日当月可领，过期未领视为主动放弃；','3、投资券奖品使用条件和有效期以实物为准。'],
        ['1、 根据会员领取积分礼包时所处的会员等级，领取相应的积分福利；','2、 若会员等级跨级提升，则可一次性获得所有跨越等级的积分福利；','3、 领取有效期内为升级当天起5天内领取有效。'],
        ['1、 根据会员领取晋级礼包时所处的会员等级，领取相应的晋级礼包福利；','2、 若会员等级跨级提升，则可一次性获得所有跨越等级的晋级礼包；','3、 取有效期内为升级当天起5天内领取有效；','4、 会员升至新等级时限领一次，过期未领视为主动放弃；','5、投资券奖品使用条件和有效期以实物为准。'],
        ['1、指定节假日5天内可领取;','2、根据会员领取节日礼包时所处的会员等级，领取相应的等级礼包；','3、每个会员每个节日限领一次，过期未领视为主动放弃。'],
        ['无需领取，会员在对应等级内，参与固定理财投资或邀请好友投资即可获得对应等级的积分加倍福利；'],
        ['1、级别不同，礼包不同，等级越高，礼品越丰富；','2、礼包有效期半年，每年限领一次，过期未领视为主动放弃；','3、原则上礼包寄送时间为领取后五个工作日内发货。'],
      ],
      datamember:'',
      memberlist:[
          ['普通会员','白银会员','黄金会员','铂金会员','白钻会员','黑钻会员',],
          [//memberlist[1]
            [],[],[],[],[],[],
          ],
      ],

      timerall:null,

    }
  },
  methods:{
      toptabclick(item,index){
        let _this=this
        if(item[1]){

        }

        _this.clickcheck=true
           _this.activeName = item
         _this.checkindex=index
         _this.textword=_this.datatopliword[index]
         _this.explain=_this.datalingqu[index]
         _this.listcont=_this.memberlist[1][index]
         _this.$refs.needli.forEach(function(item, index){
              item.setAttribute('class','')
          })
         _this.$refs.needli[index].setAttribute('class','active')


      },
      circletabclick(item,index){
        let _this=this
        if(_this.open){
          _this.open=false
         // if(_this.$refs.needli[0].getAttribute('class')=="active"){

         //  }else{


         //  }

         //  _this.$refs.needli.forEach(function(item, index){
         //      item.setAttribute('class','')
         //  })
         // _this.listcont=_this.memberlist[1][0]
          // _this.$refs.needli[0].setAttribute('class','active')

          //_this.$refs.needli[0].style.border="rem(2) solid #edbf52"




       this.$http(this.$api.GiftBagDescList({"level":index+1}))
      .then((data) => {
        console.log(data)
         let datafilter=data.data.ResultData
         _this.datatopli=[]
         for(var arr in datafilter){
          _this.datatopli[arr]=[]
         }
         for(var arr in datafilter){
          _this.datatopli[arr].push(datafilter[arr].GiftBagName)
          _this.datatopli[arr].push(datafilter[arr].CanDraw)
         }
      })



        _this.timerall=null
         let cishu=0
        let abszhi=index * 9.75;
        let ulleft=_this.$refs.mybox.style.marginLeft.substring(0,_this.$refs.mybox.style.marginLeft.length-3)

        _this.memindex=index
         _this.activecircle = item
        _this.leftIndex=-index * 9.75


        //console.log(_this.$refs.mybox.style.marginLeft)
       _this.timerall=setInterval(() => {
          if(abszhi!=Math.abs(ulleft)){


               //_this.$refs.mybox.style.marginLeft = -0.25*cishu+'rem';
               ulleft=_this.$refs.mybox.style.marginLeft.substring(0,_this.$refs.mybox.style.marginLeft.length-3)
                if(Math.abs(_this.leftIndex)-Math.abs(ulleft)){//往右
                     _this.$refs.mybox.style.marginLeft = 0.25*cishu+'rem';
                }else{//往左
                    if(ulleft==0){
                        _this.$refs.mybox.style.marginLeft = 0+'rem';
                      }else{
                       _this.$refs.mybox.style.marginLeft = -0.25*cishu+'rem';
                      }

                }
               //console.log(_this.$refs.mybox.style.marginLeft)
               //console.log(Math.abs(ulleft))
               cishu++

          }else{
            clearInterval(_this.timerall)
            _this.open=true
          }
         },1)
        }



      },

  },
  created:function(){
    let _this = this
    let query = this.$route.query

     if(_this.$lg.applogin()){
        this.$http(this.$api.LevelUpNeedPay({}))
      .then((data) => {
         let level=data.data.ResultData.Level
         console.log(level)
         for(var i=0;i<_this.memberlist[0].length;i++){
           if(_this.memberlist[0][i]==level){
                _this.circletabclick(_this.memberlist[0][i],i)
              }
         }
      })
      }

    _this.textword=_this.datatopliword[0]
    _this.explain=_this.datalingqu[0]
    _this.listcont=_this.memberlist[1][0]
    console.log(_this.memberlist[1])

    this.$http(this.$api.GiftBagDescList({"level":1}))
      .then((data) => {
         let datafilter=data.data.ResultData
         _this.datatopli=[]
         for(var arr in datafilter){
          _this.datatopli[arr]=[]
         }
         for(var arr in datafilter){
          _this.datatopli[arr].push(datafilter[arr].GiftBagName)
          _this.datatopli[arr].push(datafilter[arr].CanDraw)
         }
      })



       this.$http(this.$api.GiftBagCouponList({"level":1,"GiftBagType":101}))
      .then((data) => {
         console.log(data)
        _this.memberlist[1]=data.data.ResultData
        _this.listcont=_this.memberlist[1][0]
      })



  },
  beforeDestory() {
  },
  components:{

  },
  computed: {
  left:function() {
      return - this.activeIndex * 0.66 + 'rem';
    },
},
}
</script>


<style lang="scss" scoped>
.allcontent{background:#fff;min-height:rem(710);}
.allcontent .tabtopli{width:95%;margin:rem(0) auto 0;padding-top: rem(10);}
.allcontent .tabtopli .ulcont{}
.allcontent .tabtopli .ulcont ul.borul{clear:both;min-height:rem(216)}
.allcontent .tabtopli .ulcont ul.borul li{float:left;width:rem(187);text-align: left;height:rem(71);line-height: rem(71);border-right:rem(1) solid #dddddd;border-bottom:rem(1) solid #dddddd;overflow:hidden;}
.allcontent .tabtopli .ulcont ul.borul li:nth-child(2n){border-right:none;}
.allcontent .tabtopli .ulcont ul.borul li.active{overflow:hidden;}
.allcontent .tabtopli .ulcont ul.borul li .picword{width:rem(183);height:rem(68);}
.allcontent .tabtopli .ulcont ul.borul li.active .picword{border:rem(2) solid #edbf52;}
.allcontent .tabtopli .ulcont ul.borul li .picword .pic{width:30%;height:rem(65);float:left;padding-left:rem(10);position:relative;}
.allcontent .tabtopli .ulcont ul.borul li .picword .word{color:#798ba3;font-size:rem(16);float:left;width:60%;text-indent:rem(5);}
.allcontent .tabtopli .ulcont ul.borul li .picword .pic .smallpic{width:100%;height:100%;}
.allcontent .tabtopli .ulcont ul.borul li .picword .pic p.suotou{background:url(../../../static/img/activity/member/suo.png) no-repeat center center;position:absolute;bottom:rem(2);right:rem(-3);height:rem(20);width:rem(20);background-size:90%;}
.allcontent .tabtopli .ulcont ul.borul li:nth-child(1) .picword .pic .smallpic{background:url(../../../static/img/activity/member/srtu.png) no-repeat center center;background-size: 90%;}
.allcontent .tabtopli .ulcont ul.borul li:nth-child(2) .picword .pic .smallpic{background:url(../../../static/img/activity/member/jftu.png) no-repeat center center;background-size: 90%;}
.allcontent .tabtopli .ulcont ul.borul li:nth-child(3) .picword .pic .smallpic{background:url(../../../static/img/activity/member/jjtu.png) no-repeat center center;background-size: 90%;}
.allcontent .tabtopli .ulcont ul.borul li:nth-child(4) .picword .pic .smallpic{background:url(../../../static/img/activity/member/fttu.png) no-repeat center center;background-size: 90%;}
.allcontent .tabtopli .ulcont ul.borul li:nth-child(5) .picword .pic .smallpic{background:url(../../../static/img/activity/member/dbtu.png) no-repeat center center;background-size: 90%;}
.allcontent .tabtopli .ulcont ul.borul li:nth-child(6) .picword .pic .smallpic{background:url(../../../static/img/activity/member/zntu.png) no-repeat center center;background-size: 90%;}
.allcontent .tabtopli .ulcont .specialword{text-align:left;color:#fff;height:auto;background:#edbf52;}
.allcontent .tabtopli .ulcont .specialword p{width:96%;margin:rem(20)  auto ; line-height: rem(30);font-size:rem(16)}
.allcontent .tabtopli .ulcont .explaind{color:#798ba3;line-height:rem(30);font-size:rem(16);width:90%;margin:0 auto;padding:rem(20) 0;}
.allcontent .tabtopli .ulcont .bigtab{width:100%;overflow: hidden;}
.allcontent .tabtopli .ulcont ul.bigtabyuan{width:100%;margin:0 auto;position: relative;height:rem(60)}
.allcontent .tabtopli .ulcont ul.bigtabyuan li{float:left;width:16%;margin:0 rem(1)}
.allcontent .tabtopli .ulcont ul.bigtabyuan .line{height:rem(8);width:100%;background:#edbf52;position: absolute;top:rem(7);z-index: 3;}
.allcontent .tabtopli .ulcont ul.bigtabyuan .circle{width:rem(20);height:rem(20);background:#edbf52;border:rem(1) solid #fff;border-radius: 50%;margin:0 auto;z-index: 5;position:relative;}
.allcontent .tabtopli .ulcont ul.bigtabyuan .cname{line-height:rem(25);color:#798ba3;}
.allcontent .tabtopli .ulcont ul.bigtabyuan .activeli .circle{border:rem(1) solid #edbf52;background:#fff;}
.allcontent .tabtopli .ulcont ul.bigtabyuan .activeli .cname{color:#edbf52;}
.allcontent .tabtopli .ulcont .bigtabcont{width:800%;}
.allcontent .tabtopli .ulcont .bigtabcont li{float:left;width:rem(368);border:rem(1) solid #edbf52;border-radius:rem(5);height:rem(120);padding:rem(10) 0;margin:0 rem(5) 0 rem(15);background:url(../../../static/img/activity/member/lwtu.png) no-repeat  rem(230) center;background-size: 30%;}
.allcontent .tabtopli .ulcont .bigtabcont li:first-child{margin-left:rem(5);margin-right:rem(15)}
.allcontent .tabtopli .ulcont .bigtabcont li .pcontent{}
.allcontent .tabtopli .ulcont .bigtabcont li .pcontent p{color:#798ba3;padding-left:rem(40);width:30%;line-height:rem(20)}
.allcontent .tabtopli .ulcont .bigtabcont li.nonoli{background:none;width:rem(0);margin-left:rem(-35)}




</style>