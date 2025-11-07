<template>
    <div class="p-16">
        <div class="flex justify-between">
            <div data-aos="fade-right" data-aos-delay="100">
                <span class="text-sm">Explore SDN</span>
            </div>
            <div class="max-w-lg" data-aos="fade-up" data-aos-delay="200">
                <span class="text-6xl font-serif">The unmatched beauty of </span>
                <br>
                <span class="text-6xl font-serif">Surigao del Norte</span>
            </div>
            <div class="max-w-lg" data-aos="fade-left" data-aos-delay="300">
                <span class="text-xs">
                    Surigao del Norte is a province in the Caraga region of Mindanao, Philippines, known for its
                    stunning
                    natural
                    landscapes, pristine beaches, and vibrant culture. From the famous Siargao Island, renowned for its
                    world-class surfing spots, to the enchanting Sohoton Cove with its mystical lagoons and caves,
                    Surigao del
                    Norte offers a diverse range of attractions for nature lovers and adventure seekers alike. The
                    province is
                    also home to beautiful waterfalls, lush forests, and rich marine biodiversity, making it a paradise
                    for
                    eco-tourism. Visitors can immerse themselves in the local culture by exploring traditional villages,
                    sampling
                    delicious seafood cuisine, and participating in colorful festivals that celebrate the heritage of
                    the
                    Surigaonon people.
                </span>
            </div>
        </div>

        <div class="flex gap-2 mt-16 items-end">
            <div class="flex gap-2 h-full w-full items-end" data-aos="fade-right" data-aos-delay="200">
                <!-- Featured Image -->
                <div class="h-150 bg-gray-200 rounded-2xl w-full overflow-hidden relative group shadow-2xl border-4 border-white">
                    <img
                        v-if="currentFeaturedPlace"
                        :src="getImageSrc(currentFeaturedPlace.images?.[0])"
                        :alt="currentFeaturedPlace.name"
                        class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                        :key="currentFeaturedPlace.id"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                        <div class="text-white transition-opacity duration-500">
                            <h3 class="text-2xl font-bold drop-shadow-lg">{{ currentFeaturedPlace?.name }}</h3>
                            <p class="text-sm mt-1 drop-shadow-md">{{ currentFeaturedPlace?.municipality }}</p>
                        </div>
                    </div>
                    <!-- Rotation Indicator -->
                    <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
                        {{ currentIndex + 1 }} / {{ rotatingPlaces.length }}
                    </div>
                </div>
                
                <!-- Statistics Card -->
                <div class="h-140 bg-white rounded-2xl w-full p-6 shadow-2xl border-4 border-white flex flex-col justify-between hover:shadow-3xl transition-shadow duration-300">
                    <div>
                        <h4 class="text-xl font-bold mb-4">Discover</h4>
                        <div class="space-y-4">
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Total Places</span>
                                <span class="text-3xl font-bold text-black">{{ dataStore.places.length }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Municipalities</span>
                                <span class="text-3xl font-bold text-black">{{ municipalityCount }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-gray-600">Categories</span>
                                <span class="text-3xl font-bold text-black">{{ categoryCount }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-200">
                        <p class="text-xs text-gray-500">Explore the wonders of Surigao del Norte</p>
                    </div>
                </div>
            </div>
            
            <div class="flex gap-2 h-full w-full items-end" data-aos="fade-left" data-aos-delay="200">
                <!-- Reviews and Rating -->
                <div class="h-120 bg-white rounded-2xl w-full p-6 shadow-2xl border-4 border-white hover:shadow-3xl transition-shadow duration-300">
                    <h4 class="text-xl font-bold mb-4">Top Rated</h4>
                    <div class="space-y-3">
                        <div 
                            v-for="place in topRatedPlaces.slice(0, 3)" 
                            :key="place.id"
                            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <div class="flex-1">
                                <p class="font-semibold text-sm">{{ place.name }}</p>
                                <p class="text-xs text-gray-600">{{ place.municipality }}</p>
                            </div>
                            <div class="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
                                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span class="text-sm font-bold">{{ place.rating }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Highlights -->
                <div class="h-140 bg-black text-white rounded-2xl w-full p-6 shadow-2xl border-4 border-white flex flex-col justify-between hover:shadow-3xl transition-shadow duration-300">
                    <div>
                        <h4 class="text-xl font-bold mb-4">Highlights</h4>
                        <div class="space-y-3">
                            <div class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                <div>
                                    <p class="font-semibold text-sm">World-Class Surfing</p>
                                    <p class="text-xs text-gray-300">Cloud 9 & Siargao Island</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                <div>
                                    <p class="font-semibold text-sm">Natural Wonders</p>
                                    <p class="text-xs text-gray-300">Sohoton Cove & Rock Pools</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                <div>
                                    <p class="font-semibold text-sm">Island Hopping</p>
                                    <p class="text-xs text-gray-300">Naked, Daku & Guyam Islands</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <svg class="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                </svg>
                                <div>
                                    <p class="font-semibold text-sm">Rich Culture</p>
                                    <p class="text-xs text-gray-300">Festivals & Local Traditions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 pt-4 border-t border-gray-700">
                        <p class="text-xs text-gray-400">Experience paradise in the Philippines</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'
import { useImages } from '@/composables/useImages'

const dataStore = useDataStore()
const { getImageSrc } = useImages()

// Auto-rotation state
const currentIndex = ref(0)
let rotationInterval: number | null = null

// Get places to rotate through (top 10)
const rotatingPlaces = computed(() => {
    return dataStore.topRatedPlaces.slice(0, 10)
})

// Current featured place based on rotation
const currentFeaturedPlace = computed(() => {
    return rotatingPlaces.value[currentIndex.value]
})

// Get top 3 rated places
const topRatedPlaces = computed(() => {
    return dataStore.topRatedPlaces.slice(0, 3)
})

// Count unique municipalities
const municipalityCount = computed(() => {
    const municipalities = new Set<string>()
    dataStore.places.forEach(place => {
        if (place.municipality) {
            municipalities.add(place.municipality)
        }
    })
    return municipalities.size
})

// Count unique categories
const categoryCount = computed(() => {
    const categories = new Set<string>()
    dataStore.places.forEach(place => {
        if (place.category) {
            categories.add(place.category)
        }
    })
    return categories.size
})

// Auto-rotation logic
const startRotation = () => {
    rotationInterval = window.setInterval(() => {
        if (rotatingPlaces.value.length > 0) {
            currentIndex.value = (currentIndex.value + 1) % rotatingPlaces.value.length
        }
    }, 5000) // Change every 5 seconds
}

const stopRotation = () => {
    if (rotationInterval !== null) {
        clearInterval(rotationInterval)
        rotationInterval = null
    }
}

onMounted(() => {
    startRotation()
})

onUnmounted(() => {
    stopRotation()
})
</script>

<style scoped>
/* Enhanced shadow for better visibility */
.shadow-3xl {
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
</style>