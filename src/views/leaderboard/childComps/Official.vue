<template>
  <div class="official">
    <div class="title">官方榜</div>
    <div class="lea-box" v-for="(item, index) in toplist" :key="index">
      <div class="lea-left">
        <img :src="item.coverImgUrl" alt="" @click="allClick(item.id)" />
        <span class="updata">{{ item.updateFrequency }}</span>
        <span class="iconfont icon-bofang1 play" @click="playMusic(item.id)"></span>
      </div>
      <div class="lea-right">
        <ul>
          <li v-for="(item, index) in topSong[index]" :key="index" @dblclick="dblclick(item.id)">
            <span class="singer" @click="dblclick(item.id)">
              <i class="index" :style="index < 3 ? 'color: #ff0000' : ''">{{
                index + 1
              }}</i>
              {{ item.name }}
              <i class="alia">{{ item.alia[0] }}</i>
            </span>
            <span>
              <span class="singer" v-for="item in item.ar" :key="item" @click="singerClick(item.id)">{{ item.name }} &nbsp;</span>
            </span>
          </li>
        </ul>
        <div class="all" @click="allClick(item.id)">
          查看全部 <i class="el-icon-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Official",
  props: {
    toplist: {
      type: Array,
      default() {
        return [];
      },
    },
    topSong: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    // 查看全部点击事件
    allClick(id) {
      this.$router.push({
        path: "/songDetail",
        query: {
          id,
        },
      });
    },
    singerClick(id) {
      // console.log(id);
      this.$router.push({
        path: "/singerDetail",
        query: {
          id
        },
      });
    },
    playMusic(id) {
      this.$emit('songsClick', id)
    },
    dblclick(id) {
      this.$emit('songClick', id)
    }
  },
};
</script>

<style lang="less" scoped>
.title {
  line-height: 40px;
  font-weight: 600;
}
.lea-box {
  display: flex;
  font-size: 14px;
  margin: 10px 0 20px 0;
  .lea-left {
    position: relative;
    &:hover .play {
      display: block;
    }
    img {
      width: 200px;
      height: 200px;
      border-radius: 5px;
      margin-right: 30px;
      vertical-align: middle;
      cursor: pointer;
    }
    .updata {
      position: absolute;
      bottom: 50px;
      left: 100px;
      transform: translateX(-50%);
      color: #fff;
    }
    .play {
      display: none;
      position: absolute;
      top: 100px;
      left: 100px;
      transform: translate(-50%, -50%);
      font-size: 50px;
      color: #ff0000;
      cursor: pointer;
    }
  }
  .lea-right {
    width: 100%;
    line-height: 33px;
    color: #555;
    li {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      border-radius: 5px;
      &:nth-child(2n-1) {
        background-color: #eee;
      }
      &:hover {
        background-color: #ddd;
      }
      .index {
        margin-right: 10px;
      }
      .alia {
        color: #aaa;
        font-size: 12px;
        margin-left: 3px;
      }
    }
    .all {
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        color: #ff0000;
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