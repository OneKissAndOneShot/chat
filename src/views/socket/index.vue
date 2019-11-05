<template>
  <div class="socket">
    <div class="title">
      <span>{{$store.getters.joinname}}</span>
      <span v-if="$store.getters.onlinenum">({{$store.getters.onlinenum}})</span>
    </div>
    <div class="msg">
      <div class="lists" v-for="(item,index) in msg" :key="index">
        <div class="time">{{item.time}}</div>
        <div :class="['item', item.name == name?'other':'txt']">
          <div class="avatar">
            <img :src="item.avatar" />
          </div>
          <div class="rt">
            <div class="name">{{item.name}}</div>
            <div class="info">{{item.message}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btm">
      <a-input-search class="inp" v-model="inp" placeholder="请输入内容" @search="sendMsg" enterButton="发送" size="default" />
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      loading: false,
      inp: "",
      msg: [],
      name: Cookies.get("name"),
      id: this.$route.query.id || ""
    };
  },
  watch: {
    "$store.getters.msg"(val) {
      console.log("msg", val);
      this.msg = val.filter(item => {
        return item.roomid === this.$route.query.id;
      });
    },
    "$store.getters.sendmsg"(val) {
      console.log("send", val);
      if (this.$route.query.id === val.roomid) {
        this.msg.push(val);
      }
    }
  },
  methods: {
    join() {
      this.$store
        .dispatch("JOINROOM", {
          name: this.name,
          roomid: this.$route.query.id
        })
        .then(() => {
          this.$store.dispatch("RECIVEMSG").then(res => {
            console.log(res);
            // console.log(this.$store.getters.msg);
          });
        });
    },
    sendMsg() {
      if (this.inp.trim() != "") {
        this.$store
          .dispatch("SENDMSG", {
            name: this.name,
            time: new Date().toLocaleString(),
            message: this.inp,
            roomid: this.$route.query.id
          })
          .then(res => {
            console.log(this.$store.getters.msg);
            this.inp = "";
          });
      }
    },
    handleCancel() {}
  },
  created() {
    this.join();
  },
  beforeDestroy() {
    this.$store.dispatch("LEAVAROOM", {
      name: this.name,
      roomid: this.id
    });
    this.$store.commit("UPDATEMSG", []);
    console.log(this.$store.getters.msg);
  }
};
</script>

<style lang="less" scoped>
.socket {
  min-height: 100%;
  background-color: #f5f5f5;
  .title {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1;
    font-size: 30px;
    font-weight: 700;
    padding: 15px 0;
    text-align: center;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e6e6e6;
  }
  .msg {
    min-height: calc(100vh - 100px);
    padding: 0 30px 100px;
    margin-top: -20px;
    .lists {
      margin-top: 20px;
      .time {
        font-size: 24px;
        text-align: center;
        margin-bottom: 10px;
      }
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 8px;
        margin-right: 20px;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: inherit;
        }
      }
    }
    .item {
      display: flex;
      align-items: flex-start;
      font-size: 26px;
    }
    .name {
      margin-bottom: 2px;
      color: #bbb;
    }
    .info {
      position: relative;
      background-color: #fff;
      padding: 10px 15px;
      border-radius: 8px;
      border: 1px solid #e6e6e6;
      &::before {
        content: "";
        position: absolute;
        left: -15px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 15px 10px 0;
        border-color: transparent #e6e6e6 transparent transparent;
      }
      &::after {
        content: "";
        position: absolute;
        left: -13px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 15px 10px 0;
        border-color: transparent #fff transparent transparent;
      }
    }
    .other {
      justify-content: flex-end;
    }
  }
  .btn {
    display: block;
    margin: 20px auto;
  }
  .btm {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    /deep/.ant-input {
      height: 80px;
      font-size: 24px;
      border-radius: unset;
    }
    /deep/.ant-input:hover {
      border-color: #e6e6e6;
    }
    /deep/.ant-input:focus {
      box-shadow: unset;
    }
    /deep/.ant-btn {
      height: 80px;
      font-size: 24px;
      border-radius: unset;
    }
  }
}
</style>