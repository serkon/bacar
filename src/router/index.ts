import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName "login" */ '@/views/ResultView.vue'),
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'sub-active',
  scrollBehavior(to: { hash: any }, from: any, savedPosition: any) {
    return savedPosition
      ? savedPosition
      : to.hash
      ? { el: to.hash, behavior: 'smooth' }
      : { top: 0, behavior: 'smooth' };

    // Or always scroll 10px above the element #main
    /**
    return {
      // could also be
      // el: document.getElementById('main'),
      el: '#main',
      top: -10,
    }*/

    // Or
    /**
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ left: 0, top: 0 })
      }, 500)
    })*/
  },
});

export default router;
