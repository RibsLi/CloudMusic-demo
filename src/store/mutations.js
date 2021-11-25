export default {
  addSongId(state, payload) {
    state.songId.push(...payload);
  },
  addSongDetail(state, payload) {
    state.songDetail.push(...payload)
  },
  remove(state) {
    state.songId = []
    state.songDetail = []
  }
};
