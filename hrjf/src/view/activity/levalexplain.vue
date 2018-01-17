<template slot-scope="sss">
  <div class="allcontent">
    <div class="topcontent">
      <div class="topleval">
        <p class="toplevalleft">
          我的等级：{{Level}}
        </p>
        <p class="toplevalright">
          {{NextLevel}}<span v-if="isover">(下一等级)</span>
        </p>
      </div>
      <div class="jingdu"  v-if="isover">
        <div class="limian" ref="limian"></div>
      </div>

      <div class="toplevelbot">
       <p><span>{{presentPoint}}</span>万元/<span>{{LevelNeedPay}}</span>万元 待收本金 </p>  <span class="circlewen" @click="circleque()">?</span>
      </div>
    </div>

    <div class="midcontent">
       <p class="midtext">会员等级说明</p>
       <ul>
         <li>
           <p>会员等级</p>
           <p>待收金额（元）</p>
         </li>
         <li>
           <p>普通会员</p>
           <p>≥0</p>
         </li>
         <li>
           <p>白银会员</p>
           <p>≥1万</p>
         </li>
         <li>
           <p>黄金会员</p>
           <p>≥5万</p>
         </li>
         <li>
           <p>铂金会员</p>
           <p>≥20万</p>
         </li>
         <li>
           <p>白钻会员</p>
           <p>≥50万</p>
         </li>
         <li>
           <p>黑钻会员</p>
           <p>≥200万</p>
         </li>
       </ul>
    </div>

    <div class="levalbot">
      <p class="bold">会员有效期：</p>
      <p>会员有效期为120天，到期后根据当前固定理财待收金额重新计算会员级别。 </p>
      <a class="rightnow" @click="touzi()">立即投资</a>
    </div>
  </div>
</template>

<script>
import ls from '../../store/lStorage.js'
export default {
  data () {
    return {
      state:this.$store.state,
      Level:'',
      LevelNeedPay:'',
      NextLevel:'',
      NeedPoint:'',

      isover:true,

      presentPoint:0,

      persent:0,
    }
  },
  methods:{
    touzi(){
    let query = this.$route.query
        if(typeof query.ver=="undefined"){//微信打开

        }else{
            if(query.ver=='ios'){//ios打开
                 window.webkit.messageHandlers.Method.postMessage({ "type": "financing" });
              }else if(query.ver=='android'){//android打开
                  android.financing();
              }
        }
    },
  circleque(){
     let _this = this
    _this.$msg.alert("截至昨日24点个人账户中固定理财待收本金，不含活动体验金和活期宝")
  }


  },
  created:function(){
    let _this = this
    let query = this.$route.query
    if(_this.$lg.applogin()){
    this.$http(this.$api.LevelUpNeedPay({}))
    .then((data) => {
      console.log(data)
      _this.Level=data.data.ResultData.Level
      _this.NextLevel=data.data.ResultData.NextLevel
      if(_this.NextLevel=="已满级"){
        _this.isover=false
      }
      _this.LevelNeedPay=data.data.ResultData.LevelNeedPay/10000
      _this.presentPoint=((data.data.ResultData.Money)/10000).toFixed(2)
      _this.persent=parseInt(_this.presentPoint*100/_this.LevelNeedPay)
      _this.$refs.limian.style.width=_this.persent+"%"
    })
    }

  },

}
</script>


<style lang="scss" scoped>
.allcontent{background:#fff;padding:rem(15) 0;min-height:rem(680)}
.topcontent{width:90%;margin:0 auto;}
.topcontent .topleval{line-height: rem(40);font-size:rem(16);color:#000;height:rem(40)}
.topcontent .topleval .toplevalleft{float:left;width:50%;}
.topcontent .topleval .toplevalright{float:right;width:50%;text-align:right;}
.topcontent .topleval .toplevalright span{font-size:rem(14);color:#808080;}
.topcontent .jingdu{width:100%;height:rem(8);border-radius:rem(5);background:#bfbfbf;}
.topcontent .jingdu .limian{width:0%;height:rem(8);border:rem(5);background:#de3031;border-radius:rem(5);transition:width 1s;-moz-transition:width 1s; /* Firefox 4 */
-webkit-transition:width 1s; /* Safari and Chrome */
-o-transition:width 1s; /* Opera */}
.topcontent .toplevelbot{line-height:rem(35);height:rem(35)}
.topcontent .toplevelbot p{width:auto;float:left;margin-right:rem(10)}
.topcontent .toplevelbot span{color:#de3031}
.topcontent .toplevelbot span.circlewen{float:left;width:rem(15);height:rem(15);line-height:rem(15);border-radius:50%;border:rem(1) solid #5cb4ff;color:#5cb4ff;text-align:center;margin-top:rem(10);display:block;}
.allcontent .midcontent{width:90%;margin:0 auto;text-align:center;}
.allcontent .midcontent .midtext{font-size:rem(18);color:#000;line-height:rem(40)}
.allcontent .midcontent ul{border:rem(1) solid #ababab;border-bottom:none;}
.allcontent .midcontent ul li{border-bottom:rem(1) solid #ababab;height:rem(40);width:100%;}
.allcontent .midcontent ul li p{width:49%;float:left;color:#606060;font-size:rem(16);line-height:rem(40)}
.allcontent .midcontent ul li p:first-child{border-right:rem(1) solid #ababab;height:rem(40)}
.allcontent .midcontent ul li:first-child{background:#b3b2b2}
.allcontent .midcontent ul li:first-child p:first-child{border-right:none;}
.allcontent .midcontent ul li:first-child p{color:#fff;}
.allcontent .levalbot{width:90%;margin:0 auto;}
.allcontent .levalbot .bold{font-weight:bold;line-height:rem(40);font-size:rem(16);color:#000;}
.allcontent .levalbot p{color:#696969;font-size:rem(14);line-height:rem(30)}

.allcontent  .rightnow{width:80%;height:rem(50);line-height:rem(50);background:#e7473f;color:#fff;margin:rem(10) auto;border-radius:rem(10);display:block;text-align:center;font-size:rem(16)}
</style>