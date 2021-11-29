<template>
  <el-table
    :data="artists"
    stripe
    highlight-current-row
    size="mini"
    :show-header="false"
    style="width: 100%"
    @row-dblclick="playMusic"
  >
    <el-table-column prop="name" label="标题" :show-overflow-tooltip="true">
      <template v-slot:default="scope">
        <span class="singer">
          <img :src="scope.row.picUrl" class="song-img" alt="" />
          {{ scope.row.name }}
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "SingerData",
   data() {
    return {
      keywords: this.$store.state.keywords,
      limit: 100,
      type: 100,
      offset: 0,
    };
  },
  props: {
    artists: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    playMusic(row) {
      const id = row.id
      this.$router.push({
        path: "/singerDetail",
        query: {
          id
        },
      });
    }
  },
}
</script>

<style scoped>
.singer {
  cursor: pointer;
}
.song-img {
  width: 60px;
  height: 60px;
  vertical-align: middle;
  border-radius: 5px;
  margin-right: 8px;
}
</style>