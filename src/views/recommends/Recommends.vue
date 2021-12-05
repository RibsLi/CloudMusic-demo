<template>
  <div class="recommends">
    <div class="rec-header">
      <img :src="headerData.coverImgUrl" alt="" class="blur" />
      <div class="header-img">
        <img :src="headerData.coverImgUrl" alt="" />
      </div>
      <div class="header-info">
        <div class="info-title">
          <i class="iconfont icon-huangguan"></i>
          精品歌单
        </div>
        <div class="name">{{ headerData.name }}</div>
        <div class="copywriter">{{ headerData.copywriter }}</div>
      </div>
    </div>
    <div class="cate-box">
      <!-- 歌单分类列表对话框 -->
      <el-popover placement="bottom-start" :width="800" trigger="hover">
        <template #reference>
          <el-button round size="mini"
            >全部歌单<i class="el-icon-arrow-right"></i
          ></el-button>
        </template>
        <div class="category">
          <div class="category-item">
            <div class="item-left">
              <i class="iconfont icon-yuzhong"></i>
              <span>语种</span>
            </div>
            <div class="item-right">
              <span
                :class="{active:activeName==item.name}"
                v-for="(item, index) in language"
                :key="index"
                @click="cateClick(item)"
                >{{ item.name }}</span
              >
            </div>
          </div>
          <div class="category-item">
            <div class="item-left">
              <i class="iconfont icon-gangqin"></i>
              <span>风格</span>
            </div>
            <div class="item-right">
              <span
                :class="{active:activeName==item.name}"
                v-for="item in style"
                :key="item"
                @click="cateClick(item)"
                >{{ item.name }}</span
              >
            </div>
          </div>
          <div class="category-item">
            <div class="item-left">
              <i class="iconfont icon-kafei"></i>
              <span>场景</span>
            </div>
            <div class="item-right">
              <span
                :class="{active:activeName==item.name}"
                v-for="item in scenes"
                :key="item"
                @click="cateClick(item)"
                >{{ item.name }}</span
              >
            </div>
          </div>
          <div class="category-item">
            <div class="item-left">
              <i class="iconfont icon-qingganfenbu"></i>
              <span>情感</span>
            </div>
            <div class="item-right">
              <span
                :class="{active:activeName==item.name}"
                v-for="item in emotion"
                :key="item"
                @click="cateClick(item)"
                >{{ item.name }}</span
              >
            </div>
          </div>
          <div class="category-item">
            <div class="item-left">
              <i class="iconfont icon-zhuti"></i>
              <span>主题</span>
            </div>
            <div class="item-right">
              <span
                :class="{active:activeName==item.name}"
                v-for="item in theme"
                :key="item"
                @click="cateClick(item)"
                >{{ item.name }}</span
              >
            </div>
          </div>
        </div>
      </el-popover>
      <ul class="cate-ul">
        <li
          :class="{active:activeName==item.name}"
          v-for="item in cateList"
          :key="item.name"
          @click="cateClick(item)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <songs-list>
      <songs-list-item v-for="item in playlists" :key="item" :list="item" />
    </songs-list>
    <!-- 分页 -->
    <el-pagination
      background
      hide-on-single-page
      :current-page="params.pagenum"
      :page-size="params.limit"
      layout="prev, pager, next"
      :total="total"
      @current-change="comCurrentChange"
      :pager-count="5"
    ></el-pagination>
  </div>
</template>

<script>
import { getHighquality, getCatlist, getTopPlayList } from "network/recommends";
import { SongsList, SongsListItem } from "components/songsList";

