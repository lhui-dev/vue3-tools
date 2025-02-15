import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { closeNProgress, startNProgress } from '@/utils/common/nprogress.ts';

import PageExample from '@/views/example/page-example.vue';
import Login from '@/views/login/login.vue';
import Layout from '@/layouts/index.vue';
import Tables from '@/views/page-component/tables/baseTable/tables.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/main/',
    component: Layout,
    children: [
      {
        path: 'page-component',
        children: [
          {
            path: 'tables',
            component: Tables
          },
          {
            path: 'charts',
            component: Tables
          }
        ]
      },
      {
        path: 'chart-component',
        children: [
          {
            path: 'bar-chart',
            component: Tables
          }
        ]
      }
    ]
  },
  {
    path: '/page',
    name: 'Page',
    meta: {
      name: '分页'
    },
    children: [
      {
        path: 'page-example',
        name: 'PageExample',
        component: PageExample,
        meta: {
          name: '页面例子展示'
        }
      }
    ]
  },

  {
    path: '/:pathMatch(.*)',
    name: '404Page',
    component: () => import('@/views/not-found/not-found.vue')
  }
];

// 路由信息
export const router = createRouter({
  history: createWebHistory(),
  routes
});

// 路由守卫
router.beforeEach(() => {
  startNProgress();
});
router.afterEach(() => {
  closeNProgress();
});

// 注册路由
export function setupRouter(app: App<Element>) {
  app.use(router);
}
