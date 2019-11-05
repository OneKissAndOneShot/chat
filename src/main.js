import Vue from "vue";
import App from "./App.vue";

import router from "./router/index";
import api from "./api";
import store from "./store";

import "@/utils/ui";
import "ant-design-vue/dist/antd.css";

// import VueSocketIO from "vue-socket.io";
// import Socketio from "socket.io-client";
// Vue.use(VueSocketIO, Socketio("localhost:1992"));

// import "./utils/scoket";

Vue.config.productionTip = false;
Vue.prototype.$api = api;

window.vm = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

