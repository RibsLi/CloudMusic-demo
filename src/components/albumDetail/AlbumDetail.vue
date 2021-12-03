<template>
  <div class="album-detail">
    <!-- 详情头部 -->
    <detail-header :album="album" :artist="artist" @songsClick="songsClick" @collectClick="collectClick" />
    <!-- tabs标签页 -->
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <!-- 歌单列表 -->
      <el-tab-pane label="歌曲列表" name="list">
        <album-table :songs="songs" @songClick="songClick" @likeMusic="likeMusic"/>
      </el-tab-pane>
      <el-tab-pane label="评论" name="comment">
        <!-- 输入框 -->
        <el-input
          maxlength="140"
          show-word-limit
          resize="none"
          v-model="submitInfo.content"
          :autosize="{ minRows: 3, maxRows: 3 }"
          type="textarea"
          placeholder="请输入内容"
        />
        <el-button round size="mini" @click="submitClick">评论</el-button>
        <div class="clearfix"></div>
        <!-- 精彩评论 -->
        <comment :comments="hotComments" :title="hotComments.length ? '精彩评论 ' + '(' + hotComments.length + ')' : ''" v-show="comment.offset == 0" />
        <!-- 最新评论 -->
        <comment :comments="comments" :title="comments.length ? '最新评论 ' + '('+ comTotal + ')' : ''" />
        <el-pagination
          background
          hide-on-single-page
          :current-page="comment.pagenum"
          :page-size="comment.limit"
          layout="prev, pager, next"
          :total="comTotal"
          @current-change="comCurrentChange"
        ></el-pagination>
      </el-tab-pane>
      <el-tab-pane label="专辑详情" name="detail">
        <!-- <div></div> -->
        <h4>专辑介绍</h4>
        <div class="desc-info">
          {{album.description}}
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DetailHeader from "./childComps/DetailHeader";
import AlbumTable from "./childComps/AlbumTable";
import Comment from "./childComps/Comment";
import { getAlbumContent, getAlbumComment } from "network/singer"
import { getHotComment, getSongDetail } from "network/songdetail";
import { submitComment, getAlbSub, getLikeMusic } from "network/user"
export default {
  name: "AlbumDetail",
  data() {
    return {
      id: '',
      album: {},
      artist: {},
      songs: [],
      activeName: 'list',
      comment: {
        id: this.$route.query.id,
        type: 3,
        limit: 20,
        offset: 0,
        parentCommentId: '',
        pagenum: 1
      },
      comments: [],
      hotComments: [],
      comTotal: 0,
      submitInfo: {
        id: this.$route.query.id,
        t: 1,
        type: 3,
        content: '',
        cookie: window.sessionStorage.getItem('cookie'),
      },
      albumSub: {
        id: this.$route.query.id,
        t: 1,
        cookie: window.sessionStorage.getItem('cookie'),
      },
      likeMusicParams: {
        id: '',
        like: true,
        cookie: window.sessionStorage.getItem('cookie'),
      }
    }
  },
  components: {
    DetailHeader,
    AlbumTable,
    Comment
  },
  created() {
    this.id = this.$route.query.id;
    this.getAlbumContent()
  },
  methods: {
    // 获取专辑内容
    getAlbumContent() {
      getAlbumContent(this.id).then(res => {
        // console.log(res);
        this.album = res.data.album
        this.artist = res.data.album.artist
        this.songs = res.data.songs
      })
    },
    // 获取专辑评论
    getAlbumComment() {
      getAlbumComment(this.comment).then(res => {
        // console.log(res);
        this.comments = res.data.comments;
        this.comTotal = res.data.total;
      })
    },
    // 获取热门评论
    getHotComment() {
      getHotComment(this.comment).then((res) => {
        // console.log(res);
        this.hotComments = res.data.hotComments;
      });
    },
    // tabs标签点击切换事件
    tabClick() {
      this.getAlbumComment()
      this.getHotComment()
    },
    // 页码改变时执行的事件
    comCurrentChange(newPage) {
      this.comment.pagenum = newPage
      this.comment.offset = (newPage - 1) * this.comment.limit;
      this.getAlbumComment();
    },
    songsClick() {
      this.$store.commit("subSongDetail", this.songs)
    },
    //获取单首音乐
    songClick(id) {
      getSongDetail(id).then(res => {
        // console.log(res);
        this.$store.commit("addSongDetail", res.data.songs)
      })
    },
    // 提交评论信息
    submitClick() {
      if (!this.submitInfo.content) return this.$message.warning('先填写一些评论吧')
      submitComment(this.submitInfo).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.getAlbumComment();
          this.submitInfo.content = ''
          return this.$message.success('评论成功')
        }
      })
    },
    // 收藏专辑
    collectClick() {
      getAlbSub(this.albumSub).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          return this.$message.success('收藏成功')
        }
      })
    },
    // 喜欢音乐
    likeMusic(id) {
      // console.log(id);
      this.likeMusicParams.id = id
      getLikeMusic(this.likeMusicParams).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          return this.$message.success('加入喜欢音乐列表成功')
        }
      })
    }
  },
}
</script>

<style scoped>
.el-tabs {
  margin-top: 15px;
}
.desc-info {
  text-indent: 28px;
  color: rgb(71, 70, 70);
  font-size: 14px;
  line-height: 40px;
}
.el-button {
  float: right;
  margin: 10px 0;
}
</style>