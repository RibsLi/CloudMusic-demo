<template>
  <div class="aplayer">
    <div class="aplayer-left">
      <div class="left-img">
        <img :src="picUrl" alt="" />
        <span class="iconfont icon-jiantou img-icon"  @click="imgClick"></span>
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
      <el-drawer v-model="drawer" :show-close="false" :with-header="false">
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
        <el-table
          :data="tableData"
          stripe
          highlight-current-row
          size="mini"
          height="90vh"
          style="width: 100%"
          ref="table"
        >
          <el-table-column
            prop="name"
            label="歌曲"
            :show-overflow-tooltip="true"
          >
            <template v-slot:default="scope">
              <span class="singer">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ar" label="歌手" :show-overflow-tooltip="true">
            <template v-slot:default="scope">
              <span
                class="singer"
                v-for="item in scope.row.ar"
                :key="item"
                @click="singerClick(item.id)"
                >{{ item.name }} &nbsp;</span
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="al.name"
            label="专辑"
            :show-overflow-tooltip="true"
          >
            <template v-slot:default="scope">
              <span class="singer" @click="albumClick(scope.row.al.id)">{{
                scope.row.al.name
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="dt" label="时间" width="75px">
            <template v-slot:default="scope">
              {{ playTime(scope.row.dt) }}
            </template>
          </el-table-column>
        </el-table>
      </el-drawer>
    </div>
    <el-drawer v-model="drawerLyric" :with-header="false" direction="btt" size="100%">
      <div class="lyric-box">
        <img :src="picUrl" alt="" class="header-bg">
        <span class="el-icon-close header-close" @click="drawerLyric=false"></span>
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
            <img :src="picUrl" alt="" class="img-bg0" :class="{active0: playing}">
            <img src="~assets/images/play_disc.png" alt="" class="img-bg1" @click="imgbgClick">
            <img src="~assets/images/play_needle.png" alt="" class="img-bg2" :class="{active1: !playing}">
          </div>
          <div class="lyric-text" v-if="isShow">
            <el-scrollbar :noresize="false">
              <p :id="'s'+lyTime[index]" v-for="(item, index) in lyric" :key="index">{{item}}</p>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </el-drawer>
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
      drawerLyric: false,
      audio: "",
      playing: false, // 播放状态
      songId: "", //音乐id
      songURL: "", //音乐url
      lyric: '', //歌词
      lyTime: '', //歌词时间
      i: 0,
      isShow: false,
      songDetail: {}, //音乐详情
      tableData: [], //音乐列表数据
      picUrl: "", //音乐图片
      index: 0, //当前音乐的index
      playType: 0, //播放类型: 0-列表循环，1-单曲循环，2-随机播放
      currentTime: "00:00", // 当前播放时间
      //totalTime: "00:00", // 总播放时间
      timer: "", //定时器
    };
  },
  created() {
    // this.songId = this.$store.state.songId[0];
    this.songId = this.$store.state.songDetail[0].id;
    this.getSongURL();
    this.getLyric()
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
      getLyric(this.songId).then(res => {
        // console.log(res);
        // 决定歌词盒子是否显示
        this.isShow = res.data.lrc.lyric.indexOf("[00:00.000]") !== -1
        // console.log(this.isShow);
        const a = res.data.lrc.lyric.split('[')
          // console.log(a);
          const lyric = []
          const lyTime = []
        a.forEach(item => {
          const b = item.split(']')[1]
          // console.log(b);
          lyric.push(b)
          // 歌词时间处理
          const c = item.split(']')[0].split('.')
          // console.log(c);
          const d = c[0].split(':')
          // console.log(d);
          const e = d[0] * 60 + parseInt(d[1])
          // console.log(lyTime);
          lyTime.push(e)
        });
        this.lyric = lyric
        this.lyTime = lyTime
      })
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
      this.drawerLyric = true
    },
    imgbgClick() {
      this.play()
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
        this.audio.play();
        // 定时器监听当前时间
        this.timer = setInterval(this.progress, 1000);
      }
    },
    // 上一首
    prev() {
      if (this.$store.state.songDetail.length) {
        this.index--;
        this.timer = setInterval(this.progress, 1000);
        if (this.index < 0) {
          this.index = this.$store.state.songDetail.length - 1;
        }
        this.songId = this.$store.state.songDetail[this.index].id;
        this.getSongURL();
        this.getLyric()
        this.songDetail = this.$store.state.songDetail[this.index];
        this.picUrl = this.$store.state.songDetail[this.index].al.picUrl;
        this.audio.play();
        this.playing = true;
      }
    },
    // // 下一首
    next() {
      // 判断是否是随机播放
      if (this.playType == 2) {
        this.index = Math.floor(Math.random() * this.$store.state.songDetail.length)
      }
      if (this.$store.state.songDetail.length) {
        this.index++;
        this.timer = setInterval(this.progress, 1000);
        if (this.index == this.$store.state.songDetail.length) {
          this.index = 0;
        }
        this.songId = this.$store.state.songDetail[this.index].id;
        this.getSongURL();
        this.getLyric()
        this.songDetail = this.$store.state.songDetail[this.index];
        this.picUrl = this.$store.state.songDetail[this.index].al.picUrl;
        this.audio.play();
        this.playing = true;
      }
    },
    // 播放类型切换
    playTypeClick() {
      this.playType = this.playType + 1 > 2 ? 0 : this.playType + 1;
    },
    // 进度条
    progress() {
      // 根据当前的运动时间求运动点：
      // 当前的运动时间 / 总时间 = 当前的运动点 / 进度条总长 
      // 当前时间
      this.currentTime = this.audio.currentTime;
      // 歌词联动效果
      const cur = parseInt(this.currentTime)
      if (document.getElementById('s' + cur)) {
        document.getElementById('s' + this.i).setAttribute("style","color: #F8F8FF; transform: scale(1);")
        this.i = cur
        document.getElementById('s' + cur).setAttribute("style","color: #8A2BE2; transform: scale(1.3);")
      }
      // 歌曲总时间
      const totalTime = this.audio.duration;
      switch (this.playType) {
        case 1:
          this.audio.loop = true
          break;
        default:
          this.audio.loop = false
          break;
      }
      if (this.currentTime == totalTime) {
        this.next()
      }
      // if (this.currentTime == totalTime) {
      //   if (this.playType == 1) {
      //     this.audio.loop = true
      //   }
      //   this.next()
      // }
      // console.log(totalTime);
      // 获取进度条总长 - 小滑块的宽度
      const totalX = document.getElementById("pro-bar").offsetWidth - 10
      // console.log(totalX);
      // 获取当前进度
      const proX = (this.currentTime / totalTime) * totalX
      // console.log(proX);
      // 滑块的margin-left值
      // // document.getElementById("bar-dot").style.marginLeft = ~~(proX) + 'px'
      // 当前进度的背景
      document.getElementById("bar-line").style.width = ~~(proX) + 'px'
      // 滑块的拖拽
      // 根据当前的运动点求当前的运动时间
      // 获取滑块的拖拽距离：鼠标的x坐标 - 进度条左偏移值
      document.getElementById("bar-dot").onmousedown = () => {
        document.onmousemove = (e) => {
          this.audio.pause();
          const mouseX = e.clientX - 10
          // console.log(mouseX);
          const barX = document.getElementById("pro-bar").offsetLeft + 230 + 10
          // console.log(barX);
          // 拖拽距离
          const dotX = mouseX - barX
          // console.log(dotX);
          // // document.getElementById("bar-dot").style.marginLeft = dotX + 'px'
          document.getElementById("bar-line").style.width = dotX + 'px'
          document.getElementById("bar-line").style.maxWidth = totalX + 'px'
          this.audio.currentTime = (dotX / totalX) * totalTime
          // console.log(totalTime);
          // console.log(this.currentTime);
        }
        document.onmouseup = function() {
          document.getElementById("audio").play();
          this.onmousedown = null
          this.onmousemove = null
        }
      }
      document.getElementById("pro-bar").onmousedown = (e) => {
        const proX = e.clientX
        const barX = document.getElementById("pro-bar").offsetLeft + 230 + 20
        document.getElementById("bar-line").style.width = proX - barX + 'px'
        this.audio.currentTime = ((proX - barX) / totalX) * totalTime
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
    background-color: rgba(0, 0, 0, .3);
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
.singer {
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
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
    transition: transform .3s linear;
    &:hover {
      transform: rotate(90deg);
      color: #F00;
    }
  }
}
.lyric-header {
  text-align: center;
  filter: blur(0);
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
      outline:13px solid #E6E6FA;
      outline-offset:-5px;
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
  .lyric-text {
    width: 400px;
    height: 520px;
    margin-left: 200px;
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    border-radius: 5px;
    box-shadow: 0 0 200px 5px rgba(0, 0, 0, .2);
    color: #F8F8FF;
    background-color: rgba(0, 0, 0, .3);
    position: relative;
    .activetext {
      color: #f00;
      transform: scale(1.2);
    }
  }
}
@keyframes animat {
  0% {transform: rotate(0);}
  100% {transform: rotate(360deg);}
}
.active0 {
  animation: animat 5s linear infinite;
}
.active1 {
  transform: rotate(-20deg);
}
</style>