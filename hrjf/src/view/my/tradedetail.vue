<template>
<div id="frame">
    <div id="con">
        <div class="link_head">
            <h1>
                <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
                {{state.tradedetail.title}}
            </h1>
        </div>
        <div class="mingx">
            <div class="mingxT">
                <p class="mx_tzje">{{state.tradedetail.name}}</p>
                <p class="mx_money">{{state.tradedetail.Variable}}<span>元</span></p>
            </div>

            <div class="mingxM">
                <div class="wordfirst">
                    <span class="wf_le">交易信息</span>
                    <span class="wf_ri">{{state.tradedetail.Variable}}</span>
                </div>

                <div class="wordmid">
                    <span class="wf_le">交易单号</span>
                    <span class="wf_ri">{{state.tradedetail.Reference}}</span>
                </div>

                <div class="wordmid">
                    <span class="wf_le">交易时间</span>
                    <span class="wf_ri">{{state.tradedetail.CreateTime}}</span>
                </div>
                <div class="wordmid">
                    <span class="wf_le">支付摘要</span>
                    <span class="wf_ri">{{state.tradedetail.TradeType}}</span>
                </div>
                <div class="wordmid">
                    <span class="wf_le">交易状态</span>
                    <span class="wf_ri">{{state.tradedetail.TradeStatus}}</span>
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
      state:this.$store.state
    }
  },
  methods:{

  },
  created :function(){
    //console.log(state)
  },
  components:{
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
