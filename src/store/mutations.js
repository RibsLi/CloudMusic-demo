export default {
  // addSongId(state, payload) {
  //   state.songId.push(...payload);
  // },
  addSongDetail(state, payload) {
    // console.log(payload);
    state.songDetail.push(...payload)
  },
  remove(state) {
    // state.songId = []
    state.songDetail = []
  },
  // addSong(state, payload) {
  //   if(payload.length > 1) {
  //     state.songs.push(...payload)
  //   } else {
  //     state.songs.push(...payload)
  //   }
  // }
};