export default {
  name: "Recommends",
  data() {
    return {
      params: {
        limit: 48,
        cat: "华语",
        order: "hot",
        offset: 0,
        pagenum: 1,
      },
      headerData: [],
      playlists: [],
      total: 0,
      categories: {},
      icon: [
        "icon-yuzhong",
        "icon-gangqin",
        "icon-kafei",
        "icon-qingganfenbu",
        "icon-zhuti",
      ],
      language: [],
      style: [],
      scenes: [],
      emotion: [],
      theme: [],
      cateList: [
        { name: "全部" },
        { name: "华语" },
        { name: "流行" },
        { name: "摇滚" },
        { name: "民谣" },
        { name: "电子" },
        { name: "另类/独立" },
        { name: "轻音乐" },
        { name: "综艺" },
        { name: "影视原声" },
        { name: "ACG" },
      ],
      activeName: "华语",
    };
  },
  components: {
    SongsList,
    SongsListItem,
  },
  created() {
    // 接收歌单详情头部tag标签点击后跳转过来的事件
    if (this.$route.query.cat) {
     this.params.cat = this.$route.query.cat
     this.activeName = this.$route.query.cat
     this.$route.query.cat = ''
    }
    // this.params.cat = this.$route.query.cat;
    this.getHighquality();
    this.getCatlist();
    this.getTopPlayList();
  },
  methods: {
    // 获取精品歌单
    getHighquality() {
      getHighquality(this.params).then((res) => {
        // console.log(res);
        this.headerData = res.data.playlists[0];
      });
    },
    // 获取歌单分类列表
    getCatlist() {
      getCatlist().then((res) => {
        // console.log(res);
        this.categories = res.data.categories;
        res.data.sub.forEach((item) => {
          if (item.category === 0) {
            this.language.push(item);
          } else if (item.category === 1) {
            this.style.push(item);
          } else if (item.category === 2) {
            this.scenes.push(item);
          } else if (item.category === 3) {
            this.emotion.push(item);
          } else if (item.category === 4) {
            this.theme.push(item);
          }
        });
      });
    },
    // 歌单点击事件
    cateClick(item) {
      // console.log(item);
      this.params.cat = item.name;
      this.params.offset = 0;
      this.params.pagenum = 1;
      this.getTopPlayList();
      this.getHighquality();
      this.activeName = item.name
    },
    // 获取歌单推荐列表
    getTopPlayList() {
      getTopPlayList(this.params).then((res) => {
        // console.log(res);
        this.playlists = res.data.playlists;
        this.total = res.data.total;
      });
    },
    // 页码改变时执行的事件
    comCurrentChange(newPage) {
      this.params.pagenum = newPage
      this.params.offset = (newPage - 1) * this.params.limit;
      this.getTopPlayList();
    },
  },
};
</script>

<style lang="less" scoped>
.recommends {
  position: relative;
  .rec-header {
    display: flex;
    align-items: center;
    position: relative;
    height: 200px;
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    .blur {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: -9;
      filter: blur(50px);
      transform: scale(1.1);
    }
    .header-img img {
      width: 160px;
      height: 160px;
      vertical-align: middle;
      margin: 0 20px;
      border-radius: 5px;
    }
    .header-info {
      line-height: 30px;
      .info-title {
        width: 110px;
        height: 30px;
        border-radius: 15px;
        text-align: center;
        color: #ffc063;
        border: 1px solid #ffc063;
        margin-bottom: 20px;
      }
      .name {
        font-weight: 700;
        color: #fff;
      }
      .copywriter {
        font-size: 14px;
        color: #C0C0C0;
      }
    }
  }
}
.cate-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  .cate-ul {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    li {
      margin: 0 5px;
      color: #606266;
      padding: 3px 10px;
      cursor: pointer;
      &:hover {
        color: #ff0000;
      }
    }
  }
}
.el-popover {
  .category {
    // background-color: #fff;
    // width: 800px;
    // border: 1px solid #ddd;
    // box-shadow: 0 0 2px #ccc;
    // padding: 10px;
    .category-item {
      line-height: 28px;
      font-size: 14px;
      .item-left {
        color: #ccc;
        display: flex;
        align-items: center;
        i {
          margin-right: 7px;
          font-size: 20px;
        }
      }
      .item-right {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        text-align: center;
        span {
          display: inline-block;
          width: 90px;
          margin: 5px;
          cursor: pointer;
          &:hover {
            color: #ff0000;
          }
        }
      }
    }
  }
}
.active {
  background-color: rgba(255, 0, 0, 0.7);
  border-radius: 10px;
  // border: 1px solid #eee;
  color: #fff !important;
}
.slide {
  margin-top: 0;
  border-top: 0;
}
@media screen and (max-width: 414px) {
  .cate-box {
    .cate-ul {
      margin-left: 10px;
      li {
        padding: 3px 8px;
        margin: 0;
        text-align: center;
      }
    }
    .el-button {
      padding: 5px 8px;
    }
  }
}
</style>