<template>
  <div class="chat page" ref="chat">
    <div class="chat-room" ref="chatRoom">
      <!-- {{me.name}}和 {{chat_friend.name}} id:{{chat_friend.id}}聊天 -->
      <ul class="message-list" ref="list">
        <li v-for="(item,index) in list" :key="index">
          <div class="avatar">
            <img :src="item.avatar" alt="">
          </div>
          <div class="text" :style="item.color">{{item.message}}</div>
        </li>
      </ul>
    </div>
    <div class="leave"></div>
    <!-- <div class="bg"></div> -->
    <!-- <div class="top"></div> -->
    <div class="input-box">
      <input type="text" v-model="message" maxlength="100">
      <!-- <el-button @click="sendHandle">发送</el-button> -->
      <div class="send" @touchstart="sendHandle"></div>
    </div>
    <transition name="fade">
      <div class="mask page" v-if="showMask">
        <div class="close" @touchstart="showMask = false"></div>
      </div>
    </transition>
  </div>

</template>

<script>
  import $ from "jquery";
  import store from "../assets/js/store";
  import {
    input,
    button,
    Message
  } from "element-ui";
  // import randomColor from "randomcolor";
  export default {
    data() {
      return {
        message: "",
        down: true,
        list: [],
        avatarList: [require("../assets/images/chat/avatar1.png"), require("../assets/images/chat/avatar2.png"),
          require("../assets/images/chat/avatar3.png"), require("../assets/images/chat/avatar4.png"), require(
            "../assets/images/chat/avatar5.png")
        ],
        randomIndex: -1,
        showMask: true,
        timer:null,
        canSend:true
      }
    },
    computed: {

    },
    created() {
      this.requestData();
    },
    mounted() {
      var This = this;
      $("input").on("focus", () => {
        $("#app").css("overflow", "auto");
      }).on("blur", () => {
        $("#app").scrollTop(0);
        $("#app").css("overflow", "hidden");
      });
      $(document).off();
      $(document).on("keydown", (e) => {
        if (e.keyCode == 13) {
          This.sendHandle();
        }
      });
      $(".leave").on("touchend", function () {
        console.log(This.timer)
        clearInterval(This.timer);
        $(this).removeClass("active");
        This.$router.replace("/result");
      });
      $(".send").on("touchstart", function () {
        $(this).addClass("active");
      }).on("touchend", function () {
        $(this).removeClass("active");
      });


      var startY, endY;
      var box_height = $('.chat-room').height(); //获取滚动容器自身的整体高度
      $(".chat").on("touchstart",()=>{
        $("input").blur();
      });
      $('.chat-room').on('touchstart', function (event) { //获取起点
        $("input").blur();
        event.stopPropagation();
        startY = event.originalEvent.touches[0].pageY;
      });
      $('.chat-room').on('touchmove', function (event) {
        event.stopPropagation();
        var endY = event.originalEvent.changedTouches[0].pageY;
        var changedY = endY - startY;
        var scroll_top = $('.chat-room').scrollTop(); //滚动容器卷去的高度
        var scroll_height = $('.chat-room')[0].scrollHeight;　　　　　 //滚动容器内的整体高度　　　　
        if (scroll_top === 0 && changedY > 0) { // 判断是否在顶部，且向下拖动
          event.preventDefault();
        }　　　　　　　　　
        // 判断是否在底部，且向上拖动
        var o = $('.chat-room').offset();
        if (scroll_top + box_height - scroll_height >= -1 && changedY < 0) { //滚动容器卷去的高度+滚动容器自身的整体高度 = 滚动容器内的整体高度 (好像有点不准 所以-1来适配)
          event.preventDefault();
        }
      });
      this.timer = setInterval(()=>{
        this.requestData();
      },5000)
    },
    updated() {
      if (this.down) {
        this.$refs.chatRoom.scrollTop = this.$refs.chatRoom.scrollHeight;
        this.down = false;
      }

    },
    methods: {
      randomAvatarIndex(arr) {
        var index = Math.floor(Math.random() * arr.length);
        if (index == this.randomIndex) {
          return this.randomAvatarIndex(arr);
        } else {
          this.randomIndex = index;
          return index;
        }
      },
      randomAvatar(id) {
        var arr = [require("../assets/images/chat/avatar1.png"), require("../assets/images/chat/avatar2.png"), require(
          "../assets/images/chat/avatar3.png"), require("../assets/images/chat/avatar4.png"), require(
          "../assets/images/chat/avatar5.png")];
        // return arr[this.randomAvatarIndex(arr)];
        return arr[id % 5]
      },
      randomColor(id) {
        // var color =parseInt(Math.random()*(255*255*255)).toString(16);
        // console.log(color)
        // var color = randomColor({
        //   luminosity: 'light'
        // });
        var arr = ["6870C5", "E83352", "DDC537", "C048F7", "3BD8DD", "7FEA89", "E880B7", "7BB755", "4A99BC", "FC68FC",
          "FCA53D", "E73A94", "2659F9", "BB9B5A", "9798F2", "894D87", "F47A14", "A51613", "5A9DFF", "3D870E",
          "6BB2B2", "E73A94", "98C865", "FF6E8D", "2E3DAA", "68C868", "B9641E", "FF917B", "FFD05A", "FFA6F9",
          "BBD0FF", "AAD161", "0A9191", "FFA4A4", "D85700", "FFCCC5", "0FA9D8"
        ];
        var color = arr[id % arr.length];
        return color;
      },
      requestData() {
        var This = this;
        $.ajax({
          url: "http://new.acmedynasty.com/message",
          type: "get",
          success(res) {
            res = res.reverse();
            if (This.list.length == 0||This.list[This.list.length-1].id < res[res.length-1].id) {
              res.forEach((item) => {
                if (!item.avatar) {
                  item.avatar = This.randomAvatar(item.id);
                }
                if (!item.color) {
                  var color = This.randomColor(item.id);
                  item.color = "color:#" + color;
                }
              });
              This.list = res;
              This.down = true;
            }
          }
        });
      },
      sendData() {
        var This = this;
        // store.openid = "olnxEwDSE7jN2N6yrRieAjza07j8";
        this.canSend = false;
        $.ajax({
          url: "http://new.acmedynasty.com/send",
          type: "post",
          data: {
            openid: store.openid,
            message: This.message
          },
          success(res) {
            This.canSend = true;
            res = JSON.parse(res);
            if (res.status == 1) {
              This.requestData();
              This.down = true;
              This.message = "";
            }
          }
        });
      },
      sendHandle() {
        if (this.message == "") {
          this.$message.warning("不能发送空消息");
          return false;
        }
        if (this.message != "" && this.message.length <= 100) {
          if(this.canSend){
            this.sendData();
          }
        }

      }
    },
    components: {
      "el-input": input,
      "el-button": button
    }
  }

