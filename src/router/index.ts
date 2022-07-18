import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/hello-world',
    name: 'HelloWorld',
    meta: {
        title: 'HelloWorld',
        keepAlive: true,
        requireAuth: false
    },
    component: () => import('@/components/HelloWorld.vue')
  },
  {
      path: '/',
      redirect: '/user-info',
      
  },
  {
    path: '/user-info',
    name: 'UserInfo',
    meta: {
        title: 'UserInfo',
        keepAlive: true,
        requireAuth: true
    },
    component: () => import('@/components/UserInfo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
