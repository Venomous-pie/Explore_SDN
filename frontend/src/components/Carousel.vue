<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { Motion } from 'motion-v'
import { fetchPlaces, type Place } from '@/services/api'
import { preloadImages } from '@/services/imagePreloader'

const places = ref<Place[]>([])
const currentIndex = ref(0)
const loading = ref(true)
const error = ref('')
const imageLoaded = ref(false)
const highlightsRef = ref<HTMLElement | null>(null)
let autoplayInterval: number | null = null

const currentPlace = computed(() => places.value[currentIndex.value])

watch(() => currentPlace.value?.images[0], (newSrc) => {
    if (!newSrc) return
    imageLoaded.value = false
    const img = new Image()
    img.onload = () => {
        imageLoaded.value = true
    }
    img.src = newSrc
}, { immediate: true })

onMounted(async () => {
    try {
        places.value = await fetchPlaces()
        loading.value = false

        const allImgs = places.value.flatMap(p => p.images || [])
        preloadImages(allImgs, (loaded, total) => {
            // Update loading progress if needed
        }).catch(() => {
            // Ignore 
        })

        startAutoplay()
    } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to load places'
        loading.value = false
    }
})

onUnmounted(() => {
    stopAutoplay()
})

const startAutoplay = () => {
    autoplayInterval = window.setInterval(() => {
        nextSlide()
    }, 10000)
}

const stopAutoplay = () => {
    if (autoplayInterval) {
        clearInterval(autoplayInterval)
        autoplayInterval = null
    }
}

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % places.value.length
}

const goToSlide = (index: number) => {
    currentIndex.value = index
    // Reset autoplay when manually changing slides
    stopAutoplay()
    startAutoplay()
}

const handleWheel = (e: WheelEvent) => {
    if (highlightsRef.value) {
        e.preventDefault()
        highlightsRef.value.scrollBy({
            left: e.deltaY,
            behavior: 'smooth'
        })
    }
}
</script>

