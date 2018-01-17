<template>
<div id="frame">
  <div class="link_head">
    <h1>
        <span>
          <router-link :to="'/'"><img src="static/img/icon_left.png"></router-link>
        </span>
        {{title}}
     </h1>
  </div>
  <div class="xjh">
    <tender :query="state.tenderdetail" :detailinfo="detailinfo"></tender>
    <div class="box" v-if="state.tenderdetail.TenderPayStatus==2">
      <div class="tendermoney_box">
        <p>项目剩余可投金额：{{state.tenderdetail.Money-state.tenderdetail.PrepayMoney}}元</p>
        <div class="moneyrow">
          <div class="moneyinput">
            <i></i>
            <input placeholder="请输入金额(整数)" type="tel" :disabled="disabled" v-on:input ="inputmoney" v-model="tenrdermoney">
            <span @click="over()">全投</span>
          </div>
          <div class="moneybtn">
            <a href="javascript:" @click="submittender()">立即投资</a>
          </div>
        </div>
        <p>预期收益：<span class="red">{{fee.toFixed(2)}}</span>元</p>
      </div>

      <div class="couponpege">
          <div class="padding" v-if="couponcheck">
            <a href="javascript:" v-if="query.GoodsStatus==6||query.GoodsStatus==0">使用优惠券：
              <span><span class="red">{{CouponMoney}}</span>{{coupoonName}}</span>
            </a>

            <router-link :to="'/mycouponstatus?money='+tenrdermoney+'&TenderCouponId='+TenderCouponId" v-else>使用优惠券：
              <span><span class="red">{{CouponMoney}}</span>{{coupoonName}}</span>
              <i></i>
            </router-link>

          </div>
          <div class="padding" v-else>无可用优惠券</div>
      </div>
    </div>
    <tendersub :total="total" :tenderid="state.tenderdetail.Id"></tendersub>

    <dialogd @getfin="getfin" v-if="diain"></dialogd>
   <div class="bgblack" style="background:#000;opacity:0.3;width:100%;height:100%;position:;top:0px;left:0px;z-index:9;position:fixed;" v-show="getfins"></div>
  </div>

</div>

</template>

