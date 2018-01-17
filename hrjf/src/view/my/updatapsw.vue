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
<div id="loginForm">
<div class="forget_box">
        <ul>
            <li class="reg_cont reg_conts">
                <div class="form-group top-group">
                    <span class="left_one" style="width:20%">原密码</span>
                    <input class="newinnput" name="Mobile" placeholder="原密码" type="password" v-model="oldpassword">

                </div>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one" style="width:20%">新密码</span>
                    <input class="duihuang_tex newinnput" type="password" placeholder="设置新密码" v-model="newpassword">
                </div>
            </li>
            <li class="reg_cont reg_conts">
                <div class="form-group">
                    <span class="left_one" style="width:20%">确认密码</span>
                    <input class="duihuang_tex newinnput" type="password" placeholder="确认新密码" v-model="againpassword">
                </div>
            </li>
            <li><a href="javascript:" class="btn" @click="send()">确认提交</a></li>
        </ul>
    </div>
</div>


</div>
</template>

<script>
import ls from '../../store/lStorage.js'
// mounted 钩子函数  这里去请求豆瓣数据
// import api from '../../api/api.js'
export default {
  data () {
    return {
        title:"修改登录密码",
        oldpassword:"",
        newpassword:"",
        againpassword:"",
    }
  },
  methods:{
        send(){
            let _this = this
            if(this.oldpassword==""){
                this.$msg.alert("请输入原密码")
                return
            }
            if(this.newpassword!=this.againpassword){
                this.$msg.alert("新密码不一至")
                return
            }
              this.$http(this.$api.updatapaw({"OrgLoginPassword":this.oldpassword,"NewLoginPassword":this.newpassword,"TerminalType":2}))
                    .then(function(data){
                    if(data.data.ResultCode==100000){
                        ls.clear()
                        _this.$store.commit("userinfo")
                        _this.$store.commit("xjhinfo")
                        _this.$msg.alert("设置新密码成功,请重新登录",function(){
                            _this.$router.push('/login')
                        })
                    }else{
                        _this.$msg.alert(data.data.ResultMessage)
                    }
              })

        }
       }
}
</script>

<style scoped>

</style>
