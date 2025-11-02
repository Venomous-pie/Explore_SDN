<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { onMounted } from 'vue'
import { preloadImages } from '@/services/imagePreloader'
import { fetchPlaces } from '@/services/api'

onMounted(async () => {
  try {
    const places = await fetchPlaces({ limit: 20 })
    const urls = places.flatMap(p => p.images || [])
    preloadImages(urls.slice(0, 200)).catch(() => { })
  } catch (e) {
    // ignore 
  }
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
  </div>
</template>