<template>
  <div class="success page">
    <canvas width="500" height="626" class="snow"></canvas>
    <div class="bg2"></div>
    <div class="text"></div>
    <!-- <button @click="clean">清除</button> -->
    <div class="btn_rules" @touchend="toggleRules"></div>
    <img class="code" src="../assets/images/code.png"></img>
    <div class="rules page" v-if="openRules">
      <div class="list">
        <swiper :options="swiperOption">
          <swiper-slide>
            <div class="rule1"></div>
          </swiper-slide>
          <swiper-slide>
            <div class="rule2"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="close" @touchend="toggleRules"></div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  import store from "../assets/js/store";
  export default {
    data() {
      return {
        openRules: false,
        swiperOption: {
          //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
          pagination: {
            el: ".swiper-pagination"
          }
        }
      }
    },
    mounted() {
      console.log($("canvas.snow").length)
      setTimeout(() => {
        $("canvas.snow").let_it_snow({
        windPower: 0,
        speed: 1,
        count: 30,
        size: 2,
        opacity: 1,
      });
      }, 1600);
    //   $(".page").on("touchmove",(e)=>{
    //   e.preventDefault();
    //   e.stopPropagation();
    // });

    },
    methods: {
      clean() {
        console.log("a")
        $.ajax({
          url: store.clean,
          type: "get",
          success() {
            alert("清除成功");
          }
        });
      },
      toggleRules() {
        if(window.sound){
          window.sound.stop();
          window.sound.play();
        }
        this.openRules = !this.openRules;
      }
    }
  }

</script>


<style lang="less">
  .success {
    background: url("../assets/images/success/bg1.jpg");
    background-size: cover;
    overflow: hidden;
    .bg2 {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 13.5rem;
      background: url("../assets/images/success/bg2.png") no-repeat center;
      background-size: contain;
    }
    button {
      position: absolute;
      left: 0;
      top: 0;
      width: 50%;
      height: 60px;
      opacity: 0.5;
    }
    .text {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 13.5rem;
      background: url("../assets/images/success/text.png") no-repeat center;
      background-size: contain;
    }
    .code{position:absolute;left:0.3rem;top:0.3rem;background: url("../assets/images/code.png") no-repeat center;background-size: contain;width:1.69rem;height:1.59rem;}
    .btn_rules {
    background: url("../assets/images/join/P2game.png") no-repeat center;
    background-size: cover;
    position: absolute;
    right: 0.5rem;
    top: 0.6rem;
    width: 100%;
    height: 100%;
    width: 1.23rem;
    height: 1.27rem;
    &:active {
      background: url("../assets/images/join/P2gamedown.png") no-repeat center;
      background-size: cover;
    }
    &:hover {
      background: url("../assets/images/join/P2gamedown.png") no-repeat center;
      background-size: cover;
    }
  }
  .rules {
    background: url("../assets/images/join/bg.png") no-repeat;
    background-size: 100% 100%;
    .close {
      position: absolute;
      right: 0.2rem;
      top: 0.2rem;
      width: 1.21rem;
      height: 1.17rem;
      background: url("../assets/images/join/XX.png") no-repeat center;
      background-size: contain;
    }
    .list {
      position: absolute;
      left: 50%;
      top: 1.9rem;
      width: 5.5rem;
      height: 65%;
      margin-left: -2.75rem;
      .swiper-container {
        height: 100%;
      }
      .swiper-pagination-bullet-active {
        background: #000;
      }
      .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: 0;
      }
      .rule1 {
        width: 90%;
        height: 100%;
        background: url("../assets/images/join/rule1.png") no-repeat center;
        background-size: contain;
        margin: auto;
      }
      .rule2 {
        width: 90%;
        height: 100%;
        background: url("../assets/images/join/rule2.png") no-repeat center;
        background-size: contain;
        margin: auto;
      }
    }
  }
  }

</style>
