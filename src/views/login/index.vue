<template>
  <div class="login">
    <div class="bg"></div>
    <div class="content">
      <div class="form">
        <div class="avatar">
          <img :src="form.avatar" />
        </div>
        <a-input class="inp" v-model="form.name" placeholder="用户名" />
        <a-input class="inp mt-20" v-model="form.password" placeholder="密码" />
        <div class="btn" @click="login">登陆</div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      form: {
        name: Cookies.get("name") || "",
        password: "",
        avatar: `https://ui.aiyichuan.com/fhcloud/testavatar/${parseInt(Math.random() * 30 + 1)}.jpg`
      }
    };
  },
  methods: {
    login() {
      if (!this.form.name.trim()) {
        alert("用户名不能为空！");
      } else if (!this.form.password.trim()) {
        alert("密码不能为空！");
      } else {
        this.$store.dispatch("LOGIN", this.form).then(res => {
          this.$store.dispatch("RECIVEMSG").then(res => {
            if (res.status === 200) {
              this.$router.replace("/room");
            } else {
              alert("用户名或者密码错误！");
            }
          });
        });
      }
    }
  },
  created() {
    console.log(parseInt(Math.random() * 30 + 1))
  }
};
</script>

<style lang="less" scoped>
.bg {
  position: absolute;
  width: 100%;
  height: 350px;
  background-color: #0093e9;
  background-image: linear-gradient(270deg, #0093e9 0%, #80d0c7 100%);
  border-radius: 0 0 200px 200px;
}
.content {
  position: relative;
}
.form {
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  padding: 100px 20px 20px;
  background-color: #fff;
  box-shadow: 0 0 10px 0px #0093e9;
  border-radius: 10px;
  .avatar {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 4px 0px #0093e9;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: inherit;
    }
  }
}
.inp {
  height: 50px;
  font-size: 24px;
  border: none;
  outline: none;
  border-radius: unset;
  border-bottom: 1px solid #eee;
}
.mt-20 {
  margin-top: 20px;
}
.ant-input:focus {
  box-shadow: unset;
  border-right-width: 0;
}
.btn {
  width: max-content;
  margin: 50px auto 0;
  font-size: 24px;
  padding: 10px 30px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  border-radius: 10px;
  background-color: #0093e9;
  background-image: linear-gradient(270deg, #0093e9 0%, #80d0c7 100%);
}
</style>
