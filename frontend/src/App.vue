<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import SkeletalLoader from './components/SkeletalLoader.vue'
import BackToTop from './components/BackToTop.vue'
import { onMounted, ref, watch } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import { useFontLoader } from '@/composables/useFontLoader'
import { useRoute } from 'vue-router'
import AOS from 'aos'
import 'aos/dist/aos.css'

const dataStore = useDataStore()
const { loadFonts, fontsLoaded } = useFontLoader()
const route = useRoute()

const isLoading = ref(true)
const dataLoaded = ref(false)

// Watch for both data and fonts to be ready
watch([dataLoaded, fontsLoaded], ([data, fonts]) => {
  if (data && fonts) {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }
})

// Ensure scroll to top on route change (backup to router scrollBehavior)
watch(() => route.path, () => {
  // Use nextTick to ensure DOM is updated before scrolling
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  })
})

onMounted(async () => {
  try {
    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      offset: 100,
    })

    // Load data and fonts in parallel with 10 second timeout for fonts
    await Promise.allSettled([
      dataStore.fetchAllData().then(() => {
        dataLoaded.value = true
      }),
      loadFonts(10000), // 10 second timeout for fonts
    ])

    // Ensure both are marked as loaded even if there were errors
    if (!dataLoaded.value) dataLoaded.value = true
  } catch (error) {
    console.error('Error during app initialization:', error)
    // Still mark as loaded to prevent infinite loading
    dataLoaded.value = true
  }
})

// Refresh AOS on route change
watch(() => route.path, () => {
  setTimeout(() => {
    AOS.refresh()
  }, 100)
})
</script>

<template>
  <SkeletalLoader v-if="isLoading" :min-display-time="500" />
  
  <div v-show="!isLoading" class="min-h-screen font-sans">
    <div class="fixed top-0 w-full z-40">
      <Navbar />
    </div>
    <main>
      <router-view />
    </main>
    <footer>
      <Footer />
    </footer>
    <BackToTop />
  </div>
</template>

<style>
a {
  text-decoration: none !important;
  color: inherit;
}

a:hover {
  text-decoration: none !important;
}

/* Utility class for no underline */
.no-underline {
  text-decoration: none !important;
}

/* Ensure router-link-active doesn't get blue color */
.router-link-active {
  color: inherit;
  text-decoration: none !important;
}

.router-link-exact-active {
  color: inherit;
  text-decoration: none !important;
}

/* Remove underline from all router-link elements */
.router-link-active,
.router-link-exact-active,
a[href] {
  text-decoration: none !important;
}
</style>