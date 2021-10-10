<template>
  <top-bar></top-bar>
  <main-tab-bar></main-tab-bar>
  <router-view class="router-view"></router-view>
</template>

<script>
import TopBar from 'components/topBar/TopBar'
import MainTabBar from 'components/tabBar/MainTabBar'

export default {
  name: "App",
  components: {
    TopBar,
    MainTabBar
  }
}
</script>

<style>
/* .router-view {
  position: absolute;
  left: 201px;
  top: 52px;
} */

</style>
