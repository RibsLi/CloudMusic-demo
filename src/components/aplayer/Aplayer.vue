<template>
  <div class="aplayer">
    <div class="aplayer-left">
      <div class="left-img">
        <img src="~assets/images/1.jpg" alt="" />
      </div>
      <div class="left-detail">
        <div>title</div>
        <div>author</div>
      </div>
    </div>
    <div class="aplayer-center">
      <!-- <audio controls>
        <source :src="musicURL" type="audio/mpeg" />
      </audio> -->
      <audio src="" controls autoplay></audio>
    </div>
    <div class="aplayer-right"></div>
  </div>
</template>

<script>
export default {
  name: "Aplayer",
  props: {
    musicURL: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.aplayer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  background-color: #fff;
  height: 74px;
  box-shadow: 0 -1px 1px #aaa;
  .aplayer-left,
  .aplayer-right {
    display: flex;
    align-items: center;
    width: 230px;
    height: 100%;
  }
  .aplayer-center {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    audio {
      width: 440px;
    }
  }
}
.aplayer-left .left-img img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
}
.aplayer-left,
.left-detail {
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
}
</style>