<template>
  <div class="container">
    <heads :title="title" ></heads>
    <div class="newsdatil_box">
      <div class="title">{{newsdetail.Title}}</div>
      <div class="newsinfo"><p><span class="type" v-if="showborder">{{newsdetail.Category}}</span><span class="day">{{newsdetail.PublishTime}}</span></p></div>
      <div class="newscontent" v-html="newsdetail.Content"></div>
    </div>

</div>
</template>

<script>
import heads from '../../components/head';

export default {
  data () {
    return {
      title:'资讯详情',
      newsdetail:"",
      showborder:false
    }
  },
  methods:{
    getdata(){
      let _this = this
      let q = this.$route.query
      this.$http(this.$api.getNewsDetail({"Id":q.id}))
      .then((data) => {
        _this.newsdetail = data.data.ResultData
        _this.showborder = true;
      });
    }
  },
  mounted : function() {
      let _this = this;


  },
  created:function(){
      this.getdata()
  },
  components:{
    heads
  }
}
</script>
<style>
  .newscontent p{font-size:0.4rem!important;margin-top:0.25rem!important;}
  .newscontent img{width:100%!important;height:auto!important;}
</style>
<style lang="scss" scoped>
.newsdatil_box{
    padding:rem(20);
    box-sizing:border-box;
    background:$white;
    overflow:hidden;
    .title{
      font-size:0.45rem;
      font-weight:bold;
    }
    .newsinfo{
        p{
          margin-top:rem(20);
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
    .newscontent{
      margin-top:rem(20);
    }
}

</style>

