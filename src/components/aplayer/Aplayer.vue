<template>
  <div class="aplayer">
    <div class="aplayer-left">
      <div class="left-img">
        <img :src="picUrl" alt="" />
        <span @click="imgClick">
          <span class="iconfont icon-jiantou img-icon" v-show="!isLyc"></span>
          <span class="iconfont icon-arrow_down img-icon" v-show="isLyc"></span>
        </span>
      </div>
      <div class="left-detail">
        <div>{{ songDetail.name }}</div>
        <div class="ar">
          <span v-for="item in songDetail.ar" :key="item"
            >{{ item.name }} &nbsp;</span
          >
        </div>
      </div>
    </div>
    <div class="aplayer-center">
      <audio :src="songURL" id="audio" autoplay></audio>
      <div class="audio-icons">
        <span @click="playTypeClick">
          <span
            class="iconfont icon-liebiaoxunhuan"
            v-show="playType == 0"
          ></span>
          <span
            class="iconfont icon-danquxunhuan"
            v-show="playType == 1"
          ></span>
          <span class="iconfont icon-suijibofang" v-show="playType == 2"></span>
        </span>
        <span class="iconfont icon-shangyishoushangyige" @click="prev"></span>
        <span
          class="iconfont icon-bofang1"
          v-show="!playing"
          @click="play"
        ></span>
        <span
          class="iconfont icon-zanting"
          v-show="playing"
          @click="play"
        ></span>
        <span class="iconfont icon-xiayigexiayishou" @click="next"></span>
        <span class="iconfont icon-yinle" @click="imgClick"></span>
      </div>
      <div class="progress">
        <div>{{ timeToString(currentTime) }}</div>
        <div id="pro-bar">
          <div id="bar-line"></div>
          <div id="bar-dot"></div>
        </div>
        <div>{{ playTime(songDetail.dt) }}</div>
      </div>
    </div>
    <div class="aplayer-right">
      <span class="iconfont icon-bofangliebiao" @click="drawer = true"></span>
      <el-drawer
        v-model="drawer"
        :show-close="false"
        :with-header="false"
        size="500px"
      >
        <div class="drawer-header">
          <h3>当前播放</h3>
          <div class="header-info">
            <div>总 {{ $store.state.songDetail.length }} 首</div>
            <div>
              <span><i class="el-icon-folder-add"></i>收藏全部</span>
              <span @click="removeClick">清空列表</span>
            </div>
          </div>
        </div>
        <el-scrollbar height="90vh">
          <ul>
            <li
              class="songs-list"
              :class="{ activelist: index == i }"
              v-for="(item, i) in tableData"
              :key="i"
              @dblclick="playMusic(i)"
            >
              <span class="songs-name">{{ item.name }}</span>
              <span class="songs-singer">
                <span
                  v-for="item in item.ar"
                  :key="item"
                  @click="singerClick(item.id)"
                  >{{ item.name }} &nbsp;</span
                >
              </span>
              <span class="songs-time">{{ playTime(item.dt) }}</span>
            </li>
          </ul>
        </el-scrollbar>
      </el-drawer>
    </div>
    <div class="lyc-bg" v-show="isLyc">
      <div class="lyric-box">
        <img :src="picUrl" alt="" class="header-bg" />
        <span class="el-icon-close header-close" @click="isLyc = false"></span>
        <div class="lyric-header">
          <div class="header-ar">{{ songDetail.name }}</div>
          <div class="header-singer">
            <span v-for="item in songDetail.ar" :key="item"
              >{{ item.name }} &nbsp;</span
            >
          </div>
        </div>
        <div class="lyric-middle">
          <div class="mid-img">
            <img
              :src="picUrl"
              alt=""
              class="img-bg0"
              :class="{ active0: playing }"
            />
            <img
              src="~assets/images/play_disc.png"
              alt=""
              class="img-bg1"
              @click="imgbgClick"
            />
            <img
              src="~assets/images/play_needle.png"
              alt=""
              class="img-bg2"
              :class="{ active1: !playing }"
            />
          </div>
          <div id="lyric-text">
            <p
              :id="item.time"
              v-for="(item, index) in lyric"
              :key="index.id"
              :class="{ activetxt: getActive(item, index) }"
            >
              {{ item.lyc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongURL, getLyric } from "network/songdetail";
import { formatDuration } from "common/utils";
export default {
  name: "Aplayer",
  props: {
    musicURL: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      drawer: false,
      isLyc: false,
      audio: "",
      playing: false, // 播放状态
      songId: "", //音乐id
      songURL: "", //音乐url
      lyric: [], //歌词
      lyTime: "", //歌词时间
      i: 0,
      songDetail: {}, //音乐详情
      tableData: [], //音乐列表数据
      picUrl: "", //音乐图片
      index: 0, //当前音乐的index
      playType: 0, //播放类型: 0-列表循环，1-单曲循环，2-随机播放
      currentTime: "00:00", // 当前播放时间
      timer: "", //定时器
    };
  },
  created() {
    // this.songId = this.$store.state.songId[0];
    this.songId = this.$store.state.songDetail[0].id;
    this.getSongURL();
    this.getLyric();
    this.songDetail = this.$store.state.songDetail[0];
    this.tableData = this.$store.state.songDetail;
    this.picUrl = this.$store.state.songDetail[0].al.picUrl;
  },
  mounted() {
    this.audio = document.getElementById("audio");
  },
  updated() {
    this.tableData = this.$store.state.songDetail;
  },
  computed: {
    nextPlay() {
      return this.$store.state.songDetail.length;
    },
  },
  watch: {
    nextPlay(newSong, oldSong) {
      // console.log(this.$store.state.songDetail);
      // console.log(newSong);
      // console.log(oldSong);
      const n = newSong - oldSong;
      if (n == 1) {
        this.index = newSong - 1;
        this.songId = this.$store.state.songDetail[newSong - 1].id;
        this.getSongURL();
        this.getLyric();
        this.songDetail = this.$store.state.songDetail[newSong - 1];
        this.picUrl = this.$store.state.songDetail[newSong - 1].al.picUrl;
        setTimeout(() => {
          this.audio.play();
        }, 300);
        this.playing = true;
        // this.next()
      } else {
        this.index = -1;
        this.next();
      }
      this.timer = setInterval(this.progress, 1000);
    },
  },
  methods: {
    // 获取音乐url
    getSongURL() {
      getSongURL(this.songId).then((res) => {
        // console.log(res);
        this.songURL = res.data.data[0].url;
      });
    },
    // 获取歌词
    getLyric() {
      getLyric(this.songId).then((res) => {
        // console.log(res);
        const lyric = [];
        const lycArr1 = res.data.lrc.lyric.split("\n"); //拆分为数组
        const lycArr2 = lycArr1.filter((n) => {
          //去空行
          if (n == null || n == "") {
            return false;
          } else {
            return true;
          }
        });
        lycArr2.forEach((item) => {
          const con = item.split("]");
          const lyc = con[1];
          // console.log(lyc);
          const t1 = con[0].split("[")[1];
          const t2 = (t1 || "").split(":");
          const time = t2[0] * 60 + parseInt(t2[1]);
          // console.log(time);
          lyric.push({
            time,
            lyc,
          });
        });
        this.lyric = lyric;
        // console.log(this.lyric);
      });
    },
    // 歌曲时长处理函数
    playTime(dt) {
      return formatDuration(dt);
    },
    // 秒值转时间格式
    timeToString(param) {
      param = parseInt(param);
      let hh = "",
        mm = "",
        ss = "";
      if (param >= 0 && param < 60) {
        param < 10 ? (ss = "0" + param) : (ss = param);
        return "00:" + ss;
      } else if (param >= 60 && param < 3600) {
        mm = parseInt(param / 60);
        mm < 10 ? (mm = "0" + mm) : mm;
        param - parseInt(mm * 60) < 10
          ? (ss = "0" + String(param - parseInt(mm * 60)))
          : (ss = param - parseInt(mm * 60));
        return mm + ":" + ss;
      }
      return hh + ":" + mm + ":" + ss;
    },
    // 歌手点击跳转
    singerClick(id) {
      // console.log(id);
      this.$router.push({
        path: "/singerDetail",
        query: {
          id,
        },
      });
    },
    // 专辑点击跳转
    albumClick(id) {
      // console.log('---');
      this.$router.push({
        path: "/albumDetail",
        query: {
          id,
        },
      });
    },
    // 清空列表
    removeClick() {
      this.$store.commit("remove");
      this.tableData = [];
    },
    imgClick() {
      // this.drawerLyric = true;
      this.isLyc = !this.isLyc;
    },
    imgbgClick() {
      this.play();
    },
    // 双击播放列表播放当前歌曲
    playMusic(index) {
      this.index = index;
      this.songId = this.$store.state.songDetail[index].id;
      this.getSongURL();
      this.getLyric();
      this.songDetail = this.$store.state.songDetail[index];
      this.picUrl = this.$store.state.songDetail[index].al.picUrl;
      setTimeout(() => {
        this.audio.play();
      }, 300);
      this.playing = true;
      // console.log('---');
    },
    // 播放暂停
    play() {
      if (this.playing) {
        this.playing = false;
        this.audio.pause();
        // 清除定时器
        clearInterval(this.timer);
      } else {
        this.playing = true;
        setTimeout(() => {
          this.audio.play();
        }, 300);
        // 定时器监听当前时间
        this.timer = setInterval(this.progress, 1000);
      }
    },
    // 上一首
    prev() {
      document.getElementById("lyric-text").scrollTop = 0
      if (this.$store.state.songDetail.length) {
        this.index--;
        this.timer = setInterval(this.progress, 1000);
        if (this.index < 0) {
          this.index = this.$store.state.songDetail.length - 1;
        }
        this.songId = this.$store.state.songDetail[this.index].id;
        this.getSongURL();
        this.getLyric();
        this.songDetail = this.$store.state.songDetail[this.index];
        this.picUrl = this.$store.state.songDetail[this.index].al.picUrl;
        setTimeout(() => {
          this.audio.play();
        }, 300);
        this.playing = true;
      }
    },
    // // 下一首
    next() {
      document.getElementById("lyric-text").scrollTop = 0
      // 判断是否是随机播放
      if (this.playType == 2) {
        this.index = Math.floor(
          Math.random() * this.$store.state.songDetail.length
        );
      }
      if (this.$store.state.songDetail.length) {
        this.index++;
        this.timer = setInterval(this.progress, 1000);
        if (this.index == this.$store.state.songDetail.length) {
          this.index = 0;
        }
        this.songId = this.$store.state.songDetail[this.index].id;
        this.getSongURL();
        this.getLyric();
        this.songDetail = this.$store.state.songDetail[this.index];
        this.picUrl = this.$store.state.songDetail[this.index].al.picUrl;
        setTimeout(() => {
          this.audio.play();
        }, 300);
        this.playing = true;
      }
    },
    // 播放类型切换
    playTypeClick() {
      this.playType = this.playType + 1 > 2 ? 0 : this.playType + 1;
    },
    getActive(item, index) {
      // 设置当前歌词动态颜色
      if (index == this.lyric.length - 1) {
        index = 0
      }
      return this.currentTime > item.time && this.currentTime < this.lyric[index + 1].time
    },
    // 进度条
    progress() {
      // 根据当前的运动时间求运动点：
      // 当前的运动时间 / 总时间 = 当前的运动点 / 进度条总长
      // 当前时间
      this.currentTime = this.audio.currentTime;
      // 歌词滚动效果
      const cur = parseInt(this.currentTime);
      if (document.getElementById(cur)) {
        if (document.getElementById(cur).offsetTop > 240) {
          document.getElementById("lyric-text").scrollTop =
            document.getElementById(cur).offsetTop - 240;
        }
        this.audio.addEventListener("ended", function () {
          document.getElementById("lyric-text").scrollTop = 0
        });
      }
      // 歌曲总时间
      const totalTime = this.audio.duration;
      switch (this.playType) {
        case 1:
          this.audio.loop = true;
          break;
        default:
          this.audio.loop = false;
          break;
      }
      this.audio.addEventListener("ended", this.next);
      // console.log(totalTime);
      // 获取进度条总长 - 小滑块的宽度
      const totalX = document.getElementById("pro-bar").offsetWidth - 10;
      // console.log(totalX);
      // 获取当前进度
      const proX = (this.currentTime / totalTime) * totalX;
      // console.log(proX);
      // 滑块的margin-left值
      // // document.getElementById("bar-dot").style.marginLeft = ~~(proX) + 'px'
      // 当前进度的背景
      document.getElementById("bar-line").style.width = ~~proX + "px";
      // 滑块的拖拽
      // 根据当前的运动点求当前的运动时间
      // 获取滑块的拖拽距离：鼠标的x坐标 - 进度条左偏移值
      document.getElementById("bar-dot").onmousedown = () => {
        document.onmousemove = (e) => {
          // this.audio.pause();
          const mouseX = e.clientX - 10;
          // console.log(mouseX);
          const barX = document.getElementById("pro-bar").offsetLeft + 230 + 10;
          // console.log(barX);
          // 拖拽距离
          const dotX = mouseX - barX;
          // console.log(dotX);
          // // document.getElementById("bar-dot").style.marginLeft = dotX + 'px'
          document.getElementById("bar-line").style.width = dotX + "px";
          document.getElementById("bar-line").style.maxWidth = totalX + "px";
          this.audio.currentTime = (dotX / totalX) * totalTime;
          // console.log(totalTime);
          // console.log(this.currentTime);
        };
        document.onmouseup = function () {
          // document.getElementById("audio").play();
          this.onmousedown = null;
          this.onmousemove = null;
        };
      };
      document.getElementById("pro-bar").onmousedown = (e) => {
        const proX = e.clientX;
        const barX = document.getElementById("pro-bar").offsetLeft + 230 + 20;
        document.getElementById("bar-line").style.width = proX - barX + "px";
        this.audio.currentTime = ((proX - barX) / totalX) * totalTime;
      };
    },
  },
};
</script>

