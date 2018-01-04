<template>
  <div class="loading page">
    <canvas width="100%" height="300" class="snow"></canvas>


    <div class="ground"></div>
    <!-- <div class="animate">

    </div> -->
    <img src="../assets/images/Loading_animate/loadingkong.gif" id="animate" alt="">
    <p id="percent">0%</p>
  </div>
</template>

<script>
  import $ from "jquery";
  import store from "../assets/js/store";
  export default {
    data() {
      return {
        proImg: [],
        loadedImg: 0,
        timer: ""
      }
    },
    mounted() {
      // var endTime = new Date(2017, 11, 11, 20, 0);
      // var nowTime = new Date();
      // console.log((Date.parse(endTime) - Date.parse(nowTime))/3600/1000/24);
      var This = this;
      $.ajax({
        url: "http://new.acmedynasty.com/status",
        type: "get",
        success(status) {
          if (status == 0) {
            //报名预加载图片
            This.proImg = [
              require("../assets/images/Loading_animate/loadingkong.gif"),
              require("../assets/images/Loading_animate/loadingbg.jpg"),
              require("../assets/images/join/agree.png"),
              require("../assets/images/join/agreedown.png"),
              require("../assets/images/join/animal.png"),
              require("../assets/images/join/bg.png"),
              require("../assets/images/join/disagree.png"),
              require("../assets/images/join/disagreedown.png"),
              require("../assets/images/join/P2bg.jpg"),
              require("../assets/images/join/P2game.png"),
              require("../assets/images/join/P2gamedown.png"),
              require("../assets/images/join/P2word1.png"),
              require("../assets/images/join/P2word2.png"),
              require("../assets/images/join/P2word3.png"),
              require("../assets/images/join/rule1.png"),
              require("../assets/images/join/rule2.png"),
              require("../assets/images/join/XX.png"),
              require("../assets/images/upload/P3-1bg.jpg"),
              require("../assets/images/upload/P3-1caidai.png"),
              require("../assets/images/upload/P3-1submit.png"),
              require("../assets/images/upload/P3-1text.png"),
              require("../assets/images/upload/P3-1text2.png"),
              require("../assets/images/upload/P3-1text3.png"),
              require("../assets/images/upload/mask.png"),
              require("../assets/images/leave/bg.jpg"),
              require("../assets/images/leave/code.png"),
              require("../assets/images/leave/oldhand.png"),
              require("../assets/images/leave/P3-2text.png"),
              require("../assets/images/leave/wall.png"),
              require("../assets/images/success/bg1.jpg"),
              require("../assets/images/success/bg2.png"),
              require("../assets/images/success/text.png"),
              require("../assets/images/fail/bg2.jpg"),
              require("../assets/images/fail/text.png"),
              require("../assets/images/code.png")
            ];
          } else {
            //游戏预加载图片
            This.proImg = [
              require("../assets/images/play/beijingtop.png"),
              require("../assets/images/play/P5catch.png"),
              require("../assets/images/play/P5catchdown.png"),
              require("../assets/images/play/P5gouzi.png"),
              require("../assets/images/play/P5gouzi1.png"),
              require("../assets/images/play/P5gouzi2.png"),
              require("../assets/images/play/P5gouzi3.png"),
              require("../assets/images/play/P5left.png"),
              require("../assets/images/play/P5leftdown.png"),
              require("../assets/images/play/P5redbg.png"),
              require("../assets/images/play/P5right.png"),
              require("../assets/images/play/P5rightdown.png"),
              require("../assets/images/play/P5text.png"),
              require("../assets/images/play/P5toy.png"),
              require("../assets/images/result/arrow.gif"),
              require("../assets/images/result/bg.jpg"),
              require("../assets/images/result/conveyor.png"),
              require("../assets/images/result/photo.png"),
              require("../assets/images/result/txt2.png"),
              require("../assets/images/result/enter.png"),
              require("../assets/images/chat/avatar1.png"),
              require("../assets/images/chat/avatar2.png"),
              require("../assets/images/chat/avatar3.png"),
              require("../assets/images/chat/avatar4.png"),
              require("../assets/images/chat/avatar5.png"),
              require("../assets/images/chat/bg.jpg"),
              require("../assets/images/chat/close.png"),
              require("../assets/images/chat/close_press.png"),
              require("../assets/images/chat/leave.png"),
              require("../assets/images/chat/mask.png"),
              require("../assets/images/chat/send.png"),
              require("../assets/images/chat/send_press.png")
            ];
          }
          function onLoad() {
              This.loadedImg++;
              console.log(This.loadedImg)
              var percent = parseInt(This.loadedImg / (This.proImg.length) * 100);
              $("#percent").html(percent + "%");
              // start
              if (This.loadedImg >= This.proImg.length) {
                console.log("加载完毕");
                //判断玩家状态
                $.ajax({
                  url: store.queryopenid,
                  type: "POST",
                  data: {
                    openid: store.openid,
                  },
                  success: function (res) {
                    var res = JSON.parse(res);
                    console.log(res)
                    if (res.status === 0) { //错误
                      console.log(res);
                      //测试
                      // This.$message.error("错误");
                    } else if (res.status == 1) { //是本公司员工 已经上传照片
                      if (status == 0) {
                        This.$router.replace("/success");
                      } else if (status == 1) {
                        This.$router.replace("/play");
                      }
                    } else if (res.status === 2) { //是本公司员工 但是还未上传照片
                      // alert("第一次玩")
                      This.$router.replace("/leave");
                    } else if (res.status === 3) { //还未提交过信息
                      cancelAnimationFrame(window.snowTimer);
                      if (status == 0) {
                        This.$router.replace("/join");
                      } else {
                        This.$router.replace("/leave");
                      }
                    }else if(res.status == 4){
                      if(status == 0){
                        This.$router.replace("/success");
                      }else if(status == 1){
                        This.$router.replace("/result");
                      }

                    }else{
                      // This.$router.replace("/leave");
                      window.location.reload();
                    }
                  }
                });
                // This.$router.push("/openid");
              }
              // end
            }



          $("canvas.snow").let_it_snow({
            windPower: 0,
            speed: 1,
            count: 30,
            size: 2,
            opacity: 1,
          });
          $("canvas").attr("height", "300");

          var host = store.host;
          for (let i = 0; i < This.proImg.length; i++) {
            // console.log(this.proImg[i]);
            var img = new Image();
            img.src = This.proImg[i];
            img.onload = onLoad;
          }
        }
      })



    },
    methods: {

    }
  }

</script>


<style lang="less">
  .loading {
    background: url("../assets/images/loading_bg1.jpg") no-repeat center;
    background-size: cover;
    font-size: 0.16rem;
    .ground {
      background: url("../assets/images/loading_bg2.png");
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-size: cover;
    }
    #animate {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
    .animate {
      width: 5.72rem;
      height: 6.56rem;
      position: absolute;
      left: 50%;
      margin-left: -2.86rem;
      top: 2rem;
      background-size: cover;
      img {
        width: 100%;
        height: 100%;
      }
    }
    #percent {
      width: 1.44rem;
      height: 0.6rem;
      border-radius: 50%;
      background: #ebebe3;
      color: #98c2c7;
      position: absolute;
      left: 50%;
      top: 9rem;
      margin-left: -0.72rem;
      text-align: center;
      line-height: 0.6rem;
      ;
    }
  }

  button {
    height: 90px;
  }

</style>
