<template>
    <div class="container">
    <heads :title="title" bgcolor="#7d00e7"></heads>
      <div class="containerChildren pageonebg" v-show="pageshow==1" :style="{top:haedtop}">
          <div class="checkin_y">
              <div class="banner">
                <!-- <div class="achievement">
                  <a herf="javascript:">我的成绩</a>
                </div> -->
                <div class="main">
                  <span>明天打卡可随机瓜分积分</span>
                  <p><strong>{{clockinfo.CanGainPoints}}</strong></p>
                </div>
              </div>
              <div class="checkin_box">
                  <div class="btn_bg">
                    <a href="javascript:" @click="daka()"><i :class="iconclass"></i>{{btncont}}</a>
                  </div>
                  <div class="daytext">每日{{clockinfo.PublishTime.substring(11,16)}}公布打卡情况 <a href="javascript:" @click="page3show()">查看我的成绩</a></div>
                  <div class="main_text">
                    <div class="top_bg">
                       <!-- <p><span class="yellow">{{clockinfo.SuccessCount}}<strong>成功</strong></span><span class="blue">{{clockinfo.FailCount}}<strong>失败</strong></span></p> -->
                    </div>
                    <div class="guizhe_box">
                      <div class="cont">
                        <dl>
                          <dt>挑战规则</dt>
                          <dd>1、支付{{clockinfo.UserPayPoints}}积分参与早起打卡挑战，放入早起打卡鼓励积分奖池。次日早晨{{clockinfo.BookStartTime.substring(11,16)}}-{{clockinfo.BookEndTime.substring(11,16)}}为早起打卡时间，您在此期间成功打卡，可随机瓜分当日奖池内全部鼓励积分<!-- （积分设置下限最低{{clockinfo.UserPayPoints}}积分、不设上限） -->。</dd>
                          <dd>2、未在次日早晨{{clockinfo.BookStartTime.substring(11,16)}}-{{clockinfo.BookEndTime.substring(11,16)}}内进行打卡，例如：已过打卡时间视为打卡失败，打卡失败不可参与当日鼓励积分的瓜分。</dd>
                          <dd>3、每日瓜分积分于早晨9：00后开始结算，当日早晨10：00前转入您的个人积分账户中。</dd>
                        </dl>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="containerChildren pagetwobg" v-show="pageshow==2" :style="{top:haedtop}">
        <div class="ponitokbg_box">
          <div class="ponitok_box">
              <div class="oktext">支付{{clockinfo.UserPayPoints}}积分成功 记得明早打卡哦</div>
              <div class="oktextsub">明早 {{clockinfo.BookStartTime.substring(11,16)}}~{{clockinfo.BookEndTime.substring(11,16)}} 记得打卡</div>
              <div class="pointokbtn" @click="finish()"></div>
          </div>
        </div>
      </div>
      <div class="containerChildren pagethreebg" v-if="pageshow==3" :style="{top:haedtop}">
          <div class="total">
              <p class="chengji">我的成绩</p>
              <div class="totalnumbel">
                <div class="borderline">
                  <strong>{{userClock.TotalPayPoints}}</strong>
                  <p>累计投入(分)</p>
                </div>
                <div class="borderline">
                  <strong>{{userClock.TotalGainPoints}}</strong>
                  <p>累计赚取(分)</p>
                </div>
                <div>
                  <strong>{{userClock.TotalClockDays}}</strong>
                  <p>打卡天数(天)</p>
                </div>
              </div>
          </div>
          <div class="pointdetail_box">
              <p class="title">打卡记录</p>
              <ul>
                <li v-for="item in clockList"><span class="day">{{item.book_clock_date}}</span><span class="type" :class="{yellow:item.clock_status==2||item.clock_status==3,red:item.clock_status==4}">{{item.clockstate}}</span><span class="ponitcont">{{item.user_gain_points}}</span></li>
              </ul>
          </div>
      </div>
      <div class="openbg" v-show="openbg"></div>
      <div class="confirmbox" v-if="confirm">
          <div class="confirm">
            <a href="javascript:" class="cancel" @click="cancel()"></a>
            <p>确定支付{{clockinfo.UserPayPoints}}积分投资打卡？</p>
            <a href="javascript:" class="btn" @click="submitpoint()">确定</a>
          </div>
      </div>
      <div class="successbox" v-if="successpage">
          <div class="success">
            <a href="javascript:" class="cancel" @click="successcancel()"></a>
            <p>每日打卡时间 {{clockinfo.BookStartTime.substring(11,16)}}~{{clockinfo.BookEndTime.substring(11,16)}}</p>
            <div class="text">金额可随机瓜分{{clockinfo.CanGainPoints}}积分，{{clockinfo.PublishTime.substring(11,16)}}打卡结束后，可在我的成绩页查看瓜分的积分。</div>
            <a href="javascript:" class="btn" @click="submitpoint()">明天继续打卡</a>
          </div>
      </div>
    </div>
