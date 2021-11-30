<template>
  <div class="detail">
    <!-- 详情头部 -->
    <detail-header :artist="artist"/>
    <!-- tabs标签页 -->
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <!-- 歌单列表 -->
      <el-tab-pane label="专辑" name="album">
        <album-table :albumList="albumList"/>
        <!-- <album :albumList="albumList" :topSong="topSong"/> -->
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div v-if="mvs.length">
          <songs-list>
            <songs-list-item v-for="item in mvs" :key="item" :list="item" />
          </songs-list>
        </div>
        <p v-else class="no-mv">没有相关MV</p>
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="detail">
        <div v-if="introduction.length">
          <div class="desc" v-for="item in introduction" :key="item">
            <h4>{{item.ti}}</h4>
            <div class="desc-info">{{item.txt}}</div>
          </div>
        </div>
        <p v-else class="no-mv">暂无相关介绍</p>
      </el-tab-pane>
      <el-tab-pane label="相似歌手" name="similar">
        <div class="simi-box" v-if="artists.length">
          <div class="simi-item" v-for="item in artists" :key="item">
            <img :src="item.picUrl" alt="" @click="itemClick(item.id)">
            <div class="item-name">{{item.name}}</div>
          </div>
        </div>
        <p v-else class="no-mv">没有相关歌手</p>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DetailHeader from "./childComps/DetailHeader";
import AlbumTable from "./childComps/AlbumTable";
import { SongsList, SongsListItem } from "components/songsList";
// import Album from "./childComps/Album";
import { getArtistDetail, getAlbum, getArtistMV, getArtistDesc, getSimiArtist } from "network/singer"
export default {
  name: "SingerDetail",
  data() {
    return {
      id: '',
      artist: {},
      activeName: "album",
      albumList: [],
      topSong: [],
      mvs: [],
      introduction: [],
      artists: [],

    }
  },
  components: {
    DetailHeader,
    AlbumTable,
    SongsList,
    SongsListItem,
    // Album
  },
  created() {
    this.id = this.$route.query.id;
    this.getArtistDetail()
    this.getAlbum()
    this.getArtistMV()
    this.getArtistDesc()
    this.getSimiArtist()
  },
  computed: {
    getId() {
      return this.$route.query.id
    }
  },
  watch: {
    getId(newid) {
      if (this.$route.path == '/singerDetail') {
        this.id = newid
        this.getArtistDetail()
        this.getAlbum()
        this.getArtistMV()
        this.getArtistDesc()
        this.getSimiArtist()
      }
    }
  },
  methods: {
    // 获取歌手详情
    getArtistDetail() {
      getArtistDetail(this.id).then(res => {
        // console.log(res);
        this.artist = res.data.data.artist
      })
    },
    // 获取歌手专辑
    getAlbum() {
      getAlbum(this.id).then(res => {
        // console.log(res);
        this.albumList = res.data.hotAlbums
        // 遍历每个榜单获取id 请求对应榜单歌单
        // res.data.hotAlbums.forEach((item) => {
        //   getAlbumContent(item.id).then((res) => {
        //     // console.log(res);
        //     this.topSong.push(res.data);
        //     // console.log(this.topSong);
        //   });
        // });
      })
    },
    // 获取歌手mv
    getArtistMV() {
      getArtistMV(this.id).then(res => {
        // console.log(res);
        this.mvs = res.data.mvs
        if (this.mvs.length) {
          this.mvs.length = 8
        }
      })
    },
    // 获取歌手描述
    getArtistDesc() {
      getArtistDesc(this.id).then(res => {
        // console.log(res);
        this.introduction = res.data.introduction
      })
    },
    // 获取相似歌手
    getSimiArtist() {
      getSimiArtist(this.id).then(res => {
        // console.log(res);
        this.artists = res.data.artists
      })
    },
    // tabs标签切换事件
    tabClick() {},
    // 相似歌手点击事件
    itemClick(id) {
      getArtistDetail(id).then(res => {
        // console.log(res);
        this.artist = res.data.data.artist
      })
      getAlbum(id).then(res => {
        // console.log(res);
        this.albumList = res.data.hotAlbums
      })
      getArtistMV(id).then(res => {
        // console.log(res);
        this.mvs = res.data.mvs
        this.mvs.length = 8
      })
      getArtistDesc(id).then(res => {
        // console.log(res);
        this.introduction = res.data.introduction
      })
      getSimiArtist(id).then(res => {
        // console.log(res);
        this.artists = res.data.artists
      })
      this.activeName = "album"
    }
  },
}
</script>

<style lang="less" scoped>
.slide-item {
  width: 415px;
}
.slide {
  margin-top: 0;
  border-top: 0;
}
.desc {
  line-height: 40px;
}
.desc-info {
  text-indent: 28px;
  color: rgb(71, 70, 70);
  font-size: 14px;
}
.simi-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.simi-item {
  margin: 10px 0;
  img {
    width: 415px;
    height: 350px;
    vertical-align: middle;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
  }
}
.no-mv {
  font-size: 14px;
  color: #aaa;
}
.el-tabs {
  margin-top: 15px;
}
</style>