<template>
  <div class="album">
    <div class="lea-box" v-for="(item, index) in albumList" :key="index">
      <div class="lea-left">
        <img :src="item.picUrl" alt="" @click="allClick(item.id)" />
      </div>
      <div class="lea-right">
        <ul>
          <li v-for="(item, index) in topSong[index].songs" :key="index">
            <span>
              <i class="index">{{index + 1}}</i>
              {{ item.name }}
              <i class="alia">{{ item.alia[0] }}</i>
            </span>
            <span>{{playTime(item.dt)}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDuration } from "common/utils";
export default {
  name: "Album",
  props: {
    albumList: {
      type: Array,
      default() {
        return []
      }
    },
    topSong: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      songs: this.topSong
    }
  },
  created() {
    // console.log(this.topSong);
  },
  methods: {
    allClick(id) {
      this.$router.push({
        path: "/songDetail",
        query: {
          id,
        },
      });
    },
    // 歌曲时长处理函数
    playTime(dt) {
      return formatDuration(dt);
    },
  },
}
</script>

<style lang="less" scoped>
.lea-box {
  display: flex;
  font-size: 14px;
  margin: 10px 0 30px 0;
  .lea-left {
    img {
      width: 200px;
      height: 200px;
      border-radius: 5px;
      margin-right: 30px;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .lea-right {
    width: 100%;
    line-height: 33px;
    color: #555;
    li {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      border-radius: 5px;
      &:nth-child(2n-1) {
        background-color: #eee;
      }
      &:hover {
        background-color: #ddd;
      }
      .index {
        margin-right: 10px;
      }
      .alia {
        color: #aaa;
        font-size: 12px;
        margin-left: 3px;
      }
    }
  }
}
</style>