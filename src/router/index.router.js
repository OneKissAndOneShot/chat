const _import = require("./_import_");

export default [
  {
    path: "/",
    name: "login",
    component: _import("login/index"),
    meta: {
      title: "login"
    }
  },
  {
    path: "/qq",
    name: "qq",
    component: _import("home/index"),
    meta: {
      title: "首页"
    }
  },
  {
    path: "/socket",
    name: "socket",
    component: _import("socket/index"),
    meta: {
      title: "socket"
    }
  },
  {
    path: "/room",
    name: "room",
    component: _import("room/index"),
    meta: {
      title: "room"
    }
  },
  {
    path: "/tap",
    name: "tap",
    component: _import("tap/index"),
    meta: {
      title: "tap"
    }
  }
];
