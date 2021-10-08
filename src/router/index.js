import { createRouter, createWebHistory } from 'vue-router'


const Discovery = () => import('views/discovery/Discovery')
const PlayList = () => import('views/playList/PlayList')
const Songs = () => import('views/songs/Songs')
const MVS = () => import('views/mvs/MVS')

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
    path: '/playList',
    component: PlayList
  },
  {
    path:'/songs',
    component: Songs
  },
  {
    path: '/mvs',
    component: MVS
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
