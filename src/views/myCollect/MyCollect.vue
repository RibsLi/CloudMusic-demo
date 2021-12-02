<template>
  <div class="my-collect">
    <div class="hint" v-if="!$store.state.profile">您还没有登录哦，先去登录吧</div>
    <div v-else>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="专辑" name="album">收藏的专辑</el-tab-pane>
        <el-tab-pane label="歌手" name="singer">收藏的歌手</el-tab-pane>
        <el-tab-pane label="视频" name="mv">收藏的视频</el-tab-pane>
        <el-tab-pane label="专栏" name="column">收藏的专栏</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getSubcount } from "network/user"
export default {
  name: "MyCollect",
  data() {
    return {
      activeName: 'album'
    }
  },
  created() {
    console.log(this.$store.state.profile);
    if (this.$store.state.profile) {
      this.getSubcount();
    } else {
      return this.$message.warning("您还没有登录，先去登录吧");
    }
  },
  methods: {
    getSubcount() {
      getSubcount().then(res => {
        console.log(res);
      })
    },
    handleClick() {}
  },
}
</script>

<style lang="less" scoped>
.hint {
  color: #aaa;
}
</style>