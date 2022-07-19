import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/SearchView.vue')
  },
  {
    path: '/viewer',
    name: 'viewer',
    component: () => import('../views/VideoView.vue')
  },
  {
    path: '/song',
    name: 'song',
    component: () => import('../views/SongView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
