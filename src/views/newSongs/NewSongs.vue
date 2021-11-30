<template>
  <div class="new-songs">
    <div class="tab-bar">
      <div
        class="tab-bar-item"
        v-for="(item, index) in tabBar"
        :key="index"
        :class="{ tabactive: tabIndex == index }"
        @click="tabBarClick(index)"
      >
        {{ item }}
      </div>
    </div>
    <div class="cate">
      <ul class="cate-left">
        <li
          v-for="(item, index) in cateList"
          :key="index"
          :class="{ catactive: cateIndex == index }"
          @click="cateClick(item, index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="cate-right">
        <el-button type="primary" size="mini" round icon="el-icon-video-play" @click="playMusic"
          >播放全部</el-button
        >
        <el-button size="mini" round icon="el-icon-folder-add"
          >收藏全部</el-button
        >
      </div>
    </div>
    <song-table-data :songData="songData" v-if="tabIndex==0" @songClick="songClick" />
    <album :albumData="albumData" v-else/>
  </div>
</template>

<script>
import SongTableData from "./childComps/SongTableData";
import Album from "./childComps/Album"
import { getTopSong, getAlbum } from "network/discovery";
import { getSongDetail } from "network/songdetail";
export default {
  name: "NewSongs",
  data() {
    return {
      tabBar: ["新歌速递", "新碟上架"],
      tabIndex: 0,
      cateIndex: 1,
      cateList: [
        { name: "全部", type: 0, area: 'ALL' },
        { name: "华语", type: 7, area: 'ZH' },
        { name: "欧美", type: 96, area: 'EA' },
        { name: "韩国", type: 16, area: 'KR' },
        { name: "日本", type: 8, area: 'JP' },
      ],
      songParams: {
        type: 7,
        limit: 30,
        offset: 0,
      },
      songData: [],
      albumParams: {
        limit: 24,
        offset: 0,
        type: 'new',
        area: 'ZH',
      },
      albumData: [],
      isShow: false,
      trackIds: [],
      tableData: []
    };
  },
  components: {
    SongTableData,
    Album
  },
  created() {
    this.getTopSong();
  },
  methods: {
    // 顶部导航点击事件
    tabBarClick(index) {
      this.tabIndex = index;
      if (index == 1) {
        this.getAlbum()
      }
    },
    // 菜单分类点击事件
    cateClick(item, index) {
      this.cateIndex = index;
      this.songParams.type = item.type;
      this.getTopSong();
      this.albumParams.area = item.area
      this.getAlbum()
    },
    // 请求新歌速递列表数据
    getTopSong() {
      getTopSong(this.songParams).then((res) => {
        // console.log(res);
        this.songData = res.data.data;
        this.songData.length = 30;
        this.songData.forEach((item) => {
          this.trackIds.push(item.id);
        });
        getSongDetail(this.trackIds).then((res) => {
          // console.log(res);
          this.tableData = res.data.songs;
        });
      });
    },
    // 请求新碟上架数据
    getAlbum() {
      getAlbum(this.albumParams).then(res => {
        // console.log(res);
        this.albumData = res.data.monthData
        this.albumData.length = 24
      })
    },
    //获取单首音乐
    songClick(id) {
      getSongDetail(id).then(res => {
        // console.log(res);
        this.$store.commit("addSongDetail", res.data.songs)
      })
    },
    playMusic() {
      this.$store.commit("subSongDetail", this.tableData)
    },
  },
};
</script>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  // justify-content: space-between;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  width: 300px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  .tab-bar-item {
    width: 150px;
    border-radius: 20px;
  }
  .tabactive {
    background-color: #66b1ff;
    color: #fff;
  }
}
.cate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  .cate-left {
    display: flex;
    li {
      margin: 0 5px;
      color: #606266;
      padding: 3px 10px;
      cursor: pointer;
      &:hover {
        color: #ff0000;
      }
    }
    .catactive {
      background-color: rgba(255, 0, 0, 0.7);
      border-radius: 10px;
      color: #fff !important;
    }
  }
}
</style>