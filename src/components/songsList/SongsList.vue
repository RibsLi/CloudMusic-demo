<template>
  <div class="slide">
    <div class="top">
      <div class="top-left"><slot name="top-left"></slot></div>
      <div class="top-more"><slot name="top-more"></slot></div>
    </div>
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongsList",
};
</script>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  line-height: 40px;
}
.top-left {
  font-weight: 600;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>