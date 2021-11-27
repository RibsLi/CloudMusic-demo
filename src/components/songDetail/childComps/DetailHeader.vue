<template>
  <div class="detail-header">
    <div><img :src="playlist.coverImgUrl" alt="" /></div>
    <div class="detail-info">
      <h3>{{ playlist.name }}</h3>
      <div class="create-user">
        <span class="user-left">
          <img :src="creator.avatarUrl" alt="" />
          <span class="user">{{ creator.nickname }}</span>
        </span>
        <span>{{ dateInfo(playlist.createTime) }} 创建</span>
      </div>
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
        <el-button round size="small" icon="el-icon-folder-add">收藏</el-button>
        <el-button round size="small" icon="el-icon-share">分享</el-button>
        <el-button round size="small" icon="el-icon-download"
          >下载全部</el-button
        >
      </div>
      <div class="tag">
        <div class="tag-item">
          标签 ：
          <span v-for="item in playlist.tags" :key="item" @click="tagClick(item)">{{ item }} &nbsp; </span>
        </div>
        <div>
          <span class="song-count">歌曲 ：{{ playlist.trackCount }}</span>
          <span>播放 ：{{ (playlist.playCount / 10000).toFixed() }}万</span>
        </div>
        <div>简介 ：{{ playlist.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "DetailHeader",
  props: {
    playlist: {
      type: Object,
      default() {
        return {}
      }
    },
    creator: {
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
  },
};
</script>

<style lang="less" scoped>
.el-button-group {
  margin-right: 10px;
}
.iconfont {
  margin: 0 3px;
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
.create-user {
  font-size: 13px;
  .user-left {
    cursor: pointer;
  }
  img {
    width: 35px;
    height: 35px;
    border-radius: 100%;
    vertical-align: middle;
    margin: 10px 10px 7px 0;
  }
}
.user {
  margin-right: 10px;
  color: #409eff;
}
.btn-box {
  margin: 6px 0;
}
.tag {
  line-height: 25px;
  font-size: 14px;
  color: rgb(94, 91, 91);
  .song-count {
    margin-right: 10px;
  }
  .tag-item {
    span {
      color: #409eff;
      cursor: pointer;
    }
  }
}
</style>