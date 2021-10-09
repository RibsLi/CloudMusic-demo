<template>
  <div class="tab-bar-item" :class="{active: isActive}" @click="itemClick">
    <slot name="item-text"></slot>
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
  padding: 0 20px;
  text-align: center;
  font-size: 14px;
  cursor:pointer
}
.tab-bar-item:hover {
  background-color: #d6e8fc;
  color: #ff0000;
}
.active {
  color: #ff0000;
  background-color: #ecf5ff;
  border-left: 2px solid #ff0000;
}
</style>