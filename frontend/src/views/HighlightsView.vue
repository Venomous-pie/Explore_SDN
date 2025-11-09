<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="bg-black text-white py-24">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center">
          <h1 class="text-5xl md:text-7xl font-serif font-bold mb-4">Highlights</h1>
          <p class="text-xl md:text-2xl max-w-3xl mx-auto text-gray-300">
            Experience the beauty of Surigao del Norte through stunning visuals and captivating moments
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 py-16">
      <!-- Filter Tabs -->
      <div class="flex items-center justify-center gap-4 mb-12" data-aos="fade-up">
        <button 
          v-for="filter in filters" 
          :key="filter.id"
          @click="selectedFilter = filter.id"
          :class="[
            'px-8 py-3 rounded-full font-semibold transition-all duration-300',
            selectedFilter === filter.id 
              ? 'bg-black text-white shadow-lg scale-105' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 hover:scale-105'
          ]">
          {{ filter.name }}
        </button>
      </div>

      <!-- Videos Section -->
      <div v-if="selectedFilter === 'all' || selectedFilter === 'videos'" class="mb-16">
        <div class="flex items-center gap-3 mb-8" data-aos="fade-right">
          <div class="text-3xl">🎥</div>
          <h2 class="text-3xl font-bold text-gray-900">Featured Videos</h2>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(video, index) in videos" 
            :key="video.id"
            class="group cursor-pointer"
            data-aos="fade-up"
            :data-aos-delay="index * 100">
            <div class="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <div class="aspect-video bg-gray-900 relative">
                <iframe 
                  :src="video.embedUrl" 
                  :title="video.title"
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                  class="w-full h-full">
                </iframe>
              </div>
            </div>
            <div class="mt-4">
              <h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-600 transition-colors">
                {{ video.title }}
              </h3>
              <p class="text-sm text-gray-600 mb-2">{{ video.description }}</p>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span>📍 {{ video.location }}</span>
                <span>⏱️ {{ video.duration }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Photos Section -->
      <div v-if="selectedFilter === 'all' || selectedFilter === 'photos'">
        <div class="flex items-center gap-3 mb-8" data-aos="fade-right">
          <div class="text-3xl">📸</div>
          <h2 class="text-3xl font-bold text-gray-900">Photo Gallery</h2>
        </div>
        
        <!-- Masonry Grid -->
        <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <div 
            v-for="(photo, index) in photos" 
            :key="photo.id"
            @click="openLightbox(photo)"
            class="break-inside-avoid cursor-pointer group"
            data-aos="zoom-in"
            :data-aos-delay="(index % 6) * 50">
            <div class="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                :src="photo.url" 
                :alt="photo.title"
                class="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute bottom-0 left-0 right-0 p-4">
                  <h3 class="text-white font-bold text-lg mb-1">{{ photo.title }}</h3>
                  <p class="text-gray-200 text-sm">📍 {{ photo.location }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Lightbox Modal -->
      <Teleport to="body">
        <div 
          v-if="lightboxPhoto" 
          @click="closeLightbox"
          class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in">
          <button 
            @click="closeLightbox"
            class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10">
            ✕
          </button>
          <div class="max-w-6xl w-full" @click.stop>
            <img 
              :src="lightboxPhoto.url" 
              :alt="lightboxPhoto.title"
              class="w-full h-auto rounded-lg shadow-2xl" />
            <div class="mt-6 text-center">
              <h3 class="text-white text-2xl font-bold mb-2">{{ lightboxPhoto.title }}</h3>
              <p class="text-gray-300 text-lg">📍 {{ lightboxPhoto.location }}</p>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Call to Action -->
      <div class="mt-16 bg-black rounded-2xl p-12 text-center text-white shadow-2xl" data-aos="fade-up">
        <div class="text-5xl mb-4">📷</div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Share Your Moments</h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
          Have amazing photos or videos from Surigao del Norte? Share them with us and be featured in our gallery!
        </p>
        <button 
          @click="$router.push('/contact')"
          class="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
          Submit Your Content
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '@/stores/dataStore'

interface Video {
  id: number
  title: string
  description: string
  location: string
  duration: string
  embedUrl: string
}

interface Photo {
  id: number
  title: string
  location: string
  url: string
}

const dataStore = useDataStore()
const selectedFilter = ref('all')

const filters = [
  { id: 'all', name: 'All' },
  { id: 'videos', name: 'Videos' },
  { id: 'photos', name: 'Photos' }
]

const videos = ref<Video[]>([
  {
    id: 1,
    title: 'FUNtastic Surigao - City Promotional Video',
    description: 'Discover the vibrant culture, stunning landscapes, and warm hospitality of Surigao City in this official promotional video',
    location: 'Surigao City',
    duration: '5:32',
    embedUrl: 'https://www.youtube.com/embed/8WCPr-RBxkk'
  },
  {
    id: 2,
    title: 'Siargao Island: More than just Surfing!',
    description: 'Experience the diverse beauty of Siargao beyond its world-famous waves - from pristine beaches to hidden lagoons',
    location: 'Siargao Island',
    duration: '8:15',
    embedUrl: 'https://www.youtube.com/embed/l6K6FgR2xB8'
  },
  {
    id: 3,
    title: 'SIARGAO - SURIGAO DEL SUR | Travel Film',
    description: 'A cinematic journey through the breathtaking landscapes and adventures that await in Siargao and Surigao del Sur',
    location: 'Siargao & Surigao del Sur',
    duration: '6:45',
    embedUrl: 'https://www.youtube.com/embed/lh6RTz4R9fo'
  },
  {
    id: 4,
    title: 'Banbanon Beach - San Francisco',
    description: 'Explore the pristine white sands and crystal-clear waters of Banbanon Beach, a hidden gem in San Francisco',
    location: 'San Francisco, Surigao del Norte',
    duration: '3:28',
    embedUrl: 'https://www.youtube.com/embed/E1Ozb-SFBVw'
  },
  {
    id: 5,
    title: 'Wake Up in SIARGAO',
    description: 'Official Philippines tourism advertisement showcasing the magical mornings and island lifestyle of Siargao',
    location: 'Siargao Island',
    duration: '2:30',
    embedUrl: 'https://www.youtube.com/embed/n5f7pi0JDCo'
  },
  {
    id: 6,
    title: 'Surigao del Norte\'s Top 10 Tourist Attractions',
    description: 'A comprehensive guide to the must-visit destinations and hidden treasures of Surigao del Norte',
    location: 'Surigao del Norte',
    duration: '10:15',
    embedUrl: 'https://www.youtube.com/embed/vfSbJXr17_k'
  },
  {
    id: 7,
    title: 'Best Tourist Spots in Claver',
    description: 'Discover the natural wonders and scenic attractions in the coastal municipality of Claver',
    location: 'Claver, Surigao del Norte',
    duration: '4:50',
    embedUrl: 'https://www.youtube.com/embed/sQSgnCi4CB0'
  }
])

// Generate photos from backend places data
const photos = computed<Photo[]>(() => {
  const photoList: Photo[] = []
  let photoId = 1
  
  // Get all places and extract their images
  dataStore.places.forEach(place => {
    // Add each image from the place
    place.images.forEach((imageUrl, index) => {
      photoList.push({
        id: photoId++,
        title: index === 0 ? place.name : `${place.name} - View ${index + 1}`,
        location: place.municipality,
        url: imageUrl
      })
    })
  })
  
  return photoList
})

const lightboxPhoto = ref<Photo | null>(null)

const openLightbox = (photo: Photo) => {
  lightboxPhoto.value = photo
}

const closeLightbox = () => {
  lightboxPhoto.value = null
}

onMounted(async () => {
  // Ensure data is loaded from backend
  if (dataStore.places.length === 0) {
    await dataStore.fetchAllData()
  }
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
