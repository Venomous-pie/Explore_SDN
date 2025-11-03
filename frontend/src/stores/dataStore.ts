import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchPlaces, type Place } from '@/services/api'
import { preloadImages } from '@/services/imagePreloader'

export const useDataStore = defineStore('data', () => {
  // State
  const places = ref<Place[]>([])
  const hotels = ref<any[]>([])
  const dining = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const imagesPreloaded = ref(false)
  const imageLoadProgress = ref({ loaded: 0, total: 0 })

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
      const [placesData] = await Promise.all([
        fetchPlaces(),
        // Add hotel and dining fetches when endpoints are ready
        // fetchHotels(),
        // fetchDining(),
      ])

      places.value = placesData
      
      // Preload images after data is loaded
      await preloadAllImages()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch data'
      console.error('Error fetching data:', err)
    } finally {
      loading.value = false
    }
  }

  async function preloadAllImages() {
    if (imagesPreloaded.value || allImages.value.length === 0) {
      return
    }

    try {
      await preloadImages(
        allImages.value,
        (loaded, total) => {
          imageLoadProgress.value = { loaded, total }
        },
        6 // concurrency
      )
      imagesPreloaded.value = true
    } catch (err) {
      console.warn('Some images failed to preload:', err)
      // Don't throw - partial preload is acceptable
      imagesPreloaded.value = true
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
    preloadAllImages,
    getPlaceById,
    getPlacesByType,
    getPlacesByMunicipality,
    searchPlaces,
    $reset,
  }
})
