<template>
  <el-table
    :data="albums"
    stripe
    highlight-current-row
    size="mini"
    :show-header="false"
    style="width: 100%"
    @row-dblclick="playMusic"
  >
    <el-table-column prop="name" label="专辑名称" :show-overflow-tooltip="true">
      <template v-slot:default="scope">
        <div class="song-img" @click="albumClick(scope.row.id)">
          <img :src="scope.row.picUrl" alt="" />
          {{ scope.row.name }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="size" label="专辑数量">
      <template v-slot:default="scope">
        {{scope.row.size}} 首
      </template>
    </el-table-column>
    <el-table-column prop="artist.name" label="歌手">
      <template v-slot:default="scope">
        <div class="singer" @click="singerClick(scope.row.artist.id)">
          {{scope.row.artist.name}}
          <i>{{scope.row.artist.alias[0]}}</i>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="publishTime" label="发行时间" width="150">
      <template v-slot:default="scope">
        发行时间：{{dateInfo(scope.row.publishTime)}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "AlbumData",
  props: {
    albums: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 日期处理函数
    dateInfo(date) {
      const data = new Date(date);
      return formatDate(data, "yyyy-MM-dd");
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
      const id = row.id
      this.$router.push({
        path: "/albumDetail",
        query: {
          id
        },
      })
    },
    singerClick(id) {
      this.$router.push({
        path: "/singerDetail",
        query: {
          id
        },
      });
    }
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