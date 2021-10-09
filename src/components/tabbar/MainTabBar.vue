<template>
  <tab-bar>
    <tab-bar-item path="/discovery">
      <template v-slot:item-text>
        <span class="icon-command tab-icon"></span>
        发现音乐
      </template>
    </tab-bar-item>
    <tab-bar-item path="/recommend">
      <template v-slot:item-text>
        <span class="icon-music-playlist tab-icon"></span>
        推荐歌单
      </template>
    </tab-bar-item>
    <tab-bar-item path="/songs">
      <template v-slot:item-text>
        <span class="icon-music tab-icon"></span>
        最新音乐
      </template>
    </tab-bar-item>
    <tab-bar-item path="/mvs">
      <template v-slot:item-text>
        <span class="icon-film tab-icon"></span>
        最新MV
      </template>
    </tab-bar-item>
    <tab-bar-item path="/leaderboard">
      <template v-slot:item-text>
        <span class="icon-stats-bars tab-icon"></span>
        排行榜单
      </template>
    </tab-bar-item>
    <tab-bar-item path="/singer">
      <template v-slot:item-text>
        <span class="icon-profile tab-icon"></span>
        热门歌手
      </template>
    </tab-bar-item>
    <tab-bar-item path="/mySongs">
      <template v-slot:item-text>
        <span class="icon-file-text tab-icon"></span>
        我的歌单
      </template>
    </tab-bar-item>
    <tab-bar-item path="/myCollect">
      <template v-slot:item-text>
        <span class="icon-heart tab-icon"></span>
        我的收藏
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/tabBar/TabBar'
import TabBarItem from 'components/tabBar/TabBarItem'

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
.tab-icon {
  font-size: 20px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>