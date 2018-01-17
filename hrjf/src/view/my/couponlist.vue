<template>
<div id="frame">
    <div id="con">
        <div class="link_head">
            <h1>
                <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
                {{title}}
            </h1>
        </div>
        <div class="tradelistnav">
            <ul>
                <li :class="{active:classIndex == 0}" @click="tabClick(0)"><span>未使用</span></li>
                <li :class="{active:classIndex == 1}" @click="tabClick(1)"><span>已使用</span></li>
                <li :class="{active:classIndex == 2}" @click="tabClick(2)"><span>已过期</span></li>
            </ul>
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
                    <div class="coupon_main_box" v-if="item.GoodsStatus==2||item.GoodsStatus==5">
                      <div class="bignumble" v-if="item.GoodsStatus==2"><span>{{item.Money.toFixed(2)}}</span>元</div>
                      <div class="bignumble" v-if="item.GoodsStatus==5"><span>{{item.Money.toFixed(2)}}</span>元</div>
                      <div class="list">
                        <dl>
                          <dd><i></i>{{item.ExpDate.substr(0,10)}} 过期</dd>
                          <dd><i></i>{{item.Source}}</dd>
                        </dl>
                        <div class="btn" @click="getcouponmoney(item.TenderCouponId)">立即领取</div>
                      </div>
                    </div>
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
                    <div class="coupon_main_box" v-if="item.GoodsStatus==6">
                      <div class="bignumble"><span>{{item.Money}}</span>元</div>
                      <div class="list">
                        <dl style="margin-top:1rem">
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

                    <div class="text">说明：{{item.Explain}}</div>
                    <div class="icon_2" v-if="classIndex==1"></div>
                    <div class="icon_3" v-if="classIndex==2"></div>
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
      classlist:-1
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
        this.classlist = index;
    },
    init(){
        this.page=1;
        this.datalist=[];
        this.classlist=-1;
    },
    getcouponmoney(data){
      let _this =this
      if(this.classIndex==0){
        this.$http(this.$api.getuserusecoupon({"TenderCouponId":data}))
        .then((data) => {
          if(data.data.ResultCode==100000){
            _this.$msg.alert("领取成功",function(){
                _this.init()
                _this.getdata()
              })
          }else{
            _this.$msg.alert(data.data.ResultMessage)
          }
        });
      }

    },
    scroll(){
         let _this=this;
          if(document.body.scrollHeight - window.screen.height*dpr - document.body.scrollTop <= 0) {
           this.page++
           this.getdata()

          }
      },
    getdata(){
        let _this=this;
       this.$http(this.$api.myquerytendercouponlist({"CouponStatus":this.classIndex+1,"IsFalg":false,"Page":this.page,"PageSize":10}))
      .then((data) => {
        console.log(data)
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
              if(data.data.ResultData.List[i].GoodsStatus==6){
                if(_this.classIndex==0){
                  data.data.ResultData.List[i].classname="ty_state"
                }else{
                  data.data.ResultData.List[i].classname="ty_out"
                }
              }
                _this.datalist.push(data.data.ResultData.List[i])
             }
             console.log(_this.datalist)
        }
      });
    }
  },
  created :function(){
    this.getdata()
    window.addEventListener('scroll', this.scroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
  },
  components:{
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
