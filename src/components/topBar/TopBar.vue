<template>
  <div class="top-bar">
    <div class="logo" @click="logoClick">
      <img src="~assets/img/logo.png" alt="">
    </div>
    <div class="box-icon">
      <span class="icon-chevron-left top-icon" @click="backClick"></span>
      <span class="icon-chevron-right top-icon" @click="goClick"></span>
    </div>
    <div class="search">
      <input type="text" placeholder="音乐/视频/电台/用户">
      <span class="icon-search search-icon"></span>
    </div>
    <!-- <div class="login">
      <span class="icon-user login-icon"></span>
      登录 / 注册
    </div> -->
  </div>
</template>

<script>
export default {
  name: "TopBar",
  methods: {
    logoClick() {
      this.$router.push('/discovery')
    },
    backClick() {
      this.$router.back()
    },
    goClick() {
      this.$router.go(1)
    }
  },
}
</script>

<style scoped>
.top-bar {
  display: flex;
  height: 50px;
  width: 100%;
  box-shadow: 0 1px 2px #ff0000;
  /* background-color: blue; */
}
.top-bar .logo {
  margin: auto 20px;
}
.box-icon {
  margin: auto 0;
}
.top-icon {
  font-size: 35px;
  text-align: center;
  color: #f9f9f9;
  background-color: #242424;
  margin: auto 10px;
  border-radius: 50%;
}
.top-icon:hover {
  background-color: #ff0000;
  color: #fff;
}
.search {
  margin-left: 30px;
  position: relative;
  top: 50%;
  margin-top: -18px;
}
.search input {
  width: 400px;
  height: 36px;
  outline: none;
  border-radius: 20px;
  padding-left: 40px;
  border: 1px solid #ccc;
}
.search-icon {
  font-size: 20px;
  position: absolute;
  left: 10px;
  top: 10px;
  color: #ccc;
}
.login {
  height: 40px;
  background-color: red;
}
.login-icon {
  border: 1px solid #000;
  border-radius: 50%;
}
</style>