<template>
<div class="login_wrap">

    <div class="link_head">
    <h1>
        <span>
            <a href="javascript:history.go(-1);" id="showmenu">
                <img src="static/img/icon_left.png">
            </a>
        </span>
        {{title}}
    </h1>
</div>
<div v-if="isBindBanklist">
<div class="bank_namag">
    <ul>
        <li>
            <ul>
                <li>
                    <div class="card-list">
                        <i :class="bankstyle"></i>
                        <span class="word">
                            <span>{{bankname}}</span>&nbsp;尾号（{{bankecode}}）
                        </span>

                    </div>
                </li>
            </ul>
        </li>
    </ul>
</div>
<p class="warm-tip">温馨提示：为提高您的资金安全性，现已不能删除和变更提现银行卡，如您确需变更，请联系客服热线：4008-055-066。</p>
</div>
<div class="add-card" v-if="isBindBank">
        <router-link :to="'/addbank'">
            <p>
                添加银行卡
            </p>
        </router-link>
</div>


</div>
</template>

<script>
export default {
  data () {
    return {
        title:"绑定银行卡",
        isBindBank:false,
        isBindBanklist:false,
        bankname:"",
        bankecode:"",
        bankstyle:""
    }
  },
  methods:{
  },
  created :function(){
    let _this =this
    let bankname = [
    {bankname:"邮政储蓄",bankstyle:"bank-psbc"},
    {bankname:"浦发银行",bankstyle:"bank-spdb"},
    {bankname:"民生银行",bankstyle:"bank-cmbc"},
    {bankname:"招商银行",bankstyle:"bank-cmb"},
    {bankname:"建设银行",bankstyle:"bank-ccb"},
    {bankname:"广发银行",bankstyle:"bank-gdb"},
    {bankname:"平安银行",bankstyle:"bank-pab"},
    {bankname:"工商银行",bankstyle:"bank-icbc"},
    {bankname:"华夏银行",bankstyle:"bank-hxb"},
    {bankname:"农业银行",bankstyle:"bank-abc"},
    {bankname:"兴业银行",bankstyle:"bank-cib"},
    {bankname:"光大银行",bankstyle:"bank-cebb"},
    {bankname:"交通银行",bankstyle:"bank-boco"},
    {bankname:"中信银行",bankstyle:"bank-ecitic"},
    {bankname:"中国银行",bankstyle:"bank-china"},
    ]
    this.$http(this.$api.getquerytenderbankcardlist({}))
      .then((data) => {
        if(data.data.ResultData.List.length==0){
            _this.isBindBank=true;
            _this.isBindBanklist=false
            console.log(data.data.ResultData)
        }else{

            let bankdata = data.data.ResultData.List
                    bankdata.forEach(function(value) {
                        if(value.BankCardType==2){
                            _this.isBindBank=false;
                            _this.isBindBanklist=true
                            _this.bankname=data.data.ResultData.List[0].BankName
                            let cardno = data.data.ResultData.List[0].CardNo
                            _this.bankecode=cardno.substr(cardno.length-4,cardno.length)
                            bankname.forEach(function(value) {
                                if(value.bankname==data.data.ResultData.List[0].BankName){
                                    _this.bankstyle=value.bankstyle
                                }
                            });
                        }else{
                            _this.isBindBank=true;
                            _this.isBindBanklist=false
                        }
                    });


        }
      });
  },
}
</script>

<style scoped>

</style>
