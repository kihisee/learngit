
import store from '../store/index'
import ls from '../store/lStorage'
(function(){
    var i = GetQueryString("i") //邀请码
    var sot = GetQueryString("sot")////推广来源
    var ver = GetQueryString("ver")//所属客户端
    var token = GetQueryString("token")
    if(i!=null){
        store.commit("InviteCode",i)
    }
    if(sot!=null){
        store.commit("EnterChannel",sot)
    }
    if(ver=="wx"){
        let obj = {
          "token":token,
          "ver":ver,
          "OpenId":GetQueryString("OpenId"),
          "NickName":GetQueryString("NickName"),
          "UnionId":GetQueryString("UnionId"),
        }
        store.commit("isweixin",obj)
    }
    if(token!=null&&token!=""){
        ls.setItem("_user",{"Token":token})
        store.commit("userinfo")
    }
})()

function GetQueryString(name)
{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r =decodeURIComponent(window.location.search).substr(1).match(reg);
     if(r!=null)return decodeURIComponent(r[2]); return null;
}