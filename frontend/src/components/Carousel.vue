<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { Motion } from 'motion-v'
import { useDataStore } from '@/stores/dataStore'
import { useImages } from '@/composables/useImages'

const dataStore = useDataStore()
const { loadImage } = useImages()

const currentIndex = ref(0)
const imageLoaded = ref(false)
const highlightsRef = ref<HTMLElement | null>(null)
const progress = ref(0)
const isTransitioning = ref(false)
const startTime = ref(Date.now())
let autoplayInterval: number | null = null
let progressInterval: number | null = null

const currentPlace = computed(() => dataStore.places[currentIndex.value])

// Watch for index changes to trigger lazy loading
watch(currentIndex, async (newIndex) => {
    // Notify store about index change for lazy loading
    await dataStore.onImageIndexChange(newIndex)
})

watch(() => currentPlace.value?.images[0], (newSrc) => {
    if (!newSrc) return
    imageLoaded.value = false
    loadImage(newSrc)
        .then(() => {
            imageLoaded.value = true
        })
        .catch(() => {
            imageLoaded.value = true // Show anyway
        })
}, { immediate: true })

onMounted(async () => {
    // Fetch data from centralized store
    await dataStore.fetchAllData()
    
    if (dataStore.places.length > 0) {
        startAutoplay()
    }
})

onUnmounted(() => {
    stopAutoplay()
})

const startAutoplay = () => {
    progress.value = 0
    startTime.value = Date.now()
    
    // Update progress every 50ms for smooth animation (10 second duration)
    progressInterval = window.setInterval(() => {
        if (!isTransitioning.value) {
            const elapsed = Date.now() - startTime.value
            progress.value = Math.min((elapsed / 10000) * 100, 100)
        }
    }, 50)
    
    autoplayInterval = window.setInterval(async () => {
        const elapsed = Date.now() - startTime.value
        if (!isTransitioning.value && elapsed >= 10000) {
            await nextSlide()
            startTime.value = Date.now() // Reset timer after transition
        }
    }, 100) // Check more frequently
}

const stopAutoplay = () => {
    if (autoplayInterval) {
        clearInterval(autoplayInterval)
        autoplayInterval = null
    }
    if (progressInterval) {
        clearInterval(progressInterval)
        progressInterval = null
    }
}

const nextSlide = async () => {
    if (isTransitioning.value) return
    
    isTransitioning.value = true
    const nextIndex = (currentIndex.value + 1) % dataStore.places.length
    const nextPlace = dataStore.places[nextIndex]
    
    if (nextPlace?.images[0]) {
        try {
            // Preload next image
            await loadImage(nextPlace.images[0])
            // Only transition after image is loaded
            currentIndex.value = nextIndex
            progress.value = 0
            startTime.value = Date.now()
        } catch (error) {
            console.warn('Failed to preload image, transitioning anyway:', error)
            currentIndex.value = nextIndex
            progress.value = 0
            startTime.value = Date.now()
        }
    } else {
        currentIndex.value = nextIndex
        progress.value = 0
        startTime.value = Date.now()
    }
    
    isTransitioning.value = false
}

const goToSlide = async (index: number) => {
    if (isTransitioning.value) return
    
    isTransitioning.value = true
    const targetPlace = dataStore.places[index]
    
    if (targetPlace?.images[0]) {
        try {
            // Preload target image
            await loadImage(targetPlace.images[0])
            currentIndex.value = index
            progress.value = 0
            startTime.value = Date.now()
        } catch (error) {
            console.warn('Failed to preload image, transitioning anyway:', error)
            currentIndex.value = index
            progress.value = 0
            startTime.value = Date.now()
        }
    } else {
        currentIndex.value = index
        progress.value = 0
        startTime.value = Date.now()
    }
    
    isTransitioning.value = false
    
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
    <div class="h-screen z-0">
        <!-- Loading State -->
        <div v-if="dataStore.loading" class="flex h-full w-screen items-center justify-center bg-gray-900">
            <div class="text-center">
                <div class="i-carbon-circle-dash animate-spin text-6xl text-white mb-4" />
                <p class="text-white text-xl">Loading amazing places...</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="dataStore.error" class="flex h-full w-screen items-center justify-center bg-gray-900">
            <div class="text-center text-red-400">
                <div class="i-carbon-warning text-6xl mb-4" />
                <p class="text-xl">{{ dataStore.error }}</p>
            </div>
        </div>

        <!-- Carousel -->
        <div v-else-if="currentPlace" class="relative h-full w-full">
            <!-- Background Image with Overlay -->
            <div class="absolute inset-0 transition-all duration-700">
                <!-- Low-res blur-up background -->
                <div class="absolute inset-0 bg-cover bg-center blur-lg scale-100"
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

            <!-- Progress Bar -->
            <Motion :initial="{ opacity: 0, y: 50 }" :animate="{ opacity: 1, y: 0 }"
                :transition="{ duration: 0.5, delay: 0.9 }">
                <div class="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 w-64 sm:w-96">
                    <!-- Background bar -->
                    <div class="h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
                        <!-- Progress fill -->
                        <div 
                            class="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                            :style="{ width: `${progress}%` }"
                        />
                    </div>
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
