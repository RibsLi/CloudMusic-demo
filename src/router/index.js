import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import("components/home/Home");
const Discovery = () => import("views/discovery/Discovery");
const Recommend = () => import("views/recommend/Recommend");
const Songs = () => import("views/songs/Songs");
const MVS = () => import("views/mvs/MVS");
const Leaderboard = () => import("views/leaderboard/Leaderboard");
const Singer = () => import("views/singer/Singer");
const MySongs = () => import("views/mySongs/MySongs");
const MyCollect = () => import("views/myCollect/MyCollect");
const Detail = () => import("components/detail/Detail")

const routes = [
  {
    path: "",
    redirect: '/home'
  },
  {
    path: "/home",
    component: Home,
    children: [
      { path: "", redirect: "/discovery" },
      { path: "/discovery", component: Discovery },
      { path: "/recommend", component: Recommend },
      { path: "/songs", component: Songs },
      { path: "/mvs", component: MVS },
      { path: "/leaderboard", component: Leaderboard },
      { path: "/singer", component: Singer },
      { path: "/mySongs", component: MySongs },
      { path: "/myCollect", component: MyCollect },
      { path: "/detail", component: Detail },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
