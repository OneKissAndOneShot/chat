<template>
  <div class="my">
    <div class="info">
      <img :src="avatar" class="avatar" />
      <div class="name">{{name}}</div>
    </div>
    <div class="btn" @click="sinout">退出</div>
    <bar />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import bar from "@/components/bar";

export default {
  components: {
    bar
  },
  data() {
    return {
      avatar: Cookies.get("avatar"),
      name: Cookies.get("name")
    };
  },
  methods: {
    sinout() {
      Cookies.remove("socket-token");
      this.$router.push("/");
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.my {
  min-height: 100vh;
  padding-top: 50px;
  background-color: #f5f5f5;
}
.info {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: 0 auto;
  padding: 30px 0;
  border-radius: 10px;
  background-color: #fff;
}
.avatar {
  display: block;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #fff;
}
.name {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-left: 15px;
}
.btn {
  width: 90%;
  font-size: 30px;
  text-align: center;
  margin: 150px auto 0;
  padding: 15px 0;
  border-radius: 5px;
  color: #fff;
  background-color: #1890ff;
}
</style>
