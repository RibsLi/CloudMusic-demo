export default {
  addSongId(context, payload) {
    return new Promise((resolve, reject) => {
      let oldId = context.state.songId.find(function(item) {
        return item.id == payload.id
      });
      if (!oldId) {
        context.commit("addSongId", payload);
        resolve();
        reject()
      }
      // else {
      //   payload.count = 1;
      //   context.commit("addToCart", payload);
      //   resolve();
      // }
    })
  },
  addSongDetail(context, payload) {
    return new Promise((resolve, reject) => {
      let oldDetail = context.state.songId.find(function(item) {
        return item.id === payload.id;
      });
      if (!oldDetail) {
        context.commit("addSongDetail", oldDetail);
        resolve();
        reject()
      }
      // else {
      //   payload.count = 1;
      //   context.commit("addToCart", payload);
      //   resolve();
      // }
    })
  }
};
