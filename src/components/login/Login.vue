<template>
  <div class="login">
    <el-form ref="loginForm" :model="loginForm" :rules="rules">
      <el-form-item prop="email">
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
</template>

<script>
import { getQrKey, getQrCreate } from "network/login";
export default {
  name: "Login",
  data() {
    return {
      unikey: "",
      qrimg: "",
      qrurl: "",
      loginForm: {
        email: "admin@163.com",
        password: "123456",
      },
      // 验证规则
      rules: {
        email: [
          {
            required: true,
            message: "请输入邮箱账号",
            trigger: "blur",
          }
        ],
        password: [
          {
            required: true,
            message: "请输入用户密码",
            trigger: "blur",
          }
        ],
      },
    };
  },
  created() {
    // this.getQrKey();
    // this.getQrCreate();
  },
  unmounted() {
    console.log('---');
  },
  methods: {
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
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       // 登录请求
    //       login(this.loginForm.username, this.loginForm.password).then(
    //         (res) => {
    //           // console.log(res);
    //           const status = res.data.meta.status;
    //           if (status !== 200)
    //             return this.$message({
    //               message: "登陆失败",
    //               type: "error",
    //               duration: 1000,
    //             });
    //           // this.$message.success("登陆成功");
    //           this.$message({
    //             message: "登陆成功",
    //             type: "success",
    //             duration: 1000,
    //           });

    //           // 保存token到window.sessionStorage中
    //           window.sessionStorage.setItem("token", res.data.data.token);
    //           this.$router.push("/home");
    //         }
    //       );
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },

    // 重置事件
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.btn-form {
  width: 100%;
}
</style>