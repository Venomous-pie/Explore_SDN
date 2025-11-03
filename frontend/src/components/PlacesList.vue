<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import { useImages } from '@/composables/useImages'

const dataStore = useDataStore()
const { getImageSrc } = useImages()

// Example: Access data easily from anywhere
const topPlaces = computed(() => dataStore.topRatedPlaces)
const placesByType = computed(() => dataStore.placesByType)

// Example: Search functionality
const searchQuery = computed(() => '')
const searchResults = computed(() => {
  if (!searchQuery.value) return []
  return dataStore.searchPlaces(searchQuery.value)
})
</script>

<template>
  <div class="places-list">
    <!-- Example: Display top rated places -->
    <div v-if="topPlaces.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="place in topPlaces" 
        :key="place.id"
        class="place-card rounded-lg overflow-hidden shadow-lg"
      >
        <img 
          :src="getImageSrc(place.images[0])" 
          :alt="place.name"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h3 class="text-xl font-bold">{{ place.name }}</h3>
          <p class="text-gray-600">{{ place.municipality }}</p>
          <div class="flex items-center gap-2 mt-2">
            <div class="i-carbon-star-filled text-yellow-400" />
            <span>{{ place.rating }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else-if="dataStore.loading" class="text-center py-8">
      <div class="i-carbon-circle-dash animate-spin text-4xl" />
      <p class="mt-2">Loading places...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="dataStore.error" class="text-center py-8 text-red-500">
      <p>{{ dataStore.error }}</p>
    </div>
  </div>
</template>

<style scoped>
.place-card {
  transition: transform 0.2s;
}

.place-card:hover {
  transform: translateY(-4px);
}
</style>
