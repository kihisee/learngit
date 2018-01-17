import Vue from 'vue';
import Vuex from 'vuex';
import ax from 'axios'
import api from '../api/api.js'
import ls from './lStorage.js'
import msg from '../plugins/msgbox.js'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user:ls.getItem("_user"),
        basset:ls.getItem("_basset"),
        xjh:null,
        tender:{},
        tenderdetail:ls.getItem("tenderdetail"),
        tradedetail:{},
        msg:{},
        storedetail:{},
        InviteCode:ls.getItem("InviteCode"),
        EnterChannel:'',
        isweixin:ls.getItem("isweixin"),

    },
    mutations: {
        userinfo(state,obj){
            state.user = ls.getItem("_user")
        },
        basset(state,obj){
            state.basset = ls.getItem("_basset")
        },
        xjhinfo(state,obj){
            if(typeof obj=="object"){
                state.xjh = obj
            }else{
                state.xjh = null
            }

        },
        tradedetail(state,obj){
            state.tradedetail = obj
            console.log(state.tradedetail)
        },
        msg(state,obj){
            state.msg = obj
        },
        tenderdetail(state,obj){
            state.tenderdetail = ls.getItem("tenderdetail")
        },
        storedetail(state,obj){
            state.storedetail = obj
        },
        InviteCode(state,obj){
            ls.setItem("InviteCode",obj);
            state.InviteCode=ls.getItem("InviteCode")
        },
        EnterChannel(state,obj){
            state.EnterChannel=obj
        },
        isweixin(state,obj){
            ls.setItem("isweixin",obj);
            state.isweixin=ls.getItem("isweixin")
        },
    },
    actions: {
        upuserinfo({commit},load){ //登录更新个人基本信息 resolve成功后回调
        return new Promise((resolve, reject) => {
            var wx = ls.getItem("isweixin")
            if(typeof wx !="undefined"){
                if(wx.token==""){
                    var obj = {"UserName":load.phone,"LoginPassWord":load.password,"TerminalType":1,"OpenId":wx.OpenId,"NickName":wx.NickName,"UnionId":wx.UnionId}
                }
            }else{
                var obj = {"UserName":load.phone,"LoginPassWord":load.password,"TerminalType":1}
            }
            ax(api.pass(obj))
            .then(function(data){
                if(data.data.ResultCode==100000){
                    ls.setItem("_user",data.data.ResultData);
                    commit("userinfo",data.data.ResultData);
                    resolve();
                }else{
                    //msg.alert(data.data.ResultMessage);
                }

             })
        })
        },
        xjhinfo({commit}){ //更新薪计划信息
            return new Promise((resolve, reject) => {
                ax(api.xjhBasset({}))
                .then(function(data){
                    if(data.data.ResultCode==100000){
                        commit("xjhinfo",data.data.ResultData);
                        resolve();
                    }else{
                        //msg.alert(data.data.ResultMessage);
                    }
                })
            })
        },
        basset({commit}){ //更新用户总资产
            return new Promise((resolve, reject) => {
                ax(api.basset({}))
                .then(function(data){
                    if(data.data.ResultCode==100000){
                        ls.setItem("_basset",data.data.ResultData);
                        commit("basset",data.data.ResultData);
                        resolve();
                    }else{
                        // msg.alert(data.data.ResultMessage,function(){

                        // })
                    }
                })
            })
        }

    }
})

export default store