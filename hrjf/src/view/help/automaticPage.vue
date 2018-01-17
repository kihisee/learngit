<template>
<div id="frame">
  <div class="link_head">
    <h1>
        <span>
          <a href="javascript:history.go(-1)"><img src="static/img/icon_left.png"></a>
        </span>
        {{title}}
     </h1>
  </div>

 <div class="guize">
    <div class="gzcont">
        <p class="titlegz">生效说明</p>
        <p class="putong">1、开启关闭均为5分钟生效</p>
        <p class="putong">2、每次发新标的时候，开启自动投标</p>

        <p class="titlegz">排名说明</p>
        <p class="putong">1、按开启自动投标的功能先后顺序排序，先开启的排名靠前</p>
        <p class="putong">2、关闭自动投标功能后重新开启，排名会移到队尾</p>
        <p class="putong">3、编辑自动投标设置，不影响排名</p>
        <p class="putong">4、自动投标成功后，排名自动到队尾</p>

        <p class="titlegz">投标说明</p>
        <p class="putong">1、自动投标的最小金额是100元</p>
        <p class="putong">2、当标的剩余可投金额 < 自动投标设置金额时，不执行自动投标</p>
        <p class="putong">3、账户可用余额 < 每次投资金额，不执行自动投标</p>
        <p class="putong">4、同一标的，每个用户只执行一次</p>
        <p class="putong">5、不支持新手标、APP专属标、微信专属标等</p>
        <p class="putong">6、如果余额保留金额+投标金额>可用余额，不执行自动投标</p>
    </div>

</div>
</div>

</template>

<script>
export default {
  data () {
    return {
      title: '规则说明',
    }
  },

  mounted : function() {

  },
  methods:{

  },
  created:function(){

  },
  components:{

  }
}
</script>
<style scoped>


</style>