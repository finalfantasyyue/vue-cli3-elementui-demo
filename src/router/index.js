import Vue from 'vue'
import Router from 'vue-router'

const basicLayout = () => import('@/layouts/basicLayout');

Vue.use(Router)

export const constRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/main',
    component: basicLayout,
    children: [
      {
        path: '/main',
        component: () => import('@/views/dashboard/index'),
        name: 'main',
        meta: { title: '首页' }
      }
    ]
  }
]
export const asyncRoutes = [
  {
    path: '/dashboard',
    component: basicLayout,
    name: 'dashboard',
    redirect: '/dashboard',
    meta: { title: 'dashboard', icon: 'el-icon-house' },
    noSubMenu: true,
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/components',
    component: basicLayout,
    // component: { render:h => h('router-view') },
    name: 'components',
    meta: { title: 'components', icon: 'el-icon-menu' },
    children: [
      {
        path: 'back-to-top',
        component: () => import('@/views/components/backToTop'),
        name: 'backToTop',
        meta: { title: 'backToTop' }
      },
      {
        path: 'draggable',
        component: () => import('@/views/components/draggable'),
        name: 'draggable',
        meta: { title: 'draggable' }
      },
      {
        path: 'draggableGroup',
        component: () => import('@/views/components/draggableGroup'),
        name: 'draggableGroup',
        meta: { title: 'draggableGroup' }
      },
      {
        path: 'animation',
        name: 'animation',
        component: () => import('@/views/components/animation'),
        meta: { title: 'animation' }
      },
      {
        path: 'func',
        name: 'func',
        component: () => import('@/views/components/func'),
        meta: { title: 'func' }
      },
      {
        path: 'hannuo',
        component: () => import('@/views/components/hannuo'),
        name: 'hannuo',
        meta: { title: 'hannuota' }
      },
      {
        path: 'layout',
        component: () => import('@/views/components/layout'),
        name: 'layout',
        meta: { title: 'layout' }
      },
      {
        path: 'searchNumberEffects',
        component: () => import('@/views/components/searchNumberEffects'),
        name: 'searchNumberEffects',
        meta: { title: 'searchNumberEffects' }
      },
      {
        path: 'canvas',
        component: () => import('@/views/components/canvas'),
        name: 'canvasComponent',
        meta: { title: 'canvasComponent' }
      },
      {
        path: 'flowChart',
        component: () => import('@/views/components/flowChart.vue'),
        name: 'flowChart',
        meta: { title: 'flowChart' }
      },
      {
        path: 'test',
        component: () => import('@/views/components/test'),
        name: 'test',
        meta: { title: '不显示菜单' }
        // hidden: true
      },
      {
        path: 'node-interface',
        component: () => import('@/views/components/nodeInterface'),
        name: 'nodeInterface',
        meta: { title: 'nodeInterface' }
      }
    ]
  },
  {
    path: '/document',
    redirect: '/document',
    component: basicLayout,
    name: 'document',
    meta: { title: 'document', icon: 'el-icon-document' },
    noSubMenu: true,
    children: [
      {
        path: '/document',
        component: () => import('@/views/document/index'),
      }
    ]
  },
  {
    path: '/canvas',
    redirect: '/canvas',
    component: basicLayout,
    name: 'canvas',
    meta: { title: 'canvas', icon: 'el-icon-document' },
    noSubMenu: true,
    children: [
      {
        path: '/canvas',
        component: () => import('@/views/canvas/index'),
      }
    ]
  }
]
const allRouters = [...constRoutes,...asyncRoutes]
export default new Router({
  routes: allRouters
})