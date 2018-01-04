<template>
  <div class="join page">
    <!-- <button @click="joinHandle">参加</button>
    <button @click="leaveHandle">不参加</button> -->
    <div class="bg">
      <canvas id="canvas" width="750" height="1350"></canvas>
    </div>
    <!-- <div class="text1 txt"></div>
    <div class="text2 txt"></div>
    <div class="text3 txt"></div> -->

    <div class="btn_rules button" @touchend="toggleRules"></div>
    <div class="button agree" @touchend="joinHandle"></div>
    <div class="button disagree" @touchend="leaveHandle"></div>
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
import gsap from "gsap";
var TimelineMax = gsap.TimelineMax;
export default {
  data() {
    return {
      openRules: false,
      localId: "",
      openId: "",
      swiperOption: {
        //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  methods: {
    joinHandle() {
      if(window.sound){
          window.sound.stop();
          window.sound.play();
        }
      this.$router.replace("/upload");
    },
    leaveHandle() {
      if(window.sound){
          window.sound.stop();
          window.sound.play();
        }
      this.$router.replace("/leave");
    },
    toggleRules() {
      if(window.sound){
          window.sound.stop();
          window.sound.play();
        }
      this.openRules = !this.openRules;
    }
  },
  mounted() {
    $(".button").on("touchstart",function(){
      $(this).addClass("active");
    });

    var index = 0;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var timer;
    var deer;
    var text1;
    var text2;
    var text3;
    function Element(img, w, h) {
      this.x = 0;
      this.y = 0;
      this.w = w;
      this.h = h;
      this.opacity = 0;
      this.img = img;
    }
    Element.prototype.draw = function() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      ctx.restore();
    };

    function animate(bg, deerImg, txt1, txt2, txt3) {
      ctx.drawImage(bg, 0, 0, 750, 1350);
      deer = new Element(deerImg, 83, 248);
      deer.opacity = 1;
      deer.draw();
      text1 = new Element(txt1, 750, 1350);
      text2 = new Element(txt2, 750, 1350);
      text3 = new Element(txt3, 750, 1350);
    }
    function onLoad() {
      index++;
      if (index == 5) {
        animate(bg, deerImg, txt1, txt2, txt3);
        function update() {
          ctx.clearRect(0, 0, 750, 1350);
          ctx.drawImage(bg, 0, 0, 750, 1350);
          text1.draw();
          text2.draw();
          text3.draw();
          deer.draw();
        }
        var t1 = new TimelineMax();
        t1.to(deer, 0.6, {
          bezier: {
            curviness: 1.6,
            values: [
              {
                x: -110,
                y: 30
              },
              {
                x: 60,
                y: 10
              },
              {
                x: 160,
                y: 150
              }
            ]
          },
          ease: Power2.easeOut,
          onUpdate: update
        });
        t1.to(deer, 0.6, {
          bezier: {
            curviness: 1,
            values: [
              {
                x: 160,
                y: 150
              },
              {
                x: 60,
                y: 260
              },
              {
                x: 60,
                y: 360
              }
            ]
          },
          ease: Power2.easeOut,
          onUpdate: update
        });
        t1.to(deer, 0.6, {
          bezier: {
            curviness: 1,
            values: [
              {
                x: 60,
                y: 360
              },
              {
                x: 430,
                y: 270
              },
              {
                x: 590,
                y: 450
              }
            ]
          },
          ease: Power2.easeOut,
          onUpdate: update
        });
        t1.to(deer, 0.6, {
          bezier: {
            curviness: 1.25,
            values: [
              {
                x: 590,
                y: 450
              },
              {
                x: 330,
                y: 650
              },
              {
                x: 290,
                y: 890
              }
            ]
          },
          ease: Power2.easeOut,
          onUpdate: update
        });
        t1.to(deer, 0.6, {
          bezier: {
            curviness: 1.25,
            values: [
              {
                x: 290,
                y: 890
              },
              {
                x: 600,
                y: 900
              },
              {
                x: 770,
                y: 1100
              }
            ]
          },
          ease: Power2.easeOut,
          onUpdate: update,
          onComplete() {
            var t = new TimelineMax();
            var $buttons = $(".button");
            t.set($buttons, {
              display: "block"
            });
            t.to($buttons, 0.3, {
              alpha: 1
            });
          }
        });
        var t2 = new TimelineMax();
        t2.to(
          text1,
          0.6,
          {
            opacity: 1
          },
          "0.6"
        );
        t2.to(
          text2,
          0.6,
          {
            opacity: 1
          },
          "+=0.15"
        );
        t2.to(
          text3,
          0.6,
          {
            opacity: 1
          },
          "+=0.1"
        );
      }
    }

    var bg = new Image();
    bg.src = require("../assets/images/join/P2bg.jpg");
    bg.onload = onLoad;
    var deerImg = new Image();
    deerImg.src = require("../assets/images/join/animal.png");
    deerImg.onload = onLoad;
    var txt1 = new Image();
    txt1.src = require("../assets/images/join/P2word1.png");
    txt1.onload = onLoad;
    var txt2 = new Image();
    txt2.src = require("../assets/images/join/P2word2.png");
    txt2.onload = onLoad;
    var txt3 = new Image();
    txt3.src = require("../assets/images/join/P2word3.png");
    txt3.onload = onLoad;



    // t1.to($deer, 5, {bezier:[{x:100, y:250}, {x:300, y:0}, {x:500, y:400}], ease:Power1.easeInOut});
  }
};
</script>


<style lang="less">
.join {
  overflow: hidden;
  .bg {
    // background: url("../assets/images/join/P2bg.jpg") no-repeat center;
    // background-size: cover;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 13.5rem;
    canvas {
      width: 100%;
      height: 100%;
    }
  }
  .txt {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 13.5rem;
    opacity: 0;
  }
  .text1 {
    background: url("../assets/images/join/P2word1.png") no-repeat center;
    background-size: cover;
  }
  .text2 {
    background: url("../assets/images/join/P2word2.png") no-repeat center;
    background-size: cover;
  }
  .text3 {
    background: url("../assets/images/join/P2word3.png") no-repeat center;
    background-size: cover;
  }
  .button {
    position: absolute;
    top: 70%;
    width: 2.12rem;
    height: 2.9rem;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    display: none;
    opacity: 0;
  }
  .agree {
    left: 1rem;
    background-image: url("../assets/images/join/agree.png");
    &.active {
      background-image: url("../assets/images/join/agreedown.png");
    }

  }
  .disagree {
    right: 1rem;
    background-image: url("../assets/images/join/disagree.png");
    &.active {
      background-image: url("../assets/images/join/disagreedown.png");
    }

  }
  .deer {
    background: url("../assets/images/join/animal.png") no-repeat center;
    background-size: cover;
    width: 0.83rem;
    height: 2.48rem;
    position: absolute;
    left: -1rem;
    top: -1rem;
  }
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
    &.active {
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
