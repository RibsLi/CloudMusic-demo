<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="专辑" name="album">收藏的专辑</el-tab-pane>
    <el-tab-pane label="歌手" name="singer">收藏的歌手</el-tab-pane>
    <el-tab-pane label="视频" name="mv">收藏的视频</el-tab-pane>
    <el-tab-pane label="专栏" name="column">收藏的专栏</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "MyCollect",
  data() {
    return {
      activeName: 'album'
    }
  },
  methods: {
    handleClick() {
      
    }
  },
}
</script>

<style lang="less" scoped>

</style>