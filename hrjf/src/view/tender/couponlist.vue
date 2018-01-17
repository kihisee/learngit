<template>
<div id="frame">
    <div id="con">
        <div class="link_head">
            <h1>
                <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
                {{title}}
            </h1>
        </div>

        <div class="couponbox">
            <ul>
                <li v-for="(item,index) in datalist" :class="[item.classname,{'state':classIndex==0}]" @click="addClassFun(index)">
                    <div class="coupon_main_box" v-if="item.GoodsStatus==3">
                      <div class="bignumble"><span>{{(item.Money*100).toFixed(1)}}</span>%</div>
                      <div class="list">
                        <dl>
                          <dd><i></i>{{item.CouponCondition}}元起</dd>
                          <dd v-if="item.MinDays!=0"><i></i>{{item.MinDays/30}}个月的固定理财</dd>
                          <dd v-else><i></i>不限投资期限 </dd>
                          <dd><i></i>{{item.ExpDate.substr(0,10)}} 过期</dd>
                          <dd><i></i>{{item.Source}}</dd>
                        </dl>
                      </div>
                    </div>
<!--                     <div class="coupon_main_box" v-if="item.GoodsStatus==2||item.GoodsStatus==5">
                      <div class="bignumble"><span>{{item.Money*100}}</span>元</div>
                      <div class="list">
                        <dl>
                          <dd><i></i>{{item.CreateTime.substr(0,10)}}--</dd>
                          <dd><i></i>{{item.Source}}</dd>
                        </dl>
                        <div class="btn">立即领取</div>
                      </div>
                    </div> -->
                    <div class="coupon_main_box" v-if="item.GoodsStatus==1">
                      <div class="bignumble"><span>{{item.Money}}</span>元</div>
                      <div class="list">
                        <dl>
                          <dd><i></i>{{item.CouponCondition}}元起</dd>
                          <dd v-if="item.MinDays!=0"><i></i>{{item.MinDays/30}}个月的固定理财</dd>
                          <dd v-else><i></i>不限投资期限 </dd>
                          <dd><i></i>{{item.ExpDate.substr(0,10)}} 过期</dd>
                          <dd><i></i>{{item.Source}}</dd>
                        </dl>
                      </div>
                    </div>
                    <div class="coupon_main_box" v-if="item.GoodsStatus==4">
                      <div class="bignumble"><span>2</span>倍</div>
                      <div class="list">
                        <dl>
                          <dd><i></i>限最高投资金额{{item.CouponCondition}}</dd>
                          <dd><i></i>不限制投资期限</dd>
                          <dd><i></i>{{item.ExpDate.substr(0,10)}} 过期</dd>
                          <dd><i></i>{{item.Source}}</dd>
                        </dl>
                      </div>
                    </div>
                    <div class="text">说明：{{item.Explain}}<input type="radio" :checked="item.ischeckd" style="float:right;margin-right:0.5rem;margin-top:0.125rem"></div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>



export default {
  data () {
    return {
      title:"我的优惠券",
      classIndex:0,
      tradetype:-1,
      datalist:[],
      page:1,
      state:this.$store.state,
      classlist:-1,
    }
  },
  methods:{
    tabClick(type){
        if(type==0){
            this.tradetype=-1
        }else{
            this.tradetype=type
        }
        this.classIndex=type;
        this.init();
        this.getdata(type);
    },
    addClassFun(index){
        let TenderCouponId = this.datalist[index].TenderCouponId
        let CouponName = this.datalist[index].CouponName.replace(/%/g, "")
        let GoodsStatus = this.datalist[index].GoodsStatus
        let Money = this.datalist[index].Money
        let urlmoney = 0
        if(this.$route.query.money&&this.$route.query.money!=""){
          urlmoney=this.$route.query.money
        }

        if(this.datalist[index].ischeckd){
            this.$router.push("/tenderDetail?money="+urlmoney)
          }else{
            this.$router.push("/tenderDetail?TenderCouponId="+TenderCouponId+"&money="+urlmoney+"&CouponMoney="+Money+"&GoodsStatus="+GoodsStatus)
          }
    },
    init(){
        this.page=1;
        this.datalist=[];
        this.classlist=-1;
    },
    // scroll(e){
    //      let _this=this;
    //       if(document.body.scrollHeight - window.screen.height*dpr - document.body.scrollTop <= 0) {
    //        this.page++
    //        this.getdata()

    //       }
    //   },
    getdata(){
        let _this=this;
        console.log(this.state.tenderdetail)
        let money
        if(this.$route.query.money!=""){
          money = this.$route.query.money
        }else{
          money = this.state.tenderdetail.MinPrepayMoney
        }
       this.$http(this.$api.GetTenderCouponList({"id":this.state.tenderdetail.Id,"Money":money}))
      .then((data) => {
        if(data.data.ResultData.List.length!=0){
            for(var i=0;i<data.data.ResultData.List.length;i++){
              if(data.data.ResultData.List[i].GoodsStatus==3){
                if(_this.classIndex==0){
                  data.data.ResultData.List[i].classname="jx_state"
                }else{
                  data.data.ResultData.List[i].classname="jx_out"
                }
              }
              if(data.data.ResultData.List[i].GoodsStatus==2||data.data.ResultData.List[i].GoodsStatus==5){
                if(_this.classIndex==0){
                  data.data.ResultData.List[i].classname="xj_state"
                }else{
                  data.data.ResultData.List[i].classname="xj_out"
                }
              }
              if(data.data.ResultData.List[i].GoodsStatus==1){
                if(_this.classIndex==0){
                  data.data.ResultData.List[i].classname="tz_state"
                }else{
                  data.data.ResultData.List[i].classname="tz_out"
                }
              }
              if(data.data.ResultData.List[i].GoodsStatus==4){
                if(_this.classIndex==0){
                  data.data.ResultData.List[i].classname="sb_state"
                }else{
                  data.data.ResultData.List[i].classname="sb_out"
                }
              }
              if(this.$route.query.TenderCouponId==data.data.ResultData.List[i].TenderCouponId){
                    data.data.ResultData.List[i].ischeckd=true
                  }else{
                    data.data.ResultData.List[i].ischeckd=false
                  }
              if(data.data.ResultData.List[i].GoodsStatus==1||data.data.ResultData.List[i].GoodsStatus==3||data.data.ResultData.List[i].GoodsStatus==4){
                _this.datalist.push(data.data.ResultData.List[i])
              }

             }
             console.log(_this.datalist)
        }
      });
    }
  },
  created :function(){
    this.getdata()
    // window.addEventListener('scroll', this.scroll);
  },
  beforeDestory() {
    // window.removeEventListener('scroll', this.scroll);
  },
  components:{
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
