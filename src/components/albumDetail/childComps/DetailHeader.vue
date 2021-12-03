<template>
  <div class="detail-header">
    <div><img :src="album.picUrl" alt="" /></div>
    <div class="detail-info">
      <h3>{{ album.name }}</h3>
      <div class="btn-box">
        <el-button-group>
          <el-button type="primary" round size="small" icon="el-icon-video-play" @click="playMusic"
            >播放全部</el-button
          >
          <el-button
            type="primary"
            round
            size="small"
            icon="el-icon-plus"
            @click="playMusic"
          ></el-button>
        </el-button-group>
        <el-button round size="small" icon="el-icon-folder-add" @click="collectClick">收藏</el-button>
        <el-button round size="small" icon="el-icon-share">分享</el-button>
        <el-button round size="small" icon="el-icon-download"
          >下载全部</el-button
        >
      </div>
      <div class="tag">
        <div>歌手：<span>{{artist.name}}</span></div>
        <div>时间：{{ dateInfo(album.publishTime) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "DetailHeader",
  props: {
    album: {
      type: Object,
      default() {
        return {}
      }
    },
    artist: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 日期处理函数
    dateInfo(date) {
      const data = new Date(date);
      return formatDate(data, "yyyy-MM-dd");
    },
    tagClick(item) {
      // this.$router.push('/recommends')
      // console.log(item);
      this.$router.push({
        path: "/recommends",
        query: {
          cat: item
        },
      });
    },
    playMusic() {
      this.$emit('songsClick')
    },
    // 收藏专辑
    collectClick() {
      this.$emit('collectClick')
    }
  },
};
</script>

<style lang="less" scoped>
.el-button-group {
  margin-right: 10px;
}
.detail-header {
  display: flex;
  height: 200px;
  overflow: hidden;
}
.detail-header img {
  width: 200px;
  height: 200px;
  margin-right: 25px;
  border-radius: 5px;
}
.btn-box {
  margin: 20px 0;
}
.tag {
  line-height: 25px;
  font-size: 14px;
  color: rgb(94, 91, 91);
  span {
    color: #409eff;
    cursor: pointer;
  }
  
}
</style>