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
<div class="phone_bind">
        <ul class="reg_cont">
            <li class="form-group top-group">
                <span class="left_one">登录密码</span>
                <input class="duihuang_tex newinnput" type="password" placeholder="请输入登录密码！" v-model="password">
            </li>


        </ul>
        <div class="next" style="width:83%;"><a href="javascript:" id="nextBtn" @click="unbind()">确定</a></div>
    </div>


</div>
</template>

<script>
import ls from '../../store/lStorage.js'
export default {
  data () {
    return {
      title:"解绑微信账号",
      state:this.$store.state,
      password:"",
    }
  },
   methods:{

   unbind(){
    let _this=this

    this.$http(this.$api.ajaxwxunbind({"Token":this.password}))
      .then((data) => {
          if(data.data.ResultCode==100000){
              _this.$msg.alert("解绑微信账号成功",function(){
                  _this.$router.push('/my')
              })
          }else{
              _this.$msg.alert(data.data.ResultMessage)
          }
      });
   }
  },
  created:function(){

  },
  components:{
  },
}
</script>


