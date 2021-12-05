<template>
  <div class="my-songs">
    <div class="hint" v-if="!userId">您还没有登录哦，先去登录吧</div>
    <div class="hint" v-else-if="!uPlaylist.length">还没有歌单哦，快去收藏你喜欢的歌单吧</div>
    <el-button type="primary" size="small" @click="creatClick">创建歌单</el-button>
    <div class="like-songs" v-for="item in likeSongs" :key="item">
      <img :src="item.coverImgUrl" alt="" @click="itemClick(item.id)" />
      <span
        class="iconfont icon-bofang1 play-like"
        @click="playMusic"
      ></span>
      <div class="name">{{ item.name}}</div>
    </div>
    <songs-list>
      <songs-list-item v-for="item in uPlaylist" :key="item" :list="item" />
    </songs-list>
    <!-- 创建歌单对话框 -->
    <el-dialog
      v-model="playlistDialog"
      width="50%"
      @close="resetForm"
    >
      <!-- 对话框内容 -->
      <el-form
        ref="createPlaylist"
        :model="createPlaylist"
        :rules="rules"
        status-icon
      >
        <el-form-item label="歌单名" prop="name">
          <el-input v-model="createPlaylist.name"></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="playlistDialog = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
import { getUserPlaylist, getCreate } from "network/user";
import {
  getPlaylistDetailCookie,
  getSongDetail,
} from "network/songdetail";
export default {
  name: "MySongs",
  data() {
    return {
      uid: window.sessionStorage.getItem('userId'),
      cookie: window.sessionStorage.getItem('cookie'),
      limit: 30,
      offset: 0,
      pagenum: 1,
      likeSongs: [],
      uPlaylist: [],
      createPlaylist: {
        name: '',
        cookie: window.sessionStorage.getItem('cookie'),
      },
      playlistDialog: false,
      rules: {
        name: [{
          required: true,
          message: "请输入歌单名",
          trigger: "blur",
        }]
      }
    };
  },
  components: {
    SongsList,
    SongsListItem
  },
  computed: {
    userId() {
      return window.sessionStorage.getItem('userId')
    }
  },
  watch: {
    uid() {
      this.getUserPlaylist();
    }
  },
  created() {
    if (window.sessionStorage.getItem('userId')) {
      this.getUserPlaylist();
    } else {
      return this.$message.warning("您还没有登录，先去登录吧");
    }
  },
  methods: {
    // 获取收藏的歌单
    getUserPlaylist() {
      getUserPlaylist(this.uid, this.limit, this.offset).then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
          this.likeSongs = res.data.playlist.slice(0, 1)
          this.uPlaylist = res.data.playlist.slice(1, res.data.playlist.length);
        }
      });
    },
    itemClick(id) {
      this.$router.push({
        path: "/myLike",
        query: {
          id
        },
      });
    },
    playMusic() {
      getPlaylistDetailCookie(this.likeSongs[0].id, this.cookie).then((res) => {
        // console.log(res);
        const trackIds = [];
        res.data.playlist.trackIds.forEach((item) => {
          trackIds.push(item.id);
        });
        getSongDetail(trackIds).then((res) => {
          // console.log(res);
          this.$store.commit("subSongDetail", res.data.songs);
        });
      });
    },
    // 新建歌单
    creatClick() {
      this.playlistDialog = true
    },
    // 新建歌单提交事件
    submitForm() {
      this.$refs.createPlaylist.validate((valid) => {
        if (valid) {
          getCreate(this.createPlaylist).then((res) => {
            // console.log(res);
            if (res.data.code === 200) {
              this.playlistDialog = false
              this.getUserPlaylist();
              return this.$message.success("用户添加成功");
            }
          });
        }
      });
    },
    // 新建歌单重置事件
    resetForm() {
      this.$refs.createPlaylist.resetFields();
    }
  },
};
</script>

<style lang="less" scoped>
.slide {
  margin-top: 0;
  border-top: none
}
.hint {
  color: #aaa;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
}
.like-songs {
  width: 200px;
  margin: 15px 0 10px;
  position: relative;
  &:hover .play-like {
    color: #ff0000;
  }
  img {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 3px;
    cursor: pointer;
  }
  .play-like {
    position: absolute;
    top: 160px;
    right: 10px;
    font-size: 30px;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
  }
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    line-height: 16px;
  }
}
@media screen and (max-width: 414px) {
  .like-songs {
    width: 160px;
    img {
      height: 160px;
    }
    .play-like {
      top: 120px;
      right: 10px;
    }
  }
}
</style>