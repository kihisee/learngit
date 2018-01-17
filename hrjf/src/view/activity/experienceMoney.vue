<template>
    <div class="container">
       <div class="tyj_box">
        <div class="tyj_banner"></div>
         <div class="tyj_row1">
              <div class="title"><img src="static/img/activity/baiwantiyanjin/prize_p1_title.png"></div>
              <div v-if="!token">
                <p class="reg_text">步骤一：注册恒瑞金服账号</p>
                <p class="reg_btn" @click="goreg()"></p>
                <p class="reg_text">步骤二：抽取百万体验金 </p>
              </div>
               <div class="prize_box">
                  <ul id="lottery">
                      <li :class="{active:lottery.index == 0}"><img src="static/img/activity/baiwantiyanjin/prize_1.jpg"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 1}"><img src="static/img/activity/baiwantiyanjin/prize_2.jpg"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 2}"><img src="static/img/activity/baiwantiyanjin/prize_3.jpg"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 7}"><img src="static/img/activity/baiwantiyanjin/prize_8.jpg"><div class="mask"></div></li>
                      <li class="prize_btn" @click="getdata()"><img src="static/img/activity/baiwantiyanjin/prize_btn.png"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 3}"><img src="static/img/activity/baiwantiyanjin/prize_4.jpg"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 6}"><img src="static/img/activity/baiwantiyanjin/prize_7.jpg"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 5}"><img src="static/img/activity/baiwantiyanjin/prize_6.jpg"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 4}"><img src="static/img/activity/baiwantiyanjin/prize_5.jpg"><div class="mask"></div></li>
                  </ul>
              </div>

              <div class="prize_guize">
                <dl>
                    <dt><img src="static/img/activity/baiwantiyanjin/rule_title.png" /></dt>
                    <dd>1、凡成功注册的用户，72小时内可抽取免费体验金券，百分百中奖，最高可达168888元；</dd>
                    <dd>2、体验金可直接用于投资，体验金目前仅限投资体验标，体验期为2天；</dd>
                    <dd>3、使用体验金投资后所得收益以现金红包方式发放给用户，标满计息，现金红包有效期为一个月；</dd>
                    <dd>4、所得现金红包只要任意投资一笔固定理财满1000元即可激活 ；</dd>
                    <dd>5、体验金券将直接发送到“我”-“优惠券”，有效期为10天（从领取当天开始计算），10天之后体验金券失效；</dd>
                    <dd>6、每个新用户账号只能抽取一次；</dd>
                    <dd>7、本次活动最终解释权归恒瑞财金服所有。与苹果公司无关。 </dd>
                </dl>
            </div>

             <div class="top10">
                <h1><img src="static/img/activity/baiwantiyanjin/top10_title.png" /></h1>
                <dl>
                  <dt><div class="phone">用户名</div><div class="money">中奖金额</div><div class="day">中奖时间</div></dt>
                  <dd v-for="timp in userlist"><div class="phone">{{timp.Mobile}}</div><div class="money">{{timp.Money}}元</div><div class="day">{{timp.CreateTimeString}}</div></dd>
                </dl>
              </div>
          </div>
      </div>
      <loadapp></loadapp>
    </div>
</template>

