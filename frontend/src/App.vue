<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { onMounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'

const dataStore = useDataStore()

onMounted(async () => {
  // Initialize centralized data store
  // This will fetch all data and preload images automatically
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
  </div>
</template>