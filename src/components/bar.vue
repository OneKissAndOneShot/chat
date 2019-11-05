<template>
  <div class="menu">
    <router-link tag="div" :to="item.url" active-class="active" class="item" v-for="(item,index) in list" :key="index">
      <a-icon class="icon" :type="item.type" />
      <div class="name">{{item.name}}</div>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          type: "instagram",
          name: "房间",
          url: "/room"
        },
        {
          type: "user",
          name: "我的",
          url: "/my"
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.menu {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  box-shadow: 0 0 10px 0 rgba(12, 3, 7, 0.08);
  background-color: #fff;
  z-index: 10;
  .item {
    flex: 1;
    text-align: center;
    font-size: 24px;
    .icon {
      font-size: 34px;
    }
    .name {
      font-size: 22px;
    }
  }
  .active {
    color: #1890ff;
  }
}
</style>
