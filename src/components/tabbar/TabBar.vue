<template>
<div class="tab-bar">
  <div class="tab-bar-item">发现音乐</div>
  <div class="tab-bar-item">发现音乐</div>
  <div class="tab-bar-item">发现音乐</div>
  <div class="tab-bar-item">发现音乐</div>
</div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
.tab-bar {
  display: flex;
  width: 200px;
  flex-direction: column;
  background-color: #f9f9f9;
  position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;
  box-shadow: 1px 0 1px rgba(100, 100, 100, .1);
}
.tab-bar-item {
  /* flex: 1; */
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  font-size: 14px;
}
</style>