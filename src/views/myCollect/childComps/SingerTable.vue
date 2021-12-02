<template>
  <el-table
    :data="singerList"
    stripe
    highlight-current-row
    size="mini"
    :show-header="false"
    empty-text="Loading..."
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
    <el-table-column prop="albumSize" label="专辑数量">
      <template v-slot:default="scope">
        专辑：{{scope.row.albumSize}}
      </template>
    </el-table-column>
    <el-table-column prop="mvSize" label="mv">
      <template v-slot:default="scope">
        MV：{{scope.row.mvSize}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "SingerTable",
  props: {
    singerList: {
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
        path: "/singerDetail",
        query: {
          id
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.song-img {
  display: inline-block;
  cursor: pointer;
  img {
    width: 60px;
    height: 60px;
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