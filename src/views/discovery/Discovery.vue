<template>
  <div class="discovery">
    <banner :banners="banners"/>
  </div>
</template>

<script>
import {getBanners} from 'network/discovery'

import Banner from './children/Banner'

export default {
  name: "Discovery",
  data() {
    return {
      banners: []
    }
  },
  components: {
    Banner
  },
  created() {
    getBanners().then(res => {
      console.log(res);
      this.banners = res.data.banners
    })    
  },
}
</script>

<style scoped>
.discovery {
  
}
</style>