<template>
<div id="frame">
  <div class="link_head">
      <h1>
                <span><a href="javascript:history.go(-1)" id="showmenu"><img src="static/img/icon_left.png"></a></span>
                {{title}}
                <p class="hrcf_topr">
                <router-link to="/automaticPage" class="text">
                    规则
                </router-link>
            </p>
            </h1>
  </div>
  <div class="xjh" style="margin-bottom:0;">

    <div class="box autotender_box"  style="margin-bottom:0;">
        <ul class="sublist">
          <li>
            <span>自动投标</span>
            <section class="model-5">
              <div class="checkbox">
                <input type="checkbox" v-model="checkbox"  @click="ischeckbox()">
                <label></label>
              </div>
            </section>
          </li>
        </ul>
    </div>
  </div>

  <div class="xjh" style="padding-top:0.25rem;margin-bottom:0.125rem" v-if="checkbox">
    <div class="box autotender_box2">
      <ul  class="sublist">
        <li v-for="(item,index) in tenderlist"  @click="isradio(index)"><input type="radio" name="radio" :checked="item.checke" /><span>{{item.text}}</span></li>
      </ul>
    </div>

    <div class="box autotender_box3"  v-if="checkbox">
      <div class="sublist">
        <ul>
          <li>
            <span class="title">每次投标金额</span>
            <input type="input" class="input" :placeholder="'当前剩余可用余额'+state.basset.Balance"  v-model="money"/>
            <span class="text">元</span>
          </li>
          <li>
            <span class="title">余额保留金额</span>
            <input type="input" class="input" placeholder="请输入保留金额"  v-model="spmoney"/>
            <span class="text">元</span>
          </li>
        </ul>
      </div>
    </div>

  </div>
  <div class="autotendersub" v-if="checkbox">
    <p><span>自动投标：</span>根据您设置的条件进行匹配投资(不支持新手标，APP专属标，微信专属标等)</p>
    <p class="xy"><input type="checkbox" :checked="xieyi" @click="isxieyi()" /><router-link to="/automaticagreement" class="yl">《自动投标协议》</router-link></p>
    <p class="btn"><a href="JavaScript:" class="btn" @click="checkxieyi()">保存设置</a></p>
  </div>

</div>

</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      title: '自动投标',
      state:this.$store.state,
      money:"",
      spmoney:"",
      isautomatic:false,
      checkbox:false,
      ridaoindex:1,
      xieyi:true,
      tenderlist:[
        {text:"1月标 年化利率：9.0%~10.0%",checke:true},
        {text:"3月标 年化利率：12.0%",checke:false},
        {text:"6月标 年化利率：13.5%",checke:false},
        {text:"12月标 年化利率：14.5%",checke:false},
        {text:"3~6月标 年化利率：12.0%~13.5%",checke:false},
        {text:"3~12月标 年化利率：12.0%~14.5%",checke:false},
        {text:"6~12月标 年化利率：13.5%~14.5%",checke:false},
        {text:"全部标的 年化利率：9.0%~14.5%",checke:false},
      ]
    }
  },
  methods:{
    ischeckbox(){
      let _this = this
        if(this.checkbox){
              if(_this.isautomatic){
                  _this.$msg.confirm("是否关闭自动投标？",function(){
                      _this.checkxieyi()
                  },function(){
                    _this.checkbox = true;
                  })
              }

        }

    },
    checkxieyi(){
      let _this = this
      if(this.ridaoindex==0&&this.checkbox){
         _this.$msg.alert("请选择自动投标年化率！")
        return
      }
      if(this.money==""&&this.checkbox){
        _this.$msg.alert("请输入每次投标金额")
        return
      }
      if(this.spmoney==""&&this.checkbox){
        _this.$msg.alert("请输入保留金额")
        return
      }
      if(!this.xieyi&&this.checkbox){
        _this.$msg.confirm("同意自动投标协议",function(){
          _this.isxieyi();
          _this.AutoMatic();
        })
      }else{
        _this.AutoMatic();
      }
    },
    AutoMatic(){
      let number =null
      let obj;
      let _this = this
      if(this.checkbox){
        number = 1
        obj = {"IsAutoMatic":number,"tenderType":this.ridaoindex,"money":this.money,"retainMoney":this.spmoney}
      }else{
        number = 0
        obj = {"IsAutoMatic":number}
      }
      this.$http(this.$api.setTenderAutoMatic(obj))
      .then((data) => {
        if(data.data.ResultCode==100000){
          if(_this.checkbox == false){
            _this.$msg.alert("关闭自动投标成功！",function(){
              _this.isautomatic = false;
            })
          }else{
            _this.$msg.alert("保存成功！",function(){
              _this.isautomatic = true;
            })
          }
        }else{
          _this.$msg.alert(data.data.ResultMessage)
        }

      });
    },
    isradio(index){
      this.ridaoindex =index+1
      this.tenderlist.forEach(function(val,i){
        val.checke=false;
        if(index==i){
          val.checke=true;
        }
      });
    },
    isxieyi(){
      this.xieyi=!this.xieyi
    }
  },
  created:function(){
       let _this = this
       this.$http(this.$api.getQueryAutoMaticList({}))
       .then((data) => {
        console.log(data.data.ResultData)
         if(data.data.ResultData.IsAutoMatic==1){
          _this.money=data.data.ResultData.money
          _this.spmoney=data.data.ResultData.retainMoney
          _this.checkbox=true
          _this.isautomatic=true;
          _this.ridaoindex = data.data.ResultData.tenderType
          _this.tenderlist[data.data.ResultData.tenderType-1].checke=true
         }
       });

  },
  components:{
  }
}
</script>