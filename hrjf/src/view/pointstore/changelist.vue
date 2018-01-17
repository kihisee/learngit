<template>
   <div id="frame">
    <div id="con">
          <div class="link_head">
            <h1>
              <span><a href="javascript:history.go(-1)" id=" showmenu"><img src="static/img/icon_left.png"></a></span>
              {{title}}
            </h1>
          </div>

        <div class="xjh">
          <div class="box" v-for="item in changelist">
              <div class="pointchange">
                <p class="title">{{item.Name}}</p>
                <p class="time">{{item.Date}}</p>
                <span>{{item.Point}}积分</span>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '兑换记录',
      changelist:[]
    }
  },
  methods:{

  },
  created:function(){
    let _this =this
    this.$http(this.$api.pointchange({}))
    .then((data) => {
        _this.changelist=data.data.ResultData.list
        console.log(_this.changelist)
      });

  },
  components:{

  }
}
</script>