</template>

<script>
import heads from '../../components/head';
export default {
  data () {
    return {
      title:"早起打卡赚积分",
      pageshow:1,
      btncont:"支付0积分参与早起打卡",
      iconclass:"ka",
      openbg:false,
      confirm:false,
      successpage:false,
      haedtop:"1.1rem",
      ver:"wap",
      token:"",
      clocktime:0,
      clockinfo:{
        BookCount:0,
        BookEndTime:"",
        BookStartTime:"",
        NowTime:"",
        CanBook:true,
        CanClock:false,
        CanGainPoints:0,
        PublishTime:"",
        SuccessCount:0,
        UserPayPoints:0,
        ShowType:2,
        FailCount:0
      },
      intervalid:"",
      clockList:"",
      userClock:""
    }
  },
  methods:{
    getdata(){
        let _this = this
      },
    daka(){
      if(this.clockinfo.ShowType==3){
        return
      }
      if(!this.$lg.applogin('reg')){
          return
      }
      if(this.clockinfo.ShowType==2){
          this.openbg = true;
          this.confirm = true;
      }
      if(this.clockinfo.ShowType==1){
          this.clockon();
      }
    },
    successcancel(){
      this.openbg = false;
      this.successpage = false;
      this.getclockdata()
    },
    submitpoint(){
        let _this = this
        this.$http(this.$api.UserBookClock({}))
          .then((data) => {
            if(data.data.ResultCode==100000){
              //window.location.href = "/clock?page=2&ver="+this.ver
              _this.pageshow = 2
            }else{
              _this.$msg.alert(data.data.ResultMessage)
            }
            _this.openbg = false;
            _this.confirm = false;
            _this.successpage = false;
        });

    },
    clockon(){
        let _this = this
        this.$http(this.$api.UserClockOn({}))
          .then((data) => {
            if(data.data.ResultCode==100000){
                _this.openbg = true;
                _this.successpage = true;
            }else{
              _this.$msg.alert(data.data.ResultMessage)
              _this.openbg = false;
              _this.successpage = false;
            }

        });

    },
    clockListfn(){
        let _this = this
        this.$http(this.$api.QueryUserClockList({"Page":1,"PageSize":100}))
          .then((data) => {
            if(data.data.ResultCode==100000){
                _this.clockList = data.data.ResultData.LogList
                if(_this.clockList.length>0){
                  _this.clockList.forEach(function(v,i){
                    if(v.clock_status==1){
                      _this.clockList[i].clockstate = "待打卡"
                      _this.clockList[i].user_gain_points = ''
                    }else if(v.clock_status==2){
                      _this.clockList[i].clockstate = "打卡成功"
                      _this.clockList[i].user_gain_points = '正在瓜分奖励积分'
                    }else if(v.clock_status==3){
                      _this.clockList[i].clockstate = "打卡成功"
                    }else if(v.clock_status==4){
                      _this.clockList[i].clockstate = "打卡失败"
                      _this.clockList[i].user_gain_points = _this.clockList[i].user_gain_points
                    }
                  })
                }
            }else{
              _this.$msg.alert(data.data.ResultMessage)
            }

        });
        this.$http(this.$api.QueryUserClockTotal({}))
          .then((data) => {
            if(data.data.ResultCode==100000){
                _this.userClock = data.data.ResultData
                console.log(_this.userClock)
            }else{
              _this.$msg.alert(data.data.ResultMessage)
            }

        });
    },
    cancel(){
      this.openbg = false;
      this.confirm = false;
    },
    page3show(){
          let _this = this
          if(!this.$lg.applogin()){
            return
          }
          window.location.href = '/clock?page=3&ver='+this.ver+this.token
    },
    finish(){
      this.getclockdata();
      //window.location.href = "/clock?ver="+this.ver
      this.pageshow = 1
    },
      timer(intDiff) {
      let _this = this
      if (intDiff <= 0) {
          _this.clockinfo.ShowType=1;
          return
      }
      var show = true;
      this.intervalid = setInterval(function () {
          var day = 0,
              hour = 0,
              minute = 0,
              second = 0;
          if (intDiff > 0) {
              day = Math.floor(intDiff / (60 * 60 * 24));
              hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
              minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
              second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
          }
          if (minute <= 9) minute = '0' + minute;
          if (second <= 9) second = '0' + second;
          _this.clocktime=hour+":"+minute+":"+second
          _this.btncont = "打卡倒计时"+_this.clocktime;
          intDiff--;
          if (intDiff <= 0) {
              if (show) {
                  _this.clockinfo.ShowType=1;
              }
              show = false;
          }
      }, 1000);
     },
     getclockdata(){
      let _this = this
      this.$http(this.$api.QueryUserClockDetail({}))
      .then((data) => {
        console.log(data.data.ResultData)
        if(data.data.ResultCode==100000){
          _this.clockinfo = data.data.ResultData
          if(_this.clockinfo.ShowType==2){
            _this.btncont = "支付"+_this.clockinfo.UserPayPoints+"积分参与早起打卡";
            _this.iconclass = "ka"
          }
          if(_this.clockinfo.ShowType==1){
            _this.btncont = "签到打卡";
            _this.iconclass = "hand"
          }
          if(_this.clockinfo.ShowType==3){
            let diff = (new Date(_this.clockinfo.BookStartTime) - new Date(_this.clockinfo.NowTime)) / 1000;
            _this.timer(diff);
            _this.btncont = "打卡倒计时"+_this.clocktime;
            _this.iconclass = "time"
          }
        }
    });
     }
  },
  mounted : function() {

  },
  created:function(){
    let _this = this
    let query = this.$route.query
    if(query.ver=='ios'||query.ver=='android'){
        this.haedtop = 0;
        this.ver = query.ver
        if(query.token==null){
          this.token=""
        }else{
          this.token = "&token="+query.token
        }
    }
   if(query.page){
      if(query.page==3){
        if(!this.$lg.applogin('reg')){
          return
        }
        _this.clockListfn()
      }
      this.pageshow = query.page
    }
    // if(typeof this.$store.state.user === 'undefined'){
    //   return
    // }
    this.getclockdata();

  },
  beforeDestory() {
    clearInterval(this.intervalid)
  },
  components:{
    heads
  }
}
</script>


