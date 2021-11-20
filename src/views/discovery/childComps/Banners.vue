<template>
  <div class="banners">
    <el-carousel type="card" height="280px" v-if="banners.length>0">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <span class="title" :style="{ backgroundColor: item.titleColor }">
          {{ item.typeTitle }}
        </span>
        <a :href="item.url" target="_blank">
          <img :src="item.imageUrl" alt="" />
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
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
};
</script>

<style scoped>
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
</style>