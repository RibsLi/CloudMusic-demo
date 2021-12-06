<template>
  <div class="profile">
    <div class="top-info">
      <p>Welcome</p>
      <p>谢谢你长的那么好看还来看我</p>
      <p>源码都在我的<a href="https://github.com/RibsLi"> Github </a></p>
    </div>
    <div class="pro-span">
      <div class="pro-nav">个人项目推荐</div>
      <span><a href="https://github.com/RibsLi/CloudMusic-demo">网易云音乐</a></span>
      <span><a href="https://github.com/RibsLi/SuperMall-demo">coderwhy的蘑菇街</a></span>
      <span><a href="https://github.com/RibsLi/vue-Admin-demo">电商后台管理系统</a></span>
    </div>
    <ul class="pro-ul">
      <li>
        <a href="https://github.com/RibsLi"><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-GitHub"></use></svg>
        </a>
      </li>
      <li>
        <a href="https://gitee.com/RibsLi"><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gitee"></use></svg>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);"><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-boke"></use></svg>
        </a>
      </li>
      <li>
        <a href="https://blog.csdn.net/qq_46059305?spm=1001.2100.3001.5343"><svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-csdn"></use></svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Profile",
}
</script>

<style lang="less" scoped>
.icon {
  font-size: 30px;
}
.profile {
  width: 100%;
  height: 100%;
  text-align: center;
  overflow: hidden;
  position: relative;
  .top-info {
    margin: 30px 0;
    p {
      line-height: 40px;
      &:first-child {
        font-size: 20px;
        font-weight: 600;
      }
      a {
        color: #409eff;
        &:hover {
          color: #f00;
        }
      }
    }
  }
  .pro-span {
    .pro-nav {
      font-weight: 600;
      line-height: 30px;
    }
    span {
      margin: 0 10px;
      line-height: 30px;
      a {
        color: #409eff;
        &:hover {
          color: #f00;
        }
      }
    }
  }
  .pro-ul {
    display: flex;
    justify-content: space-between;
    width: 500px;
    margin: 100px auto;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    overflow: hidden;
    li {
      a {
        display: inline-block;
        padding: 10px 30px;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
.header-bg {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  filter: blur(5px);
  transform: scale(1.1);
  z-index: -1;
}
@media screen and (max-width: 414px) {
  .profile {
    .pro-ul {
      width: 320px;
      li {
        a {
          padding: 10px 20px;
        }
      }
    }
  }
}
</style>