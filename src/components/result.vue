<template>
  <div class="result page">
    <div class="bg"></div>
    <div class="conveyor"></div>
    <div class="avatar">
      <img v-if="avatar!=''" :src="avatar" alt="" id="avatar">
    </div>
    <div class="name">
      <p v-if="name!=''">{{name}}</p>
      <p v-if="dep!=''" style="margin-top:0.1rem;">{{dep}}</p>
    </div>
    <div class="arrow"></div>
    <div class="chatroom" @touchstart="enterChatRoom">
      <span></span>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";
  import store from "../assets/js/store";
  export default {
    data() {
      return {
        avatar: "",
        name: "",
        dep: ""
      }
    },
    methods:{
      enterChatRoom(){
        this.$router.replace("/chat");
      }
    },
    mounted() {
      // $(".result").on("touchstart",(e)=>{
      //   e.preventDefault();
      //   e.stopPropagation();
      // }).on("touchmove",(e)=>{
      //   e.preventDefault();
      //   e.stopPropagation();
      // });
      var This = this;
      $.ajax({
        url: store.result,
        type: "post",
        data: {
          openid: store.openid
        },
        success(res) {
          res = JSON.parse(res);
          console.log(res);
          if (res.status == 1 && res.message.name != null) {
            // $("#avatar").attr("src", "http://new.acmedynasty.com/photo/"+res.message.photo);
            var src = "http://new.acmedynasty.com/photo/" + res.message.photo
            This.avatar = src;
            This.name = res.message.name;
            This.dep = res.message.dep;
          }
        }
      })
    }
  }

</script>


<style lang="less">
  .result {
    overflow: hidden;
    .bg {
      background: url("../assets/images/result/bg.jpg") no-repeat;
      background-size: contain;
      width: 100%;
      height: 13.5rem;
    }
    .avatar {
      position: absolute;
      left: 0.68rem;
      top: 1.5rem;
      width: 2.12rem;
      height: 2.02rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .name {
      position: absolute;
      left: 4rem;
      top: 3rem;
      width: 2rem;
      height: 1rem;
      color: #f3f3f3;
      p {
        text-align: center;
        font-size: 0.36rem;
      }
    }
    .arrow {
      position: absolute;
      left: 0;
      top: 0;
      background: url("../assets/images/result/arrow.gif") no-repeat;
      background-size: 100%;
      background-position-x: 0;
      width: 100%;
      height: 100%;
    }
    .conveyor {
      position: absolute;
      left: 0;
      top: 0;
      background: url("../assets/images/result/conveyor.png") no-repeat;
      background-size: 200%;
      background-position-x: 0;
      width: 100%;
      height: 100%;
      animation: scroll 3s infinite linear;
      transform: translateZ(0);
    }
    .chatroom{position: absolute;left: 0.6rem;top:6rem;background: url("../assets/images/result/enter.png");width:1.88rem;height:0.52rem;background-size: contain;
      span{position: absolute;left: -0.3rem;top:0.09rem;background: url("../assets/images/result/jiantou.png");width:0.24rem;height:0.39rem;background-size: contain;display:block;animation: arrow 0.3s infinite alternate linear;}
    }

  }

  @keyframes arrow {
    0%{transform: translate3d(0,0,0);}
    100%{transform: translate3d(-10px,0,0)}
  }
  @keyframes scroll {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 100%;
    }
  }

</style>
