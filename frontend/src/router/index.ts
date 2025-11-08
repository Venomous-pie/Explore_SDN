import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      name: 'Home', 
      component: HomeView 
    },
    { 
      path: '/explore', 
      name: 'Explore', 
      component: () => import('../views/ExploreView.vue') 
    },
    { 
      path: '/place/:id', 
      name: 'PlaceDetail', 
      component: () => import('../views/PlaceDetailView.vue') 
    },
    { 
      path: '/hotels', 
      name: 'Hotels', 
      component: () => import('../views/HotelsView.vue') 
    },
    { 
      path: '/dining', 
      name: 'Dining', 
      component: () => import('../views/DiningView.vue') 
    },
    { 
      path: '/about', 
      name: 'About', 
      component: () => import('../views/AboutView.vue') 
    },
    { 
      path: '/contact', 
      name: 'Contact', 
      component: () => import('../views/ContactView.vue') 
    },
    { 
      path: '/faq', 
      name: 'FAQ', 
      component: () => import('../views/FAQView.vue') 
    },
    { 
      path: '/privacy', 
      name: 'Privacy', 
      component: () => import('../views/PrivacyPolicyView.vue') 
    },
    { 
      path: '/terms', 
      name: 'Terms', 
      component: () => import('../views/TermsOfServiceView.vue') 
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
