import { createRouter, createWebHistory } from 'vue-router'
import CatFactView from '../views/CatFactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cat-fact',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CatFactView 
    }
  ]
})

export default router
