<template>
  <div class="tab-bar-item" @click="itemClick">
    <div :class="{active: isActive}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String
  },
  data() {
    return {
      // isActive: true
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path)
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  /* flex: 1; */
  height: 60px;
  line-height: 60px;
  /* padding: 0 20px; */
  text-align: center;
  font-size: 14px;
  cursor:pointer
}
.tab-bar-item:hover {
  background-color: #ecf5ff;
  color: red;
}
.active {
  color: red;
  background-color: #ecf5ff;
}
</style>