<script>
import tender from '../../components/tendedetail';
import tendersub from '../../components/tendersub';
import dialogd from '../../components/dialogd';
import ls from '../../store/lStorage.js'
export default {
  name: 'dtail',
  data () {
    return {
      title: '标的详情',
      state:this.$store.state,
      query:{},
      detailinfo:{},
      total:0,
      tenrdermoney:"",
      fee:0.00,
      page:1,
      couponcheck:false,
      CouponMoney:"",
      couponid:"",
      coupoonName:"",
      TenderCouponId:"",
      getfins:false,
      diain:false,
      disabled:false
    }
  },

  mounted : function() {

  },
  methods:{
    inputmoney(){
      let _this = this
      if(this.tenrdermoney==""){
        this.fee=0.00
        return
      }
     if(this.$route.query.GoodsStatus){
      if(this.$route.query.GoodsStatus==1){
         _this.tenrdermoney=parseFloat(this.tenrdermoney)
        let fee=(parseFloat((this.state.tenderdetail.TenderUseDay).split('天')[0])/360)*(parseFloat(this.tenrdermoney)+parseFloat(this.$route.query.CouponMoney))*parseFloat(this.state.tenderdetail.TenderFee)
        this.fee=fee;
      }
      if(this.$route.query.GoodsStatus==3){
        let fee=(parseFloat((this.state.tenderdetail.TenderUseDay).split('天')[0])/360)*parseFloat(this.tenrdermoney)*(parseFloat(this.state.tenderdetail.TenderFee)+parseFloat(this.$route.query.CouponMoney))
        this.fee=fee;
      }
      if(this.$route.query.GoodsStatus==4){
        let fee=(parseFloat((this.state.tenderdetail.TenderUseDay).split('天')[0])/360)*parseFloat(this.tenrdermoney)*parseFloat(this.state.tenderdetail.TenderFee)
        this.fee=fee*2;
      }

    }else{
       let fee=(parseFloat((this.state.tenderdetail.TenderUseDay).split('天')[0])/360)*parseFloat(this.tenrdermoney)*parseFloat(this.state.tenderdetail.TenderFee)
        this.fee=fee;
    }
        if(typeof this.state.user!="undefined"){
        this.$http(this.$api.GetTenderCouponList({"Id":this.state.tenderdetail.Id,"Money":this.tenrdermoney}))
        .then((data) => {
            if(data.data.ResultData.Total>0){
              for(var i=0;i<data.data.ResultData.List.length;i++){
                if(data.data.ResultData.List[i].GoodsStatus==1||data.data.ResultData.List[i].GoodsStatus==3||data.data.ResultData.List[i].GoodsStatus==4||data.data.ResultData.List[i].GoodsStatus==0||data.data.ResultData.List[i].GoodsStatus==6){
                  _this.couponcheck=true
                }else{
                  _this.couponcheck=false
                }
              }
            }else{
              _this.couponcheck=false
            }
         });
      }
    },
    //风险评估组件
    getfin(msg){
      this.getfins=msg
      this.diain=msg
      this.$router.push('/mytenderlist?index=2')
    },
    over(){
       let query = this.$route.query
       if(query.GoodsStatus==6||query.GoodsStatus==0){
        return
       }
       let money = this.state.tenderdetail.Money-this.state.tenderdetail.PrepayMoney
       this.tenrdermoney = money
       this.inputmoney()
    },
    delhistory(){
      this.$router.push('/tenderDetail')
      this.CouponMoney=""
      this.couponid=""
      this.coupoonName=""
      this.couponcheck=false
    },
    submittender(){
      let _this = this;
      if(typeof this.state.user=="undefined"){
        this.$router.push('/login')
        return
      }
      if(this.tenrdermoney==""){
        this.$msg.alert("请输入投资金额")
        return
      }
      let TenderCouponId = this.$route.query.TenderCouponId
      if(this.$route.query.TenderCouponId){
        let usertype =null
        if(this.$route.query.GoodsStatus==3){
          usertype = 2
        }else{
          usertype = 1
        }
        if(this.$route.query.GoodsStatus==6||this.$route.query.GoodsStatus==0){
          this.$http(this.$api.tenderActivePay({"Id":this.state.tenderdetail.Id,"TenderCouponId":this.$route.query.TenderCouponId}))
          .then((data) => {
            if(data.data.ResultCode==100000){
              _this.$store.dispatch('basset')
              if(_this.$route.query.TG){
                _this.$msg.alert("投标成功，下载APP去领取您的收益吧！",function(){
                  window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.hrcf.wealth"
                },"下载APP")
              }else{
                _this.$msg.alert(data.data.ResultMessage,function(){
                _this.$router.push('/')
                })
              }

            }
          })
        }else{
         this.$http(this.$api.tenderprepay({"Id":this.state.tenderdetail.Id,"Money":this.tenrdermoney,"TenderCouponId":this.$route.query.TenderCouponId,"UseType":usertype}))
        .then((data) => {
            if(data.data.ResultCode==100000){
              _this.$store.dispatch('basset')
              _this.$msg.alert(data.data.ResultMessage,function(){
                let thisMoney = parseFloat(_this.tenrdermoney)
                let payMoney =parseFloat(_this.state.tenderdetail.PrepayMoney)
                let totalMoney = parseFloat(_this.state.tenderdetail.Money)
                if(thisMoney+payMoney==totalMoney){
                  _this.$router.push('/mytenderlist')
                }else{
                  //_this.$router.push('/mytenderlist?index=2')
                  this.$http(this.$api.riskhas({"TokenUser":_this.state.user.Token}))
                  .then((data)=>{
                    if(data.data.ResultData.preference_type == null){
                      _this.getfins=true,
                      _this.diain=true
                    }else{
                       _this.$router.push('/mytenderlist?index=2')
                    }
                  })
                }

              })

            }else{
              _this.$msg.alert(data.data.ResultMessage,function(){
                _this.delhistory()
              })
            }
        })
      }
      }else{
        this.$http(this.$api.tenderprepay({"Id":this.state.tenderdetail.Id,"Money":this.tenrdermoney}))
        .then((data) => {
            if(data.data.ResultCode==100000){
              _this.$store.dispatch('basset')
              _this.$msg.alert(data.data.ResultMessage,function(){
                let thisMoney = parseFloat(_this.tenrdermoney)
                let payMoney =parseFloat(_this.state.tenderdetail.PrepayMoney)
                let totalMoney = parseFloat(_this.state.tenderdetail.Money)
                if(thisMoney+payMoney==totalMoney){
                  _this.$router.push('/mytenderlist')
                }else{
                  //_this.$router.push('/mytenderlist?index=2')
                  this.$http(this.$api.riskhas({"TokenUser":_this.state.user.Token}))
                  .then((data)=>{
                    if(data.data.ResultData.preference_type == null){
                       _this.getfins=true,
                      _this.diain=true
                    }else{
                       _this.$router.push('/mytenderlist?index=2')
                       console.log(12)
                    }
                  })
                }
              })
            }else{

              _this.$msg.alert(data.data.ResultMessage,function(){
                _this.delhistory()
              })
            }
        });
      }

    },
    gettenderinfo(){
      let _this = this;
    this.$http(this.$api.xjhquerytenderdetail({"Id":this.state.tenderdetail.Id}))
    .then((data) => {
      _this.detailinfo=data.data.ResultData;
      _this.$store.state.tender.porjcet=data.data.ResultData.TenderProfile

     });
    this.$http(this.$api.gettenderquerytenderpayer({"id":this.state.tenderdetail.Id,}))
    .then((data) => {
      _this.total =data.data.ResultData.Total

     });
    },
  },
  created:function(){
    let _this = this;
    this.query = this.$route.query

    if(this.$route.query.TenderId){
      this.$http(this.$api.gettenderlist({"Page":1,"PageSize":10,"TenderId":this.$route.query.TenderId}))
      .then((data) => {
        if(data.data.ResultData.List!=""){
          ls.setItem("tenderdetail",data.data.ResultData.List[0]);
          this.$store.commit("tenderdetail",data.data.ResultData.List[0])
          _this.gettenderinfo()
        }
        return
      });
    }

    if(this.$route.query.TenderCouponId){
      this.TenderCouponId=this.$route.query.TenderCouponId
      _this.couponcheck=true
    }
    this.$http(this.$api.xjhquerytenderdetail({"Id":this.state.tenderdetail.Id}))
    .then((data) => {
      _this.detailinfo=data.data.ResultData;
      _this.$store.state.tender.porjcet=data.data.ResultData.TenderProfile

     });
    this.$http(this.$api.gettenderquerytenderpayer({"id":this.state.tenderdetail.Id,}))
    .then((data) => {
      _this.total =data.data.ResultData.Total

     });
        if(typeof this.state.user=="undefined"){
        return
      }
      if(this.$route.query.money>0&&this.$route.query.GoodsStatus!=6){
        _this.tenrdermoney=parseFloat(this.$route.query.money)
        this.inputmoney()
      }
    if(this.$route.query.GoodsStatus){
      if(this.$route.query.GoodsStatus==1){
        if(this.$route.query.money!=0){
         _this.tenrdermoney=parseFloat(this.$route.query.money)
        let fee=(parseFloat((this.state.tenderdetail.TenderUseDay).split('天')[0])/360)*(parseFloat(this.tenrdermoney)+parseFloat(this.$route.query.CouponMoney))*parseFloat(this.state.tenderdetail.TenderFee)
        this.fee=fee;
        }
        this.CouponMoney=this.$route.query.CouponMoney
        this.coupoonName="元投资券";
      }
      if(this.$route.query.GoodsStatus==6||this.$route.query.GoodsStatus==0){
        if(this.$route.query.money!=0){
         _this.tenrdermoney=parseFloat(this.$route.query.money)
        let fee=(parseFloat((this.state.tenderdetail.TenderUseDay).split('天')[0])/360)*(parseFloat(this.$route.query.CouponMoney))*parseFloat(this.state.tenderdetail.TenderFee)
        console.log(this.$route.query.CouponMoney)
        this.fee=fee;
        }
        this.CouponMoney=this.$route.query.CouponMoney
        this.coupoonName="体验券";
        this.disabled = true
      }
      if(this.$route.query.GoodsStatus==3){
        if(this.$route.query.money!=0){
        _this.tenrdermoney=parseFloat(this.$route.query.money)
        let fee=(parseFloat((this.state.tenderdetail.TenderUseDay).split('天')[0])/360)*parseFloat(this.tenrdermoney)*(parseFloat(this.state.tenderdetail.TenderFee)+parseFloat(this.$route.query.CouponMoney))
        this.fee=fee;
      }
        this.CouponMoney=this.$route.query.CouponMoney*100+"%"
        this.coupoonName="加息券";
      }
      if(this.$route.query.GoodsStatus==4){
        if(this.$route.query.money!=0){
        this.tenrdermoney=parseFloat(this.$route.query.money)
        let fee=(parseFloat((this.state.tenderdetail.TenderUseDay).split('天')[0])/360)*parseFloat(this.tenrdermoney)*parseFloat(this.state.tenderdetail.TenderFee)
        this.fee=fee*2;
       }
        this.CouponMoney="双倍"
        this.coupoonName="收益券";
      }

    }else{
        // this.$http(this.$api.myquerytendercouponlist({"CouponStatus":1,"IsFalg":false,"Page":this.page,"PageSize":100,"Id":this.state.tenderdetail.Id,"Money":this.state.tenderdetail.MinPrepayMoney}))
        this.$http(this.$api.GetTenderCouponList({"id":this.state.tenderdetail.Id,"money":this.state.tenderdetail.MinPrepayMoney}))
        .then((data) => {
          console.log(data)
            if(data.data.ResultData.List>0){
              for(var i=0;i<data.data.ResultData.List.length;i++){
                if(data.data.ResultData.List[i].GoodsStatus==1||data.data.ResultData.List[i].GoodsStatus==3||data.data.ResultData.List[i].GoodsStatus==4||data.data.ResultData.List[i].GoodsStatus==0||data.data.ResultData.List[i].GoodsStatus==6){
                  _this.couponcheck=true
                }else{
                  _this.couponcheck=false
                }
              }
            }else{
              _this.couponcheck=false
            }
         });
    }

  },
  components:{
    tender,
    tendersub,
    dialogd
  }
}
</script>
