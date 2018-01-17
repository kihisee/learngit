<template>

            <div class="prize_box">
                  <ul id="lottery">
                      <li :class="{active:lottery.index == 0}"><img src="static/img/activity/rollreward/luck_1.png"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 1}"><img src="static/img/activity/rollreward/luck_2.png"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 2}"><img src="static/img/activity/rollreward/luck_3.png"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 7}"><img src="static/img/activity/rollreward/luck_4.png"><div class="mask"></div></li>
                      <li class="prize_btn" @click="getdata()"><img src="static/img/activity/rollreward/luck_btn.png"><div class="mask"></div><p class="another" v-if="loginmessage">剩余<span v-if="isoutside">{{PointDrawTimes}}</span><span v-if="!isoutside">{{myPointDrawTimes}}</span>次</p></li>
                      <li :class="{active:lottery.index == 3}"><img src="static/img/activity/rollreward/luck_5.png"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 6}"><img src="static/img/activity/rollreward/luck_6.png"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 5}"><img src="static/img/activity/rollreward/luck_7.png"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 4}"><img src="static/img/activity/rollreward/luck_8.png"><div class="mask"></div></li>
                  </ul>
              </div>

</template>

<script>

import ls from '../../store/lStorage.js'

  export default {
  data () {
    return {
      state:this.$store.state,
      isoutside:true,

      rule:{
        hit1:"1、周年庆期间专享福利，只需5积分即可以抽奖一次",
        hit2:"2、每位历史投资固定理财满1000元的用户可参与抽奖，每天最多5次抽奖机会",
        hit3:"3、本次活动最终解释权归恒瑞财富网所有",
      },

      myprePoint:'',
      myPointDrawTimes:'',
      luckyNumber:-1, //中奖位置

      firsttime:true,
      onlyone:true,

      lottery:{
        index: -1,    //当前转动到哪个位置，起点位置
        count: 0,    //总共有多少个位置
        timer: 0,    //setTimeout的ID，用clearTimeout清除
        speed: 20,    //初始转动速度
        times: 0,    //转动次数
        cycle: 50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1,    //中奖位置
      },

      score:0,

    }
  },
     props: {
        loginmessage: Boolean,  //是否有登录
        PointDrawTimes: Number,  //抽奖次数
        idata:Number
      },
methods:{
    playGame(){
      this.lottery.speed=100;
      console.log("roll")
      this.roll();
    },
    getdata(){
        let _this = this



        let query = this.$route.query
           //console.log(_this.loginmessage)

        //if(typeof query.ver=="undefined"){//微信打开
               // _this.$msg.alert("请前往恒瑞金服APP",function(){
              //   window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinyang.wealth"
             // })
           //     return
        //  }

        _this.isoutside=false
        if(_this.firsttime){
            _this.myPointDrawTimes =_this.PointDrawTimes
            _this.firsttime=false
        }

        let arr = ["1%加息券", "10积分", "888元现金红包",  "10元投资券", "50元投资券","20积分","谢谢参与", "88元现金红包"]

          if(_this.onlyone){
             console.log(_this.onlyone)
              _this.onlyone=false

              if(_this.loginmessage){//登录点击后请求
             this.$http(this.$api.PointDraw({}))//请求中奖位置
             .then((data) => {
             console.log(data)
              if(data.data.ResultCode==100000){//请求成功
                console.log(data.data.ResultData.prize)
                  if(data.data.ResultData.isSuccess){
                        arr.forEach(function(val,index){
                      //console.log(val,index)
                        if(val == data.data.ResultData.prize){//抽到什么奖
                        //console.log(val)
                          _this.luckyNumber=index
                         _this.money = data.data.ResultMessage
                         _this.myprePoint=data.data.ResultData.times
                         _this.score=data.data.ResultData.gold


                         _this.playGame()
                       }
                     })
                  }else{
                        _this.$msg.alert(data.data.ResultMessage,function(){})

                  }

              }else{//请求没有成功
                    //_this.myPointDrawTimes=0
                    _this.$msg.alert(data.data.ResultMessage,function(){})
              }

          });
        }else{//未登录弹窗
              //console.log("nologin")
              // _this.$msg.alert("请先登录",function(){
              //        //window.top.location.href="/login?back=3anniversary"
              //        if(typeof query.ver=="undefined"){//微信打开
              //               if(_this.idata){
              //                window.top.location.href="/reg?back=rollreward&i="+_this.idata
              //               }else{
              //                 window.top.location.href="/reg?back=rollreward"
              //               }
              //           }else{
              //             //console.log(4444)
              //             if (query.ver == 'android') {
              //                 var resutl = android.SyncLogin();
              //                 _this.resutlToken = resutl.toString();
              //                 _this.isApp=false;
              //             }
              //             else if (query.ver == 'ios') {
              //                 var resutl = window.webkit.messageHandlers.Method.postMessage({ "type": "AsyncLogin" });
              //                 console.log(3333)
              //                 _this.resutlToken = resutl.toString();

              //                 _this.isApp=false;
              //             }


              //           }
              // })
              if(this.$lg.isapp()&&typeof this.$store.state.user === 'undefined'){
                 _this.$msg.confirm("请先注册或登录",function(){
                           _this.$router.push("/reg?back=rollreward")
                    },function(){
                      _this.$router.push("/login?back=rollreward")
                    },"登录","注册")
              }else{
                _this.$lg.applogin()
              }
        }
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
            setTimeout(function(){
                _this.$msg.alert(_this.money,function(){
                    _this.myPointDrawTimes = _this.myprePoint
                    _this.$emit("score",_this.score)
                    _this.onlyone=true
                } )
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

   // console.log(_this.loginmessage)
    //console.log(_this.PointDrawTimes)

  },
}
</script>



<style  lang="scss" scoped>
  .mask {width: 100%;height: 100%;position: absolute;left: 0;top: 0;background-color: rgba(252,211,4,0.5);display: none;z-index:9;}

.prize_btn .another{line-height: 0.625rem;height: 0.625rem;text-align: center;border-radius: 0.125rem;position:absolute;top:1.5rem;left:50%;width:2rem;margin:0 0 0 -1rem;background:#804201;color:#fff;padding-top:0;}
.prize_btn .another span{color:#fff000;}
.prize_box {margin:auto;margin-top: 10px; background:#6d0909;width: 85%;height: 8.5rem;background-size:100%;border-radius: 0.125rem;}
.prize_box ul {padding: 0.09rem;margin-left: 0px;  overflow:hidden;box-sizing:border-box; }
.prize_box ul li {float: left;margin-left: 3px; margin-top: 3px;position: relative; width:2.67rem;height:2.67rem;text-align:center;border-radius:rem(10);}
.prize_box ul li p { padding-top:2.1rem;line-height:0.5rem;color:#c10001;font-size:rem(10)}

.prize_box ul li.active .mask {display: block; }
</style>