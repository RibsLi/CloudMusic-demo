import { createStore } from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default createStore({
  state: {
    // songId: ['1891469546'],
    songDetail: [
      {
        id: '1891469546',
        name: '删了吧',
        ar: [{name: '烟(许佳豪)'}],
        dt: '204955',
        al: {picUrl: 'https://p2.music.126.net/nNg4YjkcK1AwCX1FrN8VOQ==/109951166578333625.jpg'}
      }
    ],
  },
  mutations,
  actions,
  getters,
  modules: {}
});
