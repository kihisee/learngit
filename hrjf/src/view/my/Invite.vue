<template>
<div id="frame">
    <div id="con">
        <div class="link_head">
            <h1>
                <span><a href="javascript:history.go(-1)" id="showmenu"><img src="static/img/icon_left.png"></a></span>
                个人中心
                <p class="hrcf_topr">
                <router-link to="/activity?title=合伙人计划活动&link=http://mt.hrcf168.com/Theme/PartnerPj" class="text">
                    邀请规则
                </router-link>
            </p>
            </h1>
        </div>
        <div class="per_top">
            <div class="per_money" style="width: auto; padding-right: 25px;">
                <p class="money_top">昨日奖励(元)</p>
                <p class="p_money">{{(basset.YesterDayReward).toFixed(2)}}</p>

            </div>
            <ul class="per_topb">
                <li class="tips_fir">
                    <a href="javascript:">
                        <p style="color: #fff600; ">历史奖励(元)</p>
                        <span style="color:#ffffff;">{{(basset.HistoryReward).toFixed(2)}}</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:">
                        <p style="color: #fff600; ">累计邀请(人)</p>
                        <span style="color:#ffffff;">{{basset.TotalInvitePerson}}</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:">
                        <p style="color: #fff600; ">待收本金(元)</p>
                        <span style="color:#ffffff;">{{basset.TenderMoney}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="invite_p_img">
            <img src="static/img/invite_in.jpg">
            <router-link :to="'/fetcheward?inviteAward='+basset.InviteAward" class="btn">
                兑换奖励
            </router-link>
        </div>
    </div>
</div>
</template>

<script>


export default {
  data () {
    return {
      basset:{
        YesterDayReward:0,
        HistoryReward:0
      }
    }
  },
  created :function(){
    let _this=this

      this.$http(this.$api.getqueryinviterewardasset({}))
        .then(function(data){
          _this.basset=data.data.ResultData
       });
  },
  components:{

  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
