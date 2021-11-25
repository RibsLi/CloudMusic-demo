<template>
  <div class="aplayer">
    <div class="aplayer-left">
      <div class="left-img">
        <img :src="picUrl" alt="">
      </div>
      <div class="left-detail">
        <div>{{songDetail.name}}</div>
        <div class="ar">
          <span v-for="item in songDetail.ar" :key="item">{{item.name}} &nbsp;</span>
        </div>
      </div>
    </div>
    <div class="aplayer-center">
      <audio :src="songURL" id="audio" autoplay></audio>
      <div class="audio-icons">
        <span @click="playTypeClick">
          <span class="iconfont icon-liebiaoxunhuan" v-show="playType==0"></span>
          <span class="iconfont icon-danquxunhuan" v-show="playType==1"></span>
          <span class="iconfont icon-suijibofang" v-show="playType==2"></span>
        </span>
        <span class="iconfont icon-shangyishoushangyige" @click="prev"></span>
        <span class="iconfont icon-bofang1" v-show="!playing" @click="play"></span>
        <span class="iconfont icon-zanting" v-show="playing" @click="play"></span>
        <span class="iconfont icon-xiayigexiayishou" @click="next"></span>
        <span class="iconfont icon-yinle"></span>
      </div>
      <div class="progress">
        <span>00:00</span>
        <span class="pro-bar"></span>
        <span>{{playTime(songDetail.dt)}}</span>
      </div>
    </div>
    <div class="aplayer-right">
      <span class="iconfont icon-bofangliebiao" @click="drawer = true"></span>
      <el-drawer
        v-model="drawer"
        :show-close="false"
        :with-header="false"
      >
        <div class="drawer-header">
          <h3>当前播放</h3>
          <div class="header-info">
            <div>总 {{$store.state.songId.length}} 首</div>
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
          <el-table-column prop="name" label="歌曲" :show-overflow-tooltip="true">
            <template v-slot:default="scope">
              <span class="singer">{{ scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ar" label="歌手" :show-overflow-tooltip="true">
            <template v-slot:default="scope">
              <span class="singer" v-for="item in scope.row.ar" :key="item" @click="singerClick(item.id)">{{ item.name }} &nbsp;</span>
            </template>
          </el-table-column>
          <el-table-column prop="al.name" label="专辑" :show-overflow-tooltip="true">
            <template v-slot:default="scope">
              <span class="singer" @click="albumClick(scope.row.al.id)">{{ scope.row.al.name}}</span>
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
  </div>
</template>

<script>
import { getSongURL } from "network/songdetail";
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
      audio: '',
      playing: false, // 播放状态
      songURL: '', //音乐url
      songId: '', //音乐id
      songDetail: {}, //音乐详情
      tableData: [], //音乐列表数据
      picUrl: '', //音乐图片
      index: 0, //当前音乐的index
      playType: 0, //播放类型: 0-列表循环，1-单曲循环，2-随机播放
    }
  },
  created() {
  },
  mounted() {
    this.audio = document.getElementById('audio')
    this.songId = this.$store.state.songId[0]
    this.getSongURL()
    this.songDetail = this.$store.state.songDetail[0]
    this.tableData = this.$store.state.songDetail
    this.picUrl = this.$store.state.songDetail[0].al.picUrl
  },
  beforeUpdate() {
    
  },
  updated() {
    this.tableData = this.$store.state.songDetail
  },
  watch : {

  },
  methods: {
    // 获取音乐url
    getSongURL() {
      getSongURL(this.songId).then(res => {
        // console.log(res);
        this.songURL = res.data.data[0].url
      })
    },
    // 歌曲时长处理函数
    playTime(dt) {
      return formatDuration(dt);
    },
    // 歌手点击跳转
    singerClick(id) {
      // console.log(id);
      this.$router.push({
        path: "/singerDetail",
        query: {
          id
        },
      });
    },
    // 专辑点击跳转
    albumClick(id) {
      // console.log('---');
      this.$router.push({
        path: "/albumDetail",
        query: {
          id
        },
      })
    },
    // 清空列表
    removeClick() {
      this.$store.commit('remove')
      this.tableData = []
      // this.songId = []
      // this.songDetail = {}
      // this.picUrl = []
      // this.index = 0
    },
    // 播放暂停
    play() {
      if(this.playing) {
        this.playing = false
        this.audio.pause()
      } else {
        this.playing = true
        this.audio.play()
      }
    },
    // 上一首
    prev() {
      if (this.$store.state.songId.length) {
        this.index--
        if (this.index < 0) {
          this.index = this.$store.state.songId.length-1
          this.songId = this.$store.state.songId[this.index]
          this.getSongURL()
          this.songDetail = this.$store.state.songDetail[this.index]
          this.picUrl = this.$store.state.songDetail[this.index].al.picUrl
          this.audio.play()
          this.playing = true
        } else {
          this.songId = this.$store.state.songId[this.index]
          this.getSongURL()
          this.songDetail = this.$store.state.songDetail[this.index]
          this.picUrl = this.$store.state.songDetail[this.index].al.picUrl
          this.audio.play()
          this.playing = true
        }
      }
    },
    // // 下一首
    next() {
      if (this.$store.state.songId.length) {
        this.index++
        if (this.index == this.$store.state.songId.length) {
          this.index = 0
          this.songId = this.$store.state.songId[this.index]
          this.getSongURL()
          this.songDetail = this.$store.state.songDetail[this.index]
          this.picUrl = this.$store.state.songDetail[this.index].al.picUrl
          this.audio.play()
          this.playing = true
        } else {
          this.songId = this.$store.state.songId[this.index]
          this.getSongURL()
          this.songDetail = this.$store.state.songDetail[this.index]
          this.picUrl = this.$store.state.songDetail[this.index].al.picUrl
          this.audio.play()
          this.playing = true
        }
      }
    },
    // 播放类型切换
    playTypeClick() {
      this.playType = this.playType+1 > 2 ? 0 : this.playType+1;
    }
  },
};
</script>

<style lang="less" scoped>
.el-table .success-row {
    background: #f0f9eb;
  }
.aplayer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  // background-color: #fff;
  height: 70px;
  box-shadow: 0 -1px 1px #aaa;
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
      margin: 5px auto;
      font-size: 12px;
      span {
        margin: 0 3px;
      }
      .pro-bar {
        display: inline-block;
        width: 60%;
        height: 3px;
        margin-bottom: 2px;
        background-color: #ccc;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          background-color: #aaa;
        }
      }
    }
  }
}
.aplayer-left .left-img img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
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
</style>