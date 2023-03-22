import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: () => import('@/views/examination/home'),
    redirect: '/views',
    children: [
      {
        path: '/views',
        name: 'views',
        component: () => import('@/views/examination/view')
      },
      {
        path: '/edit',
        name: 'examinationEdit',
        component: () => import('@/views/examination/edit')
      },
      {
        path: '/dataView',
        name: 'dataView',
        component: () => import('@/views/examination/dataView')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/examination/setting')
      },
      {
        path: '/count',
        name: 'count',
        component: () => import('@/views/examination/count')
      },
      {
        path: '/theme',
        name: 'theme',
        component: () => import('@/views/examination/theme')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
