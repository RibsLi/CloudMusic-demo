<template>
  <div class="personalized">
    <songs-list>
      <template v-slot:top-left> 独家放送 </template>
      <template v-slot:top-more>
        <el-button type="info" round @click="moreClic">
          更多
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </template>
      <songs-list-item v-for="item in perData" :key="item" :list="item"/>
    </songs-list>
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
export default {
  name: "Personalized",
  props: {
    perData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    SongsList,
    SongsListItem,
  },
  methods: {
    // 跳转到独家放送界面
    moreClic() {
      this.$router.push("/exclusive")
    }
  },
};
</script>

<style lang="less" scoped>
.el-button {
  min-height: 16px;
  padding: 5px 8px;
}
.slide-item {
  width: 415px;
}
</style>