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