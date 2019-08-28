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
      component: () => import('../components/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/UserLogin.vue')
    },
    {
      path: '/district-login',
      name: 'district-login',
      component: () => import('../components/DistrictLogin.vue')
    },
    {
      path: '/map/:address',
      name: 'mapAddress',
      component: () => import('../components/DecorMap.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('../components/DecorMap.vue')
    },
    {
      path: '/urban-decore-tag',
      name: 'urban-decore-tag',
      component: () => import('../components/UrbanDecorTag.vue')
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import('../components/Profile.vue')
    }, 
    {
      path: '/add',
      name: 'add-marker',
      component: () => import('../components/AddMarker.vue')
    },
    {
      path: '/forum',
      name: 'forum',
      component: () => import('../components/Forum.vue')
    },
    {
      path: '/forum/add/:what',
      name: 'add-forum',
      component: () => import('../components/AddForum.vue')
    },
    {
      path: '/forum/event/:id',
      name: 'event',
      component: () => import('../components/SingleEvent.vue')
    }, {
      path: '/forum/discussion/:id',
      name: 'discussion',
      component: () => import('../components/SingleDiscussion.vue')
    },
    {
      path: '/avatar',
      name: 'avata',
      component: () => import('../components/Avatar.vue')
    },
    {
      path: '/analysis',
      name: 'analysis',
      component: () => import('../components/Analysis.vue')
    }
  ]
})
