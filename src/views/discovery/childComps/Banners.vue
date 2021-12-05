<template>
  <div class="banners">
    <el-carousel type="card" height="240px" v-if="banners.length>0" :autoplay="false">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <span class="title" :style="{ backgroundColor: item.titleColor }">
          {{ item.typeTitle }}
        </span>
        <a :href="item.url" target="_blank">
          <img :src="item.imageUrl" alt="" @click="imgClick(item)"/>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getSongDetail } from "network/songdetail";
export default {
  name: "Banners",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    imgClick(item) {
      // console.log('---');
      if (item.typeTitle == '歌单' || item.typeTitle == '歌单推荐' || item.typeTitle == '首发') {
        this.$router.push({
          path: "/songDetail",
          query: {
            id: item.targetId,
          },
        });
      }
      else if (item.typeTitle == '新碟首发' && item.targetId !== 0) {
        this.$router.push({
          path: "/albumDetail",
          query: {
            id: item.targetId,
          },
        });
      }
      else if(item.typeTitle == '热门单曲' || item.typeTitle == '新歌首发' || item.typeTitle == '热歌推荐') {
        getSongDetail(item.targetId).then(res => {
          // console.log(res);
          this.$store.commit("addSongDetail", res.data.songs)
        })
      }
    }
  },
};
</script>

<style lang="less" scoped>
.el-carousel__item a img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
.title {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 12px;
  color: #fff;
  height: 16px;
  line-height: 16px;
  padding: 5px 10px;
  text-align: center;
  border-radius: 16px 0 16px 0;
}
@media screen and (max-width: 414px) {
  .banners {
    .el-carousel__item{
      width: 272px;
      left: -48px;
    }
    .el-carousel{
      --el-carousel-indicator-width: 25px;
    }
  }
}
</style>