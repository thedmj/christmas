<template>
  <div class="fail page">
    <div class="bg2"></div>
    <div class="text"></div>
    <img class="code" src="../assets/images/code.png"></img>
  </div>
</template>

<script>
import $ from "jquery";
import store from "../assets/js/store";
export default {
  data () {
    return {

    }
  },
  methods: {
    clean(){
      $.ajax({
        url:store.clean,
        type:"get",
        success(){
          alert("清除成功");
        }
      });
    }
  }
}

</script>


<style lang="less">
  .fail{background: url("../assets/images/success/bg1.jpg");background-size: cover;overflow: hidden;
    .bg2{position:absolute;left: 0;top:0;width:100%;height:13.5rem;background: url("../assets/images/fail/bg2.jpg") no-repeat center;background-size: contain;}
    .text{position:absolute;left: 0;top:0;width:100%;height:13.5rem;background: url("../assets/images/fail/text.png") no-repeat center;background-size: contain;}
    .code{position:absolute;left:0.5rem;top:1rem;background: url("../assets/images/code.png") no-repeat center;background-size: contain;width:1.69rem;height:1.59rem;}
  }

</style>
