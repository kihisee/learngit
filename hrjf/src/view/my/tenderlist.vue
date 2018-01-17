<template>
<div id="frame">
    <div id="con">
        <div class="link_head">
            <h1>
                <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
                {{title}}
            </h1>
        </div>
        <div class="tradelistnav">
            <ul>
                <li :class="{active:classIndex == 0}" @click="tabClick(0)"><span>持有中</span></li>
                <li :class="{active:classIndex == 1}" @click="tabClick(1)"><span>投资中</span></li>
                <li :class="{active:classIndex == 2}" @click="tabClick(2)"><span>已结束</span></li>
            </ul>
        </div>
        <div class="mytenderlist">
            <ul>
                <li v-for="(item,index) in datalist"  @click="addClassFun(index)">
                      <div class="title_box">
                        <div class="title">{{item.TenderName}}</div>
                        <div class="time"  v-if="classIndex==0"><i></i>还剩余{{item.Day}}天</div>
                      </div>
                      <div class="mytender_main">
                        <dl>
                          <dt>投资金额</dt>
                          <dd>{{item.PrepayMoney}}</dd>
                        </dl>
                        <dl>
                          <dt>待收收益</dt>
                          <dd>{{(item.Money*item.IsDouble).toFixed(2)}}</dd>
                        </dl>
                        <dl>
                          <dt>投资时间</dt>
                          <dd>{{item.PrepayDateTime}}</dd>
                        </dl>
                      </div>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>



export default {
  data () {
    return {
      title:"我的标的",
      classIndex:0,
      tradetype:1,
      datalist:[],
      page:1,
      type:0
    }
  },
  methods:{
    tabClick(type){
        if(type==0){
            this.tradetype=1
        }else{
            this.tradetype=type
        }
        this.classIndex=type
        this.type=type;
        this.init();
        this.getdata();
    },
    addClassFun(index){
        if(this.classIndex==0){
          this.$router.push('/mytenderdetail?ordercode='+this.datalist[index].OrderCode)
        }
    },
    init(){
        this.page=1;
        this.datalist=[];
    },
    scroll(e){
         let _this=this;
          if(document.body.scrollHeight - window.screen.height*dpr - document.body.scrollTop <= 0) {
           this.page++
           this.getdata()
          }

      },
    getdata(){
        let _this=this;
        let api
        if(this.type==0||"undefined"){
            api=this.$api.getquerymytenderinthislist;
            this.tradetype==1
        }
        if(this.type==1){
            api=this.$api.getquerymytenderprepaylist;
        }
        if(this.type==2){
            api=this.$api.getquerymytenderinthislist;
            this.tradetype==2
        }
       this.$http(api({"TenderStatus":this.tradetype,"Page":this.page,"PageSize":10}))
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
    if(this.$route.query.index){
      this.type=1
      this.classIndex=1
    }
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
