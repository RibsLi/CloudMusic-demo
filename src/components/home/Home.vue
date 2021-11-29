<template>
  <el-container>
    <el-header>
      <div class="top-bar">
        <div class="logo" @click="logoClick">
          <img src="~assets/images/logo.png" alt="" />
        </div>
        <div class="box-icon">
          <el-button
            type="info"
            size="small"
            icon="el-icon-arrow-left"
            circle
            @click="backClick"
          ></el-button>
          <el-button
            type="info"
            size="small"
            icon="el-icon-arrow-right"
            circle
            @click="goClick"
          ></el-button>
        </div>
        <div class="search">
          <el-input
            size="small"
            v-model="keywords"
            :placeholder="realkeyword"
            prefix-icon="iconfont icon-sousuo"
            @change="searchClick"
            @focus="showQuery"
            @blur="noQuery"
          />
          <div class="input-query" v-show="isQuery">
            <el-scrollbar>
              <h4>热搜榜</h4>
              <div class="query-box" v-for="(item, index) in hotSearch" :key="index" @click="hotSearchClick(item)">
                <div class="query-index" :style="index < 3 ? 'color: #ff0000' : ''">{{index+1}}</div>
                <div class="box-right">
                  <div class="searchWord">{{item.searchWord}}<span>{{item.score}}</span></div>
                  <div class="content">{{item.content}}</div>
                </div>
              </div>
            </el-scrollbar>
          </div>
          <div class="input-query" v-show="isSuggest">
            <el-scrollbar>
              <h4>搜 <span style="color: #409eff"> {{keywords}} </span> 相关的结果</h4>
              <div v-show="songs">
                <div class="sug-title"><span class="iconfont icon-yinle"></span> 单曲</div>
                <ul class="sug-ul">
                  <li v-for="item in songs" :key="item" @click="songClick(item.id)">
                    {{item.name}}
                    <i>{{item.alias[0]}}</i>
                     - 
                    <span v-for="item in item.artists" :key="item">{{item.name}} &nbsp;</span>
                  </li>
                </ul>
              </div>
              <div v-show="artists">
                <div class="sug-title"><span class="iconfont icon-geshou"></span> 歌手</div>
                <ul class="sug-ul">
                  <li v-for="item in artists" :key="item" @click="singerClick(item.id)">
                    {{item.name}}
                  </li>
                </ul>
              </div>
              <div v-show="albums">
                <div class="sug-title"><span class="iconfont icon-zhuanji"></span> 专辑</div>
                <ul class="sug-ul">
                  <li v-for="item in albums" :key="item" @click="albumClick(item.id)">
                    {{item.name}} - {{item.artist.name}}
                  </li>
                </ul>
              </div>
              <div v-show="playlists">
                <div class="sug-title"><span class="iconfont icon-dingdan"></span> 歌单</div>
                <ul class="sug-ul">
                  <li v-for="item in playlists" :key="item" @click="playlistClick(item.id)">
                    {{item.name}}
                  </li>
                </ul>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isToggle ? '64px' : '150px'">
        <div class="toggle" @click="toggleClick">
          <div v-show="!isToggle" class="is-toggle">
            <i class="el-icon-arrow-left"></i>
            <i class="el-icon-arrow-left"></i>
            <i class="el-icon-arrow-left"></i>
          </div>
          <div v-show="isToggle" class="no-toggle">
            <i class="el-icon-arrow-right"></i>
            <i class="el-icon-arrow-right"></i>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <el-menu
          active-text-color="#fff"
          background-color="#3a3d44"
          text-color="#aaa"
          :collapse="isToggle"
          :collapse-transition="false"
          router
          :default-active="isActive"
        >
          <el-menu-item
            :index="item.path"
            v-for="(item, index) in menu"
            :key="index"
            @click="saveStateClick(item.path)"
          >
            <i class="iconfont" :class="icon[index]"></i>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer height="70px">
      <aplayer />
    </el-footer>
  </el-container>
