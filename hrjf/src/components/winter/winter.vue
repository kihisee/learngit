<template>

            <div class="prize_box">
             <p class="rulebottom" @click="rulebottom()"></p>
                  <ul id="lottery">
                      <li :class="{active:lottery.index == 0}"><div class="mask"></div><p>卡帝亚电暖器</p></li>
                      <li :class="{active:lottery.index == 1}"><div class="mask"></div><p>宝格龙被子</p></li>
                      <li :class="{active:lottery.index == 2}"><div class="mask"></div><p>金龙鱼5L葵瓜子油</p></li>
                      <li :class="{active:lottery.index == 7}"><div class="mask"></div><p>5元微信红包</p></li>
                      <li class="prize_btn" @click="getdata()"><div class="mask"></div></li>
                      <li :class="{active:lottery.index == 3}"><div class="mask"></div><p>2元微信红包</p></li>
                      <li :class="{active:lottery.index == 6}"><div class="mask"></div><p>金龙鱼2.5KG米</p></li>
                      <li :class="{active:lottery.index == 5}"><div class="mask"></div><p>1元微信红包</p></li>
                      <li :class="{active:lottery.index == 4}"><div class="mask"></div><p>暖宝宝（30片）</p></li>
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

      lottery:{
        index: -1,    //当前转动到哪个位置，起点位置
        count: 0,    //总共有多少个位置
        timer: 0,    //setTimeout的ID，用clearTimeout清除
        speed: 20,    //初始转动速度
        times: 0,    //转动次数
        cycle: 50,    //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1,    //中奖位置
      },
    }
  },
     props: {
        loginmessage: Boolean,  //是否有登录
        PointDrawTimes: Number,  //抽奖次数
        idata:Number  //返回ID
      },
methods:{
    rulebottom(){ //点击规则按钮
         let _this=this
        this.$emit("rulebottom",_this.rule)
    },
    playGame(){
      this.lottery.speed=100;
      console.log("roll")
      this.roll();
    },
    getdata(){


        let _this = this
        let query = this.$route.query
           //console.log(_this.loginmessage)
           console.log(_this.idata)

        _this.isoutside=false
        if(_this.firsttime){
            _this.myPointDrawTimes =_this.PointDrawTimes
            _this.firsttime=false
        }

        if(_this.myPointDrawTimes>0){
        console.log(_this.myPointDrawTimes)
         _this.myPointDrawTimes =_this.myPointDrawTimes-1
        }else{
         //_this.$msg.alert("您的兑奖次数已用完")
        }

        // if(typeof query.ver=="undefined"){//微信打开
            //      window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jinyang.wealth"
            //      return
       // }

        let arr = ["卡帝亚电暖器", "宝格龙被子", "金龙鱼葵瓜子油",  "2元微信红包", "暖宝宝","1元微信红包","金龙鱼大米", "5元微信红包"]

        if(_this.loginmessage){//登录点击后请求
             this.$http(this.$api.RegisterGiftDraw({}))//请求中奖位置
             .then((data) => {
             console.log(data)
              if(data.data.ResultCode==100000){//请求成功

                  if(data.data.ResultData.isSuccess){
                    arr.forEach(function(val,index){
                    //console.log(val,index)
                      if(val == data.data.ResultData.prize){//抽到什么奖
                         console.log(val)
                        _this.luckyNumber=index

                        console.log(_this.luckyNumber)
                       _this.money = data.data.ResultMessage
                       _this.myprePoint=data.data.ResultData.times
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
              _this.$msg.confirm("请先注册或登录",function(){
                     //window.top.location.href="/login?back=3anniversary"
                     if(typeof query.ver=="undefined"){//微信打开
                             //window.top.location.href="/reg?back=winter&i="+_this.idata
                             _this.$router.push("/reg?back=winter&i="+_this.idata)
                        }else{
                          //console.log(4444)
                          if (query.ver == 'android') {
                              var resutl = android.SyncLogin();
                              _this.resutlToken = resutl.toString();
                              _this.isApp=false;
                          }
                          else if (query.ver == 'ios') {
                              var resutl = window.webkit.messageHandlers.Method.postMessage({ "type": "AsyncLogin" });
                              console.log(3333)
                              _this.resutlToken = resutl.toString();

                              _this.isApp=false;
                          }


                        }
              },function(){
                if(typeof query.ver=="undefined"){//微信打开
                             //window.top.location.href="/reg?back=winter&i="+_this.idata
                             _this.$router.push("/login?back=winter&i="+_this.idata)
                        }else{
                          //console.log(4444)
                          if (query.ver == 'android') {
                              var resutl = android.SyncLogin();
                              _this.resutlToken = resutl.toString();
                              _this.isApp=false;
                          }
                          else if (query.ver == 'ios') {
                              var resutl = window.webkit.messageHandlers.Method.postMessage({ "type": "AsyncLogin" });
                              console.log(3333)
                              _this.resutlToken = resutl.toString();

                              _this.isApp=false;
                          }


                        }

              },"登录","注册")
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
                })
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

.prize_btn .another{line-height: 0.625rem;height: 0.625rem;text-align: center;border-radius: 0.125rem;position:absolute;top:1.5rem;left:50%;width:2rem;margin:0 0 0 -1rem;background:#804201;color:#fff;}
.prize_btn .another span{color:#fff000;}
.prize_box {margin:auto;margin-top: 10px; background:#6d0909;width: 85%;height: 8.5rem;background-size:100%;border-radius: 0.125rem;}
.prize_box ul {padding: 0.09rem;margin-left: 0px;  overflow:hidden;box-sizing:border-box; }
.prize_box ul li {float: left;margin-left: 3px; margin-top: 3px;position: relative; width:2.67rem;height:2.67rem;text-align:center;background:#fff;border-radius:rem(10);}
.prize_box ul li:nth-child(1){background:url(/static/img/activity/winter/winter1.jpg) no-repeat center rem(10) #fff;background-size:50%}
.prize_box ul li:nth-child(2){background:url(/static/img/activity/winter/winter2.png) no-repeat center rem(10) #fff;background-size:80%}
.prize_box ul li:nth-child(3){background:url(/static/img/activity/winter/winter3.png) no-repeat center rem(10) #fff;background-size:50%}
.prize_box ul li:nth-child(4){background:url(/static/img/activity/winter/winter4.png) no-repeat center rem(10) #fff;background-size:50%}
.prize_box ul li:nth-child(5){background:url(/static/img/activity/winter/nowlog.png) no-repeat center top #fff;background-size:100%}
.prize_box ul li:nth-child(6){background:url(/static/img/activity/winter/winter5.png) no-repeat center rem(10) #fff;background-size:50%}
.prize_box ul li:nth-child(7){background:url(/static/img/activity/winter/winter6.png) no-repeat center rem(10) #fff;background-size:50%}
.prize_box ul li:nth-child(8){background:url(/static/img/activity/winter/winter7.png) no-repeat center rem(10) #fff;background-size:50%}
.prize_box ul li:nth-child(9){background:url(/static/img/activity/winter/winter8.png) no-repeat center rem(10) #fff;background-size:80%}
.prize_box ul li p { padding-top:2.1rem;line-height:0.5rem;color:#c10001;font-size:rem(10)}

.prize_box ul li.active .mask {display: block; }
</style>