<template>
  <div class="leave page">
    <div class="box">
      <div class="hand"></div>
      <div class="wall page"></div>
      <div class="text1"></div>
      <img class="code" src="../assets/images/code.png"></img>
    </div>


    <p>leave页面</p>

  </div>
</template>

<script>
  import $ from "jquery";

  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {

    }
  }

</script>


<style lang="less">
.leave{background-size: cover;background-color: #000;overflow: hidden;;
  // .hand{width:0.33rem;height:0.6rem;position: absolute;left:61%;top:45%;background: url("../assets/images/leave/hand.png") center;background-size: cover;transform-origin: right bottom;transform: rotate(50deg);animation:rock 1s infinite alternate linear;}
    .box{background-color: #000;background: url("../assets/images/leave/bg.jpg") center;position:absolute;left:0;top: 0;width:100%;height:100%;background-size: cover;}
    .hand{width:100%;height:100%;position: absolute;left:0;top:0;background: url("../assets/images/leave/oldhand.png") no-repeat center;background-size: cover; }
    .wall{background: url("../assets/images/leave/wall.png") center;background-size: cover;}
    .text1{background:url("../assets/images/leave/P3-2text.png") no-repeat center;background-size: cover;position:absolute;left: 0;top:0;width:100%;height:100%;}
    .code{position:absolute;left:1rem;bottom:1rem;background: url("../assets/images/code.png") no-repeat center;background-size: contain;width:1.69rem;height:1.59rem;}
}

</style>