</template>

<script>
import Aplayer from "components/aplayer/Aplayer.vue";
import { getSearch, getDefSearch, getHotSearch, getSuggest } from "network/search";
import {
  // getPlaylistDetail,
  getSongDetail
} from "network/songdetail";
export default {
  name: "Home",
  data() {
    return {
      keywords: "",
      limit: 100,
      type: 1,
      offset: 0,
      menu: [
        { title: "发现音乐", path: "/discovery" },
        { title: "推荐歌单", path: "/recommends" },
        { title: "最新音乐", path: "/newSongs" },
        { title: "最新MV", path: "/newMV" },
        { title: "排行榜单", path: "/leaderboard" },
        { title: "热门歌手", path: "/singer" },
        { title: "我的歌单", path: "/mySongs" },
        { title: "我的收藏", path: "/myCollect" },
      ],
      icon: [
        "icon-logo-dark1-copy",
        "icon-dingdan",
        "icon-yinle",
        "icon-mv",
        "icon-paixingbang",
        "icon-geshou",
        "icon-dingdan",
        "icon-shoucang",
      ],
      isToggle: false,
      isActive: "",
      hotSearch: [],
      realkeyword: "",
      isQuery: false,
      isSuggest: false,
      serachData: [],
      artistsData: [],
      result: [
        {name: '单曲', data: []},
        {name: '歌手', data: []},
        {name: '专辑', data: []},
        {name: '歌单', data: []}
      ],
      albums: null,
      artists: null,
      playlists: null,
      songs: null
    };
  },
  components: {
    Aplayer,
  },
  watch: {
    keywords(val) {
      this.isQuery = false
      this.isSuggest = true
      this.getSuggest()
      this.$store.commit('serachData', this.serachData)
      this.$store.commit('keywords', val)
      // console.log(this.$store.state.keywords);
    }
  },
  created() {
    this.isActive = window.sessionStorage.getItem("activePath")
      ? window.sessionStorage.getItem("activePath")
      : "/discovery";
    this.getDefSearch();
    this.getHotSearch();
  },
  methods: {
    // 折叠菜单栏
    toggleClick() {
      this.isToggle = !this.isToggle;
    },
    logoClick() {
      this.$router.push("/discovery");
    },
    backClick() {
      this.$router.back();
    },
    goClick() {
      this.$router.go(1);
    },
    saveStateClick(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    },
    // 搜索
    searchClick() {
      this.isQuery = false
      if (this.keywords) {
        getSearch(this.keywords, this.limit, this.type, this.offset).then((res) => {
          // console.log(res);
          if (res.data.code === 200) {
            this.serachData = res.data.result.songs
            this.$store.commit('serachData', res.data.result.songs)
            this.$router.push('/searchDetail')
          }
        });
      }
    },
    // 默认搜索关键词
    getDefSearch() {
      getDefSearch().then((res) => {
        // console.log(res);
        this.realkeyword = res.data.data.realkeyword;
      });
    },
    // 请求热搜列表
    getHotSearch() {
      getHotSearch().then((res) => {
        // console.log(res);
        this.hotSearch = res.data.data;
      });
    },
    // 热搜列表的展示
    showQuery() {
      if (this.keywords) {
        this.isQuery = false
        this.isSuggest = true
      } else {
        this.isQuery = true
        this.isSuggest = false
      }
    },
    noQuery() {
      setTimeout(() => {
        this.isQuery = false
        this.isSuggest = false
      }, 200);
    },
    // 热搜列表点击事件
    hotSearchClick(item) {
      this.keywords = item.searchWord
      this.searchClick()
      this.isQuery = false
    },
    // 搜索建议
    getSuggest() {
      getSuggest(this.keywords).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.albums = res.data.result.albums
          this.artists = res.data.result.artists
          this.playlists = res.data.result.playlists
          this.songs = res.data.result.songs
        }
      })
    },
    //获取单首音乐
    songClick(id) {
      getSongDetail(id).then(res => {
        // console.log(res);
        this.$store.commit("addSongDetail", res.data.songs)
      })
    },
    // 歌手跳转
    singerClick(id) {
      // console.log(id);
      this.$router.push({
        path: "/singerDetail",
        query: {
          id
        },
      });
    },
    // 专辑跳转
    albumClick(id) {
      // console.log('---');
      this.$router.push({
        path: "/albumDetail",
        query: {
          id
        },
      })
    },
    // 歌单跳转
    playlistClick(id) {
      this.$router.push({
        path: "/songDetail",
        query: {
          id
        },
      });
    }
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
}
.el-header {
  padding: 0;
  border-bottom: 2px solid #ff0000;
}
.el-footer {
  padding: 0;
}
.top-bar {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #242424;
  .logo {
    margin: 0 22px;
    cursor: pointer;
  }
  .box-icon {
    margin: auto 0;
  }
  .search {
    margin: auto 30px;
    width: 300px;
    position: relative;
    .input-query {
      position: absolute;
      top: 34px;
      left: 0;
      z-index: 9;
      width: 350px;
      height: 400px;
      font-size: 14px;
      border-radius: 5px;
      box-shadow: 0 0 2px #eee;
      background-color: #fff;
      color: #aaa;
      h4 {
        line-height: 40px;
        margin-left: 20px;
      }
      .query-box {
        display: flex;
        align-items: center;
        line-height: 20px;
        margin: 10px 0;
        cursor: pointer;
        &:hover {
          background-color: #eee;
        }
        .query-index {
          margin-left: 20px;
        }
        .box-right {
          margin: 5px 10px 5px 20px;
          .searchWord {
            font-weight: 500;
            color: #000;
            span {
              color: #aaa;
              font-weight: normal;
              margin-left: 10px;
              font-size: 12px;
            }
          }
          .content {
            width: 300px;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
.sug-title {
  line-height: 30px;
  background-color: #eee;
  color: rgb(80, 77, 77);
  padding-left: 20px;
  span {
    margin-right: 10px;
  }
}
.sug-ul {
  li {
    padding-left: 35px;
    line-height: 30px;
    color: rgb(80, 77, 77);
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
    i {
      font-size: 12px;
      color: #aaa;
    }
  }
}
// .el-input {
// --el-input-border-radius: 5px;
// }
.el-button {
  font-size: 16px;
}
.el-aside {
  // margin-top: 2px;
  background-color: #3a3d44;
  .toggle {
    background-color: #67676b;
    font-size: 16px;
    line-height: 30px;
    color: #fff;
    text-align: center;
  }
  .el-menu {
    border-right: 0;
  }
  .el-menu-item {
    text-align: center;
  }
  .el-menu-item:focus {
    background-color: rgb(46, 49, 54);
  }
}
.iconfont {
  margin-right: 5px;
}
.el-main {
  min-width: 890px;
  max-width: 1856px;
  // height: cale( 100% -93px);
  height: 85vh;
  overflow-y: scroll;
}
.is-toggle i:nth-child(1) {
  animation: animat 1s linear 0.3s infinite;
}
.is-toggle i:nth-child(2) {
  animation: animat 1s linear 0.2s infinite;
}
.is-toggle i:nth-child(3) {
  animation: animat 1s linear 0.1s infinite;
}
@keyframes animat {
  0% {
    color: #000;
  }
  100% {
    color: #fff;
  }
}
.no-toggle i:nth-child(1) {
  animation: animat 1s linear 0.1s infinite;
}
.no-toggle i:nth-child(2) {
  animation: animat 1s linear 0.2s infinite;
}
.no-toggle i:nth-child(3) {
  animation: animat 1s linear 0.3s infinite;
}
</style>