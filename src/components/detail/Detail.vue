<template>
  <div class="detail">
    <div class="detail-top">
      <div><img :src="playlist.coverImgUrl" alt="" /></div>
      <div class="detail-info">
        <h3>{{ playlist.name }}</h3>
        <div class="detail-time">
          <img :src="creator.avatarUrl" alt="" />
          <span class="user">{{ creator.nickname }}</span>
          <span>{{ dateInfo(playlist.createTime) }} 创建</span>
        </div>
        <div class="btn-box">
          <el-button-group>
            <el-button
              type="primary"
              round
              size="small"
              icon="el-icon-video-play"
              >播放全部</el-button
            >
            <el-button
              type="primary"
              round
              size="small"
              icon="el-icon-plus"
            ></el-button>
          </el-button-group>
          <el-button round size="small" icon="el-icon-folder-add"
            >收藏</el-button
          >
          <el-button round size="small" icon="el-icon-share">分享</el-button>
          <el-button round size="small" icon="el-icon-download"
            >下载全部</el-button
          >
        </div>
        <div class="tag">
          <div>
            标签 ：
            <span v-for="item in playlist.tags" :key="item">{{ item }} / </span>
          </div>
          <div>
            <span class="song-count">歌曲 ：{{ playlist.trackCount }}</span>
            <span>播放 ：{{ (playlist.playCount / 10000).toFixed() }}万</span>
          </div>
          <div>简介 ：{{playlist.description}}</div>
        </div>
      </div>
    </div>

    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="歌曲列表" name="list">
        <el-table
          :data="tableData"
          stripe
          highlight-current-row
          @row-dblclick="playMusic"
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
              <span v-for="item in scope.row.ar" :key="item">{{
                item.name
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="al.name" label="专辑" sortable />
          <el-table-column prop="dt" label="时间" sortable width="100">
            <template v-slot:default="scope">
              {{ playTime(scope.row.dt) }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="评论" name="comment">评论</el-tab-pane>
      <el-tab-pane label="收藏者" name="collector">收藏者</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getPlaylistDetail, getSongDetail } from "network/detail";
import { formatDate, formatDuration } from "common/utils";

export default {
  name: "Detail",
  data() {
    return {
      id: "",
      playlist: {},
      creator: {},
      trackIds: [],
      activeName: "list",
      tableData: [],
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getPlaylistDetail();
  },
  methods: {
    // 获取歌单详情
    getPlaylistDetail() {
      getPlaylistDetail(this.id).then((res) => {
        // console.log(res);
        this.playlist = res.data.playlist;
        this.creator = res.data.playlist.creator;
        // 循环遍历获取所有id请求所有歌曲
        const trackIds = [];
        res.data.playlist.trackIds.forEach((item) => {
          trackIds.push(item.id);
        });
        getSongDetail(trackIds).then((res) => {
          console.log(res);
          this.tableData = res.data.songs;
        });
      });
    },
    // 日期处理函数
    dateInfo(date) {
      const data = new Date(date);
      return formatDate(data, "yyyy-MM-dd");
    },
    // 歌曲时长处理函数
    playTime(dt) {
      return formatDuration(dt);
    },
    // 获取单首音乐
    playMusic() {
      console.log('---');
    },
    tabClick() {},
  },
};
</script>

<style lang="less" scoped>
.el-button-group {
  margin-right: 10px;
}
.el-tabs {
  margin-top: 15px;
}
.iconfont {
  margin: 0 3px;
}
.detail-top {
  display: flex;
  height: 200px;
  overflow: hidden;
}
.detail-top img {
  width: 200px;
  height: 200px;
  margin-right: 25px;
  border-radius: 5px;
}
.detail-time {
  font-size: 13px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    vertical-align: middle;
    margin: 10px 10px 7px 0;
  }
}
.user {
  margin-right: 10px;
  color: #409eff;
}
.btn-box {
  margin: 6px 0;
}
.tag {
  line-height: 25px;
  font-size: 14px;
  color: rgb(94, 91, 91);
  .song-count {
    margin-right: 10px;
  }
}
</style>