<style lang="less" scoped>
.activetxt {
  color: #8A2BE2;
  transform: scale(1.3);
  transition: transform 0.5s linear;
}
.aplayer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  // background-color: #fff;
  height: 70px;
  box-shadow: 0 -1px 1px #aaa;
  user-select: none;
  .aplayer-left,
  .aplayer-right {
    display: flex;
    align-items: center;
    width: 230px;
    height: 100%;
  }
  .aplayer-center {
    flex: 1;
    text-align: center;
    padding-top: 15px;
    box-sizing: border-box;
    height: 100%;
    position: relative;
    span {
      margin: 0 15px;
    }
    .progress {
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: #f00;
      font-size: 12px;
      line-height: 12px;
      margin-top: 3px;
      #pro-bar {
        // flex: 1;
        display: flex;
        width: 60%;
        margin: 0 10px;
        margin-top: 2px;
        border-radius: 3px;
        background-color: #ccc;
        cursor: pointer;
        &:hover {
          background-color: #aaa;
        }
        #bar-line {
          width: 0px;
          height: 3px;
          border-radius: 3px;
          background-color: #409eff;
        }
        #bar-dot {
          width: 10px;
          height: 3px;
          background-color: #409eff;
          border-radius: 3px;
          transform: scale(1.5);
          box-shadow: 0 0 1px #eee;
          &:hover {
            transform: scale(2);
          }
        }
      }
    }
  }
}
.aplayer-left .left-img {
  position: relative;
  &:hover {
    .img-icon {
      display: block;
    }
  }
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 5px;
  }
  .img-icon {
    display: none;
    position: absolute;
    bottom: 3px;
    left: 0;
    top: 0;
    right: 10px;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
  }
}
.aplayer-left,
.left-detail {
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
}
.ar {
  font-size: 12px;
  color: rgb(83, 81, 81);
}
.iconfont {
  font-size: 25px;
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}
.drawer-header {
  .header-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 40px;
    font-size: 14px;
    color: #aaa;
    span {
      margin: 0 10px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
      i {
        margin-right: 5px;
      }
    }
  }
}
.songs-list {
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  &:nth-child(2n-1) {
    background-color: #F5F5F5;
  }
  &:hover {
    background-color: #eee;
  }
  span {
    display: inline-block;
  }
  .songs-name {
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .songs-singer {
    width: 180px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 15px;
    span:hover {
      color: #8A2BE2;
    }
  }
  .songs-time {
    width: 55px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.activelist {
  background-color: #409eff !important;
  color: #E6E6FA !important;
}
.lyc-bg {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 70px;
  z-index: 99;
  overflow: hidden;
}
.lyric-box {
  // background: linear-gradient(to top, #d0b691, #8b9ead);
  background: linear-gradient(to top, #8b9ead, #fff);
  height: 100%;
  padding-top: 10px;
  .header-bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    filter: blur(8px);
    transform: scale(1.1);
  }
  .header-close {
    position: absolute;
    top: 50px;
    right: 50px;
    font-size: 30px;
    color: #F8F8FF;
    z-index: 9;
    cursor: pointer;
    transition: transform 0.3s linear;
    &:hover {
      transform: rotate(90deg);
      color: #F00;
    }
  }
}
.lyric-header {
  text-align: center;
  filter: blur(0);
  margin-top: 20px;
  .header-ar {
    font-size: 25px;
    font-weight: 500;
  }
  .header-singer {
    margin: 10px;
    font-size: 14px;
  }
}
.lyric-middle {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  .mid-img {
    position: relative;
    margin-top: 60px;
    &:hover .img-bg0 {
      transform: scale(1.1);
    }
    img {
      width: 250px;
      height: 250px;
      vertical-align: middle;
      border-radius: 50%;
      margin-top: 80px;
    }
    .img-bg1 {
      position: absolute;
      top: -50px;
      left: -50px;
      width: 350px;
      height: 350px;
      outline: 13px solid #E6E6FA;
      outline-offset: -5px;
    }
    .img-bg2 {
      position: absolute;
      width: 150px;
      height: 200px;
      top: -160px;
      left: 90px;
      border-radius: 0;
      transition: transform 0.5s;
      transform-origin: left top;
    }
  }
  #lyric-text {
    width: 480px;
    height: 520px;
    margin-left: 200px;
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    border-radius: 5px;
    box-shadow: 0 0 200px 5px rgba(0, 0, 0, 0.2);
    color: #F8F8FF;
    background-color: rgba(0, 0, 0, 0.3);
    position: relative;
    overflow-y: scroll;
    overflow-x: hidden;
    // // 隐藏滚动条
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
@keyframes animat {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.active0 {
  animation: animat 5s linear infinite;
}
.active1 {
  transform: rotate(-20deg);
}
</style>