<script>
import ls from '../../store/lStorage.js'
import loadapp from '../../components/loadapp';
export default {
  data () {
    return {
      state:this.$store.state,
      luckyNumber:-1,
      money:0,
      lottery:{
        index: -1,    //当前转动到哪个位置，起点位置
        count: 0,    //总共有多少个位置
        timer: 0,    //setTimeout的ID，用clearTimeout清除
        speed: 20,    //初始转动速度
        times: 0,    //转动次数
        cycle: 50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1,    //中奖位置
      },
      token:false,
      userlist:[],
      AcivityTime:0,
      NowTime:0,
      IsShowActivity:false,
      ShowTime:0,
      time_db_h:0,
      time_db_m:0,
      time_db_s:0,
      shownowtime:false,
      intervalid:"",
      clickmark:true
    }
  },
  methods:{
    playGame(){
      this.lottery.speed=100;
      this.roll();
    },
    getdata(){
        let _this = this
        let arr = ["6688", "88888", "36888", "8888", "66888", "16888", "168888", "26888"]
        if(!this.$lg.applogin("invitelink")){
          return
        }
        if(!this.clickmark){
          return
        }
        this.clickmark=false;
        this.$http(this.$api.getTYJPrize({}))
        .then((data) => {
          if(data.data.ResultCode==100000){
              arr.forEach(function(val,index){
                if(val==data.data.ResultData[0].PrizeMoney){
                  _this.luckyNumber=index
                  _this.money = val
                  _this.playGame()
                }
              })
          }else{
            _this.$msg.alert(data.data.ResultMessage,function(){
              _this.clickmark=true;
            })
          }

        });
    },

    goreg(){
      let query = this.$route.query
      if (query.ver == 'android') {
          var resutl = android.SyncLogin();
          resutlToken = resutl.toString();
      }else if (query.ver == 'ios') {
          var resutl = window.webkit.messageHandlers.Method.postMessage({ "type": "AsyncLogin" });
          resutlToken = resutl.toString();
      }else{
        this.$router.push('/invitelink?back=experienceMoney')

      }
    },

    roll(){
      let _this = this
      this.lottery.times += 1;
        this.lottery.index += 1;
        if (this.lottery.index > 8) {
                this.lottery.index = 0;
            };
        if (this.lottery.times > this.lottery.cycle + 10 && this.lottery.prize == this.lottery.index) {
            clearTimeout(this.lottery.timer);
            this.lottery.prize = -1;
            this.lottery.times = 0;
            this.clickmark=true;
            setTimeout(function(){
                let query = _this.$route.query
                  if (query.ver == 'android'||query.ver == 'ios') {
                      _this.$msg.alert("恭喜您获得" + _this.money + "元体验券！")
                  }else{
                      _this.$msg.alert("恭喜您获得" + _this.money + "元体验券！",function(){
                        window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinyang.wealth"
                      },"立即下载APP使用体验券")

                  }

            },1000)

        } else {
            if (this.lottery.times < this.lottery.cycle) {
                this.lottery.speed -= 10;
            } else if (this.lottery.times == this.lottery.cycle) {
                this.lottery.prize = this.luckyNumber;
            } else {
                if (this.lottery.times > this.lottery.cycle + 10 && ((this.lottery.prize == 0 && this.lottery.index == 7) || this.lottery.prize == this.lottery.index + 1)) {
                    this.lottery.speed += 110;
                } else {
                    this.lottery.speed += 20;
                }
            }
            if (this.lottery.speed < 40) {
                this.lottery.speed = 40;
            };
            //console.log(this.lottery.times+'^^^^^^'+this.lottery.speed+'^^^^^^^'+this.lottery.prize);
            this.lottery.timer = setTimeout(this.roll, this.lottery.speed);
        }
        return false;
    },


  },
  created:function(){
    let _this = this
    let query = this.$route.query
    if(query.token){
      this.token = true
    }

    this.$http(this.$api.GetTYJPrizeUserList({}))
    .then((data) => {

      if(data.data.ResultData.length>0){
        for(var i=0; i<10; i++){
          _this.userlist.push(data.data.ResultData[i])
        }
      }
      console.log(_this.userlist)
    })


  },
  beforeDestory() {
    clearInterval(this.intervalid)
  },
  components:{
    loadapp
  }
}
</script>


