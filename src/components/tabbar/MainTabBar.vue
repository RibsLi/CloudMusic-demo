<template>
  <tab-bar>
    <tab-bar-item path="/discovery">
      <template v-slot:item-text>
        发现音乐
      </template>
    </tab-bar-item>
    <tab-bar-item path="/playList">
      <template v-slot:item-text>
        推荐歌单
      </template>
    </tab-bar-item>
    <tab-bar-item path="/songs">
      <template v-slot:item-text>
        最新音乐
      </template>
    </tab-bar-item>
    <tab-bar-item path="/mvs">
      <template v-slot:item-text>
        最新MV
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

</style>