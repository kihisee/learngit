<template>
<div v-if="lodingshow">
  <div class="bg_box">
    <div class="bg_w ball_clip_rotate">
      <div class="bg_b"></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      lodingshow:false,
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