<style lang="scss" scoped>
.containerChildren{
  .checkin_y{
    overflow:auto;
    height:100%;
  }
  .banner{
    height:rem(185);
    overflow:hidden;
    @include bg("/static/img/activity/checkin/bannerone.jpg")
    .achievement{
      overflow:hidden;
      margin-top:rem(10);
      a{
        @include widthHeight(rem(80),rem(30));
        display:block;
        float:right;
        margin-right:rem(20);
        line-height:rem(30);
        color:#ff0c00;
        background:#fff770;
        text-align:center;
        border-radius:rem(5)
      }
    }
    .main{
      text-align:center;
      margin-top:rem(30);
      @include sizeColor(0.45rem,$white)
      p{
        margin-top:rem(15);
        strong{
          font-size:0.6rem;
        }
      }
    }
  }
  .checkin_box{
    padding-top:rem(30);
    padding-bottom:rem(50);
    .btn_bg{
      width:90%;
      margin:auto;
      height:rem(63);
      @include bg("/static/img/activity/checkin/btn.png");
      line-height:rem(55);
      a{
        color:#f00;
        text-align:center;
        display:block;
        font-size:0.4rem;
        i{
          display:inline-block;
          @include widthHeight(rem(18),rem(18));
          margin-right:rem(10);
        }
        i.hand{
          @include bg("/static/img/activity/checkin/icon_1.png");
        }
        i.ka{
          @include bg("/static/img/activity/checkin/icon_2.png");
        }
        i.time{
          @include widthHeight(rem(18),rem(23));
          @include bg("/static/img/activity/checkin/icon_3.png");
        }
      }
    }
    .daytext{
      margin:rem(10) 0;
      color:#ffffff;
      text-align:center;
      a{
        color:#fff770;
        text-decoration:underline;
      }
    }
    .main_text{
      width:90%;
      margin:auto;
      .top_bg{
        height:rem(59);
        overflow:hidden;
        @include bg("/static/img/activity/checkin/title.png");
        p{
          height:rem(30);
          margin-top:rem(30);
          line-height:rem(30);
          text-align:center;
          color:#ffffff;
          .yellow{
            strong{
              color:#fff600;
              padding-right:rem(20);
            }
          }
          .blue{
            strong{
              color:#85fff5;
            }
          }
        }
      }
      .guizhe_box{
        background:#3c34d2;
        padding:rem(5);
        box-sizing:border-box;
        .cont{
          background:#4a42e1;
          padding:rem(15);
          border-radius:rem(10);
          box-sizing:border-box;
          color:#ffffff;
          dt{
            font-size:0.45rem;
          }
          dd{
            margin-top:rem(10);
          }
        }
      }
    }
  }
}
.pageonebg{
  background:-webkit-linear-gradient(#683ef6, #4a54e5);
}
.pagetwobg{
  background-color:#8709f1;
}
.pagethreebg{
  background-color:#624ae6;
}
.containerChildren{
  overflow:hidden;
  top:1.1rem;
     .ponitokbg_box{
      height:100%;
      width:100%;
      background:url("/static/img/activity/checkin/pointok_bg.jpg") no-repeat left bottom;
      background-size:100%;
      overflow:hidden;
      .ponitok_box{
        width:rem(338);
        margin:auto;
        height:rem(467);
        overflow:hidden;
        @include bg("/static/img/activity/checkin/pointok.png");
        margin-top:rem(50);
        .oktext{
          width:85%;
          margin:auto;
          margin-top:rem(270);
          text-align:center;
          color:#ff7800;
          font-size:0.45rem;
        }
        .oktextsub{
          width:80%;
          margin:auto;
          margin-top:rem(20);
          text-align:center;
          border:1px solid #7b9dff;
          color:#7b9dff;
          border-radius:rem(10)
        }
        .pointokbtn{
          width:80%;
          margin:auto;
          margin-top:rem(30);
          height:rem(55);
          @include bg("/static/img/activity/checkin/pointbtn.png");
        }
      }
     }
     .total{
        height:rem(145);
        background:-webkit-linear-gradient(#8507f5, #88a7ff);
        overflow:hidden;
        .chengji{
          padding:0 rem(20);
          margin-top:rem(20);
          color:#ffffff;
          font-size:0.4rem;
        }
        .totalnumbel{
            display:flex;align-items:center;justify-content:center;
            margin-top:rem(20);
            font-size:0.4rem;
            text-align:center;
            color:#ffffff;
            .borderline{
              border-right:1px solid #ffffff;
            }
        }
     }
     .pointdetail_box{
      width:80%;
      margin:auto;
      margin-top:rem(20);
      background:#7296ff;
      padding:rem(20);
      border-radius:rem(5);
      font-size:0.4rem;
      color:#ffffff;
      .title{
        font-weight:bold;
      }
      ul{
        margin-top:rem(10);
        li{
          padding:rem(8) 0;
          border-bottom:1px dashed #fff;
          display:flex;align-items:center;justify-content:center;
          span.day{
            width:25%;
          }
          span.type{
            width:25%;
            text-align:center;
          }
          span.ponitcont{
            width:50%;
            text-align:right;
          }
          span.yellow{
            background:#fff770;
            color:#5537f7
          }
          span.red{
            background:#fb4844;
            color:#fff;
          }
        }
      }
     }
  }
  .openbg{
     width:100%; height:100%; background:rgba(0,0,0,0.5); position:fixed; left:0; top:0; z-index:1000;
  }
  .confirmbox{
      width:100%; height:100%; position:fixed; left:0; top:0; z-index:1001;display:flex;align-items:center;justify-content:center;
      .confirm{
        width:rem(320);
        height:rem(300);
        margin-top:rem(-100);
        @include bg("/static/img/activity/checkin/confirm_bg.png");
        position:relative;
        a.cancel{
          height:rem(45);
          width:rem(45);
          @include bg("/static/img/activity/checkin/alert_ok_btn.png");
           position:absolute; right:0; top:0;
           display:block;
        }
        p{
          margin-top:rem(170);
          text-align:center;
          color:#ffffff;
          font-size:0.4rem;
        }
        a.btn{
          width:90%;
          height:rem(50);
          line-height:rem(45);
          display:block;
          font-size:0.45rem;
          @include bg("/static/img/activity/checkin/alert_btn.png");
          color:#f00;
          text-align:center;
          margin:auto;
          margin-top:rem(20)
        }
      }
  }
  .successbox{width:100%; height:100%; position:fixed; left:0; top:0; z-index:1001;display:flex;align-items:center;justify-content:center;}
  .successbox .success{width:rem(320);height:rem(400);@include bg("/static/img/activity/checkin/alert_ok.png");position:relative;top:rem(-10);}
  .successbox .success a.cancel{height:rem(45);width:rem(45);@include bg("/static/img/activity/checkin/alert_ok_btn.png");position:absolute; right:0; top:0;display:block;}
  .successbox .success p{text-align:center;color:#ffffff; font-size:0.4rem; padding:rem(5) 0; border:rem(1) solid #ffffff; border-radius:rem(10); box-sizing:border-box; width:80%; margin:auto;margin-top:rem(130);}
  .successbox .success .text{margin:auto; margin-top:rem(15); width:85%;font-size:0.4rem; color:#ffffff;}
  .successbox .success a.btn{width:90%;height:rem(50);line-height:rem(45);display:block;font-size:0.45rem; @include bg("/static/img/activity/checkin/alert_btn.png");color:#f00;text-align:center;margin:auto; margin-top:rem(20)}
</style>