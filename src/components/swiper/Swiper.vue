<template>
  <div class="box-swiper">
    <!-- 图片 -->
    <div class="swiper">
      <slot></slot>
    </div>
    <!-- 指示器 -->
    <div class="indicator">
      
    </div>
    <!-- 箭头 -->
    <div class="arrow">
      <span class="icon-chevron-left prev"></span>
      <span class="icon-chevron-right next"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  data() {
    return {
      slideCount: 0, // 元素个数
      totalWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper样式
      currentIndex: 1, // 当前的index
      scrolling: false, // 是否正在滚动
    }
  },
  methods: {
    getDom() {
      let swiperEl = document.querySelector('.swiper')
      let slideEl = swiperEl.getElementsByClassName('slide')

      this.slideCount = slideEl.length

      if(this.slideCount > 1) {
        let addFirst = slideEl[0].cloneNode(true)
        let addLast = slideEl[this.slideCount - 1].cloneNode(true)
        swiperEl.insertBefore(addLast, slideEl[0])
        swiperEl.appendChild(addFirst)
        this.totalWidth = swiperEl.offsetWidth
        this.swiperStyle = swiperEl.style
      }
    }
  },
}
</script>

<style scoped>
.box-swiper {
  overflow: hidden;
  position: relative;
  width: 1080px;
}
.swiper {
  display: flex;
}
</style>