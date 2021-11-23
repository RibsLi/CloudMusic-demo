<template>
  <div class="comment">
    <div class="comment-header">{{title}}</div>
    <div class="comment-info" v-for="item in comments" :key="item">
      <img :src="item.user.avatarUrl" alt="" />
      <div class="user">
        <div>
          <span style="color: #409eff">{{ item.user.nickname }}：</span>
          {{ item.content }}
        </div>
        <!-- 楼层评论 -->
        <!-- <div class="user-tow">
          @{{item.beReplied[0].user.nickname}}
          <span>{{item.beReplied[0].content}}</span>
        </div> -->
        <div class="comment-time">
          <div>{{ dateInfo(item.time) }}</div>
          <div>
            <i class="iconfont icon-z-like">&nbsp;{{ item.likedCount }}</i>
            <i class="iconfont icon-fenxiang1"></i>
            <i class="iconfont icon-daohangpingjia"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "common/utils";
export default {
  name: "Comment",
  props: {
    comments: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 日期处理函数
    dateInfo(date) {
      const data = new Date(date);
      return formatDate(data, "yyyy-MM-dd hh:mm");
    },
  },
};
</script>

<style lang="less" scoped>
.comment {
  font-size: 14px;
  .comment-header {
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 10px;
  }
  .comment-info {
    display: flex;
    // align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    img {
      width: 45px;
      height: 45px;
      margin-right: 10px;
      vertical-align: top;
      border-radius: 100%;
    }
    .user {
      width: 100%;
      line-height: 25px;
      .user-tow {
        background-color: #eef0eb;
        border-radius: 5px;
        width: 100%;
        text-indent: 10px;
      }
      .comment-time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        i {
          font-size: 14px;
          margin: 0 10px;
        }
      }
    }
  }
}
.comment-info:last-child {
  border-bottom: 0;
  margin-bottom: 30px;
}
</style>