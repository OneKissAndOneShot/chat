<template>
  <div class="index">
    <div class="inp">
      <div class="tipUrl">
        <img src="https://y.gtimg.cn/music/common/upload/t_playsong_ad/1207759.png" width="45" />
        <span>{{rankTip[index].name}}</span>
      </div>
      <a-input-search class="inp" :defaultValue="tipurl" v-model="url" placeholder="请输入地址" size="large" @search="test" enterButton @keyup.enter.native="test" />
    </div>
    <a-button type="primary" class="btn" @click="demo">Test</a-button>
    <div class="info">
      <img :src="res.timg" class="timg" v-if="res.timg" />
      <div>{{res.title}}</div>
      <div>{{res.time}}</div>
      <div class="rankList" v-if="res.rankList && res.rankList.length">
        <div v-for="(item,index) in res.rankList" :key="index">{{index + 1}}、{{item.name}}--{{item.author}}</div>
      </div>
      <a-spin :spinning="loading"></a-spin>
    </div>
    <div class="ranktip">
      <div v-for="(item,index) in rankTip" :key="item.id" class="item" @click="chooseId(item.id, index)">id：{{item.id}} -- name：{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      url: "",
      index: 0,
      tipurl:
        "https://i.y.qq.com/n2/m/share/details/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=3",
      res: {},
      rankTip: [
        { id: 3, name: "欧美榜" },
        { id: 4, name: "流行指数榜" },
        { id: 5, name: "内地榜" },
        { id: 16, name: "韩国榜" },
        { id: 17, name: "日本榜" },
        { id: 26, name: "热歌榜" },
        { id: 27, name: "新歌榜" },
        { id: 28, name: "网络歌曲榜" },
        { id: 29, name: "影视金曲榜" },
        { id: 36, name: "k歌金曲榜" },
        { id: 52, name: "腾讯音乐人原创榜" },
        { id: 57, name: "电音榜" },
        { id: 58, name: "说唱榜单" },
        { id: 59, name: "香港地区榜" },
        { id: 60, name: "抖音排行榜" },
        { id: 61, name: "台湾地区榜" }
      ]
    };
  },
  methods: {
    test() {
      this.loading = true;
      this.$api.homeApi
        .test({
          url: this.url
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            this.loading = false;
            this.res = res.data;
          }
        });
    },
    demo() {
      this.$api.homeApi.login().then(res => {
        console.log(res);
      });
    },
    chooseId(id, index) {
      this.index = index;
      this.url = `https://i.y.qq.com/n2/m/share/details/toplist.html?ADTAG=myqq&from=myqq&channel=10007100&id=${id}`;
      this.test();
    }
  },
  created() {
    this.url = this.tipurl;
  }
};
</script>

<style lang="less" scoped>
.tipUrl {
  color: #fff;
  text-align: center;
  margin-bottom: 10px;
  img {
    margin-right: 20px;
  }
}
.btn {
  display: block;
  margin: 20px auto;
}
.index {
  min-height: 100vh;
  background-color: #000;
}
.inp {
  max-width: 500px;
  margin: 0 auto;
  padding-top: 180px;
}
.info {
  text-align: center;
  margin-top: 20px;
  color: #fff;
}
.timg {
  width: 70px;
  height: 70px;
  border-radius: 5px;
}
.rankList {
  width: 500px;
  max-height: 500px;
  text-align: left;
  padding: 10px;
  overflow: auto;
  margin: 20px auto 0;
  border: 1px solid #fff;
  border-radius: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
}
.ranktip {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1;
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  .item {
    cursor: pointer;
    &:hover {
      color: yellow;
    }
  }
}
</style>