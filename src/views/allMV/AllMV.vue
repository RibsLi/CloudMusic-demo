<template>
  <div class="all-mv">
    <div class="title">全部MV</div>
    <div class="cate-list">
      地区：
      <span
        v-for="(item, index) in cateList.area"
        :key="index"
        :class="{ active: mvParams.area == item }"
        @click="cateClick(item, mvParams.type, mvParams.order)"
        >{{ item }}</span
      >
    </div>
    <div class="cate-list">
      类型：
      <span
        v-for="(item, index) in cateList.type"
        :key="index"
        :class="{ active: mvParams.type == item }"
        @click="cateClick(mvParams.area, item, mvParams.order)"
        >{{ item }}</span
      >
    </div>
    <div class="cate-list">
      排序：
      <span
        v-for="(item, index) in cateList.order"
        :key="index"
        :class="{ active: mvParams.order == item }"
        @click="cateClick(mvParams.area, mvParams.type, item)"
        >{{ item }}</span
      >
    </div>
    <songs-list>
      <songs-list-item v-for="item in allMV" :key="item" :list="item" />
    </songs-list>
    <!-- 分页 -->
    <el-pagination
      background
      hide-on-single-page
      :current-page="mvParams.pagenum"
      :page-size="mvParams.limit"
      layout="prev, pager, next"
      :total="mvParams.total"
      @current-change="comCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
import { getAllMV } from "network/mv";
export default {
  name: "AllMV",
  data() {
    return {
      cateList: {
        area: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
        type: ["全部", "官方版", "原生", "现场版", "网易出品"],
        order: ["上升最快", "最热", "最新"],
      },
      currentItem: "全部",
      mvParams: {
        area: "全部",
        type: "全部",
        order: "最热",
        limit: 24,
        offset: 0,
        total: 1000,
        pagenum: 1,
      },
      allMV: []
    };
  },
  components: {
    SongsList,
    SongsListItem
  },
  created() {
    this.getAllMV();
  },
  methods: {
    // 菜单点击事件
    cateClick(area, type, order) {
      this.mvParams.offset = 0;
      this.mvParams.pagenum = 1;
      this.mvParams.area = area;
      this.mvParams.type = type;
      this.mvParams.order = order;
      this.getAllMV()
    },
    // 请求所有mv
    getAllMV() {
      getAllMV(this.mvParams).then((res) => {
        // console.log(res);
        this.allMV = res.data.data
      });
    },
    // 分页点击事件
    comCurrentChange(newPage) {
      this.mvParams.pagenum = newPage
      this.mvParams.offset = (newPage - 1) * this.mvParams.limit;
      this.getAllMV();
    },
  },
};
</script>

<style lang="less" scoped>
.slide-item {
  width: 415px;
}
.title {
  line-height: 40px;
  font-weight: 600;
}
.cate-list {
  line-height: 25px;
  font-size: 14px;
  margin: 5px 0;
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