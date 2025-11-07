<template>
    <div class="w-full py-12 px-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-6xl font-serif">Pick your place</h2>
          <span class="text-lg text-gray-600">Explore Surigao del Norte</span>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Side: Image Carousel, Description, CTAs -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Image Carousel -->
            <div class="relative w-full h-[500px] bg-gray-200 rounded-2xl overflow-hidden group">
              <div v-if="currentPlace && currentImages.length > 0" class="relative w-full h-full">
                <!-- Main Image -->
                <img
                  :src="getImageSrc(currentImages[currentImageIndex])"
                  :alt="currentPlace.name"
                  class="w-full h-full object-cover"
                />

                <!-- Image Navigation Arrows -->
                <button
                  v-if="currentImages.length > 1"
                  @click="previousImage"
                  class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Previous image"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  v-if="currentImages.length > 1"
                  @click="nextImage"
                  class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <!-- Image Indicators -->
                <div v-if="currentImages.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <button
                    v-for="(_, index) in currentImages"
                    :key="index"
                    @click="currentImageIndex = index"
                    :class="[
                      'w-2 h-2 rounded-full transition-all',
                      index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                    ]"
                    :aria-label="`Go to image ${index + 1}`"
                  />
                </div>
              </div>

              <!-- Loading State -->
              <div v-else class="flex items-center justify-center h-full">
                <p class="text-gray-500">Loading places...</p>
              </div>
            </div>

            <!-- Place Information -->
            <div v-if="currentPlace" class="space-y-4">
              <!-- Place Name and Rating -->
              <div class="flex items-start justify-between">
                <div>
                  <h3 class="text-3xl font-bold text-gray-900">{{ currentPlace.name }}</h3>
                  <p class="text-lg text-gray-600 mt-1">{{ currentPlace.municipality }}</p>
                </div>
                <div class="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                  <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span class="font-semibold text-gray-900">{{ currentPlace.rating }}</span>
                  <span class="text-sm text-gray-600">({{ currentPlace.totalRatings }})</span>
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-700 text-lg leading-relaxed">
                {{ currentPlace.description }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2">
                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {{ currentPlace.category }}
                </span>
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {{ currentPlace.type }}
                </span>
              </div>

              <!-- CTAs -->
              <div class="flex gap-4 pt-4">
                <button
                  @click="handleBookNow"
                  class="flex-1 bg-black text-white font-semibold py-4 px-8 rounded-xl transition-colors shadow-lg hover:shadow-xl"
                >
                  Book Now
                </button>
                <button
                  @click="handleLearnMore"
                  class="flex-1 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-8 rounded-xl border-2 border-gray-300 transition-colors"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          <!-- Right Side: Map and Municipality Selector -->
          <div class="space-y-6">
            <!-- Municipality Selector -->
            <div class="bg-white rounded-2xl shadow-lg p-6">
              <h4 class="text-xl font-bold mb-4">Select Area</h4>
              <div class="space-y-2 max-h-[300px] overflow-y-auto">
                <button
                  v-for="municipality in municipalities"
                  :key="municipality"
                  @click="selectMunicipality(municipality)"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-lg transition-colors font-medium',
                    selectedMunicipality === municipality
                      ? 'bg-black text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  ]"
                >
                  {{ municipality }}
                  <span class="text-sm opacity-75 ml-2">
                    ({{ dataStore.getPlacesByMunicipality(municipality).length }})
                  </span>
                </button>
              </div>
            </div>

            <!-- Places in Selected Municipality -->
            <div v-if="availablePlaces.length > 0" class="bg-white rounded-2xl shadow-lg p-6">
              <h4 class="text-xl font-bold mb-4">Places ({{ availablePlaces.length }})</h4>
              <div class="space-y-2 max-h-[400px] overflow-y-auto">
                <button
                  v-for="(place, index) in availablePlaces"
                  :key="place.id"
                  @click="selectPlace(index)"
                  :class="[
                    'w-full text-left px-4 py-3 rounded-lg transition-colors',
                    index === currentPlaceIndex
                      ? 'bg-black text-white'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent text-black'
                  ]"
                >
                  <div class="font-medium">{{ place.name }}</div>
                  <div class="text-sm flex items-center gap-1 mt-1">
                    <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {{ place.rating }}
                  </div>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import { useImages } from '@/composables/useImages'
import type { Place } from '@/services/api'

const dataStore = useDataStore()
const { getImageSrc } = useImages()

// State
const currentPlaceIndex = ref(0)
const currentImageIndex = ref(0)
const selectedMunicipality = ref<string>('')

// Get all municipalities
const municipalities = computed(() => {
  const uniqueMunicipalities = new Set<string>()
  dataStore.places.forEach(place => {
    if (place.municipality) {
      uniqueMunicipalities.add(place.municipality)
    }
  })
  return Array.from(uniqueMunicipalities).sort()
})

// Get places for selected municipality or all places
const availablePlaces = computed(() => {
  if (selectedMunicipality.value) {
    return dataStore.getPlacesByMunicipality(selectedMunicipality.value)
  }
  return dataStore.places
})

// Current place
const currentPlace = computed(() => {
  return availablePlaces.value[currentPlaceIndex.value]
})

// Current place images
const currentImages = computed(() => {
  return currentPlace.value?.images || []
})

// Navigation functions
const nextImage = () => {
  if (currentImages.value.length > 0) {
    currentImageIndex.value = (currentImageIndex.value + 1) % currentImages.value.length
  }
}

const previousImage = () => {
  if (currentImages.value.length > 0) {
    currentImageIndex.value = 
      currentImageIndex.value === 0 
        ? currentImages.value.length - 1 
        : currentImageIndex.value - 1
  }
}

const nextPlace = () => {
  if (availablePlaces.value.length > 0) {
    currentPlaceIndex.value = (currentPlaceIndex.value + 1) % availablePlaces.value.length
    currentImageIndex.value = 0
  }
}

const previousPlace = () => {
  if (availablePlaces.value.length > 0) {
    currentPlaceIndex.value = 
      currentPlaceIndex.value === 0 
        ? availablePlaces.value.length - 1 
        : currentPlaceIndex.value - 1
    currentImageIndex.value = 0
  }
}

const selectMunicipality = (municipality: string) => {
  selectedMunicipality.value = municipality
  currentPlaceIndex.value = 0
  currentImageIndex.value = 0
}

const selectPlace = (index: number) => {
  currentPlaceIndex.value = index
  currentImageIndex.value = 0
}

// CTA Actions
const handleBookNow = () => {
  // Implement booking logic
  console.log('Book Now clicked for:', currentPlace.value?.name)
  alert(`Booking ${currentPlace.value?.name}`)
}

const handleLearnMore = () => {
  // Implement learn more logic
  console.log('Learn More clicked for:', currentPlace.value?.name)
  // Could navigate to detail page or open modal
}

onMounted(() => {
  if (municipalities.value.length > 0 && !selectedMunicipality.value) {
    selectedMunicipality.value = municipalities.value[0] || ''
  }
})
</script>

<style scoped>
/* Custom scrollbar for lists */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>