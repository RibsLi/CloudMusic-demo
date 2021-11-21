<template>
  <div class="global">
    <songs-list>
      <template v-slot:top-left> 全球榜 </template>
      <songs-list-item v-for="item in global" :key="item" :list="item" />
    </songs-list>
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
export default {
  name: "Global",
  props: {
    global: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    SongsList,
    SongsListItem
  }
}
</script>

<style lang="less" scoped>
</style>