import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Cabinet from '../views/Cabinet.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: Cabinet,
    },
  ],
});

export default router;
