<template>
  <el-container>
    <el-header>
      <home-header @showMenu="showMenu"/>
    </el-header>
    <el-container>
      <el-aside :width="isToggle ? '64px' : '130px'" v-show="isMenu">
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
        <div class="menu-cover" @click="showMenu" v-show="isCover"></div>
      </el-main>
    </el-container>
    <el-footer height="70px">
      <aplayer />
    </el-footer>
    
  </el-container>
</template>

<script>
import HomeHeader from "./childComps/HomeHeader";
import Aplayer from "components/aplayer/Aplayer.vue";
export default {
  name: "Home",
  data() {
    return {
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
      isMenu: true,
      isCover: true
    };
  },
  components: {
    HomeHeader,
    Aplayer,
  },
  created() {
    this.isActive = window.sessionStorage.getItem("activePath")
      ? window.sessionStorage.getItem("activePath")
      : "/discovery";
  },
  methods: {
    // 折叠菜单栏
    toggleClick() {
      this.isToggle = !this.isToggle;
    },
    saveStateClick(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    },
    // 显示菜单
    showMenu() {
      this.isMenu = !this.isMenu
      this.isCover = !this.isCover
    }
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
  overflow: hidden;
}
.el-header {
  padding: 0;
  border-bottom: 2px solid #ff0000;
  min-width: 1040px;
}
.el-footer {
  padding: 0;
  min-width: 1040px;
}
// .el-input {
// --el-input-border-radius: 5px;
// }
.el-button {
  font-size: 16px;
}
.el-aside {
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
.menu-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9;
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

@media screen and (max-width: 414px) {
  .el-aside {
    // display: none;
    position: absolute;
    left: 0;
    top: 60px;
    bottom: 70px;
    z-index: 10;
  }
  .el-header, .el-main, .el-footer {
    min-width: 375px;
    max-width: 414px;
  }
  .menu-cover {
    display: block;
  }
}

</style>