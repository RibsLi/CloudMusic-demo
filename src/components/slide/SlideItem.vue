<template>
  <div class="slide-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SlideItem",
};
</script>

<style scoped>
.slide-item {
  width: 200px;
  margin: 5px 0;
  position: relative;
}
</style>