<style scoped>
.tyj_box{background:#faeabc;padding-bottom:1.25rem;}
.tyj_banner{background: url(/static/img/activity/baiwantiyanjin/lottery_banner.jpg) no-repeat; height:10rem; background-size:100%;}
.tyj_row1 .title,.tyj_row2 .title,.tyj_row3 .title{width: 90%; margin:auto;}
.tyj_row1 .reg_text{font-size:16px; color:#863e0e; margin-top:0.25rem; font-weight:bold; text-align:center;}
.tyj_row1 .reg_btn{background: url(/static/img/activity/baiwantiyanjin/reg_btn.png) no-repeat; height:1.175rem;width:5.275rem; background-size:100%; margin:auto; margin-top:0.25rem;}
.prize_box {margin:auto;margin-top: 10px; background: url(/static/img/activity/baiwantiyanjin/prize_bg.png) no-repeat;width: 90%;height: 9.0rem;background-size:100%;}
.prize_box ul {padding: 0.275rem;margin-left: 1px;  overflow:hidden;box-sizing:border-box; }
.prize_box ul li {float: left;margin-left: 4px; margin-top: 4px;position: relative; width:2.67rem;height:2.67rem;}
.prize_box ul li img { display: block;}
.mask {width: 100%;height: 100%;position: absolute;left: 0;top: 0;background-color: rgba(252,211,4,0.5);display: none;}
.prize_box ul li.active .mask {display: block; }
.prize_guize{width: 90%; margin:auto; margin-top:0.25rem; text-align:left;}
.prize_guize dt{ width: 2.0rem;}
.prize_guize dd{margin-top:0.25rem; font-size:0.35rem;color:#5e2f28;}

.top10{border:0.05rem solid #b12e40; background:#fff8e4; border-radius:0.125rem; box-sizing:border-box; width:90%; margin:auto;margin-top:0.5rem; }
.top10 h1{ width:4.75rem; margin:auto; margin-top:0.5rem;}
.top10 dl{background:#b12e40; width:95%; margin:auto; border-radius:0.125rem; margin-bottom:0.25rem; margin-top:0.5rem; text-align:left; padding:0.25rem 0;}
.top10 dl dt{ border-bottom:1px solid #d07366;  width:95%; margin:auto; padding-bottom:0.125rem; font-size:0.35rem;}
.top10 dl dd{margin-top:0.25rem;}
.top10 dl div {display: inline-block; color: #fff; width:auto;}
.top10 dl div.phone,.top10 dl div.money { width:2.5rem; text-align:center; }
.top10 dl div.day {width: 3rem;text-align: center;}

.tyj_row2{margin-top:0.25rem;}
.tyj_row2 .main_box{width: 90%; margin:auto; margin-top:0.25rem; border:0.075rem solid #dc3a25; border-radius:0.125rem;background:#fff9e8; }

.tyj_row2 .main_box .img {background: url(/static/img/activity/baiwantiyanjin/prize_p2_icon.png) no-repeat 1rem 0.3rem; height:4rem; background-size:80%;}
.tyj_row2 .main_box .tg {background: url(/static/img/activity/baiwantiyanjin/prize_p2_icon_tg.png) no-repeat 1rem 0.3rem; height:4rem; background-size:80%;}
.tyj_row2 .main_box .text{margin:0.25rem 0; }
.tyj_row2 .main_box .text p{ padding-left:1.5rem; text-align:left; margin-top:0.25rem; font-size:0.35rem;box-sizing:border-box;}
.tyj_row2 .reg_btn{background: url(/static/img/activity/baiwantiyanjin/row_btn2.png) no-repeat; height:1.175rem;width:5.275rem; background-size:100%; margin:auto; margin-top:0.25rem;line-height:0.85rem;  font-size:0.35rem;}
.tyj_row2 .reg_btn_active{background: url(/static/img/activity/baiwantiyanjin/row_btn.png) no-repeat; height:1.175rem;width:5.275rem; background-size:100%; margin:auto; margin-top:0.25rem;}
.tyj_row2 a .reg_btn{color:#555;}
.tyj_row3{margin-top:0.25rem;}
.tyj_row3 .main_box{width: 90%; margin:auto; margin-top:0.25rem; border:0.075rem solid #dc3a25; border-radius:0.125rem;background:#fff9e8; }

.tyj_row3 .main_box .img {background: url(/static/img/activity/baiwantiyanjin/prize_p3_icon.png) no-repeat 1rem 0.3rem; height:4rem; background-size:80%;}
.tyj_row3 .main_box .text{margin:0.25rem 0; }
.tyj_row3 .main_box .text p{ padding-left:1.5rem; text-align:left; margin-top:0.25rem; font-size:0.35rem;box-sizing:border-box;}
.tyj_row3 .reg_btn{background: url(/static/img/activity/baiwantiyanjin/row_btn.png) no-repeat; height:1.175rem;width:5.275rem; background-size:100%; margin:auto; margin-top:0.25rem;line-height:0.85rem;  font-size:0.35rem;}

</style>