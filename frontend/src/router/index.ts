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
    { 
      path: '/culture', 
      name: 'Culture', 
      component: () => import('../views/CultureView.vue') 
    },
    { 
      path: '/blog', 
      name: 'Blog', 
      component: () => import('../views/BlogView.vue') 
    },
    {
      path: '/blog/:id',
      name: 'BlogPostDetail',
      component: () => import('../views/BlogPostDetailView.vue')
    },
    { 
      path: '/plan-trip', 
      name: 'PlanTrip', 
      component: () => import('../views/PlanTripView.vue') 
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // If using browser back/forward buttons, restore previous scroll position
    if (savedPosition) {
      return savedPosition
    }
    
    // If navigating to a hash anchor (e.g., #section)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80, // Offset for fixed navbar
      }
    }
    
    // Always scroll to top when navigating to a new page
    return { top: 0, left: 0, behavior: 'instant' }
  }
})

export default router