</script>

<style lang="less">
  .chat {
    width: 100%;
    height: 13.5rem;
    position: absolute;
    padding: 0 30px 0 30px;
    box-sizing: border-box;
    background-image: url("../assets/images/chat/bg.jpg");
    background-color: #fff;
    background-size: 100% auto;
    .mask {
      background: url("../assets/images/chat/mask.png");
      background-size: cover;
      left: 0;
      top: 0;
      .close {
        position: absolute;
        right: 1.2rem;
        top: 3.6rem;
        width: 1.21rem;
        height: 1.17rem;
        background: url("../assets/images/join/XX.png") no-repeat center;
        background-size: contain;
      }
    }
    .top {
      width: 7.5rem;
      height: 1.83rem;
      position: absolute;
      left: 0;
      top: 0;
      background: url("../assets/images/chat/top.png") no-repeat;
      background-size: 100%;
    }
    .leave {
      width: 1.04rem;
      height: 0.77rem;
      position: absolute;
      right: 0.3rem;
      top: 0.4rem;
      background: url("../assets/images/chat/leave.png") no-repeat;
      background-size: 100%;
    }
    .chat-room {
      position: absolute;
      left: 0;
      top: 1.46rem;
      height: 8.06rem;
      width: 100%;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      padding: 0 0.6rem 0 0.6rem;
      box-sizing: border-box;
      &::-webkit-scrollbar {
        display: none;
      }
      .message-list {
        li {
          display: flex;
          margin-bottom: 10px; // background: #9eea6a;
          .avatar {
            width: 1rem;
            height: 1rem;
            flex: 1rem;
            flex-shrink: 0;
            flex-grow: 0;
            margin-right: 0.2rem;
            background-size: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .text {
            align-self: center;
            font-size: 16px;
            border-radius: 6px;
            max-width: 90%;
            width: auto;
            word-break: break-all;
            text-align: left;
          }
        }
        .receive {
          flex-direction: row;
          .text {
            background: #fff;
            margin-left: 6px;
          }
        }
      }
    }
    .input-box {
      display: flex;
      position: absolute;
      left: 50%;
      top: 10rem;
      width: 90%;
      margin-left: -45%;
      input {
        align-self: center;
        margin-right: 0.2rem;
      }
      .send {
        width: 1.04rem;
        height: 0.77rem;
        background: url("../assets/images/chat/send.png") no-repeat;
        background-size: 100%;
        &.active {
          background: url("../assets/images/chat/send_press.png") no-repeat;
          background-size: 100%;
        }
      }
    }
  }

</style>
