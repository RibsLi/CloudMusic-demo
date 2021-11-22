<template>
  <div class="singer">
    <div class="title">热门歌手</div>
    <div class="cate-list">
      语种：
      <span
        v-for="(item, index) in cateList.area"
        :key="index"
        :class="{ active: singerParams.area == item.id }"
        @click="cateClick(item.id, singerParams.type, singerParams.initial)"
        >{{ item.name }}</span
      >
    </div>
    <div class="cate-list">
      分类：
      <span
        v-for="(item, index) in cateList.type"
        :key="index"
        :class="{ active: singerParams.type == item.id }"
        @click="cateClick(singerParams.area, item.id, singerParams.initial)"
        >{{ item.name }}</span
      >
    </div>
    <div class="cate-list">
      <div class="filter">筛选：</div>
      <div>
        <span :class="{ active: singerParams.initial == -1 }" @click="cateClick(singerParams.area, singerParams.type, -1)">热门</span>
      <span
        v-for="(item, index) in cateList.initial"
        :key="index"
        :class="{ active: singerParams.initial == item }"
        @click="cateClick(singerParams.area, singerParams.type, item)"
        >{{ item }}</span
      >
      <span :class="{ active: singerParams.initial == 0 }" @click="cateClick(singerParams.area, singerParams.type, 0)">#</span>
      </div>
    </div>
    <songs-list>
      <songs-list-item v-for="item in singer" :key="item" :list="item" />
    </songs-list>
    <!-- 分页 -->
    <el-pagination
      background
      hide-on-single-page
      :current-page="singerParams.pagenum"
      :page-size="singerParams.limit"
      layout="prev, pager, next"
      :total="singerParams.total"
      @current-change="comCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
import { getArtist } from "network/singer"

export default {
  name: "Singer",
  data() {
    return {
      cateList: {
        area: [
          {name: '全部', id: -1},
          {name: '华语', id: 7},
          {name: '欧美', id: 96},
          {name: '日本', id: 8},
          {name: '韩国', id: 16},
          {name: '其他', id: 0}
        ],
        type:[
          {name: '全部', id: -1},
          {name: '男歌手', id: 1},
          {name: '女歌手', id: 2},
          {name: '乐队组合', id: 3}
        ],
        initial: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
      },
      singerParams: {
        area: "-1",
        type: "-1",
        initial: "-1",
        limit: 24,
        offset: 0,
        total: 950,
        pagenum: 1,
      },
      singer: []
    };
  },
  components: {
    SongsList,
    SongsListItem
  },
  created() {
    this.getArtist()
  },
  methods: {
    // 菜单点击事件
    cateClick(area, type, initial) {
      this.singerParams.offset = 0;
      this.singerParams.pagenum = 1;
      this.singerParams.area = area;
      this.singerParams.type = type;
      this.singerParams.initial = initial;
      this.getArtist()
    },
    // 获取所有歌手
    getArtist() {
      getArtist(this.singerParams).then(res => {
        // console.log(res);
        this.singer = res.data.artists
      })
    },
    // 分页点击事件
    comCurrentChange(newPage) {
      this.singerParams.pagenum = newPage
      this.singerParams.offset = (newPage - 1) * this.singerParams.limit;
        this.getArtist()
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  line-height: 40px;
  font-weight: 600;
}
.cate-list {
  display: flex;
  line-height: 25px;
  font-size: 14px;
  margin: 5px 0;
  .filter {
    min-width: 42px;
  }
  span {
    display: inline-block;
    width: 70px;
    text-align: center;
    margin: 0 10px;
    color: #aaa;
    border-radius: 20px;
    cursor: pointer;
    &:hover {
      color: #ff0000;
    }
  }
}
.active {
  background-color: rgba(255, 0, 0, 0.7);
  // border: 1px solid #eee;
  color: #fff !important;
}
</style>