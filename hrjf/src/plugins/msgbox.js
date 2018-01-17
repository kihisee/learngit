 import Vue from 'vue'
 import msgboxVue from '../components/msgbox';
 let msgbox = Vue.extend(msgboxVue);
 let instance;
 let initInstance = ()=>{
    if(instance==undefined){
        instance = new msgbox({el: document.createElement('div')});
        document.body.appendChild(instance.$el);
    }

}

function showmsg(options){
    initInstance();
    instance.msg = options.msg;
    instance.msgshow = options.show;
    if(typeof options.callback === 'function'){
        instance.callback = options.callback
    }
    if(typeof options.cancelfun === 'function'){
        instance.cancelfun = options.cancelfun
    }
    if (options.type === 'alert'){
        instance.showbut = false
        if(options.btn){
            instance.ok.text = options.btn
        }
    }
    if (options.type === 'confirm'){
        instance.showbut = true
        if(options.leftbtn){
            instance.no.text = options.leftbtn
        }
        if(options.rightbtn){
            instance.ok.text = options.rightbtn
        }
    }
}

let msg = {
    alert:function(mesege,callback,btn){
        if(typeof callback === 'string'){
            btn = callback
        }
        showmsg({
            msg:mesege,
            type:"alert",
            show:true,
            callback:callback,
            btn:btn
        })
    },
    confirm:function(mesege,callback,cancelfun,leftbtn,rightbtn){
        showmsg({
            msg:mesege,
            type:"confirm",
            show:true,
            callback:callback,
            cancelfun:cancelfun,
            leftbtn:leftbtn,
            rightbtn:rightbtn
        })
    }
}

export default msg ;