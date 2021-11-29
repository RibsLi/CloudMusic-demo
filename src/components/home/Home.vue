<template>
  <el-container>
    <el-header>
      <div class="top-bar">
        <div class="bar-left">
          <div class="logo" @click="logoClick">
            <img src="~assets/images/logo.png" alt="" />
          </div>
          <div class="box-icon">
            <el-button
              type="info"
              size="mini"
              icon="el-icon-arrow-left"
              circle
              @click="backClick"
            ></el-button>
            <el-button
              type="info"
              size="mini"
              icon="el-icon-arrow-right"
              circle
              @click="goClick"
            ></el-button>
          </div>
          <!-- 输入框 -->
          <div class="search">
            <input-detail />
          </div>
        </div>
        <!-- 登录 -->
        <div class="bar-right">
          <el-button type="primary" size="mini" @click="loginClick"
            >登录</el-button
          >
          <el-dialog v-model="dialogVisible" width="30%">
            <!-- <login/> -->
            <div class="qr-title">{{title}}</div>
            <div v-show="isQr">
              <div class="qr-box">
                <qrcode-vue :value="qrurl" :size="200" level="H" class="qr-code" />
              </div>
              <div class="qr-hint">使用 <span>网易云音乐APP</span> 扫码登录</div>
            </div>
            <div v-show="isAccount">
              <el-form ref="loginForm" :model="loginForm" :rules="rules">
                <el-form-item prop="mobile" v-if="isMobile">
                  <el-input
                    v-model="loginForm.mobile"
                    type="text"
                    autocomplete="off"
                    placeholder="请输入手机号"
                    prefix-icon="el-icon-mobile"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="email" v-if="isEmail">
                  <el-input
                    v-model="loginForm.email"
                    type="text"
                    autocomplete="off"
                    placeholder="请输入邮箱账号"
                    prefix-icon="el-icon-message"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="loginForm.password"
                    type="password"
                    autocomplete="off"
                    placeholder="请输入密码"
                    prefix-icon="el-icon-lock"
                    :show-password="true"
                    @keyup.enter="submitForm('loginForm')"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="submitForm('loginForm')"
                    class="btn-form"
                  >
                    登录
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="qr-btn">
              <el-button type="primary" size="small" circle icon="el-icon-full-screen" @click="qrClick"></el-button>
              <el-button type="primary" size="small" circle icon="el-icon-mobile" @click="mobileClick"></el-button>
              <el-button type="primary" size="small" circle icon="el-icon-message" @click="emailClick"></el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isToggle ? '64px' : '150px'">
        <div class="toggle" @click="toggleClick">
          <div v-show="!isToggle" class="is-toggle">
            <i class="el-icon-arrow-left"></i>
            <i class="el-icon-arrow-left"></i>
            <i class="el-icon-arrow-left"></i>
          </div>
          <div v-show="isToggle" class="no-toggle">
            <i class="el-icon-arrow-right"></i>
            <i class="el-icon-arrow-right"></i>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <el-menu
          active-text-color="#fff"
          background-color="#3a3d44"
          text-color="#aaa"
          :collapse="isToggle"
          :collapse-transition="false"
          router
          :default-active="isActive"
        >
          <el-menu-item
            :index="item.path"
            v-for="(item, index) in menu"
            :key="index"
            @click="saveStateClick(item.path)"
          >
            <i class="iconfont" :class="icon[index]"></i>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-footer height="70px">
      <aplayer />
    </el-footer>
  </el-container>
</template>

