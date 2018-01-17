<template>
  <div class="container">
    <heads :title="title" ></heads>
    <div class="newslist_box" id="iscroll" :style="{top:haedtop}">
      <ul>
        <li v-for="item in newslist">
            <router-link :to="'/newsdetail?id='+item.Id+'&ver='+ver">
              <div class="block_box">
                  <div class="newsleft">
                    <strong>{{item.Title}}</strong>
                    <p><span class="type">{{item.Category}}</span><span class="day">{{item.PublishTime}}</span></p>
                  </div>
                  <div class="newsright" v-if="item.Icon==''"><img src="static/img/temp/news_img.jpg" alt=""></div>
                  <div class="newsright" v-else><img :src="item.Icon" alt=""></div>
              </div>
            </router-link>
        </li>
        <li style="text-align:center;padding-bottom:0.5rem" v-if="showmoer">{{loaddata}}</li>
      </ul>
    </div>

</div>
</template>

<script>
import heads from '../../components/head';
//import IScroll from 'iscroll/build/iscroll-probe'
import IScroll from 'iscroll'
export default {
  data () {
    return {
      title:'资讯',
      newslist:[],
      haedtop:"1.1rem",
      page:1,
      total:2,
      loaddata:"加载更多数据",
      datamoer:true,
      showmoer:false,
      ver:"wap",
      obj:{
          mouseWheel: true,
          click:this.iScrollClick() ,
          preventDefault: true,
          tap: true,
          bounce: false  ,
          scrollbars : false,
          momentum: true,//惯性滑动
          scrollX : false,
          scrollY : true,
      }
    }
  },
  methods:{
    getdata(){
      let _this = this
      if(this.newslist.length>=this.total){
        _this.loaddata = "没有更多数据"
        _this.datamoer = 0
        _this.myScroll.refresh()
        return
      }
      this.$http(this.$api.getNewsList({"Page":this.page,"PageSize":10}))
      .then((data) => {
        if(data.data.ResultData.Total>0){
          _this.page++;
          _this.total = data.data.ResultData.Total
          for(let i=0;i<data.data.ResultData.List.length;i++){
            _this.newslist.push(data.data.ResultData.List[i])
          }
          _this.loaddata = "加载更多数据"
          if(!_this.datamoer){
          setTimeout(function(){
             _this.datamoer = true;
             _this.myScroll.refresh()
           },300)

          }

        }
        _this.showmoer = true;
      });
    },
    iScrollClick(){
        if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
        if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
        if (/Silk/i.test(navigator.userAgent)) return false;
        if (/Android/i.test(navigator.userAgent)) {
           var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
           return parseFloat(s[0]+s[3]) < 44 ? false : true
          }
    }
  },
  mounted : function() {
      let _this = this;
      setTimeout(function(){
        _this.myScroll = new IScroll(document.getElementById('iscroll'),this.obj);
        _this.myScroll.on('scrollEnd',function(){
          if(this.y<=(this.wrapperHeight-this.scrollerHeight)&&_this.datamoer){
            _this.datamoer = false;
            _this.loaddata = "加载中"
            _this.getdata();

          }
        })
      },300)


  },
  created:function(){
      let _this = this
      let q = this.$route.query
      if(q.ver=='ios'||q.ver=='android'){
        this.haedtop = 0;
        this.ver = q.ver
      }

      this.getdata()
  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>
.newslist_box{
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    overflow: hidden;
    background-color: #F7F7F7;
    width: 100%;
    touch-action: none;
}
.newslist_box li {
 margin-bottom:0.25rem;
 background:$white;
 overflow:hidden;
 padding:rem(10) 0;
 box-sizing:border-box;
a{
  display:block;
  .block_box{
   display:flex;align-items:flex-start;
   .newsleft{
  width:65%;
  margin-left:rem(10);
  strong{
    color:#000;
    font-size:0.4rem;
    height:rem(60);
    display:block;
  }
  p{
    .type{
      color:#f00;
      border-radius:rem(3);
      border:1px solid #f00;
      padding:0 rem(5);
    }
    .day{
      color:#b6b4b5;
      display:inline-block;
      width:auto;
      margin-left:rem(20);
      font-size:0.4rem;
    }
  }
 }
 .newsright{
  width:35%;
  margin-left:rem(10);
  margin-right:rem(10);
  img{
      width:100%;
  }

 }
}
}
}

</style>

