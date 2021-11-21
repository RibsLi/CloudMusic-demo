<template>
  <div class="exclusive">
    <songs-list>
      <template v-slot:top-left> 独家放送 </template>
      <songs-list-item v-for="item in perData" :key="item" :list="item" />
    </songs-list>
    <!-- 分页 -->
    <el-pagination
      background
      hide-on-single-page
      :current-page="perParams.pagenum"
      :page-size="perParams.limit"
      layout="prev, pager, next"
      :total="1000"
      @current-change="comCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
import { getPersonalized } from "network/discovery";
import { SongsList, SongsListItem } from "components/songsList";
export default {
  name: "Exclusive",
  data() {
    return {
      perParams: {
        limit: 48,
        offset: 0,
        pagenum: 1,
      },
      perData: [],
      total: 0
    };
  },
  components: {
    SongsList,
    SongsListItem,
  },
  created() {
    this.getPersonalized()
  },
  methods: {
    getPersonalized() {
      getPersonalized(this.perParams).then((res) => {
      // console.log(res);
      this.perData = res.data.result;
      // this.total = res.data
    });
    },
    comCurrentChange(newPage) {
      this.perParams.pagenum = newPage
      this.perParams.offset = (newPage - 1) * this.perParams.limit;
      this.getPersonalized();
    },
  },
};
</script>

<style lang="less" scoped>
.slide-item {
  width: 415px;
}
.slide {
  margin-top: 0;
  border-top: 0;
}
</style>