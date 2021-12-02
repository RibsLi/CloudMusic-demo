<template>
  <div class="my-songs">
    <div class="hint" v-if="!$store.state.profile">您还没有登录哦，先去登录吧</div>
    <div class="hint" v-else-if="!uPlaylist.length">还没有歌单哦，快去收藏你喜欢的歌单吧</div>
    <songs-list>
      <songs-list-item v-for="item in uPlaylist" :key="item" :list="item" />
    </songs-list>
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
import { getUserPlaylist } from "network/user";
export default {
  name: "MySongs",
  data() {
    return {
      userPlaylist: {
        uid: this.$store.state.profile.userId,
        limit: 30,
        offset: 0,
        pagenum: 1,
      },
      uPlaylist: [],
    };
  },
  components: {
    SongsList,
    SongsListItem
  },
  created() {
    console.log(this.$store.state.profile);
    if (this.$store.state.profile) {
      this.getUserPlaylist();
    } else {
      return this.$message.warning("您还没有登录，先去登录吧");
    }
  },
  methods: {
    getUserPlaylist() {
      getUserPlaylist(this.userPlaylist).then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          this.uPlaylist = res.data.playlist;
        }
      });
    },
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
</style>