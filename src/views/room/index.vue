<template>
  <div class="room">
    <div class="list">
      <router-link :to="`/socket?id=${item.id}`" tag="div" class="item" v-for="(item,index) in list" :key="index">
        <img :src="item.icon" class="icon" />
        <div class="info">
          <div class="name">{{item.name}}</div>
          <!-- <div class="tag">jlkjkljklj</div> -->
        </div>
      </router-link>
    </div>
    <bar />
  </div>
</template>

<script>
import bar from "@/components/bar";

export default {
  components: {
    bar
  },
  data() {
    return {
      list: []
    };
  },
  methods: {},
  created() {
    this.$store.dispatch("FINDROOM").then(() => {
      this.$store.dispatch("RECIVEMSG").then(res => {
        console.log(res);
        this.list = this.$store.getters.room;
      });
    });
  }
};
</script>

<style lang="less" scoped>
.room {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px 15px 0;
  font-size: 24px;
}
.list {
  margin-top: -20px;
}
.item {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 15px 20px;
  border-radius: 5px;
  background-color: #fff;
}
.icon {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
}
.name {
  font-size: 26px;
  font-weight: 700;
}
.tag {
  font-size: 22px;
  color: #f5f5f5;
}
</style>
