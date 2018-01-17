<template>
<div class="login_wrap">

    <div class="link_head">
    <h1>
        <span>
            <a href="javascript:history.go(-1);" id="showmenu">
                <img src="static/img/icon_left.png">
            </a>
        </span>
        兑换奖励
    </h1>
</div>
<div>
  <div class="reg_cont reg_contfir">
      <div class="form-group top-group">
          <span class="left_one">可兑换余额</span>
          <input placeholder="可兑换金额" type="text" readonly="readonly" v-model="rewardmoney">
      </div>
  </div>
  <div class="reg_cont">
      <div class="form-group thelast">
          <span class="left_one">兑换金额</span>
          <input class="password"  placeholder="最小兑换金额为100元" v-model="money"  type="text" >
      </div>
  </div>

  <div class="fin_wen">
      <div class="div_zh">
          <a herf="javascript:;" v-on:click="inviteAward()" class="lijitou">立即兑换</a>
      </div>
  </div>

  <div class="fin_wen">
      <div class="subtext">
        <dl>
          <dt>兑换奖励说明</dt>
          <dd>1.邀请奖励兑换后，奖励将于24小时内转到您个人账户的可用余额里</dd>
          <dd>2.您可使用该可用余额进行投资或提现</dd>
          <dd>3.若有疑问，可致电：4008-055-066</dd>
        </dl>
      </div>
  </div>
</div>


</div>
</template>

<script>
export default {
  data () {
    return {
      award:0,
      rewardmoney:0,
      money:""
    }
  },
   methods:{
       inviteAward(){
        let _this=this
        if(this.money==""||this.money<100){
          this.$msg.alert("兑换金额不能为空或小于100")
          return
        }
        if(!this.rewardmoney||this.money>this.rewardmoney){
          this.$msg.alert("兑换金额不能大于可以兑换金额")
          return
        }
          this.$http(this.$api.changeinvitereward({"Money":this.moeny}))
            .then((data) => {
              console.log(data)
              this.$msg.alert("兑换成功")
            });
       }
  },
  created:function(){
    let _this = this
    this.rewardmoney = this.$route.query.inviteAward
  }
}
</script>


