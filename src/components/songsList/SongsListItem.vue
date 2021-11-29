<template>
  <div class="slide-item">
    <img :src="imgUrl" alt=""  @click="itemClick" />
    <div class="play-count" v-if="list.playCount ? true : false">
      <span class="count">
        <i class="el-icon-headset"></i>
        {{playCount}}
      </span>
    </div>
    <span class="iconfont icon-bofang1 play" v-if="!isShow" @click="playMusic"></span>
    <div class="name">{{ list.name }}</div>
    <div class="author">
      <span class="singer" v-for="item in list.artists" :key="item" @click="singerClick(item.id)">
        {{ item.name }} &nbsp;
      </span>
    </div>
  </div>
</template>

<script>
import { getPlaylistDetail, getSongDetail } from "network/songdetail";
import { getAlbumContent } from "network/singer"
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
  data() {
    return {
      trackIds: [],
      tableData: [],
      albumIds: [],
      albumData: []
    }
  },
  computed: {
    playCount() {
      const count = this.list.playCount;
      if (count < 10000) return count;
      return (count / 10000).toFixed(1) + "万";
    },
    imgUrl() {
      return this.list.img1v1Url || this.list.picUrl || this.list.coverImgUrl || this.list.cover || this.list.imgurl
    },
    isShow() {
      return this.list.type == 5 || this.list.mark == 0 || this.list.subed == false || !this.list.albumSize
    }
  },
  methods: {
    // 获取歌单详情
    getPlaylistDetail() {
      getPlaylistDetail(this.list.id).then((res) => {
        // console.log(res);
        res.data.playlist.trackIds.forEach((item) => {
          this.trackIds.push(item.id);
        });
        getSongDetail(this.trackIds).then((res) => {
          // console.log(res);
          this.tableData = res.data.songs;
        });
      });
    },
    // 获取专辑内容
    getAlbumContent() {
      getAlbumContent(this.list.id).then(res => {
        // console.log(res);
        res.data.songs.forEach((item) => {
          this.albumIds.push(item.id);
        });
        getSongDetail(this.albumIds).then((res) => {
          // console.log(res);
          this.albumData.push(...res.data.songs);
        });
      })
    },
    playMusic() {
      if (this.list.type == 'Single' || this.list.type == '专辑') {
        // console.log(this.list);
        this.getAlbumContent()
        this.$store.commit("addSongDetail", this.albumData)
        // console.log(this.albumData);
        // console.log(this.$store.state.songDetail);
      }
      else if (!this.isShow) {
        this.getPlaylistDetail()
        // this.$store.commit("addSongId", this.trackIds)
        this.$store.commit("addSongDetail", this.tableData)
        // console.log(this.$store.state.songId);
      }
    },
    singerClick(id) {
      // console.log(id);
      this.$router.push({
        path: "/singerDetail",
        query: {
          id
        },
      });
    },
    itemClick() {
      // 如果type=0前往歌单详情列表
      // 如果type=5前往视频列表
      console.log(this.list);
      if (this.isShow) {
        this.$router.push({
          path: "/mvDetail",
          query: {
            id: this.list.id,
          },
        });
      }
      else if(this.list.albumSize) {
        this.$router.push({
          path: "/singerDetail",
          query: {
            id: this.list.id,
          },
        });
      }
      else if(this.list.type == 'Single' || this.list.type == '专辑') {
        this.$router.push({
          path: "/albumDetail",
          query: {
            id: this.list.id,
          },
        });
      }
      else {
        this.$router.push({
          path: "/songDetail",
          query: {
            id: this.list.id,
          },
        });
      }
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
  cursor: pointer;
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
  cursor: pointer;
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
.singer {
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
</style>
