<template>
  <div id="frame">
    <div class="link_head">
      <h1>
          {{title}}
       </h1>
    </div>
    <div class="slideWarp">
      <swiper :options="swiperOption">
        <swiper-slide v-for="slide in bannerList" :key="bannerList[slide]">
        <router-link :to="'/activity?title='+slide.Title+'&link='+slide.Link" v-if="!isWeiXin">
          <img :src="slide.Url" alt="">
          </router-link>
          <a :href="slide.Link" v-else>
            <img :src="slide.Url" alt="">
          </a>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
    <div class="xjh">

      <div class="box" v-if="tiyanTender.isShow">
          <a href="javascript:">
            <h3>
            <span class="title new_title">新手体验标</span>
            <span class="icon new_icon">
              <i class="subcoupon">体验券</i>
          </span>
            </h3>
            <div class="oldProfit" style="overflow:hidden;">
              <p class="numberSizi">{{tiyanTender.tender.TenderFee*100}}%</p>
              <p class="xjhtext xjhtextgray">预期年化收益</p>
            <div class="fixe">
            <div class="fixerow" style="border-right: 0.025rem solid #ccc;">
              <!-- <p class="row1text newtext">送体验金<span><strong>1688888</strong>元</span></p> -->
              <p class="row1text newtext">百万体验金抽奖</p>
            </div>
            <div class="fixerow">
              <p class="row1text newtext">投资期限<span><strong>{{tiyanTender.tender.TenderUseDay.split('天')[0]}}</strong>天</span></p>
            </div>
            </div>
            <div class="fixe newtiyanbiaobtn">
            <div class="fixerow2"><a href="javascript:" class="" @click="tiyan()"><p class="row2text">立即投资</p></a></div>
            </div>
            </div>
          </a>
      </div>

      <div class="box" v-for="(item,index) in tenderlist" @click="tenderdetail(index)" :class="{tenderOver:item.TenderPayStatus==3}">
      <a href="javascript:">
        <h3>
        <span class="title">{{item.TenderName}}</span>
<!--           <span class="icon" v-if="item.ActiveType==4">
              <i class="subcoupon">新手专享</i>
          </span> -->
          <span class="icon" v-if="item.TenderActiveType==4">
             <!--  <i class="subcoupon">双</i> -->
              <i class="subcoupon">投</i>
              <i class="subcoupon">加</i>
          </span>
          <span class="icon" v-if="item.TenderActiveType==0">
              <i class="subcoupon">加</i>
              <i class="subcoupon">投</i>
          </span>
          <span class="icon" v-if="item.TenderActiveType==1">
              <i class="subcoupon">加</i>
          </span>
          <span class="icon" v-if="item.TenderActiveType==2">
              <i class="subcoupon">投</i>
          </span>
          <!-- <span class="icon" v-if="item.TenderActiveType==3">
              <i class="subcoupon">双</i>
          </span> -->
        </h3>
          <div class="intenderlistbox">
            <div class="flexone">
            <p><span class="red size"><strong>{{String((item.TenderFee*100).toFixed(1)).split('.')[0]}}</strong>.{{String((item.TenderFee*100).toFixed(1)).split('.')[1]}}%</span></p>
              <!-- <p v-if="item.ActiveType!=4"><span class="red size"><strong>{{String((item.TenderFee*100).toFixed(1)).split('.')[0]}}</strong>.{{String((item.TenderFee*100).toFixed(1)).split('.')[1]}}%</span></p>
              <p v-else><span class="red size"><strong>{{String((item.TenderFee*100-2).toFixed(1)).split('.')[0]}}</strong>.{{String((item.TenderFee*100).toFixed(1)).split('.')[1]}}%+2%</span></p> -->
              <p>预期年化</p>
            </div>
            <div class="flextow">
              <p><span class="red"><strong>{{(item.TenderUseDay).split('天')[0]}}</strong>天</span></p>
              <p>投资期限</p>
            </div>
            <div class="flexthree">
              <div class="jdt">

                <div class="jdt_box">
                  <div class="jdtmian" :style="{width:item.PrepayMoney*100/item.Money+'%'}"></div>
                </div>
                <div class="jdttext">{{(item.PrepayMoney*100/item.Money).toFixed(1)}}%</div>
              </div>
              <p>剩余{{item.Money-item.PrepayMoney}}元/{{(item.Money/10000).toFixed(1)}}万</p>
            </div>
            <div class="typeicon" v-if="item.TenderPayStatus==3"></div>
          </div>
          </a>
      </div>

    </div>
  <globlenav></globlenav>
</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import globlenav from '../components/nav';
import ls from '../store/lStorage.js'
export default {
  name: 'home',
  data () {
    return {
      title: '恒瑞理财',
      swiperOption: {
        autoplay: 3500,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true,
        loop: true
      },
      bannerList:"",
      tenderlist:'',
      tiyanTender:{},
      isWeiXin:false

    }
  },
  methods:{
    tenderdetail(index){
      ls.setItem("tenderdetail",this.tenderlist[index]);
      this.$store.commit("tenderdetail",this.tenderlist[index])
      this.$router.push('/tenderDetail')
    },
    tiyan(){
      ls.setItem("tenderdetail",this.tiyanTender.tender);
      this.$store.commit("tenderdetail",this.tiyanTender.tender)
      let query = this.$route.query
      if(query.TG){
        this.$router.push("/tenderDetail?TenderCouponId="+this.tiyanTender.coupon.TenderCouponId+"&money="+this.tiyanTender.coupon.Money+"&CouponMoney="+this.tiyanTender.coupon.Money+"&GoodsStatus="+this.tiyanTender.coupon.GoodsStatus+"&TG=true")
      }else{
        this.$router.push("/tenderDetail?TenderCouponId="+this.tiyanTender.coupon.TenderCouponId+"&money="+this.tiyanTender.coupon.Money+"&CouponMoney="+this.tiyanTender.coupon.Money+"&GoodsStatus="+this.tiyanTender.coupon.GoodsStatus)
      }

    }
  },
  created:function(){
      let _this = this
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
       this.isWeiXin = true;
      }else{
        this.isWeiXin = false;
      }

      this.$http(this.$api.getbanner({}))
          .then((data) => {
            if(data.data.ResultData.List!=""){
              _this.bannerList=data.data.ResultData.List
              console.log(data.data.ResultData.List)
            }
      });

      this.$http(this.$api.gettenderlist({"Page":1,"PageSize":10}))
      .then((data) => {
        if(data.data.ResultData.List!=""){
          _this.tenderlist=data.data.ResultData.List
        }
        console.log(data.data.ResultData.List)
      });
      this.$http(this.$api.QueryActiveTenderDetail({}))
          .then((data) => {
            _this.tiyanTender = data.data.ResultData
      });
  },
  components:{
    swiper,
    swiperSlide,
    globlenav
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->

