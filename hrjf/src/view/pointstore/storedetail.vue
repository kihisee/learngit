<template>
<div id="frame">
  <div class="link_head">
    <h1>
        <span>
          <a href="javascript:history.go(-1)"><img src="static/img/icon_left.png"></a>
        </span>
        {{title}}
     </h1>
  </div>
  <div class="xjh bottom_no">
    <div class="box">
      <img :src="state.storedetail.Icon_max_url" alt="">
    </div>
    <div class="box s_color">
      <h1><div><span class="h1title">{{state.storedetail.Name}}</span></div></h1>
      <ul class="storedetailsublist">
        <li>所需积分：<span>{{state.storedetail.Need_point}}积分</span> (我的可用积分：{{point}})</li>
        <li v-if="state.storedetail.CouponCondition>0">使用门槛：累计投资固定理财{{state.storedetail.CouponCondition}}元以上</li>
        <li v-else>使用门槛：不限制</li>
        <li>剩余数量：{{state.storedetail.Coupon_Count}}</li>
      </ul>
    </div>
    <div class="box">
      <h1><div><span class="h1title">商品详情</span></div></h1>
      <div class="sotre_conten" v-html="state.storedetail.Remark">
      </div>
    </div>
    <div class="sotre_conten_btn" @click="submitstore()">确认兑换</div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      title: '商品详情',
      state:this.$store.state,
      point:0
    }
  },
  methods:{
    submitstore(){
      let _this=this
      if(typeof this.state.user=="undefined"){
        this.$router.push('/login')
        return
      }
      if(this.state.storedetail.Need_point>this.point){
        this.$msg.alert("您的积分不够兑换！")
        return
      }
      if(_this.state.storedetail.Coupon_Type==24){
          this.$http(this.$api.myAddress({}))
          .then((data) => {
                if(!data.data.ResultData.isTrue){
                  _this.$msg.alert("请填写您的收货地址！",function(){
                    _this.$router.push('/myaddress')
                  })
                }else{
                    this.$msg.confirm("确认兑换",function(){
                    this.$http(this.$api.exchangePointCoupon({"ID":_this.state.storedetail.ID,"PrizeCount":1}))
                    .then((data) => {
                        if(data.data.ResultCode==100000){
                          _this.$msg.alert("兑换成功")
                        }else{
                           _this.$msg.alert(data.data.ResultMessage)
                        }
                      });
                  })
                }
            });
      }else{
        this.$msg.confirm("确认兑换",function(){
          this.$http(this.$api.exchangePointCoupon({"ID":_this.state.storedetail.ID,"PrizeCount":1}))
          .then((data) => {
              if(data.data.ResultCode==100000){
                _this.$msg.alert("兑换成功")
              }else{
                 _this.$msg.alert(data.data.ResultMessage)
              }
            });
        })
      }

    }
  },
  created:function(){
    let _this=this
    if(typeof this.state.user=="undefined"){
        return
      }
      this.$http(this.$api.getPointTopList({}))
    .then((data) => {

      _this.point = data.data.ResultData.Point
      });
  },
  components:{

  }
}
</script>


