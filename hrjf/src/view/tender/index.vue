<template>
  <div class="containerNav">
    <div class="box" v-for="(item,index) in tenderlist">
        <router-link :to="'/tenderdetail?plan='+item.plan_use_day">
        <div class="title">{{item.plan_name}}</div>
        <div class="clear">
          <div class="left nhl">
             <div v-if="item.maxfee==0"><span><strong>{{(item.minfee*100).toFixed(1).split('.')[0]}}</strong>.{{(item.minfee*100).toFixed(1).split('.')[1]}}%</span></div>
             <div v-else><span><strong>{{(item.minfee*100).toFixed(1).split('.')[0]}}</strong>.{{(item.minfee*100).toFixed(1).split('.')[1]}}%~<strong>{{(item.maxfee*100).toFixed(1).split('.')[0]}}</strong>.{{(item.maxfee*100).toFixed(1).split('.')[1]}}%</span></div>
             <p>预计年化利率</p>
          </div>
          <div class="right money">
              <span><strong>{{item.remain_possable_money}}</strong>元可投</span>
              <p v-if="item.plan_type==1"><i>加息券</i><i>投资券</i></p>
          </div>
        </div>
        </router-link>
    </div>
  <globlenav></globlenav>
</div>
</template>

<script>
import globlenav from '../../components/nav';
export default {
  data () {
    return {
      tenderlist:'',
    }
  },
  methods:{

  },
  created:function(){
      let _this = this

      this.$http(this.$api.getQueryPlanList({"Page":1,"PageSize":10}))
      .then((data) => {
        _this.tenderlist = data.data.ResultData.List
        console.log(data.data.ResultData.List)
      });

  },
  components:{
    globlenav
  }
}
</script>
<style lang="scss" scoped>
.box {
 margin-bottom:0.25rem;
 background:$white;
 padding:0.35rem 0.4rem;
 box-sizing:border-box;
 .title{
   @include sizeColor(0.45rem,$black);
   border-bottom:1px $gray dashed;
   padding-bottom:0.25rem
 }
 .clear{
  .nhl{
    margin-top:0.25rem;
    text-align:center;
    width:40%;
    span{
      @include sizeColor(0.4rem,$orange)
      strong{font-size:0.8rem}
    }
    p{color:$gray;}
  }
  .money{
    width:45%;
    margin-right:0.25rem;
    margin-top:0.45rem;
    span{
      @include sizeColor(0.4rem,$gray)
      strong{@include sizeColor(0.5rem,$orange)}
    }
    p{
      color:$gray;
      i{
        width:rem(60);
        display:inline-block;
        font-size:rem(12);
        text-align:center;
        margin-right:0.25rem;
        font-style:normal;
        margin-top:rem(5);
        color:$orange;
        @include bg("/static/img/tender/coupon_bg.png")
      }
    }
  }
 }
}

</style>

