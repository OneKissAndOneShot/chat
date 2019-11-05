// import VueSocketIO from "vue-socket.io";
import io from "socket.io-client";

// let scoket = new VueSocketIO({
//   connection: "http://127.0.0.1:7001"
// });
let scoket = io("http://127.0.0.1:7001/scoket");
scoket.on("connect", () => {
  console.log("scoket连接成功！");
});

scoket.on("emit", "hello scoket");

scoket.on("message", res => {
  console.log("scoket返回数据：", res);
  window.vm.$store.commit("UPDATEMSG", res);
});
export default scoket;
