<template>
  <div class="discovery">
    <banners :banners="banners"/>
    <recommend :recommends="recommends" />
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
import { getBanners, getRecommend } from "network/discovery";
import Banners from "./children/Banners"
import Recommend from "./children/Recommend";
import Aplayer from 'components/aplayer/Aplayer.vue';

export default {
  name: "Discovery",
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  components: {
    Banners,
    Recommend,
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
  },
};
</script>

<style scoped>

</style>