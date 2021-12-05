<template>
  <div class="collect">
    <div class="users" v-for="item in subscribers" :key="item">
      <img :src="item.avatarUrl" alt="" />
      <span>
        {{ item.nickname }}
        <svg class="icon" aria-hidden="true" v-show="item.gender == 2">
          <use xlink:href="#icon-xingbienv"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-show="item.gender == 1">
          <use xlink:href="#icon-xingbienan"></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collect",
  props: {
    subscribers: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      total: 0,
    };
  },
};
</script>

<style lang="less" scoped>
.collect {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  // margin-top: 20px;
  color: #409eff;
  .users {
    width: 400px;
    cursor: pointer;
    &:hover {
      color: #ff0000;
    }
    img {
      width: 100px;
      height: 100px;
      border-radius: 100%;
      margin: 10px 15px 10px 0;
      vertical-align: middle;
    }
  }
}
@media screen and (max-width: 414px) {
  .collect {
    .users {
      img {
        width: 50px;
        height: 50px;
        margin: 5px;
      }
    }
  }
}
</style>