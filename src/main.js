// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueTouch from 'vue-touch';
import {Message} from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';


Vue.use(VueTouch, {name: 'v-touch'});
Vue.use(VueAwesomeSwiper);
Vue.prototype.$message = Message;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
