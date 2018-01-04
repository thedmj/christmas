<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <audio src="./static/music.mp3" preload="true" autoplay id="music"></audio>
    <audio src="./static/sound.wav" id="pressSound" preload="auto"></audio>
  </div>
</template>

<script>
  import $ from "jquery";
  import "./assets/js/snow";
  export default {
    name: 'app',
    mounted() {
      $(document).on("touchstart", e => {
        if (this.$route.name == "join") {
          if (event.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!event.defaultPrevented) {
              event.preventDefault();
            }
          }
        }
      });
      // window.addEventListener("touchmove", function (e) {
      //   e.preventDefault();
      // });
      $(document).on("touchend",function(){
        $(".button").removeClass("active");
      });

      var displayStatus;
      var src = './static/sound.wav';
      createjs.Sound.alternateExtensions = ['wav'];
      createjs.Sound.addEventListener('fileload', playSound);
      createjs.Sound.registerSound(src);

      function playSound(event) {
        window.sound = createjs.Sound.play(event.src);
        sound.pause();
      }
    }
  }

</script>

<style lang="less">
  @import url("./assets/css/reset.css");
  html {
    font-size: 625%;
  }

  html,
  body {
    width: 100%;
    height: 100%;
  }

  body {
    font-size: 0.6rem;
    overflow: hidden;
    position: relative;
  }

  input {
    width: 100%;
    height: 0.6rem;
    font-size: 0.3rem;
  }

  #app {
    input{border-radius: 0;-webkit-appearance : none ;}
    width: 7.5rem;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .el-message {
    min-width: 300px !important;
  }

  .page {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #fff;
    font-size: 0.3rem;
    overflow: hidden;
    ;
    button {
      font-size: 0.3rem;
      width: 100%;
    }
    p {
      font-size: 0.3rem;
    }
    overflow-x: hidden;
    overflow-y: auto;
    p {
      font-size: 0.3rem;
    }
  }

  .snow {
    position: absolute;
    left: 0;
    top: 0;
  }

  .fade-enter-active {
    transition: all .5s ease;
  }

  .fade-leave-active {
    transition: all 0.5s;
  }

  .fade-enter,
  .fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }

</style>
