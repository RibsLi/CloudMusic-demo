<template>
  <el-table
    :data="songData"
    stripe
    highlight-current-row
    size="mini"
    :show-header="false"
    empty-text="Loading..."
    style="width: 100%"
    @row-dblclick="playMusic"
  >
    <el-table-column
      type="index"
      label=" "
      header-align="center"
      align="center"
      width="40"
    />
    <el-table-column prop="name" label="标题" :show-overflow-tooltip="true">
      <template v-slot:default="scope">
        <span class="singer" @click="songClick(scope.row.id)">
          <img :src="scope.row.album.blurPicUrl" class="song-img" alt="" />
          {{ scope.row.name }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="artists" label="歌手" :show-overflow-tooltip="true">
      <template v-slot:default="scope">
        <span class="singer" v-for="item in scope.row.artists" :key="item" @click="singerClick(item.id)">{{
          item.name
        }} &nbsp;</span>
      </template>
    </el-table-column>
    <el-table-column prop="album.name" label="专辑" :show-overflow-tooltip="true">
      <template v-slot:default="scope">
        <span class="singer" @click="albumClick(scope.row.album.id)">
          {{ scope.row.album.name }}
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="duration" label="时间" width="55">
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
    singerClick(id) {
      // console.log(id);
      this.$router.push({
        path: "/singerDetail",
        query: {
          id
        },
      });
    },
    albumClick(id) {
      // console.log('---');
      this.$router.push({
        path: "/albumDetail",
        query: {
          id
        },
      })
    },
    playMusic(row) {
      // console.log(row);
      // console.log(row.id);
      // this.$emit('songsClick')
      // console.log(row);
      this.$emit('songClick', row.id)
    },
    songClick(id) {
      this.$emit('songClick', id)
    },
  },
};
</script>

<style lang="less" scoped>
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
.singer {
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
</style>