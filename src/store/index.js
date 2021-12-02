import { createStore } from "vuex";

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default createStore({
  state: {
    // songId: ['1891469546'],
    songDetail: [
      {
        id: "448596416",
        name: "At The Edge",
        ar: [
          {
            id: 12138261,
            name: "千坂",
          },
        ],
        dt: "200644",
        al: {
          id: 35072236,
          name: "At The Edge",
          picUrl:
            "https://p2.music.126.net/j0kTkSQDEn3MksdJ3S3BSQ==/109951163825143640.jpg",
        },
      },
    ],
    serachData: [],
    keywords: {},
    // 登录的用户信息
    profile: ''
  },
  mutations,
  actions,
  getters,
  modules: {},
});
