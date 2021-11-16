<template>
  <div class="recommend">
    <slide>
      <template v-slot:top-left> 推荐歌单 </template>
      <template v-slot:top-more>
        <el-button type="info"
          >更多<i class="el-icon-arrow-right"></i
        ></el-button>
      </template>
      <slide-item v-for="item in recommends" :key="item">
        <img :src="item.picUrl" alt="" />
        <div class="play-count">
          <span class="count">
            <i class="el-icon-headset"></i>
            {{ (item.playCount / 10000).toFixed(1) }}万
          </span>
        </div>
        <span class="iconfont icon-bofang1 play"></span>
        <div class="name">{{ item.name }}</div>
      </slide-item>
    </slide>
  </div>
</template>

<script>
import { Slide, SlideItem } from "components/slide";
export default {
  name: "Recommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    Slide,
    SlideItem,
  },
  computed: {
    // 播放次数
    playCount() {
      const count = this.recommends[0].playCount;
      if (count < 10000) return count;
      return (count / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style lang="less" scoped>
.el-button {
  box-sizing: content-box;
  border-radius: 16px;
  min-height: 16px;
  padding: 3px 10px;
  font-size: 14px;
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
  color: rgba(255, 255, 255, 0.8);
}
.name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 13px;
}
</style>