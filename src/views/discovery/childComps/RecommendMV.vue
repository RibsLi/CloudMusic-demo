<template>
  <div class="recommend-mv">
    <songs-list>
      <template v-slot:top-left> 推荐MV </template>
      <template v-slot:top-more>
        <el-button type="info" round @click="moreClic">
          更多
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </template>
      <songs-list-item v-for="item in recMV" :key="item" :list="item" />
    </songs-list>
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
export default {
  name: 'RecommendMV',
  props: {
    recMV: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    SongsList,
    SongsListItem
  },
  methods: {
    moreClic() {
      this.$router.push('/newMV')
    }
  },
}
</script>

<style scoped>
.el-button {
  min-height: 16px;
  padding: 5px 8px;
}
.slide-item {
  width: 415px;
}
@media screen and (max-width: 414px) {
  .slide-item {
    width: 100%;
  }
}
</style>