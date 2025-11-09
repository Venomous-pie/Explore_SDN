<template>
  <div class="min-h-screen bg-gray-50 pt-24">
    <!-- Hero Section -->
    <div class="bg-black text-white py-20 px-6">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="text-6xl font-serif mb-6">Explore Surigao del Norte</h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover breathtaking destinations, hidden gems, and unforgettable experiences across the beautiful islands of Surigao del Norte
        </p>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-12" data-aos="fade-down">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <!-- Municipality Filter -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Municipality</label>
            <select
              v-model="selectedMunicipality"
              class="w-full px-4 py-3 border-1 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors text-sm"
            >
              <option value="">All Municipalities</option>
              <option v-for="municipality in municipalities" :key="municipality" :value="municipality">
                {{ municipality }}
              </option>
            </select>
          </div>

          <!-- Category Filter -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              v-model="selectedCategory"
              class="w-full px-4 py-3 border-1 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors text-sm"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Type Filter -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Type</label>
            <select
              v-model="selectedType"
              class="w-full px-4 py-3 border-1 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors text-sm"
            >
              <option value="">All Types</option>
              <option v-for="type in types" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>

          <!-- Sort -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              v-model="sortBy"
              class="w-full px-4 py-3 border-1 border-gray-300 rounded-xl focus:outline-none focus:border-black transition-colors text-sm"
            >
              <option value="rating">Highest Rated</option>
              <option value="name">Name (A-Z)</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        <!-- Clear Filters -->
        <div class="mt-4 flex justify-between items-center">
          <p class="text-sm text-gray-600">
            Showing <span class="font-bold">{{ filteredPlaces.length }}</span> of {{ dataStore.places.length }} places
          </p>
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="text-sm text-gray-600 hover:text-black font-semibold transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      <!-- Places Grid -->
      <div v-if="filteredPlaces.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(place, index) in filteredPlaces"
          :key="place.id"
          @click="navigateToPlace(place.id)"
          class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
          data-aos="fade-up"
          :data-aos-delay="(index % 3) * 100"
        >
          <!-- Image -->
          <div class="relative h-64 overflow-hidden">
            <img
              :src="getImageSrc(place.images[0])"
              :alt="place.name"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
              <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="font-bold text-sm">{{ place.rating }}</span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{{ place.name }}</h3>
            <div class="flex items-center gap-2 text-gray-600 mb-3">
              <div class="i-mdi-map-marker text-red-500"></div>
              <span class="text-sm">{{ place.municipality }}</span>
            </div>
            <p class="text-gray-700 text-sm line-clamp-2 mb-4">{{ place.description }}</p>
            
            <!-- Tags -->
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                {{ place.category }}
              </span>
              <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                {{ place.type }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="i-mdi-map-search text-gray-300 text-8xl mb-6"></div>
        <h2 class="text-3xl font-serif text-gray-900 mb-4">No Places Found</h2>
        <p class="text-gray-600 mb-8">Try adjusting your filters to see more results</p>
        <button
          @click="clearFilters"
          class="bg-black text-white font-semibold py-3 px-8 rounded-xl hover:bg-gray-800 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'
import { useImages } from '@/composables/useImages'

const router = useRouter()
const dataStore = useDataStore()
const { getImageSrc } = useImages()

const selectedMunicipality = ref('')
const selectedCategory = ref('')
const selectedType = ref('')
const sortBy = ref('rating')

const municipalities = computed(() => {
  const unique = new Set<string>()
  dataStore.places.forEach(place => {
    if (place.municipality) unique.add(place.municipality)
  })
  return Array.from(unique).sort()
})

const categories = computed(() => {
  const unique = new Set<string>()
  dataStore.places.forEach(place => {
    if (place.category) unique.add(place.category)
  })
  return Array.from(unique).sort()
})

const types = computed(() => {
  const unique = new Set<string>()
  dataStore.places.forEach(place => {
    if (place.type) unique.add(place.type)
  })
  return Array.from(unique).sort()
})

const hasActiveFilters = computed(() => {
  return selectedMunicipality.value || selectedCategory.value || selectedType.value
})

const filteredPlaces = computed(() => {
  let places = [...dataStore.places]

  // Apply filters
  if (selectedMunicipality.value) {
    places = places.filter(p => p.municipality === selectedMunicipality.value)
  }
  if (selectedCategory.value) {
    places = places.filter(p => p.category === selectedCategory.value)
  }
  if (selectedType.value) {
    places = places.filter(p => p.type === selectedType.value)
  }

  // Apply sorting
  if (sortBy.value === 'rating') {
    places.sort((a, b) => b.rating - a.rating)
  } else if (sortBy.value === 'name') {
    places.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'reviews') {
    places.sort((a, b) => b.totalRatings - a.totalRatings)
  }

  return places
})

const clearFilters = () => {
  selectedMunicipality.value = ''
  selectedCategory.value = ''
  selectedType.value = ''
}

const navigateToPlace = (id: number) => {
  router.push(`/place/${id}`)
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
