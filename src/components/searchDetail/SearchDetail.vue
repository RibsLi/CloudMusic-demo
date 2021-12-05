<template>
  <div class="search-detail">
    <!-- tabs标签页 -->
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <!-- 歌单列表 -->
      <el-tab-pane label="单曲" name="list">
        <song-data @songClick="songClick" />
      </el-tab-pane>
      <el-tab-pane label="歌手" name="singer">
        <singer-data :artists="artists"/>
        <el-pagination
          background
          hide-on-single-page
          :current-page="pagenum"
          :page-size="limit"
          layout="prev, pager, next"
          :total="artistCount"
          @current-change="CurrentChange"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="专辑" name="album">
        <album-data :albums="albums"/>
        <el-pagination
          background
          hide-on-single-page
          :current-page="pagenum"
          :page-size="limit"
          layout="prev, pager, next"
          :total="albumCount"
          @current-change="CurrentChange"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="视频" name="mv">
        <songs-list>
          <songs-list-item v-for="item in mvs" :key="item" :list="item" />
        </songs-list>
        <el-pagination
          background
          hide-on-single-page
          :current-page="pagenum"
          :page-size="limit"
          layout="prev, pager, next"
          :total="mvCount"
          @current-change="CurrentChange"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="playlists">
        <playlists :playlists="playlists"/>
        <el-pagination
          background
          hide-on-single-page
          :current-page="pagenum"
          :page-size="limit"
          layout="prev, pager, next"
          :total="playlistCount"
          @current-change="CurrentChange"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import SongData from "./childComps/SongData";
import SingerData from "./childComps/SingerData";
import AlbumData from "./childComps/AlbumData";
import Playlists from "./childComps/Playlists";
import { SongsList, SongsListItem } from "components/songsList";
import { getSearch } from "network/search";
import { getSongDetail } from "network/songdetail";
export default {
  name: "SearchDetail",
  data() {
    return {
      keywords: this.$store.state.keywords,
      limit: 30,
      type: 1,
      offset: 0,
      pagenum: 1,
      activeName: "list",
      songTableData: [],
      artists: [],
      artistCount: 0,
      albums: [],
      albumCount: 0,
      mvs: [],
      mvCount: 0,
      playlists: [],
      playlistCount: 0,

    };
  },
  components: {
    SongData,
    SingerData,
    AlbumData,
    SongsList,
    SongsListItem,
    Playlists
  },
  computed: {
    keyword() {
      return this.$store.state.keywords
    }
  },
  watch: {
    keyword() {
      this.tabClick()
    }
  },
  methods: {
    tabClick() {
      // 请求搜索歌手
      if (this.activeName == 'singer') {
        getSearch(this.$store.state.keywords, this.limit, this.type = 100, this.offset).then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            this.artists = res.data.result.artists
            this.artistCount = res.data.result.artistCount
          }
        })
      } else if (this.activeName == 'album') {
        // 请求搜索专辑
        getSearch(this.$store.state.keywords, this.limit, this.type = 10, this.offset).then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            this.albums = res.data.result.albums
            this.albumCount = res.data.result.albumCount
          }
        })
      } else if (this.activeName == 'mv') {
        // 请求搜索视频
        getSearch(this.$store.state.keywords, this.limit = 24, this.type = 1004, this.offset).then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            this.mvs = res.data.result.mvs
            this.mvCount = res.data.result.mvCount
          }
        })
      } else if (this.activeName == 'playlists') {
        // 请求搜索歌单
        getSearch(this.$store.state.keywords, this.limit, this.type = 1000, this.offset).then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            this.playlists = res.data.result.playlists
            this.playlistCount = res.data.result.playlistCount
          }
        })
      }
    },
    // 页码改变时执行的事件
    CurrentChange(newPage) {
      this.pagenum = newPage
      this.offset = (newPage - 1) * this.limit;
      this.tabClick()
    },
    songClick(id) {
      getSongDetail(id).then((res) => {
        // console.log(res);
        this.$store.commit("addSongDetail", res.data.songs);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.slide-item {
  width: 415px;
}
.slide {
  margin-top: 0px;
  border-top: 0;
}
@media screen and (max-width: 414px) {
  .slide-item {
    width: 100%;
  }
}
</style>