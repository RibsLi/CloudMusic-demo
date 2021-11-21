<template>
  <div class="new-mv">
    <songs-list>
      <template v-slot:top-left>
        <div class="title" @click="titleClick">
          最新MV <i class="el-icon-arrow-right"></i>
        </div>
      </template>
      <template v-slot:top-more>
        <ul class="cate-left">
          <li
            v-for="(item, index) in cateList"
            :key="index"
            :class="{ catactive: cateIndex == index }"
            @click="cateClick(item, index)"
          >
            {{ item.area }}
          </li>
        </ul>
      </template>
      <songs-list-item v-for="item in newMV" :key="item" :list="item" />
    </songs-list>
    <songs-list>
      <template v-slot:top-left>
        <div class="title" @click="titleClick">
          网易出品 <i class="el-icon-arrow-right"></i>
        </div>
      </template>
      <songs-list-item v-for="item in rcmd" :key="item" :list="item" />
    </songs-list>
    <songs-list>
      <template v-slot:top-left>
        <div class="title" @click="topTitleClick">
          MV排行榜 <i class="el-icon-arrow-right"></i>
        </div>
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
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
import { getNewMV, getRcmd, getTopMV } from "network/mv";
export default {
  name: "NewMV",
  data() {
    return {
      mvParams: {
        area: "内地",
        limit: 12,
      },
      cateIndex: 0,
      cateList: [
        { area: "内地" },
        { area: "港台" },
        { area: "欧美" },
        { area: "日本" },
        { area: "韩国" },
      ],
      newMV: [],
      rcmdParams: {
        limit: 12,
      },
      rcmd: [],
      topParams: {
        area: "内地",
        limit: 12,
      },
      topIndex: 0,
      topData: [],
    };
  },
  components: {
    SongsList,
    SongsListItem,
  },
  created() {
    this.getNewMV();
    this.getRcmd();
    this.getTopMV();
  },
  methods: {
    // 菜单列表点击事件
    cateClick(item, index) {
      this.cateIndex = index;
      this.mvParams.area = item.area;
      this.getNewMV();
    },
    // 请求最新mv
    getNewMV() {
      getNewMV(this.mvParams).then((res) => {
        // console.log(res);
        this.newMV = res.data.data;
      });
    },
    // 请求网易mv
    getRcmd() {
      getRcmd(this.rcmdParams).then((res) => {
        // console.log(res);
        this.rcmd = res.data.data;
        res.data.data.forEach((item) => {
          item.artists = "";
        });
      });
    },
    // mv排行榜
    getTopMV() {
      getTopMV(this.topParams).then((res) => {
        // console.log(res);
        this.topData = res.data.data;
      });
    },
    // 排行榜菜单点击事件
    topClick(item, index) {
      this.topIndex = index;
      this.topParams.area = item.area;
      this.getTopMV();
    },
    titleClick() {
      this.$router.push("/allMV");
    },
    topTitleClick() {
      this.$router.push("/topMV")
    }
  },
};
</script>

<style lang="less" scoped>
.slide-item {
  width: 415px;
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
.title {
  cursor: pointer;
}
</style>