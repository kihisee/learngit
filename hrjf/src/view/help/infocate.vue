<template>
<div class="container">
  <heads :title="title"></heads>
  <div class="helplist_box">
    <ul>
      <li v-for="(item,index) in list">
        <div class="row">
           <a herf="javascript:" @click="tabchick(index)">
            {{item.Title}}
          </a>
        </div>
        <ol v-show="showdiv==index">
          <li v-for="(items,indexs) in item.Child"><a herf="javascript:" @click="listpage(index,indexs)">{{items.Title}}</a></li>
        </ol>
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
      title: '信息披露',
      list:'',
      showdiv:0,
      state:this.$store.state,
      ver:"wap"
    }
  },

  mounted : function() {

  },
  methods:{
    tabchick(index){
      this.showdiv = index
    },
    listpage(index,indexs){
      this.$router.push("/infolist?CateId="+this.list[index].Child[indexs].ID+"&ver="+this.ver)
    }
  },
  created:function(){
     let _this=this
     let q = this.$route.query
     if(q.ver=='ios'||q.ver=='android'){
        this.ver = q.ver
    }
     this.$http(this.$api.InfoCate({}))
    .then((data) => {
      if(data.data.ResultCode==100000){
          console.log(data.data.ResultData)
          _this.list = data.data.ResultData
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
.helplist_box ul li .row a:after{content:"";display:block;  border-left: rem(2) solid; border-bottom: rem(2) solid; width: rem(12); height: rem(12); transform: rotate(-45deg);  float:right; margin-top:rem(10);margin-right:rem(10)}
.helplist_box ul li ol li{border-bottom:1px solid #ddd; height:rem(45); line-height:rem(45); padding:0 rem(20); box-sizing:border-box;}
.helplist_box ul li ol li a{font-size:0.45rem; color:#666; display:block; overflow:hidden;}
.helplist_box ul li ol li a:before{content:"";display:inline-block;font-style:normal;background:$gray;border-radius:50%;width:rem(6);height:rem(6);margin-right:rem(10);vertical-align:middle;}
</style>