import { createRouter, createWebHashHistory } from "vue-router";

const Home = () => import("components/home/Home");
const Discovery = () => import("views/discovery/Discovery");
const Recommends = () => import("views/recommends/Recommends");
const NewSongs = () => import("views/newSongs/NewSongs");
const MVS = () => import("views/mvs/MVS");
const Leaderboard = () => import("views/leaderboard/Leaderboard");
const Singer = () => import("views/singer/Singer");
const MySongs = () => import("views/mySongs/MySongs");
const MyCollect = () => import("views/myCollect/MyCollect");
const Detail = () => import("components/detail/Detail")
const Exclusive = () => import("views/exclusive/Exclusive")


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
      { path: "/mvs", component: MVS },
      { path: "/leaderboard", component: Leaderboard },
      { path: "/singer", component: Singer },
      { path: "/mySongs", component: MySongs },
      { path: "/myCollect", component: MyCollect },
      { path: "/detail", component: Detail },
      { path: "/exclusive", component: Exclusive },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
