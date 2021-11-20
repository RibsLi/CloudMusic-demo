<template>
  <el-table
    :data="tableData"
    stripe
    highlight-current-row
    @row-dblclick="playMusic"
    size="mini"
    style="width: 100%"
  >
    <el-table-column
      type="index"
      label=" "
      header-align="center"
      align="center"
    />
    <el-table-column prop="" label="操作" width="70">
      <i class="iconfont icon-shoucang"></i>
      <i class="iconfont icon-xiazai"></i>
    </el-table-column>
    <el-table-column prop="name" label="标题" sortable />
    <el-table-column prop="ar" label="歌手" sortable>
      <template v-slot:default="scope">
        <span v-for="item in scope.row.ar" :key="item">{{ item.name }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="al.name" label="专辑" sortable />
    <el-table-column prop="dt" label="时间" sortable width="100">
      <template v-slot:default="scope">
        {{ playTime(scope.row.dt) }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { formatDuration } from "common/utils";

export default {
  name: "TableData",
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    // 歌曲时长处理函数
    playTime(dt) {
      return formatDuration(dt);
    },
    // 获取单首音乐
    playMusic() {
      console.log('---');
    },
  },
};
</script>

<style>
</style>