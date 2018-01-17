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
                <li :class="{active:classIndex == 0}" @click="tabClick(0)"><span>交易明细</span></li>
                <li :class="{active:classIndex == 1}" @click="tabClick(1)"><span>充值记录</span></li>
                <li :class="{active:classIndex == 2}" @click="tabClick(2)"><span>提现记录</span></li>
            </ul>
        </div>
        <div class="jilv">
            <ul id="content">
                <li v-for="(item,index) in datalist" :class="{li_act:index==classlist}" @click="addClassFun(index)">
                    <dl>
                        <dt>{{item.CreateTime.substr(10,16)}}<span></span></dt>
                        <dd>
                            <router-link :to="'/tradedetail'">
                                <p class="dp_left">
                                    <span class="tx_bank" v-if="classIndex!=2">{{item.TradeType}}</span>
                                    <span class="tx_bank" v-else>{{item.TradeStatus}}</span>
                                    <span class="tx_date">{{item.CreateTime.substr(0,10)}}</span>
                                </p>
                                <p class="dp_ri" v-if="classIndex!=2">{{item.Variable}}</p>
                                <p class="dp_ri" v-else>{{item.Amount}}</p>
                            </router-link>
                        </dd>
                    </dl>
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
      title:"交易明细",
      classIndex:0,
      tradetype:-1,
      datalist:[],
      page:1,
      classlist:-1
    }
  },
  methods:{
    tabClick(type){
        if(type==0){
            this.tradetype=-1
        }else{
            this.tradetype=type
        }
        this.classIndex=type;
        this.init();
        this.getdata(type);
    },
    addClassFun(index){
        let obj = this.datalist[index];
        let title = ["交易详情","充值详细","提现详细"]
        let name = ["交易金额","充值金额","提现金额"]
        this.classlist = index;
        obj.title=title[this.classIndex]
        obj.name=name[this.classIndex]
        if(this.classIndex==2){
            obj.Variable=obj.Amount;
            obj.Reference = obj.TradeCode
            obj.TradeType = obj.TradeStatus
        }
        this.$store.commit("tradedetail",obj)
    },
    init(){
        this.page=1;
        this.datalist=[];
        this.classlist=-1
    },
    scroll(e){
         let _this=this;
          if(document.body.scrollHeight - window.screen.height*dpr - document.body.scrollTop <= 0) {
           this.page++
           this.getdata()
          }

      },
    getdata(type){
        let _this=this;
        let api
        console.log(type)
        if(type==0||"undefined"){
            api=this.$api.queryAccountTradeLog;
        }
        if(type==1){
            api=this.$api.queryrechargelog;
        }
        if(type==2){
            api=this.$api.queryfetchmoneyLog;
        }
       this.$http(api({"Day":-1,"TradeType":this.tradetype,"Page":this.page,"PageSize":10}))
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
