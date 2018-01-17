<template>
<div v-if="msgshow">
  <div class="mask"></div>
  <div :class="{window_common02:showbut,window_common01:showbut==false} ">
    <div style="">
      <div class="content">
        <p>{{msg}}</p>
      </div>
      <div class="button">
        <span class="no" v-if="showbut" @click="cancel">{{no.text}}</span>
        <span class="ok" @click="success">{{ok.text}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      msgshow:false,
      showbut:false,
      callback:null,
      cancelfun:null,
      ok: {text: '确定'},
      no: {text: '取消'},
    }
  },
    methods:{
      success (){
        this.msgshow = false
        if(typeof this.callback === 'function'){
          this.callback()
        }
        this.ok.text="确定"
        this.callback=null
      },
      cancel(){
        this.msgshow = false
        if(typeof this.cancelfun === 'function'){
          this.cancelfun()
        }
        this.ok.text="确定"
        this.no.text="取消"
        this.cancelfun=null
        this.callback=null
      }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
