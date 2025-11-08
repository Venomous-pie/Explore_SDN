<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { onMounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

onMounted(async () => {
  await dataStore.fetchAllData()
})
</script>

<template>
  <div class="min-h-screen font-sans">
    <div class="absolute w-full">
      <Navbar />
    </div>
    <main>
      <router-view />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<style>
/* Global styles for router-links */
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