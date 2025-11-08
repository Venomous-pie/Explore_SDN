import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchPlaces, fetchDining, fetchHotels, type Place, type Dining, type Hotel } from '@/services/api'
import { ProgressiveImageLoader } from '@/services/lazyImageLoader'

export const useDataStore = defineStore('data', () => {
  // State
  const places = ref<Place[]>([])
  const hotels = ref<Hotel[]>([])
  const dining = ref<Dining[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const imagesPreloaded = ref(false)
  const imageLoadProgress = ref({ loaded: 0, total: 0 })

  // Lazy image loader instance
  let imageLoader: ProgressiveImageLoader | null = null

  // Computed
  const allImages = computed(() => {
    const imgs: string[] = []
    places.value.forEach(p => imgs.push(...(p.images || [])))
    hotels.value.forEach(h => imgs.push(...(h.images || [])))
    dining.value.forEach(d => imgs.push(...(d.images || [])))
    return imgs
  })

  const placesByType = computed(() => {
    const grouped: Record<string, Place[]> = {}
    places.value.forEach(place => {
      const type = place.type
      if (!grouped[type]) {
        grouped[type] = []
      }
      grouped[type].push(place)
    })
    return grouped
  })

  const placesByMunicipality = computed(() => {
    const grouped: Record<string, Place[]> = {}
    places.value.forEach(place => {
      const municipality = place.municipality
      if (!grouped[municipality]) {
        grouped[municipality] = []
      }
      grouped[municipality].push(place)
    })
    return grouped
  })

  const topRatedPlaces = computed(() => {
    return [...places.value]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
  })

  // Actions
  async function fetchAllData() {
    if (places.value.length > 0) {
      // Data already loaded
      return
    }

    loading.value = true
    error.value = null

    try {
      // Fetch all data in parallel
      const [placesData, diningData, hotelsData] = await Promise.all([
        fetchPlaces(),
        fetchDining(),
        fetchHotels(),
      ])

      places.value = placesData
      dining.value = diningData
      hotels.value = hotelsData

      // Initialize lazy loader and load initial batch
      await initializeLazyLoader()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch data'
      console.error('Error fetching data:', err)
    } finally {
      loading.value = false
    }
  }

  async function initializeLazyLoader() {
    if (imageLoader || allImages.value.length === 0) {
      return
    }

    try {
      // Create loader with batch size of 3 images
      imageLoader = new ProgressiveImageLoader(
        allImages.value,
        3,
        (loaded: number, total: number) => {
          const progress = imageLoader?.getProgress()
          if (progress) {
            imageLoadProgress.value = { loaded: progress.loaded, total: progress.total }
          }
        }
      )

      // Load only the initial batch (2-3 images)
      await imageLoader.loadInitial()
      console.log('Initial images loaded:', imageLoader.getProgress())
    } catch (err) {
      console.warn('Failed to initialize lazy loader:', err)
    }
  }

  // Function to handle image navigation - preload next batch when needed
  async function onImageIndexChange(currentIndex: number) {
    if (imageLoader) {
      await imageLoader.onIndexChange(currentIndex)
    }
  }

  function getPlaceById(id: number): Place | undefined {
    return places.value.find(p => p.id === id)
  }

  function getPlacesByType(type: string): Place[] {
    return places.value.filter(p => p.type === type)
  }

  function getPlacesByMunicipality(municipality: string): Place[] {
    return places.value.filter(p => p.municipality === municipality)
  }

  function searchPlaces(query: string): Place[] {
    const lowerQuery = query.toLowerCase()
    return places.value.filter(place =>
      place.name.toLowerCase().includes(lowerQuery) ||
      place.description.toLowerCase().includes(lowerQuery) ||
      place.municipality.toLowerCase().includes(lowerQuery) ||
      place.type.toLowerCase().includes(lowerQuery)
    )
  }

  // Reset store
  function $reset() {
    places.value = []
    hotels.value = []
    dining.value = []
    loading.value = false
    error.value = null
    imagesPreloaded.value = false
    imageLoadProgress.value = { loaded: 0, total: 0 }
    imageLoader = null
  }

  return {
    // State
    places,
    hotels,
    dining,
    loading,
    error,
    imagesPreloaded,
    imageLoadProgress,

    // Computed
    allImages,
    placesByType,
    placesByMunicipality,
    topRatedPlaces,

    // Actions
    fetchAllData,
    initializeLazyLoader,
    onImageIndexChange,
    getPlaceById,
    getPlacesByType,
    getPlacesByMunicipality,
    searchPlaces,
    $reset,
  }
})
