import Vue from "vue";
import Router from "vue-router";
import Cookies from "js-cookie";
import store from "../store";
Vue.use(Router);

import homeRouter from "./index.router";

const router = new Router({
  mode: "history",
  routes: [{ path: "*", redirect: "/" }]
});

router.addRoutes(homeRouter);

router.beforeEach((to, from, next) => {
  const token = Cookies.get("socket-token");
  // next();
  // store.dispatch("TESTTOKEN", { name: Cookies.get("name") }).then(res => {
  //   store.dispatch("OFFLINE");
  // });

  if (token) {
    if (to.path == "/") {
      next("/room");
    } else {
      next();
    }
  } else {
    console.log(store);
    store.dispatch("LEAVAROOM", {
      name: Cookies.get("name"),
      roomid: 0
    });
    if (to.path === "/") {
      next();
    } else {
      next("/");
    }
  }
});

export default router;
