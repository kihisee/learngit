
import md5 from 'md5'
import msg from '../plugins/msgbox'
import store from '../store/index'
import router from '../router'
const configaxios={

    baseUrl:'http://hrjfapit.cpb168.com', //测试地址
  // baseUrl:'http://139.196.21.83:8020', //测试地址
   //baseUrl:'http://18385zy717.imwork.net', //微信地址
   //baseUrl:'http://hrjfapi.cpb168.com', //正式地址
   //baseUrl:'http://hrjfapipre.cpb168.com', //预发布地址

    headers: {'Content-Type': 'application/json ; charset=utf-8'},
    method:"post",
    // timeout:5000
}
const state = store.state

function jsondata(url,method,data){
    var config = {
        signkey:"w@232ww-23$23",
        version:"mobile",
        token:function(){
            if(typeof state.user !== 'undefined'){
                return state.user.Token
            }else{
                return ""
            }
        },
        timestamp:function(){
             function monthadd(n){
                return n < 10 ? '0' + n : n
            }
             function timedata(){
                var date = new Date();
                return date.getFullYear().toString() + monthadd(date.getMonth() + 1) + monthadd(date.getDate()) + monthadd(date.getHours()) + monthadd(date.getMinutes()) + monthadd(date.getSeconds())
            }
            return timedata()
        },
        methodname: function (url, method) {
            return url + "|" + method;
        },
        data:function(data){
            if(typeof data === 'object'){
                return data
            }else{
                return ""
            }

        },
        md5:function(){
            var MD5 = "SIGNKEY="+this.signkey+ ";" +"TIMESTAMP="+this.timestamp()+ ";" +"VERSION="+this.version+ ";" +"TOKEN="+this.token()+ ";" +"METHODNAME="+this.methodname(url, method)+ ";" +"DATA="+JSON.stringify(this.data(data)).replace(/\s+/g,"").replace(/\+/g, "")
            return md5(MD5).toUpperCase();
        }
    }

    var methodname = { "MethodName": config.methodname(url,method), "TimeStamp": config.timestamp(), "Token": config.token(), "Data": config.data(data), "Version": config.version, "Sign": config.md5() };

    return JSON.stringify([methodname]);
}

export default {
    getdata(url,method,data,hideloding){
        configaxios.data=jsondata(url, method, data)
        configaxios.url=configaxios.baseUrl+"/api/"+url+"/"+method;
        if(hideloding){
            configaxios.loding = hideloding
        }
        return configaxios
  },

  baseUrl:configaxios.baseUrl
}
