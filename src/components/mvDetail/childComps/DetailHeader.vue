<template>
  <div class="detail-header">
    <div class="detail-left">
      <div>
        <div @click="backClick" class="title">
          <i class="iconfont icon-arrow-right"></i> MV详情
        </div>
      </div>
      <div class="video-box">
        <video :src="mvUrl" controls autoplay></video>
        <div>
          <div class="author" @click="authorClick(mvDetail.artistId)">
            <img :src="cover" alt="" />
            <span>{{ mvDetail.artistName }}</span>
          </div>
        </div>
        <h2>{{ mvDetail.name }}</h2>
        <div class="count">
          <span>发布：{{ mvDetail.publishTime }}</span>
          <span>播放：{{ playCount }}次</span>
        </div>
        <div class="desc-info">{{mvDetail.desc}}</div>
        <div class="btn">
          <el-button round size="mini">
            <i class="iconfont icon-z-like"></i>
            赞
          </el-button>
          <el-button round size="mini">
            <i class="iconfont icon-24gl-folderPlus"></i>
            收藏 ({{ mvDetail.subCount }})
          </el-button>
          <el-button round size="mini">
            <i class="iconfont icon-fenxiang1"></i>
            分享 ({{ mvDetail.shareCount }})
          </el-button>
          <el-button round size="mini">
            <i class="iconfont icon-xiazai"></i>
            下载MV
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailHeader",
  props: {
    mvUrl: String,
    mvDetail: {
      type: Object,
      default() {
        return {}
      }
    },
    cover: String,
  },
  computed: {
    // 处理播放次数
    playCount() {
      const count = this.mvDetail.playCount;
      if (count < 10000) return count;
      return (count / 10000).toFixed() + "万";
    },
  },
  methods: {
    // 点击作者跳转到队友歌手专辑页面
    authorClick(id) {
      this.$router.push({
        path: "/singerDetail",
        query: {
          id,
        },
      });
    },
    // 顶部回退
    backClick() {
      this.$router.back();
    },
  },
}
</script>

<style lang="less" scoped>
.iconfont {
  font-size: 14px;
}
.detail-header {
  display: flex;
  justify-content: space-between;
  .title {
    display: inline-block;
    line-height: 40px;
    font-weight: 600;
    cursor: pointer;
  }
}
.detail-left {
  .video-box video {
    // width: 70%;
    margin-bottom: 10px;
    height: 600px;
  }
  .author {
    display: inline-block;
    height: 60px;
    cursor: pointer;
    img {
      width: 60px;
      height: 60px;
      border-radius: 100%;
      margin-right: 10px;
      vertical-align: middle;
    }
    span {
      color: #409eff;
    }
  }
  h2 {
    margin: 20px 0;
  }
}
.btn {
  margin: 10px 0 30px;
}
.count {
  margin: 10px 0;
  line-height: 30px;
  color: #aaa;
  font-size: 14px;
  span {
    margin-right: 10px;
  }
}
.desc-info {
  color: #aaa;
  font-size: 14px;
  text-indent: 28px;
  line-height: 30px;
}
</style>