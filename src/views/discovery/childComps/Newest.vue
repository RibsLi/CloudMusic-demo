<template>
  <div class="newest">
    <songs-list>
      <template v-slot:top-left> 最新音乐 </template>
      <template v-slot:top-more>
        <el-button type="info" round @click="moreClic">
          更多
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </template>
    </songs-list>
    <div class="newest-list">
      <div class="newest-item" v-for="item in songData" :key="item" @dblclick="dblclick(item.id)">
        <div class="item-img">
          <img :src="item.album.blurPicUrl" alt="">
        </div>
        <div class="item-info">
          <div class="title">{{item.name}}</div>
          <div class="author">
            <span v-for="item in item.artists" :key="item" @click="singerClick(item.id)">{{item.name}} &nbsp;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SongsList } from "components/songsList";
export default {
  name: "Newest",
  props: {
    songData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    SongsList
  },
  methods: {
    moreClic() {
      this.$router.push('/newSongs')
    },
    singerClick(id) {
      // console.log(id);
      this.$router.push({
        path: "/singerDetail",
        query: {
          id
        },
      });
    },
    dblclick(id) {
      this.$emit('songClick', id)
    }
  },
}
</script>

<style lang="less" scoped>
.el-button {
  min-height: 16px;
  padding: 5px 8px;
}
.newest-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  line-height: 20px;
  .newest-item {
    width: 400px;
    height: 50px;
    display: flex;
    align-items: center;
    margin: 5px 0 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #ddd;
    }
    .item-img img {
      width: 50px;
      height: 50px;
      margin-right: 8px;
      border-radius: 5px;
      vertical-align: middle;
    }
    .title {
      font-size: 14px;
    }
    .author {
      font-size: 12px;
      color: #aaa;
      span:hover {
        color: #409eff;
      }
    }
  }
}
</style>