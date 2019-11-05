<template>
  <div :class="['tap',add?'blur':'']" ref="tap">
    <div class="item" @touchstart="touchstart($event, index)" @touchend="touchend($event, index)" v-for="(item,index) in 3" :key="index">
      <div class="title">title</div>
      <div class="content">继续打包，发现又出错，还是ts的类型错误，在transformExpression.ts这个文件中，把报错的类型全部声明为any（反正我们只是为了打包），继续打包</div>
      <info />
    </div>
  </div>
</template>

<script>
import info from "./components/info";

export default {
  components: {
    info
  },
  data() {
    return {
      timer: null,
      add: false
    };
  },
  methods: {
    touchstart(e, index) {
      console.log("touchstart", e);

      // e.path.forEach(item => {
      //   console.log(item);
      // });

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log("300");
        this.add = true;
      }, 300);
    },
    touchend(e, index) {
      console.log("touchend", e);
      clearTimeout(this.timer);
      this.add = false;
    },
    getDom(e) {
      Array.from(e).forEach(item => {
        if (item.children.length) {
          this.getDom(item.children);
        } else {
          console.log(item);
          if (item.className == "title") {
            item.style.color = "red";
            item.style.fontWeight = "700";
            item.style.fontSize = "24px";
          }
        }
      });
    }
  },
  created() {
    this.$nextTick(() => {
      console.log(this.$refs);
      let dom = this.$refs.tap.children;
      this.getDom(dom);
      // this.$refs.tap.style.height = "10px";
    });
  }
};
</script>

<style lang="less" scoped>
.tap {
  padding: 20px;
  margin-top: -10px;
  transition: all 0.3s;
}
.item {
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: #f5f5f5;
}
.blur {
  filter: blur(1px);
}
</style>
