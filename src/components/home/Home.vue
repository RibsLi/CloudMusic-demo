<template>
  <div class="home">
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
          v-model="query"
          placeholder="音乐/视频/电台/用户"
          prefix-icon="iconfont icon-sousuo"
        />
      </div>
    </div>
    <el-container>
      <el-aside :width="isToggle ? '64px' : '150px'">
        <div class="toggle" @click="toggleClick">
          <i class="el-icon-arrow-left"></i>
          <i class="el-icon-arrow-left"></i>
          <i class="el-icon-arrow-left"></i>
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
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      query: "",
      menu: [
        { title: "发现音乐", path: "/discovery" },
        { title: "推荐歌单", path: "/recommend" },
        { title: "最新音乐", path: "/songs" },
        { title: "最新MV", path: "/mvs" },
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
    };
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
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
  padding-top: 62px;
}
.top-bar {
  position: fixed;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  box-shadow: 0 1px 2px #ff0000;
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
    width: 400px;
  }
}
.el-input {
  --el-input-border-radius: 20px;
}
.el-button {
  font-size: 16px;
}
.el-aside {
  // margin-top: 2px;
  background-color: #3a3d44;
  .toggle {
    background-color: #67676b;
    font-size: 12px;
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
}
</style>