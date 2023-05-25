import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingView from '@/views/LandingView.vue'
import SearchView from '@/views/SearchView.vue'
import DetailView from '@/views/DetailView.vue'
import PlanList from '@/components/Plan/PlanList.vue'
import PlanDetail from '@/components/Plan/PlanDetail.vue'
import ReviewView from '@/views/ReviewView.vue'
import PlanView from '@/views/PlanView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/attraction/:contentId',
    name: 'attraction',
    component: DetailView
  },
  {
    path: '/plan',
    name: 'plan',
    component: PlanView,
    redirect: '/plan/list',
    children: [
      {
        path: 'list',
        name: 'planList',
        component: PlanList
      },
      {
        path: 'detail/:planId',
        name: 'planDetail',
        component: PlanDetail
      }
    ]
  },
  {
    path: '/review',
    name: 'review',
    component: ReviewView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
