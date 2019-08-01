import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '../components/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
    },
    {
      path: '/map/:address',
      name: 'map',
      component: () => import(/* webpackChunkName: "login" */ '../components/DecorMap.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import(/* webpackChunkName: "login" */ '../components/DecorMap.vue')
    },
    {
      path: '/urban-decore-tag',
      name: 'urban-decore-tag',
      component: () => import(/* webpackChunkName: "login" */ '../components/UrbanDecorTag.vue')
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import(/* webpackChunkName: "login" */ '../components/userProfile.vue')
    }
  ]
})
