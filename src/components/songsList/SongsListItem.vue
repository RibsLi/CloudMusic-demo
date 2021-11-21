<template>
  <div class="slide-item">
    <img :src="list.picUrl || list.coverImgUrl || list.cover" alt=""  @click="itemClick" />
    <div class="play-count" v-if="list.playCount ? true : false">
      <span class="count">
        <i class="el-icon-headset"></i>
        {{playCount}}
      </span>
    </div>
    <span class="iconfont icon-bofang1 play"></span>
    <div class="name">{{ list.name }}</div>
    <div class="author">
      <span v-for="item in list.artists" :key="item">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongsListItem",
  props: {
    list: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    playCount() {
      const count = this.list.playCount;
      if (count < 10000) return count;
      return (count / 10000).toFixed(1) + "万";
    },
  },
  methods: {
    itemClick() {
      // 如果type=0前往歌单详情列表
      // 如果type=5前往视频列表
      if (this.list.type !== 5) {
        this.$router.push({
          path: "/detail",
          query: {
            id: this.list.id,
          },
        });
      }
      // else {
      //   this.$router.push({
      //     path: "/exclusive",
      //     query: {
      //       id: this.list.id,
      //     },
      //   });

      // }
    }
  },
};
</script>

<style lang="less" scoped>
.slide-item {
  width: 200px;
  margin: 5px 0 10px;
  position: relative;
}
span {
  font-size: 12px;
}
img {
  width: 100%;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 3px;
}
.play-count {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  line-height: 28px;
  border-radius: 10px 10px 0 0;
  color: #fff;
  background: linear-gradient(
    to right,
    hsla(0, 0%, 100%, 0.1),
    rgba(0, 0, 0, 0.5)
  );
  .count {
    position: absolute;
    right: 7px;
    color: #fff;
    i {
      margin-right: 3px;
    }
  }
}
.play {
  position: absolute;
  top: 160px;
  right: 10px;
  font-size: 30px;
  color: rgba(255, 255, 255, 0.5);
}
.slide-item:hover .play {
  // color: rgba(255, 0, 0, 0.8);
  color: #ff0000;
}
.name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 14px;
  line-height: 16px;
}
.author {
  font-size: 13px;
  color: #aaa;
  margin-top: 5px;
}
</style>
