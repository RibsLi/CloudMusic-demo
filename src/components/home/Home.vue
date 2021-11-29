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
import { getSearch, getDefSearch, getHotSearch } from "network/search";
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
      serachData: [],
      artistsData: []
    };
  },
  components: {
    Aplayer,
  },
  watch: {
    keywords(val) {
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
      } else {
        this.isQuery = true
      }
    },
    noQuery() {
      setTimeout(() => {
        this.isQuery = false
      }, 200);
    },
    // 热搜列表点击事件
    hotSearchClick(item) {
      this.keywords = item.searchWord
      this.searchClick()
      this.isQuery = false
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
        .box-right {margin: 5px 10px 5px 20px;
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
            font-size: 12px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
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