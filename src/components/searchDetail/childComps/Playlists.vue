<template>
  <el-table
    :data="playlists"
    stripe
    highlight-current-row
    size="mini"
    :show-header="false"
    style="width: 100%"
    @row-dblclick="playMusic"
  >
    <el-table-column prop="name" label="名称" :show-overflow-tooltip="true">
      <template v-slot:default="scope">
        <div class="song-img" @click="albumClick(scope.row.id)">
          <img :src="scope.row.coverImgUrl" alt="" />
          {{ scope.row.name }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="trackCount" label="数量">
      <template v-slot:default="scope">
        {{ scope.row.trackCount }} 首
      </template>
    </el-table-column>
    <el-table-column prop="creator.nickname" label="歌手">
      <template v-slot:default="scope">
        <div class="singer" @click="singerClick(scope.row.creator.id)">
          <i>by-</i>
          {{ scope.row.creator.nickname }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Playlists",
  props: {
    playlists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    albumClick(id) {
      this.$router.push({
        path: "/songDetail",
        query: {
          id
        },
      });
    },
    playMusic(row) {
      const id = row.id;
      this.$router.push({
        path: "/songDetail",
        query: {
          id,
        },
      });
    },
    singerClick() {
      console.log('点击将前往用户界面');
    },
  },
};
</script>

<style lang="less" scoped>
.song-img {
  display: inline-block;
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
    vertical-align: middle;
    border-radius: 5px;
    margin-right: 8px;
  }
}
.singer {
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
</style>