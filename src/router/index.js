import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import("components/home/Home");
const Discovery = () => import("views/discovery/Discovery");
const Recommends = () => import("views/recommends/Recommends");
const NewSongs = () => import("views/newSongs/NewSongs");
const NewMV = () => import("views/newMV/NewMV");
const Leaderboard = () => import("views/leaderboard/Leaderboard");
const Singer = () => import("views/singer/Singer");
const MySongs = () => import("views/mySongs/MySongs");
const MyCollect = () => import("views/myCollect/MyCollect");
const SongDetail = () => import("components/songDetail/SongDetail")
const Exclusive = () => import("views/exclusive/Exclusive")
const AllMV = () => import("views/allMV/AllMV")
const TopMV = () => import("views/topMV/TopMV")
const SingerDetail = () => import("components/singerDetail/SingerDetail")
const MVDetail = () => import("components/mvDetail/MVDetail")


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
      { path: "/recommends", component: Recommends },
      { path: "/newSongs", component: NewSongs },
      { path: "/newMV", component: NewMV },
      { path: "/leaderboard", component: Leaderboard },
      { path: "/singer", component: Singer },
      { path: "/mySongs", component: MySongs },
      { path: "/myCollect", component: MyCollect },
      { path: "/songDetail", component: SongDetail },
      { path: "/exclusive", component: Exclusive },
      { path: "/allMV", component: AllMV },
      { path: "/topMV", component: TopMV },
      { path: "/singerDetail", component: SingerDetail },
      { path: "/mvDetail", component: MVDetail },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
