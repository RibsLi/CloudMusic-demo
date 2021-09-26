<template>
<div class="tab-bar">
  <slot></slot>
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

</style>