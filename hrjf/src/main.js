import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import api from './api/api'
import msg from './plugins/msgbox'
import store from './store/index'
import FastClick from 'fastclick'
import loding from './plugins/loding'
import wxShare from './plugins/wxShare'
import lg from './plugins/checkApplogin'
import ls from './store/lStorage'
import './plugins/checkQuery'
import './plugins/rem'
// import './plugins/toutiaoSEO'
// import './plugins/baiduSEO'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

axios.interceptors.request.use(function(config){
   if(!config.loding){
    loding.show()
   }
     return config;
   },function(error){
     return Promise.reject(error);
   });
axios.interceptors.response.use(function(response){
     loding.hide()
     if(response.data.ResultCode!=100000){
      if(response.data.ResultCode==100007){
        msg.alert(response.data.ResultMessage,function(){
            ls.clear()
            store.commit("userinfo")
            store.commit("xjhinfo")
            router.push('/login')
        })
      }else{
        msg.alert(response.data.ResultMessage)
      }
    }

      return response
   },function(error){
     return Promise.reject(error);
   });

Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  let state = store.state
    if(typeof to.matched[0].name != 'undefined'){
      document.title = to.matched[0].name
    }else{
      document.title = '恒瑞金服'
    }
    if(to.matched.some(record => record.meta.auth === true)){
        if(typeof state.user === 'undefined'){
            next({
              path: '/login',
              query: {back: to.fullPath.split('/')[1]}
            })
        }else{
          next()
        }
    }else{
      next();
    }
})
Vue.prototype.$msg = msg
Vue.prototype.$http = axios
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype.$wxShare = wxShare
Vue.prototype.$lg = lg
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
