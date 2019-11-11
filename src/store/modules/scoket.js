import Cookies from "js-cookie";
import io from "socket.io-client";
const socket = io("http://192.168.9.17:8090/websocket");

socket.on("connect", () => {
  console.log("connect");
});

const state = {
  name: "",
  token: "",
  msg: [],
  sendmsg: "",
  room: [],
  joinname: "",
  onlinenum: ""
};

const getters = {
  msg: state => state.msg,
  room: state => state.room,
  joinname: state => state.joinname,
  onlinenum: state => state.onlinenum,
  sendmsg: state => state.sendmsg
};

const actions = {
  TESTTOKEN({ commit, state }, info) {
    return new Promise(resolve => {
      socket.emit("token", {
        name: info.name
      });
      resolve();
    });
  },
  LOGIN({ commmit }, userinfo) {
    return new Promise(resolve => {
      // socket.emit("success");
      socket.emit("login", {
        name: userinfo.name,
        password: userinfo.password,
        avatar: userinfo.avatar
      });
      Cookies.set("avatar", userinfo.avatar, { expires: 7 });
      resolve();
    });
  },
  FINDROOM({ commit }) {
    return new Promise(resolve => {
      socket.emit("findroom");
      commit("UPDATEROOM");
      resolve();
    });
  },
  JOINROOM({ commit }, info) {
    return new Promise(resolve => {
      socket.emit("joinroom", info);
      resolve();
    });
  },
  LEAVAROOM({ commit }, info) {
    return new Promise(resolve => {
      socket.emit("leaveroom", info);
      resolve();
    });
  },
  SENDMSG({ commit }, { name, message, roomid }) {
    return new Promise(resolve => {
      socket.emit("online", {
        name: name,
        time: new Date().toLocaleString(),
        message: message,
        avatar: Cookies.get("avatar"),
        roomid: roomid
      });
      resolve();
    });
  },
  RECIVEMSG({ commit }) {
    return new Promise(resolve => {
      socket.on("message", res => {
        switch (res.type) {
          case "login":
            commit("SETTOKEN", res.token);
            commit("SETNAME", res.name);
            break;
          case "loginerr":
            break;
          case "updatestatus":
            commit("UPDATESTATUS", res.status);
          case "room":
            commit("UPDATEROOM", res.list);
            break;
          case "roomname":
            commit("UPDATEJOINNAME", res.name);
            commit("UPDATEONLINENUM", res.users);
            break;
          case "onlineusers":
            commit("UPDATEONLINENUM", res.num);
            break;
          case "message":
            commit("UPDATEMSG", res.list);
            break;
          case "updatemsg":
            commit("UPDATEROOMMSG", res.info);
            break;
        }
        resolve(res);
      });
    });
  },
  OFFLINE() {
    return new Promise(resolve => {
      socket.on("disconnect", () => {
        console.log("logout");
        Cookies.remove("socket-token");
        resolve(true);
      });
    });
  }
};

const mutations = {
  UPDATEMSG(state, msg) {
    state.msg = msg;
  },
  SETTOKEN(state, token) {
    state.token = token;
    Cookies.set("socket-token", token, { expires: 7 });
  },
  SETNAME(state, name) {
    state.name = name;
    Cookies.set("name", name, { expires: 7 });
  },
  UPDATEROOM(state, room) {
    state.room = room;
  },
  UPDATEJOINNAME(state, name) {
    state.joinname = name;
  },
  UPDATEONLINENUM(state, num) {
    state.onlinenum = num;
  },
  UPDATEROOMMSG(state, info) {
    state.sendmsg = info;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
