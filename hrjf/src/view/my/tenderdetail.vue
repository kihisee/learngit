<template>
<div id="frame">
    <div id="con">
        <div class="link_head">
            <h1>
                <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
                {{title}}
            </h1>
        </div>
        <div class="mingx">
            <div class="mingxT">
                <p class="mx_tzje" style="font-size:0.5rem">{{tendetaildata.TenderName}}</p>
                <p class="mx_money"><span>待收益：</span>{{(tendetaildata.TenderProfit*tendetaildata.IsDouble).toFixed(2)}}<span>元</span></p>
            </div>

            <div class="mytenderdetaillist_one">
                <ul>
                    <li class="f3"><span>投资金额</span><span>{{tendetaildata.PrepayMoney}}元</span></li>
                    <li><span>年化收益</span><span>{{tendetaildata.TenderFee*100}}%</span></li>
                    <li class="f3"><span>投资期限</span><span>{{tendetaildata.UserDay}}</span></li>
                    <li><span>还款方式</span><span>{{tendetaildata.TenderWay}}</span></li>
                    <li class="f3"><span>起息时间</span><span>{{tendetaildata.StartTime}}</span></li>
                    <li><span>到息时间</span><span>{{tendetaildata.EneTime}}</span></li>
                </ul>
            </div>
            <div class="mytenderdetaillist_tow">
                <h1>还款明细</h1>
                <ul>
                    <li v-for="item in feelist"><span>{{item.LastTime}}</span><span>{{item.FeeStatus}} {{item.Money}}元</span></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>



export default {
  data () {
    return {
      title:"交易详情",
      tendetaildata:[],
      feelist:[]
    }
  },
  methods:{

  },
  created :function(){
    let _this = this
    this.query = this.$route.query
    this.$http(this.$api.getquerymytenderdetail({"OrderCode":this.query.ordercode}))
      .then((data) => {
        _this.feelist=data.data.ResultData.FeeList
        _this.tendetaildata=data.data.ResultData.TenderDetail
      });
  },
  components:{
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
