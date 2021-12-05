<template>
  <div class="mv">
    <detail-header :mvUrl="mvUrl" :mvDetail="mvDetail" :cover="cover" @collectClick="collectClick"/>
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
    <comment :comments="hotComments" :title="hotComments.length ? '精彩评论 ' + '(' + hotComments.length + ')' : ''" v-show="comParams.offset == 0" />
    <!-- <comment :comments="hotComments" :title="hotComments.length ? '精彩评论' : ''" v-show="comment.offset == 0" /> -->
    <!-- 最新评论 -->
    <comment :comments="comments" :title="comments.length ? '最新评论 ' + '('+ comTotal + ')' : ''" />
    <el-pagination
      background
      hide-on-single-page
      :current-page="comParams.pagenum"
      :page-size="comParams.limit"
      layout="prev, pager, next"
      :total="comTotal"
      @current-change="comCurrentChange"
      :pager-count="5"
    ></el-pagination>
  </div>
</template>

<script>
import DetailHeader from "./childComps/DetailHeader"
import Comment from "./childComps/Comment";
import { getMVUrl, getMVDetail, getComment, getHotComment } from "network/mv";
import { getArtistDetail } from "network/singer";
import { submitComment, getMVSub } from "network/user"
export default {
  name: "MVDetail",
  data() {
    return {
      id: "",
      mvUrl: "",
      mvDetail: {},
      cover: "",
      comParams: {
        id: this.$route.query.id,
        limit: 20,
        type: 1,
        offset: 0,
        pagenum: 1
      },
      hotComments: [],
      comments: [],
      comTotal: 0,
      submitInfo: {
        id: this.$route.query.id,
        t: 1,
        type: 1,
        content: '',
        cookie: window.sessionStorage.getItem('cookie'),
      },
      mvSub: {
        mvid: this.$route.query.id,
        t: 1,
        cookie: window.sessionStorage.getItem('cookie'),
      }
    };
  },
  components: {
    DetailHeader,
    Comment
  },
  created() {
    this.id = this.$route.query.id;
    this.getMVUrl();
    this.getMVDetail();
    this.getComment()
    this.getHotComment()
  },
  methods: {
    // 获取mv的url地址
    getMVUrl() {
      getMVUrl(this.id).then((res) => {
        // console.log(res);
        this.mvUrl = res.data.data.url;
      });
    },
    // 获取mv详情
    getMVDetail() {
      getMVDetail(this.id).then((res) => {
        // console.log(res);
        this.mvDetail = res.data.data;
        getArtistDetail(res.data.data.artistId).then((res) => {
          // console.log(res);
          this.cover = res.data.data.artist.cover;
        });
      });
    },
    // 获取mv评论
    getComment() {
      getComment(this.comParams).then(res => {
        // console.log(res);
        this.comments = res.data.comments
        this.comTotal = res.data.total
      })
    },
    // 获取mv热门评论
    getHotComment() {
      getHotComment(this.comParams).then(res => {
        // console.log(res);
        this.hotComments = res.data.hotComments
      })
    },
    // 页码改变时执行的事件
    comCurrentChange(newPage) {
      this.comParams.pagenum = newPage
      this.comParams.offset = (newPage - 1) * this.comParams.limit;
      this.getComment();
    },
    // 提交评论信息
    submitClick() {
      if (!this.submitInfo.content) return this.$message.warning('先填写一些评论吧')
      submitComment(this.submitInfo).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          this.getComment();
          this.submitInfo.content = ''
          return this.$message.success('评论成功')
        }
      })
    },
    // 收藏mv
    collectClick() {
      getMVSub(this.mvSub).then(res => {
        // console.log(res);
        if (res.data.code === 200) {
          return this.$message.success('收藏成功')
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
.el-button {
  float: right;
  margin: 10px 0;
}
</style>