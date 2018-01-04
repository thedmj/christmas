<template>
  <div class="play page">
    <div class="snow" style="width:100%;height:100%"></div>
    <div class="game">
      <div class="txt"></div>
      <div class="bg"></div>
      <div class="box">
        <div class="hook">
        </div>
      </div>
      <div class="top"></div>
      <div class="toy"></div>

      <div class="l_button button"></div>
      <div class="r_button button"></div>
      <div class="capture button"></div>
    </div>

  </div>
</template>

<script>
  import getUrlParam from "../assets/js/getUrlParam.js";
  import store from "../assets/js/store";
  import $ from "jquery";
  import gsap from "gsap";
  var TimelineMax = gsap.TimelineMax;
  export default {
    data() {
      var arrImages = [];
      for (let i = 30; i < 40; i++) {
        // arrImages.push(require( "../assets/images/"+i+".jpg"));
      }
      return {
        arrImages: arrImages
      }
    },
    mounted() {
      $(".button").on("touchend",()=>{
        $(".button").removeClass("active");
      });


      var This = this;
      store.openid = getUrlParam("openid");
      // var sound = document.getElementById("sound");

      var maxWidth = document.body.clientWidth - document.body.clientWidth * 0.45;
      var l_timer;
      var r_timer;
      var x = 0;
      var $l_button = $(".l_button");
      var $r_button = $(".r_button");
      var $hook = $(".hook");
      //左右移动
      function left(t) {
        if (x < -maxWidth / 2) {
          return false;
        }
        var t = new TimelineMax();
        l_timer = requestAnimationFrame(left);
        t.set($hook, {
          x: "-=2"
        });
        x -= 2;
        if (x < -maxWidth / 2) {
          cancelAnimationFrame(l_timer);
          cancelAnimationFrame(r_timer);
        }
      }

      function right() {
        if (x > maxWidth / 2) {
          return false;
        }
        var t = new TimelineMax();
        r_timer = requestAnimationFrame(right);
        t.set($hook, {
          x: "+=2"
        });
        x += 2;
        if (x > maxWidth / 2) {
          cancelAnimationFrame(l_timer);
          cancelAnimationFrame(r_timer);
        }
      }

      //按钮事件
      $l_button.on("touchstart", function () {
        // sound.pause();
        // sound.currentTime = 0.09;
        // sound.play();
        $(this).addClass("active");
        if(window.sound){
          window.sound.stop();
          window.sound.play();
        }

        left();
      }).on("touchend", function () {
        cancelAnimationFrame(l_timer);
      });
      $r_button.on("touchstart", function () {
        // sound.pause();
        // sound.currentTime = 0.09;
        // sound.play();
        $(this).addClass("active");
        if(window.sound){
          window.sound.stop();
          window.sound.play();
        }

        right();
      }).on("touchend", function () {
        cancelAnimationFrame(r_timer);
      });

      $(".capture").on("touchstart", function () {
        $(this).addClass("active");
        if(window.sound){
          window.sound.stop();
          window.sound.play();
        }
        var t = new TimelineMax();
        $l_button.off();
        $r_button.off();
        $(this).off();
        t.to($hook, 2, {
          y: $(".box").height() * 0.65,
          onComplete() {

            $(".hook").css("background", "url(" + require("../assets/images/play/P5gouzi" + Math.floor(Math.random() *
              3 + 1) + ".png") + ") no-repeat center").css("background-size", "100% 100%");

            console.log();
            // to next

          }
        });
        t.to($hook, 3, {
          y: 0,
          onComplete() {
            This.$router.replace("/result");
          }
        }, "+=1");
      });
      $(".play").on("touchstart", function (e) {
        e.preventDefault();
      })
      // new JParticles.snow('.snow');
    }
  }

</script>


<style lang="less">
  .play {
    .bg {
      width: 100%;
      height: 13.5rem;
      overflow: hidden;
      position: absolute;
      left: 0;
      top: 0;
      background: url("../assets/images/play/P5redbg.png") no-repeat;
      background-size: contain;
    }
    .game {
      position: absolute;
      width: 100%;
      height: 13.5rem;
      background: #f8f8f3;
      .toy {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 13.5rem;
        background: url("../assets/images/play/P5toy.png") no-repeat;
        background-size: contain;
      }
      .top {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 13.5rem;
        background: url("../assets/images/play/beijingtop.png") no-repeat;
        background-size: contain;
      }
      .box {
        width: 74%;
        height: 7.5rem;
        overflow: hidden;
        position: absolute;
        left: 50%;
        top: 0;
        margin-left: -37%;
      }
      .hook {
        width: 2.24rem;
        height: 13rem;
        background: url("../assets/images/play/P5gouzi.png") no-repeat center;
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        bottom: 50%;
        margin-left: -1.12rem;
        .gift {
          width: 1rem;
          height: 1rem;
          position: absolute;
          left: 50%;
          bottom: 0;
          margin-left: -0.5rem;
          background: #000;
          display: none;
        }
      }
      .txt {
        position: absolute;
        left: 1.3rem;
        top: 1.3rem;
        width: 1.8rem;
        height: 1.02rem;
        background: url("../assets/images/play/P5text.png") no-repeat center;
        background-size: contain;
      }
      .button {
        position: absolute;
        width: 1.68rem;
        height: 1.6rem;
        bottom: 2.6rem;
      }
      .l_button {
        left: 0.6rem;
        background: url("../assets/images/play/P5left.png") no-repeat center;
        background-size: contain;
        &.active {
          background: url("../assets/images/play/P5leftdown.png") no-repeat center;
          background-size: contain;
        }

      }
      .r_button {
        right: 0.6rem;
        background: url("../assets/images/play/P5right.png") no-repeat center;
        background-size: contain;
        &.active {
          background: url("../assets/images/play/P5rightdown.png") no-repeat center;
          background-size: contain;
        }

      }
      .capture {
        left: 50%;
        bottom: 1.9rem;
        margin-left: -0.75rem;
        background: url("../assets/images/play/P5catch.png") no-repeat center;
        background-size: contain;
        &.active {
          background: url("../assets/images/play/P5catchdown.png") no-repeat center;
          background-size: contain;
        }

      }
    }
  }

</style>
