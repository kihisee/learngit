<template>
<div id="frame">
  <div class="link_head" v-if="isWap">
    <h1>
        <span>
          <a href="javascript:history.go(-1)"><img src="static/img/head/icon_left.png"></a>
        </span>
        {{title}}
     </h1>
  </div>

  <div class="contract-body">
                <div class="contract">
                    <h1>
                        什么是恒瑞金服积分？
                    </h1>
                    <p>
                       恒瑞金服积分是投资人在使用恒瑞金服时，平台给予投资人的一种奖励。积分不等于投资券等票券，不能直接用于投资。
                    </p>
                      <h2>
                        如何获得积分
                    </h2>
                        <p>
                       恒瑞金服积分获取方式分2大类：
                    </p>
                     <p style="padding:0.2rem 0">
                       1、任务积分
                    </p>
                    <table class="u-info" cellspacing=0 cellpadding=0>
                        <tr>
                            <td>
                                详情
                            </td>
                            <td>
                                奖励积分
                            </td>
                            <td>
                                备注
                            </td>
                        </tr>
                        <tr>
                            <td>
                                注册
                            </td>
                            <td>
                                10积分
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                实名认证
                            </td>
                            <td>
                                30积分
                            </td>
                            <td>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                邀请好友注册成功
                            </td>
                            <td>
                                5积分
                            </td>
                            <td>
                                每日限10次
                            </td>
                        </tr>
                        <tr>
                            <td>
                                好友首投
                            </td>
                            <td>
                                10积分
                            </td>
                            <td>
                                限固定理财，每日限10次
                            </td>
                        </tr>
                    </table>

                    <p style="padding:0.2rem 0">
                        2、投资积分
                    </p>
                   <table class="u-info" cellspacing=0 cellpadding=0>
                        <tr>
                            <td>
                                奖励积分
                            </td>
                            <td>
                                奖励积分
                            </td>
                            <td>
                                备注
                            </td>
                        </tr>
                        <tr>
                            <td>
                                个人投资
                            </td>
                            <td>
                                积分=投资金额*投资期限/360天*15%
                            </td>
                            <td rowspan="2">
                                限固定理财
                            </td>
                        </tr>
                        <tr>
                            <td>
                                邀请好友投资
                            </td>
                            <td>
                                积分=投资金额*投资期限/360天*3.75%
                            </td>

                        </tr>
                    </table>

                     <h2>
                        积分勋章
                    </h2>
                    <p>
                      恒瑞金服勋章是用户累积一定积分后获得的荣誉奖励，积分勋章与用户累积获得积分有关，用户消耗积分不影响勋章获得。勋章获得条件：
                    </p>
                   <table class="u-info" cellspacing=0 cellpadding=0>
                        <tr>
                            <th>
                                等级名
                            </th>
                            <th>
                                积分要求
                            </th>
                        </tr>
                        <tr>
                            <td>
                                初出茅庐
                            </td>
                            <td>
                                10积分
                            </td>
                        </tr>
                        <tr>
                            <td>
                                小试牛刀
                            </td>
                            <td>
                                100积分
                            </td>

                        </tr>

                         <tr>
                            <td>
                                略有战绩
                            </td>
                            <td>
                                500积分
                            </td>
                        </tr>
                           <tr>
                            <td>
                                崭露头角
                            </td>
                            <td>
                                1000积分
                            </td>
                        </tr>
                    </table>

                    <h2>
                        常见问题：
                    </h2>
                    <p>
                        Q：恒瑞金服积分有效期是多久？
                    </p>

                    <p>
                       A：目前恒瑞金服积分长期有效。
                    </p>
                     <br />
                    <p>
                      Q：如何查看我的积分数量及明细？
                    </p>
                    <p>
                       A：点击“发现”—“当前积分”—“积分记录”，可查看积分数量及明细。
                    </p>
                     <br />
                    <p>
                        Q：恒瑞金服积分可以从A账号转移到B账号吗？
                    </p>
                    <p>
                     A：恒瑞金服积分不支持任何转让。
                    </p>
                     <br />
                    <p>
                     Q：在恒瑞金服积分商城兑换奖品后，如何更换商品或者退货？
                    </p>
                    <p>
                       A：积分商城兑换的奖品，属于奖励性质，不存在买卖关系，因此不给予退换货。积分一经兑换，不予返还。
                    </p>

                </div>
            </div>

  </div>

</div>

</template>

<script>
import ls from '../../store/lStorage.js'
export default {
  data () {
    return {
      title: '积分说明',
      isWap:true,
    }
  },

  mounted : function() {

  },
  methods:{

  },
  created:function(){
        let _this = this
        let query = this.$route.query

        console.log(query)
         if(typeof query.ver!="undefined"){//微信打开
                _this.isWap=false
        }
  },
  components:{

  }
}
</script>
<style  lang="scss" scoped>
div.contract { width: auto; padding: 15px; }
div.contract h2 { margin: 8px 0px; }
.u-info{border-top:rem(1) solid #ccc;border-left:rem(1) solid #ccc;text-align: center;line-height: rem(25);width:100%;}
.u-info th{border-bottom:rem(1) solid #ccc;border-right:rem(1) solid #ccc;}
.u-info td{border-bottom:rem(1) solid #ccc;border-right:rem(1) solid #ccc;}
</style>