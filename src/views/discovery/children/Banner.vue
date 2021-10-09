<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.url">
        <img :src="item.imageUrl" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/swiper'
// import Swiper from 'components/swiper/Swiper'
// import SwiperItem from 'components/swiper/SwiperItem'


export default {
  name: "Banner",
  data() {
    return {

    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem,

  },

}
</script>

<style scoped>
.slide img {
  vertical-align:middle;
}
</style>