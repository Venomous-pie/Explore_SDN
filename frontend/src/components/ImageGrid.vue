<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '@/stores/dataStore'
import { useImages } from '@/composables/useImages'

const dataStore = useDataStore()
const { getImageSrc } = useImages()
const router = useRouter()

// Get all images from places
const allImages = computed(() => {
  const images: Array<{ url: string; placeName: string; placeId: number }> = []
  dataStore.places.forEach(place => {
    place.images?.forEach(img => {
      images.push({
        url: img,
        placeName: place.name,
        placeId: place.id
      })
    })
  })
  return images
})

// Shuffle array for more varied distribution
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j]!, newArray[i]!]
  }
  return newArray
}

// Create columns for masonry layout
const createColumns = () => {
  const columnCount = 3
  const maxRowsPerColumn = 3 // Limit to 2-3 rows
  const maxImages = columnCount * maxRowsPerColumn // Total images to display
  const cols: Array<Array<{ url: string; placeName: string; placeId: number; height: number; id: string }>> = Array.from({ length: columnCount }, () => [])
  
  const shuffled = shuffleArray(allImages.value).slice(0, maxImages)
  
  shuffled.forEach((img, index) => {
    const columnIndex = index % columnCount
    const heights = [250, 300, 350, 400, 450]
    const height = heights[index % heights.length]!
    const column = cols[columnIndex]
    if (column) {
      column.push({ 
        ...img, 
        height,
        id: `img-${img.placeId}-${index}-${Math.random()}` 
      })
    }
  })
  
  return cols
}

const baseColumns = ref(createColumns())

// Duplicate columns 5 times for smooth infinite scroll
const allColumns = computed(() => {
  const duplicates = []
  for (let i = 0; i < 5; i++) {
    duplicates.push(...baseColumns.value)
  }
  return duplicates
})

const scrollContainer = ref<HTMLElement | null>(null)
const animationFrame = ref<number | null>(null)
const scrollSpeed = 1 // Adjust speed here
const isAutoScrolling = ref(false)
const columnWidth = 320 // Width including gap

const startAutoScroll = () => {
  if (isAutoScrolling.value || !scrollContainer.value) return
  
  const container = scrollContainer.value
  const singleSetWidth = baseColumns.value.length * columnWidth
  
  const animate = () => {
    if (!container) return
    
    container.scrollLeft += scrollSpeed
    
    // Reset when scrolled through one complete set
    if (container.scrollLeft >= singleSetWidth) {
      container.scrollLeft -= singleSetWidth
    }
    
    animationFrame.value = requestAnimationFrame(animate)
  }
  
  isAutoScrolling.value = true
  animationFrame.value = requestAnimationFrame(animate)
}

const stopAutoScroll = () => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
    animationFrame.value = null
  }
  isAutoScrolling.value = false
}

// Watch for data changes
watch(() => allImages.value.length, () => {
  if (allImages.value.length > 0) {
    baseColumns.value = createColumns()
  }
}, { immediate: true })

onMounted(() => {
  // Start scrolling after a short delay
  setTimeout(() => {
    if (allImages.value.length > 0) {
      startAutoScroll()
    }
  }, 300)
})

onUnmounted(() => {
  stopAutoScroll()
})

const navigateToPlace = (placeId: number) => {
  router.push(`/place/${placeId}`)
}

</script>

<template>
  <div class="masonry-carousel-wrapper overflow-hidden relative">
    <div 
      ref="scrollContainer"
      class="masonry-scroll-container flex gap-4 pl-4 w-screen"
    >
      <div 
        v-for="(column, colIndex) in allColumns" 
        :key="`col-${colIndex}`"
        class="masonry-column flex flex-col gap-4 flex-shrink-0"
      >
        <div 
          v-for="image in column" 
          :key="image.id"
          @click="navigateToPlace(image.placeId)"
          class="masonry-item rounded-lg overflow-hidden shadow-lg relative group cursor-pointer"
          :style="{ height: `${image.height}px`, width: '300px' }"
        >
          <img 
            :src="getImageSrc(image.url)" 
            :alt="image.placeName"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          <!-- Instagram logo -->
          <div class="absolute top-3 right-3 z-20">
            <div class="bg-white/10 backdrop-blur-sm rounded-full p-2 shadow-md transition-all duration-300 group-hover:bg-white group-hover:scale-110">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" class="text-gray-700"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" class="text-gray-700"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" class="text-gray-700"/>
              </svg>
            </div>
          </div>
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <p class="text-white font-semibold text-sm">{{ image.placeName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Edge gradients -->
    <div class="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
    <div class="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
  </div>
</template>

<style scoped>
.masonry-carousel-wrapper {
  width: 100%;
  height: 600px;
}

.masonry-scroll-container {
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.masonry-scroll-container::-webkit-scrollbar {
  display: none;
}

.masonry-column {
  width: 300px;
}

.masonry-item {
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.masonry-item:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
  z-index: 5;
}
</style>