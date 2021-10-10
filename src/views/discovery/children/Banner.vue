<template>
  <div class="slider" @mouseover="stopAutoPlay" @mouseleave="setAutoPlay">
    <div class="slider-list">
      <div :class="['slider-item', setItemClass(index)]" v-for="(item, index) of banners" :key="index" @click="sliderClick(index)">
        <a :href="item.url">
          <img :src="item.imageUrl" alt="">
        </a>
      </div>
      
      <span @click="prev" class="arrow arrow-left icon-chevron-left"></span>
      <span @click="next" class="arrow arrow-right icon-chevron-right"></span>

      <div class="dots">
        <span v-for="(item, index) of banners" :key="index" :style="setDotActiveStyl(index)" @mouseover="currentIndex = index"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Banner",
  data() {
    return {
      timer: null,
      currentIndex: 0
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
  computed: {
    listLength() {
      return this.banners.length - 1
    }
  },
  methods: {
    setItemClass(index) {
      const prev = this.currentIndex == 0 ? this.listLength : this.currentIndex - 1
      const next = this.currentIndex == this.listLength ? 0 : this.currentIndex + 1
      switch(index) {
        case this.currentIndex:
          return 'active'
        case prev:
          return 'prev'
        case next:
          return 'next'
        default:
          return ''
      }
    },
    prev() {
      this.currentIndex == 0 ? (this.currentIndex = this.listLength) : this.currentIndex--
    },
    next() {
      this.currentIndex == this.listLength ? (this.currentIndex = 0) : this.currentIndex++
    },
    setAutoPlay() {
      this.timer = setInterval(() => {
        this.next()
      }, 3000)
    },
    stopAutoPlay() {
      clearInterval(this.timer)
    },
    setDotActiveStyl(index) {
      if (index == this.currentIndex) {
        return { backgroundColor: 'rgba(255, 255, 255, .8)' }
      }
    },
    sliderClick(index) {
      if(index < this.currentIndex) {
        this.prev()
      } else if(index > this.currentIndex) {
        this.next()
      }
    }
  },
  mounted() {
    this.setAutoPlay()
  }
}
</script>

<style scoped>
.slider{
  width: 100%;
  height: 350px;
  user-select: none;
  margin: 0 50px;
}
.slider-list{
  position: relative;
  margin-top: 20px;
  height: 100%;
  transform-style: preserve-3d;
}
.slider-item{
  position: absolute;
  margin: 0 50%;
  width: 945px;
  height: 100%;
  transform: translate3d(-50%, 0, -300px) scale(.8);
  transition: all .6s ease-in-out;
  border-radius: 8px;
  overflow: hidden;
}
.slider-item img{
  display: block;
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
}
.slider-item.prev{
  margin: 0;
  transform: translate3d(0, 0, -200px) scale(.8);
  transform-origin: left;
}
.slider-item.next{
  margin: 0 100%;
  transform: translate3d(-100%, 0, -100px) scale(.8);
  transform-origin: right;
}
.slider-item.active{
  transform: translate3d(-50%, 0, 0) scale(1);
}
.slider-item::after{
  content: ' ';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: .7;
  transition: all .6s;
}
.slider-item.active::after{
  opacity: 0;
}
.arrow{
  position: absolute;
  top: 50%;
  margin: 0 10px;
  display: block;
  width: 50px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  color: rgba(250, 250, 250, .5);
  background-color: rgba(0, 0, 0, .3);
  font-size: 50px;
  cursor: pointer;
  transform: translate3d(0, -50%, 0);
}
.arrow.arrow-right{
  right: 0;
}
.arrow:hover {
  color: #fff;
  background-color: rgba(250, 250, 250, .2);
}
.dots{
  position: absolute;
  display: flex;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
.dots span{
  display: inline-block;
  width: 50px;
  height: 6px;
  background-color: rgba(0, 0, 0, .3);
  margin: 0 10px;
  cursor: pointer;
}
</style>