<template>
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
      <img :src="$store.state.profile.avatarUrl" alt="" v-if="$store.state.profile.avatarUrl">
      <span class="login-user">{{$store.state.profile.nickname ? $store.state.profile.nickname : '未登录'}}</span>
      <el-button type="primary" size="mini" @click="loginClick">登录</el-button>
      <el-button type="danger" size="mini" @click="logoutClick">退出</el-button>
      <el-dialog v-model="dialogVisible" width="30%" @close="resetForm">
        <div class="qr-title">{{ title }}</div>
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
          <el-button
            type="primary"
            size="small"
            circle
            icon="el-icon-full-screen"
            @click="qrClick"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            circle
            icon="el-icon-mobile"
            @click="mobileClick"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            circle
            icon="el-icon-message"
            @click="emailClick"
          ></el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import InputDetail from "components/input/InputDetail";
import QrcodeVue from "qrcode.vue";
import { getQrKey, getQrCreate, getCheck, loginMobile, loginEmail, logout } from "network/login";
export default {
  name: "HomeHeader",
  data() {
    return {
      dialogVisible: false,
      unikey: "",
      qrimg: "",
      qrurl: "",
      loginForm: {
        mobile: "",
        email: "",
        password: "",
      },
      title: "扫码登录",
      isQr: true,
      isAccount: false,
      isMobile: true,
      isEmail: false,
      timer: '',
      profile: {},
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
    InputDetail,
    QrcodeVue,
  },
  computed : {
    userInfo() {
      return this.profile.avatarUrl ? this.profile.avatarUrl : 'this.$store.state.songDetail[0].al.picUrl'
    }
  },
  methods: {
    logoClick() {
      this.$router.push("/discovery");
    },
    backClick() {
      this.$router.back();
    },
    goClick() {
      this.$router.go(1);
    },
    loginClick() {
      this.dialogVisible = true;
      if (this.isQr) {
        this.getQrKey();
        setTimeout(() => {
          this.getQrCreate();
        }, 500);
        this.timer = setInterval(this.getCheck, 1000)
      }
    },
    //退出登录
    logoutClick() {
      logout().then(res => {
        if (res.data.code === 200) {
          this.$store.commit('logoutInfo')
          return this.$message.success('退出成功')
        }
      })
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
    // 二维码扫码状态
    // 800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
    getCheck() {
      getCheck(this.unikey).then((res) => {
        // console.log(res);
        if (res.data.code === 803) {
          clearInterval(this.timer);
          this.$store.commit('loginInfo', res.data.profile)
          // this.profile = res.data.profile
          this.dialogVisible =false
          return this.$message.success(res.data.message)
        }
        else if (res.data.code === 800) {
          clearInterval(this.timer);
          return this.$message.error(res.data.message)
        }
      });
    },
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid && this.isMobile) {
          // 登录请求
          loginMobile(this.loginForm.mobile, this.loginForm.password).then((res) => {
            // console.log(res);
            if (res.data.code !== 200) return this.$message.error('登录失败')
            this.$store.commit('loginInfo', res.data.profile)
            // this.profile = res.data.profile
            this.dialogVisible =false
            return this.$message.success('登录成功')
          });
        } else if (valid && this.isEmail) {
          loginEmail(this.loginForm.email, this.loginForm.password).then((res) => {
            // console.log(res);
            if (res.data.code !== 200) return this.$message.error('登录失败')
            this.$store.commit('loginInfo', res.data.profile)
            // this.profile = res.data.profile
            this.dialogVisible =false
            return this.$message.success('登录成功')
          });
        }
      });
    },
    // 重置事件
    resetForm() {
      this.$refs.loginForm.resetFields();
      clearInterval(this.timer);
    },
    // 切换登录方式
    qrClick() {
      this.title = "扫码登录";
      this.isQr = true;
      this.isAccount = false;
      this.getQrKey();
      setTimeout(() => {
        this.getQrCreate();
      }, 500);
      this.timer = setInterval(this.getCheck, 1000)
    },
    mobileClick() {
      this.title = "手机登录";
      this.isAccount = true;
      this.isMobile = true;
      this.isQr = false;
      this.isEmail = false;
      clearInterval(this.timer);
    },
    emailClick() {
      this.title = "邮箱登录";
      this.isAccount = true;
      this.isEmail = true;
      this.isQr = false;
      this.isMobile = false;
      clearInterval(this.timer);
    }
  },
};
</script>

<style lang="less" scoped>
.el-button {
  font-size: 16px;
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
  .bar-right {
    margin-right: 10px;
    img {
      width: 40px;
      height: 40px;
      vertical-align: middle;
      border-radius: 50%;
      user-select: none;
    }
    .login-user {
      display: inline-block;
      width: 100px;
      margin:  0 10px;
      color: #fff;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      vertical-align: middle;
    }
  }
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