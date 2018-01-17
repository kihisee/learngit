<template>
   <div id="frame">
    <div id="con">
          <div class="link_head">
            <h1>
              <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
              {{title}}
            </h1>
          </div>

        <div id="loginForm">
            <div class="forget_box">
                    <ul>
                        <li class="reg_cont reg_conts">
                            <div class="form-group top-group">
                                <span class="left_one" style="width:20%">姓名</span>
                                <input class="newinnput" name="Mobile" placeholder="收货人姓名" type="text" v-model="name">

                            </div>
                        </li>
                        <li class="reg_cont reg_conts">
                            <div class="form-group">
                                <span class="left_one" style="width:20%">手机号</span>
                                <input class="duihuang_tex newinnput" type="text" placeholder="收货人手机" v-model="mobile">
                            </div>
                        </li>
                        <li class="reg_cont reg_conts">
                            <div class="form-group">
                                <span class="left_one" style="width:20%">收货地址</span>
                                <input class="duihuang_tex newinnput" type="text" placeholder="收货地址" v-model="address">
                            </div>
                        </li>
                        <li><a href="javascript:" class="btn" @click="send()">{{submitaddress}}</a></li>
                    </ul>
                </div>
            </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '收货地址',
      name:"",
      mobile:"",
      address:"",
      submitaddress:"保存"
    }
  },
  methods:{
    send(){
       this.$http(this.$api.addAddress({"name":this.name,"mobile_phone":this.mobile,"Address_detail":this.address}))
      .then((data) => {
            if(data.data.ResultData.isTrue){
              _this.name=data.data.ResultData.list.name
              _this.mobile=data.data.ResultData.list.mobile_phone
              _this.address=data.data.ResultData.list.address_detail
              _this.submitaddress="确认修改"
            }
        });
    }
  },
  created:function(){
    let _this =this
    this.$http(this.$api.myAddress({}))
    .then((data) => {
          if(data.data.ResultData.isTrue){
            _this.name=data.data.ResultData.list.name
            _this.mobile=data.data.ResultData.list.mobile_phone
            _this.address=data.data.ResultData.list.address_detail
            _this.submitaddress="确认修改"
          }
      });

  },
  components:{

  }
}
</script>


