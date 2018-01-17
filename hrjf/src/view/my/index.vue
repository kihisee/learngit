<template>
<div id="frame">
            <div id="con">
<div class="link_head">
    <h1>{{title}}</h1>
</div>

<div class="per_top">
    <div class="per_money">
        <p class="money_top">总资产(元)</p>
        <p class="p_money">{{basset.TotalMoney}}</p>
        <!-- <a :href="hxhref" class="hxbtn">{{hxbtn}}</a> -->
    </div>
    <ul class="per_topb">
        <li class="tips_fir">
            <p>可用余额(元)</p>
            <span>{{basset.Balance}}</span>
        </li>
        <li>
            <p>今日收益(元)</p>
            <span>{{basset.NewMoney}}</span>
        </li>
        <li>
            <p>累计收益(元)</p>
            <span>{{basset.AccumulativeProfit}}</span>
        </li>
    </ul>
</div>
<div class="chongz">
    <a href="javascript:"> <p class="chongzhi accz" @click="checkbindbank('/charge')">充值</p></a>
    <a href="javascript:"><p class="tixian"  @click="checkbindbank('/fetchmoney')">提现</p></a>
</div>

<div class="accont_con">
    <ul>
        <li>
            <router-link :to="'/xjh'"  class="my_hrb2">
                <i></i>
                恒瑞宝2号
                <span class="fir_span"><span class="yel_span">{{basset.Hrb2TotalMoney}}</span>元</span>
            </router-link>
        </li>
        <li>
        <router-link :to="'/mytenderlist'"  class="my_buss">
                <i></i>
                我的理财
                <span class="fir_span"><span class="yel_span">{{basset.TenderTotalMoney}}</span>元</span>
            </router-link>
        </li>
        <li>
        <router-link :to="'/couponlist'"  class="my_youhui">
                <i></i>
                我的优惠券
                <span class="fir_span"><span class="yel_span">{{basset.CouponCount}}</span>张</span>
            </router-link>
        </li>
    </ul>

    <ul>
            <li>
        <router-link :to="'/autotender'"  class="my_autotender">

                <i></i>
                自动投标
        </router-link>
        </li>
        </ul>
        <ul>
        <li>
        <router-link :to="'/tradelist'"  class="my_jiaoyi">

                <i></i>
                交易记录
        </router-link>
        </li>
         <li>
         <router-link :to="'/mybank'"  class="my_bank">

                <i></i>
                我的银行卡
          </router-link>
        </li>
<!--         <li>
            <router-link :to="'/tradelist'"  class="my_chong">
                <i></i>
                充值记录
            </router-link>
        </li>
        <li>
        <router-link :to="'/tradelist'"  class="my_tixian">
                <i></i>
                提现记录
            </router-link>
        </li> -->
    </ul>

    <ul>
        <li>
        <router-link :to="'/msglist'"  class="my_xxzhong">
                <i></i>
                消息中心
                <span class="fir_spand">{{basset.MessageCount}}</span>
            </router-link>
        </li>

        <li>
        <router-link :to="'/invite'"  class="my_invite">
                <i></i>
                邀请奖励
            </router-link>
        </li>
    </ul>
    <ul>
        <li>
            <!-- <a href="http://wpa.qq.com/msgrd?v=3&uin=383871&site=qq&menu=yes" class="my_kefu"><i></i>在线客服</a> -->
            <a href="http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAzMzI1Nl8yMDE5NzhfNDAwODg1MDc0Nl8yXw\" class="my_kefu"><i></i>在线客服</a>
        </li>
    </ul>
    <ul>
<!--         <li>
<router-link :to="'/inviteqrcode'"  class="my_xxzhong">
                <i></i>
                我的二维码
            </router-link>
        </li> -->
        <li>
        <router-link :to="'/mysettings'"  class="my_grshe">
                <i></i>
                个人设置
            </router-link>
        </li>

         <li>
        <a @click="clickrisk()"  class="my_dcwj">
                <i></i>
                风险评估
            </a>
        </li>
    </ul>
</div>
            </div>
<globlenav></globlenav>

<dialogdmy @getfin="getfin" v-if="diain"></dialogdmy>
<div class="bgblack" style="background:#000;opacity:0.3;width:100%;height:100%;position:;top:0px;left:0px;z-index:10;position:fixed;" v-show="getfins"></div>

</div>


</template>

<script>

import globlenav from '../../components/nav'

export default {
  data () {
    return {
      title:"个人中心",
      state:this.$store.state,
      hxhref:"/ipsreg",
      hxbtn:"环迅开户",
      basset:{},
      bindyibao:false,
       getfins:false,
      diain:false
    }
  },
  methods:{
    checkbindbank(src){ //
        let _this=this

      this.$http(this.$api.getquerytenderbankcardlist({}))
      .then((data) => {
        if(data.data.ResultData.List.length==0){
            _this.$msg.alert("请先绑定银行卡",function(){
                _this.$router.push('/addbank')
            })
        }else{
              let bankdata = data.data.ResultData.List
                    bankdata.forEach(function(value) {
                        if(value.BankCardType==2){
                            _this.bindyibao=true
                        }
                    });
                if(_this.bindyibao){
                    if(src=='/fetchmoney'){
                        this.$http(this.$api.isPayPassword({}))
                        .then((data) => {
                            if(data.data.ResultData=="false"){
                                 _this.$msg.alert("您还没设置交易密码哦！",function(){
                                    _this.$router.push('/setpaypsw')
                                    return
                                })
                            }else{
                                _this.$router.push(src)
                            }
                        });
                    }else{
                        _this.$router.push(src)
                    }

                }else{
                    _this.$msg.alert("支付系统升级请重新绑定银行卡！",function(){
                        _this.$router.push('/addbank')
                    })
                }


        }
      });
    },

     getfin(msg){
      this.getfins=msg
      this.diain=msg
    },

    clickrisk(){
        let _this=this
        this.$http(this.$api.riskEvaluate({"TokenUser":this.state.user.Token}))
      .then((data) => {
            console.log(data)
            if(data.data.ResultData.preference_type == null ||data.data.ResultData.preference_type == 0  ){
                //_this.$router.push('/risk')
                _this.getfins=true
                _this.diain=true
            }else{
              _this.$router.push('/riskfinal')
            }
      })
    }
  },
  created :function(){
    let _this=this
    // if(typeof this.state.basset=="undefined"){
    //     this.$store.dispatch('basset')
    //       .then(() => {
    //           this.basset=this.state.basset
    //       })
    // }else{
    //   this.basset=this.state.basset
    // }
    this.$store.dispatch('basset')
          .then(() => {
              this.basset=this.state.basset
    })
    console.log(this.state.user)
    console.log(this.state.basset)
    /* 检测环迅是否有开户接口
      this.$http(this.$api.IsRegister({}))
        .then(function(data){
          if(!data.data.ResultData.IsRegister){
            _this.hxhref="/ipsreg"
          }
       });
       */
  },
  components:{
    globlenav,
  }
}
</script>