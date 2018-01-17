<template>
<div class="container">
  <heads :title="title"></heads>
  <div class="helplist_box">
    <ul>
      <li v-for="(item,index) in list">
        <div class="row">
            <router-link :to="'/helpdetail?id='+item.Id+'&ver='+ver" v-if="item.Title.length>17">
              {{item.Title.substr(0,17)}}...
            </router-link>
            <router-link :to="'/helpdetail?id='+item.Id+'&ver='+ver" v-else>
              {{item.Title}}
            </router-link>
        </div>
      </li>
    </ul>
  </div>
</div>

</template>

<script>
import heads from '../../components/head';
export default {
  data () {
    return {
      title: '帮助中心',
      list:'',
      showdiv:0,
      state:this.$store.state,
      ver:"wap"
    }
  },

  mounted : function() {

  },
  methods:{

  },
  created:function(){
     let _this=this
     let q = this.$route.query
     if(q.ver=='ios'||q.ver=='android'){
        this.ver = q.ver
      }
     this.$http(this.$api.HelpList({"CateId":q.CateId}))
    .then((data) => {
      if(data.data.ResultCode==100000){
          _this.list = data.data.ResultData.List
          console.log(_this.list)
      }else{
        _this.$msg.alert(data.data.ResultMessage)
      }

  });
  },
  components:{
    heads
  }
}
</script>
<style lang="scss" scoped>
.helplist_box ul{overflow:hidden; }
.helplist_box ul li .row{background:#ffffff; border-bottom:1px solid #ddd; height:rem(45); line-height:rem(45); padding:0 rem(20); box-sizing:border-box;}
.helplist_box ul li .row a{font-size:0.45rem; color:#666; display:block; overflow:hidden;}
.helplist_box ul li .row a:after{content:"";display:block;  border-right: rem(2) solid; border-bottom: rem(2) solid; width: rem(12); height: rem(12); transform: rotate(-45deg);  float:right; margin-top:rem(15);margin-right:rem(10)}
</style>