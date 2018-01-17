<template>
   <div id="frame">
    <div id="con" style="text-align:left">
      <div class="link_head">
      <h1>
          {{title}}
       </h1>
    </div>
    <div class="pointStoreList">
      <h1><router-link :to="'/storelist'"><span>积分商城</span><i class="grayright"></i></router-link></h1>
      <div class="iscrollcss" ref="poin">
         <div :style="{width:pointWidth+'rem'}">
        <ul>
        <li v-for="(item,index) in points" @click="store(index)">
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

        <li class="more">
            <router-link :to="'/storelist'">查看更多</router-link>
        </li>
      </ul>
      </div>
      </div>
    </div>
    <div class="pointStoreList" style="margin-top:0.25rem">
      <h2><router-link :to="'/activitylist'"><span>热门活动</span><i class="grayright"></i></router-link></h2>
      <div class="activitysbanner" v-for="item in activitys">
          <router-link :to="'/activity?title='+item.Title+'&link='+item.Href"  v-if="!isWeiXin">
              <div class="activity_box">
                  <img :src="item.Img" alt="">
                <div class="bg" v-if="item.ActivityStatus==3"></div>
                <div class="icon" v-if="item.ActivityStatus==3"></div>
              </div>
          </router-link>
          <a :href="item.Href" v-else>
              <div class="activity_box">
                  <img :src="item.Img" alt="">
                <div class="bg" v-if="item.ActivityStatus==3"></div>
                <div class="icon" v-if="item.ActivityStatus==3"></div>
              </div>
          </a>
      </div>
      <div class="activitysmreo">
        <router-link :to="'/activitylist'">
          --查看往期更多活动--
        </router-link>
      </div>
    </div>
    </div>
    <globlenav></globlenav>
  </div>
</template>

<script>
import globlenav from '../../components/nav';
import IScroll from 'iscroll'
export default {
  data () {
    return {
      title: '发现',
      state:this.$store.state,
      pointWidth:20,
      points:[],
      activitys:[],
      isWeiXin:false
    }
  },
  mounted : function() {
      this.myScroll = new IScroll(this.$refs.poin, {
          mouseWheel: true,
          click: false,
          preventDefault: true,
          tap: false,
          bounce: false,
          disableMouse: false,
          disablePointer: true,
          disableTouch: false,

          freeScroll : true,
          scrollX : true,
          scrollY : true,
    });
  },
  methods:{
    store(index){
      this.$store.commit("storedetail",this.points[index])
      this.$router.push('/storedetail')
    }
  },
  created:function(){
    let _this =this
    var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
       this.isWeiXin = true;
      }else{
        this.isWeiXin = false;
      }
    this.$http(this.$api.getTakeCouponList({"Page":1,"PageSize":4}))
    .then((data) => {
      _this.points = data.data.ResultData.List
      });
    this.$http(this.$api.getActivitys({"Page":1,"PageSize":5}))
    .then((data) => {
      _this.activitys = data.data.ResultData.List
      console.log(_this.activitys)
      });
  },
  components:{
    globlenav
  }
}
</script>


