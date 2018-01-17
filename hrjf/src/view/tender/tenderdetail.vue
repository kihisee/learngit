<template>
  <div class="container">
  <heads :title="title"></heads>
    <div class="tenderdetail_box">
      <div class="box">
        <div class="left_semicircle"></div>
        <div class="right_semicircle"></div>
        <div class="couponrow clear">
          <p v-if="tenderdetail.plan_type==1"><i>加息券</i><i>投资券</i></p>
        </div>
        <div class="nhl">
              <div v-if="tenderdetail.maxfee==0"><span><strong>{{(tenderdetail.minfee*100).toFixed(1).split('.')[0]}}</strong>.{{(tenderdetail.minfee*100).toFixed(1).split('.')[1]}}%</span></div>
             <div v-else><span><strong>{{(tenderdetail.minfee*100).toFixed(1).split('.')[0]}}</strong>.{{(tenderdetail.minfee*100).toFixed(1).split('.')[1]}}%~<strong>{{(tenderdetail.maxfee*100).toFixed(1).split('.')[0]}}</strong>.{{(tenderdetail.maxfee*100).toFixed(1).split('.')[1]}}%</span></div>
             <p>预计年化利率</p>
        </div>
        <div class="money_info">
          <div class="flex"><span>剩余可投(元)</span><p><strong>{{tenderdetail.remain_possable_money}}</strong></p></div>
          <div class="flex"><span>起投金额(元)</span><p><strong>100</strong><span class="gray">元起投</span></p></div>
        </div>
        <div class="balancemoney clear">
          <div class="left">可用金额</div>
          <div class="right"><span><strong>123120.00</strong>元</span><router-link :to="'/'" class="bg_left_right">充值</router-link></div>
        </div>
        <div class="coupon_box clear">
          <div class="left">优惠</div>
          <div class="right" v-if="couponTotal>0">
            <router-link :to="'/'">
              <span>有<strong>{{couponTotal}}</strong>张优惠券可用</span><i></i><i></i><i></i>
            </router-link>
          </div>
          <div class="right" v-else><p><span>无可用优惠券</span></p></div>
        </div>

      </div>
      <div class="box">
        <div class="setmoney clear">
          <div class="left">购买金额</div>
          <div class="right"><input placeholder="请输入购买金额" type="tel" v-on:input ="inputmoney" v-model="tenrdermoney"></div>
        </div>

        <div class="gains">
          <span><strong>{{(fee).toFixed(2).split(".")[0]}}</strong>.{{(fee).toFixed(2).split(".")[1]}}</span>
          <p>预计收益</p>
          <canvas id="Canvas" ref="canvas"></canvas>
        </div>
      </div>

      <div class="rule"><input type="checkbox" v-model="rule"><span>查阅并同意</span><router-link :to="'/'">《计划投资服务协议》</router-link></div>
      <div class="box">
        <div class="tenderinfo"><router-link :to="'/'">查看更多项目信息</router-link></div>
        <div class="sunmitBtn"><a herf="javascript:" @click="sunmit()">立即投资</a></div>
      </div>
    </div>
</div>
</template>

