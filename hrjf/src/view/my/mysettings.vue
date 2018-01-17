<template>
<div id="frame">
    <div id="con">
        <div class="link_head">
            <h1>
                <span>
               <!--  <a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png">
                </a> -->
                <router-link :to="'/my'">
                    <img src="static/img/icon_left.png">
                </router-link>
                </span>
                {{title}}
            </h1>
        </div>
        <div class="per_topzh">
                <img src="static/img/person_head.png" class="leftimg">
                <div class="per_moneyzh">
                    <p class="money_topzh">{{user.UserName.substr(0,1)}}**{{user.UserName.substr(4,6)}}</p>
                    <p class="p_moneyzh">{{user.MobilePhone.substr(0,3)}}****{{user.MobilePhone.substr(7,11)}}</p>

                </div>
        </div>
        <div class="accont_conzh">
          <ul>
              <li>
              <router-link :to="'/setphone'"  class="my_telphone">
                    <i></i>
                    绑定手机
                    <span>重新绑定</span>
                </router-link>
              </li>
          </ul>
          <ul>
            <li>
            <router-link :to="'/updatapsw'"  class="my_pass">
                  <i></i>
                  登录密码
                  <span>修改密码</span>
              </router-link>
            </li>
            <li>
            <router-link :to="'/setpaypsw'"  class="my_pay">
                  <i></i>
                  交易密码
                  <span>{{ispaypassword}}</span>
              </router-link>
            </li>
       <li class="bind_weixin" v-if="!isweixin">
                <a href="javascript:" class="my_weixin" style="background:none;" @click="bindweixin()">
                    <i></i>
                    绑定微信
                    <span :class="{active:isweixin}"></span>

                </a>
            </li>
            <li v-else>
            <router-link :to="'/unweixinbind'"  class="my_pay">
                  <i></i>
                  解绑微信
                  <span :class="{active:isweixin}"></span>
              </router-link>
            </li>
          </ul>
          <ul>
              <li>
              <router-link :to="'/company'"  class="my_help">
                      <i></i>
                      关于我们
                 </router-link>
              </li>
              <!--
              <li>
                  <a href="/my/custom" class="my_guwen">
                      <i></i>
                      理财顾问
                  </a>
              </li>
                  -->
              <li>
                  <a href="JavaScript:" class=" my_aboutus" @click="outuser()">
                      <i></i>
                      退出
                  </a>
              </li>
          </ul>
      </div>
    </div>
</div>
</template>

<script>
  import ls from '../../store/lStorage.js'
  import config from '../../api/ajax.js'
export default {

  data () {
    return {
      title:"个人设置",
      state:this.$store.state,
      ispaypassword:"未设置",
      user:{
        UserName:"",
        MobilePhone:""
      },
      isweixin:false
    }
  },
  methods:{
    bindweixin(){
      let _this =this
       _this.$msg.confirm("绑定微信，需重新登录！",function(){
        _this.$http(_this.$api.userloginout({}))
        .then((data) => {
          if(data.data.ResultCode==100000){
            ls.clear()
            _this.$store.commit("userinfo")
            _this.$store.commit("xjhinfo")
            window.location.href=config.baseUrl+"/web/Wx/login?state=/login"
          }

        });
      })
    },
    outuser(){
      let _this =this
      _this.$msg.confirm("确认退出当前账号？",function(){
        _this.$http(_this.$api.userloginout({}))
        .then((data) => {
          if(data.data.ResultCode==100000){
            ls.clear()
            _this.$store.commit("userinfo")
            _this.$store.commit("xjhinfo")
            _this.$msg.alert("退出成功",function(){
              _this.$router.push('/index')
            })
          }

        });
      })

    },
    popstatechange(){
      let query = this.$route.query
      if(query.ver=="wx"){
        history.pushState(null, null, "#")
      }
    },
  },
  created :function(){
    let _this =this

    this.$http(this.$api.isPayPassword({}))
      .then((data) => {
        if(data.data.ResultData=="true"){
          _this.ispaypassword="修改/设置"
        }

      });
      this.popstatechange();
      window.addEventListener("popstate", this.popstatechange,false);
      if(typeof this.state.isweixin !="undefined"){
        var user = ls.getItem("_user")
        var usertoken = user.Token
         this.$http(this.$api.GetUserInfo({}))
          .then((data) => {
            if(data.data.ResultCode==100000){
              _this.user=data.data.ResultData
              let obj = data.data.ResultData
              obj.Token = usertoken
              ls.setItem("_user",obj)
              this.$store.commit("userinfo")

            }

          });

      }else{
        this.user=_this.state.user
      }

    _this.$http(_this.$api.iswxbind({}))
    .then((data) => {
       if(data.data.ResultData){
        _this.isweixin = true;
       }
      });


  },
  beforeDestory() {
    window.removeEventListener('popstate',this.popstatechange,false)
  },
  components:{
  }
}
</script>
