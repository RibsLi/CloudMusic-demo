<template>
  <div class="album">
    <songs-list>
      <songs-list-item v-for="item in albumData" :key="item" :list="item" />
    </songs-list>
  </div>
</template>

<script>
import { SongsList, SongsListItem } from "components/songsList";
export default {
  name: "Album",
  props: {
    albumData: {
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

<style scoped>

</style>