<script>
import heads from '../../components/head';
export default {
  data () {
    return {
      tenderdetail:{
        maxfee:0,
        minfee:0,
        plan_name:'',
        plan_type:null,
        plan_use_day:0,
        remain_possable_money:0
      },
      title:'',
      tenrdermoney:'',
      fee:0,
      canvasmark:0,
      state:this.$store.state,
      couponTotal:0,
      rule:true,
    }
  },
  mounted : function() {
    this.addcanvas(0)
  },
  methods:{
    sunmit(){

    },
    inputmoney(){//绑定购买金额
      let _this = this
      let canvasnumbel =  this.tenrdermoney/20
      this.canvasmark = canvasnumbel;
      this.canvasRulers(canvasnumbel);
      if(this.$route.query.plan){
        this.getcoupon(_this.$route.query.plan)
      }
    },
    income(){ //计算收益
      let _this = this
      if(this.tenrdermoney==""){
        this.fee=0
        return
      }
     if(this.$route.query.GoodsStatus){
      if(this.$route.query.GoodsStatus==1){ //投资券
         _this.tenrdermoney=parseFloat(this.tenrdermoney)
        let fee=(parseFloat(this.tenderdetail.plan_use_day)/360)*(parseFloat(this.tenrdermoney)+parseFloat(this.$route.query.CouponMoney))*parseFloat(this.tenderdetail.minfee)
        this.fee=fee;
      }
      if(this.$route.query.GoodsStatus==3){ //加息券
        let fee=(parseFloat(this.tenderdetail.plan_use_day)/360)*parseFloat(this.tenrdermoney)*(parseFloat(this.tenderdetail.minfee)+parseFloat(this.$route.query.CouponMoney))
        this.fee=fee;
      }
      if(this.$route.query.GoodsStatus==4){ //双倍券
        let fee=(parseFloat(this.tenderdetail.plan_use_day)/360)*parseFloat(this.tenrdermoney)*parseFloat(this.tenderdetail.minfee)
        this.fee=fee*2;
      }

    }else{
       let fee=(parseFloat(this.tenderdetail.plan_use_day)/360)*parseFloat(this.tenrdermoney)*parseFloat(this.tenderdetail.minfee)
        this.fee=fee;
    }
    },
    getcoupon(day){// 获取可用优惠券
      let _this = this
      let money = this.tenrdermoney
      if(money=="") money = 0;
      if(typeof this.state.user=="undefined"){
        return
      }
      this.$http(this.$api.GetPlanCouponList({"use_day":day,"Money":money}))
      .then((data) => {
        console.log(data.data.ResultData)
        _this.couponTotal = data.data.ResultData.Total;
      });
    },
    canvasRulers(data){// 绘制标尺
      let _canvas = document.getElementById("Canvas");
      let _ctx = _canvas.getContext("2d");
      let canvasWidth = this.$refs.canvas.clientWidth;
      let canvasHeight = this.$refs.canvas.clientHeight;
      _canvas.width = canvasWidth;
      _canvas.height = canvasHeight;
      let canvas=document.createElement("canvas"); // 创建离屏绘图
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      let ctx=canvas.getContext("2d");
      let mohu = 0.5 //锐化canvas线条
      let cmoney = 20 //设置移动1像素等于20金额
      let cout = 50 //每50个像素绘制一个长刻度
      let width = canvasWidth/2 //绘图初始化
      for(let i=0;i<width+data;i+=5){//每5个像素绘制一个刻度
        if(i%cout==0){
          ctx.beginPath();
          ctx.strokeStyle="#ffbb2a";
          ctx.moveTo(width-data+i+mohu,canvasHeight/2+15+mohu);
          ctx.lineTo(width-data+i+mohu,canvasHeight+mohu);
          ctx.stroke();
          ctx.fillStyle="#ffbb2a";
          ctx.textAlign="center";
          ctx.fillText(cmoney*i,width-data+i+mohu,canvasHeight/2+5+mohu);
        }else{
          ctx.beginPath();
          ctx.moveTo(width-data+i+mohu,canvasHeight/2+23+mohu);
          ctx.lineTo(width-data+i+mohu,canvasHeight+mohu);
          ctx.stroke();
        }
      }
      ctx.beginPath();
      ctx.strokeStyle="#fe752f";
      ctx.moveTo(canvasWidth/2+mohu,canvasHeight/2+mohu);
      ctx.lineTo(canvasWidth/2+mohu,canvasHeight+mohu);
      ctx.stroke();
      _ctx.drawImage(canvas,0,0); //内存绘图完成后导入canvas；
      if(data<=0){
        this.tenrdermoney = '';
      }else{
        this.tenrdermoney = data*cmoney;
      }
      this.income();
    },
    addcanvas(data){ // 绑定标尺事件
      let canvas=document.getElementById("Canvas");
      let startX, moveEndX, X;
      let _this = this;
      let startFunc= function(e){
        startX = e.touches[0].pageX ;
      }
      let moveFunc = function (e){
        moveEndX = e.touches[0].pageX;
        if(moveEndX<0){ //改变touch方向
          moveEndX = Math.abs(moveEndX)
        }else{
          moveEndX = -moveEndX
        }
        X = moveEndX + startX;
        if(_this.canvasmark+X<=0){
          _this.canvasmark=0
          _this.canvasRulers(_this.canvasmark);
        }else{
          _this.canvasRulers(X+_this.canvasmark);
        }
        _this.canvasmark += X
      }
      let endFunc = function(){
        _this.canvasmark += X
        if(_this.$route.query.plan){
        _this.getcoupon(_this.$route.query.plan)
        }
      }
      this.canvasRulers(data);

      canvas.addEventListener('touchstart', startFunc, false);
      canvas.addEventListener('touchmove', moveFunc, false);
      canvas.addEventListener('touchend', endFunc, false);
    }
  },
  created:function(){
      let _this = this
      let q = this.$route.query
      this.$http(this.$api.getQueryPlanList({"Page":1,"PageSize":10})) // 匹配计划标的
      .then((data) => {
        let detail = data.data.ResultData.List
        detail.forEach(function(v){
          if(v.plan_use_day==q.plan){
            _this.tenderdetail = v
          }
        })
        console.log( _this.tenderdetail)
        _this.title = _this.tenderdetail.plan_use_day+"天期限-计划投资"
      });
      if(typeof this.state.user=="undefined"){
        return
      }
      this.getcoupon(q.plan)
  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>
.tenderdetail_box{
  padding:0 rem(10);
  box-sizing:border-box;
}
.box {
 margin-top:0.25rem;
 background:$white;
 padding:0.35rem 0.4rem;
 box-sizing:border-box;
 position:relative;
 .left_semicircle{
  position:absolute;
  width:rem(25);
  height:rem(50);
  border-radius:0 rem(25) rem(25) 0;
  background:#f3f3f3;
  left:0;
  top:rem(60);
 }
  .right_semicircle{
  position:absolute;
  width:rem(25);
  height:rem(50);
  border-radius:rem(25) 0 0 rem(25);
  background:#f3f3f3;
  right:0;
  top:rem(60);
 }
 .couponrow{
    p{
    color:$gray;
    width:auto;
    float:right;
    i{
      width:rem(60);
      display:inline-block;
      font-size:rem(12);
      text-align:center;
      margin-right:0.25rem;
      font-style:normal;
      margin-top:rem(5);
      color:$orange;
      @include bg("/static/img/tender/coupon_bg.png")
    }
  }
 }
.nhl{
    text-align:center;
    margin:auto;
    margin-top:0.3rem;
    width:50%;
    span{
      @include sizeColor(0.6rem,$orange)
      strong{font-size:1.2rem}
    }
    p{color:$gray;}
  }
 .title{
   @include sizeColor(0.45rem,$black);
   border-bottom:1px $gray dashed;
   padding-bottom:0.25rem
 }
 .clear{
  .nhl{
    margin-top:0.25rem;
    text-align:center;
    width:40%;
    span{
      @include sizeColor(0.4rem,$orange)
      strong{font-size:0.8rem}
    }
    p{color:$gray;}
  }
 }
 .money_info{
  display: flex;
  margin-top:0.5rem;
  text-align:center;
  div:nth-child(1){
    border-right:1px $linecolor solid;
  }
  .flex{
    color:$black;
    p{
      margin-top:0.075rem;
      span{
        color:$gray;
      }
    }
    strong{
      @include sizeColor(0.4rem,$orange)
    }
  }
 }
 .balancemoney{
  border-bottom:1px $linecolor solid;
  border-top:1px $linecolor solid;
  padding:rem(10) 0;
  box-sizing:border-box;
  margin-top:rem(15);
  color:$black;
  div{
    width:auto;
    line-height:rem(30);
    span{
      color:$gray;
      strong{
        color:$orange;
        font-size:rem(16);
        padding-right:rem(10);
      }
    }
    a{
      width:rem(60);
      height:rem(30);
      text-align:center;
      line-height:rem(30);
      color:$white;
      display:inline-block;
      border-radius:rem(5);
      margin-left:rem(10);
    }
  }
 }
 .coupon_box{
  padding-top:rem(10);
  color:$black;
  box-sizing:border-box;
  div{
    width:auto;
    line-height:rem(30);
    span{
      color:$gray;
    }
    a{
      color:$gray;
      i{
        font-style:normal;
        display:inline-block;
        background:$gray;
        border-radius:50%;
        width:rem(3.5);
        height:rem(3.5);
        margin-left:rem(5);
        vertical-align:middle;
      }
      strong{
        color:$orange;
        padding:0 rem(5);
        font-size:rem(16);
      }
    }

  }
 }
 .setmoney{
  border-bottom:1px solid $linecolor ;
  padding-bottom:rem(10);
  div{
    width:auto;
  }
  .right{
    input::-webkit-input-placeholder{
      @include sizeColor(0.4rem,$gray)
      font-weight:normal;
    }
    input{
      border:none;
      font-size:rem(18);
      text-align:right;
      color:$orange;
      font-weight:bold;
    }
  }
 }
 .gains{
  text-align:center;
  margin-top:rem(10);
  span{
    color:$orange;
    font-size:rem(22);
    strong{
      font-size:0.7rem;
    }
  }
  p{
    color:$gray;
  }
 }
 .tenderinfo{
  text-align:center;
  a{
    color:$blue;
  }
 }
 .sunmitBtn{
    width:100%;
    height:rem(40);
    margin-top:rem(10);
    a{
      display:block;
      background:$yellow;
      color:$white;
      text-align:center;
      border-radius:rem(5);
      height:rem(40);
      line-height:rem(40);
      font-size:rem(18);
    }
 }
}
#Canvas,#iscroll{
  width:100%;
  border-bottom:1px solid $yellow;
  box-sizing:border-box;
  height:rem(60);
}
.rule{
  margin:rem(10);
  span{
    color:$gray;
  }
  a{
    color:$blue;
  }
}
</style>

