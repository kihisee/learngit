<template>
   <div id="frame">
    <div id="con">
      <div class="fixed">
          <div class="link_head">
            <h1>
              <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
              {{title}}
               <p class="hrcf_topr">
                  <a href="javascript:" class="text" @click="openshow">
                    <img src="static/img/point/icon_jia.png">
                  </a>
              </p>
            </h1>
          </div>

    <div class="point_open" v-show="pointopen">
      <strong>
      <router-link :to="'/changelist'" class="text color">兑换记录</router-link>
      <router-link :to="'/myaddress'" class="text color">收货地址</router-link>
      </strong>
      <div class="black_bg"  @click="openhide"></div>
    </div>
    <div v-show="sign_open">
      <div class="black_bg"></div>
      <div class="sign_open">
        <div class="sign_main_box">
          <h1>每日签到</h1>
          <a herf="javascript:" @click="cancelSign" class="cancelSign"><img src="static/img/point/cancel.png" alt=""></a>
          <ul>
            <li :class="{active:signarr[0].sign}"><span>1</span><p>第一天</p></li>
            <li :class="{active:signarr[1].sign}"><span>2</span><p>第二天</p></li>
            <li :class="{active:signarr[2].sign}"><span>3</span><p>第三天</p></li>
            <li :class="{active:signarr[3].sign}"><span>4</span><p>第四天</p></li>
            <li :class="{active:signarr[4].sign}"><span>5</span><p>第五天</p></li>
            <li :class="{active:signarr[5].sign}"><span>6</span><p>第六天</p></li>
          </ul>
            <div class="sevenday" :class="{active:signarr[6].sign}">
                  <strong>7</strong>
                  <span>积分</span>
                  <p>第七天</p>
            </div>
        </div>
      </div>
    </div>
          <div class="per_top2">
              <div class="per_money">
                  <p class="money_top">我的积分</p>
                  <p class="p_money">{{point}}</p>
                  <a href="javascript:" class="hxbtn" @click="signshow">{{sign}}</a>
              </div>
          </div>
          <div class="tradelistnav">
              <ul>
                  <li :class="{active:classIndex == 0}"  @click="tabClick(0)"><span>积分兑换</span></li>
                  <!-- <li :class="{active:classIndex == 1}"  @click="tabClick(1)"><span>积分任务</span></li> -->
              </ul>
          </div>

      </div>
      <div class="pointstore_box">
        <div class="pointlist_box">
          <div class="bg">
            <ul>
              <li v-for="(item,index) in pointstore"  @click="store(index)">
                <div class="store_img">
                    <span class="imgbg"><img :src="item.Icon_min_url" alt=""></span>
                    <div class="imgtitle">
                      <span>{{item.Name}}</span>
                    </div>
                </div>
                <div class="pointbtn">
                  <span>{{item.Need_point}}积分</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '积分商城',
      sign:"每日签到",
      pointstore:[],
      point:0,
      classIndex:0,
      pointopen:false,
      sign_open:false,
      signarr:[{sign:true},{sign:true},{sign:true},{sign:true},{sign:true},{sign:true},{sign:true}]
    }
  },
  methods:{
    tabClick(type){
      this.classIndex=type
    },
    store(index){
      this.$store.commit("storedetail",this.pointstore[index])
      this.$router.push('/storedetail')
    },
    openshow(){
      this.pointopen=true;
    },
    openhide(){
      this.pointopen=false;
    },
    cancelSign(){
      this.sign_open=false;
    },
    signshow(){
      let _this =this
      if(typeof this.$store.state.user=="undefined"){
        this.$router.push('/login')
        return
      }
      this.sign_open=true;
      this.$http(this.$api.sign({}))
      .then((data) => {
        _this.signarr.forEach(function(val,index) {
            if(index<=data.data.ResultData.SignInDays-1){
               val.sign=false
            }
        });
        this.$http(this.$api.getPointTopList({}))
        .then((data) => {
        _this.point = data.data.ResultData.Point
        });
       });
    }

  },
  created:function(){
    let _this =this
    this.$http(this.$api.getTakeCouponList({"Page":1,"PageSize":100}))
    .then((data) => {
       _this.pointstore = data.data.ResultData.List
      });

    if(typeof this.$store.state.user=="undefined"){
        return
      }
    this.$http(this.$api.getPointTopList({}))
    .then((data) => {
      _this.point = data.data.ResultData.Point
      });
    this.$http(this.$api.signToday({}))
    .then((data) => {
       if(data.data.ResultData.IsSign){
        _this.sign = "已签到"
       }else{
         _this.sign = "每日签到"
       }
      });
  },
  components:{

  }
}
</script>


