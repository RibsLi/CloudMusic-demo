<template>
  <div class="my-songs">
    <div class="hint" v-if="!userId">您还没有登录哦，先去登录吧</div>
    <div class="hint" v-else-if="!uPlaylist.length">还没有歌单哦，快去收藏你喜欢的歌单吧</div>
    <div class="like-songs" v-for="item in likeSongs" :key="item">
      <img :src="item.coverImgUrl" alt="" @click="itemClick(item.id)" />
      <span
        class="iconfont icon-bofang1 play-like"
        @click="playMusic"
      ></span>
      <div class="name">{{ item.name}}</div>
    </div>
    <songs-list>
      <songs-list-item v-for="item in uPlaylist" :key="item" :list="item" />
    </songs-list>
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
import { getUserPlaylist } from "network/user";
import {
  getPlaylistDetailCookie,
  getSongDetail,
} from "network/songdetail";
export default {
  name: "MySongs",
  data() {
    return {
      uid: window.sessionStorage.getItem('userId'),
      cookie: window.sessionStorage.getItem('cookie'),
      limit: 30,
      offset: 0,
      pagenum: 1,
      likeSongs: [],
      uPlaylist: [],
    };
  },
  components: {
    SongsList,
    SongsListItem
  },
  computed: {
    userId() {
      return window.sessionStorage.getItem('userId')
    }
  },
  watch: {
    uid() {
      this.getUserPlaylist();
    }
  },
  created() {
    if (window.sessionStorage.getItem('userId')) {
      this.getUserPlaylist();
    } else {
      return this.$message.warning("您还没有登录，先去登录吧");
    }
  },
  methods: {
    // 获取收藏的歌单
    getUserPlaylist() {
      getUserPlaylist(this.uid, this.limit, this.offset).then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
          this.likeSongs = res.data.playlist.slice(0, 1)
          this.uPlaylist = res.data.playlist.slice(1, res.data.playlist.length);
        }
      });
    },
    itemClick(id) {
      this.$router.push({
        path: "/myLike",
        query: {
          id
        },
      });
    },
    playMusic() {
      getPlaylistDetailCookie(this.likeSongs[0].id, this.cookie).then((res) => {
        // console.log(res);
        const trackIds = [];
        res.data.playlist.trackIds.forEach((item) => {
          trackIds.push(item.id);
        });
        getSongDetail(trackIds).then((res) => {
          // console.log(res);
          this.$store.commit("subSongDetail", res.data.songs);
        });
      });
    }
  },
};
</script>

<style lang="less" scoped>
.slide {
  margin-top: 0;
  border-top: none
}
.hint {
  color: #aaa;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
}
.like-songs {
  width: 200px;
  margin: 5px 0 10px;
  position: relative;
  &:hover .play-like {
    color: #ff0000;
  }
  img {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 3px;
    cursor: pointer;
  }
  .play-like {
    position: absolute;
    top: 160px;
    right: 10px;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
  .name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  line-height: 16px;
}
}
</style>