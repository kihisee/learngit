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
          <div class="tab_divdgx" v-for="(item,index) in datalist" :class="{tab_divdgxs:item.MessageStatus==3}" @click="msgfun(index)">
                <a href="javascript:" class="a_lianjie">
                    <dl class="tab_dlgx f16">
                        <dt>
                            <p class="tab_leftp">
                                <i></i>{{item.MessageName}}
                            </p>
                            <span class="dlSpangx">{{item.SendTime.substr(0,10)}}</span>
                        </dt>
                        <dd>
                        <span style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis; width:95%;display:block">{{item.MessageContent}}</span>

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
      title:"消息中心",
      tradetype:1,
      datalist:[],
      page:1,
      state:this.$store.state,
    }
  },
  methods:{
    msgfun(index){
      this.state.msg=this.datalist[index]
      this.$http(this.$api.updatamessage({"id":this.state.msg.Id}))
      .then((data) => {
        console.log("消息已读")
        this.$router.push('/msgdetail')
      });
    },
    scroll(){
         let _this=this;
          if(document.body.scrollHeight - window.screen.height*dpr - document.body.scrollTop <= 0) {
           this.page++
           this.getdata()
          }

      },
    getdata(){
        let _this=this;
       this.$http(this.$api.getmsglist({"MessageContentType":this.tradetype,"Page":this.page,"PageSize":10}))
      .then((data) => {
        if(data.data.ResultData.List.length!=0){
            for(var i=0;i<data.data.ResultData.List.length;i++){
                _this.datalist.push(data.data.ResultData.List[i])
             }
        }

      });
    }
  },
  created :function(){
    this.getdata()
    window.addEventListener('scroll', this.scroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
  },
  components:{
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
