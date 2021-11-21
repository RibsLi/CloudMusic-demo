<template>
  <el-table
    :data="songData"
    stripe
    highlight-current-row
    size="mini"
    :show-header="false"
    empty-text="Loading..."
    style="width: 100%"
  >
    <el-table-column
      type="index"
      label=" "
      header-align="center"
      align="center"
    />
    <el-table-column prop="name" label="标题">
      <template v-slot:default="scope">
        <img :src="scope.row.album.blurPicUrl" class="song-img" alt="" />
        {{ scope.row.name }}
      </template>
    </el-table-column>
    <el-table-column prop="artists" label="歌手">
      <template v-slot:default="scope">
        <span v-for="item in scope.row.artists" :key="item">{{
          item.name
        }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="album.name" label="专辑" />
    <el-table-column prop="duration" label="时间" width="100">
      <template v-slot:default="scope">
        {{ playTime(scope.row.duration) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDuration } from "common/utils";
export default {
  name: "SongTableData",
  props: {
    songData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 歌曲时长处理函数
    playTime(dt) {
      return formatDuration(dt);
    },
  },
};
</script>

<style scoped>
.song-img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  border-radius: 5px;
  margin-right: 8px;
}
.el-table {
  margin-top: 15px;
}
</style>