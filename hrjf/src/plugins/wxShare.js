import axios from 'axios'
import wx from 'weixin-js-sdk'
import config from '../api/ajax.js'
const wxshare = function(title,img,desc,callback){
        var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        axios.get(config.baseUrl+"/web/wx/GetWxConfigInfo?url="+ encodeURIComponent(window.location.href)) // 微信分享
        .then((data) => {
                wx.config({
                    debug: false,
                    appId: data.data.ResultData.appId,
                    timestamp: data.data.ResultData.timestamp,
                    nonceStr: data.data.ResultData.noncestr,
                    signature: data.data.ResultData.signature,
                    jsApiList: [
                        'onMenuShareAppMessage',
                        'onMenuShareTimeline',
                        'onMenuShareQQ',
                        'onMenuShareQZone',
                        'onMenuShareWeibo'
                    ]
                });
                var configWx= {
                        title: title,
                        desc: desc,
                        link: window.location.href,
                        imgUrl: window.location.protocol+"//"+window.location.host+"/static/img/activity/"+img+".png",
                        success: function () {
                            if(typeof callback === 'function'){
                                callback()
                            }
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    }
                wx.ready(function () {
                    wx.onMenuShareTimeline(configWx);
                    wx.onMenuShareAppMessage(configWx);
                    wx.onMenuShareQQ(configWx);
                    wx.onMenuShareQZone(configWx);
                    wx.onMenuShareWeibo(configWx);
                });
          })
      }

}

export default wxshare ;