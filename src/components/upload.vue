<template>
  <div class="upload page">
    <div class="bg"></div>
    <form action="">
      <div class="group name">
      <span></span>
      <input v-model="name">
    </div>
    <div class="group dep">
      <span></span>
      <div id="dep"></div>
    </div>
    <div class="group photo">
      <span class="btn-selectImage"></span>
      <div class="selectImage">
        <div class="container">
          <img :src="localId" v-if="localId!=''" alt="">
        </div>
      </div>
    </div>
    </form>
    <div class="submit" @touchstart="submitHandle" v-if="showSubmit"></div>
    <div class="mask page" v-if="showMask">
      <div class="close" @touchend.stop="closeMask()" @touchstart.stop="touchStart()"></div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import store from "../assets/js/store";
import MobileSelect from "mobile-select";
export default {
  data() {
    return {
      name: "",
      dep: "",
      loadedImg: 0,
      localId: "",
      openId: "",
      showSubmit:true,
      showMask:false
    };
  },
  methods: {
    submitHandle() {
      if(window.sound){
          window.sound.stop();
          window.sound.play();
        }
      var endTime = new Date(2017, 11, 19, 20, 0);
      var nowTime = new Date();
      // console.log((Date.parse(endTime) - Date.parse(nowTime))/3600/1000/24);
      if ((Date.parse(endTime) - Date.parse(nowTime)) / 3600 / 1000 < 0) {
        this.$router.replace("/leave");
        return false;
      }
      if (!this.check()) {
        this.$message.warning("请完善您的信息");
        return false;
      }
      var This = this;
      //查询openid
      console.log(This.dep);
      $.ajax({
        url: store.validateinfo,
        type: "POST",
        data: {
          openid: store.openid,
          name: This.name,
          dep: This.dep
        },
        success: function(res) {
          console.log(res);
          var res = JSON.parse(res);
          if (res.status == 0) {
            //错误
            console.log(res);
            This.$message.error("错误");
          } else if (res.status == 1) {
            //是本公司员工
            This.uploadHandle();
            // This.$router.push("/join");
          } else if (res.status == 2) {
            //非本公司员工
            // This.$message.error("非本公司员工");
            This.$router.replace("/fail")
          } else if (res.status == 3){
            // This.$message.error("部门错误");
            This.showMask = true;
          }
        }
      });
    },
    selectImage() {
      var This = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          This.localId = localIds;
          // $(".selectImage").css("background-image", "url(" + localIds + ")");

        }
      });
    },
    uploadHandle() {
      var This = this;
      wx.uploadImage({
        localId: this.localId[0], // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          var serverId = res.serverId; // 返回图片的服务器端ID
          $("p").html(serverId);
          $.ajax({
            url: store.uploadBackend,
            data: {
              openid: store.openid,
              mediaid: serverId
            },
            type: "post",
            success(res) {
              console.log(res);
              var res = JSON.parse(res);
              if (res.status == 1) {
                // This.$message.success("上传成功");
                This.openId = store.openid;
                This.$router.replace("/success");
              } else {
                This.$message.error("错误");
              }
            }
          });
        }
      });
    },
    check() {
      if (this.dep == "" || this.name == "" || this.localId == "") {
        return false;
      } else {
        return true;
      }
    },
    closeMask(){
      this.showMask = false;
    },
    touchStart(){

    }
  },
  mounted() {
    var This = this;
    var mobileSelect = new MobileSelect({
      trigger: "#dep",
      title: "部门",
      wheels: [
        {
          data: ["雨嘉科技","人事部", "创意部", "制片部", "客户部", "工程部", "法务部", "编辑部","翻译部"]
        }
      ],
      position: [0], //初始化定位
      callback: function(indexArr, data) {
        This.dep = data[0];
      }
    });
    $(".btn-selectImage").on("touchstart",function(){
      This.selectImage();
    });
    // $(".submit").on("touchstart",function(){
    //   This.submitHandle();
    // });
    //处理键盘弹出
    $("input").on("focus",()=>{
      This.showSubmit = false;
    }).on("blur",()=>{
      setTimeout(() => {
        This.showSubmit = true;
      }, 300);
    });
  }
};
</script>


<style lang="less">

.upload {
  overflow: hidden;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 13.5rem;
    background: url("../assets/images/upload/P3-1bg.jpg") no-repeat center;
    background-size: cover;
  }
  .mask{background:url("../assets/images/upload/mask.png") no-repeat;background-size: cover;
    .close {
      position: absolute;
      right: 1.4rem;
      top: 3.6rem;
      width: 1.1rem;
      height: 1.07rem;
      background: url("../assets/images/join/XX.png") no-repeat center;
      background-size: contain;
    }
  }

  .button {
    height: 90px;
    text-align: center;
    background: #fff;
    line-height: 90px;
  }
  .group {
    display: flex;
    position: absolute;
    left: 50%;
    top: 3rem;
    margin-left: -3rem;
    width: 5rem;
    height: 1rem;
    line-height: 1rem;
    input {
      height: 1rem;
      border: none;
      background: #45b9a7;
      font-size: 0.36rem;
      padding: 2px 6px;
      box-sizing: border-box;
      color:#fff;
    }
    span {
      width: 1.88rem;
      height: 100%;
      color: #45b9a7;
      margin: 0rem 0.6rem 0rem 0.6rem;
    }
    #dep {
      height: 1rem;
      border: none;
      background: #45b9a7;
      font-size: 0.36rem;
      width: 100%;
      padding: 2px 6px;
      box-sizing: border-box;
    }
  }
  .name {
    top: 3.9rem;
    span {
      background: url("../assets/images/upload/P3-1text3.png") no-repeat center;
      background-size: contain;
    }
  }
  .dep {
    top: 5.2rem;color:#fff;

    span {
      background: url("../assets/images/upload/P3-1text.png") no-repeat center;
      background-size: contain;
    }
  }
  .photo {
    top: 7.3rem;
    span {
      background: url("../assets/images/upload/P3-1text2.png") no-repeat center;
      background-size: contain;
      width: 6rem;
      margin: 0 0.36rem 0 0.36rem;
    }
    .selectImage {
      position: relative;
      width: 100%;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      box-sizing: border-box;
      .container{width:2.28rem;height:2.28rem;
        img{width:100%;height:100%;object-fit: contain;border:none;}
      }

    }
  }
  .group.photo {
    width: 5.5rem;
    height: 2.3rem;
  }
  .submit{position: absolute;left: 3rem;bottom:-0.3rem;width:2.03rem;height:2.21rem;background: url("../assets/images/upload/P3-1submit.png") no-repeat center;background-size: contain;transform-origin:left bottom;transform: rotate(0deg);animation:rock 1s infinite alternate linear;}
}
#dep {
  height: 1rem;
}
.update {
  background: #ccc;
  font-size: 0.16rem;
}

@keyframes rock {
  0%{transform: rotate(-10deg);}
  100%{transform: rotate(10deg);}
}
#test{position: absolute;left: 0;top:0;z-index: 999;}
</style>

