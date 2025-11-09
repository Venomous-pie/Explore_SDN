<template>
  <Transition name="fade-slide">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-50 bg-black text-white p-3 rounded-full shadow-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95 group"
      aria-label="Back to top"
    >
      <svg 
        class="w-6 h-6 transform group-hover:-translate-y-1 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const scrollThreshold = 200 // Show button after scrolling 200px

let ticking = false

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      isVisible.value = scrollY > scrollThreshold
      ticking = false
    })
    ticking = true
  }
}

const scrollToTop = () => {
  // Smooth scroll to top
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}

onMounted(() => {
  // Add listeners to both window and document for better compatibility
  window.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions)
  document.addEventListener('scroll', handleScroll, { passive: true } as AddEventListenerOptions)
  
  // Initial check
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}
</style>
