<template>
  <div class="my-collect">
    <div class="hint" v-if="!userId">您还没有登录哦，先去登录吧</div>
    <div v-else>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="专辑" name="album">
          <album-table :albumList="albumList"/>
        </el-tab-pane>
        <el-tab-pane label="歌手" name="singer">
          <singer-table :singerList="singerList"/>
        </el-tab-pane>
        <el-tab-pane label="视频" name="mv">
          <songs-list>
            <songs-list-item v-for="item in mvList" :key="item" :list="item" />
          </songs-list>
        </el-tab-pane>
        <el-tab-pane label="专栏" name="column">收藏的专栏</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import AlbumTable from "./childComps/AlbumTable";
import SingerTable from "./childComps/SingerTable";
import { SongsList, SongsListItem } from "components/songsList";
import { getAlbumSub, getSingerSub, getMvSub } from "network/user"
export default {
  name: "MyCollect",
  data() {
    return {
      activeName: 'album',
      uid: window.sessionStorage.getItem('userId'),
      cookie: window.sessionStorage.getItem('cookie'),
      limit: 25,
      offset: 0,
      albumList: [],
      singerList: [],
      mvList: []
    }
  },
  components: {
    AlbumTable,
    SingerTable,
    SongsList,
    SongsListItem
  },
  computed: {
    userId() {
      return window.sessionStorage.getItem('userId')
    }
  },
  created() {
    if (window.sessionStorage.getItem('userId')) {
      this.getAlbumSub()
    } else {
      return this.$message.warning("您还没有登录，先去登录吧");
    }
  },
  methods: {
    // 收藏的专辑
    getAlbumSub() {
      getAlbumSub(this.limit, this.offset, this.cookie).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.albumList = res.data.data
        }
      })
    },
    // 收藏的歌手
    getSingerSub() {
      getSingerSub(this.cookie).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.singerList = res.data.data
        }
      })
    },
    // 收藏的mv
    getMvSub() {
      getMvSub(this.cookie).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.mvList = res.data.data
        }
      })
    },
    handleClick() {
      this.getSingerSub()
      this.getMvSub()
    }
  },
}
</script>

<style lang="less" scoped>
.hint {
  color: #aaa;
}
.slide-item {
  width: 415px;
}
.slide {
  margin-top: 0;
  border-top: none
}
</style>