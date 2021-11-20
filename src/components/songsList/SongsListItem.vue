<template>
  <div class="slide-item" @click="itemClick">
    <img :src="list.picUrl || list.coverImgUrl" alt="" />
    <div class="play-count">
      <span class="count">
        <i class="el-icon-headset"></i>
        {{ (list.playCount / 10000).toFixed(1) }}万
      </span>
    </div>
    <span class="iconfont icon-bofang1 play"></span>
    <div class="name">{{ list.name }}</div>
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
  methods: {
    itemClick() {
      this.$router.push({
        path: "/detail",
        query: {
          id: this.list.id,
        },
      });
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
  font-size: 13px;
  line-height: 16px;
}
</style>
