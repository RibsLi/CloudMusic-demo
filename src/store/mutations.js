export default {
  // addSongId(state, payload) {
  //   state.songId.push(...payload);
  // },
  addSongDetail(state, payload) {
    // console.log(payload);
    state.songDetail.push(...payload)
  },
  subSongDetail(state, payload) {
    state.songDetail = payload
  },
  remove(state) {
    // state.songId = []
    state.songDetail = []
  },
  serachData(state, payload) {
    state.serachData = payload
  },
  keywords(state,payload) {
    state.keywords = payload
  },
  // addSong(state, payload) {
  //   if(payload.length > 1) {
  //     state.songs.push(...payload)
  //   } else {
  //     state.songs.push(...payload)
  //   }
  // }
};