<script>
import Aplayer from "components/aplayer/Aplayer.vue";
import InputDetail from "components/input/InputDetail";
// import Login from "components/login/Login"
import QrcodeVue from 'qrcode.vue'
import { getQrKey, getQrCreate } from "network/login";
export default {
  name: "Home",
  data() {
    return {
      menu: [
        { title: "发现音乐", path: "/discovery" },
        { title: "推荐歌单", path: "/recommends" },
        { title: "最新音乐", path: "/newSongs" },
        { title: "最新MV", path: "/newMV" },
        { title: "排行榜单", path: "/leaderboard" },
        { title: "热门歌手", path: "/singer" },
        { title: "我的歌单", path: "/mySongs" },
        { title: "我的收藏", path: "/myCollect" },
      ],
      icon: [
        "icon-logo-dark1-copy",
        "icon-dingdan",
        "icon-yinle",
        "icon-mv",
        "icon-paixingbang",
        "icon-geshou",
        "icon-dingdan",
        "icon-shoucang",
      ],
      isToggle: false,
      isActive: "",
      dialogVisible: false,
      unikey: "",
      qrimg: "",
      qrurl: "",
      loginForm: {
        mobile: 18888888888,
        email: "admin@163.com",
        password: "123456",
      },
      title: '扫码登录',
      isQr: true,
      isAccount: false,
      isMobile: true,
      isEmail: false,
      // 验证规则
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱账号",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    Aplayer,
    InputDetail,
    QrcodeVue
    // Login
  },
  created() {
    this.isActive = window.sessionStorage.getItem("activePath")
      ? window.sessionStorage.getItem("activePath")
      : "/discovery";
  },
  methods: {
    // 折叠菜单栏
    toggleClick() {
      this.isToggle = !this.isToggle;
    },
    logoClick() {
      this.$router.push("/discovery");
    },
    backClick() {
      this.$router.back();
    },
    goClick() {
      this.$router.go(1);
    },
    saveStateClick(activePath) {
      window.sessionStorage.setItem("activePath", activePath);
    },
    loginClick() {
      this.dialogVisible = true;
      this.getQrKey();
      setTimeout(() => {
        this.getQrCreate();
      }, 500);
    },
    // 获取二维码key
    getQrKey() {
      getQrKey().then((res) => {
        // console.log(res);
        if (res.data.data.code === 200) {
          this.unikey = res.data.data.unikey;
        }
      });
    },
    // 生成二维码
    getQrCreate() {
      getQrCreate(this.unikey, this.qrimg).then((res) => {
        // console.log(res);
        this.qrurl = res.data.data.qrurl;
      });
    },
    submitForm() {
      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     // 登录请求
      //     login(this.loginForm.email, this.loginForm.password).then(
      //       (res) => {
      //         // console.log(res);
      //         if (res.data.meta.status !== 200)
      //           return this.$message({
      //             message: "登陆失败",
      //             type: "error",
      //             duration: 1000,
      //           });
      //         this.$message({
      //           message: "登陆成功",
      //           type: "success",
      //           duration: 1000,
      //         });
      //         // 保存token到window.sessionStorage中
      //         window.sessionStorage.setItem("token", res.data.data.token);
      //         this.dialogVisible = false;
      //       }
      //     );
      //   } else {
      //     return false;
      //   }
      // });
    },

    // 重置事件
    resetForm() {
      this.$refs.loginForm.resetFields();
    },
    // 切换登录方式
    qrClick() {
      this.title = "扫码登录"
      this.isQr = true
      this.isAccount = false
      this.getQrKey();
      setTimeout(() => {
        this.getQrCreate();
      }, 500);
    },
    mobileClick() {
      this.title = "手机登录"
      this.isAccount = true
      this.isMobile = true
      this.isQr = false
      this.isEmail =false
    },
    emailClick() {
      this.title = "邮箱登录"
      this.isAccount = true
      this.isEmail= true
      this.isQr = false
      this.isMobile = false
    }
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100vh;
}
.el-header {
  padding: 0;
  border-bottom: 2px solid #ff0000;
}
.el-footer {
  padding: 0;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #242424;
  .bar-left {
    display: flex;
  }
  .bar-right {
    margin-right: 50px;
  }
  .logo {
    margin: 0 22px;
    cursor: pointer;
  }
  .box-icon {
    margin: auto 0;
  }
  .search {
    margin: auto 30px;
    width: 300px;
    position: relative;
  }
}
// .el-input {
// --el-input-border-radius: 5px;
// }
.el-button {
  font-size: 16px;
}
.el-aside {
  // margin-top: 2px;
  background-color: #3a3d44;
  .toggle {
    background-color: #67676b;
    font-size: 16px;
    line-height: 30px;
    color: #fff;
    text-align: center;
  }
  .el-menu {
    border-right: 0;
  }
  .el-menu-item {
    text-align: center;
  }
  .el-menu-item:focus {
    background-color: rgb(46, 49, 54);
  }
}
.iconfont {
  margin-right: 5px;
}
.el-main {
  min-width: 890px;
  max-width: 1856px;
  // height: cale( 100% -93px);
  height: 85vh;
  overflow-y: scroll;
}
.is-toggle i:nth-child(1) {
  animation: animat 1s linear 0.3s infinite;
}
.is-toggle i:nth-child(2) {
  animation: animat 1s linear 0.2s infinite;
}
.is-toggle i:nth-child(3) {
  animation: animat 1s linear 0.1s infinite;
}
@keyframes animat {
  0% {
    color: #000;
  }
  100% {
    color: #fff;
  }
}
.no-toggle i:nth-child(1) {
  animation: animat 1s linear 0.1s infinite;
}
.no-toggle i:nth-child(2) {
  animation: animat 1s linear 0.2s infinite;
}
.no-toggle i:nth-child(3) {
  animation: animat 1s linear 0.3s infinite;
}
.btn-form {
  width: 100%;
}
.qr-title {
  text-align: center;
  font-size: 30px;
  font-weight: 500;
  margin: 0 0 30px 0;
}
.qr-box {
  position: relative;
  height: 220px;
}
.qr-code {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.qr-hint {
  text-align: center;
  span {
    color: #409eff;
  }
}
.qr-btn {
  display: flex;
  justify-content: space-around;
  width: 240px;
  margin: 0 auto;
  margin-top: 50px;
}
</style>