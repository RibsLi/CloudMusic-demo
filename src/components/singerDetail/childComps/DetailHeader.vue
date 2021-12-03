<template>
  <div class="detail-header">
    <div><img :src="artist.cover" alt="" /></div>
    <div class="detail-info">
      <h3>{{ artist.name }}</h3>
      <div class="btn-box">
        <el-button round size="small" icon="el-icon-folder-add" @click="collectClick">收藏</el-button>
        <el-button round size="small" icon="el-icon-user">个人主页</el-button>
      </div>
      <div class="tag">
        <span>单曲数：{{artist.musicSize}}</span>
        <span>专辑数：{{artist.albumSize}}</span>
        <span>MV数：{{artist.mvSize}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailHeader",
  props: {
    artist: {
      type: Object,
      default() {
        return {}
      }
    },
    creator: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 收藏歌手
    collectClick() {
      this.$emit('collectClick')
    }
  },
};
</script>

<style lang="less" scoped>
.detail-header {
  display: flex;
  height: 250px;
  overflow: hidden;
}
.detail-header img {
  width: 300px;
  height: 250px;
  margin-right: 25px;
  border-radius: 5px;
}
.btn-box {
  margin: 20px 0;
}
.tag {
  line-height: 25px;
  font-size: 14px;
  color: rgb(94, 91, 91);
  span {
    margin-right: 20px;
  }
}
</style>