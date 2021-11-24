<template>
  <div class="top-mv">
    <songs-list>
      <template v-slot:top-left>
        MV排行榜 
      </template>
      <template v-slot:top-more>
        <ul class="cate-left">
          <li
            v-for="(item, index) in cateList"
            :key="index"
            :class="{ catactive: topIndex == index }"
            @click="topClick(item, index)"
          >
            {{ item.area }}
          </li>
        </ul>
      </template>
      <songs-list-item v-for="item in topData" :key="item" :list="item" />
    </songs-list>
    <!-- 分页 -->
    <el-pagination
      background
      hide-on-single-page
      :current-page="topParams.pagenum"
      :page-size="topParams.limit"
      layout="prev, pager, next"
      :total="topParams.total"
      @current-change="comCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
import { getTopMV } from "network/mv";
export default {
  name: "TopMV",
  data() {
    return {
      cateList: [
        { area: "内地" },
        { area: "港台" },
        { area: "欧美" },
        { area: "日本" },
        { area: "韩国" },
      ],
      topParams: {
        area: "内地",
        limit: 24,
        offset: 0,
        total: 50,
        pagenum: 1,
      },
      topIndex: 0,
      topData: [],
    }
  },
  components: {
    SongsList,
    SongsListItem
  },
  created() {
    this.getTopMV();
  },
  methods: {
    // mv排行榜
    getTopMV() {
      getTopMV(this.topParams).then((res) => {
        // console.log(res)
        this.topData = res.data.data;
      });
    },
    // 排行榜菜单点击事件
    topClick(item, index) {
      this.topParams.offset = 0;
      this.topParams.pagenum = 1;
      this.topIndex = index;
      this.topParams.area = item.area;
      this.getTopMV();
    },
    // 分页点击事件
    comCurrentChange(newPage) {
      this.topParams.pagenum = newPage
      this.topParams.offset = (newPage - 1) * this.topParams.limit;
      this.getTopMV();
    },
  },
}
</script>

<style lang="less" scoped>
.slide-item {
  width: 415px;
}
.slide {
  margin-top: 0;
  border-top: 0;
}
.cate-left {
  display: flex;
  font-size: 14px;
  line-height: 30px;
  align-items: center;
  li {
    margin: 0 5px;
    color: #606266;
    padding: 0 10px;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
      color: #ff0000;
    }
  }
  .catactive {
    background-color: rgba(255, 0, 0, 0.7);
    color: #fff !important;
  }
}
</style>