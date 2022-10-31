import Main from '@/Main.vue'
import Dashboard from '@/views/dashboard/index.vue'

export default [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
  },
  {
    path: '/',
    component: Main,
    name: 'BBot Console',
    children: [
      {
        path: '',
        name: 'dashboard',
        redirect: 'dashboard',
      },
      {
        path: 'dashboard',
        component: Dashboard,
        name: '概览',
        meta: {
          title: '概览 | BBot Console',
        },
      },
      {
        path: 'group',
        component: () => import('@/views/group/index.vue'),
        name: '群列表',
        meta: {
          title: '群列表 | BBot Console',
        },
      },
      {
        path: ':catchAll(.*)',
        component: () => import('@/views/error/404NotFound.vue'),
        name: '404',
        meta: {
          title: '404 Not Found | BBot Console',
        },
      },
    ],
  },
  {
    path: '/404',
    component: () => import('@/views/error/404NotFound.vue'),
    meta: {
      title: '404 Not Found | BBot Console',
    },
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
]
