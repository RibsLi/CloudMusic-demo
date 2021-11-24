<template>
  <el-table
    :data="albumList"
    stripe
    highlight-current-row
    size="mini"
    :show-header="false"
    empty-text="Loading..."
    style="width: 100%"
  >
    <el-table-column prop="name" label="专辑名称">
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
  name: "AlbumTable",
  props: {
    albumList: {
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
</style>