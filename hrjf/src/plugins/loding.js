import Vue from 'vue'
import lodingview from '../components/loding';
let newloding = Vue.extend(lodingview);
let instance;
let initInstance = ()=>{
    if(instance==undefined){
        instance = new newloding({el: document.createElement('div')});
        document.body.appendChild(instance.$el);
    }
}

function lodingcp(options){
     initInstance();
     instance.lodingshow = options.show;
}

let loding = {
    show:function(){
        lodingcp({
            show:true
        })
    },
    hide:function(){
        lodingcp({
            show:false
        })
    }
}

export default loding ;