import { createRouter, createWebHistory } from 'vue-router'


const Discovery = () => import('views/discovery/Discovery')
const Recommend = () => import('views/recommend/Recommend')
const Songs = () => import('views/songs/Songs')
const MVS = () => import('views/mvs/MVS')
const Leaderboard = () => import('views/leaderboard/Leaderboard')
const Singer = () => import('views/singer/Singer')
const MySongs = () => import('views/mySongs/MySongs')
const MyCollect = () => import('views/myCollect/MyCollect')

const routes = [
  {
    path: '',
    redirect: '/discovery'
  },
  {
    path: '/discovery',
    component: Discovery
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path:'/songs',
    component: Songs
  },
  {
    path: '/mvs',
    component: MVS
  },
  {
    path: '/leaderboard',
    component: Leaderboard
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/mySongs',
    component: MySongs
  },
  {
    path: '/myCollect',
    component: MyCollect
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
