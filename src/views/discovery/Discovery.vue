<template>
  <div class="discovery">
    <banners :banners="banners"/>
    <recommend :recommends="recommends" />
    <personalized :perData="perData"/>
    <newest :songData="songData"/>
    <aplayer/>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>10</div>

  </div>
</template>

<script>
import { getBanners, getRecommend, getPersonalized, getTopSong } from "network/discovery";
import Banners from "./childComps/Banners"
import Recommend from "./childComps/Recommend";
import Personalized from "./childComps/Personalized"
import Newest from "./childComps/Newest"
import Aplayer from 'components/aplayer/Aplayer.vue';

export default {
  name: "Discovery",
  data() {
    return {
      banners: [],
      recommends: [],
      perParams: {
        limit: 4,
        offset: 0
      },
      perData: [],
      songParams: {
        type: 7
      },
      songData: []
    };
  },
  components: {
    Banners,
    Recommend,
    Personalized,
    Newest,
    Aplayer,
  },
  created() {
    // 请求轮播数据
    getBanners().then((res) => {
      // console.log(res);
      this.banners = res.data.banners;
    });
    // 请求推荐歌单
    getRecommend("16").then((res) => {
      // console.log(res);
      this.recommends = res.data.result;
    });
    // 请求独家放送
    getPersonalized(this.perParams).then(res => {
      // console.log(res);
      this.perData = res.data.result
    });
    // 请求最新音乐（新歌速递）
    getTopSong(this.songParams).then(res => {
      // console.log(res);
      this.songData = res.data.data
      this.songData.length = 24
    })
  },
};
</script>

<style scoped>

</style>