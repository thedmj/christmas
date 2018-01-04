<template>
  <div class="update page">
      <!-- <input type="file" name="avatar"> -->
      <button @click="changeHandle" type="button">select</button>
      <button @click="uploadHandle" type="button">upload</button>
      <!-- <input type="file" name="avatar" ref="avatar" @change="changeHandle"> -->
    <!-- <img :src="localId" alt=""> -->
    <!-- <img :src="'http://new.acmedynasty.com/getphoto?openid='+openId" alt=""> -->
    <p></p>
  </div>
</template>

<script>
  import $ from "jquery";
  import store from "../assets/js/store";

  export default {
    data() {
      return {
        localId:'',
        openId:''
      }
    },
    methods: {
      changeHandle(e) {
        var This = this;
        try{
          wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            console.log(localIds);
            This.localId = localIds;
          }
        });
        }catch(e){
          alert(e);
        }
      },
      uploadHandle() {
        console.log(this.localId)
        wx.uploadImage({
          localId: this.localId[0], // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            $("p").html(serverId);
            $.ajax({
              url:store.uploadBackend,
              data:{
                openid:store.openid,
                mediaid:serverId
              },
              type:"post",
              success(res){
                console.log(res);
                var res =JSON.parse(res);
                if(res.status==1){
                  alert("上传成功");
                }else{
                  alert("错误 "+res.status);
                }
              }
            })
          }
        });
      }
    },
    mounted() {
      this.openId = store.openid;
    }
  }

</script>


<style lang="less">
  .update {
    background: #ccc;
    font-size: 0.16rem;
  }

</style>
