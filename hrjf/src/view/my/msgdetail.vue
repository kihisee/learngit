<template>
<div id="frame">
    <div id="con">
        <div class="link_head">
            <h1>
                <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
                {{title}}
            </h1>
        </div>
        <div class="tab_bot">
          <div class="tab_divdgx tab_divdgxdd">
            <a href="javascript:" class="a_lianjie">
                <dl class="tab_dlgx">
                    <dt>
                        <p class="tab_leftps f16"><i></i>{{state.msg.MessageName}}</p>
                        <span class="dlSpangxs">{{state.msg.SendTime.substr(0,10)}}</span>
                    </dt>
                    <dd class="nobac">
                        {{state.msg.MessageContent}}
                    </dd>
                </dl>
            </a>
        </div>
      </div>

    </div>
</div>
</template>

<script>



export default {
  data () {
    return {
      title:"消息详细",
      state:this.$store.state,
    }
  },
  methods:{


  },
  created :function(){
  },
  components:{
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
