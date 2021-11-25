<template>
  <div class="recommend">
    <songs-list>
      <template v-slot:top-left> 推荐歌单 </template>
      <template v-slot:top-more>
        <el-button type="info" round @click="moreClic">
          更多
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </template>
      <songs-list-item v-for="item in recommends" :key="item" :list="item" />
    </songs-list>
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
export default {
  name: "Recommend",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    SongsList,
    SongsListItem,
  },
  methods: {
    moreClic() {
      this.$router.push('/recommends')
    },
  },
  computed: {
    // 播放次数
    playCount() {
      const count = this.recommends[0].playCount;
      if (count < 10000) return count;
      return (count / 10000).toFixed(1) + "万";
    },
  },
};
</script>

<style lang="less" scoped>
.el-button {
  min-height: 16px;
  padding: 5px 8px;
}
</style>