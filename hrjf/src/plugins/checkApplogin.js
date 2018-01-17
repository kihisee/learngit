
import router from '../router'
import store from '../store/index'
import ls from '../store/lStorage'
function GetQueryString(name)
{
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r =decodeURIComponent(window.location.search).substr(1).match(reg);
     if(r!=null)return decodeURIComponent(r[2]); return null;
}
const applogin = function(url){
    var ver = GetQueryString("ver")
    var token = GetQueryString("token")
    if (ver == 'android') {
      if(token==null||token==''||token=="undefined"){
        android.SyncLogin();
        return false;
      }
    }else if (ver == 'ios') {
      if(token==null||token==''||token=="undefined"){
        window.webkit.messageHandlers.Method.postMessage({ "type": "AsyncLogin" });
        return false;
      }
    }else if(typeof store.state.user === 'undefined'){
      if(url){
         router.push('/'+url+'?back=' + escape(router.app._route.fullPath).split('/')[1])
       }else{
        router.push('/login?back=' + escape(router.app._route.fullPath).split('/')[1])
       }

        return false;
    }
    return true;
}

const isapp = function(){
  var ver = GetQueryString("ver")
    if (ver == 'android') {
      return false;
    }else if (ver == 'ios') {
      return false;
    }
    return true;
}

export default {applogin,isapp} ;