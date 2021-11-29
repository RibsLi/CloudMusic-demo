<template>
  <div class="input-detail">
    <el-input
      size="small"
      v-model="keywords"
      :placeholder="realkeyword"
      prefix-icon="iconfont icon-sousuo"
      @change="searchClick"
      @focus="showQuery"
      @blur="noQuery"
    />
    <div class="input-query" v-show="isQuery">
      <el-scrollbar>
        <h4>热搜榜</h4>
        <div
          class="query-box"
          v-for="(item, index) in hotSearch"
          :key="index"
          @click="hotSearchClick(item)"
        >
          <div class="query-index" :style="index < 3 ? 'color: #ff0000' : ''">
            {{ index + 1 }}
          </div>
          <div class="box-right">
            <div class="searchWord">
              {{ item.searchWord }}<span>{{ item.score }}</span>
            </div>
            <div class="content">{{ item.content }}</div>
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div class="input-query" v-show="isSuggest">
      <el-scrollbar>
        <h4>
          搜 <span style="color: #409eff"> {{ keywords }} </span> 相关的结果
        </h4>
        <div v-show="songs">
          <div class="sug-title">
            <span class="iconfont icon-yinle"></span> 单曲
          </div>
          <ul class="sug-ul">
            <li v-for="item in songs" :key="item" @click="songClick(item.id)">
              {{ item.name }}
              <i>{{ item.alias[0] }}</i>
              -
              <span v-for="item in item.artists" :key="item"
                >{{ item.name }} &nbsp;</span
              >
            </li>
          </ul>
        </div>
        <div v-show="artists">
          <div class="sug-title">
            <span class="iconfont icon-geshou"></span> 歌手
          </div>
          <ul class="sug-ul">
            <li
              v-for="item in artists"
              :key="item"
              @click="singerClick(item.id)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div v-show="albums">
          <div class="sug-title">
            <span class="iconfont icon-zhuanji"></span> 专辑
          </div>
          <ul class="sug-ul">
            <li v-for="item in albums" :key="item" @click="albumClick(item.id)">
              {{ item.name }} - {{ item.artist.name }}
            </li>
          </ul>
        </div>
        <div v-show="playlists">
          <div class="sug-title">
            <span class="iconfont icon-dingdan"></span> 歌单
          </div>
          <ul class="sug-ul">
            <li
              v-for="item in playlists"
              :key="item"
              @click="playlistClick(item.id)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import {
  getSearch,
  getDefSearch,
  getHotSearch,
  getSuggest,
} from "network/search";
import { getSongDetail } from "network/songdetail";
export default {
  name: "InputDetail",
  data() {
    return {
      keywords: "",
      limit: 100,
      type: 1,
      offset: 0,
      hotSearch: [],
      realkeyword: "",
      isQuery: false,
      isSuggest: false,
      serachData: [],
      artistsData: [],
      albums: null,
      artists: null,
      playlists: null,
      songs: null,
    };
  },
  watch: {
    keywords(val) {
      this.isQuery = false;
      this.isSuggest = true;
      this.getSuggest();
      this.$store.commit("serachData", this.serachData);
      this.$store.commit("keywords", val);
      // console.log(this.$store.state.keywords);
    },
  },
  created() {
    this.getDefSearch();
    this.getHotSearch();
  },
  methods: {
    // 搜索
    searchClick() {
      this.isQuery = false;
      if (this.keywords) {
        getSearch(this.keywords, this.limit, this.type, this.offset).then(
          (res) => {
            // console.log(res);
            if (res.data.code === 200) {
              this.serachData = res.data.result.songs;
              this.$store.commit("serachData", res.data.result.songs);
              this.$router.push("/searchDetail");
            }
          }
        );
      }
    },
    // 默认搜索关键词
    getDefSearch() {
      getDefSearch().then((res) => {
        // console.log(res);
        this.realkeyword = res.data.data.realkeyword;
      });
    },
    // 请求热搜列表
    getHotSearch() {
      getHotSearch().then((res) => {
        // console.log(res);
        this.hotSearch = res.data.data;
      });
    },
    // 热搜列表的展示
    showQuery() {
      if (this.keywords) {
        this.isQuery = false;
        this.isSuggest = true;
      } else {
        this.isQuery = true;
        this.isSuggest = false;
      }
    },
    noQuery() {
      setTimeout(() => {
        this.isQuery = false;
        this.isSuggest = false;
      }, 200);
    },
    // 热搜列表点击事件
    hotSearchClick(item) {
      this.keywords = item.searchWord;
      this.searchClick();
      this.isQuery = false;
    },
    // 搜索建议
    getSuggest() {
      getSuggest(this.keywords).then((res) => {
        // console.log(res);
        if (res.data.code === 200) {
          this.albums = res.data.result.albums;
          this.artists = res.data.result.artists;
          this.playlists = res.data.result.playlists;
          this.songs = res.data.result.songs;
        }
      });
    },
    //获取单首音乐
    songClick(id) {
      getSongDetail(id).then((res) => {
        // console.log(res);
        this.$store.commit("addSongDetail", res.data.songs);
      });
    },
    // 歌手跳转
    singerClick(id) {
      // console.log(id);
      this.$router.push({
        path: "/singerDetail",
        query: {
          id,
        },
      });
    },
    // 专辑跳转
    albumClick(id) {
      // console.log('---');
      this.$router.push({
        path: "/albumDetail",
        query: {
          id,
        },
      });
    },
    // 歌单跳转
    playlistClick(id) {
      this.$router.push({
        path: "/songDetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.input-query {
  position: absolute;
  top: 34px;
  left: 0;
  z-index: 9;
  width: 350px;
  height: 400px;
  font-size: 14px;
  border-radius: 5px;
  box-shadow: 0 0 2px #eee;
  background-color: #fff;
  color: #aaa;
  h4 {
    line-height: 40px;
    margin-left: 20px;
  }
  .query-box {
    display: flex;
    align-items: center;
    line-height: 20px;
    margin: 10px 0;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
    .query-index {
      margin-left: 20px;
    }
    .box-right {
      margin: 5px 10px 5px 20px;
      .searchWord {
        font-weight: 500;
        color: #000;
        span {
          color: #aaa;
          font-weight: normal;
          margin-left: 10px;
          font-size: 12px;
        }
      }
      .content {
        width: 300px;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.sug-title {
  line-height: 30px;
  background-color: #eee;
  color: rgb(80, 77, 77);
  padding-left: 20px;
  span {
    margin-right: 10px;
  }
}
.sug-ul {
  li {
    padding-left: 35px;
    line-height: 30px;
    color: rgb(80, 77, 77);
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
    i {
      font-size: 12px;
      color: #aaa;
    }
  }
}
.iconfont {
  margin-right: 5px;
}
</style>