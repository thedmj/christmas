import Vue from "vue";
import Router from "vue-router";

// import weixin from "../components/weixin";
// import loading from "../components/loading";
// import staff from "../components/staff";
// import upload from "../components/upload";
// import success from "../components/success";
// import join from "../components/join";
// import leave from "../components/leave";
// import play from "../components/play";
// import result from "../components/result";
// import fail from "../components/fail.vue";
import chat from "../components/chat.vue";

const weixin = () => import("../components/weixin");
const loading = () => import("../components/loading");
const staff = () => import("../components/staff");
const upload = () => import("../components/upload");
const success = () => import("../components/success");
const join = () => import("../components/join");
const leave = () => import("../components/leave");
const play = () => import("../components/play");
const result = () => import("../components/result");
const fail = () => import("../components/fail");
// const chat = () => import("../components/chat");

Vue.use(Router);

var router = new Router({
  routes: [
    {
      path: "/",
      name: "weixin",
      component: weixin
    },
    {
      path: "/loading",
      name: "loading",
      component: loading
    },
    {
      path: "/staff",
      name: "staff",
      component: staff
    },
    {
      path: "/upload",
      name: "upload",
      component: upload
    },
    {
      path: "/join",
      name: "join",
      component: join
    },
    {
      path: "/leave",
      name: "leave",
      component: leave
    },
    {
      path: "/play",
      name: "play",
      component: play
    },
    {
      path: "/success",
      name: "success",
      component: success
    },
    {
      path: "/fail",
      name: "fail",
      component: fail
    },
    {
      path: "/result",
      name: "result",
      component: result
    },
    {
      path: "/chat",
      name: "chat",
      component: chat
    }
  ]
});





// var pathHistory=[];
// router.beforeEach((to, from, next) => {
//   if(pathHistory.length==0){
//     pathHistory.push(to.name);
//     next();
//   }else{
//     if(pathHistory.indexOf(to.name)==-1){
//       pathHistory.push(to.name);
//       next();
//     }else{
//       next(false);
//     }
//   }
// });
export default router;
