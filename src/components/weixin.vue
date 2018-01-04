<template>
  <div class="weixin page">
    <div class="ground"></div>
  </div>
</template>

<script>
  import $ from "jquery";
  import getUrlParam from "../assets/js/getUrlParam.js";
  import store from "../assets/js/store";
  export default {
    data() {
      return {

      }
    },
    created() {
      var This = this;
      store.openid = getUrlParam("openid");
      if (store.openid === null) {
        window.location.href = store.queryopenidBackend; //获取自己的openid
      } else {
        // 判断下 openid 看看是不是第一次玩
        var url = window.location.href
        $.ajax({
          url: store.jsapi,
          type: "POST",
          data: "url=" + encodeURI(url),
          success: function (res) {
            var res = JSON.parse(res);
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.appId, // 必填，公众号的唯一标识
              timestamp: res.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.nonceStr, // 必填，生成签名的随机串
              signature: res.signature, // 必填，签名，见附录1
              jsApiList: res.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            //微信接口准备完毕
            wx.ready(function () {
              var music = document.getElementById("music");
              music.src="./static/music.mp3";
              music.play();
              wx.onMenuShareTimeline({
                title: '圣诞节礼物交换趴', // 分享标题
                link: 'http://test.mymanna.me/christmas/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://test.mymanna.me/christmas/static/images/share.jpg', // 分享图标
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });
              wx.onMenuShareAppMessage({
                title: '圣诞节礼物交换趴', // 分享标题
                desc: '想要我的爱，好胆你就来', // 分享描述
                link: 'http://test.mymanna.me/christmas/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://test.mymanna.me/christmas/static/images/share.jpg', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                }
              });

              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时
              // 就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
              //设置默认的分享信息防止出错
              This.$router.replace("/loading"); //微信全部通过后进入loading页
            });
          }
        });
      }

    }
  }

</script>
<style lang="less">
  #app {
    .weixin {
      background: url("../assets/images/Loading_animate/loadingbg.jpg");
      font-size: 0.12rem;
      .ground {
        background: url("../assets/images/loading_bg2.png");
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-size: cover;
      }
      .img {
        width: 5.72rem;
        height: 6.56rem;
        position: absolute;
        left: 50%;
        margin-left: -2.86rem;
        top: 2rem;
        background-size: cover;
      }
    }
  }

</style>
