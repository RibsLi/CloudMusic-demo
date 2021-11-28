<template>
  <div class="leaderboard">
    <official :toplist="toplist" :topSong="topSong" @songsClick="songsClick"  @songClick="songClick" />
    <global :global="global"/>
  </div>
</template>

<script>
import Official from "./childComps/Official";
import Global from "./childComps/Global"
import { getToplist } from "network/leaderboard";
import { getPlaylistDetail, getSongDetail } from "network/songdetail";

export default {
  name: "Leaderboard",
  data() {
    return {
      toplist: [],
      topSong: [],
      global: [],
      tableData: []
    };
  },
  components: {
    Official,
    Global
  },
  created() {
    this.getToplist();
  },
  methods: {
    // 获取排行榜
    getToplist() {
      getToplist().then((res) => {
        // console.log(res);
        this.global = res.data.list.slice(2, res.data.list.length)
        this.toplist = res.data.list;
        this.toplist.length = 4;
        // 遍历每个榜单获取id 请求对应榜单歌单
        res.data.list.forEach((item) => {
          getPlaylistDetail(item.id).then((res) => {
            // console.log(res);
            const topSong = res.data.playlist.tracks;
            topSong.length = 5;
            this.topSong.push(topSong);
            // console.log(this.topSong);
          });
        });
      });
    },
    songsClick(id) {
      getPlaylistDetail(id).then((res) => {
        // console.log(res);
        this.tableData = res.data.playlist.tracks
      })
      this.$store.commit("addSongDetail", this.tableData)
    },
    songClick(id) {
      getSongDetail(id).then(res => {
        // console.log(res);
        this.$store.commit("addSongDetail", res.data.songs)
      })
    }
  },
};
</script>

<style lang="less" scoped>
</style>