<template>
    <div class="fixed inset-0 overflow-hidden z-0">
        <!-- Loading State -->
        <div v-if="loading" class="flex h-full w-full items-center justify-center bg-gray-900">
            <div class="text-center">
                <div class="i-carbon-circle-dash animate-spin text-6xl text-white mb-4" />
                <p class="text-white text-xl">Loading amazing places...</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="flex h-full w-full items-center justify-center bg-gray-900">
            <div class="text-center text-red-400">
                <div class="i-carbon-warning text-6xl mb-4" />
                <p class="text-xl">{{ error }}</p>
            </div>
        </div>

        <!-- Carousel -->
        <div v-else-if="currentPlace" class="relative h-full w-full">
            <!-- Background Image with Overlay -->
            <div class="absolute inset-0 transition-all duration-700">
                <!-- Low-res blur-up background -->
                <div class="absolute inset-0 bg-cover bg-center blur-lg scale-105"
                    :style="{ backgroundImage: currentPlace.images[0] ? `url(${currentPlace.images[0]}?w=50)` : '' }" />

                <!-- Main background with fade-in -->
                <div v-if="currentPlace.images[0]"
                    class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" :style="{
                        backgroundImage: `url(${currentPlace.images[0]})`,
                        opacity: imageLoaded ? 1 : 0
                    }" />

                <!-- Loading overlay -->
                <div v-if="!imageLoaded"
                    class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div class="i-mdi-image text-4xl text-white/80 animate-pulse" />
                </div>

                <div class="absolute inset-0 bg-black/50" />
            </div>

            <!-- Content -->
            <div class="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-8">
                <div :key="currentPlace.id" class="w-full max-w-7xl space-y-4 sm:space-y-6">
                    <!-- Place Name -->
                    <Motion :initial="{ opacity: 0, y: -50 }" :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.6, ease: 'easeOut' }" :key="currentPlace.id">
                        <h1
                            class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-mono text-white drop-shadow-2xl leading-tight text-center">
                            {{ currentPlace.name }}
                        </h1>
                    </Motion>

                    <!-- Location Badge -->
                    <Motion :initial="{ opacity: 0, scale: 0.8 }" :animate="{ opacity: 1, scale: 1 }"
                        :transition="{ duration: 0.5, delay: 0.1 }">
                        <div class="flex items-center justify-center gap-2 text-white/90">
                            <div class="i-carbon-location text-lg sm:text-xl" />
                            <span class="text-sm sm:text-base md:text-lg">{{ currentPlace.municipality }}, {{
                                currentPlace.island
                                }}</span>
                        </div>
                    </Motion>

                    <!-- Description -->
                    <div class="flex justify-end">
                        <div class="flex flex-col">
                            <div class="flex flex-col">
                                <Motion :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
                                    :transition="{ duration: 0.8, delay: 0.2, ease: 'easeOut' }" :key="currentPlace.id">
                                    <p class="text-sm sm:text-base md:text-sm lg:text-sm text-white/90 max-w-md px-2">
                                        {{ currentPlace.description }}
                                    </p>
                                </Motion>

                                <!-- Highlights & Rating -->
                                <div class="flex flex-col">
                                    <div class="max-w-md w-full px-2 flex items-center gap-3 py-2">
                                        <!-- Highlights - Scrollable -->
                                        <div ref="highlightsRef" @wheel="handleWheel"
                                            class="overflow-x-auto overflow-y-hidden scrollbar-hide flex-1 py-2">
                                            <div class="flex gap-2 items-center h-full">
                                                <Motion v-for="(highlight, idx) in currentPlace.highlights.slice(0, 4)"
                                                    :key="highlight" :initial="{ opacity: 0, scale: 0 }"
                                                    :animate="{ opacity: 1, scale: 1 }"
                                                    :transition="{ duration: 0.4, delay: 0.3 + idx * 0.1, type: 'spring', stiffness: 150 }">
                                                    <span
                                                        class="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white whitespace-nowrap text-[0.5rem]">
                                                        {{ highlight }}
                                                    </span>
                                                </Motion>
                                            </div>
                                        </div>

                                        <!-- Rating -->
                                        <Motion :initial="{ opacity: 0, x: -20 }" :animate="{ opacity: 1, x: 0 }"
                                            :transition="{ duration: 0.5, delay: 0.6 }">
                                            <div class="flex items-center gap-2 text-yellow-400 flex-shrink-0 mt-1">
                                                <div class="i-carbon-star-filled text-xs" />
                                                <span class="text-xs text-white">{{ currentPlace.rating }}</span>
                                                <span class="text-white/70 text-[0.6rem]">({{ currentPlace.totalRatings
                                                    }})</span>
                                            </div>
                                        </Motion>
                                    </div>
                                    <div class="flex px-2 mt-4">
                                        <Motion :initial="{ opacity: 0, scale: 0.5 }"
                                            :animate="{ opacity: 1, scale: 1 }"
                                            :transition="{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 200 }"
                                            :whileHover="{ scale: 1.05 }" :whileTap="{ scale: 0.95 }">
                                            <button
                                                class="bg-black hover:bg-white/70 hover:text-black text-white px-6 py-2 text-xs sm:text-xs rounded-full shadow-2xl transition-colors duration-150">
                                                Let's Go
                                            </button>
                                        </Motion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dots Navigation -->
            <Motion :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 0.9 }">
                <div
                    class="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
                    <Motion v-for="(place, index) in places" :key="place.id" :whileHover="{ scale: 1.2 }"
                        :whileTap="{ scale: 0.9 }">
                        <div @click="goToSlide(index)" class="transition-all duration-300" :class="[
                            index === currentIndex
                                ? 'w-8 sm:w-12 h-1 sm:h-1 bg-white'
                                : 'w-2 sm:w-3 h-1 sm:h-1 bg-white/50 hover:bg-white/70'
                        ]" />
                    </Motion>
                </div>
            </Motion>
        </div>
    </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
}
</style>
